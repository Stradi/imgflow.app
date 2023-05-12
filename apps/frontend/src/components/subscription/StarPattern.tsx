import { cn } from '@/utils/tw';
import { StarIcon } from 'lucide-react';
import { useMemo } from 'react';

export type TStarPatterProps = {
  isHovering: boolean;
};

export default function StarPattern({ isHovering }: TStarPatterProps) {
  const starPositions = useMemo(() => {
    return new Array(15).fill(0).map((_, i) => {
      return {
        top: Math.random() * 50,
        left: Math.random() * 100,
        width: 32 + Math.random() * 48,
        height: 32 + Math.random() * 48,
        saturation: 47 + Math.random() * 7,
        luminescence: 13 + Math.random() * 5,
      };
    });
  }, []);

  return (
    <div
      className={cn(
        'overflow-hidden absolute h-full w-full top-0 left-0',
        '[&>*]:absolute [&>*]:transition-all [&>*]:duration-500'
      )}
    >
      {starPositions.map((star, i) => (
        <StarIcon
          key={i}
          style={{
            top: `${star.top}%`,
            left: `${star.left}%`,
            transform: `rotate(${Math.random() * 180}deg)`,
            width: `${star.width}px`,
            height: `${star.height}px`,
            color: `hsl(222, ${star.saturation}%, ${star.luminescence}%)`,
            fill: `hsl(222, ${star.saturation}%, ${star.luminescence}%)`,
          }}
        />
      ))}
    </div>
  );
}
