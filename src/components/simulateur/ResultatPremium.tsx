"use client";

import type { Resultat, SimulateurData } from "@/types/simulateur";
import { formatEuro, getCeeTag } from "@/lib/calculs";
import { DEPTS } from "@/lib/constants";

interface ResultatPremiumProps {
  nomComplet: string;
  data: SimulateurData;
  resultat: Resultat;
}

// Extraire le prenom (= premier mot du nom complet) pour le salut
function getPrenom(nomComplet: string): string {
  return nomComplet.trim().split(/\s+/)[0] || "";
}

export default function ResultatPremium({ nomComplet, data, resultat }: ResultatPremiumProps) {
  const prenom = getPrenom(nomComplet);
  const dept = DEPTS[data.dept] || `Departement ${data.dept}`;
  const ceeTag = getCeeTag(data.chauf);
  const tva = Math.round(resultat.coutTravaux * 0.145);
  const now = new Date();
  const dateStr = now.toLocaleDateString("fr-FR") +
    " a " + now.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" });

  return (
    <div>
      {/* En-tete */}
      <div className="mb-6">
        <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full mb-4 bg-warning-50 text-warning-700">
          ⭐ Eligible aux aides 2026
        </span>
        <h2 className="text-2xl font-semibold text-gray-900 mb-1.5">Votre simulation est prete</h2>
        <p className="text-sm text-gray-600 leading-relaxed">
          Bonjour <strong>{prenom}</strong>, voici votre rapport personnalise pour
          votre maison du departement <strong>{dept}</strong>.
        </p>
      </div>

      {/* Score */}
      <div className="flex items-center gap-4 bg-gray-50 rounded-xl p-4 mb-5 border border-gray-200">
        <div className="text-center flex-shrink-0">
          <div className="text-3xl font-bold text-brand-500 leading-none">{resultat.score}</div>
          <div className="text-[11px] text-gray-500 mt-0.5">Score d&apos;eligibilite</div>
        </div>
        <div className="flex-1">
          <div className="h-1.5 bg-gray-200 rounded-full mb-2">
            <div
              className="h-full bg-brand-500 rounded-full"
              style={{ width: `${resultat.score}%` }}
            />
          </div>
          <div className="text-xs text-gray-600 leading-relaxed">
            Votre profil correspond a <strong>la categorie &quot;{resultat.categorie}&quot;</strong>{" "}
            — le niveau d&apos;aides le plus eleve disponible.
          </div>
        </div>
      </div>

      {/* Total hero */}
      <div className="bg-gray-900 rounded-xl p-5 text-center mb-6">
        <div className="text-xs text-white/60 mb-1.5">💰 Total estime de vos aides</div>
        <div className="text-4xl font-bold text-yellow-300 leading-none mb-1.5">
          {formatEuro(resultat.total)}
        </div>
        <div className="text-xs text-white/50">
          Montant cumule de toutes les aides auxquelles vous avez droit
        </div>
      </div>

      {/* Detail des aides */}
      <SectionTitle>Detail de vos aides par dispositif</SectionTitle>
      <div className="flex flex-col gap-2 mb-5">
        <AideRow
          iconBg="bg-brand-100"
          icon="🏠"
          name="MaPrimeRenov'"
          desc="Aide de l'Etat versee par l'ANAH — calculee selon vos revenus et votre departement"
          tag="Sans avance de frais"
          tagColor="brand"
          amount={formatEuro(resultat.mpr)}
        />
        <AideRow
          iconBg="bg-warning-50"
          icon="⚡"
          name="Prime CEE"
          desc="Certificats d'Economies d'Energie — versee par les fournisseurs d'energie"
          tag={ceeTag}
          tagColor="warning"
          amount={formatEuro(resultat.cee)}
        />
        <AideRow
          iconBg="bg-success-50"
          icon="📍"
          name={`Aide locale — ${dept}`}
          desc="Aide specifique de votre collectivite locale — cumulable avec les aides nationales"
          tag="Cumulable avec MPR et CEE"
          tagColor="success"
          amount={formatEuro(resultat.local)}
        />
        <AideRow
          iconBg="bg-gray-100"
          icon="📉"
          name="TVA reduite a 5,5%"
          desc="Au lieu de 20% — s'applique sur l'ensemble des travaux de renovation energetique"
          tag="Appliquee automatiquement"
          tagColor="gray"
          amount={"~" + formatEuro(tva)}
        />
        <div className="rounded-lg p-3.5 border-[1.5px] border-brand-500 bg-gray-50 flex items-start gap-3">
          <div className="w-10 h-10 rounded-lg flex items-center justify-center text-xl flex-shrink-0 bg-brand-100">💳</div>
          <div className="flex-1">
            <div className="text-sm font-semibold text-gray-900 mb-1">Eco-PTZ (pret a taux zero)</div>
            <div className="text-xs text-gray-600 leading-snug mb-1.5">
              Financement complementaire jusqu&apos;a 50 000€ sans interets — cumulable avec MaPrimeRenov&apos;
            </div>
            <span className="inline-block text-[11px] font-medium px-2 py-0.5 rounded bg-brand-100 text-brand-700">
              Sous conditions — a verifier lors du diagnostic
            </span>
          </div>
          <div className="text-lg font-bold text-brand-500 text-right whitespace-nowrap leading-tight">
            Jusqu&apos;a<br />50 000€
          </div>
        </div>
      </div>

      {/* Simulation financiere */}
      <SectionTitle>Simulation financiere de vos travaux</SectionTitle>
      <div className="bg-gray-50 rounded-xl p-4 border border-gray-200 mb-5">
        <FinanceRow label="Cout estime des travaux (isolation + PAC)" value={"~" + formatEuro(resultat.coutTravaux)} />
        <FinanceRow label="— Aides deduites" value={"- " + formatEuro(resultat.total)} highlight />
        <div className="h-px bg-gray-200 my-1.5" />
        <FinanceRow label="Reste a charge estime" value={"~" + formatEuro(resultat.reste)} total />
        <FinanceRow label="Economies annuelles estimees" value={"~" + formatEuro(resultat.ecoAnnuelle) + "/an"} highlight />
        <FinanceRow label="Retour sur investissement" value={`~${resultat.roi} ans`} />
      </div>

      {/* Recapitulatif */}
      <div className="bg-gray-50 rounded-lg p-3.5 mt-5 mb-4 text-xs text-gray-600 leading-relaxed">
        <strong className="text-gray-900">Nom complet :</strong> {nomComplet} &nbsp;·&nbsp;
        <strong className="text-gray-900">Departement :</strong> {dept}<br />
        <strong className="text-gray-900">Categorie :</strong> {resultat.categorie}<br />
        <strong className="text-gray-900">Consentement telephone :</strong>{" "}
        <span className="text-success-700 font-semibold">✓ Enregistre le {dateStr}</span>
      </div>

      <div className="bg-brand-50 rounded-lg p-3.5 text-xs text-brand-700 leading-relaxed border border-brand-200">
        📞 Un conseiller local vous rappellera sous <strong>24h</strong> depuis un numero
        commencant par <strong>07 ou 09</strong> pour organiser votre diagnostic gratuit.
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
