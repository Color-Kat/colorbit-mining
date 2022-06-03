<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Part extends Model
{
    use HasFactory;

    public function shops() {
        return $this->belongsToMany(Shop::class);
    }

    public function breakdowns() {
        return $this->belongsToMany(Breakdown::class);
    }
}
