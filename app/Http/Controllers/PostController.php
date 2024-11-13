<?php

namespace App\Http\Controllers;

use Log;
use App\Models\Post;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log as logtest;

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
            'image' => ['required', 'mimes:png,jpg,jpeg', 'max:5120'],
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
            // $validatedData['image'] = $path . $filename;
            $validatedData['image'] = $filename;
        }

        // Merge the validated data with additional fields
        $postData = array_merge($validatedData, [
            'user_id' => Auth::id(),
            'category_id' => $request->category,
            'published_at' => now(),
        ]);

        // Create the new post with all data
        Post::create($postData);

        return redirect()->route('home')
            ->with('success', 'Post created successfully!');
    }

    public function show(Post $post)
    {
        $post->load(['user', 'category']);

        $currentCategory = $post->category->id;
        $relatedPosts = Post::where('category_id', $currentCategory)
            ->where('id', '!=', $post->id)
            ->latest()
            ->take(4)
            ->with('user', 'category')
            ->get();


        return inertia('Post/Show', [
            'post' => $post, 
            'relatedPosts' => $relatedPosts
        ]);
    }

    public function destroy(Post $post)
    {
        $post->delete();
        return redirect()->route('home')
            ->with('error', 'Post deleted.');
    }

    public function edit(Post $post)
    {
        $categories = Category::all();
        return inertia('Post/Edit', [
            'post' => $post,
            'categories' => $categories
        ]);
    }

    public function update(Post $post)
    {
        // dd(request()->title);
        $validatedData = request()->validate([
            'title' => ['nullable', 'string'],
            'category' => ['nullable', 'integer'],
            'read_time' => ['nullable', 'integer'],
            'body' => ['nullable'],
        ]);

        $postData = array_merge($validatedData, [
            'category_id' => request()->category, 
            'published_at' => now(),
        ]);

        $post->update($postData);

        return redirect()->route('home');
    }

}