import { Button } from '@/components/ui/Button';
import { humanByte } from '@/utils/general';
import { XIcon } from 'lucide-react';

export type TSingleImagePreviewProps = {
  file: File;
  onDelete?: () => void;
};

export function SingleImagePreview({ file, onDelete }: TSingleImagePreviewProps) {
  return (
    <div className="grid grid-cols-12 items-center bg-gray-100 pl-2 pr-1 py-1 rounded-md">
      <p className="col-span-6 text-sm truncate">{file.name}</p>
      <p className="col-span-5 text-sm">{humanByte(file.size)}</p>
      <Button
        onClick={() => onDelete && onDelete()}
        variant="outline"
        className="h-8 hover:bg-red-500 hover:text-white"
      >
        <XIcon className="w-4 h-4" />
      </Button>
    </div>
  );
}

export type TRemainingImagesPreviewProps = {
  images: File[];
  onDelete?: () => void;
};

export function RemainingImagesPreview({ images, onDelete }: TRemainingImagesPreviewProps) {
  return (
    <div className="grid grid-cols-12 h-10 items-center bg-gray-100 pl-2 pr-1 py-1 rounded-md">
      <p className="col-span-6 text-sm">{images.length} more images</p>
      <p className="col-span-5 text-sm">{humanByte(images.reduce((acc, curr) => acc + curr.size, 0))}</p>
      <Button
        onClick={() => onDelete && onDelete()}
        variant="outline"
        className="h-8 hover:bg-red-500 hover:text-white"
      >
        <XIcon className="w-4 h-4" />
      </Button>
    </div>
  );
}
