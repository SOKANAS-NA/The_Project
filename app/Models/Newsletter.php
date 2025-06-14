<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Newsletter extends Model
{
    use HasFactory;

    protected $fillable = [
        'email',
        'is_active',
        'preferences'
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'preferences' => 'array'
    ];
} 