import React from "react";
import { getLatestArticles } from "@/lib/articles";
import BlogClient from "@/components/blog/BlogClient";

export const metadata = {
  title: "Blog & Actualités — Ma France Locale",
  description: "Découvrez facilement des articles, actualités et contenus adaptés à votre région ou votre ville.",
};

export default async function BlogPage() {
  // On récupère une grande quantité d'articles pour alimenter la recherche et la pagination
  const articles = await getLatestArticles(50);

  return <BlogClient initialArticles={articles} />;
}

