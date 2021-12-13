<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProgramFundingAgenciesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('program_funding_agencies', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('program_id');
            $table->foreign('program_id')->references('id')->on('programs');
            $table->unsignedBigInteger('agency_id');
            $table->foreign('agency_id')->references('id')->on('agencies');
            $table->decimal('requested_budget', 18, 2);
            $table->integer('budget_status')->comment('0 = Passive, 1 = Consumed');
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
        Schema::dropIfExists('program_funding_agencies');
    }
}
