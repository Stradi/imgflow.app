import dotenv from 'dotenv';
dotenv.config();

import cors from 'cors';
import express, { Application, NextFunction, Request, Response } from 'express';
import { getJobQueue } from './lib/bullmq';
import router from './routes';

const app: Application = express();
const port = 3001;

// We are doing this to initialize the queue.
getJobQueue();

app.use(cors());

app.use((req, res, next) => {
  res.setHeader('X-Powered-By', 'Mostly coffee, but blood and tears too :)');
  res.setHeader('X-Api-Version', '0.0.0');
  next();
});

app.use(express.json());
app.use(router);
app.get('/', (req, res) => {
  res.json({
    message: 'Hello World!',
  });
});

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({
    error: error.message,
  });
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
