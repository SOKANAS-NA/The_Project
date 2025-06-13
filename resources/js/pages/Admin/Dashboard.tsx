import { PageProps } from '@/types';
import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/layouts/AuthenticatedLayout';

interface DashboardProps extends PageProps {
    stats: {
        users: number;
        articles: number;
        published_articles: number;
        draft_articles: number;
        categories: number;
        comments: number;
        pending_comments: number;
    };
    recentArticles: Array<{
        id: number;
        title: string;
        status: string;
        created_at: string;
        user: {
            name: string;
        };
        category: {
            name: string;
        };
    }>;
    recentComments: Array<{
        id: number;
        content: string;
        created_at: string;
        user: {
            name: string;
        };
        article: {
            title: string;
        };
    }>;
    monthlyStats: Array<{
        month: number;
        count: number;
    }>;
}

export default function Dashboard({ auth, stats, recentArticles, recentComments, monthlyStats }: DashboardProps) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Tableau de bord</h2>}
        >
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {/* Statistiques générales */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                            <div className="text-gray-900">
                                <h3 className="text-lg font-semibold mb-2">Utilisateurs</h3>
                                <p className="text-3xl font-bold">{stats.users}</p>
                            </div>
                        </div>
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                            <div className="text-gray-900">
                                <h3 className="text-lg font-semibold mb-2">Articles</h3>
                                <p className="text-3xl font-bold">{stats.articles}</p>
                                <div className="text-sm text-gray-600 mt-2">
                                    <span className="mr-4">Publiés: {stats.published_articles}</span>
                                    <span>Brouillons: {stats.draft_articles}</span>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                            <div className="text-gray-900">
                                <h3 className="text-lg font-semibold mb-2">Catégories</h3>
                                <p className="text-3xl font-bold">{stats.categories}</p>
                            </div>
                        </div>
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                            <div className="text-gray-900">
                                <h3 className="text-lg font-semibold mb-2">Commentaires</h3>
                                <p className="text-3xl font-bold">{stats.comments}</p>
                                <div className="text-sm text-gray-600 mt-2">
                                    En attente: {stats.pending_comments}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Articles récents et commentaires */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Articles récents */}
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                            <div className="p-6">
                                <h3 className="text-lg font-semibold mb-4">Articles récents</h3>
                                <div className="space-y-4">
                                    {recentArticles.map((article) => (
                                        <div key={article.id} className="border-b pb-4 last:border-b-0">
                                            <h4 className="font-medium">{article.title}</h4>
                                            <div className="text-sm text-gray-600 mt-1">
                                                <span className="mr-2">Par {article.user.name}</span>
                                                <span className="mr-2">•</span>
                                                <span className="mr-2">{article.category.name}</span>
                                                <span className="mr-2">•</span>
                                                <span className={`px-2 py-1 rounded-full text-xs ${
                                                    article.status === 'published' 
                                                        ? 'bg-green-100 text-green-800' 
                                                        : 'bg-yellow-100 text-yellow-800'
                                                }`}>
                                                    {article.status === 'published' ? 'Publié' : 'Brouillon'}
                                                </span>
                                            </div>
                                            <div className="text-sm text-gray-500 mt-1">
                                                {new Date(article.created_at).toLocaleDateString()}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Commentaires récents */}
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                            <div className="p-6">
                                <h3 className="text-lg font-semibold mb-4">Commentaires récents</h3>
                                <div className="space-y-4">
                                    {recentComments.map((comment) => (
                                        <div key={comment.id} className="border-b pb-4 last:border-b-0">
                                            <div className="text-sm text-gray-600">
                                                <span className="font-medium">{comment.user.name}</span>
                                                <span className="mx-2">sur</span>
                                                <span className="font-medium">{comment.article.title}</span>
                                            </div>
                                            <p className="mt-2 text-gray-800">{comment.content}</p>
                                            <div className="text-sm text-gray-500 mt-1">
                                                {new Date(comment.created_at).toLocaleDateString()}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Statistiques mensuelles */}
                    <div className="mt-8 bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <h3 className="text-lg font-semibold mb-4">Activité mensuelle</h3>
                            <div className="h-64">
                                {/* Ici vous pourriez ajouter un graphique avec une bibliothèque comme Chart.js ou Recharts */}
                                <div className="grid grid-cols-12 gap-4 h-full items-end">
                                    {monthlyStats.map((stat, index) => (
                                        <div key={index} className="flex flex-col items-center">
                                            <div 
                                                className="w-full bg-blue-500 rounded-t"
                                                style={{ height: `${(stat.count / Math.max(...monthlyStats.map(s => s.count))) * 100}%` }}
                                            ></div>
                                            <span className="text-xs text-gray-600 mt-2">
                                                {new Date(2024, stat.month - 1).toLocaleString('default', { month: 'short' })}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
} 