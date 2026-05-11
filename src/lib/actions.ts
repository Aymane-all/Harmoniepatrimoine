"use server";

import prisma from "./prisma";
import { TypeLogement } from "@prisma/client";

export async function submitLead(data: {
  nom_complet: string;
  telephone: string;
  ville: string;
  type_logement?: "maison" | "appartement" | "autre";
  type_chauffage?: string;
  annee_construction?: number | null;
  resultat_simulation?: any;
  valeur_simulation?: number;
  consentement_rgpd: boolean;
  source_utm?: string | null;
  campagne_utm?: string | null;
}) {
  try {
    const lead = await prisma.lead.create({
      data: {
        nom_complet: data.nom_complet,
        telephone: data.telephone,
        ville: data.ville,
        type_logement: data.type_logement as TypeLogement,
        type_chauffage: data.type_chauffage,
        annee_construction: data.annee_construction,
        resultat_simulation: data.resultat_simulation,
        valeur_simulation: data.valeur_simulation,
        consentement_rgpd: data.consentement_rgpd,
        source_utm: data.source_utm,
        campagne_utm: data.campagne_utm,
        statut: "nouveau",
      },
    });
    return { success: true, leadId: lead.id_lead.toString() };
  } catch (error) {
    console.error("Error submitting lead:", error);
    throw new Error("Failed to submit lead");
  }
}
