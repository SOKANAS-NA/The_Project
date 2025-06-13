import { useState } from 'react';
import { Head, Link, router, useForm } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import { 
    Calendar, User, Eye, Heart, MessageCircle, Share2, 
    ChevronLeft, Send, Reply, Trash2, Edit
} from 'lucide-react';

export default function Show({ article, userLiked, relatedArticles, auth }) {
    const [showCommentForm, setShowCommentForm] = useState(false);
    const [replyTo, setReplyTo] = useState(null);
    const [liked, setLiked] = useState(userLiked);
    const [likesCount, setLikesCount] = useState(article.likes_count || 0);

    const { data, setData, post, processing, errors, reset } = useForm({
        content: '',
        parent_id: null
    });

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('fr-FR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const handleLike = async () => {
        if (!auth.user) {
            router.visit('/login');
            return;
        }

        try {
            const response = await fetch(`/articles/${article.id}/like`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content
                }
            });

            const result = await response.json();
            setLiked(result.liked);
            setLikesCount(result.likes_count);
        } catch (error) {
            console.error('Erreur lors du like:', error);
        }
    };

    const handleDelete = () => {
        if (confirm(`Êtes-vous sûr de vouloir supprimer l'article "${article.title}" ?`)) {
            router.delete(`/articles/${article.id}`);
        }
    };

    const handleCommentSubmit = (e) => {
        e.preventDefault();
        post(`/articles/${article.id}/comments`, {
            onSuccess: () => {
                reset();
                setShowCommentForm(false);
                setReplyTo(null);
            }
        });
    };

    const handleReply = (comment) => {
        setReplyTo(comment);
        setData('parent_id', comment.id);
        setShowCommentForm(true);
    };

    const cancelReply = () => {
        setReplyTo(null);
        setData('parent_id', null);
        setShowCommentForm(false);
        reset();
    };

    const canManageArticle = auth.user && (
        auth.user.roles.includes('admin') || 
        auth.user.roles.includes('webmaster') || 
        (auth.user.roles.includes('author') && article.user_id === auth.user.id)
    );

    return (
        <AppLayout>
            <Head title={`${article.title} - SportNews`} />

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Breadcrumb */}
                <div className="mb-6">
                    <Link
                        href="/"
                        className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
                    >
                        <ChevronLeft className="w-4 h-4 mr-1" />
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

                            {/* Actions */}
                            <div className="flex items-center space-x-4">
                                <button
                                    onClick={handleLike}
                                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                                        liked
                                            ? 'bg-red-100 text-red-600 hover:bg-red-200'
                                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                    }`}
                                >
                                    <Heart className={`w-4 h-4 ${liked ? 'fill-current' : ''}`} />
                                    <span>{likesCount}</span>
                                </button>

                                <button className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors">
                                    <Share2 className="w-4 h-4" />
                                    <span>Partager</span>
                                </button>
                            </div>
                        </div>

                        {/* Tags */}
                        {article.tags.length > 0 && (
                            <div className="flex flex-wrap gap-2 mb-6">
                                {article.tags.map(tag => (
                                    <span
                                        key={tag.id}
                                        className="inline-block px-3 py-1 rounded-full text-sm"
                                        style={{ 
                                            backgroundColor: tag.color + '20',
                                            color: tag.color 
                                        }}
                                    >
                                        #{tag.name}
                                    </span>
                                ))}
                            </div>
                        )}

                        {/* Contenu */}
                        <div 
                            className="prose prose-lg max-w-none mb-8"
                            dangerouslySetInnerHTML={{ __html: article.content }}
                        />
                    </div>
                </article>

                {/* Section commentaires */}
                <div className="mt-8 bg-white rounded-lg shadow-sm p-8">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-bold flex items-center">
                            <MessageCircle className="w-6 h-6 mr-2" />
                            Commentaires ({article.comments.length})
                        </h2>

                        {auth.user && (
                            <button
                                onClick={() => setShowCommentForm(!showCommentForm)}
                                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                            >
                                Ajouter un commentaire
                            </button>
                        )}
                    </div>

                    {/* Formulaire de commentaire */}
                    {showCommentForm && (
                        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                            {replyTo && (
                                <div className="mb-4 p-3 bg-blue-50 rounded border-l-4 border-blue-400">
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-blue-600">
                                            Réponse à {replyTo.user.name}
                                        </span>
                                        <button
                                            onClick={cancelReply}
                                            className="text-gray-400 hover:text-gray-600"
                                        >
                                            <X className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            )}

                            <form onSubmit={handleCommentSubmit}>
                                <textarea
                                    value={data.content}
                                    onChange={(e) => setData('content', e.target.value)}
                                    placeholder="Votre commentaire..."
                                    rows={4}
                                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                                />
                                {errors.content && (
                                    <p className="text-red-600 text-sm mt-1">{errors.content}</p>
                                )}
                                
                                <div className="flex justify-end space-x-3 mt-4">
                                    <button
                                        type="button"
                                        onClick={cancelReply}
                                        className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                                    >
                                        Annuler
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
                                    >
                                        <Send className="w-4 h-4" />
                                        <span>{processing ? 'Envoi...' : 'Publier'}</span>
                                    </button>
                                </div>
                            </form>
                        </div>
                    )}

                    {/* Liste des commentaires */}
                    <div className="space-y-6">
                        {article.comments.map(comment => (
                            <CommentItem
                                key={comment.id}
                                comment={comment}
                                onReply={handleReply}
                                canDelete={auth.user && (comment.user.id === auth.user.id || auth.user.role === 'admin' || auth.user.role === 'webmaster')}
                            />
                        ))}

                        {article.comments.length === 0 && (
                            <div className="text-center py-8 text-gray-500">
                                Aucun commentaire pour le moment. 
                                {auth.user ? ' Soyez le premier à commenter !' : ' Connectez-vous pour commenter.'}
                            </div>
                        )}
                    </div>
                </div>

                {/* Articles liés */}
                {relatedArticles.length > 0 && (
                    <div className="mt-12">
                        <h2 className="text-2xl font-bold mb-6">Articles similaires</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {relatedArticles.map(relatedArticle => (
                                <Link
                                    key={relatedArticle.id}
                                    href={`/articles/${relatedArticle.slug}`}
                                    className="block bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow"
                                >
                                    {relatedArticle.featured_image && (
                                        <div className="aspect-video overflow-hidden">
                                            <img
                                                src={`/storage/${relatedArticle.featured_image}`}
                                                alt={relatedArticle.title}
                                                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                                            />
                                        </div>
                                    )}
                                    <div className="p-4">
                                        <h3 className="font-semibold text-lg mb-2 hover:text-blue-600 transition-colors">
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
                                </Link>
                            ))}
                        </div>
                    </div>
                )}

                {/* Boutons d'action pour les administrateurs et auteurs */}
                {canManageArticle && (
                    <div className="mt-12">
                        <h2 className="text-2xl font-bold mb-6">Actions</h2>
                        <div className="flex items-center space-x-2">
                            <Link
                                href={`/articles/${article.id}/edit`}
                                className="inline-flex items-center px-3 py-1 text-sm text-yellow-600 hover:text-yellow-700"
                            >
                                <Edit className="w-4 h-4 mr-1" />
                                Modifier
                            </Link>
                            <button
                                onClick={handleDelete}
                                className="inline-flex items-center px-3 py-1 text-sm text-red-600 hover:text-red-700"
                            >
                                <Trash2 className="w-4 h-4 mr-1" />
                                Supprimer
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}

// Composant CommentItem
function CommentItem({ comment, onReply, canDelete, level = 0 }) {
    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('fr-FR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const handleDelete = () => {
        if (confirm('Êtes-vous sûr de vouloir supprimer ce commentaire ?')) {
            router.delete(`/comments/${comment.id}`);
        }
    };

    return (
        <div className={`${level > 0 ? 'ml-8 border-l-2 border-gray-200 pl-4' : ''}`}>
            <div className="flex space-x-4">
                {/* Avatar */}
                <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
                        {comment.user.name.charAt(0).toUpperCase()}
                    </div>
                </div>

                <div className="flex-1">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                            <span className="font-semibold text-gray-900">
                                {comment.user.name}
                            </span>
                            <span className="text-sm text-gray-500">
                                {formatDate(comment.created_at)}
                            </span>
                        </div>

                        <div className="flex items-center space-x-2">
                            <button
                                onClick={() => onReply(comment)}
                                className="text-sm text-blue-600 hover:text-blue-800 flex items-center space-x-1"
                            >
                                <Reply className="w-3 h-3" />
                                <span>Répondre</span>
                            </button>

                            {canDelete && (
                                <button
                                    onClick={handleDelete}
                                    className="text-sm text-red-600 hover:text-red-800 flex items-center space-x-1"
                                >
                                    <Trash2 className="w-3 h-3" />
                                    <span>Supprimer</span>
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Contenu */}
                    <div className="text-gray-700 mb-4">
                        {comment.content}
                    </div>

                    {/* Réponses */}
                    {comment.replies && comment.replies.length > 0 && (
                        <div className="space-y-4">
                            {comment.replies.map(reply => (
                                <CommentItem
                                    key={reply.id}
                                    comment={reply}
                                    onReply={onReply}
                                    canDelete={canDelete}
                                    level={level + 1}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}