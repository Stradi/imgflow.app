import express from 'express';
import multer from 'multer';
import { addJobToQueue } from '../lib/bullmq';
import { db } from '../lib/db';
import { s3, uploadImageOriginal } from '../lib/s3';
import authMiddleware from '../middlewares/auth';
import { ApiError } from '../utils/apiError';

const router = express.Router();

// TODO: 404 stuff etc.

router.post('/', authMiddleware, async (req, res) => {
  const { name, dataJson } = req.body;

  if (!name || !dataJson) {
    return res.json({
      error: 'Invalid body',
    });
  }

  const pipeline = await db().pipeline.create({
    data: {
      name,
      dataJson,
      userId: req.user.id,
    },
  });

  res.json({
    message: 'Success',
    data: pipeline,
  });
});

router.get('/', authMiddleware, async (req, res) => {
  const pipelines = await db().pipeline.findMany({
    where: {
      userId: req.user.id,
    },
  });

  res.json({
    message: 'Success',
    data: pipelines,
  });
});

router.get('/:id', authMiddleware, async (req, res) => {
  const { id } = req.params;

  if (isNaN(Number(id))) {
    return res.json({
      error: 'Invalid id',
    });
  }

  const pipeline = await db().pipeline.findUnique({
    where: {
      id: Number(id),
    },
  });

  res.json({
    message: 'Success',
    data: pipeline,
  });
});

router.put('/:id', authMiddleware, async (req, res) => {
  const { name, dataJson } = req.body;
  if (!name && !dataJson) {
    return res.json({
      error: 'Invalid body',
    });
  }

  const { id } = req.params;
  if (isNaN(Number(id))) {
    return res.json({
      error: 'Invalid id',
    });
  }

  const pipeline = await db().pipeline.update({
    where: {
      id: Number(id),
    },
    data: {
      name,
      dataJson,
    },
  });

  res.json({
    message: 'Updated',
    data: pipeline,
  });
});

router.delete('/:id', authMiddleware, async (req, res) => {
  const { id } = req.params;
  if (isNaN(Number(id))) {
    return res.json({
      error: 'Invalid id',
    });
  }

  const pipeline = await db().pipeline.delete({
    where: {
      id: Number(id),
    },
  });

  res.json({
    message: 'Deleted',
    data: pipeline,
  });
});

const memoryStorage = multer.memoryStorage();
const upload = multer({
  storage: memoryStorage,
});

function handleErrors(req: express.Request, res: express.Response) {
  if (!req.body) {
    return res.json(
      ApiError.badRequest(
        'No body was provided',
        'Client did not provide a body in the request.',
        'Re-send the request with a body in the request. The body should be in the form of an object with the key "images" and the value being the file.'
      )
    );
  }

  if (!req.files || req.files.length === 0) {
    return res.json(
      ApiError.badRequest(
        'No files were provided',
        'Client did not provide any files in the request body.',
        'Re-send the request with files in the request body. The files should be in the form of an array of objects with the key "images" and the value being the file.'
      )
    );
  }

  const files = req.files as Express.Multer.File[];

  if (files.length > 10) {
    return res.json(
      ApiError.badRequest(
        'Too many files',
        'Client provided more than 10 files in the request body.',
        'Re-send the request with less than 10 files in the request body.'
      )
    );
  }

  if (files.filter((file) => !file.mimetype.includes('image/')).length > 0) {
    return res.json(
      ApiError.badRequest(
        'Invalid file type',
        'Client provided files that were not images.',
        'Re-send the request. While sending the request, make sure that the all files are images.'
      )
    );
  }

  if (files.filter((file) => file.size > 100000000).length > 0) {
    return res.json(
      ApiError.badRequest(
        'File too large',
        'Client provided files that were larger than 100MB.',
        'Re-send the request. While sending the request, make sure that the files are not larger than 100MB.'
      )
    );
  }

  return false;
}

router.post('/:id/run', authMiddleware, upload.array('images', 10), async (req, res) => {
  const errors = handleErrors(req, res);
  if (errors) return errors;

  const pipeline = await db().pipeline.findUnique({
    where: {
      id: Number(req.params.id),
    },
  });

  if (!pipeline) {
    return res.json(
      ApiError.notFound(
        'Pipeline not found',
        'The pipeline with the given id was not found.',
        'Make sure that the id is correct and try again.'
      )
    );
  }

  const files = req.files as Express.Multer.File[];
  const userId = req.user.id;

  const imageGuids = [];
  for (const file of files) {
    imageGuids.push(await uploadImageOriginal(s3(), file.buffer, userId));
  }

  const dbJob = await db().job.create({
    data: {
      pipelineId: pipeline.id,
      userId,
      status: 'waiting',
    },
  });

  const job = await addJobToQueue({
    files: imageGuids as any,
    pipeline: JSON.parse(pipeline.dataJson),
    pipelineId: pipeline.id,
    userId,
    jobId: dbJob.id,
  });

  res.json({
    message: 'Job created',
    data: {
      id: job.id,
    },
  });
});

export default router;
