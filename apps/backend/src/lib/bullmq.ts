import { Queue, Worker } from 'bullmq';
import { TPipeline, runPipeline } from './pipeline/runner';
import { downloadObject, s3 } from './s3';

if (!process.env.REDIS_HOST || !process.env.REDIS_PORT || !process.env.REDIS_USERNAME || !process.env.REDIS_PASSWORD) {
  throw new Error('Missing environment variables for Redis client.');
}

const redisOptions = {
  host: process.env.REDIS_HOST,
  port: Number.parseInt(process.env.REDIS_PORT),
  username: process.env.REDIS_USERNAME,
  password: process.env.REDIS_PASSWORD,
};
let jobQueue: Queue | null = null;

export function getJobQueue() {
  if (!jobQueue) {
    jobQueue = new Queue('pipeline', {
      connection: redisOptions,
    });
    console.log('BullMQ queue initialized.');
  }

  return jobQueue;
}

export async function addJobToQueue(data: {
  pipeline: TPipeline;
  pipelineId: number;
  userId: number;
  files: {
    key: string;
    uuid: string;
  }[];
}) {
  const queue = getJobQueue();
  const job = await queue.add('pipeline', data);
  return job;
}

export async function getJob(jobId: string) {
  const queue = getJobQueue();
  return await queue.getJob(jobId);
}

const worker = new Worker(
  'pipeline',
  async (job) => {
    const { pipeline, pipelineId, userId, files } = job.data;

    const streams = await Promise.all(
      files.map(async (file: any) => ({
        key: file.key,
        uuid: file.uuid,
        stream: (await (await downloadObject(s3(), file.key))?.transformToByteArray()) as Uint8Array,
      }))
    );

    const result = await runPipeline(streams, pipeline, pipelineId, userId);

    // TODO: Maybe we can add timing stats here and bill the user accordingly??
    return result;
  },
  {
    concurrency: 5,
    connection: redisOptions,
  }
);

worker.on('active', (job) => {
  console.log(`Job ${job.id} active.`);
});

worker.on('completed', (job, result) => {
  console.log(`Job ${job.id} completed.`);
});

worker.on('failed', (job, error) => {
  console.error('Whoopsie.', error);
});

worker.on('error', (error) => {
  console.log('Worker Error... FUCK!', error);
});

// TODO: listen worker.on('progress').
