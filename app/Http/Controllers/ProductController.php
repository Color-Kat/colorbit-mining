<?php

namespace App\Http\Controllers;

use App\Models\Part;
use App\Models\Shop;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductController extends Controller
{
    public function index(Request $request, string $shop_slug, string $product_slug) {
        $part = Part::select('id', 'name', 'type')
            ->where('slug', $product_slug)
            ->whereHas('shops', function($query) use ($shop_slug) {
                $query->where('slug', $shop_slug);
            })
            ->with('breakdowns:title,chance,condition')
        ->first();

        return Inertia::render('Product', [
            'part' => $part
        ]);
    }
}
