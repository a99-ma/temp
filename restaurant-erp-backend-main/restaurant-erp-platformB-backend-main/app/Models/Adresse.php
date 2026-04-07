<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Adresse extends Model
{
    protected $fillable = [
        'utilisateur_id',
        'libelle',
        'rue',
        'ville',
        'est_par_defaut',
    ];

    protected $casts = [
        'est_par_defaut' => 'boolean',
    ];

    public function utilisateur()
    {
        return $this->belongsTo(Utilisateur::class);
    }

    public function commandes()
    {
        return $this->hasMany(Commande::class);
    }
}
