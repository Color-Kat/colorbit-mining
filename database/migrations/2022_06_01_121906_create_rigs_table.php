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
        Schema::create('rigs', function (Blueprint $table) {
            $table->id();

            $table->string('name');
            $table->string('state')->default('stopped'); // Work, stopped, broken
            $table->foreignId('user_id');

            // Parts
            $table->foreignId('GPU_id')->nullable();
            $table->foreignId('platform_id')->nullable();
            $table->foreignId('RAM_id')->nullable();
            $table->foreignId('PSU_id')->nullable();
            $table->foreignId('case_id')->nullable();

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
        Schema::dropIfExists('rigs');
    }
};
