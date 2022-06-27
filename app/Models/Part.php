<?php

namespace App\Models;

use App\traits\HasImage;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\Storage;

class Part extends Model
{
    use HasFactory;
    use SoftDeletes;
    use HasImage;

    // Instead of $fillable
    protected $guarded = ['id'];

    /**
     * Return full url for image
     *
     * @return  \Illuminate\Database\Eloquent\Casts\Attribute
     */
    protected function name(): Attribute
    {
        return Attribute::make(
            get: function ($value) {
                switch ($this->type){
                    case 'GPU':
                        $prefix = 'Видеокарта';
                        break;

                    case 'platform':
                        $prefix = 'Платформа';
                        break;

                    case 'RAM':
                        $prefix = 'Оперативная память';
                        break;

                    case 'PSU':
                        $prefix = 'Блок питания';
                        break;

                    default:
                        $prefix = '';
                        break;
                }

                return $prefix . ' ' . $this->vendor . ' ' . $value;
            }
        );
    }

    public function shops() {
        return $this->belongsToMany(Shop::class);
    }

    public function breakdowns() {
        return $this->belongsToMany(Breakdown::class);
    }

    /**
     * Set default image url for HasImage trait
     *
     * @return string
     */
    public function defaultImageUrl(){
        return 'default-images/' . $this->type . '-default.png';
    }
}
