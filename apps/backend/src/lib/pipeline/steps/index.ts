import { crop } from './crop';
import { TExtendOptions, extend } from './extend';
import { TOutputOptions, output } from './output';
import { TResizeOptions, resize } from './resize';

export type TStep = TOutputOptions | TResizeOptions | TExtendOptions;

export const functions = {
  input: () => {},
  resize,
  output,
  extend,
  crop,
  noop: () => {},
};

export const STEPNAME_TO_FN: Record<string, keyof typeof functions> = {
  InputImage: 'input',
  Resize: 'resize',
  Output: 'output',
  Extend: 'extend',
  Crop: 'crop',
  Default: 'noop',
};
