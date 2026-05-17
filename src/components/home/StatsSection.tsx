"use client";

import { IconEuro, IconClock, IconGauge } from "./Icons";

export default function StatsSection() {
  return (
    <div className="w-full bg-white py-16 border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-center">
          <Stat 
            icon={<IconGauge className="text-[#2563EB]" size={32} />} 
            num="3" 
            label="Simulateurs gratuits" 
          />
          <Stat 
            icon={<IconEuro className="text-[#2563EB]" size={32} />} 
            num="+48" 
            label="Aides identifiées" 
          />
          <Stat 
            icon={<IconClock className="text-[#2563EB]" size={32} />} 
            num="2 min" 
            label="Pour votre résultat" 
          />
        </div>
        <div className="mt-12 text-center">
          <span className="inline-block bg-[#DBEAFE] text-[#1E40AF] text-3xl md:text-5xl font-black px-6 md:px-8 py-2 md:py-3 rounded-2xl transform -rotate-1 shadow-sm">
            Gratuit!
          </span>
        </div>
      </div>
    </div>
  );
}

function Stat({ icon, num, label }: { icon: React.ReactNode; num: string; label: string }) {
  return (
    <div className="flex flex-col items-center group">
      <div className="mb-4 transform group-hover:scale-110 transition-transform duration-300">
        {icon}
      </div>
      <div className="text-4xl md:text-5xl font-extrabold text-[#1E3A5F] mb-2 tracking-tight">{num}</div>
      <div className="text-xs font-bold text-gray-400 uppercase tracking-[0.2em]">{label}</div>
    </div>
  );
}
