import { PipelineStageData, PipelineStatus } from '../types';
import { PIPELINE_STAGES } from '../constants';

// This file simulates the server's state management and business logic.
// In a real production environment, this would be replaced by a proper database (like Redis or Postgres)
// and a robust job queue system.

interface Pipeline {
    id: string;
    theme: string;
    stages: PipelineStageData[];
    isCancelled: boolean;
}

// In-memory "database" for our mock server. This is a simple object to hold state.
// In a real serverless environment, this would be an external database (e.g., Redis, Firestore, DynamoDB)
// to ensure state is preserved across stateless function invocations.
const mockServerState: Record<string, Pipeline> = {};

const STAGE_DURATION = 1500;
const STAGE_DURATION_VARIANCE = 1000;
const FAILURE_CHANCE = 0.05;

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Creates a new pipeline instance and stores it in our mock database.
 * @param theme The theme for the video remix.
 * @returns The ID of the newly created pipeline.
 */
export const createPipeline = (theme: string): { pipelineId: string } => {
    const pipelineId = `pipe_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
    mockServerState[pipelineId] = {
        id: pipelineId,
        theme,
        stages: PIPELINE_STAGES.map(s => ({ ...s, status: PipelineStatus.PENDING })),
        isCancelled: false,
    };
    console.log(`[Server Lib] Created pipeline ${pipelineId}`);
    return { pipelineId };
};

/**
 * Retrieves a pipeline's state from the mock database.
 * @param pipelineId The ID of the pipeline to retrieve.
 * @returns The pipeline object or null if not found.
 */
export const getPipeline = (pipelineId: string): Pipeline | null => {
    return mockServerState[pipelineId] ?? null;
};

/**
 * Marks a pipeline as cancelled in the mock database.
 * @param pipelineId The ID of the pipeline to cancel.
 */
export const cancelPipelineInState = (pipelineId: string): void => {
    const pipeline = getPipeline(pipelineId);
    if (pipeline) {
        pipeline.isCancelled = true;
        console.log(`[Server Lib] Marked pipeline ${pipelineId} as cancelled.`);
    }
};

/**
 * Simulates the execution of the pipeline stages on the server.
 * This function iterates through stages, updating their status and introducing delays and potential failures.
 * @param pipelineId The ID of the pipeline to run.
 */
export const runServerPipeline = async (pipelineId: string): Promise<void> => {
    const pipeline = getPipeline(pipelineId);
    if (!pipeline) {
        console.error(`[Server Lib] Could not run pipeline ${pipelineId}, not found.`);
        return;
    }

    console.log(`[Server Lib] Starting background process for pipeline ${pipelineId}...`);
    for (let i = 0; i < pipeline.stages.length; i++) {
        if (pipeline.isCancelled) {
            console.log(`[Server Lib] Pipeline ${pipelineId} was cancelled.`);
            return;
        }

        pipeline.stages[i].status = PipelineStatus.RUNNING;
        
        await delay(STAGE_DURATION + Math.random() * STAGE_DURATION_VARIANCE);

        if (pipeline.isCancelled) {
            console.log(`[Server Lib] Pipeline ${pipelineId} was cancelled during stage ${i}.`);
            return;
        }

        const didFail = Math.random() < FAILURE_CHANCE;
        if (didFail) {
            pipeline.stages[i].status = PipelineStatus.FAILED;
            console.log(`[Server Lib] Pipeline ${pipelineId} failed at stage ${i}.`);
            return; // Stop on failure
        } else {
            pipeline.stages[i].status = PipelineStatus.COMPLETED;
        }
    }
    console.log(`[Server Lib] Pipeline ${pipelineId} finished successfully.`);
};
