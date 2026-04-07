<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class Utilisateur extends Authenticatable
{
    use Notifiable;

    protected $table = 'utilisateurs';

    protected $fillable = [
        'nom',
        'email',
        'mot_de_passe',
        'telephone',
        'points_fidelite',
        'date_inscription',
        'remember_token',
    ];

    protected $casts = [
        'date_inscription' => 'date',
    ];

    protected $hidden = [
        'mot_de_passe',
        'remember_token',
    ];

    public function adresses()
    {
        return $this->hasMany(Adresse::class);
    }

    public function commandes()
    {
        return $this->hasMany(Commande::class);
    }

    public function avis()
    {
        return $this->hasMany(Avis::class);
    }

    public function favoris()
    {
        return $this->hasMany(Favori::class);
    }

    public function reservations()
    {
        return $this->hasMany(Reservation::class);
    }
}
