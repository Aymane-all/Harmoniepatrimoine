"use client";

import { useState } from "react";

// LAYOUT PARTAGE (meme design que les autres sims)
import SimulateurLayout from "@/components/shared/SimulateurLayout";

// FORMULAIRE PARTAGE
import FormulaireContact, { EMPTY_FORM } from "@/components/shared/FormulaireContact";
import type { FormData } from "@/components/shared/FormulaireContact";

// UI
import ProgressBar from "@/components/ui/ProgressBar";

// Composants DPE
import IntroDpe from "./IntroDpe";
import QuestionDpe from "./QuestionDpe";
import Q2Surface from "./Q2Surface";
import ResultatDpeComp from "./ResultatDpeComp";

// Donnees des questions
import {
  Q1_ANNEE, Q3_ISOLATION, Q4_FENETRES,
  Q5_CHAUFFAGE, Q6_ECS, Q7_VMC,
} from "./questionsDpeData";

// Logique
import { calculerDpe } from "@/lib/calculs-dpe";

import { submitLead } from "@/lib/actions";

// Types
import type { SimDpeData, ResultatDpe } from "@/types/simulateur-dpe";
import { EMPTY_SIM_DPE } from "@/types/simulateur-dpe";

// ============================================================
// ETAPES : intro -> q1..q7 -> form -> result
// ============================================================
type Step = "intro" | 1 | 2 | 3 | 4 | 5 | 6 | 7 | "form" | "result";

const PROG_PCT: Record<number, number> = {
  1: 14, 2: 28, 3: 42, 4: 56, 5: 70, 6: 80, 7: 90,
};

export default function SimulateurDpe() {
  const [step, setStep] = useState<Step>("intro");
  const [loading, setLoading] = useState(false);
  const [resultat, setResultat] = useState<ResultatDpe | null>(null);

  const [data, setData] = useState<SimDpeData>(EMPTY_SIM_DPE);
  const [form, setForm] = useState<FormData>(EMPTY_FORM);

  const update = <K extends keyof SimDpeData>(key: K, val: SimDpeData[K]) => {
    setData({ ...data, [key]: val });
  };

  const goBack = () => {
    if (step === "form") {
      setStep(7);
    } else if (typeof step === "number") {
      if (step > 1) setStep((step - 1) as Step);
      else setStep("intro");
    }
  };

  const goTo = (s: Step) => setStep(s);

  const submitForm = async () => {
    setLoading(true);
    try {
      const res = calculerDpe(data);
      setResultat(res);

      await submitLead({
        nom_complet: form.nom_complet,
        ville: form.ville,
        telephone: form.telephone,
        consentement_rgpd: form.consent1,
        type_chauffage: data.chauf,
        annee_construction: data.annee === "av1948" ? 1930 : data.annee === "1948-1975" ? 1960 : data.annee === "1975-1990" ? 1985 : data.annee === "1990-2000" ? 1995 : data.annee === "2000-2012" ? 2005 : data.annee === "ap2012" ? 2015 : null,
        resultat_simulation: {
          type: "dpe",
          lettre: res.lettre,
          valeur_actuelle: res.valActuel,
          facture_actuelle: res.facAvant,
          economies_annuelles: res.ecoAnnuelle,
          reponses: data,
        },
        valeur_simulation: res.valActuel,
        slug_simulateur: "simulateur-dpe",
      });

      setStep("result");
    } catch (err) {
      console.error("Erreur:", err);
      setStep("result");
    } finally {
      setLoading(false);
    }
  };

  // Determiner les valeurs de la ProgressBar
  const showProgress = step !== "intro";
  const progLabel =
    typeof step === "number" ? `Question ${step} sur 7` :
    step === "form"          ? "Formulaire" :
    step === "result"        ? "Resultat" : "";
  const progPct =
    typeof step === "number" ? PROG_PCT[step] :
    step === "form"          ? 95 :
    step === "result"        ? 100 : 0;

  // Onglet actif (decoratif)
  const getActiveTab = (): "details" | "criteres" | "specifications" => {
    if (step === "intro") return "details";
    if (typeof step === "number" && step >= 1 && step <= 4) return "criteres";
    return "specifications";
  };

  return (
    <SimulateurLayout activeTab={getActiveTab()} onBack={(typeof step === "number" || step === "form") ? goBack : undefined}>
      {showProgress && <ProgressBar label={progLabel} percent={progPct} />}

      {/* Loading */}
      {loading && (
        <div className="absolute inset-0 bg-white/80 backdrop-blur-sm z-50 flex items-center justify-center rounded-2xl">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#2563EB]"></div>
        </div>
      )}

      {/* INTRO */}
      {step === "intro" && <IntroDpe onStart={() => goTo(1)} />}

      {/* Q1 — Annee */}
      {step === 1 && (
        <QuestionDpe
          config={Q1_ANNEE}
          value={data.annee}
          onChange={(v) => update("annee", v as SimDpeData["annee"])}
          onNext={() => goTo(2)}
        />
      )}

      {/* Q2 — Surface (slider special) */}
      {step === 2 && (
        <Q2Surface
          value={data.surf}
          onChange={(v) => update("surf", v)}
          onNext={() => goTo(3)}
          onBack={() => goTo(1)}
        />
      )}

      {/* Q3 — Isolation */}
      {step === 3 && (
        <QuestionDpe
          config={Q3_ISOLATION}
          value={data.isol}
          onChange={(v) => update("isol", v as SimDpeData["isol"])}
          onNext={() => goTo(4)}
          onBack={() => goTo(2)}
        />
      )}

      {/* Q4 — Fenetres */}
      {step === 4 && (
        <QuestionDpe
          config={Q4_FENETRES}
          value={data.fenetres}
          onChange={(v) => update("fenetres", v as SimDpeData["fenetres"])}
          onNext={() => goTo(5)}
          onBack={() => goTo(3)}
        />
      )}

      {/* Q5 — Chauffage */}
      {step === 5 && (
        <QuestionDpe
          config={Q5_CHAUFFAGE}
          value={data.chauf}
          onChange={(v) => update("chauf", v as SimDpeData["chauf"])}
          onNext={() => goTo(6)}
          onBack={() => goTo(4)}
        />
      )}

      {/* Q6 — ECS */}
      {step === 6 && (
        <QuestionDpe
          config={Q6_ECS}
          value={data.ecs}
          onChange={(v) => update("ecs", v as SimDpeData["ecs"])}
          onNext={() => goTo(7)}
          onBack={() => goTo(5)}
        />
      )}

      {/* Q7 — VMC */}
      {step === 7 && (
        <QuestionDpe
          config={Q7_VMC}
          value={data.vmc}
          onChange={(v) => update("vmc", v as SimDpeData["vmc"])}
          onNext={() => goTo("form")}
          onBack={() => goTo(6)}
          nextLabel="Voir le formulaire"
        />
      )}

      {/* FORMULAIRE (partage avec les autres simulateurs) */}
      {step === "form" && (
        <FormulaireContact
          data={form}
          onChange={setForm}
          onSubmit={submitForm}
          onBack={() => goTo(7)}
          loading={loading}
          highlight="votre estimation DPE"
          description="Un conseiller local vous rappellera avec votre estimation complete et les solutions pour ameliorer votre DPE."
          buttonText="Voir mon estimation DPE"
        />
      )}

      {/* RESULTAT */}
      {step === "result" && resultat && (
        <ResultatDpeComp nomComplet={form.nom_complet} resultat={resultat} />
      )}
    </SimulateurLayout>
  );
}