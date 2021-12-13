<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePostsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('posts', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id');
            $table->foreign('user_id')->references('id')->on('users');
            $table->timestamp('date_published');
            $table->text('post_title');
            $table->longText('post_content')->nullable();
            $table->text('featured_image')->nullable();
            $table->text('post_slug')->index();
            $table->unsignedBigInteger('post_category_id');
            $table->foreign('post_category_id')->references('id')->on('post_categories');
            $table->integer('visibility')->comment('0 = Draft, 1 = Published')->default(1);
            $table->integer('status')->comment('0 = Unactive, 1 = Active');
            $table->timestamp('created_at')->useCurrent();
            $table->timestamp('updated_at')->useCurrent();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('posts');
    }
}
