"use client";

import Choice from "../ui/Choice";
import { BtnNext, BtnBack } from "../ui/Buttons";
import type { Chauffage } from "@/types/simulateur";

interface Question4Props {
  value: Chauffage;
  onChange: (val: Chauffage) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function Question4Chauf({ value, onChange, onNext, onBack }: Question4Props) {
  return (
    <div>
      <div className="inline-block mb-4">
        <span className="text-[11px] font-semibold text-[#1E40AF] bg-[#DBEAFE] px-3 py-1 rounded-md">
          Equipements
        </span>
      </div>

      <h2 className="text-xl md:text-2xl font-bold text-[#1E3A5F] leading-tight mb-2">
        Quel est votre systeme de{" "}
        <span className="text-[#2563EB]">chauffage</span>{" "}
        actuel ?
      </h2>
      <p className="text-sm text-gray-500 mb-6 leading-relaxed">
        Ce choix determine le montant de votre prime CEE.
      </p>

      <div className="flex flex-col gap-2.5 mb-6">
        <Choice
          icon="oilTank"
          title="Chaudiere fioul"
          subtitle="Prime CEE maximale"
          selected={value === "fioul"}
          onClick={() => onChange("fioul")}
          showDot
        />
        <Choice
          icon="flame"
          title="Chaudiere gaz"
          subtitle="Prime CEE elevee"
          selected={value === "gaz"}
          onClick={() => onChange("gaz")}
          showDot
        />
        <Choice
          icon="bolt"
          title="Chauffage electrique"
          subtitle="Prime CEE standard"
          selected={value === "elec"}
          onClick={() => onChange("elec")}
          showDot
        />
        <Choice
          icon="leaf"
          title="Bois / PAC / Autre"
          subtitle="Prime CEE variable"
          selected={value === "autre"}
          onClick={() => onChange("autre")}
          showDot
        />
      </div>

      <BtnNext onClick={onNext} disabled={!value}>
        Continuer
      </BtnNext>
      <BtnBack onClick={onBack} />
    </div>
  );
}