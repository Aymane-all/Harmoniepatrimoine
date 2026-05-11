import React from "react";
import Link from "next/link";
import Simulateur from "@/components/simulateur/Simulateur";


export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 selection:bg-emerald-500/30 overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] pointer-events-none overflow-hidden -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[80%] bg-emerald-100/40 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute top-[10%] right-[-10%] w-[35%] h-[70%] bg-teal-100/40 rounded-full blur-[100px] animate-pulse delay-1000" />
      </div>
      <Simulateur />


      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 border-b border-slate-200/60 bg-white/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/20">
              <span className="text-white font-bold text-lg italic">H</span>
            </div>
            <span className="font-bold tracking-tight text-2xl text-slate-800">Harmonie Patrimoine</span>
          </div>

          <div className="hidden lg:flex items-center gap-10 text-[15px] font-semibold text-slate-600">
            <Link href="#" className="hover:text-emerald-600 transition-colors">Patrimoine</Link>
            <Link href="#" className="hover:text-emerald-600 transition-colors">Investissement</Link>
            <Link href="#" className="hover:text-emerald-600 transition-colors">Conseils</Link>
            <Link href="#" className="hover:text-emerald-600 transition-colors">Contact</Link>
          </div>

          <div className="flex items-center gap-6">
            <button className="hidden sm:block text-[15px] font-semibold text-slate-700 hover:text-emerald-600 transition-colors">Espace Client</button>
            <button className="px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white text-[15px] font-bold rounded-xl transition-all shadow-xl shadow-slate-900/10">
              Prendre RDV
            </button>
          </div>
        </div>
      </nav>

      <main className="relative pt-40 pb-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col items-center text-center">
            {/* Badge */}
            <div className="mb-8 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700 text-xs font-bold uppercase tracking-widest shadow-sm">
              <span className="flex h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)]" />
              Expertise & Sérénité
            </div>

            <h1 className="text-6xl md:text-8xl font-black tracking-tight text-slate-900 leading-[1.05] mb-10 max-w-5xl">
              L'art de cultiver votre <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-500 bg-clip-text text-transparent">Héritage</span>
            </h1>

            <p className="text-xl md:text-2xl text-slate-600 max-w-3xl leading-relaxed mb-12 font-medium">
              Nous accompagnons les familles et les entrepreneurs dans la gestion,
              la protection et la transmission de leur patrimoine avec une vision durable.
            </p>

            <div className="flex flex-col sm:flex-row gap-5 mb-24">
              <Link href="#" className="px-10 py-5 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold rounded-2xl transition-all shadow-2xl shadow-emerald-600/30 flex items-center justify-center gap-3 scale-105 hover:scale-110 active:scale-95">
                Découvrir nos solutions
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
              </Link>
              <button className="px-10 py-5 bg-white border-2 border-slate-200 text-slate-800 font-extrabold rounded-2xl hover:bg-slate-50 hover:border-slate-300 transition-all shadow-lg flex items-center justify-center">
                Nos engagements
              </button>
            </div>

            {/* Stats / Proof */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 w-full max-w-5xl">
              {[
                { label: "Actifs gérés", value: "2.4B€", color: "emerald" },
                { label: "Clients satisfaits", value: "1,200+", color: "teal" },
                { label: "Expertise cumulée", value: "25 ans", color: "emerald" }
              ].map((stat, i) => (
                <div key={i} className="flex flex-col items-center">
                  <div className={`text-4xl font-black text-slate-800 mb-1`}>{stat.value}</div>
                  <div className="text-slate-500 font-bold uppercase tracking-widest text-[11px]">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Features Card Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full mt-32">
              {[
                { title: "Gestion Privée", desc: "Un accompagnement sur-mesure pour optimiser vos actifs financiers et immobiliers.", icon: "🏦" },
                { title: "Stratégie Fiscale", desc: "Des solutions intelligentes pour protéger vos revenus et préparer votre avenir.", icon: "⚖️" },
                { title: "Ingénierie Patrimoniale", desc: "Une analyse profonde pour structurer et transmettre votre patrimoine sereinement.", icon: "🏗️" }
              ].map((card, i) => (
                <div key={i} className="group p-10 rounded-[40px] bg-white border border-slate-200 hover:border-emerald-500/40 hover:shadow-2xl hover:shadow-emerald-500/10 transition-all duration-500 text-left relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 rounded-bl-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700 -z-10" />
                  <div className="text-5xl mb-8 group-hover:scale-110 transition-transform inline-block">{card.icon}</div>
                  <h3 className="text-2xl font-black mb-4 text-slate-800">{card.title}</h3>
                  <p className="text-slate-600 leading-relaxed font-medium">{card.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 pt-20 pb-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">
            <div className="col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-xs italic">H</span>
                </div>
                <span className="font-bold tracking-tight text-xl text-slate-800">Harmonie Patrimoine</span>
              </div>
              <p className="text-slate-500 max-w-sm leading-relaxed font-medium">
                Votre partenaire de confiance pour une gestion patrimoniale éclairée et personnalisée.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-slate-800 mb-6 uppercase tracking-widest text-xs">Expertise</h4>
              <ul className="space-y-4 text-slate-500 text-sm font-semibold">
                <li><Link href="#" className="hover:text-emerald-600 transition-colors">Placements</Link></li>
                <li><Link href="#" className="hover:text-emerald-600 transition-colors">Immobilier</Link></li>
                <li><Link href="#" className="hover:text-emerald-600 transition-colors">Fiscalité</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-slate-800 mb-6 uppercase tracking-widest text-xs">Société</h4>
              <ul className="space-y-4 text-slate-500 text-sm font-semibold">
                <li><Link href="#" className="hover:text-emerald-600 transition-colors">À propos</Link></li>
                <li><Link href="#" className="hover:text-emerald-600 transition-colors">Actualités</Link></li>
                <li><Link href="#" className="hover:text-emerald-600 transition-colors">Contact</Link></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-xs text-slate-400 font-bold uppercase tracking-widest">
              © 2026 Harmonie Patrimoine. Membre agréé par l'AMF.
            </div>
            <div className="flex gap-10 text-[11px] font-bold text-slate-400 uppercase tracking-widest">
              <Link href="#" className="hover:text-emerald-600 transition-colors">Mentions Légales</Link>
              <Link href="#" className="hover:text-emerald-600 transition-colors">Confidentialité</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
