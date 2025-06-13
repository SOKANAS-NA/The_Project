<?php

namespace App\Http\Controllers;

use App\Models\Article;
use App\Models\Like;
use Illuminate\Http\Request;

class LikeController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Permet à l'utilisateur d'ajouter ou retirer un "like" à un article.
     */
    public function toggle(Article $article)
    {
        $userId = auth()->id();

        $like = Like::where([
            'user_id' => $userId,
            'article_id' => $article->id
        ])->first();

        if ($like) {
            $like->delete();
            $liked = false;
        } else {
            Like::create([
                'user_id' => $userId,
                'article_id' => $article->id
            ]);
            $liked = true;
        }

        return response()->json([
            'liked' => $liked,
            'likes_count' => $article->likes()->count(),
        ]);
    }
}
