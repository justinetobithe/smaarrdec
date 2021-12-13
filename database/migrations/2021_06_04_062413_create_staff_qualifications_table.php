<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateStaffQualificationsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('staff_qualifications', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('degree_id');
            $table->foreign('degree_id')->references('id')->on('degrees');
            $table->unsignedBigInteger('staff_id');
            $table->foreign('staff_id')->references('id')->on('staff');
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
        Schema::dropIfExists('staff_qualifications');
    }
}
