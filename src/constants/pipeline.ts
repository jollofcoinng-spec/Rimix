import { PipelineStageData, PipelineStatus } from '../types';

export const PIPELINE_STAGES: Omit<PipelineStageData, 'status'>[] = [
  {
    id: 1,
    title: 'Step 1: Understanding the Original Video',
    subtitle: 'Breaking it Down',
    inputs: [
      { title: 'Original Video', description: 'The video we want to remix, taken from secure storage.' },
    ],
    actions: [
      { title: 'Find the Scenes', description: 'Analyze the video to identify every scene change.', service: 'Video Intelligence API' },
      { title: 'Figure Out the Story', description: 'Describe each scene and the overall mood to understand the vibe.', service: 'Gemini 2.5 Flash' },
    ],
    outputs: [
      { title: 'Story Blueprint', description: 'A file that maps out the timing, scenes, and emotions of the video.' },
    ],
  },
  {
    id: 2,
    title: 'Step 2: Writing a New Script',
    subtitle: 'Getting Creative',
    inputs: [
      { title: 'Story Blueprint', description: 'The plan created in the last step.' },
    ],
    actions: [
      { title: 'Create a New Story', description: 'Write a new, creative script based on the original video\'s structure.', service: 'Gemini 2.5 Flash' },
      { title: 'Apply a Character Style', description: 'Give the new script a fun personality, like a "Cyberpunk Shogun".' },
    ],
    outputs: [
      { title: 'The New Script', description: 'The final script with new dialogue and scene descriptions.' },
    ],
  },
  {
    id: 3,
    title: 'Step 3: Creating the Video Clips',
    subtitle: 'Lights, Camera, Action!',
    inputs: [
      { title: 'The New Script', description: 'The script written in Step 2.' },
    ],
    actions: [
      { title: 'Design the First Frame', description: 'Create a starting image for each new scene to guide the AI.', service: 'Imagen 3' },
      { title: 'Generate Video Clips', description: 'Turn the starting frames into action-packed video clips.', service: 'Veo' },
    ],
    outputs: [
      { title: 'Folder of New Video Clips', description: 'A collection of brand-new video clips stored securely.' },
    ],
  },
  {
    id: 4,
    title: 'Step 4: Putting It All Together',
    subtitle: 'The Final Cut',
    inputs: [
      { title: 'Folder of New Video Clips', description: 'All the clips generated in the previous step.' },
      { title: 'The New Script', description: 'Used to create the voiceover.' },
    ],
    actions: [
      { title: 'Stitch Clips into a Video', description: 'Edit all the clips together to create the final videos.', service: 'GKE' },
      { title: 'Add Voiceover', description: 'Generate a voiceover from the script and add it to the video.' },
    ],
    outputs: [
      { title: 'YouTube Version (16:9)', description: 'A widescreen video for cinematic viewing.' },
      { title: 'TikTok/Reels Version (9:16)', description: 'A tall video perfect for social media.' },
      { title: 'Instagram Version (1:1)', description: 'A square video for posts and feeds.' },
    ],
  },
  {
    id: 5,
    title: 'Step 5: Ready for the World!',
    subtitle: 'Checking Our Work',
    inputs: [
        { title: 'The Whole AI Process', description: 'The complete, repeatable recipe for making these videos.' },
    ],
    actions: [
      { title: 'Package the AI', description: 'Bundle the entire process so it can be run with a single click.' },
      { title: 'Track Performance and Cost', description: 'Set up dashboards to monitor how fast and efficiently the AI is working.', service: 'BigQuery' },
    ],
    outputs: [
      { title: 'Cost Report', description: 'A live dashboard showing how much it costs to run the AI.' },
      { title: 'Technical Log File', description: 'Detailed notes for our engineers to review.' },
    ],
  },
];
