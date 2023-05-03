import sharp from 'sharp';

export type TCropOptions = {
  name: 'Crop';
  args: {
    top: number;
    left: number;
    width: number;
    height: number;
  };
};

export function crop(image: sharp.Sharp, options: TCropOptions['args']) {
  image.extract(options);
}
