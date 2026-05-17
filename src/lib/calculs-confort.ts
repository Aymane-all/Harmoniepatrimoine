import type {
  SimConfortScores, ResultatConfort, Signal, Reco, AxeScore, NiveauRisque,
} from "@/types/simulateur-confort";

// Score total max theorique : 86 pts. On plafonne a 80 pour le calcul du pourcentage.
const MAX_SCORE = 80;

export function calculerConfort(scores: SimConfortScores, prenom: string): ResultatConfort {
  const scoreTotal = Object.values(scores).reduce((a, b) => a + b, 0);
  const scorePct = Math.min(Math.round((scoreTotal / MAX_SCORE) * 100), 100);

  const niveauInfo = getNiveauRisque(scorePct, prenom);

  const axes = {
    thermique: makeAxe("Confort thermique", scores.q1 + scores.q2 + scores.q9, 20),
    humidite:  makeAxe("Humidite et air", scores.q3 + scores.q4 + scores.q5 + scores.q8, 36),
    famille:   makeAxe("Vie familiale", scores.q6 + scores.q7, 20),
    sommeil:   makeAxe("Sommeil et bien-etre", scores.q8 + scores.q10, 18),
  };

  return {
    scoreTotal,
    scorePct,
    ...niveauInfo,
    axes,
    signaux: detecterSignaux(scores),
    recommandations: genererRecos(scores),
  };
}

function getNiveauRisque(pct: number, prenom: string) {
  if (pct <= 25) return {
    niveau: "faible" as NiveauRisque,
    niveauLabel: "Risque faible",
    titre: "Votre maison est globalement confortable",
    description: `Bonjour ${prenom}, votre maison presente peu de signaux preoccupants. Quelques points d'attention meritent toutefois un regard professionnel.`,
    couleur: "#22C55E",
    badgeClass: "bg-green-50 text-green-700",
  };
  if (pct <= 55) return {
    niveau: "modere" as NiveauRisque,
    niveauLabel: "Risque modere",
    titre: "Votre maison envoie des signaux a ne pas ignorer",
    description: `Bonjour ${prenom}, plusieurs aspects de votre confort meritent attention. Un diagnostic gratuit permettrait d'identifier les causes exactes et les solutions adaptees.`,
    couleur: "#F59E0B",
    badgeClass: "bg-yellow-50 text-yellow-700",
  };
  return {
    niveau: "eleve" as NiveauRisque,
    niveauLabel: "Risque eleve",
    titre: "Votre maison affecte significativement votre qualite de vie",
    description: `Bonjour ${prenom}, votre score revele des signaux importants. Votre maison impacte votre confort, votre sante et votre vie familiale. Un diagnostic gratuit est fortement recommande.`,
    couleur: "#EF4444",
    badgeClass: "bg-red-50 text-red-700",
  };
}

function makeAxe(nom: string, score: number, max: number): AxeScore {
  const pct = Math.min(Math.round((score / max) * 100), 100);
  let niveau: AxeScore["niveau"];
  if (pct <= 25) niveau = "bon";
  else if (pct <= 55) niveau = "attention";
  else niveau = "critique";
  return { nom, score, max, pct, niveau };
}

function detecterSignaux(s: SimConfortScores): Signal[] {
  const signaux: Signal[] = [];

  if (s.q1 >= 3) signaux.push({ type: "high", ico: "snowflake", nom: "Isolation thermique insuffisante",
    desc: "Votre maison perd de la chaleur malgre le chauffage." });
  if (s.q2 >= 4) signaux.push({ type: "high", ico: "door", nom: "Pieces partiellement inutilisables",
    desc: "Des espaces sont condamnes par le froid." });
  if (s.q3 >= 4) signaux.push({ type: "high", ico: "droplet", nom: "Humidite et condensation detectees",
    desc: "Probleme de ventilation ou infiltration a traiter." });
  if (s.q4 >= 5) signaux.push({ type: "high", ico: "wind", nom: "Qualite de l'air degradee",
    desc: "VMC defaillante ou sources d'humidite cachees." });
  if (s.q5 >= 6) signaux.push({ type: "high", ico: "alertTriangle", nom: "Impact sur la sante du foyer",
    desc: "Symptomes respiratoires lies au logement." });
  if (s.q6 >= 6) signaux.push({ type: "med", ico: "family", nom: "Vie familiale affectee",
    desc: "La maison eloigne progressivement la famille." });
  if (s.q7 >= 6) signaux.push({ type: "med", ico: "user", nom: "Difficultes a recevoir dignement",
    desc: "La honte freine les relations sociales." });
  if (s.q9 >= 6) signaux.push({ type: "med", ico: "euro", nom: "Depenses energetiques excessives",
    desc: "Vous payez trop pour un confort insuffisant." });
  if (s.q8 >= 5) signaux.push({ type: "med", ico: "moon", nom: "Qualite du sommeil impactee",
    desc: "Les problemes perturbent vos nuits." });

  if (signaux.length === 0) {
    signaux.push({ type: "low", ico: "check", nom: "Aucun signal critique detecte",
      desc: "Votre maison presente un bon niveau de confort global." });
  }

  return signaux.slice(0, 5);
}

function genererRecos(s: SimConfortScores): Reco[] {
  const recos: Reco[] = [];
  if (s.q3 >= 4 || s.q4 >= 5) recos.push({
    nom: "Diagnostic humidite et ventilation",
    desc: "Identifier la source des problemes d'air et d'humidite.",
  });
  if (s.q1 >= 3 || s.q2 >= 4) recos.push({
    nom: "Bilan isolation thermique",
    desc: "Evaluer l'isolation des murs, combles et planchers.",
  });
  if (s.q9 >= 6) recos.push({
    nom: "Audit energetique complet",
    desc: "Calculer vos pertes et identifier les travaux a meilleur ROI.",
  });
  if (s.q6 >= 6 || s.q7 >= 6) recos.push({
    nom: "Plan renovation confort et famille",
    desc: "Retrouver une maison ou vos proches ont envie de venir.",
  });
  recos.push({
    nom: "Simulation des aides disponibles",
    desc: "Calculer MaPrimeRenov', CEE et aides locales.",
  });
  return recos.slice(0, 4);
}

// Extraire le prenom du nom complet
export function getPrenom(nomComplet: string): string {
  return (nomComplet || "").trim().split(/\s+/)[0] || "";
}