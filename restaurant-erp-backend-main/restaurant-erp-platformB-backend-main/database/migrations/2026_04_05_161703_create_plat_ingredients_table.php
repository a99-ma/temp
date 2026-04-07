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
        Schema::create('plat_ingredients', function (Blueprint $table) {
            $table->id();
            $table->foreignId('plat_id')->constrained('plats');
            $table->foreignId('ingredient_id')->constrained('ingredients');
            $table->decimal('quantite', 10, 2);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('plat_ingredients');
    }
};
