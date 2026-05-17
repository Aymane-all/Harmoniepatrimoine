"use client";

import { BtnNext } from "../ui/Buttons";
import { IconCheck } from "../ui/Icons";

interface IntroDpeProps {
  onStart: () => void;
}

export default function IntroDpe({ onStart }: IntroDpeProps) {
  return (
    <div>
      {/* Tag du haut */}
      <div className="flex justify-center mb-5">
        <div className="inline-flex items-center gap-1.5 bg-[#DBEAFE] text-[#1E40AF] text-[11px] font-semibold px-3.5 py-1.5 rounded-full">
          <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB] animate-pulse" />
          Gratuit · 2 minutes · Sans technicien
        </div>
      </div>

      {/* Titre principal */}
      <h1 className="text-2xl md:text-[26px] font-bold text-[#1E3A5F] text-center leading-tight mb-3">
        Quelle est la lettre
        <br />
        energetique de{" "}
        <span className="text-[#2563EB]">votre maison</span> ?
      </h1>

      {/* Sous-titre */}
      <p className="text-sm text-gray-600 text-center leading-relaxed mb-6 max-w-md mx-auto">
        En 7 questions sur votre maison, estimez votre DPE (A a G) et decouvrez
        l&apos;impact sur la valeur de votre bien et vos economies potentielles —
        sans technicien, sans deplacement.
      </p>

      {/* Cartes stats */}
      <div className="grid grid-cols-3 gap-2.5 mb-6">
        <StatCard num="7" label="questions techniques" />
        <StatCard num="A → G" label="estimation DPE" />
        <StatCard num="2 min" label="resultat immediat" />
      </div>

      {/* Liste des benefices */}
      <div className="flex flex-col gap-2.5 mb-7">
        {[
          { strong: "Estimation DPE A → G", end: "— sans technicien ni deplacement" },
          { strong: "Impact sur la valeur de votre bien", end: "— decote ou plus-value estimee" },
          { strong: "Economies potentielles", end: "— facture avant/apres renovation" },
          { strong: "Aides disponibles", end: "pour passer de F/G a C/D" },
        ].map((item, i) => (
          <CheckPoint key={i} strong={item.strong} end={item.end} />
        ))}
      </div>

      <BtnNext onClick={onStart}>
        Estimer mon DPE
      </BtnNext>

      <div className="text-xs text-gray-400 mt-3 text-center">
        7 questions · environ 2 minutes
      </div>
    </div>
  );
}

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