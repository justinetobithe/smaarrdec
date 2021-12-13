<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProjectsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('projects', function (Blueprint $table) {
            $table->id();
            $table->integer('program_id')->nullable();
            $table->text('project_leader')->nullable();
            $table->longText('project_code')->unique();
            $table->text('project_title')->unique();
            $table->longText('project_content')->nullable();
            $table->text('project_slug')->index();
            $table->text('featured_image')->nullable();
            $table->text('abstract')->nullable();
            $table->text('project_study_site')->nullable();
            $table->integer('project_category_id')->nullable();
            $table->text('commodity_id')->nullable();
            $table->decimal('budget', 18, 2)->nullable();
            $table->text('implementing_agency')->nullable();
            $table->text('funding_agency')->nullable();
            $table->text('collaborating_agency')->nullable();
            $table->timestamp('start_date')->nullable();
            $table->timestamp('end_date')->nullable();
            $table->text('project_members')->nullable();
            $table->timestamp('date_approved')->nullable();
            $table->timestamp('date_rejected')->nullable();
            $table->integer('status')->comment('0 = Pending, 1 = Approved, 2 = Rejected');
            $table->integer('remarks')->comment('0 = Not Yet Stated, 1 = On-Going, 2 = Completed, 3 = Terminated')->nullable();
            $table->text('remarks_description')->nullable();
            $table->text('file')->nullable();
            $table->text('added_by')->nullable();
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
        Schema::dropIfExists('projects');
    }
}
