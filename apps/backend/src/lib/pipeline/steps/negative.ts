import sharp from 'sharp';

export type TNegativeOptions = {
  name: 'Negative';
  args: {};
};

export function negative(image: sharp.Sharp, options: TNegativeOptions['args']) {
  image.negate(true);
}
