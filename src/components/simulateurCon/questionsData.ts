import type { ScaleOption } from "./QuestionConfort";

/**
 * NOTE: Les points sont necessaires pour le calcul du score final, 
 * mais ils sont masques pour l'utilisateur dans l'interface (ScaleChoice.tsx). 
 */

export interface QuestionData {
  axe: string;
  highlight: string;
  question: string;
  hint: string;
  options: ScaleOption[];
}

export const QUESTIONS_CONFORT: QuestionData[] = [
  {
    axe: "Axe 1 — Confort thermique",
    highlight: "trop froides",
    question: "L'hiver, certaines pieces de votre maison sont-elles {h} malgre le chauffage ?",
    hint: "Certaines zones restent inconfortables meme avec le chauffage allume.",
    options: [
      { icon: "check", main: "Non, tout est bien chauffe", sub: "Pas de probleme thermique", points: 0 },
      { icon: "thermometer", main: "Parfois une piece un peu fraiche", sub: "Inconfort occasionnel", points: 1 },
      { icon: "snowflake", main: "Oui, une piece regulierement froide", sub: "Probleme recurrent", points: 3 },
      { icon: "snowflake", main: "Plusieurs pieces vraiment froides", sub: "Isolation insuffisante", points: 5 },
    ],
  },
  {
    axe: "Axe 1 — Confort thermique",
    highlight: "piece condamnee",
    question: "Avez-vous une {h} que vous n'utilisez plus a cause du froid ou de l'humidite ?",
    hint: "Chambre, salon, bureau... des espaces que vous avez abandonnes.",
    options: [
      { icon: "check", main: "Non, j'utilise toutes mes pieces", sub: "Aucune piece abandonnee", points: 0 },
      { icon: "door", main: "Une piece moins utilisee", sub: "Usage reduit", points: 1 },
      { icon: "lock", main: "Une piece pratiquement condamnee", sub: "Espace inutilisable", points: 4 },
      { icon: "house", main: "Plusieurs pieces inutilisables", sub: "Fort impact sur le logement", points: 6 },
    ],
  },
  {
    axe: "Axe 2 — Humidite et air",
    highlight: "humidite ou condensation",
    question: "Constatez-vous de l'{h} sur vos murs, fenetres ou plafonds ?",
    hint: "Traces d'humidite, taches noires, moisissures apparentes...",
    options: [
      { icon: "check", main: "Jamais", sub: "Aucun probleme d'humidite", points: 0 },
      { icon: "droplet", main: "Rarement, seulement en hiver", sub: "Phenomene ponctuel", points: 2 },
      { icon: "cloud", main: "Regulierement sur certaines surfaces", sub: "Probleme recurrent", points: 4 },
      { icon: "alertTriangle", main: "Frequemment, moisissures visibles", sub: "Situation preoccupante", points: 7 },
    ],
  },
  {
    axe: "Axe 2 — Humidite et air",
    highlight: "confine ou charge",
    question: "L'air dans votre maison vous semble-t-il {h} ?",
    hint: "Odeurs persistantes, air lourd... la ventilation fonctionne-t-elle bien ?",
    options: [
      { icon: "check", main: "Non, l'air est frais et agreable", sub: "Bonne qualite d'air", points: 0 },
      { icon: "wind", main: "Un peu confine le matin", sub: "Ventilation insuffisante", points: 2 },
      { icon: "wind", main: "Souvent lourd, surtout en hiver", sub: "Probleme de VMC", points: 5 },
      { icon: "alertTriangle", main: "Vraiment etouffant, odeurs persistantes", sub: "Urgence ventilation", points: 8 },
    ],
  },
  {
    axe: "Axe 2 — Humidite et air",
    highlight: "problemes de sante",
    question: "Vous ou vos proches avez-vous des {h} lies au logement ?",
    hint: "Rhumes frequents, allergies, toux, irritations respiratoires...",
    options: [
      { icon: "check", main: "Non, aucun symptome", sub: "Bonne sante globale", points: 0 },
      { icon: "alertCircle", main: "De temps en temps", sub: "Symptomes occasionnels", points: 2 },
      { icon: "alertTriangle", main: "Regulierement, plusieurs personnes", sub: "Impact sante evident", points: 6 },
      { icon: "building", main: "Souvent, lien avec la maison etabli", sub: "Situation serieuse", points: 9 },
    ],
  },
  {
    axe: "Axe 3 — Vie familiale",
    highlight: "vie de famille",
    question: "Les problemes de votre maison impactent-ils votre {h} ?",
    hint: "Tensions, pieces evitees, ambiance degradee a cause du logement...",
    options: [
      { icon: "check", main: "Non, on s'adapte tres bien", sub: "Vie familiale sereine", points: 0 },
      { icon: "minus", main: "Parfois de petites tensions", sub: "Impact mineur", points: 2 },
      { icon: "alertCircle", main: "Regulierement, des habitudes ont change", sub: "Impact modere", points: 6 },
      { icon: "alertTriangle", main: "Oui fortement, conflits frequents", sub: "Impact severe", points: 9 },
    ],
  },
  {
    axe: "Axe 3 — Vie familiale",
    highlight: "honte ou gene",
    question: "Avez-vous {h} d'inviter des proches chez vous ?",
    hint: "Vous evitez d'inviter a cause de l'etat de votre maison ?",
    options: [
      { icon: "check", main: "Jamais, je recois avec plaisir", sub: "Pas de gene", points: 0 },
      { icon: "user", main: "Parfois un peu gene(e)", sub: "Gene legere", points: 2 },
      { icon: "user", main: "Souvent, je prefere eviter", sub: "Retrait social", points: 6 },
      { icon: "x", main: "Je n'invite plus personne", sub: "Isolement lie au logement", points: 9 },
    ],
  },
  {
    axe: "Axe 4 — Sommeil et bien-etre",
    highlight: "le froid ou l'humidite",
    question: "Votre sommeil est-il affecte par {h} dans votre chambre ?",
    hint: "Reveil nocturne a cause du froid, chambre trop humide...",
    options: [
      { icon: "check", main: "Non, je dors bien", sub: "Sommeil de qualite", points: 0 },
      { icon: "moon", main: "Parfois la nuit est un peu fraiche", sub: "Inconfort leger", points: 2 },
      { icon: "alertTriangle", main: "Regulierement difficile de dormir", sub: "Sommeil perturbe", points: 5 },
      { icon: "alertTriangle", main: "Souvent, le froid perturbe mes nuits", sub: "Impact severe sur le sommeil", points: 8 },
    ],
  },
  {
    axe: "Axe 1 — Confort thermique",
    highlight: "trop elevees",
    question: "Vos factures d'energie vous semblent-elles {h} au regard du confort ressenti ?",
    hint: "Vous chauffez beaucoup mais restez inconfortable ?",
    options: [
      { icon: "check", main: "Non, raisonnable pour le confort obtenu", sub: "Bon rapport qualite/prix", points: 0 },
      { icon: "euro", main: "Un peu elevees pour ce que j'ai", sub: "Rapport moyen", points: 2 },
      { icon: "alertCircle", main: "Trop elevees, rapport mauvais", sub: "Depenses excessives", points: 6 },
      { icon: "alertTriangle", main: "Tres elevees, je dois renoncer a chauffer", sub: "Precarite energetique", points: 9 },
    ],
  },
  {
    axe: "Axe 4 — Sommeil et bien-etre",
    highlight: "bien-etre",
    question: "Au global, votre maison vous apporte-t-elle du {h} au quotidien ?",
    hint: "Vous sentez-vous bien, au calme et a l'aise chez vous ?",
    options: [
      { icon: "check", main: "Oui, je me sens bien chez moi", sub: "Logement ressource", points: 0 },
      { icon: "user", main: "Globalement oui, avec quelques petits inconforts", sub: "Satisfaction partielle", points: 2 },
      { icon: "user", main: "Pas vraiment, je suis resigne(e)", sub: "Insatisfaction notable", points: 5 },
      { icon: "user", main: "Non, je me sens mal chez moi", sub: "Fort mal-etre", points: 9 },
    ],
  },
];
