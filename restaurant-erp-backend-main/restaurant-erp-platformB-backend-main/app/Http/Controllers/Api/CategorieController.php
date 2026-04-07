<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Categorie;

class CategorieController extends Controller
{
    public function index()
    {
        $categories = Categorie::withCount('plats')->get();

        return response()->json([
            'success' => true,
            'data'    => $categories
        ]);
    }
}