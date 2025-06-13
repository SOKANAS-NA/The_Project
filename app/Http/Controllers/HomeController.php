<?php

namespace App\Http\Controllers;

use App\Models\Article;
use App\Models\Category;
use App\Models\Tag;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function index(Request $request)
    {
        $query = Article::with(['user', 'category', 'tags'])
            ->published()
            ->latest('published_at');

        // Filtres
        if ($request->filled('category')) {
            $query->byCategory($request->category);
        }

        if ($request->filled('tag')) {
            $query->byTag($request->tag);
        }

        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                  ->orWhere('content', 'like', "%{$search}%")
                  ->orWhere('excerpt', 'like', "%{$search}%");
            });
        }

        $articles = $query->paginate(20);
        $categories = Category::withCount('articles')->get();
        $tags = Tag::withCount('articles')->get();

        // Articles populaires
        $popularArticles = Article::with(['user', 'category'])
            ->published()
            ->orderBy('views', 'desc')
            ->limit(5)
            ->get();

        return Inertia::render('Home', [
            'articles' => $articles,
            'categories' => $categories,
            'tags' => $tags,
            'popularArticles' => $popularArticles,
            'filters' => $request->only(['category', 'tag', 'search']),
        ]);
    }
}
