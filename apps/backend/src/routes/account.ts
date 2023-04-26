import bcrypt from 'bcrypt';
import express from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { db } from '../lib/db';

const router = express.Router();

router.post('/create-account', async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
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
      name: name,
      email: email,
      password: hashedPassword,
    },
  });

  return res.json({
    message: 'Account created successfully',
    data: {
      id: createdUser.id,
      name: createdUser.name,
      email: createdUser.email,
    },
  });
});

router.post('login', async (req, res) => {
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

  const accessToken = jwt.sign({ id: user.id }, process.env.JWT_ACCESS_SECRET, { expiresIn: '15m' });
  const refreshToken = jwt.sign({ id: user.id }, process.env.JWT_REFRESH_SECRET, { expiresIn: '1d' });

  return res.json({
    message: 'Login successful',
    data: {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      accessToken,
      refreshToken,
    },
  });
});

router.post('/refresh', async (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken) {
    return res.json({
      error: 'Invalid body',
    });
  }

  let decoded = null;
  try {
    decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
  } catch (e) {
    return res.json({
      error: 'Invalid token',
    });
  }

  const accessToken = jwt.sign({ id: (decoded as JwtPayload).id }, process.env.JWT_ACCESS_SECRET, { expiresIn: '15m' });
  const newRefreshToken = jwt.sign({ id: (decoded as JwtPayload).id }, process.env.JWT_REFRESH_SECRET, {
    expiresIn: '1d',
  });

  return res.json({
    message: 'Token refreshed',
    data: {
      accessToken,
      refreshToken: newRefreshToken,
    },
  });
});

export default router;
