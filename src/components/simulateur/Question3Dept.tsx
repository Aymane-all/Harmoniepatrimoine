"use client";

import { BtnNext, BtnBack } from "../ui/Buttons";
import { DEPTS_OPTIONS } from "@/lib/constants";

interface Question3Props {
  value: string;
  onChange: (val: string) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function Question3Dept({ value, onChange, onNext, onBack }: Question3Props) {
  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-900 mb-1.5 leading-snug">
        Dans quel departement se trouve votre maison ?
      </h2>
      <p className="text-sm text-gray-500 mb-6 leading-relaxed">
        Les aides varient selon votre departement — jusqu&apos;a 2 000€ de difference.
      </p>

      <div className="mb-5">
        <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1.5">
          Departement
        </label>
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full px-3.5 py-2.5 border-[1.5px] border-gray-200 rounded-lg text-sm text-gray-900 bg-white outline-none focus:border-brand-500 transition-colors appearance-none bg-no-repeat bg-right-3 pr-10"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%23999' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E")`,
            backgroundPosition: "right 12px center",
          }}
        >
          <option value="">— Selectionnez</option>
          {DEPTS_OPTIONS.map((d) => (
            <option key={d.code} value={d.code}>
              {d.label}
            </option>
          ))}
        </select>
      </div>

      <BtnNext onClick={onNext} disabled={!value}>
        Continuer →
      </BtnNext>
      <BtnBack onClick={onBack} />
    </div>
  );
}
