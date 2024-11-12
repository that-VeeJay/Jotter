<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class PostController extends BaseController
{
    public function index()
    {
        $latestPosts = Post::with(['user', 'category'])->latest()->take(4)->get();
        return inertia('Home', [
            'latestPosts' => $latestPosts,
        ]);
    }

    public function create()
    {
        $categories = Category::all();
        return inertia('Post/Create', ['categories' => $categories]);
    }
}
