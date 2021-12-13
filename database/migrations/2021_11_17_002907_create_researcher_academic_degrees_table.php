<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateResearcherAcademicDegreesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('researcher_academic_degrees', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('researcher_id');
            $table->foreign('researcher_id')->references('id')->on('researchers');
            $table->unsignedBigInteger('degree_id');
            $table->foreign('degree_id')->references('id')->on('degrees');
            $table->text('school_name')->nullable();
            $table->text('school_address')->nullable();
            $table->text('program')->nullable();
            $table->text('year')->nullable();
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
        Schema::dropIfExists('researcher_academic_degrees');
    }
}
