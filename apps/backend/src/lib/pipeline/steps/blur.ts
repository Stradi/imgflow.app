import sharp from 'sharp';

export type TBlurOptions = {
  name: 'Blur';
  args: {
    sigma?: number;
  };
};

export async function blur(image: Buffer, options: TBlurOptions['args']) {
  const newImg = sharp(image);
  newImg.blur(options.sigma);

  return await newImg.toBuffer();
}
