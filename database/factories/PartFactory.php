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
        $types = ['GPU', 'platform', 'RAM', 'case', 'power_supply'];
        $type = $types[rand(0, count($types))];

        $name = $type . ' '. $this->faker->name();

        $base = [
            'name' => $name,
            'slug' => Str::slug($name),
            'type' => $type,
            'vendor' => $this->faker->streetName(),
            'price' => rand(55, 3999),
        ];

        $part = [];

        switch ($type){
            case 'GPU':
                $part = array_merge($base, [
                   'GPU_VRAM_size' => rand(512, 24576),
                   'GPU_VRAM_type' => 'GDDR'.array_rand(['4', '5', '5x', '6', '6x']),
                   'GPU_fans_count' => array_rand([1, 2, 3, 4]), // If it's turbine, set little efficiency
                   'GPU_fan_efficiency' => rand(10, 98), // In %
                   'TDP' => rand(30, 450),
                   'power' => rand(30, 490),
                ]);

                break;
        }
    }
}
