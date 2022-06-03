<?php

namespace App\Http\Controllers;

use App\Models\Shop;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ShopsListController extends Controller
{
    public function index(): \Inertia\Response
    {
        $shopsList = Shop::select('id', 'image', 'name', 'description', 'warranty', 'delivery_time')->get();

        return Inertia::render('ShopsList', [
            'shopsList' => $shopsList
        ]);
    }
}
