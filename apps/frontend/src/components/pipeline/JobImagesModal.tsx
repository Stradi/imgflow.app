import { getJobFiles } from '@/services/job';
import { TJob } from '@/stores/JobStore';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Button } from '../ui/Button';
import { Dialog, DialogContent, DialogTrigger } from '../ui/Dialog';

export type TJobImagesModalProps = {
  job: TJob;
};

export default function JobImagesModal({ job }: TJobImagesModalProps) {
  const [files, setFiles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchJobFiles() {
      setIsLoading(true);
      const response = await getJobFiles(job.id);
      setFiles(response['data']);
      setIsLoading(false);
    }

    fetchJobFiles();
  }, [job.id]);

  return (
    <Dialog>
      <DialogTrigger>
        <Button>View Images</Button>
      </DialogTrigger>
      <DialogContent>
        <div className="space-y-4">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Images</h3>
          {isLoading && <div>Loading...</div>}
          {!isLoading && (
            <div className="grid grid-cols-5 gap-1">
              {files.slice(0, 5).map((file: any) => (
                <SingleJobImage storageKey={file.storageKey} key={file.id} />
              ))}
            </div>
          )}
          <div className="flex justify-between">
            <Button>Download as ZIP file</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

type TSingleJobImageProps = {
  storageKey: string;
};

function SingleJobImage({ storageKey }: TSingleJobImageProps) {
  const storageURL = `https://cdn.devguidez.com/imgflow/${storageKey}`;

  return (
    <Link href={storageURL} target="_blank" className="hover:-translate-y-0.5 transition-transform duration-100">
      <img src={storageURL} className="rounded-sm" />
    </Link>
  );
}
