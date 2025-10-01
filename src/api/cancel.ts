import { cancelPipelineInState } from '../lib/pipeline-manager';

/**
 * MOCK API ENDPOINT: POST /api/cancel
 * This function simulates a serverless API endpoint that cancels a running pipeline.
 *
 * @param req - A mock request object containing the pipeline ID in the body.
 */
export default async function cancelApiHandler(
  req: { body: { pipelineId: string } }
): Promise<void> {
  const { pipelineId } = req.body;
  if (!pipelineId) {
    throw new Error("API Error: pipelineId is required to cancel.");
  }

  cancelPipelineInState(pipelineId);

  // Simulate network latency
  await new Promise(resolve => setTimeout(resolve, 100));
}
