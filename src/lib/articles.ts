import prisma from "./prisma";

// ============================================================
// Type Article — lecture via Prisma (bypass RLS Supabase)
// ============================================================

export interface Article {
  id_article: number;
  slug: string;
  titre: string;
  description: string;
  image: string | null;
  image_alt: string | null;
  contenu: string | null;
  date_creation: string;
  id_simulateur: number;
}

const SEP = "|||";

export function parseMeta(meta: string | null): { description: string; image: string | null } {
  if (!meta) return { description: "", image: null };
  const i = meta.indexOf(SEP);
  if (i === -1) return { description: meta.trim(), image: null };
  const description = meta.substring(0, i).trim();
  const img = meta.substring(i + SEP.length).trim();
  return { description, image: img.length > 0 ? img : null };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function toArticle(r: any): Article {
  const { description, image: legacyImage } = parseMeta(r.meta_description);
  return {
    id_article: Number(r.id_article),
    slug: r.keyword?.slug_url ?? String(r.id_article),
    titre: r.titre,
    description,
    image: r.image_url ?? legacyImage,
    image_alt: r.image_alt ?? null,
    contenu: r.contenu,
    date_creation: r.date_creation
      ? r.date_creation instanceof Date
        ? r.date_creation.toISOString()
        : String(r.date_creation)
      : new Date().toISOString(),
    id_simulateur: Number(r.id_simulateur || 0),
  };
}

export async function getLatestArticles(limit = 5): Promise<Article[]> {
  try {
    const rows = await prisma.article.findMany({
      where: { actif: true },
      orderBy: { date_creation: "desc" },
      take: limit,
      select: {
        id_article: true,
        titre: true,
        meta_description: true,
        contenu: true,
        image_url: true,
        image_alt: true,
        date_creation: true,
        id_simulateur: true,
        keyword: {
          select: {
            slug_url: true,
          }
        }
      },
    });
    return rows.map(toArticle);
  } catch (e) {
    console.error("Erreur getLatestArticles:", e);
    return [];
  }
}

export async function getArticleById(idOrSlug: string | number): Promise<Article | null> {
  try {
    const searchParam = String(idOrSlug).trim();
    const isNumeric = /^\d+$/.test(searchParam);

    const row = await prisma.article.findFirst({
      where: {
        actif: true,
        OR: [
          ...(isNumeric ? [{ id_article: BigInt(searchParam) }] : []),
          { keyword: { slug_url: searchParam } }
        ]
      },
      include: {
        keyword: {
          select: {
            slug_url: true,
          }
        }
      }
    });

    if (!row) return null;
    return toArticle(row);
  } catch (e) {
    console.error("Erreur getArticleById:", e);
    return null;
  }
}

export async function getRelatedArticles(excludeId: number, limit = 3): Promise<Article[]> {
  try {
    const rows = await prisma.article.findMany({
      where: { actif: true, NOT: { id_article: BigInt(excludeId) } },
      take: limit,
      select: {
        id_article: true,
        titre: true,
        meta_description: true,
        contenu: true,
        image_url: true,
        image_alt: true,
        date_creation: true,
        id_simulateur: true,
        keyword: {
          select: {
            slug_url: true,
          }
        }
      },
    });
    return rows.map(toArticle);
  } catch (e) {
    console.error("Erreur getRelatedArticles:", e);
    return [];
  }
}

export function tempsLecture(html: string | null): number {
  if (!html) return 1;
  const wordsPerMinute = 200;
  const text = html.replace(/<[^>]*>/g, "");
  const wordCount = text.split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
}

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
