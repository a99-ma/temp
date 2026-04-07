# 🧪 Tests API Backend - Restaurant ERP

## 📋 Configuration Requise

- Backend: **http://localhost:8000**
- Frontend: **http://localhost:3000** (ou Vite port)
- Base de données: **SQLite** (ou selon votre config)

---

## 🔍 **1. Vérifier les Plats (Menu)**

### GET /api/plats
```bash
curl -X GET http://localhost:8000/api/plats
```

**Réponse attendue :**
```json
{
  "data": [
    {
      "id": 1,
      "nom": "Pizza Margherita",
      "description": "Pizza classique",
      "prix": 50,
      "quantite_stock": 10,
      "image": "https://...",
      "est_disponible": true,
      "est_halal": true,
      "est_vegetarien": true,
      "est_sans_gluten": false,
      "categorie_id": 1,
      "created_at": "2026-04-06T10:00:00",
      "updated_at": "2026-04-06T10:00:00"
    }
  ]
}
```

**Vérifier:** 
- ✅ `quantite_stock` présent ?
- ✅ `prix` présent ?
- ✅ `id` présent ?

---

## 🛒 **2. Créer une Commande**

### POST /api/commandes
```bash
curl -X POST http://localhost:8000/api/commandes \
  -H "Content-Type: application/json" \
  -d '{
    "utilisateur_id": 1,
    "type_commande": "emporter",
    "articles": [
      { "id": 1, "quantite": 2 },
      { "id": 2, "quantite": 1 }
    ]
  }'
```

**Réponse attendue :**
```json
{
  "message": "Commande créée avec succès",
  "commande": {
    "id": 1,
    "utilisateur_id": 1,
    "type_commande": "emporter",
    "total": "110.00",
    "statut": "en_attente",
    "lignes": [
      {
        "plat_id": 1,
        "quantite": 2,
        "prix_unitaire": "50.00"
      }
    ]
  }
}
```

---

## 🛑 **3. Tester l'Erreur: Stock Insuffisant**

### POST /api/commandes (stock insuffisant)
```bash
curl -X POST http://localhost:8000/api/commandes \
  -H "Content-Type: application/json" \
  -d '{
    "utilisateur_id": 1,
    "type_commande": "emporter",
    "articles": [
      { "id": 1, "quantite": 100 }
    ]
  }'
```

**Réponse attendue (erreur 400):**
```json
{
  "error": "Stock insuffisant pour Pizza Margherita. Stock disponible: 5, quantité demandée: 100"
}
```

---

## 📊 **4. Vérifier les Catégories**

### GET /api/categories
```bash
curl -X GET http://localhost:8000/api/categories
```

**Réponse attendue :**
```json
{
  "data": [
    {
      "id": 1,
      "nom": "Pizza",
      "description": "Pizzas diverses",
      "image": "...",
      "created_at": "2026-04-06T10:00:00"
    }
  ]
}
```

---

## ✨ **5. PowerShell Alternatives (Windows)**

### Tester avec PowerShell :
```powershell
$response = Invoke-RestMethod -Uri "http://localhost:8000/api/plats" -Method Get
$response.data | Format-Table -AutoSize

# Pour POST:
$body = @{
  utilisateur_id = 1
  type_commande = "emporter"
  articles = @(
    @{ id = 1; quantite = 2 }
  )
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:8000/api/commandes" `
  -Method Post `
  -ContentType "application/json" `
  -Body $body
```

---

## 🔴 **Problèmes Courants**

### ❌ Erreur: Connection refused (127.0.0.1:8000)
**Solution:** 
```bash
# Démarrez le serveur Laravel:
cd restaurant-erp-platformB-backend-main
php artisan serve --port=8000
```

### ❌ Erreur: 415 Unsupported Media Type
**Solution:** Ajoutez l'header:
```bash
-H "Content-Type: application/json"
```

### ❌ Erreur: Table doesn't exist
**Solution:** Migrations manquantes
```bash
php artisan migrate
php artisan db:seed
```

### ❌ Erreur: 422 Validation Error
**Solution:** Vérifiez les champs obligatoires:
- `utilisateur_id` (required)
- `type_commande` (required, must be: sur_place|emporter|livraison)
- `articles` (required, array)

---

## ✅ **Checklist Pré-Déploiement**

- [ ] Backend démarre sans erreur (port 8000)
- [ ] GET /api/plats retourne les plats
- [ ] GET /api/categories retourne les catégories
- [ ] POST /api/commandes crée une commande
- [ ] Stock décrémente après commande
- [ ] Frontend affiche le panier correctement
- [ ] localStorage persiste les données
- [ ] Navbar affiche le badge du panier
- [ ] Cart page affiche les articles

---

**Version:** 1.0
**Date:** 6 Avril 2026
