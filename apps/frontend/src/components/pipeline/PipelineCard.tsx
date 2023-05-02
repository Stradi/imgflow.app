import { ListIcon, PlusIcon } from 'lucide-react';
import Link from 'next/link';
import { Button, buttonVariants } from '../ui/Button';

export type TPipelineCardProps = {
  title: string;
  href?: string;
  image?: string;
  runCount: number;
  lastRun: Date;
  processedImageCount: number;
};

export default function PipelineCard({
  title,
  href,
  image,
  runCount,
  lastRun,
  processedImageCount,
}: TPipelineCardProps) {
  return (
    <div className="border border-gray-200 rounded-xl group hover:border-green-500 overflow-hidden transition-all duration-200 hover:shadow-md hover:shadow-green-100">
      <div className="overflow-hidden">
        <img
          src={image}
          alt="Pipeline preview"
          className="select-none rounded-t-xl group-hover:scale-110 transition duration-200"
        />
      </div>
      <div className="space-y-2 p-4">
        <h3 className="font-medium text-lg">{title}</h3>
        <div>
          <p className="text-gray-500">
            Ran {runCount} times · Last run {lastRun.toLocaleDateString()}
          </p>
          <p className="text-gray-500">Processed {processedImageCount} images total</p>
        </div>
        <div className="flex gap-2">
          <Link
            className={buttonVariants({
              variant: 'default',
              className: 'basis-1/2',
            })}
            href={`${href}/run`}
          >
            Run
          </Link>
          <Link
            className={buttonVariants({
              variant: 'secondary',
              className: 'basis-1/2',
            })}
            href={`${href}/edit`}
          >
            Edit
          </Link>
          <Button className="rounded-full" variant="outline">
            <ListIcon className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}

export function EmptyPipelineCard() {
  return (
    <div className="w-full h-full cursor-pointer group relative flex items-center justify-center border border-gray-200 rounded-xl group hover:border-green-500 overflow-hidden transition-all duration-200 hover:shadow-md hover:shadow-green-100">
      <div className="group-hover:scale-110 group-hover:brightness-95 transition duration-200 absolute inset-0 w-full h-full -z-10">
        {new Array(8).fill(0).map((_, i) => (
          <div
            key={i}
            className="w-1/2 h-1/2 bg-gray-200 absolute"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
          />
        ))}
        {new Array(8).fill(0).map((_, i) => (
          <div
            key={i}
            className="w-1/2 h-1/2 bg-gray-100 absolute"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
          />
        ))}
        {new Array(8).fill(0).map((_, i) => (
          <div
            key={i}
            className="w-8 h-8 bg-gray-300 absolute"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>
      <p className="select-none text-2xl font-medium flex items-center gap-2">
        Create new pipeline
        <PlusIcon />
      </p>
    </div>
  );
}
