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
        Schema::create('articles', function (Blueprint $table) {
                 $table->id();
        $table->string('title');
        $table->string('slug')->unique();
        $table->text('excerpt');
        $table->longText('content');
        $table->string('featured_image')->nullable();
        $table->enum('status', ['draft', 'published', 'archived'])->default('draft');
        $table->foreignId('user_id')->constrained()->onDelete('cascade');
        $table->foreignId('category_id')->constrained()->onDelete('cascade');
        $table->integer('views')->default(0);
        $table->timestamp('published_at')->nullable();
        $table->timestamps();
        
        $table->index('status');
        $table->index('published_at');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('articles');
    }
};
