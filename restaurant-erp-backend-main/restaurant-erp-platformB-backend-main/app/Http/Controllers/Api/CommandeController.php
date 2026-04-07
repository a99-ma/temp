<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Commande;
use App\Models\LigneCommande;
use App\Models\Plat;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class CommandeController extends Controller
{
    /**
     * Créer une nouvelle commande avec vérification du stock
     */
    public function store(Request $request)
    {
        // Validation des données
        $validated = $request->validate([
            'utilisateur_id' => 'required|exists:utilisateurs,id',
            'type_commande' => 'required|in:sur_place,emporter,livraison',
            'adresse_id' => 'nullable|exists:adresses,id',
            'notes' => 'nullable|string',
            'articles' => 'required|array',
            'articles.*.id' => 'required|exists:plats,id',
            'articles.*.quantite' => 'required|integer|min:1',
        ]);

        try {
            // Démarrer une transaction
            return DB::transaction(function () use ($validated) {
                $articles = $validated['articles'];
                $totalPrice = 0;

                // Vérifier le stock pour tous les articles avant de faire des modifications
                foreach ($articles as $item) {
                    $plat = Plat::find($item['id']);

                    if (!$plat) {
                        return response()->json([
                            'error' => "Le plat avec l'ID {$item['id']} n'existe pas.",
                        ], 400);
                    }

                    // Vérifier si le stock est suffisant
                    if ($plat->quantite_stock < $item['quantite']) {
                        return response()->json([
                            'error' => "Stock insuffisant pour {$plat->nom}. Stock disponible: {$plat->quantite_stock}, quantité demandée: {$item['quantite']}",
                        ], 400);
                    }

                    // Calculer le prix total
                    $totalPrice += $plat->prix * $item['quantite'];
                }

                // Créer la commande
                $commande = Commande::create([
                    'utilisateur_id' => $validated['utilisateur_id'],
                    'adresse_id' => $validated['adresse_id'] ?? null,
                    'type_commande' => $validated['type_commande'],
                    'total' => $totalPrice,
                    'notes' => $validated['notes'] ?? null,
                    'statut' => 'en_attente',
                ]);

                // Créer les lignes de commande et décrémenter le stock
                foreach ($articles as $item) {
                    $plat = Plat::find($item['id']);

                    // Créer la ligne de commande
                    LigneCommande::create([
                        'commande_id' => $commande->id,
                        'plat_id' => $plat->id,
                        'quantite' => $item['quantite'],
                        'prix_unitaire' => $plat->prix,
                    ]);

                    // Décrémenter le stock en temps réel
                    $plat->decrement('quantite_stock', $item['quantite']);
                }

                return response()->json([
                    'message' => 'Commande créée avec succès',
                    'commande' => [
                        'id' => $commande->id,
                        'utilisateur_id' => $commande->utilisateur_id,
                        'type_commande' => $commande->type_commande,
                        'total' => $commande->total,
                        'statut' => $commande->statut,
                        'date_commande' => $commande->date_commande,
                        'lignes' => $commande->ligneCommandes->map(function ($ligne) {
                            return [
                                'plat_id' => $ligne->plat_id,
                                'quantite' => $ligne->quantite,
                                'prix_unitaire' => $ligne->prix_unitaire,
                            ];
                        }),
                    ],
                ], 201);
            });
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Erreur lors de la création de la commande: ' . $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Récupérer toutes les commandes
     */
    public function index()
    {
        $commandes = Commande::with('ligneCommandes.plat')
            ->orderBy('date_commande', 'desc')
            ->get();

        return response()->json($commandes, 200);
    }

    /**
     * Récupérer une commande spécifique
     */
    public function show($id)
    {
        $commande = Commande::with('ligneCommandes.plat', 'utilisateur', 'adresse')
            ->find($id);

        if (!$commande) {
            return response()->json([
                'error' => 'Commande non trouvée',
            ], 404);
        }

        return response()->json($commande, 200);
    }

    /**
     * Mettre à jour le statut de la commande
     */
    public function updateStatus(Request $request, $id)
    {
        $validated = $request->validate([
            'statut' => 'required|in:en_attente,confirmée,en_cours,livrée,complétée,annulée',
        ]);

        $commande = Commande::find($id);

        if (!$commande) {
            return response()->json([
                'error' => 'Commande non trouvée',
            ], 404);
        }

        $commande->update(['statut' => $validated['statut']]);

        return response()->json([
            'message' => 'Statut de la commande mis à jour avec succès',
            'commande' => $commande,
        ], 200);
    }

    /**
     * Annuler une commande (restaurer le stock)
     */
    public function cancel($id)
    {
        try {
            return DB::transaction(function () use ($id) {
                $commande = Commande::with('ligneCommandes')->find($id);

                if (!$commande) {
                    return response()->json([
                        'error' => 'Commande non trouvée',
                    ], 404);
                }

                if ($commande->statut === 'annulée') {
                    return response()->json([
                        'error' => 'Cette commande est déjà annulée',
                    ], 400);
                }

                // Restaurer le stock pour chaque article
                foreach ($commande->ligneCommandes as $ligne) {
                    $plat = Plat::find($ligne->plat_id);
                    $plat->increment('quantite_stock', $ligne->quantite);
                }

                $commande->update(['statut' => 'annulée']);

                return response()->json([
                    'message' => 'Commande annulée avec succès et stock restauré',
                    'commande' => $commande,
                ], 200);
            });
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Erreur lors de l\'annulation: ' . $e->getMessage(),
            ], 500);
        }
    }
}
