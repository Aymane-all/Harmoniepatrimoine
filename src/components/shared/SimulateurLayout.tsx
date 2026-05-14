"use client";

import FrenchFlag from "./FrenchFlag";

interface SimulateurLayoutProps {
  children: React.ReactNode;

}

export default function SimulateurLayout({
  children,

}: SimulateurLayoutProps) {
  return (
    <div
      className="min-h-screen w-full flex flex-col items-center px-4 py-8 md:py-12"
      style={{
        backgroundColor: "#4A5560",
        backgroundImage: `
          linear-gradient(rgba(74, 85, 96, 0.85), rgba(74, 85, 96, 0.85)),
          url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 800'%3E%3Crect fill='%23394452' width='1200' height='800'/%3E%3Cg fill='%23475260' opacity='0.4'%3E%3Cpath d='M100 600 L100 400 L300 250 L500 400 L500 600 Z'/%3E%3Crect x='150' y='450' width='40' height='60' fill='%23394452'/%3E%3Crect x='220' y='450' width='40' height='60' fill='%23394452'/%3E%3Cpath d='M700 600 L700 350 L900 200 L1100 350 L1100 600 Z'/%3E%3Crect x='750' y='400' width='50' height='80' fill='%23394452'/%3E%3Crect x='830' y='400' width='50' height='80' fill='%23394452'/%3E%3C/g%3E%3C/svg%3E")
        `,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-2xl relative">
        {/* Header drapeau + nom + onglets */}
        <div className="pt-8 pb-2 px-6 md:px-8">
          <div className="flex justify-center mb-3">
            <FrenchFlag />
          </div>
          <div className="text-center mb-4">
            <div className="text-xs font-semibold tracking-widest text-gray-700 uppercase">
              Mafrance locale
            </div>
          </div>

        </div>

        {/* Contenu du simulateur (vos composants existants) */}
        <div className="px-6 md:px-8 pb-8 pt-2">
          {children}
        </div>
      </div>

      {/* Footer */}
      <div className="mt-6 text-xs text-white/60 text-center">
        © 2026 Harmonie Patrimoine ·{" "}
        <a href="#" className="text-white/80 hover:text-white hover:underline">
          Mentions legales
        </a>{" "}
        ·{" "}
        <a href="#" className="text-white/80 hover:text-white hover:underline">
          Protection des donnees (RGPD)
        </a>
      </div>
    </div>
  );
}

function Tab({ label, active }: { label: string; active: boolean }) {
  return (
    <div
      className={`
        text-[10px] font-medium px-3 py-1 rounded-md transition-colors
        ${active ? "bg-[#DBEAFE] text-[#1E40AF]" : "bg-gray-100 text-gray-500"}
      `}
    >
      {label}
    </div>
  );
}