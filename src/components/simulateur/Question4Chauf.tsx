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

      <div className="grid grid-cols-2 gap-3 mb-6">
        <Choice
          icon="oilTank"
          title="Chaudiere fioul"
          selected={value === "fioul"}
          onClick={() => onChange("fioul")}
          showDot
          layout="vertical"
        />
        <Choice
          icon="flame"
          title="Chaudiere gaz"
          selected={value === "gaz"}
          onClick={() => onChange("gaz")}
          showDot
          layout="vertical"
        />
        <Choice
          icon="bolt"
          title="Chauffage electrique"
          selected={value === "elec"}
          onClick={() => onChange("elec")}
          showDot
          layout="vertical"
        />
        <Choice
          icon="leaf"
          title="Bois / PAC / Autre"
          selected={value === "autre"}
          onClick={() => onChange("autre")}
          showDot
          layout="vertical"
        />
      </div>

      <BtnNext onClick={onNext} disabled={!value}>
        Continuer
      </BtnNext>
    </div>
  );
}