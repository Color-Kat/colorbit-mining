<?php

namespace App\Repositories;

use App\Jobs\BuyWithDeliveryJob;
use App\Models\Having;
use App\Models\Part;
use App\Models\User;
use Illuminate\Database\Eloquent\Relations\Pivot;

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

        // Not auth
        if(!$user) return response()->json([
            "message" => "Вы не авторизированны",
            "status" => false
        ]);

        // Get good
        $good = Part::where('slug', $good_slug) // Select a good by a slug
            ->with([
                'shops' => function($query) use($shop_slug) {
                    $query->where('slug', $shop_slug)->withPivot('id');
                }
            ])
            ->first();

        // There's no such good
        if(!$good) return response()->json([
            "message" => "Такого товара не существует",
            "status" => false
        ]);

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

        // Decrease user's money
        $user->money -= $good->price;
        $user->save();

        // Decrease count of good in the shop
        $good->shops()->updateExistingPivot($shop->id, [
            'count' => --$count
        ]);

        // TODO change minutes to hours
        // Create new Having for user
        BuyWithDeliveryJob::dispatch($user, $shop->pivot->id)
            ->delay(now()->addMinutes($shop->delivery_time));

        return response()->json([
            "message" => "Товар оплачен.",
            "status" => true
        ]);
    }

    public function getHavingsWithPaginator($request) {
        $user = $request->user();

        // Not auth
        if(!$user) return response()->json([
            "message" => "Вы не авторизированны",
            "status" => false
        ]);

        $havings = $user->havings()->with(['good'])->paginate(10);

        return $havings;
    }
}
