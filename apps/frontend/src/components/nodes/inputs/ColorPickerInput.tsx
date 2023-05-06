import { Label } from '@/components/ui/Label';
import { HexAlphaColorPicker, HexColorPicker } from 'react-colorful';

export type TColorPickerInputProps = {
  label: string;
  value: string;
  onValueChange: (value: string) => void;
  hasAlpha?: boolean;
};

export default function ColorPickerInput({ label, value, onValueChange, hasAlpha = true }: TColorPickerInputProps) {
  if (hasAlpha) {
    return (
      <div className="nodrag">
        <Label>{label}</Label>
        <HexAlphaColorPicker className="w-full" color={value} onChange={onValueChange} />
      </div>
    );
  } else {
    return (
      <div className="nodrag">
        <Label>{label}</Label>
        <HexColorPicker className="w-full" color={value} onChange={onValueChange} />
      </div>
    );
  }
}
