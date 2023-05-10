import sharp from 'sharp';

export type TResizeOptions = {
  name: 'Resize';
  args: {
    width: number;
    height: number;
    fit?: 'contain' | 'cover' | 'fill' | 'inside' | 'outside';
    background?: string;
  };
};

export async function resize(buffer: Buffer, options: TResizeOptions['args']) {
  const newImg = sharp(buffer);
  newImg.resize({
    width: options.width,
    height: options.height,
    fit: options.fit,
    background: options.background,
  });

  return await newImg.toBuffer();
}
