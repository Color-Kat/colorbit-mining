<?php

namespace Database\Factories;

use App\Models\Part;
use App\Models\Team;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;
use Laravel\Jetstream\Features;

class PartFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Part::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        $types = ['GPU', 'platform', 'power_supply', 'RAM', 'case'];
        $type = $types[rand(0, count($types) - 1)];

        $name = $type . ' '. $this->faker->name();

        $base = [
            'name' => $name,
            'slug' => Str::slug($name),
            'type' => $type,
            'vendor' => $this->faker->streetName(),
            'price' => rand(45, 3999), // $$$
        ];

        $part = [];

        switch ($type){
            case 'GPU':
                $vram_type = ['4', '5', '5x', '6', '6x'];
                $fans_count = [1, 2, 3, 4];

                $part = array_merge($base, [
                   'GPU_VRAM_size' => rand(512, 24576),
                   'GPU_VRAM_frequency' => rand(6000, 20000), // Mhz
                   'GPU_VRAM_type' => 'GDDR'.$vram_type[array_rand($vram_type)],
                   'GPU_fans_count' => $fans_count[array_rand($fans_count)], // If it's turbine, set little efficiency
                   'GPU_fan_efficiency' => rand(10, 98), // In %
                   'TDP' => rand(30, 450),
                   'power' => rand(30, 490),
                ]);

                break;

            case 'platform':
                $part = array_merge($base, [
                    'platform_cors_count' => rand(1, 24),
                    'platform_threads_count' => rand(1, 48),
                    'platform_RAM_slots' => rand(1, 8),
                    'platform_frequency' => rand(200, 500)/100, // GHz
                    'power' => rand(25, 200), // Watt
                ]);

                break;

            case 'power_supply':
                $power_supply_efficiency = ['none', 'bronze', 'silver', 'gold', 'platinum'];

                $part = array_merge($base, [
                    'power_supply' => rand(200, 3000), // Watt
                    'power_supply_efficiency' => $power_supply_efficiency[array_rand($power_supply_efficiency)]
                ]);

                break;

            case 'RAM':
                $part = array_merge($base, [
                    'RAM_frequency' => rand(1666, 3600),
                    'RAM_size' => rand(1, 64), // GB
                    'RAM_channels' => rand(1, 2),
                    'power' => rand(2, 5) // Watt
                ]);

                break;

            case 'case':
                $part = array_merge($base, [
                    'case_material' => rand(0,1) ? 'wooden' : 'aluminum',
                    'case_GPUs_count' => rand(1, 10),
                    'case_critical_temp' => rand(80, 200)
                ]);

                break;
        }

        return $part;
    }
}
