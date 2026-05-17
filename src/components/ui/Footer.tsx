import Link from 'next/link';
import { IconFacebook, IconTwitter, IconInstagram, IconMail } from './Icons';

const Footer = () => {
    return (
        <footer className="w-full bg-white text-gray-900 pt-12 md:pt-20 pb-8 md:pb-10 border-t border-gray-100">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-12 mb-12 md:mb-16 text-center md:text-left">

                    {/* Colonne 1: Brand & Social */}
                    <div className="flex flex-col items-center md:items-start gap-6">
                        <div className="flex items-center gap-2">
                            {/* Logo exact du Header */}
                            <div className="w-6 h-6 bg-black rounded-full flex items-center justify-center">
                                <div className="w-2 h-2 bg-white rounded-full"></div>
                            </div>
                            <span className="font-bold text-lg tracking-tight uppercase">Ma France Locale</span>
                        </div>

                        <div className="flex gap-4 text-gray-400">
                            <IconFacebook size={20} className="cursor-pointer hover:text-blue-600 transition-colors" />
                            <IconTwitter size={20} className="cursor-pointer hover:text-blue-400 transition-colors" />
                            <IconInstagram size={20} className="cursor-pointer hover:text-pink-600 transition-colors" />
                            <IconMail size={20} className="cursor-pointer hover:text-blue-500 transition-colors" />
                        </div>
                    </div>

                    {/* Colonne 2: Adresse */}
                    <div>
                        <h4 className="font-bold text-md mb-4 md:mb-6 uppercase tracking-wider text-xs">Adresse</h4>
                        <div className="text-sm text-gray-500 leading-relaxed">
                            <p>13 Avenue du Général de Gaulle</p>
                            <p>92140 Clamart</p>
                            <p>France</p>
                        </div>
                    </div>

                    {/* Colonne 3: Téléphone */}
                    <div>
                        <h4 className="font-bold text-md mb-4 md:mb-6 uppercase tracking-wider text-xs">Téléphone</h4>
                        <div className="text-sm text-gray-500 leading-relaxed">
                            <p className="font-bold text-gray-900 hover:text-blue-600 transition-colors cursor-pointer">
                                01 23 45 67 89
                            </p>
                            <p className="text-xs mt-1">Lundi - Vendredi, 9h-18h</p>
                        </div>
                    </div>

                    {/* Colonne 4: Email */}
                    <div>
                        <h4 className="font-bold text-md mb-4 md:mb-6 uppercase tracking-wider text-xs">Email</h4>
                        <div className="text-sm text-gray-500 leading-relaxed">
                            <a href="mailto:contact@mafrancelocale.fr" className="hover:text-blue-600 transition-colors">
                                contact@mafrancelocale.com
                            </a>
                            <p className="text-xs mt-1">Réponse sous 24h ouvré</p>
                        </div>
                    </div>
                </div>

                {/* Barre de Copyright en bas */}
                <div className="pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-xs text-gray-400 uppercase tracking-widest">
                        © 2026 Ma France Locale. Tous droits réservés.
                    </p>
                    <div className="flex gap-6 text-xs text-gray-400 uppercase tracking-widest">
                        <Link href="#" className="hover:text-blue-600 transition-colors">Mentions légales</Link>
                        <Link href="#" className="hover:text-blue-600 transition-colors">Confidentialité</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;