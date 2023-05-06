import sharp from 'sharp';

export type TFlipOptions = {
  name: 'Flip';
  args: {
    x?: boolean;
    y?: boolean;
  };
};

export function flip(image: sharp.Sharp, options: TFlipOptions['args']) {
  if (options.x) {
    image.flop();
  }

  if (options.y) {
    image.flip();
  }
}
