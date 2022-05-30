<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class ShopController extends Controller
{
    public function index(Request $request, string $shop_slug) {
        return Inertia::render('Shop', [
            'shop_slug' => $shop_slug
        ]);
    }
}
