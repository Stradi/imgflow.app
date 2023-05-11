import { CoinsIcon } from 'lucide-react';
import Link from 'next/link';
import { Button } from '../ui/Button';

export type TCreditCountProps = {
  count: number;
};

export default function CreditCount({ count }: TCreditCountProps) {
  return (
    <div className="w-full bg-gray-50 p-4 rounded-lg relative flex md:flex-row flex-col gap-2 md:gap-0 md:justify-between md:items-center">
      <CoinsIcon className="absolute text-gray-900/10 opacity-0 sm:opacity-100 sm:w-12 sm:h-12 md:w-16 md:h-16 md:translate-y-0 md:top-1 md:left-1" />
      <p className="text-lg md:text-xl sm:ml-14 md:ml-16 z-10">You have {count === 0 ? 'no' : count} credits left.</p>
      <div className="flex flex-col sm:flex-row gap-2 sm:ml-14 md:ml-0">
        {/* TODO: We probably want to generate a LemonSqueezy checkout link programmatically and redirect to that page. */}
        <Link href="/dashboard/buy" passHref>
          <Button size="sm" className="z-10">
            Click to Buy Credits
          </Button>
        </Link>
        <Button size="sm" className="z-10" variant="outline">
          Purchase History
        </Button>
      </div>
    </div>
  );
}
