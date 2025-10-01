import { PipelineStageData } from '../types';

// This service acts as the API client for the frontend. It simulates making
// network requests to our backend API endpoints. In a real application, the
// function calls in this file would be replaced with `fetch` requests to a live server.

import startApiHandler from '../api/start';
import statusApiHandler from '../api/status';
import cancelApiHandler from '../api/cancel';

/**
 * Calls the backend to start a new pipeline run.
 * @param theme The user-provided theme for the video.
 * @returns A promise that resolves with the ID of the new pipeline.
 */
export const startPipeline = async (theme: string): Promise<{ pipelineId: string }> => {
  console.log(`[API Client] Calling POST /api/start with theme: "${theme}"`);
  
  const mockRequest = { body: { theme } };
  const responsePayload = await startApiHandler(mockRequest);
  
  return responsePayload;
};

/**
 * Calls the backend to fetch the current status of a pipeline.
 * @param pipelineId The ID of the pipeline to check.
 * @returns A promise that resolves with the current stages and overall status.
 */
export const getPipelineStatus = async (pipelineId: string): Promise<{ stages: PipelineStageData[], isComplete: boolean, hasFailed: boolean }> => {
  // In a real app, the ID would be in the URL, e.g., `/api/status?id=${pipelineId}`
  const mockRequest = { query: { pipelineId } };
  const responsePayload = await statusApiHandler(mockRequest);
  
  return responsePayload;
};

/**
 * Calls the backend to cancel a running pipeline.
 * @param pipelineId The ID of the pipeline to cancel.
 */
export const cancelPipeline = async (pipelineId: string): Promise<void> => {
  console.log(`[API Client] Calling POST /api/cancel for pipeline ${pipelineId}`);
  
  const mockRequest = { body: { pipelineId } };
  await cancelApiHandler(mockRequest);
};
