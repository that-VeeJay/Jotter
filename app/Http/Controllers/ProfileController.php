<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ProfileController extends BaseController
{
    public function index()
    {
        $authenticatedUserPosts = Auth::user()->posts;
        return inertia('Profile/Profile', ['authenticatedUserPosts' => $authenticatedUserPosts]);
    }

    public function update(Request $request)
    {
        $validatedData = $request->validate([
            'profile_picture' => 'nullable|image|mimes:jpg,jpeg,png|max:2048', 
            'name' => 'nullable|string|max:255',
            'bio' => 'nullable|string|max:1000',
         ]);

        if ($request->hasFile('profile_picture')) {
            $file = $request->file('profile_picture');
            $extension = $file->getClientOriginalExtension();
            $filename = time() . '.' . $extension;
            $path = 'profiles/';
            $file->move(public_path($path), $filename);
            $validatedData['profile_picture'] = $filename;
        }

        $user = User::find(Auth::id());

        $updateData = array_filter($validatedData, fn($value) => !is_null($value));

        if (!empty($updateData)) {
            $user->update($updateData);
        }

        return redirect()->back()->with('success', 'Profile updated');
    }
}
