"use client";

import ChoiceDpe from "./ChoiceDpe";
import { BtnNext, BtnBack } from "../ui/Buttons";
import type { QuestionDpeConfig } from "./questionsDpeData";

interface QuestionDpeProps {
  config: QuestionDpeConfig;
  value: string;
  onChange: (val: string) => void;
  onNext: () => void;
  onBack?: () => void;
  nextLabel?: string;
}

export default function QuestionDpe({
  config, value, onChange, onNext, onBack, nextLabel,
}: QuestionDpeProps) {
  const layoutClass = config.cols === 2
    ? "grid grid-cols-1 sm:grid-cols-2 gap-2.5"
    : "flex flex-col gap-2.5";

  return (
    <div>
      {/* Tag */}
      <div className="inline-block mb-4">
        <span className="text-[11px] font-semibold text-[#1E40AF] bg-[#DBEAFE] px-3 py-1 rounded-md">
          {config.tag}
        </span>
      </div>

      {/* Titre avec mot cle en bleu */}
      <h2 className="text-xl md:text-2xl font-bold text-[#1E3A5F] leading-tight mb-2">
        {renderQuestion(config.question, config.highlight)}
      </h2>

      {/* Hint */}
      <p className="text-sm text-gray-500 mb-6 leading-relaxed">{config.hint}</p>

      {/* Choix */}
      <div className={`${layoutClass} mb-6`}>
        {config.choices.map((c) => (
          <ChoiceDpe
            key={c.value}
            icon={c.icon}
            title={c.title}
            subtitle={c.subtitle}
            selected={value === c.value}
            onClick={() => onChange(c.value)}
            showDot={config.showDot}
            layout={config.cols === 2 ? "vertical" : "horizontal"}
          />
        ))}
      </div>

      {/* Boutons */}
      <BtnNext onClick={onNext} disabled={!value}>
        {nextLabel || "Continuer"}
      </BtnNext>
    </div>
  );
}

// Helper : remplace {h} par highlight en bleu
function renderQuestion(question: string, highlight: string): React.ReactNode {
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