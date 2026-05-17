"use client";

import { useState } from "react";
import Link from "next/link";
import { IconArrowRight } from "./Icons";

// Définition de l'interface client-safe pour éviter d'importer depuis lib/articles qui contient Prisma/pg
export interface Article {
  id_article: number;
  slug: string;
  titre: string;
  description: string;
  image: string | null;
  image_alt?: string | null;
  contenu: string | null;
  date_creation: string;
  id_simulateur: number;
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

interface ArticlesSectionClientProps {
  initialArticles: Article[];
}

export default function ArticlesSectionClient({ initialArticles }: ArticlesSectionClientProps) {
  // Par défaut, on commence par la catégorie "Simulateur d'aides" (id_simulateur: 1)
  const [activeFilter, setActiveFilter] = useState<number>(1);

  // Filtrage des articles selon la catégorie sélectionnée (id_simulateur)
  const filteredArticles = initialArticles.filter((a) => a.id_simulateur === activeFilter);

  // 1 grand article vedette + jusqu'à 4 autres cartes de la même catégorie
  const first = filteredArticles[0];
  const rest = filteredArticles.slice(1, 5);

  const filters = [
    { label: "Simulateur d'aides", value: 1 },
    { label: "Test de confort", value: 3 },
    { label: "Simulateur DPE", value: 2 },
  ];

  return (
    <section className="w-full bg-white py-14">
      <div className="max-w-5xl mx-auto px-5 md:px-8">
        {/* En-tête */}
        <div className="mb-6">
          <span className="inline-block text-[10px] font-bold text-white bg-[#1E3A5F] px-2.5 py-1 rounded uppercase tracking-wider mb-3">
            Nos articles
          </span>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
            Aides, DPE et confort{" "}
            <span className="text-[#2563EB]">votre region en detail</span>
          </h2>
          <p className="text-sm text-gray-500 mt-2 max-w-2xl font-normal">
            Chaque proprietaire a une situation unique. Nos articles expliquent
            les aides disponibles dans votre departement.
          </p>
        </div>

        {/* Onglets de filtres interactifs */}
        <div className="flex flex-wrap gap-2.5 mb-8">
          {filters.map((f) => {
            const isActive = activeFilter === f.value;
            return (
              <button
                key={f.label}
                onClick={() => setActiveFilter(f.value)}
                className={`px-4.5 py-2.5 text-xs font-semibold rounded-xl transition-all duration-200 active:scale-95 ${
                  isActive
                    ? "bg-[#1E3A5F] text-white shadow-sm"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-900"
                }`}
              >
                {f.label}
              </button>
            );
          })}
        </div>

        {/* Grille d'articles filtrés */}
        {filteredArticles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 transition-opacity duration-300">
            {/* Grand article vedette */}
            {first && <ArticleBig article={first} />}

            {/* Grille des articles secondaires */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {rest.map((a) => (
                <ArticleSmall key={a.id_article} article={a} />
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-16 bg-slate-50 rounded-2xl border border-slate-100 border-dashed">
            <p className="text-gray-400 text-sm">
              Aucun guide disponible dans cette catégorie pour le moment.
            </p>
          </div>
        )}

        {/* Pied de section */}
        <div className="text-center mt-10">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-6 py-3 border border-gray-300 text-gray-700 text-sm font-semibold rounded-lg hover:border-[#2563EB] hover:text-[#2563EB] transition-colors"
          >
            Découvrir tous nos articles
            <IconArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// Composant interne : Grande carte Vedette
// ============================================================
function ArticleBig({ article }: { article: Article }) {
  return (
    <Link
      href={`/blog/${article.slug}`}
      className="group relative rounded-2xl overflow-hidden bg-[#2563EB] min-h-[300px] flex flex-col justify-end p-6 shadow-sm hover:shadow-md transition-all duration-200"
      style={{
        backgroundImage: article.image
          ? `linear-gradient(rgba(37,99,235,0.55), rgba(30,58,95,0.85)), url(${article.image})`
          : undefined,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <span className="absolute top-5 right-5 text-3xl font-extrabold text-white/20 select-none">
        44
      </span>
      <div className="relative z-10">
        <h3 className="text-lg font-bold text-white leading-snug mb-2 group-hover:underline">
          {article.titre}
        </h3>
        {article.description && (
          <p className="text-xs text-white/80 leading-relaxed line-clamp-2 mb-3">
            {article.description}
          </p>
        )}
        <div className="text-[11px] text-white/60">
          {formatDate(article.date_creation)}
        </div>
      </div>
    </Link>
  );
}

// ============================================================
// Composant interne : Petite carte secondaire
// ============================================================
function ArticleSmall({ article }: { article: Article }) {
  return (
    <Link
      href={`/blog/${article.slug}`}
      className="group bg-[#F8F9FA] rounded-xl p-5 hover:bg-slate-100 transition-all duration-200 flex flex-col hover:shadow-sm border border-slate-100"
    >
      <h4 className="text-sm font-bold text-gray-900 leading-snug mb-2 line-clamp-3 group-hover:text-[#2563EB] transition-colors">
        {article.titre}
      </h4>
      {article.description && (
        <p className="text-xs text-gray-500 leading-relaxed line-clamp-3 mb-3 flex-1">
          {article.description}
        </p>
      )}
      <div className="text-[11px] text-gray-400 mt-auto">
        {formatDate(article.date_creation)}
      </div>
    </Link>
  );
}
