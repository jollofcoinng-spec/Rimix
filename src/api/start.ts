import { createPipeline, runServerPipeline } from '../lib/pipeline-manager';

/**
 * MOCK API ENDPOINT: POST /api/start
 * This function simulates a serverless API endpoint that starts a new pipeline.
 *
 * @param req - A mock request object containing the request body.
 * @returns A promise that resolves to the JSON payload a real API would return.
 */
export default async function startApiHandler(
  req: { body: { theme: string } }
): Promise<{ pipelineId: string }> {
  const { theme } = req.body;
  if (!theme) {
    throw new Error("API Error: Theme is required to start a pipeline.");
  }

  // Create the pipeline entry in our "database"
  const { pipelineId } = createPipeline(theme);
  
  // Start the background process but don't wait for it to finish
  runServerPipeline(pipelineId);

  // Simulate network latency before responding to the client
  await new Promise(resolve => setTimeout(resolve, 150));
  
  // Return the success response
  return { pipelineId };
}
