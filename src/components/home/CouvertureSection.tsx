import Link from "next/link";

const VILLES = [
  { score: "44", nom: "Nantes", region: "France", desc: "10+ years of experience in digital marketing. Expertise in SEO, PPC, and content strategy." },
  { score: "85", nom: "La Roche-sur-Yon", region: "France", desc: "7+ years of experience in project management and team leadership. Strong organizational and communication skills." },
  { score: "49", nom: "Angers", region: "France", desc: "5+ years of experience in SEO and content creation. Proficient in keyword research and on-page optimization." },
  { score: "79", nom: "Niort", region: "France", desc: "8+ years of experience in social media marketing. Skilled in campaign management and performance analysis." },
  { score: "86", nom: "Poitiers", region: "France", desc: "6+ years of experience in social media marketing. Proficient in content writing, analyzing metrics, and building engagement." },
  { score: "37", nom: "Tours", region: "France", desc: "5+ years of experience in writing and editing. Skilled in creating compelling, SEO-optimized content for various industries." },
  { score: "72", nom: "Le Mans", region: "France", desc: "7+ years of experience in digital marketing. Expertise in SEO, PPC, and content strategy." },
  { score: "41", nom: "Blois", region: "France", desc: "7+ years of experience in project management and team leadership. Strong organizational and communication skills." },
  { score: "28", nom: "Chartres", region: "France", desc: "5+ years of experience in SEO and content creation. Proficient in keyword research and on-page optimization." },
  { score: "53", nom: "Laval", region: "France", desc: "5+ years of experience in paid search advertising. Skilled in campaign management and performance analysis." },
];

export default function CouvertureSection() {
  return (
    <section className="w-full bg-[#F5F5F5] py-14">
      <div className="max-w-5xl mx-auto px-5 md:px-8">
        <div className="mb-8">
          <span className="inline-block text-[10px] font-bold text-white bg-[#1E3A5F] px-2.5 py-1 rounded uppercase tracking-wider mb-3">
            Couverture locale
          </span>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
            Vos aides, dans votre region
          </h2>
          <p className="text-sm text-gray-500 mt-2 max-w-2xl">
            Les montants varient selon votre departement. Nos simulateurs
            integrent les aides locales pour chaque chantier eux.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {VILLES.map((v) => (
            <div key={v.nom} className="bg-white rounded-xl border border-gray-200 p-5">
              <div className="flex items-start gap-3 mb-3">
                <div className="w-12 h-12 rounded-lg bg-[#2563EB] text-white text-lg font-bold flex items-center justify-center flex-shrink-0">
                  {v.score}
                </div>
                <div>
                  <div className="text-sm font-bold text-gray-900">{v.nom}</div>
                  <div className="text-xs text-gray-400">{v.region}</div>
                </div>
              </div>
              <p className="text-xs text-gray-500 leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
