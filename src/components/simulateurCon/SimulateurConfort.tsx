"use client";

import { useState } from "react";

import SimulateurLayout from "@/components/shared/SimulateurLayout";
import ProgressBar from "@/components/ui/ProgressBar";
import FormulaireContact, { FormData, EMPTY_FORM } from "@/components/shared/FormulaireContact";

import IntroConfort from "./IntroConfort";
import QuestionConfort from "./QuestionConfort";
import { QUESTIONS_CONFORT } from "./questionsData";
import ResultatConfortComp from "./ResultatConfortComp";

import { calculerConfort, getPrenom } from "@/lib/calculs-confort";

import { submitLead } from "@/lib/actions";

import type { SimConfortScores, ResultatConfort } from "@/types/simulateur-confort";
import { EMPTY_SCORES } from "@/types/simulateur-confort";

type Step = "intro" | "q" | "form" | "result";

const QUESTION_PROG = [10, 20, 30, 40, 50, 60, 70, 80, 87, 92];

export default function SimulateurConfort() {
  const [step, setStep] = useState<Step>("intro");
  const [currentQ, setCurrentQ] = useState(0);
  const [loading, setLoading] = useState(false);
  const [resultat, setResultat] = useState<ResultatConfort | null>(null);

  const [scores, setScores] = useState<SimConfortScores>(EMPTY_SCORES);
  const [form, setForm] = useState<FormData>(EMPTY_FORM);

  const [selectedQs, setSelectedQs] = useState<Set<number>>(new Set());

  const getQKey = (idx: number) => `q${idx + 1}` as keyof SimConfortScores;

  const updateScore = (idx: number, points: number) => {
    const key = getQKey(idx);
    setScores({ ...scores, [key]: points });
    setSelectedQs(new Set([...selectedQs, idx]));
  };

  const goNext = () => {
    if (currentQ < 9) {
      setCurrentQ(currentQ + 1);
    } else {
      setStep("form");
    }
  };

  const goBack = () => {
    if (step === "form") {
      setStep("q");
      setCurrentQ(9);
    } else if (step === "q") {
      if (currentQ > 0) setCurrentQ(currentQ - 1);
      else setStep("intro");
    }
  };

  const startSim = () => {
    setStep("q");
    setCurrentQ(0);
  };

  const submitForm = async (data: FormData) => {
    setLoading(true);
    try {
      const prenom = getPrenom(data.nom_complet);
      const res = calculerConfort(scores, prenom);
      setResultat(res);

      await submitLead({
        nom_complet: data.nom_complet,
        ville: data.ville,
        telephone: data.telephone,
        consentement_rgpd: data.consent1,
        resultat_simulation: {
          type: "confort",
          score_total: res.scoreTotal,
          niveau: res.niveauLabel,
          axes: res.axes,
          reponses: scores,
        },
        valeur_simulation: res.scoreTotal,
        slug_simulateur: "simulateur-confort",
      });

      setStep("result");
    } catch (err) {
      console.error("Erreur:", err);
      // Fallback: show results even if saving fails
      const prenom = getPrenom(data.nom_complet);
      const res = calculerConfort(scores, prenom);
      setResultat(res);
      setStep("result");
    } finally {
      setLoading(false);
    }
  };

  const showProgress = step !== "intro";
  const progLabel =
    step === "q"      ? `Question ${currentQ + 1} sur 10` :
    step === "form"   ? "Formulaire" :
    step === "result" ? "Resultat" : "";
  const progPct =
    step === "q"      ? QUESTION_PROG[currentQ] :
    step === "form"   ? 96 :
    step === "result" ? 100 : 0;

  return (
    <SimulateurLayout onBack={(step === "q" || step === "form") ? goBack : undefined}>
      {showProgress && <ProgressBar label={progLabel} percent={progPct} />}

      {loading && (
        <div className="absolute inset-0 bg-white/80 backdrop-blur-sm z-50 flex items-center justify-center rounded-2xl">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#2563EB]"></div>
        </div>
      )}

      {step === "intro" && <IntroConfort onStart={startSim} />}

      {step === "q" && (
        <QuestionConfort
          axe={QUESTIONS_CONFORT[currentQ].axe}
          highlight={QUESTIONS_CONFORT[currentQ].highlight}
          question={QUESTIONS_CONFORT[currentQ].question}
          hint={QUESTIONS_CONFORT[currentQ].hint}
          options={QUESTIONS_CONFORT[currentQ].options}
          value={scores[getQKey(currentQ)]}
          selected={selectedQs.has(currentQ)}
          onSelect={(pts) => updateScore(currentQ, pts)}
          onNext={goNext}
          onBack={currentQ > 0 ? goBack : undefined}
          nextLabel={currentQ === 9 ? "Voir le formulaire" : "Continuer"}
        />
      )}

      {step === "form" && (
        <FormulaireContact
          data={form}
          onChange={setForm}
          onSubmit={submitForm}
          onBack={() => setStep("q")}
          loading={loading}
          tag="Vos coordonnees"
          titre="Recevez votre score de confort"
          highlight="personnalise"
          description="Un conseiller analyse votre resultat et vous rappelle si votre maison necessite une attention particuliere."
          buttonText="Voir mon score"
        />
      )}

      {step === "result" && resultat && (
        <ResultatConfortComp nomComplet={form.nom_complet} resultat={resultat} />
      )}
    </SimulateurLayout>
  );
}
