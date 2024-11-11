<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class CategoryFactory extends Factory
{
    public function definition(): array
    {
        $categories = ['Technology', 'Lifestyle', 'Health', 'Finance', 'Education', 'Entertainment', 'Travel', 'Food'];

        return [
            'title' => fake()->randomElement($categories)
        ];
    }
}
