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
      <div className="inline-block mb-4">
        <span className="text-[11px] font-semibold text-[#1E40AF] bg-[#DBEAFE] px-3 py-1 rounded-md">
          Situation fiscale
        </span>
      </div>

      <h2 className="text-xl md:text-2xl font-bold text-[#1E3A5F] leading-tight mb-2">
        Quel est votre{" "}
        <span className="text-[#2563EB]">revenu fiscal</span>{" "}
        annuel ?
      </h2>
      <p className="text-sm text-gray-500 mb-6 leading-relaxed">
        Information confidentielle — uniquement pour calculer votre eligibilite MaPrimeRenov&apos;.
      </p>

      <div className="mb-6">
        <div className="flex justify-between items-center mb-3">
          <span className="text-xs font-semibold text-gray-600 uppercase tracking-wider">
            Revenu fiscal annuel
          </span>
          <span className="text-lg font-bold text-[#2563EB]">{displayValue}</span>
        </div>

        <input
          type="range"
          min={0}
          max={80000}
          step={1000}
          value={rev}
          onChange={(e) => onChangeRev(parseInt(e.target.value))}
          className="w-full h-1.5 rounded-full appearance-none cursor-pointer outline-none"
          style={{
            background: `linear-gradient(90deg, #2563EB ${sliderPct}%, #E5E7EB ${sliderPct}%)`,
          }}
        />

        <div className="flex justify-between mt-2">
          {["0 €", "20 000 €", "40 000 €", "60 000 €", "80 000 €+"].map((t) => (
            <span key={t} className="text-[10px] text-gray-400">{t}</span>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2.5 mb-6 mt-4">
        <Choice
          icon="user"
          title="Seul(e) ou couple"
          subtitle="Sans enfant"
          selected={foyer === "seul"}
          onClick={() => onChangeFoyer("seul")}
          layout="vertical"
          showDot
        />
        <Choice
          icon="family"
          title="Avec enfant(s)"
          subtitle="Plafonds ajustes"
          selected={foyer === "famille"}
          onClick={() => onChangeFoyer("famille")}
          layout="vertical"
          showDot
        />
      </div>

      <BtnNext onClick={onNext} disabled={!foyer}>
        Continuer
      </BtnNext>

      <style jsx>{`
        input[type="range"]::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 22px;
          height: 22px;
          border-radius: 50%;
          background: #2563EB;
          border: 3px solid #FFF;
          box-shadow: 0 0 0 2px #2563EB, 0 2px 8px rgba(37, 99, 235, 0.3);
          cursor: pointer;
        }
        input[type="range"]::-moz-range-thumb {
          width: 22px;
          height: 22px;
          border-radius: 50%;
          background: #2563EB;
          border: 3px solid #FFF;
          box-shadow: 0 0 0 2px #2563EB, 0 2px 8px rgba(37, 99, 235, 0.3);
          cursor: pointer;
        }
      `}</style>
    </div>
  );
}