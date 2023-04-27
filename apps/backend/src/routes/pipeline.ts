import express from 'express';
import { db } from '../lib/db';
import authMiddleware from '../middlewares/auth';

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

export default router;
