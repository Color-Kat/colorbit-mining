<?php

use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Home');
})->name('home');

Route::get('/farms', function () {
    return Inertia::render('Farms');
})->name('farms');






Route::prefix('shops')->group(function () {
    Route::get('/', function () {
        return '/shops';
        return Inertia::render('Shops');
    })->name('shops');

    Route::get('/{slug}', function ($slug) {
        return 'shops/' . $slug;
        return Inertia::render('Shop');
    })->name('shop');

    Route::get('/{slug}/{productId}', function ($slug, $productId) {
        return 'shops/' . $slug . '/' . $productId;
        return Inertia::render('Product');
    })->name('shop');
});


Route::get('/welcome', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
})->name('welcome');

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_session'),
    'verified',
])->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard');
    })->name('dashboard');
});
