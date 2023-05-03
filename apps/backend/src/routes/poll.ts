import express from 'express';
import { getJob } from '../lib/bullmq';
const router = express.Router();

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  if (isNaN(Number(id))) {
    return res.json({
      error: 'Invalid id',
    });
  }

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
