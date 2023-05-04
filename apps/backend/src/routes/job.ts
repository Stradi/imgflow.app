import express from 'express';
import { getJob } from '../lib/bullmq';
import { db } from '../lib/db';
import authMiddleware from '../middlewares/auth';
const router = express.Router();

router.get('/', authMiddleware, async (req, res) => {
  const jobs = await db().job.findMany({
    where: {
      userId: req.user.id,
    },
  });

  res.json({
    message: 'Success',
    data: jobs || [],
  });
});

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

export default router;
