<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Rig extends Model
{
    use HasFactory;

    /**
     * Define relationship for
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function GPU()
    {
        return $this
            ->hasOneThrough(PartShopPivot::class, Having::class, 'id', 'id', 'GPU_id')
            ->orderBy('id', 'DESC');
    }
}
