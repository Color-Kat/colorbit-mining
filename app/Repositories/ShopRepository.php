<?php

namespace App\Repositories;

use App\Models\Breakdown;
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
     * @return string
     */
    protected function getModelClass(): string
    {
        return Shop::class;
    }

    /**
     * Return all with paginator
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

        $shopsList = Shop::select($select)->paginate(2);

        return $shopsList;
    }
}
