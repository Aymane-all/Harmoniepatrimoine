"use client";

import { IconArrowLeft } from "./Icons";

interface BtnNextProps {
  onClick: () => void;
  disabled?: boolean;
  children: React.ReactNode;
  className?: string;
}

export function BtnNext({ onClick, disabled, children, className = "" }: BtnNextProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`
        w-full py-3.5 px-6 rounded-xl text-sm font-semibold transition-colors
        ${disabled
          ? "bg-gray-200 text-gray-400 cursor-not-allowed"
          : "bg-[#111827] hover:bg-[#1F2937] text-white cursor-pointer"
        }
        ${className}
      `}
    >
      {children}
    </button>
  );
}

interface BtnBackProps {
  onClick: () => void;
}

export function BtnBack({ onClick }: BtnBackProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="
        mt-3 flex items-center gap-1.5 mx-auto
        bg-transparent border-none text-gray-500 hover:text-gray-900
        text-sm cursor-pointer py-2 transition-colors
      "
    >
      <IconArrowLeft size={14} />
      Retour
    </button>
  );
}