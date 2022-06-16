<?php

use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

use App\Http\Controllers\PartController;
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



Route::prefix('shops')->group(function () {
    Route::get('/', [ShopsListController::class, 'index'])->name('shops');

    Route::get('/{shop_slug}', [ShopController::class, 'index'])->name('shop');

    Route::get('/{shop_slug}/{product_slug}', [PartController::class, 'index'])->name('product');
});


// Admin panel
Route::middleware('admin')->prefix('admin')->as('admin.')->group(function() {
    Route::get('/dashboard', [AdminController::class, 'index'])->name('dashboard');

    Route::get('/change-balance', [AdminController::class, 'changeBalance'])->name('change-balance');

    Route::resource('/parts', AdminPartController::class)->names('parts');
});


Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_session'),
    'verified',
])->group(function () {
//    Route::get('/dashboard', function () {
//        return Inertia::render('Dashboard');
//    })->name('dashboard');
});
