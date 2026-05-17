"use client";

// ============================================================
// ICONES SVG SPECIFIQUES AU SIMULATEUR DPE
// ============================================================

interface IconProps {
  size?: number;
  className?: string;
}

// Building / Historical
export function IconHistorical({ size = 24, className = "" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M3 21h18" />
      <path d="M3 10h18" />
      <path d="M5 6l7-3 7 3" />
      <path d="M4 10v11M20 10v11" />
      <path d="M8 14v3M12 14v3M16 14v3" />
    </svg>
  );
}

export function IconBricks({ size = 24, className = "" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="3" y="4" width="18" height="5" rx="0.5" />
      <rect x="3" y="9" width="9" height="5" rx="0.5" />
      <rect x="12" y="9" width="9" height="5" rx="0.5" />
      <rect x="3" y="14" width="18" height="5" rx="0.5" />
    </svg>
  );
}

export function IconHouse({ size = 24, className = "" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M3 11l9-8 9 8" />
      <path d="M5 10v10h14V10" />
      <path d="M10 20v-6h4v6" />
    </svg>
  );
}

export function IconHouseModern({ size = 24, className = "" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M3 12l9-9 9 9" />
      <path d="M5 11v10h14V11" />
      <line x1="9" y1="14" x2="9" y2="20" />
      <line x1="15" y1="14" x2="15" y2="20" />
      <line x1="9" y1="14" x2="15" y2="14" />
    </svg>
  );
}

export function IconBuildings({ size = 24, className = "" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="3" y="5" width="8" height="16" rx="1" />
      <rect x="13" y="9" width="8" height="12" rx="1" />
      <line x1="6" y1="9" x2="6" y2="9.01" />
      <line x1="8" y1="9" x2="8" y2="9.01" />
      <line x1="6" y1="13" x2="6" y2="13.01" />
      <line x1="8" y1="13" x2="8" y2="13.01" />
      <line x1="6" y1="17" x2="6" y2="17.01" />
      <line x1="16" y1="13" x2="16" y2="13.01" />
      <line x1="18" y1="13" x2="18" y2="13.01" />
      <line x1="16" y1="17" x2="16" y2="17.01" />
    </svg>
  );
}

export function IconSparkles({ size = 24, className = "" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M12 3v3M12 18v3M3 12h3M18 12h3" />
      <path d="M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

// Isolation
export function IconSnowflake({ size = 24, className = "" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <line x1="12" y1="2" x2="12" y2="22" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <line x1="5" y1="5" x2="19" y2="19" />
      <line x1="5" y1="19" x2="19" y2="5" />
    </svg>
  );
}

export function IconCheckCircle({ size = 24, className = "" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="12" cy="12" r="10" />
      <path d="M8 12l3 3 5-5" />
    </svg>
  );
}

// Fenetres
export function IconWindow({ size = 24, className = "" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="4" y="4" width="16" height="16" rx="1" />
      <line x1="12" y1="4" x2="12" y2="20" />
      <line x1="4" y1="12" x2="20" y2="12" />
    </svg>
  );
}

export function IconTrophy({ size = 24, className = "" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M6 9H4a2 2 0 0 1-2-2V4h4" />
      <path d="M18 9h2a2 2 0 0 0 2-2V4h-4" />
      <path d="M6 4h12v6a6 6 0 0 1-12 0V4z" />
      <line x1="12" y1="15" x2="12" y2="20" />
      <line x1="8" y1="22" x2="16" y2="22" />
      <line x1="12" y1="20" x2="12" y2="22" />
    </svg>
  );
}

// Chauffage
export function IconOilTank({ size = 24, className = "" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="5" y="5" width="14" height="16" rx="2" />
      <line x1="5" y1="10" x2="19" y2="10" />
      <line x1="8" y1="14" x2="16" y2="14" />
      <path d="M10 3v2M14 3v2" />
    </svg>
  );
}

export function IconFlame({ size = 24, className = "" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M8.5 14.5A2.5 2.5 0 0 0 11 17c1.5 0 3-1 3-3 0-2-1.5-2.5-2-4-.5-1 .5-2 0-3-1-2-4-2-4 0 0 2 2 3 2 5z" />
      <path d="M18 14c0 4-3 7-6 7s-6-3-6-7c0-3 1-5 2-6 0 2 1 3 2 3 0-2 1-3 2-4 1 2 3 3 3 5 1-1 2-2 2-2 0 2 1 3 1 4z" />
    </svg>
  );
}

export function IconBolt({ size = 24, className = "" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  );
}

export function IconRecycle({ size = 24, className = "" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M7 19H5a2 2 0 0 1-2-2v-2" />
      <path d="M5 17l3-3 3 3" />
      <path d="M17 5h2a2 2 0 0 1 2 2v2" />
      <path d="M19 7l-3 3-3-3" />
      <path d="M9 4l3 3 3-3" />
      <path d="M12 7v10" />
      <path d="M15 20l-3-3-3 3" />
    </svg>
  );
}

export function IconPlug({ size = 24, className = "" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M9 2v6M15 2v6" />
      <path d="M6 8h12v3a6 6 0 0 1-12 0V8z" />
      <path d="M12 17v5" />
    </svg>
  );
}

// ECS
export function IconWater({ size = 24, className = "" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M12 2.5c-3 4-7 8-7 12a7 7 0 0 0 14 0c0-4-4-8-7-12z" />
    </svg>
  );
}

export function IconSun({ size = 24, className = "" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="12" cy="12" r="4" />
      <line x1="12" y1="2" x2="12" y2="4" />
      <line x1="12" y1="20" x2="12" y2="22" />
      <line x1="4.9" y1="4.9" x2="6.3" y2="6.3" />
      <line x1="17.7" y1="17.7" x2="19.1" y2="19.1" />
      <line x1="2" y1="12" x2="4" y2="12" />
      <line x1="20" y1="12" x2="22" y2="12" />
      <line x1="4.9" y1="19.1" x2="6.3" y2="17.7" />
      <line x1="17.7" y1="6.3" x2="19.1" y2="4.9" />
    </svg>
  );
}

// VMC
export function IconNoAir({ size = 24, className = "" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="12" cy="12" r="10" />
      <line x1="4.9" y1="4.9" x2="19.1" y2="19.1" />
      <path d="M8 14c1-1 3-1 4 0s3 1 4 0" />
    </svg>
  );
}

export function IconWind({ size = 24, className = "" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M9.5 4.5a3 3 0 1 1 3 3H2" />
      <path d="M16 8a3 3 0 1 1 3 3h-17" />
      <path d="M12.5 19.5a3 3 0 1 0 3-3H2" />
    </svg>
  );
}

export function IconCircularFlow({ size = 24, className = "" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M21 12a9 9 0 0 1-9 9c-2.4 0-4.6-1-6.2-2.5L3 21" />
      <path d="M3 12a9 9 0 0 1 9-9c2.4 0 4.6 1 6.2 2.5L21 3" />
      <path d="M21 3v6h-6M3 21v-6h6" />
    </svg>
  );
}

// UI (check)
export function IconCheck({ size = 16, className = "" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" stroke="currentColor"
      strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <polyline points="3 8 7 12 13 5" />
    </svg>
  );
}

// Map nom -> composant
export const ICONS_DPE = {
  historical: IconHistorical,
  bricks: IconBricks,
  house: IconHouse,
  houseModern: IconHouseModern,
  buildings: IconBuildings,
  sparkles: IconSparkles,
  snowflake: IconSnowflake,
  checkCircle: IconCheckCircle,
  window: IconWindow,
  trophy: IconTrophy,
  oilTank: IconOilTank,
  flame: IconFlame,
  bolt: IconBolt,
  recycle: IconRecycle,
  plug: IconPlug,
  water: IconWater,
  sun: IconSun,
  noAir: IconNoAir,
  wind: IconWind,
  circularFlow: IconCircularFlow,
} as const;

export type IconDpeName = keyof typeof ICONS_DPE;