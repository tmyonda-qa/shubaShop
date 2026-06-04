<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('orders', function (Blueprint $table) {
            $table->foreignId('taken_by')->nullable()->constrained('users')->onDelete('set null')->after('status');
            $table->timestamp('taken_at')->nullable()->after('taken_by');
        });
    }

    public function down(): void
    {
        Schema::table('orders', function (Blueprint $table) {
            $table->dropForeign(['taken_by']);
            $table->dropColumn(['taken_by', 'taken_at']);
        });
    }
};
