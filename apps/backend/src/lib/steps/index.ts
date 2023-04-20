import { TOutputOptions, output } from './output';
import { TResizeOptions, resize } from './resize';

export type TStep = TOutputOptions | TResizeOptions;
export { output, resize };
