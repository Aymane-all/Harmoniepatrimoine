"use client";

import { BtnNext } from "../ui/Buttons";
import { IconCheck } from "../ui/Icons";

interface IntroConfortProps {
  onStart: () => void;
}

export default function IntroConfort({ onStart }: IntroConfortProps) {
  return (
    <div>
      {/* Tag du haut */}
      <div className="flex justify-center mb-5">
        <div className="inline-flex items-center gap-1.5 bg-[#DBEAFE] text-[#1E40AF] text-[11px] font-semibold px-3.5 py-1.5 rounded-full">
          <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB] animate-pulse" />
          Gratuit · 3 minutes · Resultat immediat
        </div>
      </div>

      {/* Titre principal */}
      <h1 className="text-2xl md:text-[26px] font-bold text-[#1E3A5F] text-center leading-tight mb-3">
        Votre maison est-elle
        <br />
        vraiment <span className="text-[#2563EB]">confortable</span> ?
      </h1>

      {/* Sous-titre */}
      <p className="text-sm text-gray-600 text-center leading-relaxed mb-6 max-w-md mx-auto">
        10 questions sur ce que vous ressentez au quotidien — froid, humidite, air,
        famille. Obtenez votre score de risque personnalise et decouvrez ce que
        votre maison vous cache.
      </p>

      {/* Cartes stats */}
      <div className="grid grid-cols-3 gap-2.5 mb-6">
        <StatCard num="10" label="questions sur le ressenti" />
        <StatCard num="4"  label="axes analyses" />
        <StatCard num="3 min" label="pour votre score" />
      </div>

      {/* Liste des benefices */}
      <div className="flex flex-col gap-2.5 mb-7">
        {[
          { strong: "Test emotionnel unique", end: "— base sur ce que vous vivez, pas sur des donnees techniques" },
          { strong: "Score de risque personnalise", end: "sur 100 — identifie les signaux caches de votre maison" },
          { strong: "Recommandations concretes", end: "adaptees a votre situation" },
          { strong: "Diagnostic gratuit", end: "disponible selon votre score" },
        ].map((item, i) => (
          <CheckPoint key={i} strong={item.strong} end={item.end} />
        ))}
      </div>

      <BtnNext onClick={onStart}>
        Demarrer le test
      </BtnNext>

      <div className="text-xs text-gray-400 mt-3 text-center">
        10 questions · environ 3 minutes
      </div>
    </div>
  );
}

// Sous-composants
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