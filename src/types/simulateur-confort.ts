// ============================================================
// Types - Simulateur TEST DE CONFORT
// ============================================================

// Scores des 10 questions
export interface SimConfortScores {
  q1: number; q2: number; q3: number; q4: number; q5: number;
  q6: number; q7: number; q8: number; q9: number; q10: number;
}

export const EMPTY_SCORES: SimConfortScores = {
  q1: 0, q2: 0, q3: 0, q4: 0, q5: 0,
  q6: 0, q7: 0, q8: 0, q9: 0, q10: 0,
};

// Donnees du formulaire (un seul champ "nom_complet")
export interface FormConfortData {
  nom_complet: string;
  ville: string;
  telephone: string;
  consent1: boolean;
  consent2: boolean;
}

export const EMPTY_FORM_CONFORT: FormConfortData = {
  nom_complet: "",
  ville: "",
  telephone: "",
  consent1: false,
  consent2: false,
};

// Niveau de risque
export type NiveauRisque = "faible" | "modere" | "eleve";

// Score par axe
export interface AxeScore {
  nom: string;
  score: number;
  max: number;
  pct: number;
  niveau: "bon" | "attention" | "critique";
}

// Signal detecte
export interface Signal {
  type: "high" | "med" | "low";
  ico: string;
  nom: string;
  desc: string;
}

// Recommandation
export interface Reco {
  nom: string;
  desc: string;
}

// Resultat complet
export interface ResultatConfort {
  scoreTotal: number;
  scorePct: number;
  niveau: NiveauRisque;
  niveauLabel: string;
  titre: string;
  description: string;
  couleur: string;
  badgeClass: string;
  axes: {
    thermique: AxeScore;
    humidite: AxeScore;
    famille: AxeScore;
    sommeil: AxeScore;
  };
  signaux: Signal[];
  recommandations: Reco[];
}