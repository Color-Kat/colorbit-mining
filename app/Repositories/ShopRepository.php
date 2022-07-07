<?php

namespace App\Repositories;

use App\Models\Shop;

/**
 * Class PartRepository
 * Define short methods to get Part data
 *
 * @package App\Repositories
 */
class ShopRepository extends CoreRepository
{
    /**
     * Define model class
     *
     * @return string
     */
    protected function getModelClass(): string
    {
        return Shop::class;
    }

    /**
     * Return all shops for admin.parts.create
     */
    public function getAllForAdmin() {
        $result = $this
            ->startConditions()
            ::select(['id', 'name'])
            ->where('used_market', false)
            ->orderBy('id', 'DESC')
            ->get();

        return $result;
    }

    /**
     * Return all shops with paginator
     *
     * @return mixed
     */
    public function getAllWithPaginator() {
        $select = [
            'id',
            'slug',
            'image',
            'name',
            'used_market',
            'warranty',
            'delivery_time'
        ];

        $shopsList = Shop::select($select)->paginate(15);

        return $shopsList;
    }

    /**
     * Return shop data with shop's parts paginator
     *
     * @param string $shop_slug
     */
    public function getShopWithParts(string $shop_slug){
        $shopSelect = [
            'id', 'name', 'slug', 'description', 'used_market', 'warranty', 'delivery_time'
        ];

        $shop = Shop::select($shopSelect)
            ->where('slug', $shop_slug)
            ->first();

        // TODO price from pivot!
        $partSelect = [
            'part_id', 'name', 'image', 'slug', 'type', 'vendor', 'price'
        ];

        // $shop['parts'] = $shop->with(
        //            ['parts' => function ($query) use ($partSelect) {
        //                $query->select($partSelect)->withPivot('count');
        //            }]
        //        )->paginate(3);

        // TODO add select with paginator for relationship

        // Get parts for this shop with paginator
        $shop['parts'] = $shop
            ->parts()
            ->withPivot('count')
            ->select($partSelect)
            ->paginate(10);

//        $shop['parts'] = $shop->load( ['parts' => function ($query) use ($partSelect) {
//            $query->select($partSelect);
//        }]);

        return $shop;
    }
}
