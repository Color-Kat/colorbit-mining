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
    use \Awobaz\Compoships\Compoships;

    protected $table = 'havings';

    protected $fillable = ['state'];

    /**
     * Get the good with part and shop of this having
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function good()
    {
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
        )->select(['shop_id', 'slug', 'warranty', 'used_market']);

    }

    /**
     * Get owner of having
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get rig with this having.
     * @return \Awobaz\Compoships\Database\Eloquent\Relations\HasOne
     */
    public function rig() {
        return $this->hasOne(Rig::class, $this->part->type . '_id');
    }

    // === Some parts doesn't have this parameters === //
    public function getLoadingAttribute($value) {
        $loading = $this->part->type === 'case' ? null : $value;

        return $loading;
    }

    public function getTempAttribute($value) {
        return $value;
    }

    public function getMaxTempAttribute($value) {
        return $this->part->type === 'case' ? null : $value;
    }

    public function getCurrentPowerAttribute($value) {
        return $this->part->type === 'case' || $this->part->type === 'PSU' ? null : $value;
    }
}
