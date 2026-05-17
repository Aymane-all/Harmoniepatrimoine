"use client";

import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative w-full py-16 md:py-40 flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 z-0 bg-no-repeat bg-center bg-cover"
        style={{
          backgroundImage: 'url("/images/hero-client.jpg")',
        }}
      >
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Content with reveal effect */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 md:px-6 text-center text-white">
        <div className="animate-float">
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold leading-snug md:leading-tight mb-6 md:mb-8 tracking-tight">
            Votre maison a<br />
            plus de valeur<br />
            <span className="inline-block bg-[#2563EB] px-4 md:px-6 py-1.5 md:py-2 mt-2 md:mt-4 rounded-lg shadow-2xl transform -rotate-1">
              que vous ne le pensez
            </span>
          </h1>
        </div>
        <p className="text-[13px] sm:text-sm md:text-lg text-white/90 mb-8 md:mb-10 max-w-2xl mx-auto leading-relaxed font-medium">
          Simulez vos aides à la rénovation, estimez votre DPE et testez le confort de votre maison en 2 minutes.
          Résultats personnalisés selon votre département.
        </p>

        <div className="flex flex-col items-center justify-center gap-6">
          <a
            href="#simulateurs"
            className="group relative inline-flex w-fit px-8 md:px-10 py-3.5 md:py-4 bg-white text-[#1E40AF] text-sm md:text-base font-bold rounded-full transition-all shadow-xl hover:scale-105 active:scale-95"
          >
            Choisir Mon Simulateur
            <div className="absolute inset-0 rounded-full bg-white blur-sm opacity-0 group-hover:opacity-40 transition-opacity" />
          </a>
        </div>
      </div>
    </section>
  );
}
