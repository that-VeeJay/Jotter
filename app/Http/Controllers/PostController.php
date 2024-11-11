<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;

class PostController extends Controller
{
    public function index()
    {
        $latestPosts = Post::with(['user', 'category'])->latest()->take(4)->get();
        return inertia('Home', ['latestPosts' => $latestPosts]);
    }
}
