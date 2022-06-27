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
        Schema::create('breakdowns', function (Blueprint $table) {
            $table->id();

            $table->string('title');
            $table->string('description');

            $table->unsignedInteger('chance');
            $table->unsignedInteger('repair_chance');
            $table->string('condition'); // Some defined strings: 'T>90', 'work_time>100000', 'Load>80'

//            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('breakdowns');
    }
};
