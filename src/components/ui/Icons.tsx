"use client";

// ============================================================
// BIBLIOTHEQUE D'ICONES SVG
// ============================================================
// Icones professionnelles pour remplacer les emojis.
// Toutes utilisent currentColor pour s'adapter a la couleur du texte.
// ============================================================

interface IconProps {
    size?: number;
    className?: string;
}

// ───── ICONES MAISON / LOGEMENT ─────

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

export function IconBuilding({ size = 24, className = "" }: IconProps) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
            strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
            <rect x="4" y="3" width="16" height="18" rx="1" />
            <line x1="9" y1="7" x2="9" y2="7.01" />
            <line x1="15" y1="7" x2="15" y2="7.01" />
            <line x1="9" y1="12" x2="9" y2="12.01" />
            <line x1="15" y1="12" x2="15" y2="12.01" />
            <line x1="9" y1="17" x2="9" y2="17.01" />
            <line x1="15" y1="17" x2="15" y2="17.01" />
        </svg>
    );
}

export function IconKey({ size = 24, className = "" }: IconProps) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
            strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
            <circle cx="8" cy="15" r="4" />
            <path d="M10.85 12.15L19 4" />
            <path d="M18 5l3 3" />
            <path d="M15 8l3 3" />
        </svg>
    );
}

export function IconHistorical({ size = 24, className = "" }: IconProps) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
            strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
            <path d="M3 21h18" />
            <path d="M3 10h18" />
            <path d="M5 6l7-3 7 3" />
            <path d="M4 10v11" />
            <path d="M20 10v11" />
            <path d="M8 14v3" />
            <path d="M12 14v3" />
            <path d="M16 14v3" />
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

export function IconNew({ size = 24, className = "" }: IconProps) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
            strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
    );
}

// ───── ICONES CHAUFFAGE ─────

export function IconOilTank({ size = 24, className = "" }: IconProps) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
            strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
            <rect x="5" y="5" width="14" height="16" rx="2" />
            <line x1="5" y1="10" x2="19" y2="10" />
            <line x1="8" y1="14" x2="16" y2="14" />
            <path d="M10 3v2" />
            <path d="M14 3v2" />
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

export function IconLeaf({ size = 24, className = "" }: IconProps) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
            strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
            <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19.2 2.96c1.4 9.3-3.2 18-8.2 17.04z" />
            <path d="M2 21c0-3 1.85-5.36 5.08-6" />
        </svg>
    );
}

// ───── ICONES FOYER / FAMILLE ─────

export function IconUser({ size = 24, className = "" }: IconProps) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
            strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
        </svg>
    );
}

export function IconFamily({ size = 24, className = "" }: IconProps) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
            strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
            <circle cx="6" cy="6" r="2.5" />
            <circle cx="18" cy="6" r="2.5" />
            <circle cx="12" cy="9" r="1.8" />
            <path d="M2 19v-2a3 3 0 0 1 3-3h2" />
            <path d="M17 14h2a3 3 0 0 1 3 3v2" />
            <path d="M9 19v-2a3 3 0 0 1 3-3 3 3 0 0 1 3 3v2" />
        </svg>
    );
}

// ───── ICONES PROBLEMES ─────

export function IconSnowflake({ size = 24, className = "" }: IconProps) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
            strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
            <line x1="12" y1="2" x2="12" y2="22" />
            <line x1="2" y1="12" x2="22" y2="12" />
            <line x1="5" y1="5" x2="19" y2="19" />
            <line x1="5" y1="19" x2="19" y2="5" />
            <path d="M12 5l-2 2 2 2 2-2-2-2z" />
            <path d="M12 17l-2-2 2-2 2 2-2 2z" />
        </svg>
    );
}

export function IconDroplet({ size = 24, className = "" }: IconProps) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
            strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
            <path d="M12 2.5c-3 4-7 8-7 12a7 7 0 0 0 14 0c0-4-4-8-7-12z" />
        </svg>
    );
}

export function IconEuro({ size = 24, className = "" }: IconProps) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
            strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
            <path d="M18 7A6 6 0 0 0 8 12a6 6 0 0 0 10 5" />
            <line x1="3" y1="10" x2="13" y2="10" />
            <line x1="3" y1="14" x2="11" y2="14" />
        </svg>
    );
}

export function IconSearch({ size = 24, className = "" }: IconProps) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
            strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
            <circle cx="11" cy="11" r="7" />
            <line x1="16.5" y1="16.5" x2="21" y2="21" />
        </svg>
    );
}

// ───── ICONES UI ─────

export function IconCheck({ size = 16, className = "" }: IconProps) {
    return (
        <svg width={size} height={size} viewBox="0 0 16 16" fill="none" stroke="currentColor"
            strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
            <polyline points="3 8 7 12 13 5" />
        </svg>
    );
}

export function IconArrowLeft({ size = 16, className = "" }: IconProps) {
    return (
        <svg width={size} height={size} viewBox="0 0 16 16" fill="none" stroke="currentColor"
            strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
            <line x1="13" y1="8" x2="3" y2="8" />
            <polyline points="7 4 3 8 7 12" />
        </svg>
    );
}

export function IconLock({ size = 16, className = "" }: IconProps) {
    return (
        <svg width={size} height={size} viewBox="0 0 16 16" fill="none" stroke="currentColor"
            strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
            <rect x="3" y="7" width="10" height="7" rx="1" />
            <path d="M5 7V5a3 3 0 0 1 6 0v2" />
        </svg>
    );
}

// ───── MAP NOM → COMPOSANT (utile pour les choices) ─────

export const ICONS = {
    house: IconHouse,
    building: IconBuilding,
    key: IconKey,
    historical: IconHistorical,
    bricks: IconBricks,
    new: IconNew,
    oilTank: IconOilTank,
    flame: IconFlame,
    bolt: IconBolt,
    leaf: IconLeaf,
    user: IconUser,
    family: IconFamily,
    snowflake: IconSnowflake,
    droplet: IconDroplet,
    euro: IconEuro,
    search: IconSearch,
} as const;

export type IconName = keyof typeof ICONS;