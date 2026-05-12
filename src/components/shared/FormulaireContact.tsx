// ============================================================
// Types partages entre les 2 simulateurs
// ============================================================

// Donnees du formulaire de contact (identique pour les 2 sims)
export interface FormData {
    nom_complet: string;
    ville: string;
    telephone: string;
    consent1: boolean;     // obligatoire (RGPD)
    consent2: boolean;     // optionnel (partenaires)
}

// Structure d'un lead a inserer dans Supabase
export interface LeadInsert {
    nom_complet: string;
    telephone: string;
    ville: string;
    consentement_rgpd: boolean;
    type_logement?: "maison" | "appartement" | "autre" | null;
    type_chauffage?: string | null;
    annee_construction?: number | null;
    superficie?: number | null;
    resultat_simulation: Record<string, unknown>;
    valeur_simulation: number;
    source_utm: string | null;
    campagne_utm: string | null;
}