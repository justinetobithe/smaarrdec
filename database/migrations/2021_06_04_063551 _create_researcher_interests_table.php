<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateResearcherInterestsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('researcher_interests', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('researcher_id');
            $table->foreign('researcher_id')->references('id')->on('researchers');
            $table->longText('interest');
            $table->integer('status')->comment('0 = Unactive, 1 = Active');
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
        Schema::dropIfExists('researcher_interests');
    }
}
