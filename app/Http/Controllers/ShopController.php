<?php

namespace App\Http\Controllers;

use App\Models\Shop;
use App\Repositories\ShopRepository;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ShopController extends BaseController
{
    /**
     * @var ShopRepository
     */
    private ShopRepository $shopRepository;

    public function __construct()
    {
        parent::__construct();

        $this->shopRepository = new ShopRepository();
    }

    public function index(Request $request, string $shop_slug) {
        $shop = $this->shopRepository->getShopWithParts($shop_slug);

        return Inertia::render('Shop', [
            'shop' => $shop
        ]);
    }
}
