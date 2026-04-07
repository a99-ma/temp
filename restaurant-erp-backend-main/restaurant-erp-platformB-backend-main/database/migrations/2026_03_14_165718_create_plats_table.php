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
       Schema::create('plats', function (Blueprint $table) {
    $table->id();
    $table->foreignId('categorie_id')->constrained('categories');
    $table->string('nom');
    $table->text('description')->nullable();
    $table->string('image')->nullable();
    $table->decimal('prix', 10, 2);
    $table->boolean('est_disponible')->default(true);
    $table->boolean('est_vegetarien')->default(false);
    $table->boolean('est_halal')->default(false);
    $table->boolean('est_sans_gluten')->default(false);
    $table->timestamps();
});
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('plats');
    }
};
