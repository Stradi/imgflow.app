import sharp from 'sharp';

export type TBlurOptions = {
  name: 'Blur';
  args: {
    sigma?: number;
  };
};

export function blur(image: sharp.Sharp, options: TBlurOptions['args']) {
  image.blur(options.sigma);
}
