import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';

export type TTextInputProps = {
  label: string;

  value: string;
  onValueChange: (value: string) => void;

  placeholder?: string;
};

export default function TextInput({ label, value, onValueChange, placeholder }: TTextInputProps) {
  return (
    <div className="grid grid-cols-4 gap-2 items-center nodrag">
      <Label>{label}</Label>
      <Input
        className="col-span-3"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onValueChange(e.target.value)}
      />
    </div>
  );
}
