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
            $table->string('image')->nullable();
            $table->string('slug')->unique();
            $table->string('type');
            $table->string('vendor'); // Asus, MSI, Palit
            $table->bigInteger('price')->unsigned(); // USD

            // Common properties
//            $table->unsignedInteger('wear')->default(0); // Wear of part
            $table->unsignedInteger('TDP')->nullable();
            $table->unsignedInteger('power')->nullable(); // Power consumption

            // For GPU
//            $table->unsignedInteger('GPU_frequency')->nullable(); // GPU core frequency
            $table->unsignedInteger('GPU_VRAM_size')->nullable(); // Video RAM
            $table->unsignedInteger('GPU_VRAM_frequency')->nullable(); // Video RAM frequency
            $table->string('GPU_VRAM_type')->nullable(); // Video RAM frequency
            $table->unsignedInteger('GPU_fans_count')->nullable(); // Power consumption
            $table->unsignedInteger('GPU_fan_efficiency')->nullable(); // Power consumption

            // Platform (motherboard + CPU)
            $table->unsignedInteger('platform_cors_count')->nullable(); // CPU cors count
            $table->unsignedInteger('platform_threads_count')->nullable(); // CPU threads count
            $table->unsignedInteger('platform_frequency')->nullable(); // CPU frequency
            $table->unsignedInteger('platform_RAM_slots')->nullable(); // Number of RAM slots

            // Power Supply
            $table->unsignedInteger('PSU_power_supply')->nullable(); // Power of power supply in Watt
            $table->string('PSU_efficiency')->nullable(); // Efficiency certificate of power supply

            // RAM
            $table->unsignedInteger('RAM_frequency')->nullable();
            $table->unsignedInteger('RAM_size')->nullable();
            $table->unsignedInteger('RAM_channels')->nullable(); // Number of RAM channels (1 channel or 2 channel)

            // Case (frame, carcass)
            $table->string('case_material')->nullable();
            $table->unsignedInteger('case_GPUs_count')->nullable();
            $table->unsignedInteger('case_critical_temp')->nullable(); // Max critical temperature for case

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
