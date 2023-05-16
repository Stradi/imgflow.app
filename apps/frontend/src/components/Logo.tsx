import { cn } from '@/utils/tw';
import Link from 'next/link';

export default function Logo() {
  return (
    <Link href="/">
      <div className={cn('group relative h-full w-full select-none py-2 px-6')}>
        <span
          data-brand="ImgFlow"
          className={cn(
            'text-xl font-semibold text-white',
            'tracking-tighter group-hover:after:tracking-normal',
            'after:transition-all after:duration-200 after:ease-out',
            'after:absolute after:top-0 after:left-0 after:h-full after:w-full',
            'after:flex after:items-center after:justify-center',
            'after:text-primary after:content-[attr(data-brand)]'
          )}
        >
          ImgFlow
        </span>
      </div>
    </Link>
  );
}
