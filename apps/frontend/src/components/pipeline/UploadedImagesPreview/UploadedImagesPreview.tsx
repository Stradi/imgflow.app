import { Button } from '@/components/ui/Button';
import { TrashIcon } from 'lucide-react';
import { RemainingImagesPreview, SingleImagePreview } from './SingleImagePreview';

export type TUploadedImagesPreviewProps = {
  images: File[];
  onDiscardImage?: (files: File[]) => void;
  sliceCount?: number;
};

export default function UploadedImagesPreview({ images, onDiscardImage, sliceCount = 3 }: TUploadedImagesPreviewProps) {
  return (
    <div className="w-full h-full">
      {images.length > 0 && (
        <>
          <div className="mb-2 flex justify-between items-center">
            <p className="text-xl font-medium">
              Uploaded Images (<code>{images.length}</code>)
            </p>
            <Button
              variant="outline"
              onClick={() => onDiscardImage && onDiscardImage(images)}
              className="hover:bg-red-500 hover:text-white"
            >
              <TrashIcon className="w-4 h-4 mr-2" /> Clear all images
            </Button>
          </div>
          <div className="space-y-1">
            {images.slice(0, sliceCount).map((image, idx) => (
              <SingleImagePreview
                key={idx}
                file={image}
                onDelete={() => {
                  onDiscardImage && onDiscardImage([image]);
                }}
              />
            ))}
            {images.length > sliceCount && (
              <RemainingImagesPreview
                images={images.slice(sliceCount, images.length)}
                onDelete={() => {
                  onDiscardImage && onDiscardImage(images.slice(sliceCount, images.length));
                }}
              />
            )}
          </div>
        </>
      )}
      {images.length === 0 && (
        <div className="w-full h-full flex items-center justify-center">
          <p className="text-gray-500 text-3xl">No images uploaded.</p>
        </div>
      )}
    </div>
  );
}
