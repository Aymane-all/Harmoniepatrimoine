"use client";

import { ICONS, type IconName } from "./Icons";

interface ChoiceProps {
  /** Nom de l'icone SVG (de la bibliotheque Icons.tsx) */
  icon: IconName;
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
  const IconComponent = ICONS[icon];

  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        w-full flex items-center gap-3.5 p-4 text-left rounded-xl border-[1.5px]
        transition-all
        ${selected
          ? "border-[#2563EB] bg-[#F0F5FF] shadow-sm"
          : "border-gray-200 bg-white hover:border-[#2563EB] hover:bg-[#F8FAFF]"
        }
      `}
    >
      {/* Icone dans un cercle */}
      <div className={`
        w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0
        transition-colors
        ${selected
          ? "bg-[#2563EB] text-white"
          : "bg-[#F0F5FF] text-[#2563EB]"
        }
      `}>
        <IconComponent size={22} />
      </div>

      {/* Texte */}
      <div className="flex-1">
        <div className={`text-sm font-semibold ${selected ? "text-[#1E3A5F]" : "text-gray-900"}`}>
          {title}
        </div>
        {subtitle && (
          <div className="text-xs text-gray-500 mt-0.5">{subtitle}</div>
        )}
      </div>

      {/* Dot radio (si demande) */}
      {showDot && (
        <div className={`
          w-[18px] h-[18px] rounded-full border-2 flex items-center justify-center flex-shrink-0
          transition-colors
          ${selected
            ? "bg-[#2563EB] border-[#2563EB]"
            : "border-gray-300 bg-white"
          }
        `}>
          {selected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
        </div>
      )}
    </button>
  );
}