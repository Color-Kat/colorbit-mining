<?php

namespace App\Http\Controllers;

use App\Models\Part;
use App\Repositories\GoodRepository;
use Inertia\Inertia;

class GoodController extends BaseController
{
    /**
     * @var GoodRepository
     */
    private GoodRepository $goodRepository;

    public function __construct()
    {
        parent::__construct();

        $this->goodRepository = new GoodRepository();
    }

    public function index($shop_slug, $product_slug)
    {
        $good = $this->goodRepository->getGood($shop_slug, $product_slug);
        $ownerShop = $this->goodRepository->getOwnerShop($shop_slug, $product_slug);

        return Inertia::render('Good', [
            'good' => $good,
            'ownerShop' => $ownerShop
        ]);
    }
}
