<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAdminsNotificationsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('admins_notifications', function (Blueprint $table) {
            $table->id();
            $table->integer('request_type')->nullable()->comment('1 = Registration, 2 = Request');
            $table->text('notification_title')->nullable();
            $table->text('notification_text')->nullable();
            $table->text('url')->nullable();
            $table->integer('read_type')->comment('0 = Unread, 1 = Read')->default(0)->nullable();
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
        Schema::dropIfExists('admins_notifications');
    }
}
