"use client";

import Choice from "../ui/Choice";
import { BtnNext } from "../ui/Buttons";
import type { Proprio } from "@/types/simulateur";

interface Question1Props {
  value: Proprio;
  onChange: (val: Proprio) => void;
  onNext: () => void;
}

export default function Question1Proprio({ value, onChange, onNext }: Question1Props) {
  return (
    <div>
      {/* Tag categorie */}
      <div className="inline-block mb-4">
        <span className="text-[11px] font-semibold text-[#1E40AF] bg-[#DBEAFE] px-3 py-1 rounded-md">
          Type de logement
        </span>
      </div>

      <h2 className="text-xl md:text-2xl font-bold text-[#1E3A5F] leading-tight mb-2">
        Etes-vous{" "}
        <span className="text-[#2563EB]">proprietaire</span>{" "}
        d&apos;une maison individuelle ?
      </h2>
      <p className="text-sm text-gray-500 mb-6 leading-relaxed">
        Ce simulateur est reserve aux proprietaires de maison de plus de 15 ans.
      </p>

      <div className="flex flex-col gap-2.5 mb-6">
        <Choice
          icon="house"
          title="Oui — maison individuelle"
          subtitle="Pavillon, villa, maison de campagne"
          selected={value === "maison"}
          onClick={() => onChange("maison")}
          showDot
        />
        <Choice
          icon="building"
          title="Proprietaire d'un appartement"
          subtitle="Copropriete"
          selected={value === "appart"}
          onClick={() => onChange("appart")}
          showDot
        />
        <Choice
          icon="key"
          title="Locataire"
          subtitle="Je n'ai pas la propriete"
          selected={value === "loc"}
          onClick={() => onChange("loc")}
          showDot
        />
      </div>

      <BtnNext onClick={onNext} disabled={!value}>
        Continuer
      </BtnNext>
    </div>
  );
}