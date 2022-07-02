<?php

namespace App\Repositories;

use App\Models\Part;
use App\Models\Shop;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;

/**
 * Class PartRepository
 * Define short methods to get Part data
 *
 * @package App\Repositories
 */
class UserRepository extends CoreRepository
{
    /**
     * Define model class
     * @return string
     */
    protected function getModelClass(): string
    {
        return User::class;
    }

    public function buyGood(string $shop_slug, string $good_slug)
    {
        $user = Auth::user();

        // Get good
        $good = Part::where('slug', $good_slug) // Select a good by a slug
            ->with(['shops' => function($query) use($shop_slug) {
                $query->where('slug', $shop_slug);
            }])
            ->first();



        // Get shop that own the good
        $shop = $good->shops->first();

        // Get count so
        $count = $shop->pivot->count;



        dd($count, $good);
    }
}
