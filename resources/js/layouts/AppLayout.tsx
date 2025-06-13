import { useState, useEffect } from "react"
import { Link, usePage } from "@inertiajs/react"
import { Play, Clock, Sun, Moon, Menu, X } from "lucide-react"

interface AppLayoutProps {
  children: React.ReactNode
  breadcrumbs?: React.ReactNode
}

export default function AppLayout({ children, breadcrumbs, ...props }: AppLayoutProps) {
  const { auth, flash } = usePage().props
  const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false)
  const [currentTime, setCurrentTime] = useState(new Date())
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedMode = localStorage.getItem('theme');
      return savedMode === 'dark';
    }
    return false; // Default to light mode on server
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(prevMode => !prevMode);
  };

  // Mise à jour de l'heure toutes les secondes
  setInterval(() => setCurrentTime(new Date()), 1000)

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
      {/* Top Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/95 backdrop-blur-md shadow-lg dark:bg-gray-800/95 dark:shadow-none dark:border-b dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link href="/" className="flex items-center space-x-4">
                <div className="relative">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center transform hover:scale-110 transition-transform duration-200">
                    <Play className="w-5 h-5 text-white" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                </div>
                <div>
                  <h1 className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    SportNews
                  </h1>
                  <div className="text-xs text-gray-500 font-medium flex items-center gap-1 dark:text-gray-400">
                    <Clock className="w-3 h-3" />
                    LIVE • {currentTime.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })}
                  </div>
                </div>
              </Link>

              {/* Desktop Navigation */}
              <div className="hidden sm:flex space-x-8 ml-10">
                <Link href="/" className="text-gray-900 hover:text-blue-600 px-3 py-2 text-sm font-medium dark:text-gray-200 dark:hover:text-blue-400">
                  Accueil
                </Link>
                <Link href="/categories/football" className="text-gray-900 hover:text-blue-600 px-3 py-2 text-sm font-medium dark:text-gray-200 dark:hover:text-blue-400">
                  Football
                </Link>
                <Link href="/categories/tennis" className="text-gray-900 hover:text-blue-600 px-3 py-2 text-sm font-medium dark:text-gray-200 dark:hover:text-blue-400">
                  Tennis
                </Link>
                <Link href="/categories/basketball" className="text-gray-900 hover:text-blue-600 px-3 py-2 text-sm font-medium dark:text-gray-200 dark:hover:text-blue-400">
                  Basketball
                </Link>
                <Link href="/categories/f1" className="text-gray-900 hover:text-blue-600 px-3 py-2 text-sm font-medium dark:text-gray-200 dark:hover:text-blue-400">
                  F1
                </Link>
                {auth.user && auth.user.role !== "lecteur" && (
                  <Link href="/articles" className="text-gray-900 hover:text-blue-600 px-3 py-2 text-sm font-medium dark:text-gray-200 dark:hover:text-blue-400">
                    Mes Articles
                  </Link>
                )}
                {(auth.user?.role === "admin" || auth.user?.role === "webmaster") && (
                  <Link href="/admin/dashboard" className="text-gray-900 hover:text-blue-600 px-3 py-2 text-sm font-medium dark:text-gray-200 dark:hover:text-blue-400">
                    Administration
                  </Link>
                )}
              </div>
            </div>

            {/* Auth & Dark Mode Toggle */}
            <div className="flex items-center space-x-4">
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200"
                aria-label={isDarkMode ? "Passer en mode clair" : "Passer en mode sombre"}
              >
                {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>

              {auth.user ? (
                <div className="flex items-center space-x-4">
                  <span className="text-gray-700 dark:text-gray-200">{auth.user.name}</span>
                  <Link
                    href={route("logout")}
                    method="post"
                    as="button"
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200"
                  >
                    Déconnexion
                  </Link>
                </div>
              ) : (
                <div className="flex items-center space-x-4">
                  <Link
                    href={route("register")}
                    className="text-gray-700 hover:text-blue-600 px-4 py-2 text-sm font-medium dark:text-gray-200 dark:hover:text-blue-400"
                  >
                    S'inscrire
                  </Link>
                  <Link
                    href={route("login")}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200"
                  >
                    Se connecter
                  </Link>
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
                    <Link href="/categories/football" className="block pl-3 pr-4 py-2 text-base font-medium text-gray-700 hover:bg-gray-50">Football</Link>
                    <Link href="/categories/tennis" className="block pl-3 pr-4 py-2 text-base font-medium text-gray-700 hover:bg-gray-50">Tennis</Link>
                    <Link href="/categories/basketball" className="block pl-3 pr-4 py-2 text-base font-medium text-gray-700 hover:bg-gray-50">Basketball</Link>
                    <Link href="/categories/f1" className="block pl-3 pr-4 py-2 text-base font-medium text-gray-700 hover:bg-gray-50">F1</Link>
                    {auth.user && auth.user.role !== "lecteur" && (
                        <Link href="/articles" className="block pl-3 pr-4 py-2 text-base font-medium text-gray-700 hover:bg-gray-50">Mes Articles</Link>
                    )}
                    {(auth.user?.role === "admin" || auth.user?.role === "webmaster") && (
                        <Link href="/admin/dashboard" className="block pl-3 pr-4 py-2 text-base font-medium text-gray-700 hover:bg-gray-50">Administration</Link>
                    )}
                </div>
            </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="pt-16">
        {breadcrumbs && <div className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 text-gray-900 dark:text-gray-200">{breadcrumbs}</div>}
        {children}
      </main>
    </div>
  )
} 