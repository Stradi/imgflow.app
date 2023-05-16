import { cn } from '@/utils/tw';
import Link from 'next/link';

export default function CTAButton() {
  return (
    <Link
      href="/register"
      className={cn(
        'mx-auto px-4 py-2 md:px-8 md:py-4 rounded-[32px] bg-gradient-to-r from-[#B1FFDA] to-[#BBFFA3] font-medium text-lg',
        'transition-[border-radius,transform,box-shadow] duration-200',
        'shadow-lg shadow-[#B1FFDA]/25 hover:shadow-xl hover:shadow-[#B1FFDA]/[0.15] focus:shadow-xl focus:shadow-[#B1FFDA]/[0.15]',
        'hover:rounded-[24px] hover:scale-110 focus:rounded-[24px] focus:scale-110',
        'hover:-translate-y-1 focus:-translate-y-1',
        'active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#B1FFDA] focus:ring-offset-2 ring-offset-black/75'
      )}
    >
      Get Started
    </Link>
  );
}
