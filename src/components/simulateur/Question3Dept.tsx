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
      <div className="inline-block mb-4">
        <span className="text-[11px] font-semibold text-[#1E40AF] bg-[#DBEAFE] px-3 py-1 rounded-md">
          Localisation
        </span>
      </div>

      <h2 className="text-xl md:text-2xl font-bold text-[#1E3A5F] leading-tight mb-2">
        Dans quel{" "}
        <span className="text-[#2563EB]">departement</span>{" "}
        se trouve votre maison ?
      </h2>
      <p className="text-sm text-gray-500 mb-6 leading-relaxed">
        Les aides varient selon votre departement — jusqu&apos;a 2 000€ de difference.
      </p>

      <div className="mb-6">
        <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2">
          Departement
        </label>
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full px-4 py-3 border-[1.5px] border-gray-200 rounded-xl text-sm text-gray-900 bg-white outline-none focus:border-[#2563EB] transition-colors appearance-none pr-10"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%232563EB' stroke-width='2' fill='none' stroke-linecap='round'/%3E%3C/svg%3E")`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "right 14px center",
          }}
        >
          <option value="">— Selectionnez votre departement</option>
          {DEPTS_OPTIONS.map((d) => (
            <option key={d.code} value={d.code}>
              {d.label}
            </option>
          ))}
        </select>
      </div>

      <BtnNext onClick={onNext} disabled={!value}>
        Continuer
      </BtnNext>
      <BtnBack onClick={onBack} />
    </div>
  );
}