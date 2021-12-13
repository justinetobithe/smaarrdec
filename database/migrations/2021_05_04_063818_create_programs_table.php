<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProgramsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('programs', function (Blueprint $table) {
            $table->id();
            $table->text('program_name')->unique();
            $table->longText('program_content')->nullable();
            $table->text('program_slug')->index();
            $table->text('featured_image')->nullable();
            $table->timestamp('start_date')->nullable();
            $table->timestamp('end_date')->nullable();
            $table->text('implementing_agency')->nullable();
            $table->text('collaborating_agency')->nullable();
            $table->text('program_leader')->nullable();
            $table->text('program_members')->nullable();
            $table->text('approved_by')->nullable();
            $table->text('added_by')->nullable();
            $table->integer('status')->comment('0 = Unactive, 1 = Active')->nullable();
            $table->integer('remarks')->comment('0 = Not Yet Stated, 1 = On-Going, 2 = Completed, 3 = Terminated')->nullable();
            $table->text('remarks_description')->nullable();
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
        Schema::dropIfExists('programs');
    }
}
