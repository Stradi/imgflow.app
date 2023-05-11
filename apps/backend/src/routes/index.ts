import express from 'express';
import authMiddleware from '../middlewares/auth';
import accountRouter from './account';
import jobRouter from './job';
import pipelineRouter from './pipeline';
import whRouter from './wh';

const router = express.Router();
router.use('/api/v1/account', accountRouter);
router.use('/api/v1/pipeline', authMiddleware, pipelineRouter);
router.use('/api/v1/job', authMiddleware, jobRouter);
router.use('/api/v1/wh', whRouter); // Webhook

export default router;
