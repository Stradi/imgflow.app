import sharp from 'sharp';

export type TTintOptions = {
  name: 'Tint';
  args: {
    color: string;
  };
};

export async function tint(buffer: Buffer, options: TTintOptions['args']) {
  const newImg = sharp(buffer);
  newImg.tint(options.color);

  return await newImg.toBuffer();
}
