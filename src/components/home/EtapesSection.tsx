"use client";

const ETAPES = [
  {
    num: "1",
    titre: "Faites l'un de nos simulateurs",
    desc: "Simulateur d'aides, test de confort ou DPE — 1 a 3 minutes, gratuit, resultat immediat.",
  },
  {
    num: "2",
    titre: "Controle gratuit a domicile",
    desc: "Un conseiller local de votre region vous rappelle sous 24h et organise un controle gratuit chez vous, sans engagement.",
  },
  {
    num: "3",
    titre: "Resultats personnalises",
    desc: "Le controle couvre l'analyse thermique, le DPE estime, la detection d'humidite et le plan d'aides disponibles pour votre maison.",
  },
  {
    num: "4",
    titre: "Questions ? Nos conseillers sont la",
    desc: "Aides, travaux, DPE, eligibilite — nos conseillers telephoniques repondent a toutes vos questions sur votre situation.",
  },
];

export default function EtapesSection() {
  return (
    <section className="w-full bg-white py-14">
      <div className="max-w-4xl mx-auto px-5 md:px-8">
        <div className="mb-8">
          <span className="inline-block text-[10px] font-bold text-white bg-[#1E3A5F] px-2.5 py-1 rounded uppercase tracking-wider mb-3">
            Comment ca marche
          </span>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
            Du simulateur au{" "}
            <span className="text-[#2563EB]">Controle Gratuit</span> en 24h
          </h2>
          <p className="text-sm text-gray-500 mt-2">
            Calculez exactement a combien d'aides vous avez droit
            MaPrimeRenov', prime CEE, aides locales — selon vos revenus et votre departement.
          </p>
        </div>

        <div className="flex flex-col gap-2">
          {ETAPES.map((e) => (
            <div
              key={e.num}
              className="flex items-start gap-4 bg-[#F5F5F5] rounded-xl p-5"
            >
              <div className="w-9 h-9 rounded-full bg-[#2563EB] text-white text-sm font-bold flex items-center justify-center flex-shrink-0">
                {e.num}
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-bold text-gray-900 mb-1">
                  {e.titre}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {e.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
