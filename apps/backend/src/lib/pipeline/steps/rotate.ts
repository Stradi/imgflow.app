import sharp from 'sharp';

export type TRotateOptions = {
  name: 'Rotate';
  args: {
    angle?: number;
    background?: string;
  };
};

export async function rotate(buffer: Buffer, options: TRotateOptions['args']) {
  const newImg = sharp(buffer);

  newImg.rotate(options.angle, {
    background: options.background,
  });

  return await newImg.toBuffer();
}
