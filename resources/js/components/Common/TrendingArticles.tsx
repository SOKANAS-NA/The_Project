import { TrendingUp } from "lucide-react"
import { Link } from "@inertiajs/react"
import ImagePlaceholder from "./ImagePlaceholder"

interface Article {
  id: number
  title: string
  published_at: string
}

interface TrendingArticlesProps {
  articles: Article[]
}

const DEFAULT_PROFILE_IMAGE = "https://placehold.co/100x100/2563eb/ffffff?text=Profile"

export default function TrendingArticles({ articles }: TrendingArticlesProps) {
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const target = e.target as HTMLImageElement
    target.src = DEFAULT_PROFILE_IMAGE
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
      <div className="flex items-center space-x-2 mb-6">
        <TrendingUp className="w-5 h-5 text-red-500" />
        <h3 className="text-lg font-bold text-gray-900">Tendances</h3>
      </div>
      <div className="space-y-4">
        {articles.map((article, index) => (
          <div key={article.id} className="group cursor-pointer">
            <div className="flex items-start space-x-3 p-3 rounded-xl hover:bg-gray-50 transition-colors duration-200">
              <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                {index + 1}
              </div>
              <div className="flex-1">
                <Link
                  href={`/articles/${article.id}`}
                  className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors duration-200 text-sm leading-tight block"
                >
                  {article.title}
                </Link>
                <p className="text-xs text-gray-500 mt-1">
                  {new Date(article.published_at).toLocaleDateString("fr-FR")}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
} 