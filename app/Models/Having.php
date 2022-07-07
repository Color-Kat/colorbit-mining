<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * Class Having is one item of all user's havings.
 * Here is good (part + shop).
 *
 * @package App\Models
 */

class Having extends Model
{
    use \Znck\Eloquent\Traits\BelongsToThrough;

    protected $table = 'havings';

    /**
     * Get the good with part and shop of this having
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function good() {
        return $this->belongsTo(
            PartShopPivot::class,
            'part_shop_id',
            'id'
        )->with([
            'part',
            'shop:id,slug,warranty,used_market'
        ]);
    }

    /**
     * Get the part of this having
     */
    public function part()
    {
        return $this->belongsToThrough(
            Part::class,
            PartShopPivot::class,
            'part_shop_id'
        );


    }

    /**
     * Get the shop of this having's part
     */
    public function shop()
    {
        return $this->belongsToThrough(
            Shop::class,
            PartShopPivot::class,
            'part_shop_id'
        );

    }

    /**
     * Get owner of having
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
