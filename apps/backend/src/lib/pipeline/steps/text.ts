import sharp from 'sharp';

export type TTextOptions = {
  name: 'Text';
  args: {
    text: string;
    size: number;
    position:
      | 'Top Left'
      | 'Top Center'
      | 'Top Right'
      | 'Center Left'
      | 'Center'
      | 'Center Right'
      | 'Bottom Left'
      | 'Bottom Center'
      | 'Bottom Right';
    textColor: string;
  };
};

const GRAVITY_MAP = {
  'Top Left': 'northwest',
  'Top Center': 'north',
  'Top Right': 'northeast',
  'Center Left': 'west',
  Center: 'center',
  'Center Right': 'east',
  'Bottom Left': 'southwest',
  'Bottom Center': 'south',
  'Bottom Right': 'southeast',
};

export async function text(buffer: Buffer, options: TTextOptions['args']) {
  const newImg = sharp(buffer);

  const metadata = await newImg.metadata();
  const imageSize = {
    width: metadata.width as number,
    height: metadata.height as number,
  };

  const textWidth = Math.round((options.size / 100) * imageSize.width);

  newImg.composite([
    {
      input: {
        text: {
          text: `<span foreground="${options.textColor}">${options.text}</span>`,
          font: 'Arial',
          rgba: true,
          dpi: textWidth,
        },
      },
      gravity: GRAVITY_MAP[options.position],
    },
  ]);

  return await newImg.toBuffer();
}
