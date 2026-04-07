<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Plat extends Model
{
    protected $fillable = [
        'categorie_id', 'nom', 'description', 
        'image', 'prix', 'est_disponible',
        'est_vegetarien', 'est_halal', 'est_sans_gluten',
        'quantite_stock'
    ];

    protected $casts = [
        'est_disponible'   => 'boolean',
        'est_vegetarien'   => 'boolean',
        'est_halal'        => 'boolean',
        'est_sans_gluten'  => 'boolean',
    ];

    public function categorie()
    {
        return $this->belongsTo(Categorie::class);
    }
}