import { useState, useEffect } from 'react';
import { Link } from '@inertiajs/react';
import { User } from '@/types';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';

interface Props {
  user: User;
}

export default function Navbar({ user }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  // Bloquer le scroll quand le menu est ouvert
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'auto';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  return (
    <>
      <nav className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-1 sm:px-3">
          <div className="flex justify-between h-12">
            <div className="flex items-center">
              <Link href="/" className="flex-shrink-0 flex items-center">
                <img className="h-6 w-auto" src="/images/logo.png" alt="Sport News" />
                <span className="ml-1 text-base font-bold text-gray-900 dark:text-white">
                  Sport News
                </span>
              </Link>
            </div>

            {/* Menu Desktop */}
            <div className="hidden md:flex items-center space-x-2">
              <Link
                href={route('articles.index')}
                className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white px-2 py-1.5 rounded-md text-sm font-medium transition-colors"
              >
                Articles
              </Link>
              <Link
                href={route('categories.index')}
                className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white px-2 py-1.5 rounded-md text-sm font-medium transition-colors"
              >
                Catégories
              </Link>
              {user ? (
                <div className="flex items-center space-x-2">
                  <Link
                    href={route('dashboard')}
                    className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white px-2 py-1.5 rounded-md text-sm font-medium transition-colors"
                  >
                    Dashboard
                  </Link>
                  <Link href={route('logout')} method="post" as="button">
                    <Button variant="ghost" className="h-7 px-2">Déconnexion</Button>
                  </Link>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <Link href={route('login')}>
                    <Button variant="ghost" className="h-7 px-2">Connexion</Button>
                  </Link>
                  <Link href={route('register')}>
                    <Button className="h-7 px-2">S'inscrire</Button>
                  </Link>
                </div>
              )}
            </div>

            {/* Bouton Burger (mobile) */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
              aria-label="Menu"
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Overlay Mobile */}
      <div
        className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 md:hidden ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsOpen(false)}
      />

      {/* Menu Mobile */}
      <div
        id="mobile-menu"
        className={`fixed right-0 top-0 h-full w-64 bg-white dark:bg-gray-800 shadow-lg transform transition-transform duration-300 ease-in-out z-50 md:hidden ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="p-4">
          <div className="flex flex-col space-y-4">
            <Link
              href={route('articles.index')}
              className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Articles
            </Link>
            <Link
              href={route('categories.index')}
              className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Catégories
            </Link>
            {user ? (
              <>
                <Link
                  href={route('dashboard')}
                  className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Dashboard
                </Link>
                <Link
                  href={route('logout')}
                  method="post"
                  as="button"
                  className="text-left text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Déconnexion
                </Link>
              </>
            ) : (
              <>
                <Link
                  href={route('login')}
                  className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Connexion
                </Link>
                <Link
                  href={route('register')}
                  className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  S'inscrire
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
