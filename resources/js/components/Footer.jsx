import { Link } from '@inertiajs/react';

export default function Footer() {
    return (
        <footer className="bg-white border-t border-gray-200">
            <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* À propos */}
                    <div className="space-y-4">
                        <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">À propos</h3>
                        <p className="text-base text-gray-500">
                            Site d'infos sportifs en direct.
                        </p>
                    </div>

                    {/* Navigation rapide */}
                    <div>
                        <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">Navigation</h3>
                        <ul className="mt-4 space-y-4">
                            <li>
                                <Link href="/" className="text-base text-gray-500 hover:text-gray-900">
                                    Accueil
                                </Link>
                            </li>
                            <li>
                                <Link href="/articles" className="text-base text-gray-500 hover:text-gray-900">
                                    Articles
                                </Link>
                            </li>
                            <li>
                                <Link href="/categories" className="text-base text-gray-500 hover:text-gray-900">
                                    Catégories
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Liens utiles */}
                    <div>
                        <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">Liens utiles</h3>
                        <ul className="mt-4 space-y-4">
                            <li>
                                <Link href="/contact" className="text-base text-gray-500 hover:text-gray-900">
                                    Contact
                                </Link>
                            </li>
                            <li>
                                <Link href="/mentions-legales" className="text-base text-gray-500 hover:text-gray-900">
                                    Mentions légales
                                </Link>
                            </li>
                            <li>
                                <Link href="/politique-confidentialite" className="text-base text-gray-500 hover:text-gray-900">
                                    Politique de confidentialité
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">Contact</h3>
                        <ul className="mt-4 space-y-4">
                            <li className="text-base text-gray-500">
                                Email: contact@sportnews.com
                            </li>
                            <li className="text-base text-gray-500">
                                Téléphone: +32 223 456 789
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Copyright */}
                <div className="mt-8 border-t border-gray-200 pt-8">
                    <p className="text-base text-gray-400 text-center">
                        © {new Date().getFullYear()} Sport News. Tous droits réservés.
                    </p>
                </div>
            </div>
        </footer>
    );
} 