import express from 'express';
import authMiddleware from '../middlewares/auth';
import accountRouter from './account';
import pipelineRouter from './pipeline';
import uploadRouter from './upload';

const router = express.Router();
router.use('/api/v1/account', accountRouter);
router.use('/api/v1/upload', authMiddleware, uploadRouter);
router.use('/api/v1/pipeline', authMiddleware, pipelineRouter);

export default router;
