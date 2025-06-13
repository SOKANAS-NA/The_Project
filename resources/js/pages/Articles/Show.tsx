import { Head, Link } from '@inertiajs/react';
import { Calendar, User, Eye, Heart, MessageCircle, Share2, ChevronLeft } from 'lucide-react';
import AppLayout from '@/Layouts/AppLayout';

interface Article {
    id: number;
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    featured_image: string;
    published_at: string;
    views: number;
    user: {
        name: string;
    };
    category: {
        name: string;
        color: string;
    };
    tags: Array<{
        name: string;
        slug: string;
        color: string;
    }>;
}

interface Props {
    article: Article;
    userLiked: boolean;
    relatedArticles: Article[];
}

export default function Show({ article, userLiked, relatedArticles }: Props) {
    const formatDate = (date: string) => {
        return new Date(date).toLocaleDateString('fr-FR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <AppLayout>
            <Head title={article.title} />

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Breadcrumb */}
                <div className="mb-8">
                    <Link
                        href="/"
                        className="inline-flex items-center text-gray-600 hover:text-gray-900"
                    >
                        <ChevronLeft className="w-4 h-4 mr-2" />
                        Retour à l'accueil
                    </Link>
                </div>

                <article className="bg-white rounded-lg shadow-sm overflow-hidden">
                    {/* Image à la une */}
                    {article.featured_image && (
                        <div className="aspect-video overflow-hidden">
                            <img
                                src={`/storage/${article.featured_image}`}
                                alt={article.title}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    )}

                    <div className="p-8">
                        {/* Catégorie */}
                        <div className="mb-4">
                            <span
                                className="inline-block px-4 py-2 rounded-full text-sm font-medium text-white"
                                style={{ backgroundColor: article.category.color }}
                            >
                                {article.category.name}
                            </span>
                        </div>

                        {/* Titre */}
                        <h1 className="text-4xl font-bold text-gray-900 mb-4">
                            {article.title}
                        </h1>

                        {/* Extrait */}
                        <p className="text-xl text-gray-600 mb-6 font-medium">
                            {article.excerpt}
                        </p>

                        {/* Métadonnées */}
                        <div className="flex items-center justify-between py-4 border-y border-gray-200 mb-6">
                            <div className="flex items-center space-x-6 text-sm text-gray-500">
                                <div className="flex items-center">
                                    <User className="w-4 h-4 mr-2" />
                                    <span className="font-medium text-gray-900">
                                        {article.user.name}
                                    </span>
                                </div>
                                <div className="flex items-center">
                                    <Calendar className="w-4 h-4 mr-2" />
                                    {formatDate(article.published_at)}
                                </div>
                                <div className="flex items-center">
                                    <Eye className="w-4 h-4 mr-2" />
                                    {article.views} vues
                                </div>
                            </div>

                            <div className="flex items-center space-x-4">
                                <button
                                    className={`flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                                        userLiked
                                            ? 'bg-red-100 text-red-600 hover:bg-red-200'
                                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                    }`}
                                >
                                    <Heart className="w-4 h-4" />
                                    <span>J'aime</span>
                                </button>
                                <button className="flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors">
                                    <MessageCircle className="w-4 h-4" />
                                    <span>Commenter</span>
                                </button>
                                <button className="flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors">
                                    <Share2 className="w-4 h-4" />
                                    <span>Partager</span>
                                </button>
                            </div>
                        </div>

                        {/* Contenu */}
                        <div className="prose prose-lg max-w-none">
                            {article.content}
                        </div>

                        {/* Tags */}
                        {article.tags.length > 0 && (
                            <div className="mt-8 pt-6 border-t border-gray-200">
                                <h3 className="text-sm font-medium text-gray-900 mb-4">Tags</h3>
                                <div className="flex flex-wrap gap-2">
                                    {article.tags.map((tag) => (
                                        <Link
                                            key={tag.slug}
                                            href={`/articles?tag=${tag.slug}`}
                                            className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium transition-colors"
                                            style={{
                                                backgroundColor: `${tag.color}20`,
                                                color: tag.color,
                                            }}
                                        >
                                            {tag.name}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </article>

                {/* Articles similaires */}
                {relatedArticles.length > 0 && (
                    <div className="mt-12">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">
                            Articles similaires
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {relatedArticles.map((relatedArticle) => (
                                <Link
                                    key={relatedArticle.id}
                                    href={`/articles/${relatedArticle.slug}`}
                                    className="group"
                                >
                                    <article className="bg-white rounded-lg shadow-sm overflow-hidden">
                                        {relatedArticle.featured_image && (
                                            <div className="aspect-video overflow-hidden">
                                                <img
                                                    src={`/storage/${relatedArticle.featured_image}`}
                                                    alt={relatedArticle.title}
                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                                />
                                            </div>
                                        )}
                                        <div className="p-4">
                                            <h3 className="font-semibold text-lg mb-2 group-hover:text-blue-600 transition-colors">
                                                {relatedArticle.title}
                                            </h3>
                                            <p className="text-gray-600 text-sm line-clamp-2">
                                                {relatedArticle.excerpt}
                                            </p>
                                            <div className="flex items-center text-xs text-gray-500 mt-2">
                                                <User className="w-3 h-3 mr-1" />
                                                {relatedArticle.user.name}
                                                <span className="mx-2">•</span>
                                                <Calendar className="w-3 h-3 mr-1" />
                                                {formatDate(relatedArticle.published_at)}
                                            </div>
                                        </div>
                                    </article>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </AppLayout>
    );
} 