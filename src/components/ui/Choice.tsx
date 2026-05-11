"use client";

import { ReactNode } from "react";

interface ChoiceProps {
  icon: string;
  title: string;
  subtitle?: string;
  selected: boolean;
  onClick: () => void;
  showDot?: boolean;
}

export default function Choice({
  icon,
  title,
  subtitle,
  selected,
  onClick,
  showDot = false,
}: ChoiceProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        w-full flex items-center gap-3 p-4 text-left rounded-lg border-[1.5px] transition-colors
        ${selected
          ? "border-brand-500 bg-brand-50"
          : "border-gray-200 bg-white hover:border-brand-500 hover:bg-brand-50"
        }
      `}
    >
      <div className={`
        w-10 h-10 rounded-lg flex items-center justify-center text-xl flex-shrink-0
        ${selected ? "bg-brand-500" : "bg-gray-100"}
      `}>
        {icon}
      </div>
      <div className="flex-1">
        <div className="text-sm font-medium text-gray-900">{title}</div>
        {subtitle && <div className="text-xs text-gray-500 mt-0.5">{subtitle}</div>}
      </div>
      {showDot && (
        <div className={`
          w-[18px] h-[18px] rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all
          ${selected
            ? "bg-brand-500 border-brand-500"
            : "border-gray-300 bg-white"
          }
        `}>
          {selected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
        </div>
      )}
    </button>
  );
}
