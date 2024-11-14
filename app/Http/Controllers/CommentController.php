<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\Comment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CommentController extends Controller
{
    public function store(Request $request, Post $post)
    {
        $validated = request()->validate([
            'body' => ['required', 'string', 'max:500'],
        ]);

        $post->comments()->create([
            'user_id' => Auth::id(),
            'body' => $validated['body']
        ]);

        return redirect()->back()->with('success', 'Comment posted');
    }

    public function fetchComments(Post $post)
    {
        $comments = $post->comments()->with('user')->latest()->get();
        return response()->json($comments);
    }

    public function deleteComment(Comment $comment)
    {
        $comment->delete();
        return redirect()->back()->with('success', 'Comment deleted');
            
    }

    public function updateComment(Request $request, Comment $comment)
    {
        if ($comment->user_id !== Auth::id()) {
        return response()->json(['error' => 'Unauthorized'], 403);
        }

        $validated = $request->validate([
            'body' => ['required', 'string', 'max:500'],
        ]);

        $comment->update([
            'body' => $validated['body']
        ]);

        return redirect()->back()->with('success', 'Comment updated');
    }
}
