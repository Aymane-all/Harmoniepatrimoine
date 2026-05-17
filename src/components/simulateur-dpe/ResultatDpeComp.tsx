"use client";

import type { ResultatDpe } from "@/types/simulateur-dpe";
import {
  formatEuro,
  DPE_LETTERS,
  DPE_BAR_WIDTHS,
  getDpeInfo,
  getPrenom,
} from "@/lib/calculs-dpe";

interface Props {
  nomComplet: string;
  resultat: ResultatDpe;
}

export default function ResultatDpeComp({ nomComplet, resultat }: Props) {
  const prenom = getPrenom(nomComplet);
  const now = new Date();
  const dateStr = now.toLocaleDateString("fr-FR") + " a " +
    now.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" });

  return (
    <div>
      {/* ── HERO : Lettre DPE + Titre ── */}
      <div
        className="flex items-center gap-5 p-5 rounded-xl mb-6"
        style={{ background: resultat.couleur + "22" }}
      >
        <div
          className="w-[90px] h-[90px] rounded-xl flex items-center justify-center text-5xl font-extrabold text-white flex-shrink-0 leading-none"
          style={{ background: resultat.couleur }}
        >
          {resultat.lettre}
        </div>
        <div className="flex-1">
          <div className="text-xl font-bold text-gray-900 mb-1">
            DPE estime : Classe {resultat.lettre} — {resultat.titre}
          </div>
          <div className="text-xs text-gray-600 leading-relaxed">
            {resultat.note} — {resultat.kwhm2} kWh/m²/an. {prenom}, voici votre rapport complet.
          </div>
        </div>
      </div>

      {/* ── ECHELLE DPE ── */}
      <SectionTitle>Echelle de performance energetique</SectionTitle>
      <div className="flex flex-col gap-1 mb-5">
        {DPE_LETTERS.map((l) => {
          const info = getDpeInfo(l);
          const isCurrent = l === resultat.lettre;
          return (
            <div key={l} className="flex items-center gap-2.5">
              <div
                className={`
                  w-6 h-6 rounded flex items-center justify-center text-xs font-bold text-white flex-shrink-0
                  ${isCurrent ? "ring-2 ring-gray-900 scale-110 transform" : ""}
                `}
                style={{ background: info.couleur }}
              >
                {l}
              </div>
              <div
                className={`
                  h-6 rounded flex items-center pl-2.5 text-[11px] text-white/90 font-medium
                  ${isCurrent ? "ring-2 ring-gray-900" : ""}
                `}
                style={{
                  width: `${DPE_BAR_WIDTHS[l]}%`,
                  background: info.couleur,
                }}
              >
                {info.kwhm2} kWh/m²
              </div>
              {isCurrent && (
                <span className="text-xs text-[#2563EB] font-semibold ml-auto">
                  ← Votre maison
                </span>
              )}
            </div>
          );
        })}
      </div>

      {/* ── VALEUR IMMOBILIERE ── */}
      <SectionTitle>Impact sur la valeur de votre bien</SectionTitle>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-3">
        <ImmoCard
          label="Valeur actuelle estimee"
          value={formatEuro(resultat.valActuel) + "*"}
          sub={resultat.decoteLabel}
          good={resultat.decotePct >= 0}
          bad={resultat.decotePct < 0}
        />
        <ImmoCard
          label="Valeur apres renovation"
          value={formatEuro(resultat.valApres) + "*"}
          sub="Apres passage en classe C — gain estime"
          good
        />
      </div>
      <div className="bg-[#FFF8E8] border border-[#FDE68A] rounded-xl px-3.5 py-3 text-xs text-[#92400E] mb-5">
        * Estimations indicatives basees sur une valeur moyenne nationale de 200 000€.
        Les valeurs reelles dependent de votre marche local. Un diagnostic professionnel
        permet une estimation precise.
      </div>

      {/* ── FACTURES AVANT/APRES ── */}
      <SectionTitle>Votre facture energetique annuelle estimee</SectionTitle>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-3">
        <FactureCard
          type="avant"
          label="Actuellement"
          value={formatEuro(resultat.facAvant) + "/an"}
          sub={`DPE ${resultat.lettre} — avant renovation`}
        />
        <FactureCard
          type="apres"
          label="Apres renovation"
          value={formatEuro(resultat.facApres) + "/an"}
          sub="DPE C estime — apres travaux"
        />
      </div>
      <div className="flex items-center justify-between px-3.5 py-3 rounded-xl mb-5"
        style={{ background: "#2563EB" }}>
        <span className="text-xs text-white/80">
          Economies annuelles estimees
        </span>
        <span className="text-xl font-bold text-white">
          {formatEuro(resultat.ecoAnnuelle)}/an
        </span>
      </div>

      {/* ── ACTIONS PRIORITAIRES ── */}
      <SectionTitle>Actions prioritaires pour ameliorer votre DPE</SectionTitle>
      <div className="flex flex-col gap-2 mb-5">
        {resultat.actions.map((a, i) => (
          <div key={i} className="flex items-start gap-2.5 p-3 px-3.5 bg-[#F0FDF4] rounded-xl border border-[#BBF7D0]">
            <div className="w-[22px] h-[22px] rounded-full bg-[#0F8C5A] text-white text-[11px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
              {i + 1}
            </div>
            <div className="flex-1">
              <div className="text-sm font-semibold text-gray-900 mb-0.5">
                {a.nom}
              </div>
              <div className="text-xs text-gray-600 leading-relaxed mb-1">
                {a.desc}
              </div>
              <div className="text-xs font-semibold text-[#065F46]">
                {a.gain}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ── AIDES ── */}
      <SectionTitle>Aides disponibles pour votre renovation</SectionTitle>
      <div className="flex flex-col gap-2 mb-3">
        <AideRow label="MaPrimeRenov'" amount={resultat.aideMPR} />
        <AideRow label="Prime CEE" amount={resultat.aideCEE} />
        <AideRow label="TVA reduite 5,5%" amount="Incluse sur travaux" />
        <AideRow label="Eco-PTZ" amount="Jusqu'a 50 000€" />
      </div>

      {/* Total */}
      <div className="flex items-center justify-between px-4 py-3.5 rounded-xl mb-5"
        style={{ background: "#2563EB" }}>
        <span className="text-xs text-white/80">Total aides estimees</span>
        <span className="text-xl font-bold text-white">{resultat.aideTotal}</span>
      </div>

      {/* ── DIAGNOSTIC GRATUIT ── */}
      <div className="bg-[#DBEAFE] border border-[#BFD9F8] rounded-xl p-4 mb-5">
        <div className="text-sm font-semibold text-[#1E40AF] mb-3">
          Ce que comprend votre diagnostic DPE gratuit
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#1E40AF] leading-relaxed">
          <div>• DPE officiel realise par expert</div>
          <div>• Analyse thermique complete</div>
          <div>• Detection humidite et ponts thermiques</div>
          <div>• Plan d&apos;aides personnalise</div>
          <div>• Devis travaux prioritaires</div>
          <div>• Accompagnement administratif</div>
        </div>
      </div>

      {/* ── RECAP ── */}
      <div className="bg-gray-50 rounded-xl p-3.5 mb-4 text-xs text-gray-600 leading-relaxed">
        <strong className="text-gray-900">Nom :</strong> {nomComplet}<br />
        <strong className="text-gray-900">DPE estime :</strong> Classe {resultat.lettre} — {resultat.titre}<br />
        <strong className="text-gray-900">Consentement :</strong>{" "}
        <span className="text-green-700 font-semibold">✓ Enregistre le {dateStr}</span>
      </div>

      <div className="bg-[#F0F5FF] rounded-xl p-3.5 text-xs text-[#1E3A5F] leading-relaxed border border-[#BFD9F8]">
        Un conseiller local vous rappellera sous <strong>24h</strong> depuis un numero
        commencant par <strong>07 ou 09</strong> pour organiser votre diagnostic DPE
        gratuit et complet.
      </div>
    </div>
  );
}

// ============================================================
// Sous-composants
// ============================================================

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider mt-5 mb-3 pb-1.5 border-b border-gray-200">
      {children}
    </h3>
  );
}

function ImmoCard({ label, value, sub, good, bad }: {
  label: string; value: string; sub: string; good?: boolean; bad?: boolean;
}) {
  const cls = good
    ? "border-[#BBF7D0] bg-[#F0FDF4]"
    : bad
    ? "border-[#FECACA] bg-[#FEF2F2]"
    : "border-gray-200 bg-gray-50";
  return (
    <div className={`border rounded-xl p-3.5 ${cls}`}>
      <div className="text-[11px] text-gray-500 uppercase tracking-wider mb-1.5">
        {label}
      </div>
      <div className="text-xl font-bold text-gray-900 mb-1">{value}</div>
      <div className="text-xs text-gray-600 leading-relaxed">{sub}</div>
    </div>
  );
}

function FactureCard({ type, label, value, sub }: {
  type: "avant" | "apres"; label: string; value: string; sub: string;
}) {
  const cls = type === "avant"
    ? "border-[#FECACA] bg-[#FEF2F2]"
    : "border-[#BBF7D0] bg-[#F0FDF4]";
  const lblColor = type === "avant" ? "text-[#991B1B]" : "text-[#065F46]";
  const valColor = type === "avant" ? "text-[#991B1B]" : "text-[#065F46]";
  return (
    <div className={`border rounded-xl p-3.5 ${cls}`}>
      <div className={`text-[11px] font-semibold uppercase tracking-wider mb-1.5 ${lblColor}`}>
        {label}
      </div>
      <div className={`text-xl font-bold mb-1 ${valColor}`}>{value}</div>
      <div className="text-xs text-gray-500 leading-relaxed">{sub}</div>
    </div>
  );
}

function AideRow({ label, amount }: { label: string; amount: string }) {
  return (
    <div className="flex items-center justify-between px-3.5 py-2.5 bg-gray-50 rounded-xl border border-gray-200">
      <span className="text-sm text-gray-600">{label}</span>
      <span className="text-sm font-semibold text-gray-900">{amount}</span>
    </div>
  );
}