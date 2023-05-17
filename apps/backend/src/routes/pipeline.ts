import express from 'express';
import multer from 'multer';
import { addJobToQueue } from '../lib/bullmq';
import { db } from '../lib/db';
import { getEstimatedCredits } from '../lib/pipeline/runner';
import { s3, uploadImageOriginal } from '../lib/s3';
import authMiddleware from '../middlewares/auth';
import {
  getConcurrentJobLimitForSubscription,
  getJobPriorityForSubscription,
  getPipelineFilesizeLimitForSubscription,
  getPipelineLimitForSubscription,
  prettyBytes,
} from '../utils/subscription';

const router = express.Router();

// TODO: 404 stuff etc.

router.post('/', authMiddleware, async (req, res) => {
  const allPipelines = await db().pipeline.findMany({
    where: {
      userId: req.user.id,
    },
  });

  if (!req.user.subscription && allPipelines.length === 1) {
    return res.json({
      error: 'Free plan only allows 1 pipeline',
    });
  }

  if (req.user.subscription) {
    const limit = getPipelineLimitForSubscription(req.user.subscription.variantId);
    if (allPipelines.length >= limit) {
      return res.json({
        error: `Your plan only allows ${limit} pipelines.`,
      });
    }
  }

  const { name, dataJson } = req.body;

  if (!name || !dataJson) {
    return res.json({
      error: 'Invalid body',
    });
  }

  const pipeline = await db().pipeline.create({
    data: {
      name,
      dataJson,
      userId: req.user.id,
    },
  });

  res.json({
    message: 'Success',
    data: pipeline,
  });
});

router.get('/', authMiddleware, async (req, res) => {
  const pipelines = await db().pipeline.findMany({
    where: {
      userId: req.user.id,
    },
  });

  res.json({
    message: 'Success',
    data: pipelines,
  });
});

router.get('/:id', authMiddleware, async (req, res) => {
  const { id } = req.params;

  if (isNaN(Number(id))) {
    return res.json({
      error: 'Invalid id',
    });
  }

  const pipeline = await db().pipeline.findUnique({
    where: {
      id: Number(id),
    },
  });

  res.json({
    message: 'Success',
    data: pipeline,
  });
});

router.get('/:id/jobs', authMiddleware, async (req, res) => {
  const { id } = req.params;

  if (isNaN(Number(id))) {
    return res.json({
      error: 'Invalid id',
    });
  }

  const jobs = await db().job.findMany({
    where: {
      pipelineId: Number(id),
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  res.json({
    message: 'Success',
    data: jobs,
  });
});

router.put('/:id', authMiddleware, async (req, res) => {
  const { name, dataJson } = req.body;
  if (!name && !dataJson) {
    return res.json({
      error: 'Invalid body',
    });
  }

  const { id } = req.params;
  if (isNaN(Number(id))) {
    return res.json({
      error: 'Invalid id',
    });
  }

  const pipeline = await db().pipeline.update({
    where: {
      id: Number(id),
    },
    data: {
      name,
      dataJson,
    },
  });

  res.json({
    message: 'Updated',
    data: pipeline,
  });
});

router.delete('/:id', authMiddleware, async (req, res) => {
  const { id } = req.params;
  if (isNaN(Number(id))) {
    return res.json({
      error: 'Invalid id',
    });
  }

  const pipeline = await db().pipeline.delete({
    where: {
      id: Number(id),
    },
  });

  res.json({
    message: 'Deleted',
    data: pipeline,
  });
});

const memoryStorage = multer.memoryStorage();
const upload = multer({
  storage: memoryStorage,
});

function handleErrors(req: express.Request, res: express.Response) {
  if (!req.body) {
    return res.json({
      error: 'Invalid body',
    });
  }

  if (!req.files || req.files.length === 0) {
    return res.json({
      error: 'No files provided',
    });
  }

  const files = req.files as Express.Multer.File[];

  if (files.filter((file) => !file.mimetype.includes('image/')).length > 0) {
    return res.json({
      error: 'Only images are allowed',
    });
  }

  return false;
}

router.post('/:id/run', authMiddleware, upload.array('images'), async (req, res) => {
  const errors = handleErrors(req, res);
  if (errors) return errors;

  const files = req.files as Express.Multer.File[];
  const userId = req.user.id;

  const filesizeLimit = getPipelineFilesizeLimitForSubscription(req.user.subscription?.variantId);
  if (files.filter((f) => f.size > filesizeLimit).length > 0) {
    return res.json({
      error: `File size limit exceeded. Your plan only allows ${prettyBytes(filesizeLimit)} per file.`,
    });
  }

  const concurrentJobLimit = getConcurrentJobLimitForSubscription(req.user.subscription?.variantId);
  const runningJobs = await db().job.count({
    where: {
      userId,
      status: {
        in: ['active', 'waiting'],
      },
    },
  });

  if (runningJobs >= concurrentJobLimit) {
    return res.json({
      error: `Concurrent job limit exceeded. Your plan only allows ${concurrentJobLimit} concurrent jobs.`,
    });
  }

  const account = await db().account.findUnique({
    where: {
      id: userId,
    },
  });

  if (!account) {
    return res.json({
      error: 'No account',
    });
  }

  if (!account.credits) {
    return res.json({
      error: 'No credits',
    });
  }

  const pipeline = await db().pipeline.findUnique({
    where: {
      id: Number(req.params.id),
    },
  });

  if (!pipeline) {
    return res.json({
      error: 'Invalid pipeline',
    });
  }

  const estimatedCreditUsage = getEstimatedCredits(files, JSON.parse(pipeline.dataJson));
  if (estimatedCreditUsage <= 0) {
    return res.json({
      error: 'Pipeline is not valid',
    });
  }

  if (account.credits < estimatedCreditUsage) {
    return res.json({
      error: 'Not enough credits',
    });
  }

  const imageGuids = [];
  for (const file of files) {
    imageGuids.push(await uploadImageOriginal(s3(), file.buffer, userId));
  }

  const dbJob = await db().job.create({
    data: {
      pipelineId: pipeline.id,
      userId,
      status: 'waiting',
      imageCount: files.length,
      progress: 0,
    },
  });

  await addJobToQueue({
    files: imageGuids as any,
    pipeline: JSON.parse(pipeline.dataJson),
    pipelineId: pipeline.id,
    userId,
    jobId: dbJob.id,
    priority: getJobPriorityForSubscription(req.user.subscription?.variantId),
  });

  res.json({
    message: 'Job created',
    data: dbJob,
  });
});

export default router;
