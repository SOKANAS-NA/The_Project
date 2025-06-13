<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use App\Models\Article;
use Illuminate\Http\Request;

class CommentController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Enregistrer un nouveau commentaire sur un article donné.
     */
    public function store(Request $request, Article $article)
    {
        $request->validate([
            'content' => 'required|string|max:1000',
            'parent_id' => 'nullable|exists:comments,id'
        ]);

        $comment = new Comment([
            'content' => $request->input('content'),
            'user_id' => auth()->id(),
            'article_id' => $article->id,
            'parent_id' => $request->input('parent_id'),
            'is_approved' => true, // Auto-approbation pour simplifier
        ]);

        $comment->save();

        return back()->with('success', 'Commentaire ajouté avec succès!');
    }

    /**
     * Supprimer un commentaire donné, sous condition d'autorisation.
     */
    public function destroy(Comment $comment)
    {
        if ($comment->user_id !== auth()->id() && !auth()->user()->canManageArticles()) {
            abort(403, 'Action non autorisée.');
        }

        $comment->delete();

        return back()->with('success', 'Commentaire supprimé avec succès!');
    }
}
