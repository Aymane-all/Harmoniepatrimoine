"use client";

import { ICONS, type IconName } from "./Icons";

interface ScaleChoiceProps {
  icon: IconName;
  main: string;
  sub?: string;
  points: number;
  selected: boolean;
  onClick: () => void;
}

export default function ScaleChoice({
  icon, main, sub, points, selected, onClick,
}: ScaleChoiceProps) {
  const IconComponent = ICONS[icon];
  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        w-full flex items-center gap-3 px-3.5 py-2.5 text-left rounded-xl border-[1.5px]
        transition-all
        ${selected
          ? "border-[#2563EB] bg-[#F0F5FF] shadow-sm"
          : "border-gray-200 bg-white hover:border-[#2563EB] hover:bg-[#F8FAFF]"
        }
      `}
    >
      {/* Dot radio */}
      <div className={`
        w-[18px] h-[18px] rounded-full border-2 flex-shrink-0 flex items-center justify-center
        transition-colors
        ${selected
          ? "bg-[#2563EB] border-[#2563EB]"
          : "border-gray-300 bg-white"
        }
      `}>
        {selected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
      </div>

      {/* Icon */}
      <div className={`flex-shrink-0 ${selected ? "text-[#2563EB]" : "text-gray-400"}`}>
        <IconComponent size={22} />
      </div>

      {/* Texte */}
      <div className="flex-1">
        <div className={`text-sm font-semibold leading-snug ${selected ? "text-[#1E3A5F]" : "text-gray-900"}`}>
          {main}
        </div>
        {sub && (
          <div className="text-[11px] text-gray-500 mt-0.5">{sub}</div>
        )}
      </div>

    </button>
  );
}