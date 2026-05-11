"use client";

import React, { useState } from "react";
import { submitLead } from "@/lib/actions";
import { calculerAides } from "@/lib/calculs";
import type { SimulateurData, Resultat, Proprio, Annee, Chauffage, Foyer, Probleme, FormData } from "@/types/simulateur";

// Sub-components
import ProgressBar from "@/components/ui/ProgressBar";
import IntroSlide from "./IntroSlide";
import Question1Proprio from "./Question1Proprio";
import Question2Annee from "./Question2Annee";
import Question3Dept from "./Question3Dept";
import Question4Chauf from "./Question4Chauf";
import Question5Revenus from "./Question5Revenus";
import Question6Probleme from "./Question6Probleme";
import FormulaireContact from "./FormulaireContact";
import ResultatStandard from "./ResultatStandard";
import ResultatPremium from "./ResultatPremium";
import ResultatDisqualifie from "./ResultatDisqualifie";

type Step = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | "disq";

export default function Simulateur() {
  const [step, setStep] = useState<Step>(0);
  const [loading, setLoading] = useState(false);
  const [resultat, setResultat] = useState<Resultat | null>(null);
  const [nomComplet, setNomComplet] = useState("");

  const [data, setData] = useState<SimulateurData>({
    proprio: "",
    annee: "",
    dept: "75",
    chauf: "",
    rev: 25000,
    foyer: "seul",
    pb: "",
  });

  const [contactData, setContactData] = useState<FormData>({
    nom_complet: "",
    ville: "",
    telephone: "",
    consent1: false,
    consent2: false,
  });

  const next = () => setStep((s) => (typeof s === "number" ? (s + 1) as Step : s));
  const back = () => setStep((s) => (typeof s === "number" ? (s - 1) as Step : s));

  const updateData = (updates: Partial<SimulateurData>) => {
    setData((prev) => ({ ...prev, ...updates }));
  };

  const handleFinish = async () => {
    setLoading(true);
    setNomComplet(contactData.nom_complet);
    
    // Disqualify if locataire
    if (data.proprio === "loc") {
      setStep("disq");
      setLoading(false);
      return;
    }

    // Calculate final results
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
    setContactData({ nom_complet: "", ville: "", telephone: "", consent1: false, consent2: false });
    setResultat(null);
    setNomComplet("");
  };

  return (
    <div className="max-w-xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
      {/* ProgressBar (only for questions) */}
      {typeof step === "number" && step > 0 && step < 8 && (
        <ProgressBar label={`Question ${step} sur 7`} percent={Math.round((step / 7) * 100)} />
      )}

      <div className="p-6 md:p-8 min-h-[420px] flex flex-col relative">
        {loading && (
          <div className="absolute inset-0 bg-white/80 backdrop-blur-sm z-50 flex items-center justify-center">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-brand-500"></div>
          </div>
        )}

        {step === 0 && <IntroSlide onStart={() => setStep(1)} />}

        {step === 1 && (
          <Question1Proprio
            value={data.proprio as Proprio}
            onChange={(val) => updateData({ proprio: val })}
            onNext={next}
          />
        )}

        {step === 2 && (
          <Question2Annee
            value={data.annee as Annee}
            onChange={(val) => updateData({ annee: val })}
            onNext={next}
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
            <ResultatPremium
              nomComplet={nomComplet}
              data={data}
              resultat={resultat}
            />
          ) : (
            <ResultatStandard
              nomComplet={nomComplet}
              data={data}
              resultat={resultat}
            />
          )
        )}

        {step === "disq" && <ResultatDisqualifie onRestart={restart} />}

        {/* Action for results footer */}
        {step === 8 && (
          <button 
            onClick={restart}
            className="mt-8 text-sm text-gray-400 hover:text-brand-500 underline mx-auto block"
          >
            Recommencer la simulation
          </button>
        )}
      </div>

      {/* FOOTER */}
      <div className="px-8 py-6 bg-gray-50 border-t border-gray-100 text-[10px] text-gray-400 text-center leading-relaxed">
        © 2026 Harmonie Patrimoine · Mentions légales · Protection des données (RGPD)
      </div>
    </div>
  );
}
