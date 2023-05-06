import sharp from 'sharp';

export type TModulateOptions = {
  name: 'Modulate';
  args: {
    brightness?: number;
    saturation?: number;
    hue?: number;
  };
};

export function modulate(image: sharp.Sharp, options: TModulateOptions['args']) {
  image.modulate({
    brightness: options.brightness,
    saturation: options.saturation,
    hue: options.hue,
  });
}
