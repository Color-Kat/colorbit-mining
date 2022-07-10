<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('havings', function (Blueprint $table) {
            $table->id();

            $table->foreignId('part_shop_id');
            $table->foreignId('user_id');

            $table->string('state')->default('not_used'); // In rig or not / broken / needs_repair
            $table->string('message')->nullable(); // Message with breakdown text if the part is broken
            $table->boolean('for_sale')->default(false);

            $table->unsignedInteger('temp')->default(0); // Temperature of part
            $table->unsignedInteger('max_temp')->default(0); // Temperature of part
            $table->unsignedInteger('loading')->default(0); // Load of part
            $table->unsignedInteger('current_power')->default(0); // Current part power consumption
            $table->unsignedInteger('wear')->default(0); // Wear of part
            $table->unsignedInteger('dust')->default(0); // Degree of dust pollution

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('havings');
    }
};
