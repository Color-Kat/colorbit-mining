<?php

namespace App\Http\Controllers;

use App\Models\Shop;
use App\Repositories\ShopRepository;
use Inertia\Inertia;

class ShopsListController extends BaseController
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

    public function index(): \Inertia\Response
    {
        $shopsList = $this->shopRepository->getAllWithPaginator();

        return Inertia::render('ShopsList', [
            'shopsList' => $shopsList
        ]);
    }
}
