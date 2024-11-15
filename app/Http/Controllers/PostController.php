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
        $categories = Category::all();
        
        return inertia('Home', [
            'latestPosts' => $latestPosts,
            'categories' => $categories
        ]);
    }

    public function create()
    {
        $categories = Category::all();
        return inertia('Post/Create', ['categories' => $categories]);
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'title' => ['required', 'string'],
            'image' => ['required', 'mimes:png,jpg,jpeg', 'max:5120'],
            'category' => ['required', 'integer'],
            'read_time' => ['required', 'integer'],
            'body' => ['required'],
        ]);

        if ($request->hasFile('image')) {
            $file = $request->file('image');
            $extension = $file->getClientOriginalExtension();
            $filename = time() . '.' . $extension;
            $path = 'uploads/';
            $file->move(public_path($path), $filename);

            $validatedData['image'] = $filename;
        }

        $postData = array_merge($validatedData, [
            'user_id' => Auth::id(),
            'category_id' => $request->category,
            'published_at' => now(),
        ]);

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
            'relatedPosts' => $relatedPosts,
            'comments' => $post->comments()->with('user')->latest()->get(),
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

        return redirect()->route('post.show', ['post' => $post->id])
            ->with('success', 'Post updated successfully!');
    }
}