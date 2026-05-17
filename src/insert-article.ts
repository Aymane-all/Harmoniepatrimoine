import dotenv from "dotenv";
dotenv.config();

import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

const content = {
  meta: {
    region: "Pays de la Loire",
    ville: "Angers",
    departement: "Maine-et-Loire",
    date: "mai 2026",
    lecture: "6 min"
  },
  intro: [
    "Vous êtes propriétaire d'une maison à Angers et vous vous demandez quelle est sa classe énergétique ? En 2026, cette question n'est plus seulement une curiosité technique. Le DPE (Diagnostic de Performance Énergétique) détermine directement la valeur de votre bien sur le marché, votre capacité à le louer légalement et le montant des aides auxquelles vous avez droit pour le rénover.",
    "En 2 minutes, notre simulateur DPE gratuit vous donne une estimation de votre classe énergétique (A à G) et son impact concret sur la valeur de votre maison à Angers. Aucune visite d'expert requise, aucun document technique nécessaire."
  ],
  sections: [
    {
      type: "text_card",
      titre: "Ce que vous allez découvrir dans cet article",
      emoji: "📋",
      paragraphes: [
        "Pourquoi le DPE est devenu urgent à Angers en 2026, comment estimer votre classe énergétique gratuitement, l'impact sur la valeur de votre bien et le calendrier légal des interdictions — avec les données spécifiques au marché immobilier local."
      ]
    },
    {
      type: "text",
      titre: "Pourquoi connaître son DPE est urgent à Angers en 2026",
      emoji: "⚡",
      paragraphes: [
        "Le DPE n'est plus un simple document administratif. Depuis 2025, il est devenu un déterminant direct de la valeur immobilière et un enjeu légal pour les propriétaires bailleurs. À Angers, comme partout en France, trois changements majeurs sont intervenus en 2025-2026.",
        "1. L'interdiction de louer les logements G — effective depuis janvier 2025\nDepuis le 1er janvier 2025, les logements classés G sont interdits à la mise en location. En 2028, cette interdiction s'étendra aux logements F. En 2034, aux logements E. Si votre maison à Angers est en classe F ou G, vous devez connaître votre situation exacte pour anticiper.",
        "2. La décote immobilière — jusqu'à 25% sur le prix de vente\nLes études des Notaires de France et de SeLoger confirment : les maisons classées F ou G se vendent entre 14% et 25% moins cher que les maisons équivalentes bien classées. Sur un bien à 200 000 € à Angers, c'est une perte de 28 000 à 50 000 €.",
        "3. Le nouveau calcul DPE 2026 — une opportunité pour certains\nDepuis le 1er janvier 2026, le coefficient de conversion de l'électricité est passé de 2,3 à 1,9. Résultat : environ 850 000 logements chauffés à l'électricité ou par PAC ont mécaniquement amélioré leur classe DPE sans travaux. Si c'est votre cas, la simulation vous le confirmera."
      ]
    },
    {
      type: "stats",
      titre: "Le marché immobilier de Angers face au DPE",
      emoji: "📊",
      texte: "Le marché immobilier angevin en 2025-2026 montre une sensibilité croissante au DPE. Angers, ville dynamique et universitaire, attire des acheteurs et investisseurs de plus en plus informés sur la performance énergétique. Les biens classés F ou G subissent une décote estimée entre 10 et 18% sur le marché angevin — et les biens classés G ne peuvent plus être proposés en location depuis 2025."
    },
    {
      type: "table",
      titre: "L'échelle DPE 2026 — ce que signifie chaque classe pour votre maison",
      headers: ["Classe", "Consommation", "Performance", "Interdiction loc.", "Impact valeur", "Obligation audit"],
      rows: [
        ["A", "≤ 70 kWh/m²/an", "Excellente", "Aucune", "+ 6%", "Non obligatoire"],
        ["B", "71-110 kWh/m²/an", "Très bonne", "Aucune", "+ 3%", "Non obligatoire"],
        ["C", "111-180 kWh/m²/an", "Bonne", "Aucune", "Référence", "Non obligatoire"],
        ["D", "181-250 kWh/m²/an", "Moyenne", "Aucune", "- 2%", "Non obligatoire"],
        ["E", "251-330 kWh/m²/an", "Médiocre", "2034", "- 8%", "Non obligatoire"],
        ["F", "331-420 kWh/m²/an", "Mauvaise", "2028", "- 14%", "Obligatoire à la vente"],
        ["G", "> 420 kWh/m²/an", "Très mauvaise", "2025 ⚠️", "- 19 à -25%", "Obligatoire à la vente"]
      ]
    },
    {
      type: "cta",
      titre: "Estimez le DPE de votre maison à Angers",
      details: "7 questions · estimation A→G · impact immobilier · 2 minutes",
      bouton: "Estimer mon DPE gratuitement",
      lien: "/simulateur-dpe",
      note: "Gratuit · 2 minutes · Résultat immédiat · Sans inscription"
    },
    {
      type: "text",
      titre: "Le parc immobilier de Angers et le DPE — ce que disent les données",
      emoji: "🏠",
      paragraphes: [
        "Le parc immobilier d'Angers et de sa métropole présente une grande diversité. Les maisons de tuffeau du centre et des communes proches (Saint-Barthélemy-d'Anjou, Les Ponts-de-Cé) ont des profils énergétiques spécifiques liés à la porosité du matériau. À l'inverse, les lotissements des années 1970-1985 d'Avrillé, Trélazé ou Bouchemaine présentent les profils typiques des constructions de cette époque.",
        "Le Maine-et-Loire présente une particularité notable : la prévalence du chauffage électrique direct dans les maisons des années 1975-1990. Ce type de chauffage, avec l'ancien coefficient de 2,3, pénalisait fortement le DPE. Avec le nouveau coefficient 2026 à 1,9, de nombreuses maisons angevines chauffées à l'électricité ont pu gagner une classe DPE mécaniquement.",
        "Le marché locatif angevin est particulièrement tendu — Angers est une ville étudiante avec une forte demande locative. Pour les propriétaires bailleurs, connaître précisément sa classe DPE est devenu indispensable : une maison classée G est désormais illégale à la location, et une maison classée F le sera en 2028."
      ]
    },
    {
      type: "text",
      titre: "Ce que le simulateur DPE révèle — sans remplacer l'expert",
      emoji: "🔍",
      paragraphes: [
        "Le simulateur DPE MaFranceLocale est un outil d'estimation indicative — il ne remplace pas un DPE officiel réalisé par un diagnostiqueur certifié, qui reste obligatoire pour toute vente ou mise en location. Mais il permet en 2 minutes d'obtenir une première estimation utile.",
        "Ce que le simulateur analyse :",
        "• L'année de construction — facteur le plus déterminant pour estimer la classe DPE",
        "• La surface habitable — pour calculer la consommation au m²",
        "• L'isolation — combles, murs, planchers, fenêtres",
        "• Le système de chauffage — fioul, gaz, électrique, PAC, bois",
        "• La production d'eau chaude et la ventilation — facteurs complémentaires",
        "Le résultat comprend votre classe DPE estimée A→G, l'impact sur la valeur de votre bien à Angers, une simulation de votre facture énergétique avant et après rénovation, et les actions prioritaires pour améliorer votre classe. Si votre estimation révèle un DPE F ou G, un conseiller local vous rappelle sous 24h."
      ]
    },
    {
      type: "temoignages",
      titre: "Ce que disent les propriétaires de Angers",
      items: [
        {
          texte: "J'avais une maison à Avrillé avec un chauffage électrique. L'ancien DPE la classait en E. Avec le nouveau calcul 2026, le simulateur m'a estimé une classe D. Ce recalcul change tout pour ma vente prévue l'année prochaine.",
          auteur: "Nathalie P.",
          age: 59,
          ville: "Avrillé (49)",
          annee_maison: 1982
        },
        {
          texte: "Ma maison en tuffeau aux Ponts-de-Cé avait un DPE que je ne comprenais pas bien. Le simulateur m'a aidée à comprendre les facteurs qui influençaient ma classe — notamment l'isolation des combles qui était insuffisante. Ça m'a guidée vers les bons travaux.",
          auteur: "Chantal L.",
          age: 64,
          ville: "Ponts-de-Cé (49)"
        }
      ]
    },
    {
      type: "cta",
      titre: "Estimez votre DPE maintenant",
      details: "Angers · Maine-et-Loire · Résultat immédiat",
      bouton: "Estimer mon DPE gratuitement",
      lien: "/simulateur-dpe",
      note: "Gratuit · 2 minutes · Résultat immédiat · Sans inscription"
    },
    {
      type: "faq",
      titre: "Questions fréquentes — DPE à Angers",
      items: [
        {
          question: "Mon DPE actuel est-il encore valable à Angers ?",
          reponse: "Un DPE a une durée de validité de 10 ans. Mais attention : les DPE réalisés entre le 1er janvier 2018 et le 30 juin 2021 ont expiré au 1er janvier 2025. Si votre DPE date de cette période, il n'est plus valable. De plus, avec la réforme du coefficient électricité au 1er janvier 2026, un recalcul gratuit est possible sur le site de l'ADEME si votre logement est chaudé à l'électricité."
        },
        {
          question: "Quelle est la différence entre le simulateur DPE gratuit et un DPE officiel à Angers ?",
          reponse: "Un DPE officiel réalisé par un diagnostiqueur certifié à Angers coûte entre 100 et 250 € et a une valeur juridique. Il est obligatoire pour vendre ou louer. Le simulateur MaFranceLocale est une estimation indicative — il n'a pas de valeur légale mais permet d'anticiper votre situation en 2 minutes, gratuitement."
        },
        {
          question: "Les maisons en tuffeau angevines ont-elles une classe DPE spécifique ?",
          reponse: "Le tuffeau, matériau de construction traditionnel du Maine-et-Loire, est un calcaire poreux avec des propriétés thermiques particulières. Il présente une inertie thermique intéressante mais une isolation insuffisante selon les normes actuelles. Les maisons en tuffeau sont généralement classées D ou E selon leur ancienneté et leurs travaux de rénovation. Le simulateur prend en compte les caractéristiques du bâti pour estimer votre classe."
        },
        {
          question: "Mon logement est-il concerné par l'interdiction de location à Angers ?",
          reponse: "Si votre maison à Angers est classée G : oui — depuis le 1er janvier 2025. Si elle est classée F : interdiction en 2028. Si elle est classée E : interdiction en 2034. Le simulateur vous donne une estimation de votre classe pour savoir si vous êtes concerné et vous aider à anticiper."
        },
        {
          question: "Dois-je réaliser un audit énergétique avant de vendre ma maison à Angers ?",
          reponse: "Si votre maison à Angers est classée F ou G, un audit énergétique est obligatoire avant la mise en vente depuis avril 2023. Cet audit détaille les travaux nécessaires et leur coût estimé. Pour les classes A à E, le DPE seul suffit. Le simulateur permet de vérifier votre classe estimée avant de contacter un diagnostiqueur."
        }
      ]
    },
    {
      type: "source_reference",
      titre: "Source officielle",
      texte: "Pour accéder au recalcul officiel de votre DPE et télécharger votre nouvelle attestation (si votre logement est chaudé à l'électricité) : ",
      lien_nom: "Observatoire DPE & Audit ADEME — Base nationale des DPE",
      lien_url: "https://observatoire-dpe.ademe.fr/"
    },
    {
      type: "villes_region",
      titre: "Articles simulateur DPE dans votre région",
      intro: "MaFranceLocale couvre le simulateur DPE dans toutes les villes de votre région :",
      villes: ["Nantes (44)", "La Roche-sur-Yon (85)", "Niort (79)", "Poitiers (86)", "Tours (37)", "Le Mans (72)"]
    }
  ]
};

async function main() {
  console.log("Checking if keyword exists...");
  let keyword = await prisma.keyword.findUnique({
    where: { slug_url: "simulateur-dpe-maison-angers" }
  });

  if (!keyword) {
    console.log("Keyword does not exist, creating it...");
    keyword = await prisma.keyword.create({
      data: {
        id_service: BigInt(1), // Bilan Énergétique
        mot_cle: "DPE maison Angers 2026",
        slug_url: "simulateur-dpe-maison-angers",
        region: "Pays de la Loire",
        actif: true,
      }
    });
  } else {
    console.log("Keyword already exists, updating it...");
    keyword = await prisma.keyword.update({
      where: { id_keyword: keyword.id_keyword },
      data: {
        id_service: BigInt(1),
        mot_cle: "DPE maison Angers 2026",
        region: "Pays de la Loire",
        actif: true,
      }
    });
  }

  console.log("Keyword ready:", keyword);

  console.log("Creating/updating Article...");
  const article = await prisma.article.upsert({
    where: { id_keyword: keyword.id_keyword },
    update: {
      id_service: BigInt(1),
      id_simulateur: BigInt(2), // Calculez votre score DPE
      titre: "DPE de votre Maison à Angers : Estimez votre Classe Énergétique Gratuitement en 2026",
      meta_description: "Estimez le DPE de votre maison à Angers en 2 minutes. Classe A→G, impact valeur bien, passoires thermiques 2025-2034. Gratuit et sans inscription.",
      image_url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200",
      image_alt: "DPE Maison Angers",
      contenu: JSON.stringify(content),
      actif: true,
    },
    create: {
      id_keyword: keyword.id_keyword,
      id_service: BigInt(1),
      id_simulateur: BigInt(2), // Calculez votre score DPE
      titre: "DPE de votre Maison à Angers : Estimez votre Classe Énergétique Gratuitement en 2026",
      meta_description: "Estimez le DPE de votre maison à Angers en 2 minutes. Classe A→G, impact valeur bien, passoires thermiques 2025-2034. Gratuit et sans inscription.",
      image_url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200",
      image_alt: "DPE Maison Angers",
      contenu: JSON.stringify(content),
      actif: true,
    }
  });

  console.log("Article created/updated successfully with ID:", article.id_article.toString());
}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
