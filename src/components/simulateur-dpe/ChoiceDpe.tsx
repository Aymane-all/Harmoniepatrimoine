"use client";

import { ICONS_DPE, type IconDpeName } from "./IconsDpe";

interface ChoiceDpeProps {
  icon: IconDpeName;
  title: string;
  subtitle?: string;
  selected: boolean;
  onClick: () => void;
  showDot?: boolean;
}

export default function ChoiceDpe({
  icon, title, subtitle, selected, onClick, showDot = false, layout = "horizontal",
}: ChoiceDpeProps & { layout?: "horizontal" | "vertical" }) {
  const IconComponent = ICONS_DPE[icon];

  if (layout === "vertical") {
    return (
      <button
        type="button"
        onClick={onClick}
        className={`
          w-full relative flex flex-col items-center justify-center p-4 text-center rounded-2xl border-[1.5px]
          transition-all
          ${selected
            ? "border-[#2563EB] bg-[#F8FAFF] shadow-md"
            : "border-gray-200 bg-[#F9FAFB] hover:border-gray-300 hover:bg-white shadow-sm"
          }
        `}
      >
        {showDot && (
          <div className={`
            absolute top-3 right-3 w-4 h-4 rounded-full border-[1.5px] flex items-center justify-center
            transition-colors
            ${selected ? "bg-[#2563EB] border-[#2563EB]" : "border-gray-400 bg-transparent"}
          `}>
            {selected && (
              <svg width="8" height="8" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2 5L4 7L8 3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            )}
          </div>
        )}
        <div className={`
          w-12 h-12 rounded-xl flex items-center justify-center mb-3
          transition-colors
          ${selected ? "text-[#2563EB]" : "text-gray-600"}
        `}>
          <IconComponent size={32} />
        </div>
        <div className={`text-sm font-bold leading-snug ${selected ? "text-[#1E3A5F]" : "text-gray-800"}`}>
          {title}
        </div>
        {subtitle && <div className="text-[10px] text-gray-500 mt-1">{subtitle}</div>}
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        w-full flex items-center gap-3.5 p-3.5 text-left rounded-xl border-[1.5px]
        transition-all
        ${selected ? "border-[#2563EB] bg-[#F0F5FF] shadow-sm" : "border-gray-200 bg-white hover:border-[#2563EB] hover:bg-[#F8FAFF]"}
      `}
    >
      <div className={`
        w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0
        transition-colors
        ${selected ? "bg-[#2563EB] text-white" : "bg-[#F0F5FF] text-[#2563EB]"}
      `}>
        <IconComponent size={20} />
      </div>
      <div className="flex-1">
        <div className={`text-[13px] font-bold ${selected ? "text-[#1E3A5F]" : "text-gray-900"}`}>{title}</div>
        {subtitle && <div className="text-[11px] text-gray-500 mt-0.5">{subtitle}</div>}
      </div>
      {showDot && (
        <div className={`
          w-[16px] h-[16px] rounded-full border-2 flex items-center justify-center flex-shrink-0
          transition-colors
          ${selected ? "bg-[#2563EB] border-[#2563EB]" : "border-gray-300 bg-white"}
        `}>
          {selected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
        </div>
      )}
    </button>
  );
}