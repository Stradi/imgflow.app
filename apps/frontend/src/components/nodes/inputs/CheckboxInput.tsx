import { Checkbox } from '@/components/ui/Checkbox';
import { Label } from '@/components/ui/Label';

export type TCheckboxInputProps = {
  label: string;
  value: boolean;
  onValueChange: (value: boolean) => void;
};

export default function CheckboxInput({ label, value, onValueChange }: TCheckboxInputProps) {
  return (
    <div className="flex gap-2 items-center nodrag">
      <Checkbox id={label} checked={value} onCheckedChange={onValueChange} />
      <Label htmlFor={label}>{label}</Label>
    </div>
  );
}
