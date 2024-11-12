<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class PostController extends Controller
{
    public function index()
    {
        $latestPosts = Post::with(['user', 'category'])->latest()->take(4)->get();
        $user = Auth::user();
        return inertia('Home', [
            'latestPosts' => $latestPosts,
            'isAuthenticated' => Auth::check(),
            'user' => $user,
        ]);
    }
}
