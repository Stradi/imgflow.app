import { Label } from '@/components/ui/Label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/Select';

export type TSelectInputProps = {
  label: string;

  value: string;
  onValueChange: (value: string) => void;

  options: string[];

  defaultValue?: string;
  placeholder?: string;
};

export default function SelectInput({
  label,
  value,
  onValueChange,
  options,
  defaultValue,
  placeholder,
}: TSelectInputProps) {
  return (
    <div className="grid grid-cols-4 gap-2 items-center nodrag">
      <Label>{label}</Label>
      <Select onValueChange={onValueChange} defaultValue={value} value={value}>
        <SelectTrigger className="col-span-3">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option} value={option}>
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
