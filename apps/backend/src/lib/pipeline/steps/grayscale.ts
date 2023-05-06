import sharp from 'sharp';

export type TGrayscaleOptions = {
  name: 'Grayscale';
  args: {};
};

export function grayscale(image: sharp.Sharp, options: TGrayscaleOptions['args']) {
  image.grayscale(true);
}
