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
    protected $table = 'havings';

    /**
     * Get the good of this having
     */
    public function good()
    {
        return $this->belongsTo(PartShopPivot::class, 'part_shop_id', 'id')->with([
            'part',
            'shop:id,slug,warranty,used_market'
        ]);
    }

    /**
     * Get owner of having
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
