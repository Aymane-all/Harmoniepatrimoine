"use client";

interface P { size?: number; className?: string; }

export const IconCheck = ({ size = 16, className = "" }: P) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" stroke="currentColor"
    strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polyline points="3 8 7 12 13 5" />
  </svg>
);

export const IconArrowRight = ({ size = 16, className = "" }: P) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" stroke="currentColor"
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <line x1="3" y1="8" x2="13" y2="8" />
    <polyline points="9 4 13 8 9 12" />
  </svg>
);

export const IconPlus = ({ size = 20, className = "" }: P) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2" strokeLinecap="round" className={className}>
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

export const IconMinus = ({ size = 20, className = "" }: P) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2" strokeLinecap="round" className={className}>
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

export const IconStar = ({ size = 24, className = "" }: P) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 2l2.4 7.4H22l-6 4.6 2.3 7.4-6.3-4.6L5.7 21 8 14 2 9.4h7.6z" />
  </svg>
);

export const IconQuote = ({ size = 28, className = "" }: P) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M7 7h4v4H8.5c0 2 1 3 2.5 3v2c-3 0-5-2-5-5V7zm9 0h4v4h-2.5c0 2 1 3 2.5 3v2c-3 0-5-2-5-5V7z" />
  </svg>
);

export const IconArrowLeftCircle = ({ size = 36, className = "" }: P) => (
  <svg width={size} height={size} viewBox="0 0 36 36" fill="none" className={className}>
    <circle cx="18" cy="18" r="17" stroke="currentColor" strokeWidth="1.5" />
    <path d="M20 13l-5 5 5 5" stroke="currentColor" strokeWidth="1.8"
      strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const IconArrowRightCircle = ({ size = 36, className = "" }: P) => (
  <svg width={size} height={size} viewBox="0 0 36 36" fill="none" className={className}>
    <circle cx="18" cy="18" r="17" stroke="currentColor" strokeWidth="1.5" />
    <path d="M16 13l5 5-5 5" stroke="currentColor" strokeWidth="1.8"
      strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const IconSparkle = ({ size = 80, className = "" }: P) => (
  <svg width={size} height={size} viewBox="0 0 80 80" fill="none" className={className}>
    <path d="M40 8c2 18 12 28 30 32-18 4-28 14-30 32-2-18-12-28-30-32 18-4 28-14 30-32z"
      fill="currentColor" />
    <circle cx="64" cy="20" r="4" fill="currentColor" />
  </svg>
);

export const IconEuro = ({ size = 24, className = "" }: P) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M18 7A6 6 0 0 0 8 12a6 6 0 0 0 10 5" />
    <line x1="3" y1="10" x2="13" y2="10" />
    <line x1="3" y1="14" x2="11" y2="14" />
  </svg>
);

export const IconClock = ({ size = 24, className = "" }: P) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 2" />
  </svg>
);

export const IconGauge = ({ size = 24, className = "" }: P) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M12 14l4-4" />
    <path d="M3.5 18a9 9 0 1 1 17 0" />
    <circle cx="12" cy="14" r="1.5" />
  </svg>
);
