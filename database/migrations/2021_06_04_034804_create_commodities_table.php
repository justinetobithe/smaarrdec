<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCommoditiesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('commodities', function (Blueprint $table) {
            $table->id();
            $table->text('commodity_name');
            $table->text('commodity_content')->nullable();
            $table->text('commodity_image')->default("default.jpg");
            $table->text('commodity_slug')->index();
            $table->integer('priority_type')->default(0)->comment("0 = Neutral, 1 = Priority");
            $table->integer('status')->comment('0 = Unactive, 1 = Active')->default(1);
            $table->timestamp('created_at')->useCurrent();
            $table->timestamp('updated_at')->useCurrent();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('commodities');
    }
}
