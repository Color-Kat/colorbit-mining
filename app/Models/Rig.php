<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Rig extends Model
{
    use HasFactory;
    use \Znck\Eloquent\Traits\BelongsToThrough;

    /**
     * Define relationship for any part type.
     * Rigs -> havings -> PartShopPivot -> Part
     *
     * @return \Znck\Eloquent\Relations\BelongsToThrough
     */
    public function belongsToPart($localKey): \Znck\Eloquent\Relations\BelongsToThrough
    {
        return $this
            ->belongsToThrough(
                Part::class,
                [PartShopPivot::class, Having::class],
                $localKey,
                null,
                [
                    Having::class => $localKey,
                    PartShopPivot::class => 'part_shop_id'
                ]
            )
            ->orderBy('id', 'DESC');
    }

    public function GPU(){
        return $this->belongsToPart('GPU_id');
    }

    public function platform(){
        return $this->belongsToPart('platform_id');
    }

    public function RAM(){
        return $this->belongsToPart('RAM_id');
    }

    public function PSU(){
        return $this->belongsToPart('PSU_id');
    }

    public function case(){
        return $this->belongsToPart('case_id');
    }

//    /**
//     * Define relationship for
//     *
//     * @return \Znck\Eloquent\Relations\BelongsToThrough
//     */
//    public function GPU()
//    {
//        $localKey = 'GPU_id';
//
//        return $this
//            ->belongsToThrough(
//                Part::class,
//                [PartShopPivot::class, Having::class],
//                $localKey,
//                null,
//                [
//                    Having::class => $localKey,
//                    PartShopPivot::class => 'part_shop_id'
//                ]
//            )
//            ->orderBy('id', 'DESC');
//    }
//
//    /**
//     * Define relationship for
//     *
//     * @return \Znck\Eloquent\Relations\BelongsToThrough
//     */
//    public function platform()
//    {
//        $localKey = 'platform_id';
//
//        return $this
//            ->belongsToThrough(
//                Part::class,
//                [PartShopPivot::class, Having::class],
//                $localKey,
//                null,
//                [
//                    Having::class => $localKey,
//                    PartShopPivot::class => 'part_shop_id'
//                ]
//            )
//            ->orderBy('id', 'DESC');
//    }
//
//    /**
//     * Define relationship for
//     *
//     * @return \Znck\Eloquent\Relations\BelongsToThrough
//     */
//    public function RAM()
//    {
//        $localKey = 'RAM_id';
//
//        return $this
//            ->belongsToThrough(
//                Part::class,
//                [PartShopPivot::class, Having::class],
//                $localKey,
//                null,
//                [
//                    Having::class => $localKey,
//                    PartShopPivot::class => 'part_shop_id'
//                ]
//            )
//            ->orderBy('id', 'DESC');
//    }


}
