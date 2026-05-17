"use client";

import React from "react";

interface ArticleContentProps {
  contenu: string | null;
}

export default function ArticleContent({ contenu }: ArticleContentProps) {
  if (!contenu) return null;

  return (
    <div 
      className="article-rich-text prose prose-blue max-w-none 
                 text-gray-700 leading-relaxed 
                 [&>h2]:text-2xl [&>h2]:font-bold [&>h2]:text-gray-900 [&>h2]:mt-10 [&>h2]:mb-4
                 [&>h3]:text-xl [&>h3]:font-bold [&>h3]:text-gray-900 [&>h3]:mt-8 [&>h3]:mb-3
                 [&>p]:mb-6
                 [&>ul]:list-disc [&>ul]:pl-6 [&>ul]:mb-6
                 [&>ol]:list-decimal [&>ol]:pl-6 [&>ol]:mb-6
                 [&>li]:mb-2
                 [&>blockquote]:border-l-4 [&>blockquote]:border-blue-500 [&>blockquote]:pl-6 [&>blockquote]:italic [&>blockquote]:text-gray-600 [&>blockquote]:my-8
                 [&>img]:rounded-2xl [&>img]:my-10 [&>img]:w-full [&>img]:h-auto"
      dangerouslySetInnerHTML={{ __html: contenu }}
    />
  );
}
