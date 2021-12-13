<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateEventsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('events', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('author_id');
            $table->foreign('author_id')->references('id')->on('users');
            $table->text('event_title');
            $table->text('event_description')->nullable();
            $table->text('event_content')->nullable();
            $table->text('event_location')->nullable();
            $table->text('event_slug');
            $table->text('event_image')->nullable();
            $table->timestamp('date_started')->nullable();
            $table->timestamp('date_ended')->nullable();
            $table->integer('set_as')->comment('0 = Upcoming, 1 = On-Going, 2 = Under Way')->default(0);
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
        Schema::dropIfExists('events');
    }
}
