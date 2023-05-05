import { getJobFiles } from '@/services/job';
import { TJob } from '@/stores/JobStore';
import JSZip from 'jszip';
import { ChevronsDownUpIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Button } from '../ui/Button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '../ui/Collapsible';
import { Dialog, DialogContent, DialogTrigger } from '../ui/Dialog';

export type TJobImagesModalProps = {
  job: TJob;
};

export default function JobImagesModal({ job }: TJobImagesModalProps) {
  const [files, setFiles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [preparingZip, setPreparingZip] = useState(false);

  const filesGroupedByOutputsName = files.reduce((acc: any, file: any) => {
    const outputName = file.storageKey.split('/').pop();
    if (!acc[outputName]) {
      acc[outputName] = [];
    }
    acc[outputName].push(file);
    return acc;
  }, {});

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

    const folders = Object.keys(filesGroupedByOutputsName);
    for (const folder of folders) {
      const folderZip = zip.folder(`output-${folder.split('.')[0]}`) as JSZip;
      let idx = 0;
      for (const file of filesGroupedByOutputsName[folder]) {
        const extension = file.storageKey.split('.').pop();

        const fileBlob = await fetch(`https://cdn.devguidez.com/imgflow/${file.storageKey}`).then((r) => r.blob());
        folderZip.file(`${idx}.${extension}`, fileBlob);
        idx++;
      }
    }

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
      <DialogContent className="h-full max-h-full md:h-auto md:max-h-[85%] overflow-y-auto">
        <div className="space-y-4">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Images <code>({files.length})</code>
          </h3>
          {isLoading && <div>Loading...</div>}
          {!isLoading && (
            <div className="space-y-4">
              {Object.keys(filesGroupedByOutputsName).map((outputName, idx) => (
                <OutputGroup
                  isOpen={idx === 0}
                  key={outputName}
                  outputName={outputName}
                  files={filesGroupedByOutputsName[outputName]}
                  showCollapsible={Object.keys(filesGroupedByOutputsName).length > 1}
                />
              ))}
            </div>
          )}
          <div className="flex justify-between">
            <Button onClick={() => createZip()} disabled={preparingZip}>
              Download All as Zip
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

type TOutputGroupProps = {
  outputName: string;
  files: any[];
  isOpen: boolean;
  showCollapsible?: boolean;
};

function OutputGroup({ outputName, files, isOpen, showCollapsible = true }: TOutputGroupProps) {
  const [preparingZip, setPreparingZip] = useState(false);

  async function generateZip() {
    setPreparingZip(true);
    const zip = new JSZip();

    let idx = 0;
    for (const file of files) {
      const extension = file.storageKey.split('.').pop();

      const fileBlob = await fetch(`https://cdn.devguidez.com/imgflow/${file.storageKey}`).then((r) => r.blob());
      zip.file(`${idx}.${extension}`, fileBlob);
      idx++;
    }

    const generatedZip = await zip.generateAsync({ type: 'blob' });
    const url = window.URL.createObjectURL(generatedZip);
    const link = document.createElement('a');

    link.href = url;
    link.setAttribute('download', `output-${outputName.split('.')[0]}.zip`);
    document.body.appendChild(link);
    link.click();
    link.remove();

    window.URL.revokeObjectURL(url);
    setPreparingZip(false);
  }

  return (
    <Collapsible defaultOpen={isOpen} className="data-[state='open']:bg-gray-50 p-2 rounded-md">
      <div className="space-y-1">
        <header className="flex justify-between items-center">
          <h3 className="text-lg font-medium">{outputName}</h3>
          {showCollapsible && (
            <div className="flex gap-1 items-center">
              <Button
                variant="outline"
                onClick={() => {
                  generateZip();
                }}
                disabled={preparingZip}
              >
                Download these files
              </Button>
              <CollapsibleTrigger asChild>
                <Button variant="outline" className="data-[state='open']:bg-gray-100 data-[state='open']:shadow-inner">
                  <ChevronsDownUpIcon className="w-4 h-4 my-0 mx-0" />
                </Button>
              </CollapsibleTrigger>
            </div>
          )}
        </header>
        <CollapsibleContent>
          <div className="grid grid-cols-5 gap-1">
            {files.map((file: any) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={file.id}
                src={`https://cdn.devguidez.com/imgflow/${file.storageKey}`}
                alt=""
                className="rounded-sm"
              />
            ))}
          </div>
        </CollapsibleContent>
      </div>
    </Collapsible>
  );
}
