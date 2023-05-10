import { Label } from '@/components/ui/Label';
import { CopyIcon } from 'lucide-react';
import { HexAlphaColorPicker, HexColorPicker } from 'react-colorful';
import { toast } from 'react-hot-toast';

export type TColorPickerInputProps = {
  label: string;
  value: string;
  onValueChange: (value: string) => void;
  hasAlpha?: boolean;
};

export default function ColorPickerInput({ label, value, onValueChange, hasAlpha = true }: TColorPickerInputProps) {
  return (
    <div className="nodrag">
      <div className="flex justify-between items-center">
        <Label>{label}</Label>
        <CopyIcon
          className="w-4 h-4 m-1 hover:scale-110 cursor-pointer"
          onClick={(e) => {
            navigator.clipboard.writeText(value);
            toast.success(
              <p>
                Copied &apos;
                <span
                  className="font-medium"
                  style={{
                    color: value.length === 9 ? value.slice(0, 7) : value,
                  }}
                >
                  {value}
                </span>
                &apos; to clipboard!
              </p>
            );
          }}
        />
      </div>
      {hasAlpha ? (
        <HexAlphaColorPicker className="w-full" color={value} onChange={onValueChange} />
      ) : (
        <HexColorPicker className="w-full" color={value} onChange={onValueChange} />
      )}
    </div>
  );
}
