import Link from "next/link";
import { notFound } from "next/navigation";
import {
    getArticleById,
    getRelatedArticles,
    formatDate,
    tempsLecture,
} from "@/lib/articles";
import ArticleContent from "@/components/blog/ArticleContent";
import ArticleConfortRenderer from "@/components/blog/ArticleConfortRenderer";

// ============================================================
// PAGE ARTICLE — /blog/[id]
// ============================================================

export async function generateMetadata({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const article = await getArticleById(id);
    if (!article) return { title: "Article introuvable" };
    return {
        title: `${article.titre} — Ma France Locale`,
        description: article.description || article.titre,
    };
}

export default async function ArticlePage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const article = await getArticleById(id);
    if (!article) notFound();

    const related = await getRelatedArticles(article.id_article, 3);
    const minutes = tempsLecture(article.contenu);

    // Essayer de parser le contenu JSON pour le rendu structuré premium
    let structuredContent = null;
    if (article.contenu) {
        try {
            structuredContent = JSON.parse(article.contenu);
        } catch (e) {
            // Pas un format JSON, on garde le HTML classique
        }
    }

    return (
        <main className="w-full bg-white min-h-screen">
            {/* ─── BARRE FINE EN HAUT ─── */}
            <div className="w-full border-b border-gray-100">
                <div className="max-w-3xl mx-auto px-5 md:px-8 h-14 flex items-center justify-between">
                    <Link
                        href="/blog"
                        className="text-sm text-gray-500 hover:text-[#2563EB] transition-colors flex items-center gap-1.5"
                    >
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
                            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="13" y1="8" x2="3" y2="8" />
                            <polyline points="7 4 3 8 7 12" />
                        </svg>
                        Retour au blog
                    </Link>
                </div>
            </div>

            {/* ─── ARTICLE ─── */}
            <article className="max-w-3xl mx-auto px-5 md:px-8 py-10 md:py-14">
                <h1 className="text-3xl md:text-[40px] font-extrabold text-gray-900 leading-tight mb-4">
                    {article.titre}
                </h1>

                {/* Meta-données du haut de l'article */}
                {structuredContent?.meta ? (
                    <div className="flex flex-wrap items-center gap-3 text-sm text-gray-450 font-medium border-b border-gray-100 pb-5 mb-8">
                        <span className="text-gray-500">Mis à jour : {formatDate(article.date_creation)}</span>
                        <span className="text-gray-300">·</span>
                        <span className="text-gray-500">Lecture : {structuredContent.meta.lecture}</span>
                        <span className="text-gray-300">·</span>
                        <span className="text-[#2563eb] font-semibold">{structuredContent.meta.region} ({structuredContent.meta.departement})</span>
                    </div>
                ) : (
                    <div className="flex items-center gap-3 text-sm text-gray-400 mb-8">
                        <span>{formatDate(article.date_creation)}</span>
                        <span>·</span>
                        <span>{minutes} min de lecture</span>
                    </div>
                )}

                {article.image && (
                    <div className="rounded-2xl overflow-hidden mb-10 shadow-sm border border-gray-100">
                        <img
                            src={article.image}
                            alt={article.image_alt ?? article.titre}
                            className="w-full h-auto object-cover max-h-[420px]"
                        />
                    </div>
                )}

                {article.description && (
                    <p className="text-lg text-gray-600 leading-relaxed mb-8 font-medium">
                        {article.description}
                    </p>
                )}

                {structuredContent ? (
                    <ArticleConfortRenderer data={structuredContent} />
                ) : (
                    <ArticleContent contenu={article.contenu} />
                )}
            </article>

            {/* ARTICLES SUGGÉRÉS */}
            {related.length > 0 && (
                <section className="w-full bg-[#F5F5F5] py-14">
                    <div className="max-w-5xl mx-auto px-5 md:px-8">
                        <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-8">
                            Articles similaires
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                            {related.map((a) => (
                                <Link
                                    key={a.id_article}
                                    href={`/blog/${a.slug}`}
                                    className="group bg-white rounded-xl overflow-hidden border border-gray-250 hover:border-[#2563EB] hover:shadow-lg transition-all"
                                >
                                    <div className="aspect-[16/10] bg-gray-100 overflow-hidden">
                                        {a.image && (
                                            <img
                                                src={a.image}
                                                alt={a.titre}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                            />
                                        )}
                                    </div>
                                    <div className="p-5">
                                        <h3 className="text-sm font-bold text-gray-900 leading-snug mb-2 line-clamp-2 group-hover:text-[#2563EB] transition-colors">
                                            {a.titre}
                                        </h3>
                                        <div className="text-xs text-gray-400">
                                            {formatDate(a.date_creation)}
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            )}
        </main>
    );
}
