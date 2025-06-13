<?php

namespace Database\Seeders;

use App\Models\Tag;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class TagSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $tags = [
            ['name' => 'Ligue 1', 'color' => '#007bff'],
            ['name' => 'Champions League', 'color' => '#6610f2'],
            ['name' => 'NBA', 'color' => '#fd7e14'],
            ['name' => 'Roland Garros', 'color' => '#20c997'],
            ['name' => 'Wimbledon', 'color' => '#198754'],
            ['name' => 'Tour de France', 'color' => '#ffc107'],
            ['name' => 'JO 2024', 'color' => '#dc3545'],
        ];

        foreach ($tags as $tag) {
            Tag::create($tag);
        }
    }
}
