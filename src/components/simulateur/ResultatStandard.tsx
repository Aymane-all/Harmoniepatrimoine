"use client";

import type { Resultat, SimulateurData } from "@/types/simulateur";
import { formatEuro, getCeeTag, getAnneeLabel, getReveals } from "@/lib/calculs";
import { DEPTS } from "@/lib/constants";

interface ResultatStandardProps {
  nomComplet: string;
  data: SimulateurData;
  resultat: Resultat;
}

function getPrenom(nomComplet: string): string {
  return nomComplet.trim().split(/\s+/)[0] || "";
}

export default function ResultatStandard({ nomComplet, data, resultat }: ResultatStandardProps) {
  const prenom = getPrenom(nomComplet);
  const dept = DEPTS[data.dept] || `Departement ${data.dept}`;
  const ceeTag = getCeeTag(data.chauf);
  const anneeLabel = getAnneeLabel(data.annee);
  const reveals = getReveals(data.annee);
  const ecoAn = resultat.ecoAnnuelle;
  const eco10 = ecoAn * 10;
  const facture = Math.round(ecoAn * 2.5);
  const tva = Math.round(20000 * 0.145);

  const now = new Date();
  const dateStr = now.toLocaleDateString("fr-FR") +
    " a " + now.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" });

  return (
    <div>
      {/* En-tete */}
      <div className="mb-6">
        <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full mb-4 bg-success-50 text-success-700">
          ✓ Diagnostic gratuit disponible
        </span>
        <h2 className="text-2xl font-semibold text-gray-900 mb-1.5">Votre maison merite un controle</h2>
        <p className="text-sm text-gray-600 leading-relaxed">
          Bonjour <strong>{prenom}</strong>, voici votre rapport pour votre maison du
          departement <strong>{dept}</strong>. Meme sans aides sous conditions de revenus,
          votre situation offre des opportunites importantes.
        </p>
      </div>

      {/* Economies hero */}
      <div className="rounded-xl p-5 text-center mb-6" style={{ background: "#065F46" }}>
        <div className="text-xs text-white/60 mb-1.5">💡 Economies potentielles sur 10 ans</div>
        <div className="text-4xl font-bold text-white leading-none mb-1.5">
          {formatEuro(eco10)}
        </div>
        <div className="text-xs text-white/75">
          Estimation basee sur vos donnees et la moyenne nationale
        </div>
      </div>

      {/* Aides sans conditions */}
      <SectionTitle>Aides disponibles sans conditions de revenus</SectionTitle>
      <div className="flex flex-col gap-2 mb-5">
        <AideRow
          iconBg="bg-warning-50"
          icon="⚡"
          name="Prime CEE"
          desc="Accessible a tous les proprietaires — sans condition de revenus. Versee directement par les fournisseurs d'energie."
          tag={ceeTag}
          tagColor="warning"
          amount={formatEuro(resultat.cee)}
        />
        <AideRow
          iconBg="bg-gray-100"
          icon="📉"
          name="TVA reduite a 5,5%"
          desc="Applicable sur tous les travaux de renovation energetique — sans condition de revenus."
          tag="Appliquee automatiquement"
          tagColor="gray"
          amount={"~" + formatEuro(tva)}
        />
        <div className="rounded-lg p-3.5 border-[1.5px] border-brand-500 bg-gray-50 flex items-start gap-3">
          <div className="w-10 h-10 rounded-lg flex items-center justify-center text-xl flex-shrink-0 bg-brand-100">💳</div>
          <div className="flex-1">
            <div className="text-sm font-semibold text-gray-900 mb-1">Eco-PTZ (pret a taux zero)</div>
            <div className="text-xs text-gray-600 leading-snug mb-1.5">
              Jusqu&apos;a 50 000€ sans interets — accessible a tous les proprietaires.
            </div>
            <span className="inline-block text-[11px] font-medium px-2 py-0.5 rounded bg-brand-100 text-brand-700">
              Aucun interet a rembourser
            </span>
          </div>
          <div className="text-lg font-bold text-brand-500 text-right whitespace-nowrap leading-tight">
            Jusqu&apos;a<br />50 000€
          </div>
        </div>
      </div>

      {/* Simulation des economies */}
      <SectionTitle>Simulation de vos economies annuelles</SectionTitle>
      <div className="bg-gray-50 rounded-xl p-4 border border-gray-200 mb-5">
        <FinanceRow label="Facture energetique actuelle estimee" value={"~" + formatEuro(facture) + "/an"} />
        <FinanceRow label="Economies annuelles apres travaux" value={"~" + formatEuro(ecoAn) + "/an"} highlight />
        <div className="h-px bg-gray-200 my-1.5" />
        <FinanceRow label="Economies cumulees sur 10 ans" value={"~" + formatEuro(eco10)} total />
        <FinanceRow label="Plus-value estimee sur votre bien" value="+10 a +15%" highlight />
      </div>

      {/* Reveals */}
      <SectionTitle>
        Ce que revele souvent le diagnostic sur une maison de {anneeLabel}
      </SectionTitle>
      <div className="flex flex-col gap-1.5 mb-5">
        {reveals.map((r, i) => (
          <div
            key={i}
            className="flex items-start gap-2.5 p-2.5 px-3 rounded-lg border text-sm text-gray-600 leading-snug"
            style={{ background: "#FFF8F0", borderColor: "#FDE8C8" }}
          >
            <span className="text-base font-bold flex-shrink-0" style={{ color: "#D97706" }}>
              {r.pct}
            </span>
            <span>{r.txt}</span>
          </div>
        ))}
      </div>

      {/* Recapitulatif */}
      <div className="bg-gray-50 rounded-lg p-3.5 mt-5 mb-4 text-xs text-gray-600 leading-relaxed">
        <strong className="text-gray-900">Nom complet :</strong> {nomComplet} &nbsp;·&nbsp;
        <strong className="text-gray-900">Departement :</strong> {dept}<br />
        <strong className="text-gray-900">Consentement telephone :</strong>{" "}
        <span className="text-success-700 font-semibold">✓ Enregistre le {dateStr}</span>
      </div>

      <div className="bg-brand-50 rounded-lg p-3.5 text-xs text-brand-700 leading-relaxed border border-brand-200">
        📞 Un conseiller local vous rappellera sous <strong>24h</strong> depuis un numero
        commencant par <strong>07 ou 09</strong>.
      </div>
    </div>
  );
}

// ============================================================
// Sub-components
// ============================================================

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="text-xs font-semibold text-gray-900 uppercase tracking-wider mt-6 mb-3 pb-1.5 border-b border-gray-200">
      {children}
    </h3>
  );
}

interface AideRowProps {
  iconBg: string;
  icon: string;
  name: string;
  desc: string;
  tag: string;
  tagColor: "brand" | "warning" | "success" | "gray";
  amount: string;
}

function AideRow({ iconBg, icon, name, desc, tag, tagColor, amount }: AideRowProps) {
  const tagClasses = {
    brand:   "bg-brand-100 text-brand-700",
    warning: "bg-warning-50 text-warning-700",
    success: "bg-success-50 text-success-700",
    gray:    "bg-gray-100 text-gray-600",
  }[tagColor];

  return (
    <div className="bg-gray-50 rounded-lg p-3.5 border border-gray-200 flex items-start gap-3">
      <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-xl flex-shrink-0 ${iconBg}`}>
        {icon}
      </div>
      <div className="flex-1">
        <div className="text-sm font-semibold text-gray-900 mb-1">{name}</div>
        <div className="text-xs text-gray-600 leading-snug mb-1.5">{desc}</div>
        <span className={`inline-block text-[11px] font-medium px-2 py-0.5 rounded ${tagClasses}`}>
          {tag}
        </span>
      </div>
      <div className="text-lg font-bold text-gray-900 whitespace-nowrap text-right leading-tight">
        {amount}
      </div>
    </div>
  );
}

interface FinanceRowProps {
  label: string;
  value: string;
  highlight?: boolean;
  total?: boolean;
}

function FinanceRow({ label, value, highlight, total }: FinanceRowProps) {
  return (
    <div className={`flex justify-between items-center py-1.5 text-sm ${total ? "font-semibold text-base" : ""}`}>
      <span className={highlight ? "text-success-700" : "text-gray-600"}>{label}</span>
      <span className={`font-semibold ${highlight ? "text-success-700" : "text-gray-900"}`}>
        {value}
      </span>
    </div>
  );
}
