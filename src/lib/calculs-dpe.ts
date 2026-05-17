import type {
  SimDpeData, ResultatDpe, LettreDpe, ActionDpe,
} from "@/types/simulateur-dpe";

// ============================================================
// Configuration des classes DPE
// ============================================================

interface DpeInfo {
  couleur: string;
  titre: string;
  note: string;
  kwhm2: string;
  conso: number;       // kWh/m2/an pour calcul facture
  decote: number;      // % impact sur la valeur immobiliere
}

const DPE_INFO: Record<LettreDpe, DpeInfo> = {
  A: { couleur: "#1D6A26", titre: "Excellente performance", note: "Maison quasi-passive",                          kwhm2: "<= 70",     conso: 55,  decote: 0.06 },
  B: { couleur: "#4A9A32", titre: "Tres bonne performance",  note: "Maison bien isolee",                           kwhm2: "71-110",    conso: 90,  decote: 0.03 },
  C: { couleur: "#7AB82A", titre: "Bonne performance",       note: "Conforme aux normes recentes",                 kwhm2: "111-180",   conso: 145, decote: 0    },
  D: { couleur: "#D4C020", titre: "Performance moyenne",     note: "Des ameliorations possibles",                  kwhm2: "181-250",   conso: 215, decote: -0.02 },
  E: { couleur: "#E87820", titre: "Performance mediocre",    note: "Travaux recommandes",                          kwhm2: "251-330",   conso: 290, decote: -0.08 },
  F: { couleur: "#D04010", titre: "Mauvaise performance",    note: "Passoire thermique — travaux urgents",         kwhm2: "331-420",   conso: 375, decote: -0.14 },
  G: { couleur: "#A01010", titre: "Tres mauvaise performance", note: "Passoire thermique — obligation legale",     kwhm2: "> 420",     conso: 500, decote: -0.19 },
};

// ============================================================
// FONCTION PRINCIPALE : calcule le DPE complet
// ============================================================

export function calculerDpe(data: SimDpeData): ResultatDpe {
  // 1. Calculer la lettre DPE par systeme de points
  const lettre = estimerLettre(data);
  const info = DPE_INFO[lettre];

  // 2. Estimation de la valeur immobiliere
  const valMoyenne = 200000; // valeur moyenne nationale par defaut
  const valActuel = Math.round(valMoyenne * (1 + info.decote) / 1000) * 1000;
  const valApres = Math.round(valMoyenne * (1 + DPE_INFO.C.decote + 0.03) / 1000) * 1000;
  const decoteLabel =
    info.decote < 0
      ? `Decote de ${Math.abs(info.decote * 100).toFixed(0)}% — passoire thermique`
      : info.decote > 0
      ? `Plus-value de ${(info.decote * 100).toFixed(0)}%`
      : "Valeur de reference";

  // 3. Calcul facture energetique
  const kwhPrix = 0.25; // prix moyen en €/kWh
  const facAvant = Math.round(info.conso * data.surf * kwhPrix);
  const facApres = Math.round(DPE_INFO.C.conso * data.surf * kwhPrix);
  const ecoAnnuelle = facAvant - facApres;

  // 4. Actions prioritaires
  const actions = genererActions(data, lettre);

  // 5. Aides estimees
  const isPassoire = lettre === "F" || lettre === "G";
  const aideMPR = isPassoire ? "7 000 — 11 000 €" : "3 000 — 5 000 €";
  const aideCEE =
    data.chauf === "fioul"      ? "2 500 — 4 500 €" :
    data.chauf.includes("gaz")  ? "2 000 — 3 500 €" : "1 500 — 2 500 €";
  const aideTotal = isPassoire ? "12 000 — 18 000 €" : "6 000 — 10 000 €";

  return {
    lettre,
    couleur: info.couleur,
    titre: info.titre,
    note: info.note,
    kwhm2: info.kwhm2,
    valActuel,
    valApres,
    decotePct: info.decote,
    decoteLabel,
    facAvant,
    facApres,
    ecoAnnuelle,
    actions,
    aideMPR,
    aideCEE,
    aideTotal,
  };
}

// ============================================================
// Estimation de la lettre DPE par systeme de points
// ============================================================

function estimerLettre(d: SimDpeData): LettreDpe {
  let pts = 0;

  // Annee de construction (0=meilleur, 6=pire)
  const anneeScore: Record<string, number> = {
    "av1948": 6, "1948-1975": 5, "1975-1990": 4,
    "1990-2000": 3, "2000-2012": 2, "ap2012": 0,
  };
  pts += anneeScore[d.annee] ?? 4;

  // Isolation
  const isolScore: Record<string, number> = {
    aucune: 4, partielle: 2, combles: 1, bonne: 0,
  };
  pts += isolScore[d.isol] ?? 2;

  // Fenetres
  const fenScore: Record<string, number> = {
    simple: 3, dv_ancien: 1, dv_recent: 0, triple: 0,
  };
  pts += fenScore[d.fenetres] ?? 1;

  // Chauffage
  const chaufScore: Record<string, number> = {
    fioul: 3, gaz_ancien: 3, gaz_recente: 1, pac: 0, elec: 2,
  };
  pts += chaufScore[d.chauf] ?? 2;

  // Eau chaude sanitaire (ECS)
  const ecsScore: Record<string, number> = {
    chaudiere: 1, ballon_elec: 2, thermodynamique: 0, solaire: 0,
  };
  pts += ecsScore[d.ecs] ?? 1;

  // VMC
  const vmcScore: Record<string, number> = {
    aucune: 2, vmc_simple: 1, vmc_double: 0,
  };
  pts += vmcScore[d.vmc] ?? 1;

  // Mapping points -> lettre DPE
  if (pts <= 2)  return "B";
  if (pts <= 5)  return "C";
  if (pts <= 9)  return "D";
  if (pts <= 13) return "E";
  if (pts <= 17) return "F";
  return "G";
}

// ============================================================
// Generation des actions prioritaires adaptees
// ============================================================

function genererActions(d: SimDpeData, _lettre: LettreDpe): ActionDpe[] {
  const actions: ActionDpe[] = [];

  if (d.isol === "aucune" || d.isol === "partielle") {
    actions.push({
      nom: "Isolation des combles et des murs",
      desc: "Premiere action a realiser — jusqu'a 30% d'economies sur la facture.",
      gain: "Gain DPE : +1 a +2 lettres",
    });
  }

  if (d.fenetres === "simple") {
    actions.push({
      nom: "Remplacement des fenetres en simple vitrage",
      desc: "Eliminer les ponts thermiques aux fenetres — confort immediat.",
      gain: "Gain DPE : +0,5 a +1 lettre",
    });
  }

  if (d.chauf === "fioul" || d.chauf === "gaz_ancien") {
    actions.push({
      nom: "Remplacement de la chaudiere par une PAC",
      desc: "Pompe a chaleur air/eau — meilleur rapport energie/cout.",
      gain: "Gain DPE : +1 a +2 lettres",
    });
  }

  if (d.vmc === "aucune") {
    actions.push({
      nom: "Installation d'une VMC",
      desc: "Ameliorer la qualite de l'air et reduire l'humidite.",
      gain: "Gain DPE : +0,5 lettre",
    });
  }

  // Si aucune action urgente
  if (actions.length === 0) {
    actions.push({
      nom: "Entretien et optimisation du systeme existant",
      desc: "Votre maison est deja bien isolee — maintenez ce niveau.",
      gain: "Maintien classe actuelle",
    });
  }

  return actions;
}

// ============================================================
// HELPERS
// ============================================================

export function formatEuro(n: number): string {
  return n.toLocaleString("fr-FR") + " €";
}

export function getPrenom(nomComplet: string): string {
  return (nomComplet || "").trim().split(/\s+/)[0] || "";
}

// Largeurs des barres de l'echelle DPE (pour le visuel)
export const DPE_BAR_WIDTHS: Record<LettreDpe, number> = {
  A: 35, B: 42, C: 52, D: 62, E: 72, F: 82, G: 95,
};

export const DPE_LETTERS: LettreDpe[] = ["A", "B", "C", "D", "E", "F", "G"];

export function getDpeInfo(lettre: LettreDpe): DpeInfo {
  return DPE_INFO[lettre];
}