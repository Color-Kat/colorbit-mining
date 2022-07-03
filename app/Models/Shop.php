<?php

namespace App\Models;

use App\traits\HasImage;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Shop extends Model
{
    use HasFactory;
    use HasImage;

    /**
     * Define relationship for parts and shops table. It's all parts of this shop
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */

    public function parts()
    {
        return $this
            ->belongsToMany(Part::class)
            ->using(PartShopPivot::class)
            ->withPivot('id', 'count')
            ->orderBy('part_id', 'DESC');
    }
}
