<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PostController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\SessionController;
use App\Http\Controllers\RegistrationController;

Route::get('/', [PostController::class, 'index'])->name('home');

Route::get('/post/create', [PostController::class, 'create']);
Route::post('/create', [PostController::class, 'store']);


Route::get('/post/{post}', [PostController::class, 'show']);
Route::delete('/post/{post}', [PostController::class, 'destroy']);
Route::get('/posts/{post}/edit', [PostController::class, 'edit']);

Route::put('/posts/{post}', [PostController::class, 'update']);


Route::get('/register', [RegistrationController::class, 'create'])->name('register.create');
Route::post('/register', [RegistrationController::class, 'store']);



Route::get('/login', [SessionController::class, 'create'])->name('login.create');
Route::post('/login', [SessionController::class, 'store']);

Route::post('/logout', [SessionController::class, 'destroy'])->name('logout');


Route::inertia('/test', 'Test');



Route::post('/posts/{post}/comments', [CommentController::class, 'store'])->middleware('auth');
Route::get('/posts/{post}/comments', [CommentController::class, 'fetchComments']);
Route::post('/comments/{comment}', [CommentController::class, 'deleteComment']);

Route::put('/comments/{comment}', [CommentController::class, 'updateComment']);