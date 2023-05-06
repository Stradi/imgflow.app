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

export function resize(image: sharp.Sharp, options: TResizeOptions['args']) {
  image.resize({
    width: options.width,
    height: options.height,
    fit: options.fit,
    background: options.background,
  });
}
