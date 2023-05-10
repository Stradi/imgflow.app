import { Label } from '@/components/ui/Label';
import { Slider } from '@/components/ui/Slider';

export type TSliderInputProps = {
  label: string;
  value: number;
  onValueChange: (value: number) => void;
  min: number;
  max: number;
  step?: number;
};

export default function SliderInput({ label, value, onValueChange, min, max, step = 1 }: TSliderInputProps) {
  return (
    <div className="grid grid-cols-4 gap-2 items-center nodrag">
      <Label htmlFor={label}>
        {label} ({value})
      </Label>
      <Slider
        className="col-span-3"
        defaultValue={[value || (min + max) / 2]}
        id={label}
        min={min}
        max={max}
        step={step}
        value={[value]}
        onValueChange={(v) => onValueChange(v[0])}
      />
    </div>
  );
}
