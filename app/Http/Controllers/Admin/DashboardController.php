<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Article;
use App\Models\Category;
use App\Models\Comment;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $stats = [
            'users' => User::count(),
            'articles' => Article::count(),
            'published_articles' => Article::where('status', 'published')->count(),
            'draft_articles' => Article::where('status', 'draft')->count(),
            'categories' => Category::count(),
            'comments' => Comment::count(),
            'pending_comments' => Comment::where('is_approved', false)->count(),
        ];

        $recentArticles = Article::with(['user', 'category'])
            ->latest()
            ->limit(5)
            ->get();

        $recentComments = Comment::with(['user', 'article'])
            ->latest()
            ->limit(5)
            ->get();

        $monthlyStats = Article::selectRaw('MONTH(created_at) as month, COUNT(*) as count')
            ->whereYear('created_at', date('Y'))
            ->groupBy('month')
            ->orderBy('month')
            ->get();

        return Inertia::render('Admin/Dashboard', [
            'stats' => $stats,
            'recentArticles' => $recentArticles,
            'recentComments' => $recentComments,
            'monthlyStats' => $monthlyStats
        ]);
    }
}
