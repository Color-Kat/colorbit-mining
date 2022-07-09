<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Rig extends Model
{
    use HasFactory;
    use \Znck\Eloquent\Traits\BelongsToThrough;

    /**
     * Make ids of part hidden
     *
     * @var string[]
     */
    protected $hidden = ['GPU_id', 'platform_id', 'RAM_id', 'PSU_id', 'case_id', 'created_at', 'updated_at'];

    /**
     * Disable snake case then laravel doesn't transform GPU to g_p_u
     *
     * @var bool
     */
    public static $snakeAttributes = false;

//    /**
//     * Define relationship for any part type.
//     * Rigs -> havings -> PartShopPivot -> Part
//     *
//     * @return \Znck\Eloquent\Relations\BelongsToThrough
//     */
//    public function belongsToPart(string $localKey, array $additional_columns = []): \Znck\Eloquent\Relations\BelongsToThrough
//    {
//        return $this
//            ->belongsToThrough(
//                Part::class,
//                [PartShopPivot::class, Having::class],
//                $localKey,
//                null,
//                [
//                    // Determine the id by which we can retrieve havings record from rigs
//                    Having::class => $localKey,
//                    // Determine the id by which we can retrieve part_shop from havings
//                    PartShopPivot::class => 'part_shop_id'
//                ]
//            )
//            ->select([
//                ...$additional_columns,
//                // 'part_id',
//                'name',
//                'image',
//                'type',
//            ]);
//    }

    /**
     * Define relationship for any part type.
     * Rigs -> havings -> PartShopPivot -> Part
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function belongsToPart(string $localKey, array $additional_columns = []): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this
            ->belongsTo(Having::class, $localKey)
            ->with(['part' => function ($q) use($additional_columns) {
                return $q->select([
                    ...$additional_columns,
                    // 'part_id',
                    'name',
                    'image',
                    'type',
                ]);
            }]);

    }

    /**
     * @return \Znck\Eloquent\Relations\BelongsToThrough
     */
    public function GPU(){
        return $this->belongsToPart('GPU_id', [
            'GPU_VRAM_size',
            'GPU_VRAM_type',
            'GPU_chip_frequency',
            'GPU_fans_count',
            'GPU_fan_efficiency',
            'TDP',
            'power'
        ]);
    }

    public function platform(){
        return $this->belongsToPart('platform_id', [
            'platform_cors_count',
            'platform_threads_count',
            'platform_frequency',
            'platform_RAM_slots',
            'TDP',
            'power'
        ]);
    }

    public function RAM(){
        return $this->belongsToPart('RAM_id', [
            'RAM_size',
            'RAM_frequency',
            'RAM_channels',
            'TDP',
            'power'
        ]);
    }

    public function PSU(){
        return $this->belongsToPart('PSU_id', [
            'PSU_power_supply',
            'PSU_efficiency',
            'TDP'
        ]);
    }

    public function case(){
        return $this->belongsToPart('case_id', [
            'case_material',
            'case_material_rus',
            'case_GPUs_count',
            'case_critical_temp'
        ]);
    }
}
