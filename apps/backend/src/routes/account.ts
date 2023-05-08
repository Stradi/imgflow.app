import bcrypt from 'bcrypt';
import express from 'express';
import jwt from 'jsonwebtoken';
import { db } from '../lib/db';
import authMiddleware from '../middlewares/auth';

const router = express.Router();

router.post('/create-account', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.json({
      error: 'Invalid body',
    });
  }

  const isExists = await db().account.findUnique({
    where: {
      email: email,
    },
  });

  if (isExists) {
    return res.json({
      error: 'Email already exists',
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const createdUser = await db().account.create({
    data: {
      email: email,
      password: hashedPassword,
    },
  });

  const accessToken = jwt.sign({ id: createdUser.id }, process.env.JWT_ACCESS_SECRET as string, { expiresIn: '7d' });

  return res.json({
    message: 'Account created successfully',
    data: {
      user: {
        id: createdUser.id,
        email: createdUser.email,
      },
      accessToken,
    },
  });
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.json({
      error: 'Invalid body',
    });
  }

  const user = await db().account.findUnique({
    where: {
      email: email,
    },
  });

  if (!user) {
    return res.json({
      error: "User doesn't exist",
    });
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  if (!isPasswordCorrect) {
    return res.json({
      error: 'Invalid password',
    });
  }

  const accessToken = jwt.sign({ id: user.id }, process.env.JWT_ACCESS_SECRET as string, { expiresIn: '7d' });

  return res.json({
    message: 'Login successful',
    data: {
      user: {
        id: user.id,
        email: user.email,
      },
      accessToken,
    },
  });
});

router.get('/me', authMiddleware, async (req, res) => {
  const user = await db().account.findUnique({
    where: {
      id: req.user.id,
    },
  });

  if (!user) {
    return res.json({
      error: "User doesn't exist",
    });
  }

  return res.json({
    message: 'User found',
    data: {
      user: {
        id: user.id,
        email: user.email,
      },
    },
  });
});

export default router;
