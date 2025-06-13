<?php

namespace Database\Seeders;

use App\Models\Permission;
use App\Models\Role;
use Illuminate\Database\Seeder;

class RoleAndPermissionSeeder extends Seeder
{
    public function run()
    {
        // Create roles
        $admin = Role::create(['name' => 'Admin', 'slug' => 'admin']);
        $webmaster = Role::create(['name' => 'Webmaster', 'slug' => 'webmaster']);
        $author = Role::create(['name' => 'Author', 'slug' => 'author']);
        $reader = Role::create(['name' => 'Reader', 'slug' => 'reader']);

        // Create permissions
        $permissions = [
            // Article permissions
            ['name' => 'Create Articles', 'slug' => 'create-articles'],
            ['name' => 'Edit Articles', 'slug' => 'edit-articles'],
            ['name' => 'Delete Articles', 'slug' => 'delete-articles'],
            ['name' => 'Publish Articles', 'slug' => 'publish-articles'],
            
            // Category permissions
            ['name' => 'Manage Categories', 'slug' => 'manage-categories'],
            
            // User permissions
            ['name' => 'Manage Users', 'slug' => 'manage-users'],
            ['name' => 'Manage Roles', 'slug' => 'manage-roles'],
            
            // Comment permissions
            ['name' => 'Moderate Comments', 'slug' => 'moderate-comments'],
            
            // Newsletter permissions
            ['name' => 'Manage Newsletter', 'slug' => 'manage-newsletter'],
        ];

        foreach ($permissions as $permission) {
            Permission::create($permission);
        }

        // Assign permissions to roles
        $admin->permissions()->attach(Permission::all());
        
        $webmaster->permissions()->attach(
            Permission::whereIn('slug', [
                'create-articles',
                'edit-articles',
                'delete-articles',
                'publish-articles',
                'manage-categories',
                'moderate-comments',
                'manage-newsletter'
            ])->get()
        );

        $author->permissions()->attach(
            Permission::whereIn('slug', [
                'create-articles',
                'edit-articles'
            ])->get()
        );
    }
} 