"use client";

import { useState } from "react";
import { IconSparkle } from "./Icons";

export default function ContactSection() {
  const [type, setType] = useState<"consultation" | "controle">("consultation");
  const [nom, setNom] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = () => {
    // TODO : brancher l'envoi (Supabase / email)
    console.log({ type, nom, email, message });
    alert("Message envoye (a brancher sur votre backend).");
  };

  return (
    <section className="w-full bg-[#F5F5F5] py-14">
      <div className="max-w-4xl mx-auto px-5 md:px-8">
        <div className="mb-8">
          <span className="inline-block text-[10px] font-bold text-white bg-[#1E3A5F] px-2.5 py-1 rounded uppercase tracking-wider mb-3">
            Contactez nous
          </span>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 p-7 md:p-10 flex flex-col md:flex-row gap-8">
          {/* Formulaire */}
          <div className="flex-1">
            {/* Type */}
            <div className="flex gap-4 mb-5">
              <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
                <input
                  type="radio"
                  checked={type === "consultation"}
                  onChange={() => setType("consultation")}
                  className="accent-[#2563EB]"
                />
                Consultation
              </label>
              <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
                <input
                  type="radio"
                  checked={type === "controle"}
                  onChange={() => setType("controle")}
                  className="accent-[#2563EB]"
                />
                Demande de controle de maison
              </label>
            </div>

            {/* Nom */}
            <div className="mb-4">
              <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2">
                Nom complet
              </label>
              <input
                type="text"
                value={nom}
                onChange={(e) => setNom(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm text-gray-900 bg-white outline-none focus:border-[#2563EB] transition-colors"
              />
            </div>

            {/* Email */}
            <div className="mb-4">
              <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm text-gray-900 bg-white outline-none focus:border-[#2563EB] transition-colors"
              />
            </div>

            {/* Message */}
            <div className="mb-5">
              <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2">
                Message
              </label>
              <textarea
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm text-gray-900 bg-white outline-none focus:border-[#2563EB] transition-colors resize-none"
              />
            </div>

            <button
              onClick={handleSubmit}
              className="w-full py-3 bg-[#2563EB] hover:bg-[#1E40AF] text-white text-sm font-semibold rounded-lg transition-colors"
            >
              Envoyer le message
            </button>
          </div>

          {/* Décoration */}
          <div className="hidden md:flex items-center justify-center text-[#1E3A5F] flex-shrink-0">
            <IconSparkle size={110} />
          </div>
        </div>
      </div>
    </section>
  );
}
