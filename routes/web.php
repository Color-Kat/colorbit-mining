<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

use \App\Http\Controllers\UserController;

use App\Http\Controllers\GoodController;
use App\Http\Controllers\ShopController;
use App\Http\Controllers\ShopsListController;

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

Route::get('/farms', function () {
    return Inertia::render('Farms');
})->name('farms');


// Shops & products
Route::prefix('shops')->group(function () {
    Route::get('/', [ShopsListController::class, 'index'])->name('shops');

    Route::get('/{shop_slug}', [ShopController::class, 'index'])->name('shop');

    Route::get('/{shop_slug}/{product_slug}', [GoodController::class, 'index'])->name('good');
});

// Buy good in shop
Route::post('user/buy-good', [UserController::class, 'buyGood'])->name('buy-good');

// Admin panel
Route::middleware('admin')->prefix('admin')->as('admin.')->group(function() {
    Route::get('/dashboard', [AdminController::class, 'index'])->name('dashboard');

    Route::get('/change-balance', [AdminController::class, 'changeBalance'])->name('change-balance');

    Route::prefix('parts')->as('parts.')->group(function() {
        Route::get('/gpu', [AdminPartController::class, 'GPU'])->name('GPU');
        Route::get('/platform', [AdminPartController::class, 'platform'])->name('platform');
        Route::get('/ram', [AdminPartController::class, 'RAM'])->name('RAM');
        Route::get('/psu', [AdminPartController::class, 'PSU'])->name('PSU');
        Route::get('/case', [AdminPartController::class, 'case'])->name('case');
    });

    Route::resource('/parts', AdminPartController::class)->names('parts');

});


//Route::middleware([
//    'auth:sanctum',
//    config('jetstream.auth_session'),
//    'verified',
//])->group(function () {
//    Route::get('/dashboard', function () {
//        return Inertia::render('Dashboard');
//    })->name('dashboard');
//});
