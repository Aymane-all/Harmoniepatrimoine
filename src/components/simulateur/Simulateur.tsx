"use client";

import React, { useState } from "react";
import { submitLead } from "@/lib/actions";
import { calculerAides } from "@/lib/calculs";
import type { SimulateurData, Resultat, Proprio, Annee, Chauffage, Foyer, Probleme } from "@/types/simulateur";
import type { FormData } from "@/components/shared/FormulaireContact";
import { EMPTY_FORM } from "@/components/shared/FormulaireContact";

// 🆕 NOUVEAU : Import du Layout partagé
import SimulateurLayout from "@/components/shared/SimulateurLayout";

// Vos composants existants - AUCUN CHANGEMENT
import ProgressBar from "@/components/ui/ProgressBar";
import IntroSlide from "./IntroSlide";
import Question1Proprio from "./Question1Proprio";
import Question2Annee from "./Question2Annee";
import Question3Dept from "./Question3Dept";
import Question4Chauf from "./Question4Chauf";
import Question5Revenus from "./Question5Revenus";
import Question6Probleme from "./Question6Probleme";
import FormulaireContact from "../shared/FormulaireContact";
import ResultatStandard from "./ResultatStandard";
import ResultatPremium from "./ResultatPremium";
import ResultatDisqualifie from "./ResultatDisqualifie";

type Step = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | "disq";

export default function Simulateur() {
  // 🔒 TOUT LE STATE ET LA LOGIQUE RESTE EXACTEMENT PAREIL
  const [step, setStep] = useState<Step>(0);
  const [loading, setLoading] = useState(false);
  const [resultat, setResultat] = useState<Resultat | null>(null);
  const [nomComplet, setNomComplet] = useState("");

  const [data, setData] = useState<SimulateurData>({
    proprio: "", annee: "", dept: "75", chauf: "",
    rev: 25000, foyer: "seul", pb: "",
  });

  const [contactData, setContactData] = useState<FormData>(EMPTY_FORM);

  const next = () => setStep((s) => (typeof s === "number" ? (s + 1) as Step : s));
  const back = () => setStep((s) => (typeof s === "number" ? (s - 1) as Step : s));

  const updateData = (updates: Partial<SimulateurData>) => {
    setData((prev) => ({ ...prev, ...updates }));
  };

  const nextFromQ1 = () => {
    if (data.proprio === "loc" || data.proprio === "appart") {
      setStep("disq");
    } else {
      setStep(2);
    }
  };

  const nextFromQ2 = () => {
    if (data.annee === "ap10") {
      setStep("disq");
    } else {
      setStep(3);
    }
  };

  const handleFinish = async () => {
    setLoading(true);
    setNomComplet(contactData.nom_complet);

    const res = calculerAides(data);
    setResultat(res);

    try {
      await submitLead({
        ...contactData,
        consentement_rgpd: contactData.consent1,
        type_logement: data.proprio === "appart" ? "appartement" : data.proprio === "maison" ? "maison" : "autre",
        type_chauffage: data.chauf,
        annee_construction: data.annee === "av75" ? 1970 : data.annee === "75-90" ? 1985 : data.annee === "90-10" ? 2000 : 2015,
        resultat_simulation: res as any,
        valeur_simulation: res.total,
        slug_simulateur: "simulateur-aides",
        source_utm: null,
        campagne_utm: null,
      });
      setStep(8);
    } catch (error) {
      console.error(error);
      alert("Une erreur est survenue lors de l'envoi de votre dossier.");
    } finally {
      setLoading(false);
    }
  };

  const restart = () => {
    setStep(0);
    setData({ proprio: "", annee: "", dept: "75", chauf: "", rev: 25000, foyer: "seul", pb: "" });
    setContactData(EMPTY_FORM);
    setResultat(null);
    setNomComplet("");
  };

  // ⭐ SEUL LE RETURN CHANGE : on wrap avec SimulateurLayout
  return (
    <SimulateurLayout onBack={typeof step === "number" && step > 0 && step < 8 ? back : undefined}>
      {/* ProgressBar (only for questions) */}
      {typeof step === "number" && step > 0 && step < 8 && (
        <ProgressBar
          label={`Question ${step} sur 7`}
          percent={Math.round((step / 7) * 100)}
        />
      )}

      {/* Overlay de chargement */}
      {loading && (
        <div className="absolute inset-0 bg-white/80 backdrop-blur-sm z-50 flex items-center justify-center rounded-2xl">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-brand-500"></div>
        </div>
      )}

      {/* TOUS VOS COMPOSANTS SONT INCHANGÉS */}
      {step === 0 && <IntroSlide onStart={() => setStep(1)} />}

      {step === 1 && (
        <Question1Proprio
          value={data.proprio as Proprio}
          onChange={(val) => updateData({ proprio: val })}
          onNext={nextFromQ1}
        />
      )}

      {step === 2 && (
        <Question2Annee
          value={data.annee as Annee}
          onChange={(val) => updateData({ annee: val })}
          onNext={nextFromQ2}
          onBack={back}
        />
      )}

      {step === 3 && (
        <Question3Dept
          value={data.dept}
          onChange={(val) => updateData({ dept: val })}
          onNext={next}
          onBack={back}
        />
      )}

      {step === 4 && (
        <Question4Chauf
          value={data.chauf as Chauffage}
          onChange={(val) => updateData({ chauf: val })}
          onNext={next}
          onBack={back}
        />
      )}

      {step === 5 && (
        <Question5Revenus
          rev={data.rev}
          foyer={data.foyer as Foyer}
          onChangeRev={(val) => updateData({ rev: val })}
          onChangeFoyer={(val) => updateData({ foyer: val })}
          onNext={next}
          onBack={back}
        />
      )}

      {step === 6 && (
        <Question6Probleme
          value={data.pb as Probleme}
          onChange={(val) => updateData({ pb: val })}
          onNext={next}
          onBack={back}
        />
      )}

      {step === 7 && (
        <FormulaireContact
          data={contactData}
          onChange={setContactData}
          onSubmit={handleFinish}
          onBack={back}
          loading={loading}
        />
      )}

      {step === 8 && resultat && (
        resultat.eligible ? (
          <ResultatPremium nomComplet={nomComplet} data={data} resultat={resultat} />
        ) : (
          <ResultatStandard nomComplet={nomComplet} data={data} resultat={resultat} />
        )
      )}

      {step === "disq" && <ResultatDisqualifie onRestart={restart} />}

      {/* Bouton Recommencer (résultats) */}
      {step === 8 && (
        <button
          onClick={restart}
          className="mt-8 text-sm text-gray-400 hover:text-brand-500 underline mx-auto block"
        >
          Recommencer la simulation
        </button>
      )}
    </SimulateurLayout>
  );
}