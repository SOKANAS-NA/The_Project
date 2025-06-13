<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Role;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Création de l'admin
        $admin = User::create([
            'name' => 'Admin',
            'email' => 'admin@example.com',
            'password' => Hash::make('admin123'),
        ]);
        $admin->roles()->attach(Role::where('slug', 'admin')->first());

        // Création du webmaster
        $webmaster = User::create([
            'name' => 'Webmaster',
            'email' => 'webmaster@example.com',
            'password' => Hash::make('webmaster123'),
        ]);
        $webmaster->roles()->attach(Role::where('slug', 'webmaster')->first());

        // Création de l'auteur
        $author = User::create([
            'name' => 'Author',
            'email' => 'author@example.com',
            'password' => Hash::make('author123'),
        ]);
        $author->roles()->attach(Role::where('slug', 'author')->first());

        // Création du lecteur
        $reader = User::create([
            'name' => 'Reader',
            'email' => 'reader@example.com',
            'password' => Hash::make('reader123'),
        ]);
        $reader->roles()->attach(Role::where('slug', 'reader')->first());
    }
}
