import { CoinsIcon } from 'lucide-react';

export type TCreditCountProps = {
  count: number;
};

export default function CreditCount({ count }: TCreditCountProps) {
  return (
    <div className="w-full overflow-hidden bg-gray-50 p-4 rounded-lg relative flex md:flex-row flex-col gap-2 md:gap-0 md:justify-between md:items-center">
      <CoinsIcon className="absolute text-gray-900/10 opacity-0 sm:opacity-100 sm:w-12 sm:h-12 md:w-16 md:h-16 md:translate-y-0 md:top-1 md:left-1" />
      <p className="text-lg md:text-xl sm:ml-14 md:ml-16 z-10">You have {count === 0 ? 'no' : count} credits left.</p>
    </div>
  );
}
