<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProgramMembersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('program_members', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('program_id');
            $table->foreign('program_id')->references('id')->on('programs');
            $table->text('member_name');
            $table->integer('member_type')->comment('0 = Unassigned, 1 = Member, 2 = Program Leader');
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
        Schema::dropIfExists('program_members');
    }
}
