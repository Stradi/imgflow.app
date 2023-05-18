import { cn } from '@/utils/tw';
import { useDropzone } from 'react-dropzone';

export type TImageDropzoneProps = {
  onDrop?: (acceptedFiles: File[]) => void;
};

export default function ImageDropzone({ onDrop }: TImageDropzoneProps) {
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'image/png': ['.png'],
      'image/jpeg': ['.jpeg', '.jpg'],
      'image/webp': ['.webp'],
      'image/tiff': ['.tiff', '.tif'],
      'image/svg+xml': ['.svg'],
      'image/avif': ['.avif'],
    },
    onDrop(acceptedFiles) {
      onDrop?.(acceptedFiles);
    },
  });

  return (
    <div className="flex flex-col gap-4">
      <div
        {...getRootProps()}
        className={cn(
          'group flex min-h-[128px] h-full items-center justify-center bg-gray-50',
          'transition duration-150 cursor-pointer',
          'rounded-lg border-2 border-dashed border-gray-100',
          'hover:border-gray-200 hover:bg-gray-100',
          'focus:outline-none focus:border-gray-200 focus:bg-gray-100',
          'active:bg-gray-100'
        )}
      >
        <input {...getInputProps()} />
        <div className="w-full select-none text-center md:relative">
          <p
            className={cn(
              'text-xl text-gray-800',
              'md:transition md:duration-150',
              'md:group-hover:-translate-y-1/3',
              'md:group-focus:-translate-y-1/3'
            )}
          >
            Drag &apos;n&apos; drop some files here, or click to select files
          </p>
          <p
            className={cn(
              'md:absolute md:opacity-0 md:inset-0 md:top-1/3 text-gray-800',
              'md:transition md:duration-150',
              'md:group-hover:translate-y-1/3 md:group-hover:opacity-100',
              'md:group-focus:translate-y-1/3 md:group-focus:opacity-100'
            )}
          >
            You can upload <code>.png</code>, <code>.jpg</code>, <code>.webp</code>, <code>.gif</code>,{' '}
            <code>.avif</code>, <code>.tiff</code> and <code>.svg</code> files.
          </p>
        </div>
      </div>
    </div>
  );
}
