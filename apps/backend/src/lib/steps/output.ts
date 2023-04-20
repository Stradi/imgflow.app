import sharp from 'sharp';

export type TOutputOptions = {
  name: 'Output';
  args: {
    format: 'webp' | 'png' | 'jpeg' | 'avif';
    quality: number;
  };
};

export function output(image: sharp.Sharp, options: TOutputOptions['args']) {
  image.toFormat(options.format, {
    quality: options.quality,
  });
}
