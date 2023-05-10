import sharp from 'sharp';

export type TExtendOptions = {
  name: 'Extend';
  args: {
    top?: number;
    left?: number;
    bottom?: number;
    right?: number;
    extendWith?: 'background' | 'copy' | 'mirror' | 'repeat';
    background?: string;
  };
};

export async function extend(buffer: Buffer, options: TExtendOptions['args']) {
  const newImg = sharp(buffer);
  newImg.extend(options);

  return await newImg.toBuffer();
}
