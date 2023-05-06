import sharp from 'sharp';

export type TTintOptions = {
  name: 'Tint';
  args: {
    color: string;
  };
};

export function tint(image: sharp.Sharp, options: TTintOptions['args']) {
  image.tint(options.color);
}
