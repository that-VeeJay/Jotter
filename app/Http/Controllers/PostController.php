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

    public function store(Request $request)
    {
        // Validate the request data
        $validatedData = $request->validate([
            'title' => ['required', 'string'],
            'image' => ['required', 'mimes:png,jpg,jpeg'],
            'category' => ['required', 'integer'],
            'read_time' => ['required', 'integer'],
            'body' => ['required'],
        ]);

        // Check and handle image upload
        if ($request->hasFile('image')) {
            $file = $request->file('image');
            $extension = $file->getClientOriginalExtension();
            $filename = time() . '.' . $extension;
            $path = 'uploads/';
            $file->move(public_path($path), $filename);

            // Set the image path in validated data
            $validatedData['image'] = $path . $filename;
        }

        // Merge the validated data with additional fields
        $postData = array_merge($validatedData, [
            'user_id' => Auth::id(),
            'category_id' => $request->category,
            'published_at' => now(),
        ]);

        // Create the new post with all data
        Post::create($postData);

        return redirect()->route('home');
    }

}