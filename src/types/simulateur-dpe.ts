// ============================================================
// Types - Simulateur DPE (Diagnostic Performance Energetique)
// ============================================================

// Choix possibles pour chaque question
export type AnneeDpe = "av1948" | "1948-1975" | "1975-1990" | "1990-2000" | "2000-2012" | "ap2012" | "";
export type Isolation = "aucune" | "partielle" | "combles" | "bonne" | "";
export type Fenetres = "simple" | "dv_ancien" | "dv_recent" | "triple" | "";
export type Chauffage = "fioul" | "gaz_ancien" | "gaz_recente" | "pac" | "elec" | "";
export type ECS = "chaudiere" | "ballon_elec" | "thermodynamique" | "solaire" | "";
export type VMC = "aucune" | "vmc_simple" | "vmc_double" | "";

// Donnees du simulateur DPE
export interface SimDpeData {
  annee: AnneeDpe;
  surf: number;       // surface en m2
  isol: Isolation;
  fenetres: Fenetres;
  chauf: Chauffage;
  ecs: ECS;
  vmc: VMC;
}

export const EMPTY_SIM_DPE: SimDpeData = {
  annee: "",
  surf: 100,
  isol: "",
  fenetres: "",
  chauf: "",
  ecs: "",
  vmc: "",
};

// Lettre DPE
export type LettreDpe = "A" | "B" | "C" | "D" | "E" | "F" | "G";

// Action recommandee
export interface ActionDpe {
  nom: string;
  desc: string;
  gain: string;
}

// Resultat complet du simulateur DPE
export interface ResultatDpe {
  lettre: LettreDpe;
  couleur: string;
  titre: string;       // "Excellente performance"
  note: string;        // "Maison quasi-passive"
  kwhm2: string;       // "≤ 70" ou "111-180" etc

  // Valeur immobiliere
  valActuel: number;
  valApres: number;
  decotePct: number;       // ex: -0.19 pour -19%
  decoteLabel: string;     // ex: "Decote de 19%"

  // Factures
  facAvant: number;
  facApres: number;
  ecoAnnuelle: number;

  // Actions
  actions: ActionDpe[];

  // Aides
  aideMPR: string;     // ex: "7 000 — 11 000 €"
  aideCEE: string;
  aideTotal: string;
}