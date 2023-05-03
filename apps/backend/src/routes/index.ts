import express from 'express';
import authMiddleware from '../middlewares/auth';
import accountRouter from './account';
import pipelineRouter from './pipeline';
import pollRouter from './poll';

const router = express.Router();
router.use('/api/v1/account', accountRouter);
router.use('/api/v1/pipeline', authMiddleware, pipelineRouter);
router.use('/api/v1/poll', authMiddleware, pollRouter);

export default router;
