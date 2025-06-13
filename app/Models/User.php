<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * Les attributs autorisés pour l'assignation en masse.
     *
     * @var array<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    /**
     * Les attributs masqués lors de la sérialisation.
     *
     * @var array<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Les attributs qui doivent être castés.
     *
     * @return array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];

    // ----------------------
    // 🔗 Relations
    // ----------------------

    public function articles()
    {
        return $this->hasMany(Article::class);
    }

    public function comments()
    {
        return $this->hasMany(Comment::class);
    }

    public function likes()
    {
        return $this->hasMany(Like::class);
    }

    public function roles()
    {
        return $this->belongsToMany(Role::class);
    }

    public function hasRole($role)
    {
        return $this->roles()->where('slug', $role)->exists();
    }

    public function hasAnyRole($roles)
    {
        return $this->roles()->whereIn('slug', $roles)->exists();
    }

    // ----------------------
    // 🔐 Rôles / permissions
    // ----------------------

    public function isAdmin()
    {
        return $this->role === 'admin';
    }

    public function isWebmaster()
    {
        return $this->role === 'webmaster';
    }

    public function isAuteur()
    {
        return $this->role === 'auteur';
    }

    public function canManageArticles()
    {
        return $this->hasAnyRole(['admin', 'webmaster']);
    }

    public function canCreateArticle()
    {
        return $this->hasAnyRole(['admin', 'webmaster', 'author']);
    }
}
