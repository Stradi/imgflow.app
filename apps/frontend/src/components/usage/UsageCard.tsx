import { cn } from '@/utils/tw';

export type TUsageCardProps = {
  title: string;
  usage: {
    current: number;
    max: number;
  };
  resetsAt?: string;
  description?: string;
  onClick?: () => void;
};
const RATIO_TO_COLOR_MAP: Record<number, string> = {
  0: 'bg-cyan-400',
  0.15: 'bg-green-400',
  0.35: 'bg-yellow-400',
  0.55: 'bg-orange-400',
  0.75: 'bg-red-600',
};

export default function UsageCard({ title, usage, description, onClick }: TUsageCardProps) {
  const isUnlimited = usage.max === -1;

  return (
    <div
      onClick={onClick}
      className={cn(
        'space-y-2 border border-gray-200 p-4 rounded-md hover:border-green-500 transition-all duration-200 hover:shadow-md hover:shadow-green-100',
        onClick && 'cursor-pointer'
      )}
    >
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">{title}</h3>
        <p className="text-sm font-medium text-gray-700">
          {usage.current.toFixed(0)}
          {!isUnlimited && `/${usage.max.toFixed(0)}`}
        </p>
      </div>
      <div>
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          {!isUnlimited ? (
            <div
              className={cn(
                'h-full',
                usage.current / usage.max > 0.5 ? 'rounded-r-full' : 'rounded-full',
                usage.current / usage.max < 0.5 ? 'rounded-l-full' : 'rounded-full',
                usage.current / usage.max === 1 ? 'rounded-full' : 'rounded-none',
                Object.entries(RATIO_TO_COLOR_MAP).reduce((acc, [ratio, color]) => {
                  if (usage.current / usage.max >= Number(ratio)) {
                    return color;
                  }
                  return acc;
                }, '')
              )}
              style={{
                width: `${(usage.current / usage.max) * 100}%`,
              }}
            ></div>
          ) : (
            <div className="h-full rounded-full bg-green-400"></div>
          )}
        </div>
      </div>
      {description && <p className="text-sm text-gray-500">{description}</p>}
    </div>
  );
}
