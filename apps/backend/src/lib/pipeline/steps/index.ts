import { crop } from './crop';
import { TExtendOptions, extend } from './extend';
import { TOutputOptions, output } from './output';
import { TResizeOptions, resize } from './resize';

export type TStep = TOutputOptions | TResizeOptions | TExtendOptions;

export const functions = {
  resize,
  output,
  extend,
  crop,
};

export const STEPNAME_TO_FN: Record<string, keyof typeof functions> = {
  Resize: 'resize',
  Output: 'output',
  Extend: 'extend',
  Crop: 'crop',
};
