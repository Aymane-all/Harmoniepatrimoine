"use client";

import { BtnNext, BtnBack } from "../ui/Buttons";

interface Q2SurfaceProps {
  value: number;
  onChange: (val: number) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function Q2Surface({ value, onChange, onNext, onBack }: Q2SurfaceProps) {
  const sliderPct = ((value - 30) / (300 - 30)) * 100;

  return (
    <div>
      <div className="inline-block mb-4">
        <span className="text-[11px] font-semibold text-[#1E40AF] bg-[#DBEAFE] px-3 py-1 rounded-md">
          Caracteristiques du bati
        </span>
      </div>

      <h2 className="text-xl md:text-2xl font-bold text-[#1E3A5F] leading-tight mb-2">
        Quelle est la{" "}
        <span className="text-[#2563EB]">surface habitable</span>{" "}
        de votre maison ?
      </h2>
      <p className="text-sm text-gray-500 mb-6 leading-relaxed">
        Surface totale des pieces habitees — hors garage et cave.
      </p>

      <div className="mb-6">
        <div className="flex justify-between items-center mb-3">
          <span className="text-xs font-semibold text-gray-600 uppercase tracking-wider">
            Surface habitable
          </span>
          <span className="text-lg font-bold text-[#2563EB]">{value} m²</span>
        </div>

        <input
          type="range"
          min={30}
          max={300}
          step={5}
          value={value}
          onChange={(e) => onChange(parseInt(e.target.value))}
          className="w-full h-1.5 rounded-full appearance-none cursor-pointer outline-none"
          style={{
            background: `linear-gradient(90deg, #2563EB ${sliderPct}%, #E5E7EB ${sliderPct}%)`,
          }}
        />

        <div className="flex justify-between mt-2">
          {["30 m²", "100 m²", "200 m²", "300 m²"].map((t) => (
            <span key={t} className="text-[10px] text-gray-400">{t}</span>
          ))}
        </div>
      </div>

      <BtnNext onClick={onNext}>Continuer</BtnNext>

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