<?php

namespace Database\Seeders;

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
        for($i=1; $i< 71; $i++) {
            DB::table('part_shop')->insert([
                'part_id' => $i,
                'shop_id' => rand(1,3),
                'count' => rand(1, 100)
            ]);
        }
    }
}
