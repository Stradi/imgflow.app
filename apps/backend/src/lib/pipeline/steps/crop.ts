import sharp from 'sharp';

export type TCropOptions = {
  name: 'Crop';
  args: {
    top: number;
    left: number;
    width: number;
    height: number;
  };
};

export async function crop(buffer: Buffer, options: TCropOptions['args']) {
  const newImg = sharp(buffer);
  const meta = await newImg.metadata();

  // Crop are must be within the image
  options.height = Math.min(options.height, (meta.height as number) - options.top);
  options.width = Math.min(options.width, (meta.width as number) - options.left);

  newImg.extract(options);

  return await newImg.toBuffer();
}
