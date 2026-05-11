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
      <h2 className="text-xl font-semibold text-gray-900 mb-1.5 leading-snug">
        Quel est votre principal probleme avec votre maison ?
      </h2>
      <p className="text-sm text-gray-500 mb-6 leading-relaxed">
        Cette reponse personnalise votre resultat.
      </p>

      <div className="grid grid-cols-2 gap-2.5 mb-6">
        <Choice
          icon="❄️"
          title="Froid"
          subtitle="Mauvaise isolation"
          selected={value === "froid"}
          onClick={() => onChange("froid")}
        />
        <Choice
          icon="💧"
          title="Humidite"
          subtitle="Moisissures, air lourd"
          selected={value === "humidite"}
          onClick={() => onChange("humidite")}
        />
        <Choice
          icon="💶"
          title="Factures elevees"
          subtitle="Charges trop hautes"
          selected={value === "factures"}
          onClick={() => onChange("factures")}
        />
        <Choice
          icon="🔍"
          title="Mes droits"
          subtitle="Je veux savoir"
          selected={value === "droits"}
          onClick={() => onChange("droits")}
        />
      </div>

      <BtnNext onClick={onNext} disabled={!value}>
        Voir le formulaire →
      </BtnNext>
      <BtnBack onClick={onBack} />
    </div>
  );
}
