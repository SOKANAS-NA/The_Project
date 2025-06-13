<?php

use App\Http\Controllers\HomeController;
use App\Http\Controllers\ArticleController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\LikeController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\UserController as AdminUserController;
use App\Http\Controllers\Admin\ArticleController as AdminArticleController;
use App\Http\Controllers\Admin\CategoryController as AdminCategoryController;
use App\Http\Controllers\Admin\TagController as AdminTagController;
use App\Http\Controllers\Admin\NewsletterController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\TagController;
use App\Http\Controllers\NewsletterController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Illuminate\Support\Facades\Mail;

// Page de bienvenue
Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

// Route tableau de bord utilisateur
Route::middleware(['auth', 'verified'])->group(function () {
    // Routes protégées par authentification
    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard');
    })->name('dashboard');

    // Routes pour les articles
    Route::get('/articles', [ArticleController::class, 'index'])->name('articles.index');
    Route::get('/articles/{article}', [ArticleController::class, 'show'])->name('articles.show');
    
    // Routes protégées par rôle pour la gestion des articles
    Route::middleware(['role:admin,webmaster,author'])->group(function () {
        Route::get('/articles/create', [ArticleController::class, 'create'])->name('articles.create');
        Route::post('/articles', [ArticleController::class, 'store'])->name('articles.store');
        Route::get('/articles/{article}/edit', [ArticleController::class, 'edit'])->name('articles.edit');
        Route::put('/articles/{article}', [ArticleController::class, 'update'])->name('articles.update');
        Route::delete('/articles/{article}', [ArticleController::class, 'destroy'])->name('articles.destroy');
    });

    // Routes pour les commentaires
    Route::post('/articles/{article}/comments', [CommentController::class, 'store'])->name('comments.store');
    Route::delete('/comments/{comment}', [CommentController::class, 'destroy'])->name('comments.destroy');

    // Routes pour les likes
    Route::post('/articles/{article}/like', [LikeController::class, 'toggle'])->name('likes.toggle');

    // Routes pour la newsletter
    Route::post('/newsletter/subscribe', [NewsletterController::class, 'subscribe'])->name('newsletter.subscribe');
    Route::post('/newsletter/unsubscribe', [NewsletterController::class, 'unsubscribe'])->name('newsletter.unsubscribe');

    // Routes protégées par rôle admin
    Route::middleware(['role:admin'])->group(function () {
        Route::resource('categories', CategoryController::class);
        Route::resource('tags', TagController::class);
        Route::get('/newsletter', [NewsletterController::class, 'index'])->name('newsletter.index');
        Route::post('/newsletter/send', [NewsletterController::class, 'send'])->name('newsletter.send');
    });

    // Routes pour le profil
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

// Routes admin (auth + rôles)
Route::prefix('admin')->name('admin.')->middleware(['auth', 'role:admin,webmaster'])->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

    Route::middleware('role:admin')->group(function () {
        Route::resource('users', AdminUserController::class);
    });

    Route::resource('articles', AdminArticleController::class);
    Route::resource('categories', AdminCategoryController::class);
    Route::resource('tags', AdminTagController::class);

    Route::get('/newsletter', [NewsletterController::class, 'index'])->name('newsletter.index');
    Route::post('/newsletter/send', [NewsletterController::class, 'send'])->name('newsletter.send');
});

// Routes newsletter
Route::post('/newsletter/send', [NewsletterController::class, 'sendNewsletter'])
    ->middleware(['auth', 'role:admin,webmaster'])
    ->name('newsletter.send');

// Route de test pour l'email
Route::get('/test-mail', function () {
    Mail::to('test@example.com')->send(new \App\Mail\NewsletterMail(
        'Test Email',
        'Ceci est un email de test pour vérifier la configuration du système de mailing.'
    ));
    return 'Email envoyé !';
});

// Auth routes (Breeze)
require __DIR__.'/auth.php';
