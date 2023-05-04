import express from 'express';
import { getJob } from '../lib/bullmq';
import { db } from '../lib/db';
const router = express.Router();

router.get('/', async (req, res) => {
  const jobs = db().job.findMany({
    where: {
      userId: req.user.id,
    },
  });

  res.json({
    message: 'Success',
    data: jobs,
  });
});

router.get('/:id', async (req, res) => {
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
      state,
      progress,
    },
  });
});

export default router;
