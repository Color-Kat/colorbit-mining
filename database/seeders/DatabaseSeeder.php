<?php

namespace Database\Seeders;

use App\Models\Breakdown;
use App\Models\Part;
use App\Models\Shop;
use Carbon\Carbon;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // \App\Models\User::factory(10)->create();

        // --- PARTS --- //
        Part::factory(100)->create();

        // --- SHOPS --- //
        // DNS
        Shop::factory()->create([
            'name' => 'DNS',
            'description' => 'Russian magazine',
            'warranty' => true,
            'delivery_time' => '00:00:00' // In hours
        ]);

        // Avito
        Shop::factory()->create([
            'name' => 'Avito',
            'description' => 'Russian used market',
            'warranty' => false,
            'delivery_time' => '12:00:00' // In hours
        ]);

        // Aliexpress
        Shop::factory()->create([
            'name' => 'Aliexpress',
            'description' => 'Chinese store',
            'warranty' => false,
            'delivery_time' => '36:00:00' // In hours
        ]);

        // Part shop table
        for($i = 1; $i < 71; $i++) {
            DB::table('part_shop')->insert([
                'part_id' => $i,
                'shop_id' => rand(1,3),
                'count' => rand(1, 100)
            ]);
        }

        // Breakdowns
        $breakdowns = ['Перегрев', 'Отвал', 'Взрыв', 'Сломался вентилятор'];
        $breakdown_conditions = ['t>90', 't>100', 't>120', 'work_time>50'];

        for($i = 0; $i < count($breakdowns); $i++) {
            Breakdown::factory()->create([
                'title' => $breakdowns[$i],
                'description' => 'Some description',
                'chance' => rand(30, 50), // In %
                'repair_chance' => rand(30, 70), // In %
                'condition' => $breakdown_conditions[$i]
            ]);
        }

        // Breakdown_part table
        for($i = 1; $i < 71; $i++) {
            $breakdown_id = rand(1,count($breakdowns)-1);

            DB::table('breakdown_part')->insert([
                'part_id' => $i,
                'breakdown_id' => $breakdown_id
            ]);

            // Add more breakdown
            if(rand(0, 8) === 8) {
                DB::table('breakdown_part')->insert([
                    'part_id' => $i,
                    'breakdown_id' => $breakdown_id === 1 ? $breakdown_id + 1 : $breakdown_id - 1
                ]);
            }
        }
    }
}
