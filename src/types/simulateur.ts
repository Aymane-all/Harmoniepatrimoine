// ============================================================
// Types pour le simulateur d'aides
// ============================================================

export type Proprio = "maison" | "appart" | "loc" | "";
export type Annee = "av75" | "75-90" | "90-10" | "ap10" | "";
export type Chauffage = "fioul" | "gaz" | "elec" | "autre" | "";
export type Foyer = "seul" | "famille" | "";
export type Probleme = "froid" | "humidite" | "factures" | "droits" | "";

// Etat global du simulateur (toutes les reponses)
export interface SimulateurData {
  proprio: Proprio;
  annee: Annee;
  dept: string;          // code du departement (ex: "75")
  chauf: Chauffage;
  rev: number;           // revenu fiscal annuel
  foyer: Foyer;
  pb: Probleme;
}

// Donnees du formulaire de contact (3 champs visibles + 2 consentements)
export interface FormData {
  nom_complet: string;   // UN SEUL champ pour nom et prenom
  ville: string;
  telephone: string;
  consent1: boolean;     // obligatoire (RGPD)
  consent2: boolean;     // optionnel (partenaires)
}

// Resultat calcule
export interface Resultat {
  eligible: boolean;
  mpr: number;
  cee: number;
  local: number;
  total: number;
  categorie: string;
  score: number;
  coutTravaux: number;
  reste: number;
  ecoAnnuelle: number;
  roi: number;
}

// Donnees envoyees a Supabase pour creer un lead
export interface LeadInsert {
  nom_complet: string;
  telephone: string;
  ville: string;
  consentement_rgpd: boolean;
  type_logement: "maison" | "appartement" | "autre";
  type_chauffage: string;
  annee_construction: number | null;
  resultat_simulation: Record<string, unknown>;
  valeur_simulation: number;
  source_utm: string | null;
  campagne_utm: string | null;
}
