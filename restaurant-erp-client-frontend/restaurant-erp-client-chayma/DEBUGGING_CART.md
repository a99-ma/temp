# 🛠️ Guide de Debugging - Bug "Panier Vide"

## ✅ Ce Qui A Été Corrigé

### 1. **CartContext.jsx**
- ✅ Ajout de l'état `isHydrated` pour gérer le chargement
- ✅ Ajout d'un `useEffect` pour marquer l'hydratation comme complète
- ✅ Protection contre localStorage lors du SSR
- ✅ Logs améliorés pour le debugging

### 2. **Cart.jsx**
- ✅ Ajout de l'état `isHydrated`
- ✅ Ajout d'un `useEffect` pour tracker les changements de `cart`
- ✅ Gestion du loading pendant l'hydratation ("⏳ Chargement du panier...")
- ✅ Vérification d'hydratation avant d'afficher le panier vide

---

## 🔍 **Checklist de Debugging**

### 1. **Ouvrez la Console Browser (F12)**
Vous devriez voir les logs suivants :

```
📥 Chargement du panier depuis localStorage: []  // ← Panier vide ou articles ?
🛒 CartProvider rendu, cart = [], hydrated = false  // ← Hydratation ?
⏳ CartProvider pas encore hydraté  // ← Premier rendu
🛒 CartProvider rendu, cart = [], hydrated = true  // ← Après hydratation
```

### 2. **Testez l'Ajout au Panier**
1. Allez sur `/menu`
2. Cliquez "🛒 Ajouter" sur un plat
3. Vérifiez la Console pour :
   ```
   📦 Ajout au panier: {id: 1, nom: "...", prix: 50, ...}
   ✅ Panier après ajout (nouveau): [{id: 1, quantity: 1, ...}]
   💾 Sauvegarde localStorage: [{id: 1, quantity: 1, ...}]
   ```

### 3. **Vérifiez localStorage Directement**
Ouvrez **F12 → Application → LocalStorage → http://localhost:3000** et regardez la clé `cart` :
```javascript
// Doit contenir un array JSON:
[{"id":1,"nom":"Pizza","quantity":2,"prix":50,"quantite_stock":10,...}]
```

### 4. **Allez à /cart**
Vous devriez voir (après hydratation) :
```
📄 Cart.jsx re-rendu, cart = [{id: 1, quantity: 2, ...}]
```

### 5. **Vérifiez Navbar**
Vous devriez voir l'icône du panier avec le badge `2` (le nombre d'articles)

---

## 🚨 **Problèmes Possibles et Solutions**

### **Problème: Console blank, pas de logs**
**Solution:** 
- Rafraîchissez la page (Ctrl+F5)
- Dégagez le cache du navigateur
- Vérifiez que React DevTools affiche le CartProvider

### **Problème: Logs montrent `cart = []` (vide)**
**Solution:**
- Vérifiez que vous cliquez BIEN sur "🛒 Ajouter"
- Vérifiez que PlatCard reçoit les données du plat correctement
- Vérifiez la Console pour les erreurs lors du clique

### **Problème: localStorage est vide**
**Solution:**
```javascript
// Testez dans la Console navigateur:
localStorage.getItem('cart')  // Doit retourner une string JSON

// Ou testez directement:
localStorage.setItem('test', 'hello')
localStorage.getItem('test')  // Doit retourner 'hello'
```

### **Problème: Navbar affiche articles, mais Cart affiche vide**
**Solution 1:**
- C'est peut-être un problème de **React Strict Mode** qui rend deux fois
- Temporairement désactivez Strict Mode dans `main.jsx` pour tester :
```jsx
createRoot(document.getElementById('root')).render(
  // <StrictMode>  {/* Commentez */}
    <CartProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </CartProvider>
  // </StrictMode>
)
```

**Solution 2:**
- Vérifiez que la clé unique `key={item.id}` dans le map du Cart ne change pas

---

## 🔗 **Vérification API Backend**

### **Vérifiez que les plats du backend ont TOUS les champs :**
```bash
curl http://localhost:8000/api/plats
```

Réponse attendue :
```json
[
  {
    "id": 1,
    "nom": "Pizza",
    "prix": 50,
    "quantite_stock": 10,
    "image": "...",
    "description": "...",
    "est_halal": false,
    "est_vegetarien": false,
    "est_sans_gluten": false,
    "categorie_id": 1
  }
]
```

**Si un champ manque**, c'est peut-être pour ça que le panier ne fonctionne pas !

---

## ✨ **Test Complet (E2E)**

1. **Ouvrez la Console Browser (F12)**
2. **Allez sur http://localhost:3000/menu**
3. **Attendez le chargement des plats**
4. **Cliquez sur "🛒 Ajouter" pour un plat**
5. **Vérifiez la Console pour les logs ✅ Ajout au panier**
6. **Vérifiez que Navbar affiche `1` article**
7. **Allez sur /cart**
8. **Vous devez voir le plat dans le tableau, pas "Votre panier est vide"**

---

## 💡 **Si Toujours Rien Ne Marche**

Envoyez-moi :
1. Les logs complètes de la Console browser
2. Le contenu de localStorage (F12 → Application → LocalStorage)
3. Le contenu de Menu.jsx pour vérifier comment les plats sont chargés
4. Le contenu de api/axios.js pour vérifier la configuration

---

## 📝 **Fichiers Modifiés**

- ✅ `src/context/CartContext.jsx` - Hydratation corrigée
- ✅ `src/pages/Cart.jsx` - Gestion de l'hydratation + useEffect

---

**Version:** 1.0
**Date:** 6 Avril 2026
**Status:** Prêt à tester 🚀
