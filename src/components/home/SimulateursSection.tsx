import Link from "next/link";
import Image from "next/image";
import { IconArrowRight } from "./Icons";

const SIMULATEURS = [
  {
    href: "/simulateur-aides",
    titre: "Calculez vos aides financières",
    desc: "Vérifiez votre éligibilité aux aides MaPrimeRénov' et CEE en quelques clics.",
    img: "/images/client-house.png",
  },
  {
    href: "/simulateur-dpe",
    titre: "Simulation DPE rapide",
    desc: "Une première estimation de votre performance énergétique sans déplacement.",
    img: "/images/client-house.png",
  },
  {
    href: "/simulateurCon",
    titre: "Estimation confort maison",
    desc: "Obtenez un score de confort thermique et des conseils personnalisés.",
    img: "/images/client-house.png",
  },
];

export default function SimulateursSection() {
  return (
    <section id="simulateurs" className="w-full bg-[#F9FAFB] py-20">
      <div className="max-w-5xl mx-auto px-6">
        <div className="mb-12">
          <span className="text-xs font-bold text-[#2563EB] uppercase tracking-widest">Nos simulateurs</span>
          <h2 className="text-2xl md:text-4xl font-bold text-[#1E3A5F] mt-2 leading-tight">
            Trois simulateurs pour vous aider
          </h2>
        </div>

        <div className="flex flex-col gap-8">
          {SIMULATEURS.map((s, i) => (
            <Link
              key={i}
              href={s.href}
              className="group flex flex-col md:flex-row bg-white rounded-3xl shadow-sm hover:shadow-xl transition-all overflow-hidden border border-gray-100"
            >
              <div className="flex-1 p-8 md:p-12 flex flex-col justify-center">
                <h3 className="text-2xl font-bold text-[#1E3A5F] mb-4 group-hover:text-[#2563EB] transition-colors">
                  {s.titre}
                </h3>
                <p className="text-gray-600 mb-8 max-w-md leading-relaxed">
                  {s.desc}
                </p>
                <div className="inline-flex items-center gap-2 px-6 py-3 bg-[#1E40AF] text-white font-bold rounded-xl w-fit group-hover:bg-[#2563EB] transition-colors">
                  Lancer le test
                  <IconArrowRight size={16} />
                </div>
              </div>
              <div className="md:w-[40%] h-64 md:h-auto overflow-hidden relative">
                <Image
                  src={s.img}
                  alt={s.titre}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, 40vw"
                />
                <div className="absolute inset-0 bg-blue-600/0 group-hover:bg-blue-600/10 transition-colors duration-500" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
