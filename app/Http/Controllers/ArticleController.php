<?php

namespace App\Http\Controllers;

use App\Models\Article;
use App\Models\Category;
use App\Models\Tag;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;

class ArticleController extends Controller
{
    public function index(Request $request)
    {
        $query = Article::with(['user', 'category', 'tags'])
            ->published()
            ->latest('published_at');

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

        $articles = $query->paginate(12);
        $categories = Category::withCount('articles')->get();
        $tags = Tag::withCount('articles')->get();

        $popularArticles = Article::with(['user', 'category'])
            ->published()
            ->orderBy('views', 'desc')
            ->limit(5)
            ->get();

        return Inertia::render('Articles/Index', [
            'articles' => $articles,
            'categories' => $categories,
            'tags' => $tags,
            'popularArticles' => $popularArticles,
            'filters' => $request->only(['category', 'tag', 'search']),
        ]);
    }

    public function show(Article $article)
    {
        $article->increment('views');

        $article->load([
            'user',
            'category',
            'tags',
            'comments' => function ($query) {
                $query->with('user')
                      ->approved()
                      ->parent()
                      ->latest();
            },
            'comments.replies' => function ($query) {
                $query->with('user')->approved();
            }
        ]);

        $userLiked = auth()->check()
            ? $article->likes()->where('user_id', auth()->id())->exists()
            : false;

        $relatedArticles = Article::with(['user', 'category'])
            ->published()
            ->where('category_id', $article->category_id)
            ->where('id', '!=', $article->id)
            ->limit(4)
            ->get();

        return Inertia::render('Articles/Show', [
            'article' => $article,
            'userLiked' => $userLiked,
            'relatedArticles' => $relatedArticles
        ]);
    }

    public function create()
    {
        $categories = Category::all();
        $tags = Tag::all();

        return Inertia::render('Articles/Create', [
            'categories' => $categories,
            'tags' => $tags
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'excerpt' => 'required|string|max:500',
            'content' => 'required|string',
            'category_id' => 'required|exists:categories,id',
            'tags' => 'array',
            'tags.*' => 'exists:tags,id',
            'featured_image' => 'nullable|image|max:2048',
            'status' => 'required|in:draft,published'
        ]);

        $article = new Article($request->only([
            'title', 'excerpt', 'content', 'category_id', 'status'
        ]));

        $article->slug = Str::slug($request->title);
        $article->user_id = auth()->id();

        if ($request->status === 'published') {
            $article->published_at = now();
        }

        if ($request->hasFile('featured_image')) {
            $path = $request->file('featured_image')->store('articles', 'public');
            $article->featured_image = $path;
        }

        $article->save();

        if ($request->filled('tags')) {
            $article->tags()->attach($request->tags);
        }

        return redirect()->route('articles.index')
            ->with('success', 'Article créé avec succès!');
    }

    public function edit(Article $article)
    {
        if (!auth()->user()->canManageArticles() && $article->user_id !== auth()->id()) {
            abort(403);
        }

        $categories = Category::all();
        $tags = Tag::all();
        $article->load('tags');

        return Inertia::render('Articles/Edit', [
            'article' => $article,
            'categories' => $categories,
            'tags' => $tags
        ]);
    }

    public function update(Request $request, Article $article)
    {
        if (!auth()->user()->canManageArticles() && $article->user_id !== auth()->id()) {
            abort(403);
        }

        $request->validate([
            'title' => 'required|string|max:255',
            'excerpt' => 'required|string|max:500',
            'content' => 'required|string',
            'category_id' => 'required|exists:categories,id',
            'tags' => 'array',
            'tags.*' => 'exists:tags,id',
            'featured_image' => 'nullable|image|max:2048',
            'status' => 'required|in:draft,published'
        ]);

        $article->fill($request->only([
            'title', 'excerpt', 'content', 'category_id', 'status'
        ]));

        $article->slug = Str::slug($request->title);

        if ($request->status === 'published' && !$article->published_at) {
            $article->published_at = now();
        }

        if ($request->hasFile('featured_image')) {
            $path = $request->file('featured_image')->store('articles', 'public');
            $article->featured_image = $path;
        }

        $article->save();

        if ($request->has('tags')) {
            $article->tags()->sync($request->tags);
        }

        return redirect()->route('articles.index')
            ->with('success', 'Article mis à jour avec succès!');
    }

    public function destroy(Article $article)
    {
        if (!auth()->user()->canManageArticles() && $article->user_id !== auth()->id()) {
            abort(403);
        }

        $article->delete();

        return redirect()->route('articles.index')
            ->with('success', 'Article supprimé avec succès!');
    }
}
