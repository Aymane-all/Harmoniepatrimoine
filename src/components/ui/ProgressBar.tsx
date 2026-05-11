"use client";

interface ProgressBarProps {
  label: string;
  percent: number;
}

export default function ProgressBar({ label, percent }: ProgressBarProps) {
  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-2">
        <span className="text-xs text-gray-500">{label}</span>
        {percent > 0 && (
          <span className="text-xs font-semibold text-brand-500">{percent}%</span>
        )}
      </div>
      <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-brand-500 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
