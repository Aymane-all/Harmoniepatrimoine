"use client";

import ScaleChoice from "../ui/ScaleChoice";
import { BtnNext, BtnBack } from "../ui/Buttons";

import { IconName } from "../ui/Icons";

export interface ScaleOption {
  icon: IconName;
  main: string;
  sub?: string;
  points: number;
}

interface QuestionConfortProps {
  axe: string;
  axeColor?: "blue" | "purple" | "amber" | "indigo";
  highlight: string;
  question: string;
  hint: string;
  options: ScaleOption[];
  value: number;
  selected: boolean;
  onSelect: (points: number) => void;
  onNext: () => void;
  onBack?: () => void;
  nextLabel?: string;
}

export default function QuestionConfort({
  axe, axeColor = "blue", highlight, question, hint,
  options, value, selected, onSelect, onNext, onBack, nextLabel,
}: QuestionConfortProps) {
  return (
    <div>
      <div className="inline-block mb-4">
        <span className="text-[11px] font-semibold text-[#1E40AF] bg-[#DBEAFE] px-3 py-1 rounded-md">
          {axe}
        </span>
      </div>

      <h2 className="text-xl md:text-2xl font-bold text-[#1E3A5F] leading-tight mb-2">
        {renderQuestionWithHighlight(question, highlight)}
      </h2>

      <p className="text-sm text-gray-500 mb-6 leading-relaxed">{hint}</p>

      <div className="flex flex-col gap-2 mb-6">
        {options.map((opt, i) => (
          <ScaleChoice
            key={i}
            icon={opt.icon}
            main={opt.main}
            sub={opt.sub}
            points={opt.points}
            selected={selected && value === opt.points}
            onClick={() => onSelect(opt.points)}
          />
        ))}
      </div>

      <BtnNext onClick={onNext} disabled={!selected}>
        {nextLabel || "Continuer"}
      </BtnNext>
    </div>
  );
}

function renderQuestionWithHighlight(question: string, highlight: string): React.ReactNode {
  const parts = question.split("{h}");
  if (parts.length === 1) return question;
  return (
    <>
      {parts[0]}
      <span className="text-[#2563EB]">{highlight}</span>
      {parts[1]}
    </>
  );
}
