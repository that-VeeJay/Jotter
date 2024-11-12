<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class BaseController extends Controller
{
    public function __construct()
    {
        inertia()->share('isAuthenticated', Auth::check());
        inertia()->share('user', Auth::user());
    }
}
