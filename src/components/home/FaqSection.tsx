"use client";

import { useState } from "react";
import { IconPlus, IconMinus } from "./Icons";

const FAQ = [
  {
    q: "Les simulateurs sont-ils vraiment gratuits ?",
    r: "Oui — les trois simulateurs sont entierement gratuits, sans carte bancaire. Le resultat est immediat. Si votre situation rend eligible a un diagnostic, le controle a domicile est aussi gratuit et sans engagement.",
  },
  {
    q: "Mes donnees personnelles sont-elles protegees ?",
    r: "Oui. Vos donnees sont utilisees uniquement pour vous recontacter dans le cadre de votre projet. Elles ne sont jamais revendues. Conformite RGPD et loi francaise du 1er juillet 2023.",
  },
  {
    q: "Quelle est la difference entre les 3 simulateurs ?",
    r: "Le simulateur d'aides calcule vos subventions, le test de confort evalue votre ressenti au quotidien, et le simulateur DPE estime la classe energetique de votre logement.",
  },
  {
    q: "Le simulateur couvre-t-il mon departement ?",
    r: "Oui, nos simulateurs integrent les aides locales de plus de 96 departements francais. Les montants s'ajustent automatiquement selon votre localisation.",
  },
  {
    q: "Que se passe-t-il apres la simulation ?",
    r: "Un conseiller local vous rappelle sous 24h depuis un numero commencant par 07 ou 09 pour analyser vos reponses et, si vous le souhaitez, organiser un diagnostic gratuit.",
  },
];

export default function FaqSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section className="w-full bg-[#F5F5F5] py-14">
      <div className="max-w-3xl mx-auto px-5 md:px-8">
        <div className="mb-8">
          <span className="inline-block text-[10px] font-bold text-white bg-[#1E3A5F] px-2.5 py-1 rounded uppercase tracking-wider mb-3">
            Questions frequentes
          </span>
        </div>

        <div className="flex flex-col gap-3">
          {FAQ.map((item, i) => {
            const isOpen = openIdx === i;
            return (
              <div
                key={i}
                className={`rounded-xl border transition-colors ${
                  isOpen
                    ? "bg-[#2563EB] border-[#2563EB]"
                    : "bg-white border-gray-200"
                }`}
              >
                <button
                  onClick={() => setOpenIdx(isOpen ? null : i)}
                  className="w-full flex items-center gap-4 p-5 text-left"
                >
                  <span className={`text-sm font-bold ${isOpen ? "text-white/60" : "text-[#2563EB]"}`}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className={`flex-1 text-sm font-semibold ${isOpen ? "text-white" : "text-gray-900"}`}>
                    {item.q}
                  </span>
                  <span className={isOpen ? "text-white" : "text-gray-400"}>
                    {isOpen ? <IconMinus size={20} /> : <IconPlus size={20} />}
                  </span>
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 pl-14">
                    <p className="text-sm text-white/85 leading-relaxed">
                      {item.r}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
