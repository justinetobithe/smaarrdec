<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateResearchersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('researchers', function (Blueprint $table) {
            $table->id();
            $table->text('name');
            $table->string('email')->unique();
            $table->text('contact_no')->nullable();
            $table->text('slug')->index()->nullable();
            $table->text('content')->nullable();
            $table->text('image')->nullable();
            $table->unsignedBigInteger('agency_id')->nullable();
            $table->foreign('agency_id')->references('id')->on('agencies');
            $table->text('place_of_assignment')->nullable();
            $table->longText('specialization')->nullable();
            $table->longText('expertise')->nullable();
            $table->text('researcher_interest')->nullable();
            $table->text('curriculum_vitae')->nullable();
            $table->integer('status')->comment('0 = Unactive, 1 = Active')->nullable();
            $table->timestamp('rejected_at')->nullable();
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
        Schema::dropIfExists('researchers');
    }
}
