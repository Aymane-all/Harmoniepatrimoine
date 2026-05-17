import type { IconDpeName } from "./IconsDpe";

// ============================================================
// CONFIGURATION DES QUESTIONS DU SIMULATEUR DPE
// ============================================================

export interface ChoiceItem {
  icon: IconDpeName;
  value: string;
  title: string;
  subtitle?: string;
}

export interface QuestionDpeConfig {
  tag: string;            // Categorie en haut
  highlight: string;       // Mot en bleu dans le titre
  question: string;        // Avec {h} comme placeholder
  hint: string;
  choices: ChoiceItem[];
  /** layout en 2 colonnes ? */
  cols?: 1 | 2;
  /** Afficher le dot radio a droite ? */
  showDot?: boolean;
}

// ─── Q1 : Annee de construction ───
export const Q1_ANNEE: QuestionDpeConfig = {
  tag: "Caracteristiques du bati",
  highlight: "construite",
  question: "Quand votre maison a-t-elle ete {h} ?",
  hint: "L'annee de construction est le facteur le plus determinant pour estimer le DPE.",
  choices: [
    { icon: "historical",   value: "av1948",     title: "Avant 1948",      subtitle: "Maconnerie traditionnelle — souvent sans isolation" },
    { icon: "bricks",       value: "1948-1975",  title: "1948 — 1975",     subtitle: "Avant le premier choc petrolier — peu isole" },
    { icon: "house",        value: "1975-1990",  title: "1975 — 1990",     subtitle: "Premieres reglementations thermiques RT 1974" },
    { icon: "houseModern",  value: "1990-2000",  title: "1990 — 2000",     subtitle: "RT 1988 — isolation amelioree" },
    { icon: "buildings",    value: "2000-2012",  title: "2000 — 2012",     subtitle: "RT 2000/RT 2005 — bonne isolation" },
    { icon: "sparkles",     value: "ap2012",     title: "Apres 2012",      subtitle: "RT 2012 — haute performance energetique" },
  ],
  showDot: true,
};

// ─── Q3 : Isolation ───
export const Q3_ISOLATION: QuestionDpeConfig = {
  tag: "Isolation thermique",
  highlight: "isolee",
  question: "Comment est {h} votre maison ?",
  hint: "Pensez aux murs, toiture, planchers et fenetres.",
  choices: [
    { icon: "snowflake",   value: "aucune",    title: "Pas d'isolation visible",   subtitle: "Murs froids, froid qui rentre partout" },
    { icon: "bricks",      value: "partielle", title: "Isolation partielle",        subtitle: "Quelques travaux faits mais incomplets" },
    { icon: "house",       value: "combles",   title: "Combles isoles uniquement",  subtitle: "Isolation en rouleau ou soufflee dans les combles" },
    { icon: "checkCircle", value: "bonne",     title: "Bonne isolation generale",   subtitle: "Murs + combles + planchers traites" },
  ],
  showDot: true,
};

// ─── Q4 : Fenetres ───
export const Q4_FENETRES: QuestionDpeConfig = {
  tag: "Menuiseries",
  highlight: "fenetres",
  question: "Quel type de {h} avez-vous ?",
  hint: "Les fenetres representent 10 a 15% des pertes de chaleur d'une maison.",
  choices: [
    { icon: "window",   value: "simple",    title: "Simple vitrage",                       subtitle: "Buee, courants d'air, froid au toucher" },
    { icon: "window",   value: "dv_ancien", title: "Double vitrage ancien (avant 2000)",   subtitle: "Bonne isolation mais vieillissant" },
    { icon: "sparkles", value: "dv_recent", title: "Double vitrage recent (apres 2000)",   subtitle: "Bonne performance thermique" },
    { icon: "trophy",   value: "triple",    title: "Triple vitrage",                        subtitle: "Performance maximale" },
  ],
  showDot: true,
};

// ─── Q5 : Chauffage ───
export const Q5_CHAUFFAGE: QuestionDpeConfig = {
  tag: "Systeme de chauffage",
  highlight: "chauffage",
  question: "Quel est votre systeme de {h} principal ?",
  hint: "Le type d'energie utilisee est un facteur cle du DPE.",
  choices: [
    { icon: "oilTank", value: "fioul",        title: "Chaudiere fioul",                              subtitle: "Energie fossile — impact DPE important" },
    { icon: "flame",   value: "gaz_ancien",   title: "Chaudiere gaz ancienne (avant 2000)",         subtitle: "Performance reduite avec le temps" },
    { icon: "bolt",    value: "gaz_recente",  title: "Chaudiere gaz a condensation (apres 2000)",   subtitle: "Bonne efficacite energetique" },
    { icon: "recycle", value: "pac",          title: "Pompe a chaleur",                              subtitle: "Meilleur rendement — bon pour le DPE" },
    { icon: "plug",    value: "elec",         title: "Chauffage electrique direct",                  subtitle: "Consommation elevee en kWh" },
  ],
  showDot: true,
};

// ─── Q6 : ECS (Eau chaude) ───
export const Q6_ECS: QuestionDpeConfig = {
  tag: "Eau chaude sanitaire",
  highlight: "eau chaude",
  question: "Comment produisez-vous votre {h} ?",
  hint: "L'eau chaude represente 10 a 20% de la consommation energetique d'une maison.",
  choices: [
    { icon: "flame",    value: "chaudiere",         title: "Chaudiere (meme que chauffage)" },
    { icon: "plug",     value: "ballon_elec",       title: "Ballon electrique" },
    { icon: "recycle",  value: "thermodynamique",   title: "Chauffe-eau thermodynamique" },
    { icon: "sun",      value: "solaire",           title: "Solaire thermique" },
  ],
  cols: 2,
};

// ─── Q7 : VMC ───
export const Q7_VMC: QuestionDpeConfig = {
  tag: "Ventilation",
  highlight: "ventilation",
  question: "Quelle est votre {h} actuelle ?",
  hint: "Une bonne ventilation ameliore la qualite de l'air et limite les problemes d'humidite.",
  choices: [
    { icon: "noAir",        value: "aucune",      title: "Pas de VMC — fenetres uniquement",  subtitle: "Air souvent lourd ou renferme" },
    { icon: "wind",         value: "vmc_simple",  title: "VMC simple flux",                    subtitle: "Extraction d'air en cuisine et salle de bain" },
    { icon: "circularFlow", value: "vmc_double",  title: "VMC double flux",                    subtitle: "Recuperation de chaleur — tres efficace" },
  ],
  showDot: true,
};