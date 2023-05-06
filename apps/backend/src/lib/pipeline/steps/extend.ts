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

export function extend(image: sharp.Sharp, options: TExtendOptions['args']) {
  image.extend(options);
}
