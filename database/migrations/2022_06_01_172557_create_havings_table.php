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

            $table->unsignedInteger('wear')->default(0); // Wear of part

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
