import { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { User, Menu, X, Search } from 'lucide-react';
import AppLayoutTemplate from '@/layouts/app/app-sidebar-layout';
import type { BreadcrumbItem } from '@/types';
import type { ReactNode } from 'react';

interface AppLayoutProps {
    children: ReactNode;
    breadcrumbs?: BreadcrumbItem[];
}

export default function AppLayout({ children, breadcrumbs, ...props }: AppLayoutProps) {
    const { auth, flash } = usePage().props;
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            window.location.href = `/?search=${encodeURIComponent(searchQuery)}`;
        }
    };

    return (
        <AppLayoutTemplate breadcrumbs={breadcrumbs} {...props}>
            {/* Top Navigation */}
            <nav className="bg-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex items-center">
                            <Link href="/" className="flex items-center">
                                <div className="text-2xl font-bold text-blue-600">SportNews</div>
                            </Link>

                            <div className="hidden space-x-8 sm:ml-10 sm:flex">
                                <Link href="/" className="text-gray-900 hover:text-blue-600 px-3 py-2 text-sm font-medium">Accueil</Link>
                                {auth.user && auth.user.role !== 'lecteur' && (
                                    <Link href="/articles" className="text-gray-900 hover:text-blue-600 px-3 py-2 text-sm font-medium">Mes Articles</Link>
                                )}
                                {(auth.user?.role === 'admin' || auth.user?.role === 'webmaster') && (
                                    <Link href="/admin/dashboard" className="text-gray-900 hover:text-blue-600 px-3 py-2 text-sm font-medium">Administration</Link>
                                )}
                            </div>
                        </div>

                        {/* Search */}
                        <div className="hidden sm:flex sm:items-center sm:ml-6">
                            <form onSubmit={handleSearch} className="relative">
                                <input
                                    type="text"
                                    placeholder="Rechercher..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                                <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                            </form>
                        </div>

                        {/* User menu */}
                        <div className="flex items-center space-x-4">
                            {auth.user ? (
                                <div className="relative">
                                    <button
                                        onClick={() => setShowingNavigationDropdown(!showingNavigationDropdown)}
                                        className="flex items-center text-sm text-gray-700 hover:text-gray-900 focus:outline-none"
                                    >
                                        <User className="h-6 w-6 mr-2" />
                                        <span>{auth.user.name}</span>
                                    </button>

                                    {showingNavigationDropdown && (
                                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                                            <Link href="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Profil</Link>
                                            <Link href="/logout" method="post" as="button" className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Déconnexion</Link>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <div className="space-x-4">
                                    <Link href="/login" className="text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium">Connexion</Link>
                                    <Link href="/register" className="bg-blue-600 text-white hover:bg-blue-700 px-4 py-2 rounded-lg text-sm font-medium">Inscription</Link>
                                </div>
                            )}
                        </div>

                        {/* Mobile menu button */}
                        <div className="sm:hidden flex items-center">
                            <button
                                onClick={() => setShowingNavigationDropdown(!showingNavigationDropdown)}
                                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none"
                            >
                                {showingNavigationDropdown ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Nav */}
                {showingNavigationDropdown && (
                    <div className="sm:hidden">
                        <div className="pt-2 pb-3 space-y-1">
                            <Link href="/" className="block pl-3 pr-4 py-2 text-base font-medium text-gray-700 hover:bg-gray-50">Accueil</Link>
                            {auth.user && auth.user.role !== 'lecteur' && (
                                <Link href="/articles" className="block pl-3 pr-4 py-2 text-base font-medium text-gray-700 hover:bg-gray-50">Mes Articles</Link>
                            )}
                        </div>
                    </div>
                )}
            </nav>

            {/* Flash messages */}
            {flash?.success && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mx-4 mt-4">
                    {flash.success}
                </div>
            )}
            {flash?.error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mx-4 mt-4">
                    {flash.error}
                </div>
            )}

            {/* Page content */}
            <main className="py-8">
                {children}
            </main>

            {/* Footer */}
            <footer className="bg-gray-800 text-white py-8 mt-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center">
                        <div>
                            <h3 className="text-lg font-semibold">SportNews</h3>
                            <p className="text-gray-400">Toute l'actualité sportive</p>
                        </div>
                        <div className="text-gray-400">
                            © 2025 SportNews. Tous droits réservés.
                        </div>
                    </div>
                </div>
            </footer>
        </AppLayoutTemplate>
    );
}
