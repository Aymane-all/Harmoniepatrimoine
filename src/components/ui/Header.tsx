"use client";

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { IconChevronDown, IconMenu, IconX } from './Icons';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const pathname = usePathname();

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    const NAV_LINKS = [
        { name: "Accueil", href: "/" },
        { name: "Simulateurs", href: "/#simulateurs" },
        { name: "Blog", href: "/blog" },
    ];

    const isSticky = pathname === "/" || pathname.startsWith("/blog");

    return (
        <>
            <header className={`w-full bg-white border-b border-gray-100 px-6 py-4 z-50 transition-all ${
                isSticky ? "fixed top-0 left-0 right-0 shadow-sm" : "relative"
            }`}>
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    {/* Logo à gauche */}
                    <Link href="/" className="flex items-center gap-2 cursor-pointer">
                        <div className="w-6 h-6 bg-black rounded-full flex items-center justify-center">
                            <div className="w-2 h-2 bg-white rounded-full"></div>
                        </div>
                        <span className="font-bold text-[13px] uppercase tracking-tighter text-gray-800">
                            Ma France Locale
                        </span>
                    </Link>

                    {/* Navigation à droite (Desktop) */}
                    <nav className="hidden md:flex items-center gap-8">
                        {NAV_LINKS.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="text-xs font-bold uppercase tracking-widest text-gray-500 hover:text-blue-600 transition-colors"
                            >
                                {link.name}
                            </Link>
                        ))}
                    </nav>

                    {/* Hamburger Menu (Mobile) */}
                    <button
                        className="md:hidden text-gray-600 focus:outline-none"
                        onClick={toggleMenu}
                    >
                        {isMenuOpen ? <IconX size={24} /> : <IconMenu size={24} />}
                    </button>
                </div>

                {/* Mobile Navigation Menu */}
                {isMenuOpen && (
                    <div className="md:hidden absolute top-full left-0 w-full bg-white border-b border-gray-100 shadow-xl animate-fade-in">
                        <nav className="flex flex-col p-6 gap-4">
                            {NAV_LINKS.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className="text-sm font-bold uppercase tracking-widest text-gray-600 hover:text-blue-600 py-2 border-b border-gray-50 last:border-0"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </nav>
                    </div>
                )}
            </header>
            {isSticky && <div className="h-[72px] w-full" />}
        </>
    );
};

export default Header;