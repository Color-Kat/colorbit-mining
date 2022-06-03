<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductController extends Controller
{
    public function index(Request $request, string $shop_slug, string $product_slug) {


        return Inertia::render('Product', [
            'shop_slug' => $shop_slug,
            'product_slug' => $product_slug
        ]);
    }
}
