"use client";

import { BtnNext, BtnBack } from "../ui/Buttons";
import type { FormData } from "../../types/simulateur";

interface FormulaireProps {
  data: FormData;
  onChange: (data: FormData) => void;
  onSubmit: () => void;
  onBack: () => void;
  loading?: boolean;
}

export default function FormulaireContact({
  data,
  onChange,
  onSubmit,
  onBack,
  loading,
}: FormulaireProps) {
  const isValid =
    data.nom_complet.trim().length > 0 &&
    data.ville.trim().length > 0 &&
    data.telephone.trim().length >= 10 &&
    data.consent1;

  const update = (key: keyof FormData, val: string | boolean) => {
    onChange({ ...data, [key]: val });
  };

  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-900 mb-1.5 leading-snug">
        Vos coordonnees pour recevoir le resultat
      </h2>
      <p className="text-sm text-gray-500 mb-6 leading-relaxed">
        Un conseiller local vous rappellera sous 24h avec votre resultat detaille.
      </p>

      {/* CHAMP 1 : Nom complet (UN SEUL champ) */}
      <Field
        label="Nom complet"
        placeholder="Jean Dupont"
        value={data.nom_complet}
        onChange={(v) => update("nom_complet", v)}
      />

      {/* CHAMP 2 : Ville */}
      <Field
        label="Ville"
        placeholder="Lyon, Bordeaux…"
        value={data.ville}
        onChange={(v) => update("ville", v)}
      />

      {/* CHAMP 3 : Telephone */}
      <Field
        label="Telephone"
        placeholder="06 12 34 56 78"
        type="tel"
        value={data.telephone}
        onChange={(v) => update("telephone", v)}
      />

      {/* Consentements (cases a cocher) */}
      <div className="bg-gray-50 rounded-lg p-3.5 mb-4">
        <ConsentItem
          checked={data.consent1}
          onToggle={() => update("consent1", !data.consent1)}
          tag="Obligatoire"
          tagColor="r"
        >
          J&apos;accepte d&apos;etre contacte(e) par telephone par un conseiller{" "}
          <strong className="text-gray-900">MaFranceLocale.fr</strong> pour organiser
          mon diagnostic gratuit.
        </ConsentItem>
        <ConsentItem
          checked={data.consent2}
          onToggle={() => update("consent2", !data.consent2)}
          tag="Optionnel"
          tagColor="o"
        >
          J&apos;accepte d&apos;etre mis(e) en relation avec des partenaires renovation
          de mon departement.
        </ConsentItem>
      </div>

      <p className="text-[11px] text-gray-400 leading-relaxed mb-4">
        En soumettant ce formulaire, vous acceptez notre{" "}
        <a href="#" className="text-brand-500 no-underline">politique de confidentialite</a>.
        Donnees conservees max. 3 ans — RGPD &amp; loi francaise du 1er juillet 2023.
      </p>

      <BtnNext onClick={onSubmit} disabled={!isValid || loading}>
        {loading ? "Envoi en cours..." : "🔒 Voir mes resultats"}
      </BtnNext>
      <BtnBack onClick={onBack} />
    </div>
  );
}

// ============================================================
// Sub-components
// ============================================================

interface FieldProps {
  label: string;
  placeholder: string;
  value: string;
  type?: string;
  onChange: (val: string) => void;
}

function Field({ label, placeholder, value, type = "text", onChange }: FieldProps) {
  return (
    <div className="mb-4">
      <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1.5">
        {label}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3.5 py-2.5 border-[1.5px] border-gray-200 rounded-lg text-sm text-gray-900 bg-white outline-none focus:border-brand-500 transition-colors"
      />
    </div>
  );
}

interface ConsentItemProps {
  checked: boolean;
  onToggle: () => void;
  tag: string;
  tagColor: "r" | "o";
  children: React.ReactNode;
}

function ConsentItem({ checked, onToggle, tag, tagColor, children }: ConsentItemProps) {
  const tagClasses = tagColor === "r"
    ? "bg-danger-50 text-danger-700"
    : "bg-success-50 text-success-700";

  return (
    <div className="flex gap-2.5 items-start mb-2.5 last:mb-0">
      <div
        onClick={onToggle}
        className={`
          w-[18px] h-[18px] rounded border-2 flex-shrink-0 cursor-pointer mt-0.5
          flex items-center justify-center transition-all
          ${checked
            ? "bg-brand-500 border-brand-500"
            : "bg-white border-gray-300"
          }
        `}
      >
        {checked && <span className="text-white text-[11px] font-bold">✓</span>}
      </div>
      <div className="text-xs text-gray-600 leading-relaxed">
        <span className={`inline-block text-[10px] font-bold px-1.5 py-0.5 rounded uppercase mr-1 ${tagClasses}`}>
          {tag}
        </span>
        {children}
      </div>
    </div>
  );
}
