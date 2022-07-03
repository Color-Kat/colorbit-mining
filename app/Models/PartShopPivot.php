<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\Pivot;

class PartShopPivot extends Pivot
{
    protected $table = 'part_shop';

//    public function shop()
//    {
//        return $this->hasOne(Shop::class);
//    }
//
//    public function part()
//    {
//        return $this->hasOne(Part::class);
//    }
}
