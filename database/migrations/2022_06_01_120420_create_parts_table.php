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
        Schema::create('parts', function (Blueprint $table) {
            $table->id();

            $table->string('name');
            $table->string('slug')->unique();
            $table->string('type');
            $table->string('vendor'); // Asus, MSI, Palit
            $table->bigInteger('price')->unsigned(); // USD

            // For GPU
            $table->integer('GPU_frequency')->unsigned()->nullable(); // GPU core frequency
            $table->integer('GPU_VRAM')->unsigned()->nullable(); // Video RAM
            $table->integer('GPU_VRAM_frequency')->unsigned()->nullable(); // Video RAM frequency
            $table->integer('GPU_VRAM_type')->unsigned()->nullable(); // Video RAM frequency
            $table->integer('GPU_fans_count')->unsigned()->nullable(); // Power consumption
            $table->integer('GPU_fan_efficiency')->unsigned()->nullable(); // Power consumption

            // Platform (motherboard + CPU)
            $table->integer('platform_cors_count')->unsigned()->nullable(); // CPU cors count
            $table->integer('platform_threads_count')->unsigned()->nullable(); // CPU threads count
            $table->integer('platform_frequency')->unsigned()->nullable(); // CPU frequency
            $table->integer('platform_RAM_slots')->unsigned()->nullable(); // Number of RAM slots

            // Power Supply
            $table->integer('power_supply')->unsigned()->nullable(); // Power of power supply in Watt
            $table->string('power_supply_efficiency')->nullable(); // Efficiency certificate of power supply

            // RAM
            $table->integer('RAM_frequency')->unsigned()->nullable();
            $table->integer('RAM_size')->unsigned()->nullable();
            $table->integer('RAM_channels')->unsigned()->nullable(); // Number of RAM channels (1 channel or 2 channel)

            // Case (frame, carcass)
            $table->string('case_material')->nullable();
            $table->integer('case_GPUs_count')->unsigned()->nullable();
            $table->integer('case_critical_temp')->unsigned()->nullable(); // Max critical temperature for case

            // Common properties
            $table->integer('wear')->default(0); // Wear of part
            $table->integer('TDP')->unsigned()->nullable();
            $table->integer('power')->unsigned()->nullable(); // Power consumption

            $table->softDeletes();
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
        Schema::dropIfExists('parts');
    }
};
