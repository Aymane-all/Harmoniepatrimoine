"use client";

import { useState } from "react";

// ============================================================
// FORMULAIRE DE CONTACT PARTAGE — 100% AUTONOME
// ============================================================
// Ce fichier contient TOUT ce qu'il faut :
// - Le type FormData
// - La valeur par defaut EMPTY_FORM
// - Les sous-composants (Field, ConsentItem, Boutons, Icones)
// - La logique de validation
//
// Utilise par TOUS les simulateurs (Aides, Confort, DPE, etc.)
// Aucun import externe necessaire — copiez ce fichier et c'est tout.
// ============================================================

// ───────────────────────────────────────────────────────────
// TYPES
// ───────────────────────────────────────────────────────────

export interface FormData {
  nom_complet: string;
  ville: string;
  telephone: string;
  consent1: boolean;
}

export const EMPTY_FORM: FormData = {
  nom_complet: "",
  ville: "",
  telephone: "",
  consent1: false,
};

interface FormulaireContactProps {
  /** Donnees du formulaire (controlees par le parent) — OPTIONNEL */
  data?: FormData;
  /** Callback quand le formulaire change — OPTIONNEL */
  onChange?: (data: FormData) => void;
  /** Callback quand le formulaire est soumis */
  onSubmit?: (data: FormData) => void;
  /** Callback retour (bouton "Retour") */
  onBack?: () => void;
  /** Etat de chargement */
  loading?: boolean;

  /* ─── Personnalisation par simulateur (optionnel) ─── */
  /** Tag categorie en haut */
  tag?: string;
  /** Titre principal */
  titre?: string;
  /** Mot en bleu dans le titre */
  highlight?: string;
  /** Description sous le titre */
  description?: string;
  /** Texte du bouton */
  buttonText?: string;
}

// ───────────────────────────────────────────────────────────
// COMPOSANT PRINCIPAL
// ───────────────────────────────────────────────────────────

export default function FormulaireContact({
  data,
  onChange,
  onSubmit,
  onBack,
  loading = false,
  tag = "Coordonnees",
  titre = "Vos coordonnees pour recevoir",
  highlight = "le resultat",
  description = "Un conseiller local vous rappellera sous 24h avec votre resultat detaille.",
  buttonText = "Voir mes resultats",
}: FormulaireContactProps) {
  // Mode "uncontrolled" : si le parent ne fournit pas data + onChange,
  // on gere le state localement pour eviter tout crash.
  const [internalData, setInternalData] = useState<FormData>(EMPTY_FORM);
  const formData: FormData = data ?? internalData;

  const setData = (newData: FormData) => {
    if (onChange) onChange(newData);
    else setInternalData(newData);
  };

  const update = (key: keyof FormData, val: string | boolean) => {
    setData({ ...formData, [key]: val });
  };

  // Validation
  const isValid =
    formData.nom_complet.trim().length > 0 &&
    formData.ville.trim().length > 0 &&
    formData.telephone.trim().length >= 10 &&
    formData.consent1;

  const handleSubmit = () => {
    if (onSubmit) onSubmit(formData);
  };

  const handleBack = () => {
    if (onBack) onBack();
  };

  return (
    <div>
      {/* ─── Tag categorie ─── */}
      <div className="inline-block mb-4">
        <span className="text-[11px] font-semibold text-[#1E40AF] bg-[#DBEAFE] px-3 py-1 rounded-md">
          {tag}
        </span>
      </div>

      {/* ─── Titre avec mot cle en bleu ─── */}
      <h2 className="text-xl md:text-2xl font-bold text-[#1E3A5F] leading-tight mb-2">
        {titre}{" "}
        <span className="text-[#2563EB]">{highlight}</span>
      </h2>

      {/* ─── Description ─── */}
      <p className="text-sm text-gray-500 mb-6 leading-relaxed">
        {description}
      </p>

      {/* ─── CHAMP 1 : Nom complet ─── */}
      <div className="mb-4">
        <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2">
          Nom complet
        </label>
        <input
          type="text"
          placeholder="Jean Dupont"
          value={formData.nom_complet}
          onChange={(e) => update("nom_complet", e.target.value)}
          className="w-full px-4 py-3 border-[1.5px] border-gray-200 rounded-xl text-sm text-gray-900 bg-white outline-none focus:border-[#2563EB] transition-colors"
        />
      </div>

      {/* ─── CHAMP 2 : Ville ─── */}
      <div className="mb-4">
        <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2">
          Ville
        </label>
        <input
          type="text"
          placeholder="Lyon, Bordeaux…"
          value={formData.ville}
          onChange={(e) => update("ville", e.target.value)}
          className="w-full px-4 py-3 border-[1.5px] border-gray-200 rounded-xl text-sm text-gray-900 bg-white outline-none focus:border-[#2563EB] transition-colors"
        />
      </div>

      {/* ─── CHAMP 3 : Telephone ─── */}
      <div className="mb-4">
        <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2">
          Telephone
        </label>
        <input
          type="tel"
          placeholder="06 12 34 56 78"
          value={formData.telephone}
          onChange={(e) => update("telephone", e.target.value)}
          className="w-full px-4 py-3 border-[1.5px] border-gray-200 rounded-xl text-sm text-gray-900 bg-white outline-none focus:border-[#2563EB] transition-colors"
        />
      </div>

      {/* ─── CONSENTEMENT RGPD ─── */}
      <div className="bg-gray-50 rounded-xl p-4 mb-4">
        <div className="flex gap-3 items-start">
          {/* Checkbox */}
          <button
            type="button"
            onClick={() => update("consent1", !formData.consent1)}
            className={`
              w-5 h-5 rounded border-2 flex-shrink-0 cursor-pointer mt-0.5
              flex items-center justify-center transition-all
              ${formData.consent1
                ? "bg-[#2563EB] border-[#2563EB]"
                : "bg-white border-gray-300 hover:border-[#2563EB]"
              }
            `}
            aria-checked={formData.consent1}
            role="checkbox"
          >
            {formData.consent1 && (
              <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                <path
                  d="M9 3L4.5 7.5L2 5"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
          </button>

          {/* Texte du consentement */}
          <div className="flex-1 text-xs text-gray-600 leading-relaxed">
            J&apos;accepte d&apos;etre contacte(e) par telephone par un conseiller{" "}
            <strong className="text-gray-900">MafranceLocale</strong> dans le
            cadre de mon projet de renovation, et de recevoir des offres et conseils.
            Mes donnees sont utilisees uniquement a cet effet et ne seront jamais
            revendues.
          </div>
        </div>
      </div>

      {/* ─── MENTION LEGALE ─── */}
      <p className="text-[11px] text-gray-400 leading-relaxed mb-4">
        En soumettant ce formulaire, vous acceptez notre{" "}
        <a href="#" className="text-[#2563EB] hover:underline">
          politique de confidentialite
        </a>
        . Donnees conservees max. 3 ans — RGPD &amp; loi francaise du 1er juillet 2023.
      </p>

      {/* ─── BOUTON DE SOUMISSION (noir) ─── */}
      <button
        type="button"
        onClick={handleSubmit}
        disabled={!isValid || loading}
        className={`
          w-full py-3.5 px-6 rounded-xl text-sm font-semibold transition-colors
          inline-flex items-center justify-center gap-2
          ${(!isValid || loading)
            ? "bg-gray-200 text-gray-400 cursor-not-allowed"
            : "bg-[#111827] hover:bg-[#1F2937] text-white cursor-pointer"
          }
        `}
      >
        {/* Icone cadenas (inline SVG) */}
        {!loading && (
          <svg
            width="14"
            height="14"
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="3" y="7" width="10" height="7" rx="1" />
            <path d="M5 7V5a3 3 0 0 1 6 0v2" />
          </svg>
        )}
        {loading ? "Envoi en cours..." : buttonText}
      </button>


    </div>
  );
}