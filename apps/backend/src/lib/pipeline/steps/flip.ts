import sharp from 'sharp';

export type TFlipOptions = {
  name: 'Flip';
  args: {
    x?: boolean;
    y?: boolean;
  };
};

export async function flip(buffer: Buffer, options: TFlipOptions['args']) {
  const newImg = sharp(buffer);

  if (options.x) {
    newImg.flop();
  }

  if (options.y) {
    newImg.flip();
  }

  return await newImg.toBuffer();
}
