"use client";

import Link from "next/link";
import { useState } from "react";

// ============================================================
// Types — correspondant au JSON stocké en base
// ============================================================
interface ArticleMeta {
  region: string;
  ville: string;
  departement: string;
  date: string;
  lecture: string;
}

interface SectionText {
  type: "text";
  titre: string;
  emoji?: string;
  paragraphes: string[];
}

interface SectionTextCard {
  type: "text_card";
  titre: string;
  emoji?: string;
  paragraphes: string[];
}

interface SignalItem {
  numero: number;
  signal: string;
  revelation: string;
}

interface SectionSignaux {
  type: "signaux";
  titre: string;
  intro: string;
  items: SignalItem[];
  conclusion: string;
}

interface SectionStats {
  type: "stats";
  emoji?: string;
  titre: string;
  texte: string;
}

interface SectionCta {
  type: "cta";
  titre: string;
  details: string;
  bouton: string;
  lien: string;
  note: string;
}

interface AxeItem {
  label: string;
  description: string;
}

interface SectionAxes {
  type: "axes";
  titre: string;
  intro: string;
  sous_titre: string;
  axes: AxeItem[];
  conclusion: string;
}

interface SectionTable {
  type: "table";
  titre: string;
  headers: string[];
  rows: string[][];
}

interface Temoignage {
  texte: string;
  auteur: string;
  age: number;
  ville: string;
  annee_maison?: number;
}

interface SectionTemoignages {
  type: "temoignages";
  titre: string;
  items: Temoignage[];
}

interface EtapeProcessus {
  score: "eleve" | "faible";
  titre: string;
  description: string;
}

interface SectionProcessus {
  type: "processus";
  titre: string;
  intro: string;
  etapes: EtapeProcessus[];
}

interface FaqItem {
  question: string;
  reponse: string;
}

interface SectionFaq {
  type: "faq";
  titre: string;
  items: FaqItem[];
}

interface SectionSourceReference {
  type: "source_reference";
  titre: string;
  texte: string;
  lien_nom: string;
  lien_url: string;
}

interface SectionVilles {
  type: "villes_region";
  titre: string;
  intro: string;
  villes: string[];
}

type Section =
  | SectionText
  | SectionTextCard
  | SectionSignaux
  | SectionStats
  | SectionCta
  | SectionAxes
  | SectionTable
  | SectionTemoignages
  | SectionProcessus
  | SectionFaq
  | SectionSourceReference
  | SectionVilles;

export interface ArticleData {
  meta: ArticleMeta;
  intro: string[];
  sections: Section[];
}

// ============================================================
// Composant principal
// ============================================================
export default function ArticleConfortRenderer({ data }: { data: ArticleData }) {
  return (
    <div className="space-y-12 max-w-3xl mx-auto text-gray-800 antialiased leading-relaxed">
      {/* Introduction */}
      <div className="space-y-6">
        {data.intro.map((p, i) => (
          <p key={i} className="text-lg md:text-xl text-gray-600 font-normal leading-relaxed">
            {p}
          </p>
        ))}
      </div>

      {/* Sections dynamiques */}
      <div className="space-y-14">
        {data.sections.map((section, idx) => (
          <SectionRenderer key={idx} section={section} />
        ))}
      </div>
    </div>
  );
}

// ============================================================
// Dispatcher de sections
// ============================================================
function SectionRenderer({ section }: { section: Section }) {
  switch (section.type) {
    case "text":         return <TextSection s={section} />;
    case "text_card":    return <TextCardSection s={section} />;
    case "signaux":      return <SignauxSection s={section} />;
    case "stats":        return <StatsSection s={section} />;
    case "cta":          return <CtaSection s={section} />;
    case "axes":         return <AxesSection s={section} />;
    case "table":        return <TableSection s={section} />;
    case "temoignages":  return <TemoignagesSection s={section} />;
    case "processus":    return <ProcessusSection s={section} />;
    case "faq":          return <FaqSection s={section} />;
    case "source_reference": return <SourceReferenceSection s={section} />;
    case "villes_region":return <VillesSection s={section} />;
    default:             return null;
  }
}

// ============================================================
// Section : Texte simple
// ============================================================
function TextSection({ s }: { s: SectionText }) {
  return (
    <section className="scroll-mt-20">
      <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight mt-6 mb-5 flex items-center gap-2.5">
        {s.emoji && <span className="text-2xl">{s.emoji}</span>}
        {s.titre}
      </h2>
      <div className="space-y-4">
        {s.paragraphes.map((p, i) => (
          <p key={i} className="text-gray-600 text-[16px] md:text-[17px] leading-relaxed">{p}</p>
        ))}
      </div>
    </section>
  );
}

// ============================================================
// Section : Texte sous forme de carte (avec bordure gauche)
// ============================================================
function TextCardSection({ s }: { s: SectionTextCard }) {
  return (
    <section className="bg-slate-50 border-l-4 border-blue-600 rounded-r-2xl p-6 md:p-8 my-8 shadow-sm">
      <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
        {s.emoji && <span>{s.emoji}</span>}
        {s.titre}
      </h3>
      <div className="space-y-3">
        {s.paragraphes.map((p, i) => (
          <p key={i} className="text-gray-700 text-sm md:text-base leading-relaxed">{p}</p>
        ))}
      </div>
    </section>
  );
}

// ============================================================
// Section : Les 5 signaux (Design sous forme de liste premium)
// ============================================================
function SignauxSection({ s }: { s: SectionSignaux }) {
  return (
    <section className="scroll-mt-20">
      <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight mt-6 mb-4">{s.titre}</h2>
      <p className="text-gray-600 mb-8 leading-relaxed text-[16px] md:text-[17px]">{s.intro}</p>

      <div className="space-y-4 mb-8">
        {s.items.map((item, i) => (
          <div 
            key={i} 
            className="flex items-start gap-4 p-5 rounded-2xl bg-white border border-gray-100 hover:border-blue-100 shadow-sm hover:shadow-md transition-all duration-300"
          >
            <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full bg-blue-50 text-blue-600 font-bold text-sm">
              {item.numero < 10 ? `0${item.numero}` : item.numero}
            </div>
            <div>
              <h4 className="font-bold text-gray-900 text-base md:text-lg mb-1">{item.signal}</h4>
              <p className="text-gray-500 text-sm md:text-base">{item.revelation}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-amber-50 border-l-4 border-amber-400 p-5 rounded-r-2xl my-6 shadow-sm">
        <p className="text-amber-900 text-sm md:text-base leading-relaxed italic">{s.conclusion}</p>
      </div>
    </section>
  );
}

// ============================================================
// Section : Bloc statistiques / Encarts
// ============================================================
function StatsSection({ s }: { s: SectionStats }) {
  return (
    <section className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 rounded-2xl p-6 md:p-8 my-8 shadow-sm">
      <h3 className="text-lg md:text-xl font-bold text-blue-900 mb-3 flex items-center gap-2">
        {s.emoji && <span>{s.emoji}</span>}
        {s.titre}
      </h3>
      <p className="text-blue-950 text-sm md:text-base leading-relaxed">{s.texte}</p>
    </section>
  );
}

// ============================================================
// Section : CTA Premium (Dark Theme comme sur la maquette)
// ============================================================
function CtaSection({ s }: { s: any }) {
  // Support both JSON schemas present in the database
  const titre = s.titre || "";
  const details = s.details || s.texte || "";
  const bouton = s.bouton || s.bouton_texte || "Démarrer";
  const note = s.note || s.subtexte || "";
  
  let lien = s.lien || "#";
  if (s.simulateur_slug) {
    lien = s.simulateur_slug.startsWith("/") ? s.simulateur_slug : `/${s.simulateur_slug}`;
  }

  // Normaliser le lien de confort vers la route réelle
  if (lien === "/simulateur-confort") {
    lien = "/simulateurCon";
  }

  // Déterminer la catégorie du simulateur dynamiquement
  const category = lien.includes("aides") 
    ? "Simulateur d'Aides Rénovation" 
    : lien.includes("dpe") 
      ? "Simulateur DPE Gratuit" 
      : "Simulateur de Confort Gratuit";

  return (
    <section className="bg-[#1e293b] rounded-2xl p-8 md:p-10 text-white text-center my-10 shadow-lg relative overflow-hidden">
      {/* Subtle background decoration */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/10 rounded-full blur-2xl" />
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-indigo-600/10 rounded-full blur-2xl" />

      <span className="inline-block px-3 py-1 bg-blue-500/20 text-blue-400 text-xs font-semibold uppercase tracking-widest rounded-full mb-3">
        {category}
      </span>
      <h3 className="text-xl md:text-2xl font-extrabold mb-3 leading-tight tracking-tight">
        {titre}
      </h3>
      <p className="text-slate-300 text-xs md:text-sm mb-6 max-w-xl mx-auto leading-relaxed">
        {details}
      </p>
      <Link
        href={lien}
        className="inline-flex items-center gap-2 bg-[#2563eb] text-white font-semibold px-8 py-3.5 rounded-full text-sm md:text-base hover:bg-blue-700 active:scale-95 transition-all duration-150 shadow-md shadow-blue-500/20 cursor-pointer"
      >
        {bouton}
      </Link>
      {note && (
        <p className="text-slate-400 text-xs mt-5 italic">
          {note}
        </p>
      )}
    </section>
  );
}

// ============================================================
// Section : Les 4 axes du test
// ============================================================
function AxesSection({ s }: { s: SectionAxes }) {
  return (
    <section className="scroll-mt-20">
      <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight mt-6 mb-4">{s.titre}</h2>
      <p className="text-gray-600 mb-8 leading-relaxed text-[16px] md:text-[17px]">{s.intro}</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {s.axes.map((axe, i) => (
          <div key={i} className="p-5 rounded-2xl bg-slate-50 border border-slate-100 shadow-sm hover:shadow-md transition-all duration-200">
            <h4 className="font-bold text-gray-900 text-base md:text-lg mb-2 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-600" />
              {axe.label}
            </h4>
            <p className="text-gray-600 text-sm leading-relaxed">{axe.description}</p>
          </div>
        ))}
      </div>
      <p className="text-gray-500 text-sm italic">{s.conclusion}</p>
    </section>
  );
}

// ============================================================
// Section : Tableaux Dynamiques et Organisés
// ============================================================
function TableSection({ s }: { s: SectionTable }) {
  return (
    <section className="my-8 scroll-mt-20">
      <h3 className="text-xl font-bold text-gray-900 mb-4 tracking-tight flex items-center gap-2">
        <span className="w-1.5 h-6 bg-blue-600 rounded-full" />
        {s.titre}
      </h3>

      {/* Conteneur fluide s'adaptant à 100% de la largeur mobile */}
      <div className="overflow-hidden rounded-2xl border border-gray-200 shadow-sm bg-white w-full">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-[#1e293b] text-white">
              {s.headers.map((h, i) => (
                <th 
                  key={i} 
                  className="px-2.5 py-3 md:px-5 md:py-4 text-left font-semibold text-[10px] md:text-xs uppercase tracking-wider border-b border-slate-700"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-150">
            {s.rows.map((row, i) => (
              <tr 
                key={i} 
                className="hover:bg-slate-50 odd:bg-white even:bg-slate-50/50 transition-colors duration-150"
              >
                {row.map((cell, j) => (
                  <td 
                    key={j} 
                    className={`px-2.5 py-3 md:px-5 md:py-4 text-gray-700 leading-relaxed text-[11px] md:text-[13px] ${
                      j === 0 ? "font-bold text-[#1E3A5F]" : "font-normal"
                    }`}
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

// ============================================================
// Section : Témoignages (Format Cartes élégantes)
// ============================================================
function TemoignagesSection({ s }: { s: SectionTemoignages }) {
  return (
    <section className="scroll-mt-20">
      <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight mt-6 mb-6">{s.titre}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {s.items.map((t, i) => (
          <div 
            key={i} 
            className="flex flex-col justify-between p-6 bg-slate-50 border border-slate-100 rounded-2xl shadow-sm relative"
          >
            {/* Quote icon decoration */}
            <span className="absolute top-4 right-4 text-gray-200 text-5xl font-serif select-none pointer-events-none">
              “
            </span>
            <p className="text-gray-700 leading-relaxed italic text-sm md:text-[15px] mb-5 relative z-10">
              "{t.texte}"
            </p>
            <div className="border-t border-slate-200/60 pt-4 flex items-center justify-between">
              <div>
                <span className="font-bold text-gray-900 text-sm block">
                  {t.auteur}
                </span>
                <span className="text-xs text-gray-500">
                  {t.age} ans · {t.ville}
                </span>
              </div>
              {t.annee_maison && (
                <span className="text-[11px] font-semibold bg-blue-50 text-blue-700 px-2.5 py-1 rounded-full">
                  Maison {t.annee_maison}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ============================================================
// Section : Processus (Après le test - Vert & Orange)
// ============================================================
function ProcessusSection({ s }: { s: SectionProcessus }) {
  return (
    <section className="scroll-mt-20">
      <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight mt-6 mb-4">{s.titre}</h2>
      <p className="text-gray-600 mb-6 leading-relaxed text-[16px] md:text-[17px]">{s.intro}</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {s.etapes.map((e, i) => (
          <div
            key={i}
            className={`rounded-2xl p-6 border shadow-sm flex flex-col justify-between ${
              e.score === "eleve"
                ? "bg-orange-50/50 border-orange-200/80 text-orange-950"
                : "bg-emerald-50/50 border-emerald-250/80 text-emerald-950"
            }`}
          >
            <div>
              <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4 ${
                e.score === "eleve" ? "bg-orange-100 text-orange-800" : "bg-emerald-100 text-emerald-800"
              }`}>
                {e.score === "eleve" ? "Score élevé" : "Score faible"}
              </span>
              <h3 className="font-extrabold text-base md:text-lg mb-3 leading-snug text-gray-900">
                {e.titre}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">
                {e.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ============================================================
// Section : Accordéon FAQ Intuitif
// ============================================================
function FaqSection({ s }: { s: SectionFaq }) {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section className="scroll-mt-20">
      <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight mt-6 mb-6">{s.titre}</h2>
      <div className="space-y-3">
        {s.items.map((item, i) => {
          const isOpen = openIdx === i;
          return (
            <div 
              key={i} 
              className="border border-gray-150 rounded-2xl overflow-hidden bg-white hover:border-gray-300 transition-colors duration-150"
            >
              <button
                onClick={() => setOpenIdx(isOpen ? null : i)}
                aria-expanded={isOpen}
                aria-controls={`faq-answer-${i}`}
                className="w-full flex items-center justify-between p-5 text-left font-bold text-gray-900 text-sm md:text-base hover:bg-slate-50 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500/20 rounded-t-2xl"
              >
                <span>{item.question}</span>
                <span className={`text-xl transform transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}>
                  ↓
                </span>
              </button>
              <div 
                id={`faq-answer-${i}`}
                role="region"
                aria-label={item.question}
                className={`transition-all duration-200 ease-in-out ${
                  isOpen ? "max-h-[300px] border-t border-gray-100 p-5 opacity-100" : "max-h-0 opacity-0 overflow-hidden"
                }`}
              >
                <p className="text-gray-600 text-sm md:text-base leading-relaxed">{item.reponse}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

// ============================================================
// Section : Villes (Badges à la fin de la page)
// ============================================================
function VillesSection({ s }: { s: SectionVilles }) {
  return (
    <section className="border-t border-gray-200 pt-10 scroll-mt-20">
      <h2 className="text-lg font-extrabold text-gray-950 mb-3 tracking-tight">{s.titre}</h2>
      <p className="text-gray-500 text-sm mb-5">{s.intro}</p>
      <div className="flex flex-wrap gap-2.5">
        {s.villes.map((v, i) => (
          <span
            key={i}
            className="bg-slate-50 hover:bg-slate-100 text-gray-600 text-xs font-semibold px-4 py-2 rounded-full border border-gray-200 transition-colors duration-150 cursor-default"
          >
            {v}
          </span>
        ))}
      </div>
    </section>
  );
}

// ============================================================
// Section : Source de référence
// ============================================================
function SourceReferenceSection({ s }: { s: SectionSourceReference }) {
  return (
    <section className="bg-slate-50 border border-slate-200/80 rounded-2xl p-6 md:p-8 my-8 shadow-sm">
      <h3 className="text-base font-bold text-gray-900 mb-2.5 flex items-center gap-2">
        📚 {s.titre}
      </h3>
      <p className="text-gray-600 text-sm md:text-base leading-relaxed">
        {s.texte}
        <a 
          href={s.lien_url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-[#2563eb] hover:text-blue-800 font-semibold underline underline-offset-4 decoration-2 decoration-blue-100 hover:decoration-[#2563eb] transition-colors"
        >
          {s.lien_nom}
        </a>
      </p>
    </section>
  );
}
