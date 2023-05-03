import dotenv from 'dotenv';
dotenv.config();

import cors from 'cors';
import express, { Application, NextFunction, Request, Response } from 'express';
import router from './routes';

// const exampleReallifeData = {
//   nodes: [
//     {
//       width: 250,
//       height: 43,
//       id: 'node-0',
//       type: 'InputImage',
//       deletable: false,
//       data: {},
//       selected: false,
//       position: { x: -105.26631892785451, y: 11.352307970360357 },
//       positionAbsolute: { x: -105.26631892785451, y: 11.352307970360357 },
//       dragging: false,
//     },
//     {
//       width: 250,
//       height: 83,
//       id: 'node-1',
//       type: 'Output',
//       deletable: false,
//       data: {},
//       selected: false,
//       position: { x: 1126.207541122533, y: 12.939275272358316 },
//       positionAbsolute: { x: 1126.207541122533, y: 12.939275272358316 },
//       dragging: false,
//     },
//     {
//       id: 'node-14',
//       type: 'Crop',
//       position: { x: 481.95911745755313, y: -63.97328505546116 },
//       data: {},
//       width: 250,
//       height: 83,
//       selected: false,
//       positionAbsolute: { x: 481.95911745755313, y: -63.97328505546116 },
//       dragging: false,
//     },
//     {
//       id: 'node-15',
//       type: 'Resize',
//       position: { x: 485.20827339603795, y: 60.224525756123 },
//       data: {},
//       width: 250,
//       height: 83,
//       selected: false,
//       positionAbsolute: { x: 485.20827339603795, y: 60.224525756123 },
//       dragging: false,
//     },
//     {
//       id: 'node-16',
//       type: 'Crop',
//       position: { x: 189.99053443326193, y: 194.563560734624 },
//       data: {},
//       width: 250,
//       height: 83,
//       selected: false,
//       positionAbsolute: { x: 189.99053443326193, y: 194.563560734624 },
//       dragging: false,
//     },
//     {
//       id: 'node-17',
//       type: 'Crop',
//       position: { x: 488.9410589564635, y: 195.06335479661658 },
//       data: {},
//       width: 250,
//       height: 83,
//       selected: false,
//       positionAbsolute: { x: 488.9410589564635, y: 195.06335479661658 },
//       dragging: false,
//     },
//     {
//       id: 'node-18',
//       type: 'Crop',
//       position: { x: 819.9168912694558, y: 110.33973939760506 },
//       data: {},
//       width: 250,
//       height: 83,
//       selected: false,
//       positionAbsolute: { x: 819.9168912694558, y: 110.33973939760506 },
//       dragging: false,
//     },
//     {
//       id: 'node-19',
//       type: 'Crop',
//       position: { x: 819.9493311427763, y: 262.6125288101454 },
//       data: {},
//       width: 250,
//       height: 83,
//       selected: false,
//       positionAbsolute: { x: 819.9493311427763, y: 262.6125288101454 },
//       dragging: false,
//     },
//   ],
//   edges: [
//     {
//       source: 'node-0',
//       sourceHandle: null,
//       target: 'node-14',
//       targetHandle: null,
//       id: 'reactflow__edge-node-0-node-14',
//     },
//     {
//       source: 'node-0',
//       sourceHandle: null,
//       target: 'node-15',
//       targetHandle: null,
//       id: 'reactflow__edge-node-0-node-15',
//     },
//     {
//       source: 'node-0',
//       sourceHandle: null,
//       target: 'node-16',
//       targetHandle: null,
//       id: 'reactflow__edge-node-0-node-16',
//     },
//     {
//       source: 'node-16',
//       sourceHandle: null,
//       target: 'node-17',
//       targetHandle: null,
//       id: 'reactflow__edge-node-16-node-17',
//     },
//     {
//       source: 'node-17',
//       sourceHandle: null,
//       target: 'node-18',
//       targetHandle: null,
//       id: 'reactflow__edge-node-17-node-18',
//     },
//     {
//       source: 'node-17',
//       sourceHandle: null,
//       target: 'node-19',
//       targetHandle: null,
//       id: 'reactflow__edge-node-17-node-19',
//     },
//     {
//       source: 'node-19',
//       sourceHandle: null,
//       target: 'node-1',
//       targetHandle: null,
//       id: 'reactflow__edge-node-19-node-1',
//     },
//   ],
// };
// runPipelineNew(exampleReallifeData);

const app: Application = express();
const port = 3001;

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
