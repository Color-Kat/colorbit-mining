<?php

namespace App\Http\Controllers;

use App\Models\Shop;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ShopController extends Controller
{
    public function index(Request $request, string $shop_slug) {
        $shop = Shop::select('id', 'name', 'description', 'warranty', 'delivery_time')
            ->where('slug', $shop_slug)
//            ->with(['parts' => function($q) {
//                return $q->paginate(3);
//            }])
            ->first();

        $parts = $shop->parts()->with('breakdowns')->paginate(3);

        return Inertia::render('Shop', [
            'shop' => $shop,
            'parts' => $parts
        ]);
    }
}
