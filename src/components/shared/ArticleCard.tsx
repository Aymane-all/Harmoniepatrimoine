import Link from "next/link";
import type { Article } from "@/types/article";
import { formatDate } from "@/lib/articles";

export default function ArticleCard({ article, index }: { article: Article; index: number }) {
  // Generate a random number or use id for the top-right corner
  const displayNumber = (article.id_article % 100).toString().padStart(2, '0');
  
  return (
    <Link
      href={`/blog/${article.slug}`}
      className="group flex flex-col bg-[#F3F4F6] rounded-2xl overflow-hidden hover:shadow-xl transition-all border border-gray-100"
    >
      {/* Blue Header with Number */}
      <div className="bg-[#1E40AF] p-4 flex justify-between items-center text-white">
        <span className="text-[10px] font-bold uppercase tracking-widest opacity-80">Aides Financières</span>
        <span className="text-2xl font-bold opacity-40">{displayNumber}</span>
      </div>

      {/* Contenu */}
      <div className="p-6 flex flex-col flex-1">
        <h3 className="text-lg font-bold text-[#1E3A5F] leading-tight mb-4 group-hover:text-[#2563EB] transition-colors">
          {article.titre}
        </h3>
        
        <div className="mt-auto pt-4 border-t border-gray-200 text-xs text-gray-400">
          Publié le {formatDate(article.date_creation)}
        </div>
      </div>
    </Link>
  );
}