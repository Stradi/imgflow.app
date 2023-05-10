import sharp from 'sharp';

export type TModulateOptions = {
  name: 'Modulate';
  args: {
    brightness?: number;
    saturation?: number;
    hue?: number;
  };
};

export async function modulate(buffer: Buffer, options: TModulateOptions['args']) {
  const newImg = sharp(buffer);

  newImg.modulate({
    brightness: options.brightness,
    saturation: options.saturation,
    hue: options.hue,
  });

  return await newImg.toBuffer();
}
