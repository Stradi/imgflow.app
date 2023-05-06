import sharp from 'sharp';

export type TTintOptions = {
  name: 'Tint';
  args: {
    color: sharp.Color;
  };
};

export function tint(image: sharp.Sharp, options: TTintOptions['args']) {
  image.tint(options.color);
}
