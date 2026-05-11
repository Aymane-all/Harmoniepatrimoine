"use client";

interface BtnNextProps {
  onClick: () => void;
  disabled?: boolean;
  children: React.ReactNode;
  className?: string;
}

export function BtnNext({ onClick, disabled, children, className = "" }: BtnNextProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`
        w-full py-3 px-4 rounded-lg text-sm font-semibold transition-colors
        ${disabled
          ? "bg-gray-200 text-gray-400 cursor-not-allowed"
          : "bg-gray-900 text-white hover:bg-brand-500 cursor-pointer"
        }
        ${className}
      `}
    >
      {children}
    </button>
  );
}

interface BtnBackProps {
  onClick: () => void;
}

export function BtnBack({ onClick }: BtnBackProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="block bg-transparent border-none text-gray-400 hover:text-gray-900 text-sm cursor-pointer py-2 mt-2 transition-colors"
    >
      ← Retour
    </button>
  );
}
