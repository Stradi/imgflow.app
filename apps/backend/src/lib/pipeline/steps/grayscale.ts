import sharp from 'sharp';

export type TGrayscaleOptions = {
  name: 'Grayscale';
  args: {};
};

export async function grayscale(buffer: Buffer, options: TGrayscaleOptions['args']) {
  const newImg = sharp(buffer);
  newImg.grayscale(true);

  return await newImg.toBuffer();
}
