import express from 'express';
import uploadRouter from './upload';

const router = express.Router();
router.use('/api/v1/upload', uploadRouter);

export default router;
