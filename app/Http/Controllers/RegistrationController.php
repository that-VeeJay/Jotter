<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class RegistrationController extends Controller
{
    public function create()
    {
        return inertia('Auth/SignUp');
    }

    public function store(Request $request)
    {
        $validatedAttrs = $request->validate([
            'name' => ['required', 'max:100'],
            'email' => ['required', 'email', 'unique:users,email'],
            'password' => ['required', 'confirmed', 'min:8'],
            'password_confirmation' => ['required'],
        ]);

        $user = User::create($validatedAttrs);

        return redirect()->route('register.create')
            ->with('success', 'Account created successfully.');
    }
}
