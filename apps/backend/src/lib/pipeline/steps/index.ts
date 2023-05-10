import { TBlurOptions, blur } from './blur';
import { TCropOptions, crop } from './crop';
import { TExtendOptions, extend } from './extend';
import { TFlipOptions, flip } from './flip';
import { TGammaOptions, gamma } from './gamma';
import { TGrayscaleOptions, grayscale } from './grayscale';
import { TModulateOptions, modulate } from './modulate';
import { TNegativeOptions, negative } from './negative';
import { TOutputOptions, output } from './output';
import { TResizeOptions, resize } from './resize';
import { TRotateOptions, rotate } from './rotate';
import { TTextOptions, text } from './text';
import { TTintOptions, tint } from './tint';

export type TStep =
  | TOutputOptions
  | TResizeOptions
  | TExtendOptions
  | TCropOptions
  | TRotateOptions
  | TModulateOptions
  | TFlipOptions
  | TBlurOptions
  | TGammaOptions
  | TNegativeOptions
  | TTintOptions
  | TGrayscaleOptions
  | TTextOptions;

export const functions = {
  input: (buffer: Buffer) => {
    return buffer;
  },
  output,
  resize,
  extend,
  crop,
  rotate,
  modulate,
  flip,
  blur,
  gamma,
  negative,
  tint,
  grayscale,
  text,
  noop: (buffer: Buffer) => {
    return buffer;
  },
};

export const STEPNAME_TO_FN: Record<string, keyof typeof functions> = {
  InputImage: 'input',
  Output: 'output',
  Resize: 'resize',
  Extend: 'extend',
  Crop: 'crop',
  Rotate: 'rotate',
  Modulate: 'modulate',
  Flip: 'flip',
  Blur: 'blur',
  Gamma: 'gamma',
  Negative: 'negative',
  Tint: 'tint',
  Grayscale: 'grayscale',
  Text: 'text',
  Default: 'noop',
};
