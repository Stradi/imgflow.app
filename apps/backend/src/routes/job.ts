import express from 'express';
import { getJob } from '../lib/bullmq';
import { db } from '../lib/db';
import authMiddleware from '../middlewares/auth';
const router = express.Router();

router.get('/:id', authMiddleware, async (req, res) => {
  const { id } = req.params;

  const job = await db().job.findFirst({
    where: {
      id,
      userId: req.user.id,
    },
  });

  if (!job) {
    return res.status(404).json({
      message: 'Job not found',
    });
  }

  const redisJob = await getJob(job.id);

  res.json({
    message: 'Success',
    data: {
      ...job,
      progress: redisJob?.progress,
    },
  });
});

router.get('/:id/files', authMiddleware, async (req, res) => {
  const { id } = req.params;
  const job = await db().job.findFirst({
    where: {
      id,
      userId: req.user.id,
    },
  });

  if (!job) {
    return res.status(404).json({
      message: 'Job not found',
    });
  }

  if (job.status !== 'completed') {
    return res.status(400).json({
      message: 'Job is not completed',
    });
  }

  const files = await db().file.findMany({
    where: {
      jobId: job.id,
    },
  });

  res.json({
    message: 'Success',
    data: files,
  });
});

export default router;
