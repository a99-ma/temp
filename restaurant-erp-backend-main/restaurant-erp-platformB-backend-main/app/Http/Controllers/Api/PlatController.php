<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Plat;
use Illuminate\Http\Request;

class PlatController extends Controller
{
    // Consulter le menu (tous les plats disponibles)
    public function index(Request $request)
    {
        $query = Plat::with('categorie')->where('est_disponible', true);

        // Filtrer par catégorie
        if ($request->has('categorie_id')) {
            $query->where('categorie_id', $request->categorie_id);
        }

        // Filtrer végétarien
        if ($request->has('vegetarien')) {
            $query->where('est_vegetarien', true);
        }

        // Filtrer halal
        if ($request->has('halal')) {
            $query->where('est_halal', true);
        }

        // Filtrer sans gluten
        if ($request->has('sans_gluten')) {
            $query->where('est_sans_gluten', true);
        }

        // Filtrer par prix max
        if ($request->has('prix_max')) {
            $query->where('prix', '<=', $request->prix_max);
        }

        // Recherche par nom
        if ($request->has('search')) {
            $query->where('nom', 'like', '%' . $request->search . '%');
        }

        $plats = $query->get();

        return response()->json([
            'success' => true,
            'data'    => $plats
        ]);
    }

    // Voir un plat en détail
    public function show($id)
    {
        $plat = Plat::with('categorie')->find($id);

        if (!$plat) {
            return response()->json([
                'success' => false,
                'message' => 'Plat non trouvé'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data'    => $plat
        ]);
    }
}