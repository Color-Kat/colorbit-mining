<?php

namespace App\Repositories;

use App\Models\Part;
use App\Models\Shop;
use Illuminate\Support\Str;

/**
 * Class PartRepository
 * Define short methods to get Part data
 *
 * @package App\Repositories
 */
class GoodRepository extends CoreRepository
{
    /**
     * Define model class
     * @return string
     */
    protected function getModelClass(): string
    {
        return Part::class;
    }

    /**
     * Get the good by shop slug and part slug.
     * With count and breakdowns
     */
    public function getGood($shop_slug, $good_slug)
    {
        $good = Part::where('slug', $good_slug) // Select a part by a slug
            ->with('shops')
            ->whereHas('shops', function ($query) use ($shop_slug) {
                $query->where('slug', $shop_slug); // the part belongs to the shop with a slug
            })
            ->with('breakdowns:title') // Add breakdowns that belongs to the part
            ->first();

        // Get count so
        $good['count'] = 0;
        $good->shops->each(function($shop) use ($shop_slug, $good){
            if($shop->slug == $shop_slug) $good['count'] = $shop->pivot->count;
        });

        $good->setAppends(['rawName']);

        return $good;
    }

    public function getOwnerShop($shop_slug, $good_slug) {
        $ownerShopSelect = [
            'name',
            'slug',
            'image',
            'warranty',
            'delivery_time'
        ];

        $ownerShop = Shop::where('slug', $shop_slug) // Select a shop by a slug
            ->whereHas('parts', function ($query) use ($good_slug) {
                $query->where('slug', $good_slug); // the shop belongs to the part with a slug
            })
            ->select($ownerShopSelect)
            ->first();

        return $ownerShop;
    }
}
