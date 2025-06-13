import { Search } from "lucide-react"

interface SearchBarProps {
  onSearch?: (query: string) => void
  onCategoryChange?: (category: string) => void
  initialSearch?: string
  initialCategory?: string
}

export default function SearchBar({
  onSearch,
  onCategoryChange,
  initialSearch = "",
  initialCategory = "",
}: SearchBarProps) {
  return (
    <div className="max-w-4xl mx-auto mb-12">
      <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Rechercher dans l'actualité sportive..."
              defaultValue={initialSearch}
              onChange={(e) => onSearch?.(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            />
          </div>
          <div className="flex gap-3">
            <select
              defaultValue={initialCategory}
              onChange={(e) => onCategoryChange?.(e.target.value)}
              className="px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            >
              <option value="">Tous les sports</option>
              <option value="football">Football</option>
              <option value="tennis">Tennis</option>
              <option value="basketball">Basketball</option>
              <option value="f1">F1</option>
            </select>
            <button
              type="submit"
              className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-medium hover:shadow-lg transform hover:scale-105 transition-all duration-200"
            >
              Rechercher
            </button>
          </div>
        </div>
      </div>
    </div>
  )
} 