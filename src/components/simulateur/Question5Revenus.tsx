"use client";

import Choice from "../ui/Choice";
import { BtnNext, BtnBack } from "../ui/Buttons";
import type { Foyer } from "@/types/simulateur";

interface Question5Props {
  rev: number;
  foyer: Foyer;
  onChangeRev: (val: number) => void;
  onChangeFoyer: (val: Foyer) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function Question5Revenus({
  rev,
  foyer,
  onChangeRev,
  onChangeFoyer,
  onNext,
  onBack,
}: Question5Props) {
  const displayValue = rev >= 80000
    ? "80 000 €+"
    : rev.toLocaleString("fr-FR") + " €";

  const sliderPct = (rev / 80000) * 100;

  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-900 mb-1.5 leading-snug">
        Quel est votre revenu fiscal de reference annuel ?
      </h2>
      <p className="text-sm text-gray-500 mb-6 leading-relaxed">
        Information confidentielle — uniquement pour calculer votre eligibilite MaPrimeRenov&apos;.
      </p>

      <div className="mb-6">
        <div className="flex justify-between items-center mb-2.5">
          <span className="text-xs font-semibold text-gray-600 uppercase tracking-wider">
            Revenu fiscal annuel
          </span>
          <span className="text-lg font-semibold text-brand-500">{displayValue}</span>
        </div>

        <input
          type="range"
          min={0}
          max={80000}
          step={1000}
          value={rev}
          onChange={(e) => onChangeRev(parseInt(e.target.value))}
          className="w-full h-1 rounded-full appearance-none cursor-pointer outline-none"
          style={{
            background: `linear-gradient(90deg, #1A6BCC ${sliderPct}%, #E0E0E0 ${sliderPct}%)`,
          }}
        />

        <div className="flex justify-between mt-1.5">
          {["0 €", "20 000 €", "40 000 €", "60 000 €", "80 000 €+"].map((t) => (
            <span key={t} className="text-[11px] text-gray-400">{t}</span>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2.5 mb-6 mt-2">
        <Choice
          icon="👤"
          title="Seul(e) ou couple"
          subtitle="Sans enfant"
          selected={foyer === "seul"}
          onClick={() => onChangeFoyer("seul")}
        />
        <Choice
          icon="👨‍👩‍👧"
          title="Avec enfant(s)"
          subtitle="Plafonds ajustes"
          selected={foyer === "famille"}
          onClick={() => onChangeFoyer("famille")}
        />
      </div>

      <BtnNext onClick={onNext} disabled={!foyer}>
        Continuer →
      </BtnNext>
      <BtnBack onClick={onBack} />

      <style jsx>{`
        input[type="range"]::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #1A6BCC;
          border: 3px solid #FFF;
          box-shadow: 0 0 0 2px #1A6BCC;
          cursor: pointer;
        }
        input[type="range"]::-moz-range-thumb {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #1A6BCC;
          border: 3px solid #FFF;
          box-shadow: 0 0 0 2px #1A6BCC;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
}
