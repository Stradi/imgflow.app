import { useState } from 'react';
import { Button } from '../ui/Button';
import { DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../ui/Dialog';
import { Input } from '../ui/Input';
import { Label } from '../ui/Label';
import { RadioGroup, RadioGroupItem } from '../ui/RadioGroup';

export type TCreatePipelineModalContentProps = {
  onCreate?: (name: string, template: string) => void;
};

export default function CreatePipelineModalContent({ onCreate }: TCreatePipelineModalContentProps) {
  const [pipelineName, setPipelineName] = useState('Untitled pipeline');
  const [template, setTemplate] = useState('scratch');

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Create new pipeline</DialogTitle>
        <DialogDescription>Create a new pipeline to process your images however you&apos;d like.</DialogDescription>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              className="col-span-3"
              value={pipelineName}
              onChange={(e) => setPipelineName(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-4 gap-4">
            <Label htmlFor="template" className="text-right">
              Template
            </Label>
            <RadioGroup
              defaultValue="scratch"
              value={template}
              onValueChange={(value) => setTemplate(value)}
              className="col-span-3"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="scratch" id="scratch" />
                <Label htmlFor="scratch">Create from scratch</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="optimize" id="optimize" />
                <Label htmlFor="optimize">Image optimizer</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="thumbnail" id="thumbnail" />
                <Label htmlFor="thumbnail">Thumbnail generator</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="watermark" id="watermark" />
                <Label htmlFor="watermark">Add watermark to images</Label>
              </div>
            </RadioGroup>
          </div>
        </div>
      </DialogHeader>
      <DialogFooter>
        <Button onClick={() => onCreate?.(pipelineName, template)}>Create</Button>
      </DialogFooter>
    </DialogContent>
  );
}
