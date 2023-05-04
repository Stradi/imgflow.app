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

  const job = await getJob(id);
  if (!job) {
    return res.json({
      error: 'Job not found',
    });
  }

  const state = await job.getState();
  const progress = job.progress;

  res.json({
    message: 'Success',
    data: {
      id: job.id,
      status: state,
      progress,
    },
  });
});

export default router;
