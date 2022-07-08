<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

use \App\Http\Controllers\UserController;

use App\Http\Controllers\GoodController;
use App\Http\Controllers\ShopController;
use App\Http\Controllers\ShopsListController;

use \App\Http\Controllers\MiningController;

use App\Http\Controllers\Admin\AdminController;
use App\Http\Controllers\Admin\PartController as AdminPartController;

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


// Shops & products
Route::prefix('shops')->group(function () {
    Route::get('/', [ShopsListController::class, 'index'])->name('shops');

    Route::get('/{shop_slug}', [ShopController::class, 'index'])->name('shop');

    Route::get('/{shop_slug}/{product_slug}', [GoodController::class, 'index'])->name('good');
});


// User's actions
Route::middleware('auth')->prefix('user')->as('user.')->group(function () {
    // Buy good in shop
    Route::post('/buy-good', [UserController::class, 'buyGood'])->name('buy-good');
});


// Farms, Havings,..
Route::middleware('auth')->prefix('mining')->as('mining.')->group(function () {
    // My rigs/farms
    Route::get('/farm', [MiningController::class, 'farm'])->name('farm');

    // User's havings by types
    Route::prefix('havings')->as('havings.')->group(function() {
        Route::get('/gpu', [MiningController::class, 'GPU'])->name('GPU');
        Route::get('/platform', [MiningController::class, 'platform'])->name('platform');
        Route::get('/ram', [MiningController::class, 'RAM'])->name('RAM');
        Route::get('/psu', [MiningController::class, 'PSU'])->name('PSU');
        Route::get('/case', [MiningController::class, 'case'])->name('case');
    });
    // All user's havings
    Route::get('/havings', [MiningController::class, 'havings'])->name('havings');
});


// Admin panel
Route::middleware('admin')->prefix('admin')->as('admin.')->group(function() {
    // Main admin page
    Route::get('/dashboard', [AdminController::class, 'index'])->name('dashboard');

    // Page with change user's balance form
    Route::get('/change-balance', [AdminController::class, 'changeBalancePage'])->name('change-balance-page');
    Route::post('/change-balance', [AdminController::class, 'changeBalance'])->name('change-balance');

    // Pages with all types of parts
    Route::prefix('parts')->as('parts.')->group(function() {
        Route::get('/gpu', [AdminPartController::class, 'GPU'])->name('GPU');
        Route::get('/platform', [AdminPartController::class, 'platform'])->name('platform');
        Route::get('/ram', [AdminPartController::class, 'RAM'])->name('RAM');
        Route::get('/psu', [AdminPartController::class, 'PSU'])->name('PSU');
        Route::get('/case', [AdminPartController::class, 'case'])->name('case');
    });

    Route::resource('/parts', AdminPartController::class)->names('parts');
});
