import { Job, Queue, Worker } from 'bullmq';
import { db } from './db';
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
  jobId: string;
  priority: number;
}) {
  const queue = getJobQueue();
  const job = await queue.add('pipeline', data, {
    jobId: data.jobId,
    priority: data.priority,
  });
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

    const result = await runPipeline(streams, pipeline, pipelineId, userId, (progress: any) => {
      job.updateProgress(progress);
    });

    // TODO: Maybe we can add timing stats here and bill the user accordingly??
    return result;
  },
  {
    concurrency: 5,
    connection: redisOptions,
  }
);

worker.on('active', async (job) => {
  console.log(`Job ${job.id} active.`);
  await db().job.update({
    where: {
      id: job.id,
    },
    data: {
      status: 'active',
    },
  });
});

worker.on('completed', async (job, result) => {
  console.log(`Job ${job.id} completed.`);
  const updatedJob = await db().job.update({
    where: {
      id: job.id,
    },
    data: {
      status: 'completed',
      progress: 100,
      finishedAt: new Date(),
    },
  });

  await db().account.update({
    where: {
      id: job.data.userId,
    },
    data: {
      totalImagesProcessed: {
        increment: result.processedFiles.length,
      },
      totalProcessDuration: {
        // Milliseconds
        increment: (updatedJob.finishedAt as Date).getTime() - updatedJob.createdAt.getTime(),
      },
      monthlyImagesProcessed: {
        increment: result.processedFiles.length,
      },
      monthlyProcessDuration: {
        // Milliseconds
        increment: (updatedJob.finishedAt as Date).getTime() - updatedJob.createdAt.getTime(),
      },
      credits: {
        decrement: result.processedFiles.length,
      },
    },
  });

  await db().pipeline.update({
    where: {
      id: job.data.pipelineId,
    },
    data: {
      runCount: {
        increment: 1,
      },
      processedImageCount: {
        increment: result.processedFiles.length,
      },
      lastRun: new Date(),
    },
  });

  const fileInserts = [];
  for (const file of result.processedFiles) {
    fileInserts.push(
      db().file.create({
        data: {
          storageKey: file,
          jobId: job.id as string,
        },
      })
    );
  }

  await db().$transaction(fileInserts);
});

worker.on('failed', async (job, error) => {
  console.error('Whoopsie.', error);
  await db().job.update({
    where: {
      id: (job as Job<any, any, string>).id,
    },
    data: {
      status: 'failed',
    },
  });
});

worker.on('error', (error) => {
  console.log('Worker Error... FUCK!', error);
});
