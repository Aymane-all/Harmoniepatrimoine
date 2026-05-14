"use client";

import Choice from "../ui/Choice";
import { BtnNext, BtnBack } from "../ui/Buttons";
import type { Annee } from "@/types/simulateur";

interface Question2Props {
  value: Annee;
  onChange: (val: Annee) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function Question2Annee({ value, onChange, onNext, onBack }: Question2Props) {
  return (
    <div>
      <div className="inline-block mb-4">
        <span className="text-[11px] font-semibold text-[#1E40AF] bg-[#DBEAFE] px-3 py-1 rounded-md">
          Caracteristiques du bati
        </span>
      </div>

      <h2 className="text-xl md:text-2xl font-bold text-[#1E3A5F] leading-tight mb-2">
        Quand votre maison a-t-elle ete{" "}
        <span className="text-[#2563EB]">construite</span> ?
      </h2>
      <p className="text-sm text-gray-500 mb-6 leading-relaxed">
        MaPrimeRenov&apos; exige une anciennete minimum de 15 ans.
      </p>

      <div className="grid grid-cols-2 gap-2.5 mb-6">
        <Choice
          icon="historical"
          title="Avant 1975"
          subtitle="+50 ans"
          selected={value === "av75"}
          onClick={() => onChange("av75")}
        />
        <Choice
          icon="bricks"
          title="1975 — 1990"
          subtitle="35-50 ans"
          selected={value === "75-90"}
          onClick={() => onChange("75-90")}
        />
        <Choice
          icon="house"
          title="1990 — 2011"
          subtitle="15-35 ans"
          selected={value === "90-10"}
          onClick={() => onChange("90-10")}
        />
        <Choice
          icon="new"
          title="Apres 2012"
          subtitle="-15 ans"
          selected={value === "ap10"}
          onClick={() => onChange("ap10")}
        />
      </div>

      <BtnNext onClick={onNext} disabled={!value}>
        Continuer
      </BtnNext>
      <BtnBack onClick={onBack} />
    </div>
  );
}