import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

const QUESTIONS_AIDES = [
  {
    etape: 1,
    tag: "Situation",
    highlight: "situation",
    question: "Quelle est votre {h} ?",
    hint: "Votre statut détermine le type d'aides éligibles.",
    choices: [
      { icon: "house", value: "maison", title: "Propriétaire maison", subtitle: "Maison individuelle" },
      { icon: "building", value: "appart", title: "Propriétaire appartement", subtitle: "Copropriété" },
      { icon: "user", value: "loc", title: "Locataire", subtitle: "Logement loué" }
    ]
  },
  {
    etape: 2,
    tag: "Ancienneté",
    highlight: "construite",
    question: "Quand votre maison a-t-elle été {h} ?",
    hint: "Les aides de l'Anah ciblent les logements de plus de 15 ans.",
    choices: [
      { icon: "historical", value: "av75", title: "Avant 1975", subtitle: "Construction ancienne" },
      { icon: "bricks", value: "75-90", title: "1975 — 1990", subtitle: "Isolation moyenne" },
      { icon: "house", value: "90-10", title: "1990 — 2010", subtitle: "Isolation récente" },
      { icon: "sparkles", value: "ap10", title: "Après 2010", subtitle: "Maison récente" }
    ]
  },
  {
    etape: 3,
    tag: "Localisation",
    highlight: "departement",
    question: "Dans quel {h} se trouve votre maison ?",
    hint: "Les aides varient selon votre département — jusqu'à 2 000€ de différence.",
    type: "select"
  },
  {
    etape: 4,
    tag: "Équipements",
    highlight: "chauffage",
    question: "Quel est votre système de {h} actuel ?",
    hint: "Ce choix détermine le montant de votre prime CEE.",
    choices: [
      { icon: "oilTank", value: "fioul", title: "Chaudière fioul" },
      { icon: "flame", value: "gaz", title: "Chaudière gaz" },
      { icon: "bolt", value: "elec", title: "Chauffage électrique" },
      { icon: "leaf", value: "autre", title: "Bois / PAC / Autre" }
    ]
  },
  {
    etape: 5,
    tag: "Situation fiscale",
    highlight: "revenu fiscal",
    question: "Quel est votre {h} annuel ?",
    hint: "Information confidentielle — uniquement pour calculer votre éligibilité MaPrimeRenov'.",
    type: "foyer_and_revenus"
  },
  {
    etape: 6,
    tag: "Vos besoins",
    highlight: "probleme",
    question: "Quel est votre principal {h} ?",
    hint: "Cette réponse personnalise votre résultat.",
    choices: [
      { icon: "snowflake", value: "froid", title: "Froid", subtitle: "Mauvaise isolation" },
      { icon: "droplet", value: "humidite", title: "Humidité", subtitle: "Moisissures, air lourd" },
      { icon: "euro", value: "factures", title: "Factures élevées", subtitle: "Charges trop hautes" },
      { icon: "search", value: "droits", title: "Mes droits", subtitle: "Je veux savoir" }
    ]
  }
];

const QUESTIONS_DPE = [
  {
    etape: 1,
    tag: "Caractéristiques du bâti",
    highlight: "construite",
    question: "Quand votre maison a-t-elle été {h} ?",
    hint: "L'année de construction est le facteur le plus déterminant pour estimer le DPE.",
    choices: [
      { icon: "historical", value: "av1948", title: "Avant 1948", subtitle: "Maçonnerie traditionnelle" },
      { icon: "bricks", value: "1948-1975", title: "1948 — 1975", subtitle: "Avant le premier choc pétrolier" },
      { icon: "house", value: "1975-1990", title: "1975 — 1990", subtitle: "Premières réglementations RT 1974" },
      { icon: "houseModern", value: "1990-2000", title: "1990 — 2000", subtitle: "RT 1988" },
      { icon: "buildings", value: "2000-2012", title: "2000 — 2012", subtitle: "RT 2000/RT 2005" },
      { icon: "sparkles", value: "ap2012", title: "Après 2012", subtitle: "RT 2012 — haute performance" }
    ]
  },
  {
    etape: 2,
    tag: "Superficie",
    highlight: "surface habitable",
    question: "Quelle est la {h} ?",
    hint: "La surface totale des pièces habitées — hors garage et cave.",
    type: "surface_slider"
  },
  {
    etape: 3,
    tag: "Isolation thermique",
    highlight: "isolée",
    question: "Comment est {h} votre maison ?",
    hint: "Pensez aux murs, toiture, planchers et fenêtres.",
    choices: [
      { icon: "snowflake", value: "aucune", title: "Pas d'isolation visible", subtitle: "Murs froids, courants d'air" },
      { icon: "bricks", value: "partielle", title: "Isolation partielle", subtitle: "Quelques travaux faits" },
      { icon: "house", value: "combles", title: "Combles isolés uniquement", subtitle: "Soufflage dans les combles" },
      { icon: "checkCircle", value: "bonne", title: "Bonne isolation générale", subtitle: "Murs + combles + sols" }
    ]
  },
  {
    etape: 4,
    tag: "Menuiseries",
    highlight: "fenêtres",
    question: "Quel type de {h} avez-vous ?",
    hint: "Les fenêtres représentent 10 à 15% des pertes de chaleur.",
    choices: [
      { icon: "window", value: "simple", title: "Simple vitrage" },
      { icon: "window", value: "dv_ancien", title: "Double vitrage ancien (avant 2000)" },
      { icon: "sparkles", value: "dv_recent", title: "Double vitrage récent (après 2000)" },
      { icon: "trophy", value: "triple", title: "Triple vitrage" }
    ]
  },
  {
    etape: 5,
    tag: "Système de chauffage",
    highlight: "chauffage",
    question: "Quel est votre système de {h} principal ?",
    hint: "Le type d'énergie utilisée est un facteur clé du DPE.",
    choices: [
      { icon: "oilTank", value: "fioul", title: "Chaudière fioul" },
      { icon: "flame", value: "gaz_ancien", title: "Chaudière gaz ancienne" },
      { icon: "bolt", value: "gaz_recente", title: "Chaudière gaz récente" },
      { icon: "recycle", value: "pac", title: "Pompe à chaleur" },
      { icon: "plug", value: "elec", title: "Chauffage électrique direct" }
    ]
  },
  {
    etape: 6,
    tag: "Eau chaude sanitaire",
    highlight: "eau chaude",
    question: "Comment produisez-vous votre {h} ?",
    hint: "L'eau chaude représente 10 à 20% de la consommation d'une maison.",
    choices: [
      { icon: "flame", value: "chaudiere", title: "Chaudière" },
      { icon: "plug", value: "ballon_elec", title: "Ballon électrique" },
      { icon: "recycle", value: "thermodynamique", title: "Chauffe-eau thermodynamique" },
      { icon: "sun", value: "solaire", title: "Solaire thermique" }
    ]
  },
  {
    etape: 7,
    tag: "Ventilation",
    highlight: "ventilation",
    question: "Quelle est votre {h} actuelle ?",
    hint: "Une bonne ventilation améliore la qualité de l'air.",
    choices: [
      { icon: "noAir", value: "aucune", title: "Pas de VMC" },
      { icon: "wind", value: "vmc_simple", title: "VMC simple flux" },
      { icon: "circularFlow", value: "vmc_double", title: "VMC double flux" }
    ]
  }
];

const QUESTIONS_CONFORT = [
  {
    etape: 1,
    tag: "Axe 1 — Confort thermique",
    highlight: "trop froides",
    question: "L'hiver, certaines pièces de votre maison sont-elles {h} malgré le chauffage ?",
    hint: "Certaines zones restent inconfortables même avec le chauffage allumé.",
    options: [
      { icon: "check", main: "Non, tout est bien chauffé", points: 0 },
      { icon: "thermometer", main: "Parfois une pièce un peu fraîche", points: 1 },
      { icon: "snowflake", main: "Oui, une pièce régulièrement froide", points: 3 },
      { icon: "snowflake", main: "Plusieurs pièces vraiment froides", points: 5 }
    ]
  },
  {
    etape: 2,
    tag: "Axe 1 — Confort thermique",
    highlight: "pièce condamnée",
    question: "Avez-vous une {h} que vous n'utilisez plus à cause du froid ou de l'humidité ?",
    hint: "Chambre, salon, bureau... des espaces abandonnés.",
    options: [
      { icon: "check", main: "Non, j'utilise toutes mes pièces", points: 0 },
      { icon: "door", main: "Une pièce moins utilisée", points: 1 },
      { icon: "lock", main: "Une pièce pratiquement condamnée", points: 4 },
      { icon: "house", main: "Plusieurs pièces inutilisables", points: 6 }
    ]
  },
  {
    etape: 3,
    tag: "Axe 2 — Humidité et air",
    highlight: "humidité ou condensation",
    question: "Constatez-vous de l'{h} sur vos murs, fenêtres ou plafonds ?",
    hint: "Traces d'humidité, taches noires, moisissures...",
    options: [
      { icon: "check", main: "Jamais", points: 0 },
      { icon: "droplet", main: "Rarement, seulement en hiver", points: 2 },
      { icon: "cloud", main: "Régulièrement sur certaines surfaces", points: 4 },
      { icon: "alertTriangle", main: "Fréquemment, moisissures visibles", points: 7 }
    ]
  },
  {
    etape: 4,
    tag: "Axe 2 — Humidité et air",
    highlight: "confiné ou chargé",
    question: "L'air dans votre maison vous semble-t-il {h} ?",
    hint: "Odeurs persistantes, air lourd... la ventilation fonctionne-t-elle bien ?",
    options: [
      { icon: "check", main: "Non, l'air est frais et agréable", points: 0 },
      { icon: "wind", main: "Un peu confiné le matin", points: 2 },
      { icon: "wind", main: "Souvent lourd, surtout en hiver", points: 5 },
      { icon: "alertTriangle", main: "Vraiment étouffant, odeurs persistantes", points: 8 }
    ]
  },
  {
    etape: 5,
    tag: "Axe 2 — Humidité et air",
    highlight: "problèmes de santé",
    question: "Vous ou vos proches avez-vous des {h} liés au logement ?",
    hint: "Rhumes fréquents, allergies, irritations respiratoires...",
    options: [
      { icon: "check", main: "Non, aucun symptôme", points: 0 },
      { icon: "alertCircle", main: "De temps en temps", points: 2 },
      { icon: "alertTriangle", main: "Régulièrement, plusieurs personnes", points: 6 },
      { icon: "building", main: "Souvent, lien avec la maison établi", points: 9 }
    ]
  },
  {
    etape: 6,
    tag: "Axe 3 — Vie familiale",
    highlight: "vie de famille",
    question: "Les problèmes de votre maison impactent-ils votre {h} ?",
    hint: "Tensions, pièces évitées à cause du logement...",
    options: [
      { icon: "check", main: "Non, on s'adapte très bien", points: 0 },
      { icon: "minus", main: "Parfois de petites tensions", points: 2 },
      { icon: "alertCircle", main: "Régulièrement, des habitudes ont changé", points: 6 },
      { icon: "alertTriangle", main: "Oui fortement, conflits fréquents", points: 9 }
    ]
  },
  {
    etape: 7,
    tag: "Axe 3 — Vie familiale",
    highlight: "honte ou gêne",
    question: "Avez-vous {h} d'inviter des proches chez vous ?",
    hint: "Vous évitez d'inviter à cause de l'état de votre maison ?",
    options: [
      { icon: "check", main: "Jamais, je reçois avec plaisir", points: 0 },
      { icon: "user", main: "Parfois un peu gêné(e)", points: 2 },
      { icon: "user", main: "Souvent, je préfère éviter", points: 6 },
      { icon: "x", main: "Je n'invite plus personne", points: 9 }
    ]
  },
  {
    etape: 8,
    tag: "Axe 4 — Sommeil et bien-être",
    highlight: "le froid ou l'humidité",
    question: "Votre sommeil est-il affecté par {h} dans votre chambre ?",
    hint: "Réveil nocturne à cause du froid, humidité...",
    options: [
      { icon: "check", main: "Non, je dors bien", points: 0 },
      { icon: "moon", main: "Parfois la nuit est un peu fraîche", points: 2 },
      { icon: "alertTriangle", main: "Régulièrement difficile de dormir", points: 5 },
      { icon: "alertTriangle", main: "Souvent, le froid perturbe mes nuits", points: 8 }
    ]
  },
  {
    etape: 9,
    tag: "Axe 1 — Confort thermique",
    highlight: "trop élevées",
    question: "Vos factures d'énergie vous semblent-elles {h} au regard du confort ressenti ?",
    hint: "Vous chauffez beaucoup mais restez inconfortable ?",
    options: [
      { icon: "check", main: "Non, raisonnable pour le confort obtenu", points: 0 },
      { icon: "euro", main: "Un peu élevées pour ce que j'ai", points: 2 },
      { icon: "alertCircle", main: "Trop élevées, rapport mauvais", points: 6 },
      { icon: "alertTriangle", main: "Très élevées, je dois renoncer à chauffer", points: 9 }
    ]
  },
  {
    etape: 10,
    tag: "Axe 4 — Sommeil et bien-être",
    highlight: "bien-être",
    question: "Au global, votre maison vous apporte-t-elle du {h} au quotidien ?",
    hint: "Vous sentez-vous bien, au calme et à l'aise chez vous ?",
    options: [
      { icon: "check", main: "Oui, je me sens bien chez moi", points: 0 },
      { icon: "user", main: "Globalement oui, avec quelques petits inconforts", points: 2 },
      { icon: "user", main: "Pas vraiment, je suis résigné(e)", points: 5 },
      { icon: "user", main: "Non, je me sens mal chez moi", points: 9 }
    ]
  }
];

async function main() {
  console.log("Seeding services...");
  const serviceBilan = await prisma.service.upsert({
    where: { slug: "bilan-energetique" },
    update: {},
    create: {
      nom_service: "Bilan Énergétique",
      description: "Diagnostic complet de la performance énergétique de votre logement.",
      icone: "fa-leaf",
      slug: "bilan-energetique",
      actif: true
    }
  });

  const serviceChauffage = await prisma.service.upsert({
    where: { slug: "chauffage" },
    update: {},
    create: {
      nom_service: "Chauffage",
      description: "Installation et remplacement de systèmes de chauffage performants.",
      icone: "fa-fire",
      slug: "chauffage",
      actif: true
    }
  });

  console.log("Seeding simulateurs...");
  await prisma.simulateur.upsert({
    where: { slug: "simulateur-aides" },
    update: {
      titre: "Simulateur d'Aides Rénovation",
      type_calcul: "aides",
      questions: QUESTIONS_AIDES as any,
      id_service: serviceChauffage.id_service
    },
    create: {
      slug: "simulateur-aides",
      titre: "Simulateur d'Aides Rénovation",
      type_calcul: "aides",
      questions: QUESTIONS_AIDES as any,
      id_service: serviceChauffage.id_service,
      actif: true
    }
  });

  await prisma.simulateur.upsert({
    where: { slug: "simulateur-dpe" },
    update: {
      titre: "Calculez votre score DPE",
      type_calcul: "dpe",
      questions: QUESTIONS_DPE as any,
      id_service: serviceBilan.id_service
    },
    create: {
      slug: "simulateur-dpe",
      titre: "Calculez votre score DPE",
      type_calcul: "dpe",
      questions: QUESTIONS_DPE as any,
      id_service: serviceBilan.id_service,
      actif: true
    }
  });

  await prisma.simulateur.upsert({
    where: { slug: "simulateur-confort" },
    update: {
      titre: "Testez le confort de votre maison",
      type_calcul: "confort",
      questions: QUESTIONS_CONFORT as any,
      id_service: serviceBilan.id_service
    },
    create: {
      slug: "simulateur-confort",
      titre: "Testez le confort de votre maison",
      type_calcul: "confort",
      questions: QUESTIONS_CONFORT as any,
      id_service: serviceBilan.id_service,
      actif: true
    }
  });

  console.log("Seeding simulateur confort...");
  const simConfort = await prisma.simulateur.findUnique({ where: { slug: "simulateur-confort" } });
  const simAides = await prisma.simulateur.findUnique({ where: { slug: "simulateur-aides" } });

  // ─── ARTICLE : Test de confort maison Angers ───
  console.log("Seeding article Angers...");

  // Données structurées propres — PAS de HTML
  const ARTICLE_DATA = {
    meta: {
      region: "Maine-et-Loire",
      ville: "Angers",
      departement: "49",
      date: "mai 2026",
      lecture: "6 min",
    },
    intro: [
      "Vous vivez dans une maison à Angers et quelque chose vous dérange sans que vous sachiez exactement pourquoi ? Vous avez froid dans certaines pièces, vous constatez des moisissures récurrentes, ou vous sentez une odeur d'humidité en rentrant chez vous ? Ces signaux ne sont pas anodins — votre maison vous parle. Mais avant de savoir ce qu'elle vous dit exactement, un test de confort personnalisé est indispensable.",
      "Ce test gratuit analyse 4 axes essentiels — confort thermique, humidité et qualité de l'air, vie familiale, bien-être — et vous donne un score de risque personnalisé. 3 minutes suffisent pour savoir si votre maison mérite une attention particulière.",
    ],
    sections: [
      {
        type: "text_card",
        titre: "Pourquoi ce test est différent d'un diagnostic technique",
        emoji: "🏠",
        paragraphes: [
          "Le test de confort MaFranceLocale n'est pas un diagnostic d'expert. C'est un outil basé sur ce que vous ressentez au quotidien — le froid, l'humidité, la qualité de vos nuits, la fréquence des visites de vos proches. Ces signaux émotionnels et physiques révèlent souvent des problèmes que les diagnostics techniques ne capturent pas. Le résultat est un score de risque sur 100 et des recommandations personnalisées pour votre maison à Angers.",
        ],
      },
      {
        type: "signaux",
        titre: "Les 5 signaux que votre maison vous envoie",
        intro: "Beaucoup de propriétaires de Angers vivent avec des inconforts qu'ils considèrent comme normaux ou inévitables. En réalité, ces signaux indiquent souvent des problèmes structurels qui s'aggravent avec le temps — et qui ont des solutions.",
        items: [
          { numero: 1, signal: "Froid persistant malgré le chauffage", revelation: "Isolation thermique insuffisante — murs, combles ou planchers" },
          { numero: 2, signal: "Humidité, condensation, odeur de renfermé", revelation: "VMC défaillante ou source d'infiltration à identifier" },
          { numero: 3, signal: "Moisissures qui reviennent malgré le traitement", revelation: "Problème structurel — masquer les symptômes ne suffit pas" },
          { numero: 4, signal: "Factures de chauffage disproportionnées", revelation: "Déperditions thermiques importantes — rapport coût/confort déséquilibré" },
          { numero: 5, signal: "Proches qui viennent moins souvent", revelation: "Signal indirect — le confort de la maison affecte la vie sociale" },
        ],
        conclusion: "Ces signaux, pris isolément, peuvent sembler bénins. C'est leur combinaison qui révèle la gravité réelle de la situation. C'est précisément ce que mesure le test de confort — l'interaction entre ces différents axes.",
      },
      {
        type: "text",
        titre: "Pourquoi les maisons de Angers sont particulièrement concernées",
        paragraphes: [
          "Le Maine-et-Loire bénéficie d'un climat océanique tempéré, mais la vallée de la Loire génère une humidité spécifique liée aux brouillards et aux crues saisonnières. Les maisons angevines construites dans les basses terres ou à proximité des confluents sont particulièrement exposées à des problèmes de remontées capillaires et d'humidité structurelle.",
          "Les quartiers résidentiels d'Angers — Avrillé, Les Ponts-de-Cé, Trélazé, Saint-Barthélemy — ont connu un développement immobilier important entre 1965 et 1985. Ces maisons, aujourd'hui âgées de 40 à 60 ans, atteignent la période où les problèmes d'isolation et de ventilation d'origine se manifestent avec une intensité croissante.",
          "Le contexte angevin présente une particularité : la présence importante d'ardoise locale dans la construction traditionnelle. Les maisons de caractère angevines en tuffeau ou en schiste présentent des problèmes d'humidité spécifiques liés à la porosité des matériaux — différents de ceux des maisons en parpaing des années 1970.",
        ],
      },
      {
        type: "table",
        titre: "Les risques de dégradation thermique par quartier de Angers",
        headers: ["Quartier / Ville", "Type de construction", "Risque principal"],
        rows: [
          ["Angers Centre", "Maisons de maître / Tuffeau", "Porosité des façades, humidité structurelle"],
          ["Avrillé / Trélazé", "Pavillons des années 1970-1980", "Défauts d'isolation des murs & combles perdus"],
          ["Les Ponts-de-Cé", "Habitations de basse plaine", "Remontées capillaires, humidité du sol"],
          ["Saint-Barthélemy", "Pavillons des années 1965-1975", "VMC obsolète, condensation des vitrages"]
        ]
      },
      {
        type: "stats",
        emoji: "📊",
        titre: "Le parc immobilier de Angers en chiffres",
        texte: "Plus de 55% des maisons individuelles d'Angers et de sa métropole datent d'avant 1990. La Loire et ses affluents créent une humidité spécifique dans les quartiers bas. Les maisons en tuffeau du centre et les pavillons des années 1970-1985 des communes périphériques présentent des profils de risque très différents.",
      },
      {
        type: "cta",
        titre: "Votre maison à Angers est-elle concernée ?",
        details: "10 questions · score de risque personnalisé · recommandations adaptées",
        bouton: "Faire le test de confort gratuit",
        lien: "/simulateurCon",
        note: "Gratuit · 3 minutes · Résultat immédiat · Sans inscription",
      },
      {
        type: "axes",
        titre: "Ce que le test de confort révèle — sans spoiler le résultat",
        intro: "Le test analyse vos réponses sur 10 questions couvrant votre ressenti quotidien dans votre maison. Il ne vous demande pas de données techniques — pas de DPE, pas de relevés de consommation. Seulement ce que vous vivez.",
        sous_titre: "Ce que le test mesure",
        axes: [
          { label: "Axe 1 — Confort thermique", description: "Avez-vous froid malgré le chauffage ? Y a-t-il des pièces que vous évitez l'hiver ?" },
          { label: "Axe 2 — Humidité et qualité de l'air", description: "Y a-t-il des traces d'humidité ? L'air est-il lourd ? Des odeurs persistent-elles malgré l'aération ?" },
          { label: "Axe 3 — Vie familiale et sociale", description: "Vos proches viennent-ils moins souvent ? Êtes-vous à l'aise pour recevoir spontanément ?" },
          { label: "Axe 4 — Sommeil et bien-être", description: "Comment dormez-vous ? La maison vous pèse-t-elle plutôt qu'elle ne vous repose ?" },
        ],
        conclusion: "À la fin du test, vous obtenez un score de risque sur 100 avec une analyse de chaque axe, les signaux spécifiquement détectés dans votre maison, et des recommandations adaptées à votre situation à Angers.",
      },
      {
        type: "table",
        titre: "Ce que le test de confort mesure précisément",
        headers: ["Axe", "Risque mesuré", "Exemple de question"],
        rows: [
          ["1. Thermique", "Déperdition de chaleur", "Sentez-vous des courants d'air froids dans certaines pièces ?"],
          ["2. Humidité", "Mauvais renouvellement de l'air", "Des traces de condensation apparaissent-elles sur vos vitres ?"],
          ["3. Social", "Isolement à cause du froid", "Hésitez-vous à inviter des proches chez vous l'hiver ?"],
          ["4. Sommeil", "Fatigue et sommeil perturbé", "Votre sommeil est-il réparateur dans votre chambre actuelle ?"]
        ]
      },
      {
        type: "temoignages",
        titre: "Ce que disent les propriétaires de Angers",
        items: [
          {
            texte: "Notre maison à Avrillé a 45 ans. On avait l'impression que l'humidité venait des murs eux-mêmes, pas de l'extérieur. Le test a confirmé que c'était un problème de condensation lié à une mauvaise isolation — pas des remontées capillaires comme on pensait. Le diagnostic a tout clarifié.",
            auteur: "Claudine P.",
            age: 67,
            ville: "Avrillé (49)",
            annee_maison: 1979,
          },
          {
            texte: "Ma chambre du fond était tellement froide l'hiver que je n'y dormais plus depuis 3 ans. J'avais accepté ça comme une fatalité. Le test m'a montré que ce n'était pas normal — et surtout que des solutions existaient.",
            auteur: "René M.",
            age: 72,
            ville: "Ponts-de-Cé (49)",
          },
        ],
      },
      {
        type: "processus",
        titre: "Que se passe-t-il après le test ?",
        intro: "Le test de confort est la première étape d'un processus simple. Voici ce qui suit selon votre score :",
        etapes: [
          {
            score: "eleve",
            titre: "Si votre score est élevé (risque fort ou modéré)",
            description: "Un conseiller local de Angers vous rappelle sous 24h. Il analyse vos réponses et organise un diagnostic gratuit à domicile pour identifier précisément les causes des signaux détectés. Ce diagnostic couvre l'analyse thermique, la détection d'humidité, l'estimation du DPE et le plan d'aides disponibles pour votre maison.",
          },
          {
            score: "faible",
            titre: "Si votre score est faible",
            description: "Votre maison présente peu de signaux préoccupants. Le conseiller peut tout de même vous présenter les optimisations disponibles et les aides auxquelles vous avez droit — même pour une maison confortable, des améliorations sont souvent possibles.",
          },
        ],
      },
      {
        type: "cta",
        titre: "Faites le test de confort maintenant",
        details: "Résultat immédiat · Angers et Maine-et-Loire",
        bouton: "Faire le test de confort gratuit",
        lien: "/simulateurCon",
        note: "Gratuit · 3 minutes · Résultat immédiat · Sans inscription",
      },
      {
        type: "faq",
        titre: "Questions fréquentes — test de confort à Angers",
        items: [
          {
            question: "Ce test est-il vraiment gratuit pour les propriétaires de Angers ?",
            reponse: "Oui — le test de confort MaFranceLocale est entièrement gratuit, sans inscription, sans carte bancaire. Il dure environ 3 minutes et le résultat est immédiat. Si votre score révèle des signaux importants, le diagnostic à domicile qui suit est également gratuit et sans engagement.",
          },
          {
            question: "Quelle est la différence entre ce test et un diagnostic humidité professionnel à Angers ?",
            reponse: "Un diagnostic humidité professionnel à Angers coûte entre 300 et 800 € et nécessite l'intervention d'un expert avec des instruments spécialisés (hygromètre, caméra thermique). Le test de confort MaFranceLocale est une étape préalable gratuite — il identifie si votre maison mérite ce type d'investissement. Si le test révèle des signaux importants, le diagnostic gratuit inclus dans notre service réalise une analyse similaire sans frais.",
          },
          {
            question: "Les maisons en tuffeau angevines ont-elles des problèmes d'humidité spécifiques ?",
            reponse: "Oui — le tuffeau, matériau de construction traditionnel du Maine-et-Loire, est un calcaire poreux qui absorbe et restitue l'humidité de façon particulière. Les maisons en tuffeau présentent souvent des problèmes de condensation différents des maisons en parpaing. Le test de confort détecte ces signaux et le diagnostic gratuit peut inclure une analyse adaptée à ce type de construction.",
          },
          {
            question: "Est-ce que j'ai besoin de connaître les données techniques de ma maison pour faire le test ?",
            reponse: "Non — le test ne demande aucune donnée technique. Pas de DPE, pas de relevé de consommation, pas de plans. Il repose uniquement sur votre ressenti quotidien — ce que vous vivez dans votre maison. C'est sa force : il détecte des signaux que les diagnostics techniques ne capturent pas.",
          },
          {
            question: "Mon conjoint ou ma conjointe devrait-il/elle aussi faire le test pour notre maison de Angers ?",
            reponse: "Le test mesure le ressenti personnel. Si vous et votre conjoint(e) vivez la maison différemment, il peut être intéressant de le faire chacun de votre côté. Les résultats peuvent révéler des perceptions différentes du confort — une source d'information précieuse pour identifier les problèmes les plus impactants.",
          },
        ],
      },
      {
        type: "source_reference",
        titre: "Source de référence",
        texte: "Pour comprendre les problèmes d'humidité et leur impact sur le confort thermique, consultez : ",
        lien_nom: "Ithaque Rénovation — Quel diagnostic réaliser pour l'humidité de sa maison ?",
        lien_url: "https://www.ithaque-renovation.com/blog/humidite-maison-quel-diagnostic/",
      },
      {
        type: "villes_region",
        titre: "Articles test de confort dans votre région",
        intro: "MaFranceLocale couvre le test de confort maison dans toutes les villes de votre région :",
        villes: ["Nantes (44)", "La Roche-sur-Yon (85)", "Niort (79)", "Poitiers (86)", "Tours (37)", "Le Mans (72)"],
      },
    ],
  };

  const keyword = await prisma.keyword.upsert({
    where: { slug_url: "test-confort-maison-angers" },
    update: {
      mot_cle: "diagnostic confort maison Angers",
      region: "Maine-et-Loire",
      actif: true,
    },
    create: {
      mot_cle: "diagnostic confort maison Angers",
      slug_url: "test-confort-maison-angers",
      region: "Maine-et-Loire",
      volume_recherche: 320,
      actif: true,
      id_service: serviceBilan.id_service,
    },
  });

  const simConfortId = simConfort?.id_simulateur ?? BigInt(1);
  const existingArticle = await prisma.article.findUnique({ where: { id_keyword: keyword.id_keyword } });

  if (existingArticle) {
    await prisma.article.update({
      where: { id_keyword: keyword.id_keyword },
      data: {
        titre: "Votre Maison est Froide ou Humide à Angers ? Faites le Test de Confort Gratuit",
        meta_description: "Votre maison à Angers est inconfortable, froide ou humide ? Faites le test de confort gratuit en 3 minutes. Score personnalisé + diagnostic gratuit sous 24h.",
        contenu: JSON.stringify(ARTICLE_DATA),
        image_url: "/images/image.jpg",
        image_alt: "Maison froide et humide à Angers — test de confort gratuit",
        actif: true,
      },
    });
  } else {
    await prisma.article.create({
      data: {
        titre: "Votre Maison est Froide ou Humide à Angers ? Faites le Test de Confort Gratuit",
        meta_description: "Votre maison à Angers est inconfortable, froide ou humide ? Faites le test de confort gratuit en 3 minutes. Score personnalisé + diagnostic gratuit sous 24h.",
        contenu: JSON.stringify(ARTICLE_DATA),
        image_url: "/images/image.jpg",
        image_alt: "Maison froide et humide à Angers — test de confort gratuit",
        actif: true,
        id_keyword: keyword.id_keyword,
        id_service: serviceBilan.id_service,
        id_simulateur: simConfortId,
      },
    });
  }
  console.log("Article Angers seeded successfully!");

  // ─── ARTICLE 2 : Aides Rénovation Angers 2026 ───
  console.log("Seeding article Aides Rénovation Angers 2026...");

  const ARTICLE_AIDES_DATA = {
    meta: {
      date: "mai 2026",
      lecture: "6 min",
      region: "Maine-et-Loire",
      departement: "49",
    },
    intro: [
      "Vous êtes propriétaire d'une maison à Angers et vous vous demandez si vous pouvez bénéficier des aides à la rénovation énergétique en 2026 ? La bonne nouvelle : plusieurs dispositifs sont cumulables dans Maine-et-Loire — dont L'aide d'Angers Loire Métropole et du Département de Maine-et-Loire que beaucoup de propriétaires ignorent encore.",
      "Mais avant tout, sachez que votre situation personnelle est unique. Le montant auquel vous avez droit dépend de vos revenus, de votre chauffage actuel, de l'année de construction de votre maison et de votre zone géographique. La seule façon de savoir exactement ce que vous pouvez obtenir, c'est de faire la simulation.",
    ],
    sections: [
      {
        type: "text_card",
        titre: "Ce que vous allez découvrir dans cet article",
        emoji: "💡",
        paragraphes: [
          "Les aides existantes à Angers en 2026, pourquoi votre situation personnelle change radicalement les montants, et comment simuler vos droits en 2 minutes — sans inscription, sans engagement.",
        ],
      },
      {
        type: "signaux",
        titre: "Les aides à la rénovation à Angers : ce qui existe en 2026",
        intro: "À Angers, les propriétaires peuvent potentiellement accéder à 5 sources d'aides différentes, certaines nationales, d'autres spécifiques au Maine-et-Loire ou à votre collectivité locale. Ce cumul est ce qui rend la situation particulièrement intéressante pour les propriétaires de la région.",
        items: [
          { numero: 1, signal: "MaPrimeRénov' — l'aide nationale principale", revelation: "C'est l'aide la plus connue, versée par l'État via l'ANAH. Son montant varie considérablement selon votre profil — certains propriétaires obtiennent plus de 10 000 €, d'autres rien du tout. Angers est classée en zone B1, avec les plafonds de revenus nationaux hors Île-de-France. Le Maine-et-Loire dispose également de dispositifs locaux spécifiques." },
          { numero: 2, signal: "La Prime CEE — accessible sans condition de revenus", revelation: "Les Certificats d'Économies d'Énergie sont une aide souvent méconnue. Contrairement à MaPrimeRénov', elle est accessible à tous les propriétaires, quels que soient leurs revenus. Son montant dépend principalement de votre système de chauffage actuel." },
          { numero: 3, signal: "L'aide d'Angers Loire Métropole et du Département de Maine-et-Loire", revelation: "Angers Loire Métropole et le Département de Maine-et-Loire proposent des aides locales complémentaires pour accompagner les propriétaires dans leurs travaux de rénovation énergétique." },
          { numero: 4, signal: "L'aide régionale — AREEP Pays de la Loire", revelation: "La Région Pays de la Loire propose l'AREEP — une aide complémentaire pouvant atteindre 4 000 € pour les rénovations globales, cumulable avec les autres dispositifs pour les ménages modestes du Maine-et-Loire." },
          { numero: 5, signal: "TVA réduite et Éco-PTZ", revelation: "La TVA réduite à 5,5% s'applique automatiquement sur vos travaux de rénovation énergétique. L'Éco-PTZ permet en plus de financer jusqu'à 50 000 € à taux zéro, sans intérêts, remboursable sur 15 ans — et cumulable avec MaPrimeRénov'." }
        ],
        conclusion: "La combinaison de ces dispositifs crée des situations très différentes d'un propriétaire à l'autre. Deux voisins dans la même rue peuvent obtenir des montants qui varient du simple au triple selon leurs revenus et leur chauffage. Seule une simulation personnalisée donne un chiffre fiable.",
      },
      {
        type: "cta",
        simulateur_slug: "simulateur-aides",
        titre: "Simulez vos aides à Angers en 2 minutes",
        texte: "6 questions · résultat personnalisé selon votre profil exact",
        bouton_texte: "→ Démarrer ma simulation gratuite",
        subtexte: "Gratuit · Sans inscription · Résultat immédiat",
      },
      {
        type: "text",
        titre: "Ce qui fait vraiment varier le montant de vos aides",
        paragraphes: [
          "Avant de vous donner des exemples de montants, il faut comprendre les 4 facteurs clés qui déterminent ce à quoi vous avez droit à Angers. C'est la raison pour laquelle une simulation personnalisée est indispensable.",
        ],
      },
      {
        type: "axes",
        titre: "Les 4 facteurs clés qui déterminent vos aides",
        intro: "Ces quatre éléments de votre profil personnel ont une influence directe sur le montant total que vous pouvez cumuler à Angers.",
        axes: [
          {
            titre: "Votre revenu fiscal de référence",
            description: "C'est le facteur le plus important pour MaPrimeRénov'. Il détermine votre catégorie (très modeste, modeste, intermédiaire ou supérieur). La même maison, le même projet de travaux, mais des revenus différents peuvent donner des montants qui vont de 0 à 11 000 € pour la seule MaPrimeRénov'. En Maine-et-Loire, les seuils de revenus pour MaPrimeRénov' sont ceux de la grille nationale standard. Une simulation est indispensable pour connaître votre catégorie exacte."
          },
          {
            titre: "Votre système de chauffage actuel",
            description: "C'est le facteur déterminant pour la prime CEE. Les propriétaires avec une chaudière fioul obtiennent la prime CEE la plus élevée — bien supérieure à ceux qui se chauffent à l'électrique ou au gaz récent. Ce facteur seul peut représenter plusieurs milliers d'euros de différence."
          },
          {
            titre: "L'année de construction de votre maison",
            description: "MaPrimeRénov' est réservée aux logements de plus de 15 ans. Pour les maisons de Angers construites avant 1990 — une grande partie du parc résidentiel local — les travaux d'isolation sont souvent les plus rentables car l'isolation d'origine est insuffisante."
          },
          {
            titre: "La composition de votre foyer",
            description: "Les plafonds de revenus pour MaPrimeRénov' sont ajustés selon la taille de votre foyer. Une famille avec enfants peut accéder à des aides plus importantes qu'une personne seule avec le même revenu fiscal."
          }
        ]
      },
      {
        type: "text",
        titre: "Ce qui rend Angers particulièrement intéressante pour la rénovation",
        paragraphes: [
          "Angers est une ville universitaire avec un parc immobilier diversifié. Les maisons individuelles des quartiers périphériques — Saint-Barthélemy, Avrillé, Les Ponts-de-Cé — datent souvent des années 1960-1985, une période propice aux travaux d'isolation qui bénéficient pleinement des aides disponibles.",
          "Le Maine-et-Loire est l'un des départements français avec le plus fort taux de propriétaires occupants. C'est un avantage direct car MaPrimeRénov' dans ses meilleures conditions est réservée aux propriétaires qui habitent leur logement.",
          "Angers Loire Métropole a développé une politique active d'accompagnement à la rénovation énergétique. Des conseillers France Rénov' sont disponibles localement pour guider les propriétaires dans leurs démarches après la simulation."
        ],
      },
      {
        type: "table",
        titre: "Comment vérifier votre éligibilité à Angers",
        headers: ["Profil Fiscale", "Type de Travaux", "Aide Totale Estimée"],
        rows: [
          ["Ménage Très Modeste", "Remplacement chaudière fioul par PAC Air/Eau", "Jusqu'à 90% du montant (max 11 000 €)"],
          ["Ménage Modeste", "Rénovation globale d'un pavillon de 1980", "Jusqu'à 15 000 € (MPR + CEE + aides locales)"],
          ["Ménage Intermédiaire", "Isolation thermique des murs extérieurs", "Jusqu'à 4 000 € (CEE + MPR CEE)"],
          ["Ménage Supérieur", "Installation solaire thermique", "Prime CEE + TVA 5.5% + Éco-PTZ"]
        ]
      },
      {
        type: "temoignages",
        titre: "Ce que disent les propriétaires de Angers",
        items: [
          {
            auteur: "Jean-Pierre M.",
            details: "68 ans — Propriétaire à Avrillé (49)",
            badge: "Maison 1979",
            texte: "On avait une maison de 1979 à Avrillé avec une chaudière gaz vieillissante. Après la simulation en ligne, on a découvert qu'on avait droit à bien plus qu'on ne le pensait. Le diagnostic gratuit a confirmé les recommandations et on a pu planifier les travaux sereinement."
          },
          {
            auteur: "Suzanne L.",
            details: "71 ans — Propriétaire aux Ponts-de-Cé (49)",
            badge: "Maison 1968",
            texte: "Je suis retraitée et je gérais seule ma maison des Ponts-de-Cé. J'avais peur que les démarches soient trop compliquées. La simulation m'a donné une vision claire en quelques minutes, et le conseiller local m'a accompagnée dans toutes les étapes."
          }
        ]
      },
      {
        type: "cta",
        simulateur_slug: "simulateur-aides",
        titre: "Calculez vos aides maintenant",
        texte: "Résultat personnalisé · Angers et tout le Maine-et-Loire",
        bouton_texte: "→ Démarrer ma simulation gratuite",
        subtexte: "Gratuit · Sans inscription · Résultat immédiat",
      },
      {
        type: "faq",
        titre: "Questions fréquentes — aides rénovation à Angers",
        items: [
          {
            question: "Les communes autour de Angers sont-elles éligibles ?",
            reponse: "Oui — toutes les communes du Maine-et-Loire sont couvertes par les aides nationales. Les aides locales spécifiques (L'aide d'Angers Loire Métropole et du Département de Maine-et-Loire) peuvent varier selon la commune. La simulation prend en compte votre département pour calculer votre montant exact."
          },
          {
            question: "Puis-je bénéficier des aides si mes revenus semblent trop élevés ?",
            reponse: "À Angers (zone B1), les plafonds de revenus correspondent à la grille nationale. Si vous pensez dépasser les seuils MPR, souvenez-vous que la prime CEE reste accessible sans condition de revenus. De plus, la prime CEE est accessible sans condition de revenus. Le seul moyen de savoir avec certitude : faire la simulation."
          },
          {
            question: "Combien de temps dure le processus pour obtenir les aides à Angers ?",
            reponse: "De la simulation à la réception des aides, comptez en moyenne 3 à 6 mois selon la complexité du dossier. Le diagnostic gratuit à domicile est la première étape après la simulation — un conseiller local vous rappelle sous 24h."
          },
          {
            question: "Est-ce que je dois avancer les frais pour les travaux ?",
            reponse: "Pour les ménages à revenus très modestes, MaPrimeRénov' peut être versée sans avance de fonds dans certains cas. L'Éco-PTZ permet de financer le reste à charge sans intérêts. Les conditions exactes dépendent de votre profil — la simulation vous donnera les détails."
          },
          {
            question: "Peut-on cumuler toutes ces aides à Angers ?",
            reponse: "Oui — MaPrimeRénov' + CEE + aide locale + aide régionale + TVA réduite + Éco-PTZ peuvent tous s'additionner. Le plafond de cumul pour les ménages très modestes est de 100% du coût des travaux depuis 2025."
          }
        ]
      },
      {
        type: "source_reference",
        titre: "Source officielle",
        texte: "Retrouvez les informations officielles sur les aides à la rénovation énergétique dans votre département sur : ",
        lien_nom: "effy.fr — Aides à la rénovation énergétique en Pays de la Loire (source officielle)",
        lien_url: "https://www.effy.fr/aide-renovation-energetique/pays-de-la-loire"
      },
      {
        type: "villes_region",
        titre: "Articles sur les aides rénovation dans votre région",
        intro: "MaFranceLocale couvre les aides rénovation dans toutes les villes de votre région :",
        villes: ["La Roche-sur-Yon (85)", "Niort (79)", "Poitiers (86)", "Tours (37)", "Le Mans (72)", "Blois (41)"]
      }
    ]
  };

  const keywordAides = await prisma.keyword.upsert({
    where: { slug_url: "aides-renovation-angers-2026" },
    update: {
      mot_cle: "aides rénovation Angers 2026",
      region: "Maine-et-Loire",
      actif: true,
    },
    create: {
      mot_cle: "aides rénovation Angers 2026",
      slug_url: "aides-renovation-angers-2026",
      region: "Maine-et-Loire",
      volume_recherche: 540,
      actif: true,
      id_service: serviceChauffage.id_service,
    },
  });

  const simAidesId = simAides?.id_simulateur ?? BigInt(2);
  const existingAidesArticle = await prisma.article.findUnique({ where: { id_keyword: keywordAides.id_keyword } });

  if (existingAidesArticle) {
    await prisma.article.update({
      where: { id_keyword: keywordAides.id_keyword },
      data: {
        titre: "Aides Rénovation à Angers en 2026 : Êtes-vous Éligible ?",
        meta_description: "Découvrez les aides rénovation disponibles à Angers (MaPrimeRénov, CEE, L'aide d'Angers Loire Métropole et du Département de Maine-et-Loire). Simulez gratuitement votre éligibilité en 2 minutes. Résultat immédiat.",
        contenu: JSON.stringify(ARTICLE_AIDES_DATA),
        image_url: "/images/image.jpg",
        image_alt: "Aides Rénovation à Angers en 2026 — simulateur aides gratuit",
        actif: true,
      },
    });
  } else {
    await prisma.article.create({
      data: {
        titre: "Aides Rénovation à Angers en 2026 : Êtes-vous Éligible ?",
        meta_description: "Découvrez les aides rénovation disponibles à Angers (MaPrimeRénov, CEE, L'aide d'Angers Loire Métropole et du Département de Maine-et-Loire). Simulez gratuitement votre éligibilité en 2 minutes. Résultat immédiat.",
        contenu: JSON.stringify(ARTICLE_AIDES_DATA),
        image_url: "/images/image.jpg",
        image_alt: "Aides Rénovation à Angers en 2026 — simulateur aides gratuit",
        actif: true,
        id_keyword: keywordAides.id_keyword,
        id_service: serviceChauffage.id_service,
        id_simulateur: simAidesId,
      },
    });
  }

  console.log("Article Aides Rénovation Angers 2026 seeded successfully!");
  console.log("Database seeded successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
