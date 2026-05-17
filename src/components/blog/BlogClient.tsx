"use client";

import React, { useState } from "react";
import Link from "next/link";

export interface Article {
  id_article: number;
  slug: string;
  titre: string;
  description: string;
  image: string | null;
  image_alt?: string | null;
  contenu: string | null;
  date_creation: string;
}

// Fonction de formatage locale client-safe
export function formatDate(d: string): string {
  try {
    return new Date(d).toLocaleDateString("fr-FR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch {
    return d;
  }
}

interface BlogClientProps {
  initialArticles: Article[];
}

export default function BlogClient({ initialArticles }: BlogClientProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(4);

  // 1. Filtrer les articles en fonction de la saisie utilisateur (titre, description ou contenu)
  const filteredArticles = initialArticles.filter((a) => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) return true;

    return (
      a.titre.toLowerCase().includes(query) ||
      (a.description && a.description.toLowerCase().includes(query)) ||
      (a.contenu && a.contenu.toLowerCase().includes(query)) ||
      a.slug.toLowerCase().includes(query)
    );
  });

  // 2. Organiser les articles filtrés :
  // - Premier article vedette à gauche
  // - 2 articles secondaires à droite
  // - Le reste est affiché dans "Latest Post"
  const featuredMain = filteredArticles[0];
  const featuredSecondary = filteredArticles.slice(1, 3);
  const latestPosts = filteredArticles.slice(3);

  // Articles affichés actuellement dans "Latest Post" selon la pagination
  const visibleLatestPosts = latestPosts.slice(0, visibleCount);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 4);
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB] flex flex-col">
      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 py-10">

        {/* SECTION HERO */}
        <section className="py-12 text-center max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-5xl font-serif leading-tight mb-10 text-gray-800">
            Découvrez facilement des articles, actualités et contenus adaptés à votre région ou votre ville...
          </h1>
          <div className="relative max-w-3xl mx-auto">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                // Réinitialiser la pagination lors d'une nouvelle recherche
                setVisibleCount(4);
              }}
              placeholder="Cherchez des articles selon votre région / ville..."
              aria-label="Rechercher des articles par région ou ville"
              className="w-full py-4 px-6 bg-gray-200/60 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#2563EB]/40 placeholder:text-gray-500 italic shadow-inner transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-sm font-semibold"
              >
                Effacer
              </button>
            )}
          </div>
        </section>

        {/* SECTION ARTICLES VEDETTES */}
        {featuredMain ? (
          <>
            <section className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
              {/* Article principal à gauche */}
              <Link href={`/blog/${featuredMain.slug}`} className="lg:col-span-2 group cursor-pointer">
                <div className="aspect-[16/10] overflow-hidden rounded-xl mb-4 shadow-sm bg-gray-100 border border-gray-100">
                  {featuredMain.image ? (
                    <img
                      src={featuredMain.image}
                      alt={featuredMain.titre}
                      loading="eager"
                      fetchPriority="high"
                      decoding="async"
                      className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-300 bg-slate-100">Image indisponible</div>
                  )}
                </div>
                <h2 className="text-2xl md:text-3xl font-serif font-bold mb-2 group-hover:text-[#2563EB] transition-colors leading-tight text-slate-900">
                  {featuredMain.titre}
                </h2>
                <p className="text-orange-500 text-sm font-medium">{formatDate(featuredMain.date_creation)}</p>
              </Link>

              {/* Articles secondaires à droite */}
              <div className="flex flex-col gap-8">
                {featuredSecondary.map((a) => (
                  <Link key={a.id_article} href={`/blog/${a.slug}`} className="group cursor-pointer">
                    <div className="aspect-video overflow-hidden rounded-xl mb-3 shadow-sm bg-gray-100 border border-gray-100">
                      {a.image ? (
                        <img
                          src={a.image}
                          alt={a.titre}
                          loading="lazy"
                          decoding="async"
                          className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-300 bg-slate-100">Image indisponible</div>
                      )}
                    </div>
                    <h3 className="text-lg font-serif font-bold leading-snug group-hover:text-[#2563EB] transition-colors text-slate-900">
                      {a.titre}
                    </h3>
                    <p className="text-orange-500 text-xs mt-1">{formatDate(a.date_creation)}</p>
                  </Link>
                ))}
              </div>
            </section>

            {/* SECTION LATEST POST */}
            {latestPosts.length > 0 && (
              <section className="mb-20">
                <h2 className="text-4xl font-serif text-center mb-16 italic text-gray-700">Latest Post</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {visibleLatestPosts.map((a) => (
                    <Link
                      key={a.id_article}
                      href={`/blog/${a.slug}`}
                      className="border border-slate-200 p-4 rounded-xl hover:bg-[#2563EB]/5 hover:border-[#2563EB]/30 transition-all cursor-pointer group flex flex-col bg-white shadow-sm"
                    >
                      <div className="aspect-[16/10] overflow-hidden rounded-lg mb-4 bg-gray-100 border border-slate-100">
                        {a.image ? (
                          <img
                            src={a.image}
                            alt={a.titre}
                            loading="lazy"
                            decoding="async"
                            className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-300"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-300 bg-slate-100">Image indisponible</div>
                        )}
                      </div>
                      <h3 className="text-xl font-serif font-bold mb-2 leading-tight group-hover:text-[#2563EB] transition-colors text-slate-900">
                        {a.titre}
                      </h3>
                      <p className="text-orange-500 text-xs font-medium uppercase tracking-widest mt-auto">{formatDate(a.date_creation)}</p>
                    </Link>
                  ))}
                </div>

                {/* Bouton de pagination dynamique "Découvrez plus" */}
                {latestPosts.length > visibleCount && (
                  <div className="text-center mt-16 animate-fade-in">
                    <button
                      onClick={handleLoadMore}
                      className="bg-slate-800 hover:bg-slate-900 text-white px-12 py-3 rounded-lg font-medium transition-all text-sm shadow-md active:scale-95 hover:shadow-lg"
                    >
                      Découvrez plus
                    </button>
                  </div>
                )}
              </section>
            )}
          </>
        ) : (
          <div className="text-center py-24 bg-white rounded-2xl border border-dashed border-slate-200 shadow-sm">
            <svg
              className="mx-auto h-12 w-12 text-gray-400 mb-4 animate-pulse"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <p className="text-gray-500 font-medium italic">
              Aucun article ne correspond à votre recherche "{searchQuery}"
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
