import { getLatestArticles } from "@/lib/articles";
import ArticlesSectionClient from "./ArticlesSectionClient";

// ============================================================
// SECTION "NOS ARTICLES" — DYNAMIQUE depuis Supabase
// (Server Component)
// ============================================================

export default async function ArticlesSection() {
  // On récupère jusqu'à 15 articles pour peupler l'ensemble des filtres de manière riche
  const articles = await getLatestArticles(15);

  if (articles.length === 0) return null;

  return <ArticlesSectionClient initialArticles={articles} />;
}

