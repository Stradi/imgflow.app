import dotenv from 'dotenv';
dotenv.config();

import express, { Application } from 'express';
import router from './routes';

const app: Application = express();
const port = 3001;

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

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
