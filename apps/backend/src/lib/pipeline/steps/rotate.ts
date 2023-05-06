import sharp from 'sharp';

export type TRotateOptions = {
  name: 'Rotate';
  args: {
    angle?: number;
    background?: string;
  };
};

export function rotate(image: sharp.Sharp, options: TRotateOptions['args']) {
  image.rotate(options.angle, {
    background: options.background,
  });
}
