import { getPipeline } from '../lib/pipeline-manager';
import { PipelineStageData, PipelineStatus } from '../types';

/**
 * MOCK API ENDPOINT: GET /api/status
 * This function simulates a serverless API endpoint that fetches the status of a pipeline.
 *
 * @param req - A mock request object containing query parameters.
 * @returns A promise that resolves to the current pipeline status.
 */
export default async function statusApiHandler(
  req: { query: { pipelineId: string } }
): Promise<{ stages: PipelineStageData[], isComplete: boolean, hasFailed: boolean }> {
  const { pipelineId } = req.query;

  if (!pipelineId) {
    throw new Error("API Error: pipelineId is required to get status.");
  }

  const pipeline = getPipeline(pipelineId);

  if (!pipeline) {
    throw new Error("API Error: Pipeline not found.");
  }
  
  const hasFailed = pipeline.stages.some(s => s.status === PipelineStatus.FAILED);
  const isComplete = !hasFailed && pipeline.stages.every(s => s.status === PipelineStatus.COMPLETED);

  // Simulate network latency
  await new Promise(resolve => setTimeout(resolve, 100));
  
  // Return a deep copy to prevent direct mutation of the "server" state from the client
  return { 
      stages: JSON.parse(JSON.stringify(pipeline.stages)),
      isComplete,
      hasFailed
  };
}
