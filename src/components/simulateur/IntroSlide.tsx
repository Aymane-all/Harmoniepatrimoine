"use client";

import { BtnNext } from "../ui/Buttons";

interface IntroSlideProps {
  onStart: () => void;
}

export default function IntroSlide({ onStart }: IntroSlideProps) {
  return (
    <div className="text-center py-2">
      <div className="inline-flex items-center gap-1.5 bg-brand-100 text-brand-700 text-xs font-semibold px-3.5 py-1 rounded-full mb-5">
        <span className="w-1.5 h-1.5 rounded-full bg-brand-500 animate-pulse" />
        Gratuit · Sans inscription · 2 minutes
      </div>

      <div className="text-5xl mb-4">🏠</div>

      <h1 className="text-xl md:text-2xl font-bold text-gray-900 leading-snug mb-2">
        Decouvrez les aides disponibles
        <br />
        dans <span className="text-brand-500">votre departement</span>
      </h1>

      <p className="text-sm text-gray-600 leading-relaxed mb-6 max-w-md mx-auto">
        Votre maison a plus de 15 ans ? En 6 questions, calculez exactement
        a combien d&apos;aides vous avez droit en 2026 — MaPrimeRenov&apos;, CEE
        et aides locales incluses.
      </p>

      <div className="grid grid-cols-3 gap-2.5 mb-6">
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
          <div className="text-xl font-bold text-brand-500">70%</div>
          <div className="text-[11px] text-gray-500 mt-0.5 leading-tight">
            du cout des travaux pris en charge
          </div>
        </div>
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
          <div className="text-xl font-bold text-brand-500">96</div>
          <div className="text-[11px] text-gray-500 mt-0.5 leading-tight">
            departements couverts
          </div>
        </div>
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
          <div className="text-xl font-bold text-brand-500">2 min</div>
          <div className="text-[11px] text-gray-500 mt-0.5 leading-tight">
            pour obtenir votre resultat
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-2 text-left mb-6">
        {[
          { strong: "Simulation 100% gratuite", end: "— aucune carte bancaire requise" },
          { strong: "Resultat personnalise", end: "selon votre departement, vos revenus et votre chauffage" },
          { strong: "Donnees securisees", end: "— conformite RGPD & loi francaise du 1er juillet 2023" },
          { strong: "Diagnostic gratuit", end: "a domicile organise sous 24h si vous etes eligible" },
        ].map((item, i) => (
          <div key={i} className="flex items-start gap-2.5 text-sm text-gray-700 leading-snug">
            <div className="w-5 h-5 rounded-full bg-success-50 text-success-700 text-[11px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
              ✓
            </div>
            <span>
              <strong className="text-gray-900">{item.strong}</strong> {item.end}
            </span>
          </div>
        ))}
      </div>

      <BtnNext onClick={onStart} className="max-w-sm mx-auto">
        Demarrer ma simulation →
      </BtnNext>

      <div className="text-xs text-gray-400 mt-2">
        ⏱ 6 questions · environ 2 minutes
      </div>
    </div>
  );
}
