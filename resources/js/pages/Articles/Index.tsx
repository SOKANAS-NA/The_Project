import { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import { 
    Plus, Edit, Trash2, Eye, Calendar, 
    Filter, Search, MoreHorizontal 
} from 'lucide-react';

export default function Index({ articles, auth }) {
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState('');

    const handleSearch = (e) => {
        e.preventDefault();
        const params = {};
        if (search) params.search = search;
        if (statusFilter) params.status = statusFilter;
        router.get('/articles', params);
    };

    const handleDelete = (article) => {
        if (confirm(`Êtes-vous sûr de vouloir supprimer l'article "${article.title}" ?`)) {
            router.delete(`/articles/${article.id}`);
        }
    };

    return (
        <AppLayout breadcrumbs={[{ label: 'Articles', url: '/articles' }]}>
            <Head title="Mes articles" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center mt-8 mb-4">
                    <h1 className="text-2xl font-semibold text-gray-900">Mes articles</h1>
                    <Link
                        href="/articles/create"
                        className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded hover:bg-blue-700"
                    >
                        <Plus className="w-4 h-4 mr-2" /> Nouvel Article
                    </Link>
                </div>

                {/* Search + Filter */}
                <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-4 mb-6">
                    <div className="relative w-full sm:w-1/2">
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Rechercher par titre ou contenu..."
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                        <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
                    </div>

                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    >
                        <option value="">Tous les statuts</option>
                        <option value="draft">Brouillon</option>
                        <option value="published">Publié</option>
                        <option value="archived">Archivé</option>
                    </select>

                    <button
                        type="submit"
                        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                    >
                        Filtrer
                    </button>
                </form>

                {/* Articles Table */}
                <div className="overflow-x-auto bg-white shadow rounded-lg">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Titre</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Statut</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {articles.data.length === 0 ? (
                                <tr>
                                    <td colSpan="4" className="px-6 py-4 text-center text-gray-500">
                                        Aucun article trouvé.
                                    </td>
                                </tr>
                            ) : (
                                articles.data.map((article) => (
                                    <tr key={article.id}>
                                        <td className="px-6 py-4 font-medium text-gray-900">{article.title}</td>
                                        <td className="px-6 py-4 capitalize text-gray-600">{article.status}</td>
                                        <td className="px-6 py-4 text-gray-500">
                                            <div className="flex items-center space-x-1">
                                                <Calendar className="w-4 h-4 text-gray-400" />
                                                <span>{new Date(article.created_at).toLocaleDateString()}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-right space-x-2">
                                            <Link
                                                href={`/articles/${article.id}`}
                                                className="inline-flex items-center px-2 py-1 text-sm text-gray-600 hover:text-blue-600"
                                            >
                                                <Eye className="w-4 h-4 mr-1" /> Voir
                                            </Link>
                                            <Link
                                                href={`/articles/${article.id}/edit`}
                                                className="inline-flex items-center px-2 py-1 text-sm text-gray-600 hover:text-yellow-600"
                                            >
                                                <Edit className="w-4 h-4 mr-1" /> Modifier
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(article)}
                                                className="inline-flex items-center px-2 py-1 text-sm text-red-600 hover:underline"
                                            >
                                                <Trash2 className="w-4 h-4 mr-1" /> Supprimer
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="mt-6 flex justify-end">
                    {articles.links.map((link, index) => (
                        <Link
                            key={index}
                            href={link.url || '#'}
                            className={`px-3 py-1 mx-1 text-sm rounded ${
                                link.active
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                            } ${!link.url ? 'pointer-events-none opacity-50' : ''}`}
                            dangerouslySetInnerHTML={{ __html: link.label }}
                        />
                    ))}
                </div>
            </div>
        </AppLayout>
    );
}
