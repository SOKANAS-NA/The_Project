<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Category extends Model
{
    use HasFactory;

    /**
     * Les champs autorisés à être remplis via assignation de masse
     *
     * @var array<string>
     */
    protected $fillable = ['name', 'slug', 'description', 'color'];

    /**
     * Boot method : auto-génère le slug si non fourni
     */
    protected static function boot()
    {
        parent::boot();
        
        static::creating(function ($category) {
            if (empty($category->slug)) {
                $category->slug = Str::slug($category->name);
            }
        });
    }

    /**
     * Relation : une catégorie a plusieurs articles
     */
    public function articles()
    {
        return $this->hasMany(Article::class);
    }

    /**
     * Utiliser le slug au lieu de l'ID dans les URLs
     */
    public function getRouteKeyName()
    {
        return 'slug';
    }
}
