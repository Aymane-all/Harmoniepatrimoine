"use client";

import { IconArrowLeft } from "../ui/Icons";

interface SimulateurLayoutProps {
  children: React.ReactNode;
  activeTab?: "details" | "criteres" | "specifications";
  onBack?: () => void;
}

export default function SimulateurLayout({
  children,
  activeTab,
  onBack,
}: SimulateurLayoutProps) {
  return (
    <div
      className="min-h-screen w-full flex flex-col items-center px-4 py-8 md:py-12"
      style={{
        backgroundImage: `
          linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)),
          url("/images/Rectangle 16.png"),
          url("/images/simulback.jpeg")
        `,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="w-full max-w-lg bg-white rounded-3xl shadow-2xl relative overflow-hidden">
        {/* Header area with Back button */}
        <div className="absolute top-6 left-6 z-10">
          {onBack && (
            <button
              onClick={onBack}
              className="flex items-center gap-1.5 text-gray-400 hover:text-gray-900 transition-colors text-sm font-medium"
            >
              <IconArrowLeft size={16} />
              Retour
            </button>
          )}
        </div>

        {/* Logo area */}
        <div className="pt-8 pb-2 px-6 md:px-8">
          <div className="text-center mb-4">
            <div className="text-[10px] font-bold tracking-[0.2em] text-gray-400 uppercase">
              Mafrance locale
            </div>
          </div>

          {/* Onglets si activeTab est present */}
          {activeTab && (
            <div className="flex justify-center gap-2 mb-4">
              <Tab label="Details" active={activeTab === "details"} />
              <Tab label="Criteres" active={activeTab === "criteres"} />
              <Tab label="Specifications" active={activeTab === "specifications"} />
            </div>
          )}
        </div>

        {/* Contenu du simulateur */}
        <div className="px-6 md:px-8 pb-10 pt-2">
          {children}
        </div>
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