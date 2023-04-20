import sharp from 'sharp';
import * as Steps from './steps';

const STEPNAME_TO_FN: Record<string, keyof typeof Steps> = {
  Resize: 'resize',
  Output: 'output',
};

type TPipeline = {
  steps: Steps.TStep[];
};

export async function runPipeline(image: sharp.Sharp, pipeline: TPipeline) {
  for (const step of pipeline.steps) {
    console.log(`Running:\t${step.name}(args: [${JSON.stringify(step.args)}])`);
    Steps[STEPNAME_TO_FN[step.name]](image, step.args as any);

    if (step.name === 'Output') {
      // TODO: We probably want to upload the image to cloud storage here.
      break;
    }
  }

  return image;
}
