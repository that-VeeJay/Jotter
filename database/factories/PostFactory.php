<?php

namespace Database\Factories;

use App\Models\User;
use App\Models\Category;
use Illuminate\Database\Eloquent\Factories\Factory;

class PostFactory extends Factory
{
    public function definition(): array
    {
        return [
            'title' => fake()->sentence(),
            'body' => fake()->paragraph(3, true),
            'image' => fake()->imageUrl(),
            'read_time' => fake()->numberBetween(5, 10),
            'published_at' => fake()->dateTimeThisYear(),
            'user_id' => User::factory(),
            'category_id' => Category::factory(),
        ];
    }
}
