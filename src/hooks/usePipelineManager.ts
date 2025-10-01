import { useState, useCallback, useEffect, useRef } from 'react';
import { PipelineStageData, PipelineStatus } from '../types';
import { PIPELINE_STAGES } from '../constants';
import * as pipelineService from '../services/pipelineService';
import { SOUND_RESET, SOUND_STAGE_COMPLETE, SOUND_STAGE_FAILED, SOUND_STAGE_START } from '../assets/sounds';

// Helper hook to get the previous value of a variable from the last render
function usePrevious<T>(value: T) {
  const ref = useRef<T | undefined>(undefined);
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

/**
 * Manages the entire state and lifecycle of the AI pipeline process.
 * This hook encapsulates the logic for starting, resetting, and polling the pipeline status,
 * interacting with the backend service, and managing UI state like sounds and confetti.
 *
 * @returns An object containing the pipeline state and functions to control it.
 */
export const usePipelineManager = () => {
    const [stages, setStages] = useState<PipelineStageData[]>(() =>
        PIPELINE_STAGES.map(s => ({ ...s, status: PipelineStatus.PENDING }))
    );
    const [pipelineId, setPipelineId] = useState<string | null>(null);
    const [isRunning, setIsRunning] = useState(false);
    const [isFinished, setIsFinished] = useState(false);
    const [hasFailed, setHasFailed] = useState(false);
    const [expandedStage, setExpandedStage] = useState<number | null>(null);
    const [showConfetti, setShowConfetti] = useState(false);
    const pollingIntervalRef = useRef<number | null>(null);

    const prevStages = usePrevious(stages);

    const playSound = useCallback((sound: string) => {
        const audio = new Audio(sound);
        audio.play().catch(e => console.error("Error playing sound:", e));
    }, []);

    const stopPolling = () => {
        if (pollingIntervalRef.current) {
            clearInterval(pollingIntervalRef.current);
            pollingIntervalRef.current = null;
        }
    };

    /**
     * Starts the pipeline process.
     * @param theme The user-provided theme for the video remix.
     */
    const start = useCallback(async (theme: string) => {
        stopPolling();
        playSound(SOUND_RESET);
        
        setIsRunning(true);
        setIsFinished(false);
        setHasFailed(false);
        setStages(PIPELINE_STAGES.map(s => ({ ...s, status: PipelineStatus.PENDING })));
        setExpandedStage(PIPELINE_STAGES[0].id);

        try {
            const { pipelineId } = await pipelineService.startPipeline(theme);
            setPipelineId(pipelineId);

            pollingIntervalRef.current = window.setInterval(async () => {
                try {
                    const status = await pipelineService.getPipelineStatus(pipelineId);
                    setStages(status.stages);
                    if (status.isComplete || status.hasFailed) {
                        stopPolling();
                        setIsRunning(false);
                        if (status.isComplete) setIsFinished(true);
                        if (status.hasFailed) setHasFailed(true);
                    }
                } catch (error) {
                    console.error("Failed to get pipeline status:", error);
                    setHasFailed(true);
                    setIsRunning(false);
                    stopPolling();
                }
            }, 1200);

        } catch (error) {
            console.error("Failed to start pipeline:", error);
            setHasFailed(true);
            setIsRunning(false);
        }
    }, [playSound]);

    /**
     * Resets the pipeline to its initial state, cancelling any ongoing process.
     */
    const reset = useCallback(() => {
        stopPolling();
        if (pipelineId) {
            pipelineService.cancelPipeline(pipelineId);
        }
        playSound(SOUND_RESET);
        setIsRunning(false);
        setIsFinished(false);
        setHasFailed(false);
        setExpandedStage(null);
        setPipelineId(null);
        setStages(PIPELINE_STAGES.map(s => ({ ...s, status: PipelineStatus.PENDING })));
    }, [pipelineId, playSound]);

    /**
     * Toggles the expanded/collapsed view of a specific pipeline stage.
     * @param id The ID of the stage to toggle.
     */
    const handleToggleStage = (id: number) => {
        setExpandedStage(prev => (prev === id ? null : id));
    };
    
    // Effect to play sounds based on stage status changes
    useEffect(() => {
        if (!prevStages || !isRunning) return;

        stages.forEach((currentStage, index) => {
            const prevStage = prevStages[index];
            if (prevStage.status !== currentStage.status) {
                if (currentStage.status === PipelineStatus.RUNNING) {
                    playSound(SOUND_STAGE_START);
                    setExpandedStage(currentStage.id);
                } else if (currentStage.status === PipelineStatus.COMPLETED) {
                    playSound(SOUND_STAGE_COMPLETE);
                } else if (currentStage.status === PipelineStatus.FAILED) {
                    playSound(SOUND_STAGE_FAILED);
                }
            }
        });

    }, [stages, prevStages, isRunning, playSound]);


    // Effect to handle confetti display on successful completion
    useEffect(() => {
        if (isFinished) {
            setShowConfetti(true);
            const timer = setTimeout(() => setShowConfetti(false), 5000); // Confetti lasts 5 seconds
            return () => clearTimeout(timer);
        }
    }, [isFinished]);

    // Cleanup polling interval on component unmount
    useEffect(() => {
        return () => {
            stopPolling();
        };
    }, []);

    return {
        stages,
        isRunning,
        isFinished,
        hasFailed,
        expandedStage,
        showConfetti,
        start,
        reset,
        handleToggleStage,
    };
};
