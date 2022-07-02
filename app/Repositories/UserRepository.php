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

    public function buyGood($request)
    {
        $user = $request->user();
        $shop_slug = $request->shop_slug;
        $good_slug = $request->good_slug;

        // Get good
        $good = Part::where('slug', $good_slug) // Select a good by a slug
            ->with(['shops' => function($query) use($shop_slug) {
                $query->where('slug', $shop_slug);
            }])
            ->first();

        // Not enough money
        if($good->price > $user->money) return response()->json([
            "message" => "У вас недостаточно средств",
            "status" => false
        ]);

        // Get shop that own the good
        $shop = $good->shops->first();

        // Get count so
        $count = $shop->pivot->count;

        // Goods out of stock
        if($count == 0) return response()->json([
            "message" => "Все товары закончились",
            "status" => false
        ]);

        // --------------------- //
        // All is well, buy good //
        // --------------------- //

        $user->money -= $good->price;
        $user->save();


        dd($count, $good);
    }
}
