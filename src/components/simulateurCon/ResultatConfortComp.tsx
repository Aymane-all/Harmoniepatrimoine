"use client";

import type { ResultatConfort } from "@/types/simulateur-confort";
import { ICONS, type IconName } from "../ui/Icons";

interface Props {
  nomComplet: string;
  resultat: ResultatConfort;
}

export default function ResultatConfortComp({ nomComplet, resultat }: Props) {
  const now = new Date();
  const dateStr = now.toLocaleDateString("fr-FR") + " a " +
    now.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" });

  // Cercle SVG : circumference = 2πr = 226 pour r=36
  const circumference = 226;
  const offset = circumference - (resultat.scorePct / 100) * circumference;

  return (
    <div>
      {/* Tag axe */}
      <div className="inline-block mb-4">
        <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full ${resultat.badgeClass}`}>
          <ICONS.alertTriangle size={14} /> {resultat.niveauLabel}
        </span>
      </div>

      {/* Titre */}
      <h2 className="text-xl md:text-[22px] font-bold text-[#1E3A5F] leading-tight mb-2">
        {resultat.titre}
      </h2>
      <p className="text-sm text-gray-600 leading-relaxed mb-6">
        {resultat.description}
      </p>

      {/* Score circulaire */}
      <div className="flex items-center gap-5 bg-gray-50 border border-gray-200 rounded-xl p-5 mb-6">
        <div className="relative w-[90px] h-[90px] flex-shrink-0">
          <svg width="90" height="90" viewBox="0 0 90 90" style={{ transform: "rotate(-90deg)" }}>
            <circle cx="45" cy="45" r="36" fill="none" stroke="#E0E0E0" strokeWidth="8" />
            <circle cx="45" cy="45" r="36" fill="none" strokeWidth="8" strokeLinecap="round"
              stroke={resultat.couleur}
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              style={{ transition: "stroke-dashoffset 1s ease" }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <ICONS.alertCircle size={28} style={{ color: resultat.couleur }} />
          </div>
        </div>
        <div className="flex-1">
          <div className="text-sm font-bold mb-1" style={{ color: resultat.couleur }}>
            {resultat.niveauLabel}
          </div>
          <div className="text-xs text-gray-600 leading-relaxed">
            Score base sur 10 questions — Analyse de votre situation thermique et de votre bien-etre.
          </div>
        </div>
      </div>

      {/* Axes */}
      <SectionTitle>Analyse par axe</SectionTitle>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-5">
        <AxeCard label="Confort thermique" icon="snowflake" axe={resultat.axes.thermique} couleur={resultat.couleur} />
        <AxeCard label="Humidite & air"    icon="droplet"   axe={resultat.axes.humidite}  couleur={resultat.couleur} />
        <AxeCard label="Vie familiale"   icon="family"    axe={resultat.axes.famille}   couleur={resultat.couleur} />
        <AxeCard label="Sommeil & bien-etre" icon="moon"      axe={resultat.axes.sommeil}  couleur={resultat.couleur} />
      </div>

      {/* Signaux */}
      <SectionTitle>Signaux detectes dans votre maison</SectionTitle>
      <div className="flex flex-col gap-2 mb-5">
        {resultat.signaux.map((s, i) => (
          <SignalItem key={i} signal={s} />
        ))}
      </div>

      {/* Recommandations */}
      <SectionTitle>Nos recommandations pour votre maison</SectionTitle>
      <div className="flex flex-col gap-2 mb-5">
        {resultat.recommandations.map((r, i) => (
          <div key={i} className="flex items-start gap-2.5 p-3 px-3.5 bg-[#DBEAFE] rounded-xl border border-[#BFD9F8]">
            <div className="w-[22px] h-[22px] rounded-full bg-[#2563EB] text-white text-[11px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
              {i + 1}
            </div>
            <div className="flex-1">
              <div className="text-sm font-semibold text-[#1E3A5F] mb-0.5">{r.nom}</div>
              <div className="text-xs text-gray-600 leading-relaxed">{r.desc}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Diagnostic gratuit */}
      <div className="bg-[#DBEAFE] border border-[#BFD9F8] rounded-xl p-4 mb-5">
        <div className="flex items-center gap-2 text-sm font-semibold text-[#1E40AF] mb-3">
          <ICONS.search size={18} /> Ce que comprend votre diagnostic gratuit
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-4">
          {[
            { ico: "thermometer", text: "Analyse thermique complete" },
            { ico: "droplet",     text: "Detection sources d'humidite" },
            { ico: "bricks",      text: "Estimation DPE actuel" },
            { ico: "euro",        text: "Plan d'aides disponibles" },
            { ico: "house",       text: "Recommandations travaux" },
            { ico: "user",        text: "Accompagnement complet" },
          ].map((item, i) => {
            const Icon = ICONS[item.ico as IconName];
            return (
              <div key={i} className="flex items-center gap-2 text-xs text-[#1E40AF] leading-relaxed">
                <Icon size={14} className="opacity-70" /> {item.text}
              </div>
            );
          })}
        </div>
      </div>

      {/* Recap */}
      <div className="bg-gray-50 rounded-xl p-3.5 mb-4 text-xs text-gray-600 leading-relaxed">
        <strong className="text-gray-900">Nom :</strong> {nomComplet}<br />
        <strong className="text-gray-900">Score de risque :</strong> {resultat.niveauLabel}<br />
        <strong className="text-gray-900">Consentement :</strong>{" "}
        <span className="text-green-700 font-semibold inline-flex items-center gap-1">
          <ICONS.check size={14} /> Enregistre le {dateStr}
        </span>
      </div>

      <div className="bg-[#F0F5FF] rounded-xl p-3.5 text-xs text-[#1E3A5F] leading-relaxed border border-[#BFD9F8] flex items-start gap-2.5">
        <ICONS.bolt size={16} className="mt-0.5 text-[#2563EB] flex-shrink-0" />
        <div>
          Un conseiller local vous rappellera sous <strong>24h</strong> depuis un numero
          commencant par <strong>07 ou 09</strong> pour analyser vos reponses et organiser
          votre diagnostic gratuit.
        </div>
      </div>
    </div>
  );
}

// Sous-composants
function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider mt-5 mb-3 pb-1.5 border-b border-gray-200">
      {children}
    </h3>
  );
}

function AxeCard({ label, icon, axe, couleur }: {
  label: string;
  icon: IconName;
  axe: { score: number; max: number; pct: number; niveau: string };
  couleur: string;
}) {
  const Icon = ICONS[icon];
  const niveauLabel = axe.niveau === "bon" ? "Bon" : axe.niveau === "attention" ? "Attention" : "Critique";
  return (
    <div className="bg-gray-50 border border-gray-200 rounded-xl p-3">
      <div className="flex items-center gap-2 text-xs font-semibold text-gray-600 mb-1.5">
        <Icon size={14} style={{ color: couleur }} />
        {label}
      </div>
      <div className="h-1.5 bg-gray-200 rounded-full mb-1.5 overflow-hidden">
        <div className="h-full rounded-full" style={{ width: `${axe.pct}%`, background: couleur }} />
      </div>
      <div className="text-[11px] text-gray-500">{niveauLabel}</div>
    </div>
  );
}

function SignalItem({ signal }: { signal: { type: string; ico: string; nom: string; desc: string } }) {
  const IconComp = ICONS[signal.ico as IconName] || ICONS.alertCircle;
  const colors = {
    high: "bg-red-50 border-red-200 text-red-600",
    med:  "bg-yellow-50 border-yellow-200 text-yellow-600",
    low:  "bg-green-50 border-green-200 text-green-600",
  };
  const cls = colors[signal.type as keyof typeof colors] || colors.med;

  return (
    <div className={`flex items-start gap-2.5 px-3 py-2.5 rounded-xl border ${cls.split(" ").slice(0, 2).join(" ")}`}>
      <span className={`flex-shrink-0 mt-0.5 ${cls.split(" ").slice(2).join(" ")}`}>
        <IconComp size={18} />
      </span>
      <div className="flex-1">
        <div className="text-sm font-semibold text-gray-900 mb-0.5">{signal.nom}</div>
        <div className="text-xs text-gray-600 leading-relaxed">{signal.desc}</div>
      </div>
    </div>
  );
}