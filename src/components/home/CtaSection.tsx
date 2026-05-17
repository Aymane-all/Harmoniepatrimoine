"use client";

import Link from "next/link";
import { IconSparkle } from "./Icons";

export default function CtaSection() {
  return (
    <section className="w-full bg-[#F5F5F5] pb-14">
      <div className="max-w-3xl mx-auto px-5 md:px-8">
        <div className="bg-white rounded-2xl border border-gray-200 p-8 flex items-center justify-between gap-6">
          <div className="flex-1">
            <h3 className="text-lg md:text-xl font-bold text-gray-900 leading-snug mb-1">
              Commencez par{" "}
              <span className="text-[#2563EB]">le simulateur</span>, la suite
              se fait naturellement
            </h3>
            <p className="text-sm text-gray-500 leading-relaxed mb-5">
              Simulateurs gratuits, resultat immediat. Si vous etes eligible,
              un conseiller local vous rappelle sous 24h. Sans engagement, vos
              donnees ne sont jamais revendues.
            </p>
            <Link
              href="/simulateur-aides"
              className="inline-flex items-center justify-center px-6 py-3 bg-[#2563EB] hover:bg-[#1E40AF] text-white text-sm font-semibold rounded-lg transition-colors"
            >
              Simuler mes aides
            </Link>
          </div>
          <div className="hidden md:block text-[#1E3A5F] flex-shrink-0">
            <IconSparkle size={90} />
          </div>
        </div>
      </div>
    </section>
  );
}
