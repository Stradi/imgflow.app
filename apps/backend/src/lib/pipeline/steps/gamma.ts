import sharp from 'sharp';

export type TGammaOptions = {
  name: 'Gamma';
  args: {
    gamma?: number;
    gammaOut?: number;
  };
};

export function gamma(image: sharp.Sharp, options: TGammaOptions['args']) {
  image.gamma(options.gamma, options.gammaOut);
}
