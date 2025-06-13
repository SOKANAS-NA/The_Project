import { useState, useEffect, useMemo, Suspense } from "react"
import { Search, Calendar, User, TrendingUp, Play, ArrowRight, Menu, X, Clock, Eye, Star } from "lucide-react"
import { Link, router } from "@inertiajs/react"
import type { PageProps } from "@/types"

interface Category {
  id: number
  name: string
  articles_count: number
}

interface Tag {
  id: number
  name: string
  articles_count: number
}

interface Article {
  id: number
  title: string
  excerpt: string
  content: string
  slug: string
  published_at: string
  created_at: string
  updated_at: string
  views: number
  likes_count: number
  comments_count: number
  featured_image: string | null
  user: {
    id: number
    name: string
    profile_photo_url: string
  } | null
  category: {
    id: number
    name: string
  } | null
  tags: Tag[]
}

interface PaginatedArticles {
  data: Article[]
  links: {
    url: string | null
    label: string
    active: boolean
  }[]
}

interface SportNewsHomeProps {
  auth: {
    user: {
      id: number
      name: string
      email: string
      role: string
    } | null
  }
  articles: PaginatedArticles
  categories: Category[]
  tags: Tag[]
  popularArticles: Article[]
  filters: {
    search: string
    category: string
    tag: string
  }
}

const LoadingSpinner = () => (
  <div className="flex justify-center items-center p-8">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 dark:border-blue-300"></div>
  </div>
)

const styles = {
  "@keyframes blink": {
    "0%, 100%": { opacity: 1 },
    "50%": { opacity: 0.3 }
  }
};

export default function SportNewsHome({
  auth,
  articles,
  categories = [],
  tags = [],
  popularArticles = [],
  filters = { search: "", category: "", tag: "" },
}: SportNewsHomeProps) {
  const [searchQuery, setSearchQuery] = useState(filters.search)
  const [selectedCategory, setSelectedCategory] = useState(filters.category)
  const [selectedTag, setSelectedTag] = useState(filters.tag)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    router.get(
      route("home"),
      {
        search: searchQuery,
        category: selectedCategory,
        tag: selectedTag,
      },
      {
        preserveState: true,
        preserveScroll: true,
        replace: true,
      }
    )
  }

  const getCategoryColor = useMemo(() => {
    const colors = {
      Football: "from-green-500 to-green-600",
      Tennis: "from-yellow-500 to-orange-500",
      Basketball: "from-orange-500 to-red-500",
      F1: "from-red-500 to-red-600",
      Rugby: "from-blue-500 to-blue-600",
      default: "from-gray-500 to-gray-600",
    }
    return (category: string | null | undefined) => {
      if (!category) return colors.default
      return colors[category as keyof typeof colors] || colors.default
    }
  }, [])

  // Optimisation du chargement des images
  const imageLoadingStrategy = useMemo(() => {
    return {
      loading: "lazy" as const,
      decoding: "async" as const,
      fetchPriority: "high" as const,
    }
  }, [])

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
      {/* Effet de particules en arrière-plan */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -inset-10 opacity-30">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
          <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-yellow-500 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative pt-24 lg:pt-32 pb-16 bg-purple-100 rounded-b-3xl shadow-xl z-20 dark:bg-purple-900 dark:shadow-none dark:border-b dark:border-gray-700">
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-3 bg-red-100 px-6 py-3 rounded-full mb-8 border border-red-200 dark:bg-red-900/20 dark:border-red-900">
              <div className="w-3 h-3 bg-red-500 rounded-full shadow-lg shadow-red-500/50"></div>
              <span className="text-sm font-semibold text-red-700 tracking-wider dark:text-red-400 animate-[blink_1.5s_ease-in-out_infinite]">EN DIRECT</span>
            </div>
            <h1 className="text-5xl lg:text-7xl font-black text-purple-600 mb-6 leading-tight dark:text-cyan-400">
              L'actualité
              <span className="block text-purple-600 dark:text-purple-400">
                sportive
              </span>
              <span className="block text-4xl lg:text-5xl font-medium text-gray-700 dark:text-gray-300">
                en temps réel
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto dark:text-gray-400">
              Découvrez les dernières actualités, analyses approfondies et résultats en direct du monde du sport
            </p>
          </div>
        </div>
      </section>

      {/* Barre de recherche moderne */}
      <div className="container mx-auto px-4 mb-16 -mt-10 relative z-30">
        <div className="max-w-5xl mx-auto">
          <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/80 dark:bg-gray-800/95 dark:border-gray-700 dark:shadow-none">
            <form onSubmit={handleSearch} className="flex flex-col lg:flex-row gap-6">
              <div className="flex-1 relative group">
                <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 text-gray-400 w-6 h-6 group-focus-within:text-purple-400 transition-colors dark:text-gray-500" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Rechercher dans l'actualité sportive..."
                  className="w-full pl-16 pr-6 py-4 bg-gray-100 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 text-gray-800 placeholder-gray-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
                />
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-6 py-4 bg-gray-100 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 text-gray-800 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                >
                  <option value="" className="bg-gray-200 text-gray-800 dark:bg-gray-900 dark:text-white">Toutes les catégories</option>
                  {categories
                    .filter(cat => cat.name !== 'Football' && cat.name !== 'Tennis')
                    .map((cat) => (
                    <option key={cat.id} value={cat.id} className="bg-gray-200 text-gray-800 dark:bg-gray-900 dark:text-white">
                      {cat.name} ({cat.articles_count})
                    </option>
                  ))}
                </select>
                <select
                  value={selectedTag}
                  onChange={(e) => setSelectedTag(e.target.value)}
                  className="px-6 py-4 bg-gray-100 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 text-gray-800 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                >
                  <option value="" className="bg-gray-200 text-gray-800 dark:bg-gray-900 dark:text-white">Tous les tags</option>
                  {tags.map((tag) => (
                    <option key={tag.id} value={tag.id} className="bg-gray-200 text-gray-800 dark:bg-gray-900 dark:text-white">
                      {tag.name} ({tag.articles_count})
                    </option>
                  ))}
                </select>
                <button
                  type="submit"
                  className="px-8 py-4 bg-gradient-to-r from-violet-600 via-purple-600 to-pink-600 text-white rounded-2xl font-semibold hover:shadow-xl hover:shadow-purple-500/25 transform hover:scale-105 transition-all duration-300 hover:from-violet-500 hover:via-purple-500 hover:to-pink-500"
                >
                  Rechercher
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <main className="container mx-auto px-4 pb-20">
        <div className="grid grid-cols-12 gap-8">
          {/* Articles principaux */}
          <div className="col-span-12 lg:col-span-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Suspense fallback={<LoadingSpinner />}>
                {articles.data.map((article, index) => {
                  let imageUrl = article.featured_image || '/images/default-article.jpg';
                  if (index === 0) {
                    imageUrl = '/images/stade.jpg';
                  } else if (index === 1) {
                    imageUrl = '/images/portrait.jpg';
                  } else if (index === 2) {
                    imageUrl = '/images/arc-de-triomphe-de-nuit-paris-france.jpg';
                  }

                  return (
                    <Link
                      key={article.id}
                      href={route('articles.show', article.id)}
                      className={`group cursor-pointer transform hover:scale-[1.02] transition-all duration-500 ${
                        index === 0 ? "md:col-span-2" : ""
                      }`}
                    >
                      <div className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500 border border-gray-200 hover:border-purple-300 dark:bg-gray-700 dark:border-gray-600 dark:hover:border-purple-500">
                        <div className="relative overflow-hidden">
                          <img
                            src={imageUrl}
                            alt={article.title}
                            loading="lazy"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.src = '/images/default-article.jpg';
                              console.error(`Failed to load image: ${imageUrl}`);
                            }}
                            className={`w-full object-cover group-hover:scale-110 transition-transform duration-700 ${
                              index === 0 ? "h-72 lg:h-96" : "h-56"
                            }`}
                          />
                          <div className="absolute top-6 left-6">
                            <span
                              className={`px-4 py-2 bg-gradient-to-r ${getCategoryColor(article.category?.name)} text-white text-sm font-bold rounded-full shadow-lg backdrop-blur-sm`}
                            >
                              {article.category?.name}
                            </span>
                          </div>
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                          <div className="absolute bottom-6 left-6 right-6">
                            <div className="flex items-center space-x-4 text-white/80 text-sm mb-2">
                              <div className="flex items-center space-x-2">
                                <Calendar className="w-4 h-4" />
                                <span>{new Date(article.published_at).toLocaleDateString("fr-FR")}</span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Eye className="w-4 h-4" />
                                <span>{article.views} vues</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="p-8">
                          <div className="flex items-center space-x-3 mb-4">
                            {article.user?.profile_photo_url && (
                              <img
                                src={article.user.profile_photo_url}
                                alt={article.user.name}
                                className="w-10 h-10 rounded-full border-2 border-purple-300"
                                loading="lazy"
                              />
                            )}
                            <div>
                              <span className="text-gray-800 text-sm font-medium dark:text-gray-200">{article.user?.name}</span>
                              <div className="text-gray-600 text-xs dark:text-gray-400">Journaliste sportif</div>
                            </div>
                          </div>
                          <h2
                            className={`font-bold text-gray-900 mb-4 group-hover:text-purple-600 transition-all duration-300 ${
                              index === 0 ? "text-2xl lg:text-3xl" : "text-xl"
                            } dark:text-white dark:group-hover:text-purple-400`}
                          >
                            {article.title}
                          </h2>
                          <p className="text-gray-700 mb-6 line-clamp-3 leading-relaxed dark:text-gray-300">{article.excerpt}</p>
                          <div className="flex items-center justify-between">
                            <button className="flex items-center space-x-2 text-purple-600 font-semibold hover:text-pink-600 transition-colors duration-300 group/btn dark:text-purple-400 dark:hover:text-pink-400">
                              <span>Lire la suite</span>
                              <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform duration-300" />
                            </button>
                            <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                              <div className="flex items-center space-x-1">
                                <Star className="w-4 h-4 text-yellow-500" />
                                <span>4.8</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex flex-wrap gap-2 mt-2">
                            {article.tags.map((tag) => (
                              <span
                                key={tag.id}
                                className="text-xs px-2 py-1 bg-purple-100 text-purple-800 rounded-full dark:bg-purple-900 dark:text-purple-200"
                              >
                                {tag.name}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </Link>
                  )
                })}
              </Suspense>
            </div>
          </div>

          {/* Sidebar */}
          <div className="col-span-12 lg:col-span-4 space-y-8">
            <Suspense fallback={<LoadingSpinner />}>
              {/* Articles populaires */}
              <div className="bg-white rounded-3xl shadow-lg p-8 border border-gray-200 dark:bg-gray-700 dark:border-gray-600 dark:shadow-none">
                <div className="flex items-center space-x-3 mb-8">
                  <div className="p-2 bg-gradient-to-r from-red-500 to-pink-500 rounded-xl">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">Tendances</h3>
                </div>
                <div className="space-y-6">
                  {popularArticles.map((article, index) => (
                    <Link
                      key={article.id}
                      href={route('articles.show', article.id)}
                      className="group cursor-pointer"
                    >
                      <div className="flex items-start space-x-4 p-4 rounded-2xl hover:bg-gray-50 transition-all duration-300 border border-transparent hover:border-purple-300 dark:hover:bg-gray-600 dark:hover:border-purple-500">
                        <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-r from-violet-500 to-purple-500 rounded-xl flex items-center justify-center text-white font-bold shadow-lg shadow-purple-500/25">
                          {index + 1}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-800 group-hover:text-purple-600 transition-colors duration-300 text-sm leading-snug mb-2 dark:text-gray-200 dark:group-hover:text-purple-400">
                            {article.title}
                          </h4>
                          <div className="flex items-center space-x-3 text-xs text-gray-500 dark:text-gray-400">
                            <span>{article.user.name}</span>
                            <span>•</span>
                            <div className="flex items-center space-x-1">
                              <Eye className="w-3 h-3" />
                              <span>{article.views} vues</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Widget statistiques */}
              <div className="bg-white rounded-3xl shadow-lg p-8 border border-gray-200 dark:bg-gray-700 dark:border-gray-600 dark:shadow-none">
                <h3 className="text-xl font-bold text-gray-900 mb-6 dark:text-white">Statistiques Live</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-3 border-b border-gray-200 dark:border-gray-600">
                    <span className="text-gray-700 dark:text-gray-300">Articles publiés</span>
                    <span className="text-2xl font-bold text-purple-600 dark:text-purple-400">247</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-gray-200 dark:border-gray-600">
                    <span className="text-gray-700 dark:text-gray-300">Lecteurs actifs</span>
                    <span className="text-2xl font-bold text-pink-600 dark:text-pink-400">12.4K</span>
                  </div>
                  <div className="flex justify-between items-center py-3">
                    <span className="text-gray-700 dark:text-gray-300">Vues cette semaine</span>
                    <span className="text-2xl font-bold text-cyan-600 dark:text-cyan-400">89.2K</span>
                  </div>
                </div>
              </div>
            </Suspense>
          </div>
        </div>
      </main>

      {/* Pagination Links */}
      {articles.links.length > 3 && (
        <div className="flex justify-center mt-10">
          <nav className="flex space-x-1" aria-label="Pagination">
            {articles.links.map((link, index) => (
              <Link
                key={index}
                href={link.url || '#'}
                className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold rounded-lg transition-colors duration-200
                  ${link.active
                    ? "bg-purple-600 text-white dark:bg-purple-400"
                    : "text-gray-700 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-700"
                  }
                  ${!link.url ? "cursor-not-allowed opacity-50" : ""}`}
                dangerouslySetInnerHTML={{ __html: link.label }}
              />
            ))}
          </nav>
        </div>
      )}

      <style>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
      `}</style>
    </div>
  )
}
