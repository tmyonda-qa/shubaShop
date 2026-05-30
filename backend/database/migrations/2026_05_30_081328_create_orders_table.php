<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->foreignId('product_id')->constrained()->onDelete('cascade');
            $table->string('phone');
            $table->string('email')->nullable();
            $table->text('message')->nullable();
            $table->integer('chest')->nullable();
            $table->integer('hips')->nullable();
            $table->integer('product_length')->nullable();
            $table->integer('height')->nullable();
            $table->enum('status', ['new', 'in_progress', 'done'])->default('new');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};
