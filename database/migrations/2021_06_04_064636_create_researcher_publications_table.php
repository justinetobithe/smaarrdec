<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateResearcherPublicationsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('researcher_publications', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('researcher_id');
            $table->foreign('researcher_id')->references('id')->on('researchers');
            $table->text('title');
            $table->text('description')->nullable();
            $table->text('type')->nullable();
            $table->text('members')->nullable();
            $table->text('url')->nullable(); 
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
        Schema::dropIfExists('researcher_publications');
    }
}
