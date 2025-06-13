import { useState } from "react";
import { useForm } from '@inertiajs/react';
import { Head } from '@inertiajs/react';
import { Category, Tag } from '@/types';

interface Props {
    categories: Category[];
    tags: Tag[];
}

export default function Create({ categories, tags }: Props) {
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        excerpt: '',
        content: '',
        category_id: '',
        tags: [] as number[],
        featured_image: null as File | null,
        status: 'draft'
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('articles.store'));
    };

    return (
        <>
            <Head title="Créer un article" />

            <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
                    Créer un nouvel article
                </h1>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Titre
                        </label>
                        <input
                            type="text"
                            id="title"
                            value={data.title}
                            onChange={e => setData('title', e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                        />
                        {errors.title && (
                            <p className="mt-1 text-sm text-red-600">{errors.title}</p>
                        )}
                    </div>

                    <div>
                        <label htmlFor="excerpt" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Extrait
                        </label>
                        <textarea
                            id="excerpt"
                            value={data.excerpt}
                            onChange={e => setData('excerpt', e.target.value)}
                            rows={3}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                        />
                        {errors.excerpt && (
                            <p className="mt-1 text-sm text-red-600">{errors.excerpt}</p>
                        )}
                    </div>

                    <div>
                        <label htmlFor="content" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Contenu
                        </label>
                        <textarea
                            id="content"
                            value={data.content}
                            onChange={e => setData('content', e.target.value)}
                            rows={10}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                        />
                        {errors.content && (
                            <p className="mt-1 text-sm text-red-600">{errors.content}</p>
                        )}
                    </div>

                    <div>
                        <label htmlFor="category" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Catégorie
                        </label>
                        <select
                            id="category"
                            value={data.category_id}
                            onChange={e => setData('category_id', e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                        >
                            <option value="">Sélectionner une catégorie</option>
                            {categories.map(category => (
                                <option key={category.id} value={category.id}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                        {errors.category_id && (
                            <p className="mt-1 text-sm text-red-600">{errors.category_id}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Tags
                        </label>
                        <div className="mt-2 space-y-2">
                            {tags.map(tag => (
                                <label key={tag.id} className="inline-flex items-center mr-4">
                                    <input
                                        type="checkbox"
                                        value={tag.id}
                                        checked={data.tags.includes(tag.id)}
                                        onChange={e => {
                                            const newTags = e.target.checked
                                                ? [...data.tags, tag.id]
                                                : data.tags.filter(id => id !== tag.id);
                                            setData('tags', newTags);
                                        }}
                                        className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-700"
                                    />
                                    <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                                        {tag.name}
                                    </span>
                                </label>
                            ))}
                        </div>
                        {errors.tags && (
                            <p className="mt-1 text-sm text-red-600">{errors.tags}</p>
                        )}
                    </div>

                    <div>
                        <label htmlFor="featured_image" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Image à la une
                        </label>
                        <input
                            type="file"
                            id="featured_image"
                            onChange={e => setData('featured_image', e.target.files?.[0] || null)}
                            className="mt-1 block w-full text-sm text-gray-500 dark:text-gray-400
                                file:mr-4 file:py-2 file:px-4
                                file:rounded-md file:border-0
                                file:text-sm file:font-semibold
                                file:bg-indigo-50 file:text-indigo-700
                                hover:file:bg-indigo-100
                                dark:file:bg-indigo-900 dark:file:text-indigo-300"
                        />
                        {errors.featured_image && (
                            <p className="mt-1 text-sm text-red-600">{errors.featured_image}</p>
                        )}
                    </div>

                    <div>
                        <label htmlFor="status" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Statut
                        </label>
                        <select
                            id="status"
                            value={data.status}
                            onChange={e => setData('status', e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                        >
                            <option value="draft">Brouillon</option>
                            <option value="published">Publié</option>
                        </select>
                        {errors.status && (
                            <p className="mt-1 text-sm text-red-600">{errors.status}</p>
                        )}
                    </div>

                    <div className="flex justify-end space-x-4">
                        <button
                            type="button"
                            onClick={() => window.history.back()}
                            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700 dark:hover:bg-gray-700"
                        >
                            Annuler
                        </button>
                        <button
                            type="submit"
                            disabled={processing}
                            className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                        >
                            {processing ? 'Création en cours...' : 'Créer l\'article'}
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}
