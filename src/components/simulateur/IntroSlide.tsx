"use client";

import { BtnNext } from "../ui/Buttons";
import { IconCheck } from "../ui/Icons";

interface IntroSlideProps {
  onStart: () => void;
}

export default function IntroSlide({ onStart }: IntroSlideProps) {
  return (
    <div>
      {/* Tag du haut */}
      <div className="flex justify-center mb-5">
        <div className="inline-flex items-center gap-1.5 bg-[#0055A4] text-white text-[11px] font-semibold px-3.5 py-1.5 rounded-full">
          <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
          Gratuit · Sans inscription · 2 minutes
        </div>
      </div>

      {/* Titre principal */}
      <h1 className="text-2xl md:text-[26px] font-bold text-[#1E3A5F] text-center leading-tight mb-3">
        Decouvrez les aides disponibles
        <br />
        dans <span className="text-[#2563EB]">votre departement</span>
      </h1>

      {/* Sous-titre */}
      <p className="text-sm text-gray-600 text-center leading-relaxed mb-6 max-w-md mx-auto">
        Votre maison a plus de 15 ans ? En 6 questions, calculez exactement
        a combien d&apos;aides vous avez droit en 2026 — MaPrimeRenov&apos;, CEE
        et aides locales incluses.
      </p>

      {/* Cartes stats */}
      <div className="grid grid-cols-3 gap-2.5 mb-6">
        <StatCard num="70%" label="du cout des travaux pris en charge" />
        <StatCard num="96" label="departements couverts" />
        <StatCard num="2 min" label="pour obtenir votre resultat" />
      </div>

      {/* Liste des benefices */}
      <div className="flex flex-col gap-2.5 mb-7">
        {[
          { strong: "Simulation 100% gratuite", end: "— aucune carte bancaire requise" },
          { strong: "Resultat personnalise", end: "selon votre departement, vos revenus et votre chauffage" },
          { strong: "Donnees securisees", end: "— conformite RGPD & loi francaise du 1er juillet 2023" },
          { strong: "Diagnostic gratuit", end: "a domicile organise sous 24h si vous etes eligible" },
        ].map((item, i) => (
          <CheckPoint key={i} strong={item.strong} end={item.end} />
        ))}
      </div>

      <BtnNext onClick={onStart}>
        Demarrer ma simulation
      </BtnNext>

      <div className="text-xs text-gray-400 mt-3 text-center">
        6 questions · environ 2 minutes
      </div>
    </div>
  );
}

// ============================================================
// Sous-composants
// ============================================================

function StatCard({ num, label }: { num: string; label: string }) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-3 text-center shadow-sm">
      <div className="text-xl font-bold text-[#1E3A5F] leading-none">{num}</div>
      <div className="text-[11px] text-gray-500 mt-1 leading-tight">{label}</div>
    </div>
  );
}

function CheckPoint({ strong, end }: { strong: string; end: string }) {
  return (
    <div className="flex items-start gap-2.5 text-sm text-gray-700 leading-snug">
      <div className="w-5 h-5 rounded-full bg-[#DBEAFE] text-[#2563EB] flex items-center justify-center flex-shrink-0 mt-0.5">
        <IconCheck size={11} />
      </div>
      <span>
        <strong className="text-[#1E3A5F] font-semibold">{strong}</strong> {end}
      </span>
    </div>
  );
}