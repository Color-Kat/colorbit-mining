<?php

namespace App\Models;

use App\traits\HasImage;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Part extends Model
{
    use HasFactory;
    use HasImage;

    // Instead of $fillable
    protected $guarded = ['id'];

    public function shops() {
        return $this->belongsToMany(Shop::class);
    }

    public function breakdowns() {
        return $this->belongsToMany(Breakdown::class);
    }

}
