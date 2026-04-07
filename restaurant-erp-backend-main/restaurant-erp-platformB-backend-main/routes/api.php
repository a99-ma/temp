<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\PlatController;
use App\Http\Controllers\Api\CategorieController;
use App\Http\Controllers\Api\CommandeController;

// Menu & Filtres
Route::get('/plats', [PlatController::class, 'index']);
Route::get('/plats/{id}', [PlatController::class, 'show']);
Route::get('/categories', [CategorieController::class, 'index']);

// Commandes
Route::post('/commandes', [CommandeController::class, 'store']);
Route::get('/commandes', [CommandeController::class, 'index']);
Route::get('/commandes/{id}', [CommandeController::class, 'show']);
Route::patch('/commandes/{id}/statut', [CommandeController::class, 'updateStatus']);
Route::post('/commandes/{id}/annuler', [CommandeController::class, 'cancel']);

