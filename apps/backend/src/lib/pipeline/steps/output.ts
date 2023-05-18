import sharp from 'sharp';

export type TOutputOptions = {
  name: 'Output';
  args: {
    format: 'webp' | 'png' | 'jpeg' | 'avif' | 'tiff';
    quality: number;
  };
};

export async function output(buffer: Buffer, options: TOutputOptions['args']) {
  const newImg = sharp(buffer);

  newImg.toFormat(options.format, {
    quality: options.quality,
  });

  return await newImg.toBuffer();
}
