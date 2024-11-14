<?php

namespace Database\Seeders;

use App\Models\Post;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\User;
use App\Models\Category;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::factory()->create([
            'name' => 'Vee Jay',
            'email' => 'vee@gmail.com',
            'password' => 12345678,
        ]);

        User::factory()->create([
            'name' => 'Meljene',
            'email' => 'mel@gmail.com',
            'password' => 12345678,
        ]);

        Category::factory(10)->create();
    }
}
