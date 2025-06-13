<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = [
            ['name' => 'Football', 'color' => '#28a745', 'description' => 'Actualités football'],
            ['name' => 'Basketball', 'color' => '#fd7e14', 'description' => 'Actualités basketball'],
            ['name' => 'Tennis', 'color' => '#20c997', 'description' => 'Actualités tennis'],
            ['name' => 'Rugby', 'color' => '#6f42c1', 'description' => 'Actualités rugby'],
            ['name' => 'Cyclisme', 'color' => '#ffc107', 'description' => 'Actualités cyclisme'],
        ];

        foreach ($categories as $category) {
            Category::create($category);
        }
    }
}
