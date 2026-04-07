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
        Schema::create('commandes', function (Blueprint $table) {
    $table->id();
    $table->foreignId('utilisateur_id')->constrained('utilisateurs');
    $table->foreignId('adresse_id')->nullable()->constrained('adresses');
    $table->string('type_commande'); // sur_place, emporter, livraison
    $table->string('statut')->default('en_attente');
    $table->decimal('total', 10, 2)->default(0);
    $table->text('notes')->nullable();
    $table->timestamp('date_commande')->useCurrent();
    $table->timestamps();
});
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('commandes');
    }
};
