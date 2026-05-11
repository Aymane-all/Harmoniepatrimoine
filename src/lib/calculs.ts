import type { SimulateurData, Resultat } from "@/types/simulateur";
import { IDF, AIDES_LOCALES } from "./constants";

// ============================================================
// Calcul des aides selon le profil du visiteur
// ============================================================
// Logique extraite du simulateur HTML original
// ============================================================

export function calculerAides(data: SimulateurData): Resultat {
  const isIDF = IDF.includes(data.dept);
  const facteurFoyer = data.foyer === "famille" ? 1.35 : 1;

  // Plafonds de revenus selon zone et composition du foyer
  const plafondTresModeste = Math.round((isIDF ? 23112 : 16904) * facteurFoyer);
  const plafondModeste     = Math.round((isIDF ? 30621 : 22397) * facteurFoyer);
  const plafondIntermed    = Math.round((isIDF ? 39179 : 28657) * facteurFoyer);

  let mpr = 0;
  let cee = 0;
  let categorie = "";
  let score = 0;
  let eligible = true;

  if (data.rev <= plafondTresModeste) {
    mpr = data.chauf === "fioul" ? 11000 : data.chauf === "gaz" ? 9000 : 7000;
    cee = data.chauf === "fioul" ? 4500  : data.chauf === "gaz" ? 3500 : 2500;
    categorie = "Tres modeste — aides maximales";
    score = 92;
  } else if (data.rev <= plafondModeste) {
    mpr = data.chauf === "fioul" ? 8000 : data.chauf === "gaz" ? 6500 : 5000;
    cee = data.chauf === "fioul" ? 3500 : data.chauf === "gaz" ? 2800 : 2000;
    categorie = "Modeste — aides prioritaires";
    score = 78;
  } else if (data.rev <= plafondIntermed) {
    mpr = data.chauf === "fioul" ? 5000 : data.chauf === "gaz" ? 4000 : 3000;
    cee = data.chauf === "fioul" ? 2500 : data.chauf === "gaz" ? 2000 : 1500;
    categorie = "Intermediaire — aides partielles";
    score = 55;
  } else {
    // Non eligible aux aides sous condition de revenus
    eligible = false;
    cee = data.chauf === "fioul" ? 1500 : data.chauf === "gaz" ? 1200 : 800;
    categorie = "Non eligible aux aides sous conditions";
    score = 30;
  }

  // Aide locale du departement
  const local = AIDES_LOCALES[data.dept] || 800;

  // Calcul financier
  const total = mpr + cee + local;
  const coutTravaux = total + 15000;
  const reste = coutTravaux - total;
  const ecoAnnuelle =
    data.chauf === "fioul" ? 1400 :
    data.chauf === "gaz"   ? 1100 :
    800;
  const roi = Math.round(reste / ecoAnnuelle);

  return {
    eligible,
    mpr,
    cee,
    local,
    total,
    categorie,
    score,
    coutTravaux,
    reste,
    ecoAnnuelle,
    roi,
  };
}

// ============================================================
// Helpers d'affichage
// ============================================================

export function formatEuro(n: number): string {
  return n.toLocaleString("fr-FR") + " €";
}

export function getCeeTag(chauf: string): string {
  const tags: Record<string, string> = {
    fioul: "Chaudiere fioul — prime maximale",
    gaz:   "Chaudiere gaz — prime elevee",
    elec:  "Chauffage electrique",
    autre: "Autre systeme",
  };
  return tags[chauf] || "";
}

export function getAnneeLabel(annee: string): string {
  const labels: Record<string, string> = {
    "av75":  "avant 1975",
    "75-90": "1975-1990",
    "90-10": "1990-2010",
  };
  return labels[annee] || "";
}

// Annee de construction approximative pour la base de donnees
export function getAnneeConstruction(annee: string): number | null {
  const annees: Record<string, number> = {
    "av75":  1970,
    "75-90": 1985,
    "90-10": 2000,
    "ap10":  2015,
  };
  return annees[annee] || null;
}

// Type de chauffage formate pour la base
export function getChauffageLabel(chauf: string): string {
  const labels: Record<string, string> = {
    fioul: "Fioul",
    gaz:   "Gaz",
    elec:  "Electrique",
    autre: "Bois / PAC / Autre",
  };
  return labels[chauf] || chauf;
}

// "Reveals" affiches dans le resultat standard
export function getReveals(annee: string): Array<{ pct: string; txt: string }> {
  const reveals: Record<string, Array<{ pct: string; txt: string }>> = {
    "av75": [
      { pct: "70%", txt: "des maisons d'avant 1975 ont une isolation insuffisante ou inexistante" },
      { pct: "30%", txt: "d'economies sur la facture de chauffage sont possibles apres travaux" },
      { pct: "85%", txt: "presentent des ponts thermiques responsables de 25% des pertes de chaleur" },
    ],
    "75-90": [
      { pct: "65%", txt: "des maisons construites entre 1975 et 1990 ont une VMC defaillante" },
      { pct: "25%", txt: "d'economies possibles sur la facture energetique annuelle" },
      { pct: "60%", txt: "presentent une isolation des combles insuffisante" },
    ],
    "90-10": [
      { pct: "45%", txt: "des maisons de 1990-2010 ont un chauffage devenu inefficace" },
      { pct: "20%", txt: "d'economies possibles grace a une pompe a chaleur" },
      { pct: "55%", txt: "presentent des infiltrations d'air au niveau des menuiseries" },
    ],
  };
  return reveals[annee] || reveals["75-90"];
}
