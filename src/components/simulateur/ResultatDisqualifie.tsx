"use client";

interface ResultatDisqualifieProps {
  onRestart: () => void;
}

export default function ResultatDisqualifie({ onRestart }: ResultatDisqualifieProps) {
  return (
    <div className="text-center py-8">
      <div className="text-5xl mb-4">😕</div>
      <h2 className="text-2xl font-semibold text-gray-900 mb-2">
        Ce simulateur ne vous correspond pas
      </h2>
      <p className="text-sm text-gray-500 mt-2 leading-relaxed">
        Notre simulateur est reserve aux proprietaires de maisons individuelles
        de plus de 15 ans.
      </p>
      <button
        onClick={onRestart}
        className="mt-6 bg-transparent border-none text-gray-500 hover:text-gray-900 text-sm cursor-pointer transition-colors"
      >
        ← Recommencer
      </button>
    </div>
  );
}
