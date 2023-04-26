import express from 'express';
import accountRouter from './account';
import uploadRouter from './upload';

const router = express.Router();
router.use('/api/v1/account', accountRouter);
router.use('/api/v1/upload', uploadRouter);

export default router;
