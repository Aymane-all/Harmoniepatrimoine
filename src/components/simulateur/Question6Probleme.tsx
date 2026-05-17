"use client";

import Choice from "../ui/Choice";
import { BtnNext, BtnBack } from "../ui/Buttons";
import type { Probleme } from "@/types/simulateur";

interface Question6Props {
  value: Probleme;
  onChange: (val: Probleme) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function Question6Probleme({ value, onChange, onNext, onBack }: Question6Props) {
  return (
    <div>
      <div className="inline-block mb-4">
        <span className="text-[11px] font-semibold text-[#1E40AF] bg-[#DBEAFE] px-3 py-1 rounded-md">
          Vos besoins
        </span>
      </div>

      <h2 className="text-xl md:text-2xl font-bold text-[#1E3A5F] leading-tight mb-2">
        Quel est votre principal{" "}
        <span className="text-[#2563EB]">probleme</span> ?
      </h2>
      <p className="text-sm text-gray-500 mb-6 leading-relaxed">
        Cette reponse personnalise votre resultat.
      </p>

      <div className="grid grid-cols-2 gap-2.5 mb-6">
        <Choice
          icon="snowflake"
          title="Froid"
          subtitle="Mauvaise isolation"
          selected={value === "froid"}
          onClick={() => onChange("froid")}
          layout="vertical"
          showDot
        />
        <Choice
          icon="droplet"
          title="Humidite"
          subtitle="Moisissures, air lourd"
          selected={value === "humidite"}
          onClick={() => onChange("humidite")}
          layout="vertical"
          showDot
        />
        <Choice
          icon="euro"
          title="Factures elevees"
          subtitle="Charges trop hautes"
          selected={value === "factures"}
          onClick={() => onChange("factures")}
          layout="vertical"
          showDot
        />
        <Choice
          icon="search"
          title="Mes droits"
          subtitle="Je veux savoir"
          selected={value === "droits"}
          onClick={() => onChange("droits")}
          layout="vertical"
          showDot
        />
      </div>

      <BtnNext onClick={onNext} disabled={!value}>
        Voir le formulaire
      </BtnNext>
    </div>
  );
}