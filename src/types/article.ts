// ============================================================
// Type Article — adapte a VOTRE table reelle
// ============================================================
// Colonnes reelles de la table articles :
//   id_article, id_keyword, id_service, id_simulateur,
//   titre, meta_description, contenu,
//   date_creation, date_modification, actif
//
// L'image est stockee DANS meta_description avec ce format :
//   "La description de l'article|||https://url-image.jpg"
// ============================================================

// Article brut tel qu'il vient de Supabase
export interface ArticleRaw {
    id_article: number;
    id_keyword: number;
    id_service: number;
    id_simulateur: number;
    titre: string;
    meta_description: string | null;
    contenu: string | null;
    date_creation: string;
    date_modification: string | null;
    actif: boolean;
}

// Article "propre" apres traitement (description et image separees)
export interface Article {
    id_article: number;
    slug: string;
    titre: string;
    description: string;        // partie avant le |||
    image: string | null;       // partie apres le |||
    contenu: string | null;
    date_creation: string;
    date_modification: string | null;
}