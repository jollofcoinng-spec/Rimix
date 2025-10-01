export enum PipelineStatus {
  PENDING = 'PENDING',
  RUNNING = 'RUNNING',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
}

export interface DetailItem {
  title: string;
  description: string;
  service?: string;
}

export interface PipelineStageData {
  id: number;
  title: string;
  subtitle: string;
  status: PipelineStatus;
  inputs: DetailItem[];
  actions: DetailItem[];
  outputs: DetailItem[];
}
