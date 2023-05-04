import { getJobFiles } from '@/services/job';
import { TJob } from '@/stores/JobStore';
import JSZip from 'jszip';
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
  const [preparingZip, setPreparingZip] = useState(false);

  useEffect(() => {
    async function fetchJobFiles() {
      setIsLoading(true);
      const response = await getJobFiles(job.id);
      setFiles(response['data']);
      setIsLoading(false);
    }

    fetchJobFiles();
  }, [job.id]);

  async function createZip() {
    setPreparingZip(true);
    const zip = new JSZip();
    const downloadedFiles = await Promise.all(
      files.map((file: any) => {
        const storageURL = `https://cdn.devguidez.com/imgflow/${file.storageKey}`;
        return fetch(storageURL);
      })
    );

    const blobs = await Promise.all(downloadedFiles.map((file) => file.blob()));

    blobs.forEach((blob, index) => {
      zip.file(`${index}.${(files[index] as any).storageKey.split('.')[1]}`, blob);
    });

    const generatedZip = await zip.generateAsync({ type: 'blob' });
    const url = window.URL.createObjectURL(generatedZip);
    const link = document.createElement('a');

    link.href = url;
    link.setAttribute('download', 'images.zip');
    document.body.appendChild(link);
    link.click();
    link.remove();

    window.URL.revokeObjectURL(url);
    setPreparingZip(false);
  }

  return (
    <Dialog>
      <DialogTrigger>
        <Button>View Images</Button>
      </DialogTrigger>
      <DialogContent>
        <div className="space-y-4">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Images <code>({files.length})</code>
          </h3>
          {isLoading && <div>Loading...</div>}
          {!isLoading && (
            <div className="grid grid-cols-5 gap-1">
              {files.slice(0, 10).map((file: any) => (
                <SingleJobImage storageKey={file.storageKey} key={file.id} />
              ))}
            </div>
          )}
          <div className="flex justify-between">
            <Button onClick={() => createZip()} disabled={preparingZip}>
              Download as ZIP file
            </Button>
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
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={storageURL} className="rounded-sm" />
    </Link>
  );
}
