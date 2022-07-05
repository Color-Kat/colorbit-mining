<?php

namespace App\Models;

use App\traits\HasImage;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Part extends Model
{
    use HasFactory;
    use SoftDeletes;
    use HasImage;

    /**
     * The attributes that should be hidden for arrays.
     */
    protected $hidden = ['created_at', 'updated_at', 'deleted_at'];

    // Instead of $fillable
    protected $guarded = ['id'];

    public function shops()
    {
        return $this
            ->belongsToMany(Shop::class)
            ->withPivot('count')
            ->using(PartShopPivot::class);
    }

    public function breakdowns()
    {
        return $this->belongsToMany(Breakdown::class);
    }

    /**
     * Return processed name of part
     *
     * @return string
     */
    public function getNameAttribute($value): string
    {
        $postfix = '';

        switch ($this->type) {
            case 'GPU':
                $prefix = 'Видеокарта';

                // Add part info if it exists
                if(!$this->GPU_VRAM_size) break;
                $postfix = join(', ', [
                    $this->GPU_VRAM_size . ' ГБ',
                    $this->GPU_VRAM_type,
                    $this->GPU_VRAM_frequency . ' МГц'
                ]);
                break;

            case 'platform':
                $prefix = 'Платформа';

                // Add part info if it exists
                if(!$this->platform_cors_count) break;
                $postfix = join(', ', [
                    $this->platform_cors_count . ' x ' . $this->platform_frequency . 'ГГц',
                    'TDP '. $this->TDP . ' Вт'
                ]);
                break;

            case 'RAM':
                $prefix = 'Оперативная память';

                // Add part info if it exists
                if(!$this->RAM_size) break;
                $postfix = join(', ', [
                    $this->RAM_size . ' ГБx'. $this->RAM_channels. " шт",
                    $this->RAM_frequency . ' МГц',
                ]);
                break;

            case 'PSU':
                $prefix = 'Блок питания';

                // Add part info if it exists
                if(!$this->PSU_power_supply) break;
                $postfix = join(', ', [
                    $this->PSU_power_supply . ' Вт',
                    $this->PSU_efficiency !== 'none' ? "80+ $this->PSU_efficiency" : "без сертификата",
                ]);
                break;

            case 'case':
                $prefix = '';

                // Add part info if it exists
                if(!$this->case_material) break;
                $postfix = join(', ', [
                    $this->case_material_rus ,
                    "вместимость видеокарт $this->case_GPUs_count",
                    "до $this->case_critical_temp"."°C"
                ]);
                break;

            default:
                $prefix = '';
                break;
        }

        return "$prefix $this->vendor $value " . ($postfix ? "[$postfix] ": "");
    }

    /**
     * Return is part deleted
     *
     * @param $value
     * @return array|mixed
     */
    protected function getIsDeletedAttribute()
    {
        return !!$this->deleted_at;
    }

    /**
     * Return raw name
     *
     * @param $value
     * @return array|mixed
     */
    protected function getRawNameAttribute($value)
    {
        return $this->getRawOriginal('name');
    }

    /**
     * Set default image url for HasImage trait
     *
     * @return string
     */
    public function defaultImageUrl()
    {
        return 'default-images/' . $this->type . '-default.png';
    }
}
