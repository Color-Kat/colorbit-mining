<?php

namespace App\Repositories;

use App\Models\Part;
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
    public function getGood($shop_slug, $product_slug)
    {
        $good = Part::where('slug', $product_slug) // Select a part by a slug
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

        return $good;
    }

}
