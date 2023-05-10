import sharp from 'sharp';

export type TNegativeOptions = {
  name: 'Negative';
  args: {};
};

export async function negative(buffer: Buffer, options: TNegativeOptions['args']) {
  const newImg = sharp(buffer);
  newImg.negate(true);

  return await newImg.toBuffer();
}
