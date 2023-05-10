import sharp from 'sharp';

export type TGammaOptions = {
  name: 'Gamma';
  args: {
    gamma?: number;
    gammaOut?: number;
  };
};

export async function gamma(buffer: Buffer, options: TGammaOptions['args']) {
  const newImg = sharp(buffer);
  newImg.gamma(options.gamma, options.gammaOut);

  return await newImg.toBuffer();
}
