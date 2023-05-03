import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';

export type TNumberInputProps = {
  label: string;

  value: number;
  onValueChange: (value: number) => void;

  placeholder?: string;
  min?: number;
  max?: number;
};

export default function NumberInput({ label, value, onValueChange, placeholder, min, max }: TNumberInputProps) {
  return (
    <div className="grid grid-cols-4 gap-2 items-center nodrag">
      <Label>{label}</Label>
      <Input
        className="col-span-3"
        type="number"
        min={min}
        max={max}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onValueChange(Number.parseInt(e.target.value))}
      />
    </div>
  );
}
