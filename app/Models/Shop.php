<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Shop extends Model
{
    use HasFactory;

    /**
     * Define relationship for parts and shops table. It's all parts of this shop
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */

    public function parts()
    {
        return $this->belongsToMany(Part::class)->withPivot('count');
    }
}
