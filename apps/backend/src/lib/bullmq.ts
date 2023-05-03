import { Queue, Worker } from 'bullmq';
import { TPipeline, runPipeline } from './pipeline/runner';

if (!process.env.REDIS_HOST || !process.env.REDIS_PORT) {
  throw new Error('Missing environment variables for Redis client.');
}

const redisOptions = { host: process.env.REDIS_HOST, port: Number.parseInt(process.env.REDIS_PORT) };
let jobQueue: Queue | null = null;

export function getJobQueue() {
  if (!jobQueue) {
    jobQueue = new Queue('pipeline', { connection: redisOptions });
    console.log('BullMQ queue initialized.');
  }

  return jobQueue;
}

export async function addJobToQueue(data: {
  pipeline: TPipeline;
  pipelineId: number;
  userId: number;
  files: Express.Multer.File[];
}) {
  const queue = getJobQueue();

  const redisCompatibleData = {
    ...data,
    files: data.files.map((file) => file.buffer.toString('base64')),
  };

  const job = await queue.add('pipeline', redisCompatibleData);
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

    const result = await runPipeline(
      files.map((file: any) => Buffer.from(file, 'base64')),
      pipeline,
      pipelineId,
      userId
    );

    // TODO: Maybe we can add timing stats here and bill the user accordingly??
    return result;
  },
  {
    concurrency: 5,
    connection: redisOptions,
  }
);

// worker.on('active', (job) => {
//   console.log(`Job ${job.id} active.`);
// });

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
