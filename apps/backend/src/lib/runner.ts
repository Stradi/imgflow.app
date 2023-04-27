import sharp from 'sharp';
import { s3, uploadImage } from './s3';
import * as Steps from './steps';

const STEPNAME_TO_FN: Record<string, keyof typeof Steps> = {
  Resize: 'resize',
  Output: 'output',
};

export type TPipeline = {
  steps: Steps.TStep[];
};

export async function runPipeline(image: sharp.Sharp, pipeline: TPipeline, key: string) {
  const outputStep = pipeline.steps.find((step) => step.name === 'Output');
  if (!outputStep) {
    return '';
  }

  for (const step of pipeline.steps) {
    if (!STEPNAME_TO_FN[step.name]) {
      console.error(`Could not find step ${step.name}, continuing...`);
      continue;
    }

    if (step.name === 'Output') {
      await uploadImage(s3(), await image.toBuffer(), `${key}.${step.args.format}`, `image/${step.args.format}`);
      return `${key}.${step.args.format}`;
    }

    Steps[STEPNAME_TO_FN[step.name]](image, step.args as any);
  }

  console.error('This should never happen. If you see this then I definitely fucked up this shit.');
  return '';
}
