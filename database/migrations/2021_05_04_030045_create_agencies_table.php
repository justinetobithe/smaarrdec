<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAgenciesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('agencies', function (Blueprint $table) {
            $table->id();
            $table->text('agency_name');
            $table->text('content')->nullable();
            $table->text('logo_url')->nullable();
            $table->text('site_url')->nullable()->default('#');
            $table->text('acronym')->nullable();
            $table->text('region')->nullable(); 
            $table->integer('status')->comment('0 = Unactive, 1 = Active')->nullable();
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
        Schema::dropIfExists('agencies');
    }
}
