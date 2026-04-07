<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Commande extends Model
{
    protected $fillable = [
        'utilisateur_id',
        'adresse_id',
        'type_commande',
        'statut',
        'total',
        'notes',
        'date_commande',
    ];

    protected $casts = [
        'date_commande' => 'datetime',
    ];

    public function utilisateur()
    {
        return $this->belongsTo(Utilisateur::class);
    }

    public function adresse()
    {
        return $this->belongsTo(Adresse::class);
    }

    public function ligneCommandes()
    {
        return $this->hasMany(LigneCommande::class);
    }

    public function plats()
    {
        return $this->hasManyThrough(
            Plat::class,
            LigneCommande::class,
            'commande_id',
            'id',
            'id',
            'plat_id'
        );
    }
}
