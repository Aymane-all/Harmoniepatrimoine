"use client";

import { useState } from "react";
import { IconArrowLeftCircle, IconArrowRightCircle } from "./Icons";

const TEMOIGNAGES = [
  {
    texte: "Je n'avais pas conscience que ma maison perdait autant de valeur. Le simulateur m'a ouvert les yeux et le conseiller a ete tres clair.",
    nom: "Michel B.",
    info: "62 ans — Le Mans, Maison 1985",
  },
  {
    texte: "Tout s'est passe tres simplement. J'ai decouvert que j'avais droit a plus de 9 000 euros d'aides que je ne soupconnais pas.",
    nom: "Sophie L.",
    info: "54 ans — Nantes, Maison 1992",
  },
  {
    texte: "Le controle gratuit a domicile a confirme le diagnostic. Une equipe serieuse et un accompagnement de bout en bout.",
    nom: "Bernard M.",
    info: "67 ans — Niort, Maison 1978",
  },
];

export default function TemoignagesSection() {
  const [idx, setIdx] = useState(0);
  const t = TEMOIGNAGES[idx];

  const prev = () => setIdx((i) => (i === 0 ? TEMOIGNAGES.length - 1 : i - 1));
  const next = () => setIdx((i) => (i === TEMOIGNAGES.length - 1 ? 0 : i + 1));

  return (
    <section className="w-full bg-white py-14">
      <div className="max-w-4xl mx-auto px-5 md:px-8">
        <div className="mb-8">
          <span className="inline-block text-[10px] font-bold text-white bg-[#1E3A5F] px-2.5 py-1 rounded uppercase tracking-wider mb-3">
            Temoignages
          </span>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
            Ce que disent les{" "}
            <span className="text-[#2563EB]">proprietaires</span>
          </h2>
        </div>

        {/* Carte bleue */}
        <div className="bg-[#2563EB] rounded-2xl p-8 md:p-12 text-white">
          <div className="text-5xl font-serif leading-none mb-4 opacity-50">"</div>
          <p className="text-lg md:text-xl leading-relaxed mb-8">
            {t.texte}
          </p>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-bold">{t.nom}</div>
              <div className="text-xs text-white/70">{t.info}</div>
            </div>
            <div className="flex items-center gap-3 text-white/80">
              <button onClick={prev} aria-label="Precedent"
                className="hover:text-white transition-colors">
                <IconArrowLeftCircle size={36} />
              </button>
              <button onClick={next} aria-label="Suivant"
                className="hover:text-white transition-colors">
                <IconArrowRightCircle size={36} />
              </button>
            </div>
          </div>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-5">
          {TEMOIGNAGES.map((_, i) => (
            <button
              key={i}
              onClick={() => setIdx(i)}
              aria-label={`Temoignage ${i + 1}`}
              className={`w-2 h-2 rounded-full transition-colors ${
                i === idx ? "bg-[#2563EB]" : "bg-gray-300"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
