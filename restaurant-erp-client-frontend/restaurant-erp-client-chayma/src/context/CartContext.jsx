import { createContext, useContext, useState, useEffect } from 'react'

const CartContext = createContext()

// Fonction pour charger depuis localStorage (ne s'exécute qu'une fois)
const getInitialCart = () => {
  if (typeof window === 'undefined') return [] // SSR safety
  try {
    const savedCart = localStorage.getItem('cart')
    const parsed = savedCart ? JSON.parse(savedCart) : []
    console.log('📥 Chargement du panier depuis localStorage:', parsed) // DEBUG
    return parsed
  } catch (err) {
    console.error('❌ Erreur lors du chargement du panier:', err)
    return []
  }
}

export function CartProvider({ children }) {
  // ✅ État du panier - Charger depuis localStorage AU DÉMARRAGE
  const [cart, setCart] = useState(getInitialCart())
  const [isHydrated, setIsHydrated] = useState(false)

  // Marquer l'hydratation comme complète après le premier rendu
  useEffect(() => {
    setIsHydrated(true)
  }, [])

  // Sauvegarder le panier quand il change (après hydratation)
  useEffect(() => {
    if (!isHydrated) return
    console.log('💾 Sauvegarde localStorage:', cart) // DEBUG
    try {
      localStorage.setItem('cart', JSON.stringify(cart))
    } catch (err) {
      console.error('❌ Erreur lors de la sauvegarde:', err)
    }
  }, [cart, isHydrated])

  if (!isHydrated) {
    console.warn('⏳ CartProvider pas encore hydraté') // DEBUG
  }

  console.log('🛒 CartProvider rendu, cart =', cart, 'hydrated =', isHydrated) // DEBUG

  const addToCart = (plat) => {
    console.log('📦 Ajout au panier:', plat) // DEBUG
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === plat.id)

      if (existingItem) {
        // Si le plat existe, augmenter la quantité (sans dépasser le stock)
        const updated = prevCart.map(item =>
          item.id === plat.id
            ? {
                ...item,
                quantity: Math.min(item.quantity + 1, item.quantite_stock),
              }
            : item
        )
        console.log('✅ Panier après ajout (existant):', updated) // DEBUG
        return updated
      } else {
        // Sinon, ajouter le nouveau plat
        const updated = [
          ...prevCart,
          {
            ...plat,
            quantity: 1,
          },
        ]
        console.log('✅ Panier après ajout (nouveau):', updated) // DEBUG
        return updated
      }
    })
  }

  const updateQuantity = (platId, newQuantity, maxStock) => {
    if (newQuantity <= 0) {
      removeFromCart(platId)
      return
    }

    // Ne pas dépasser le stock
    const limitedQuantity = Math.min(newQuantity, maxStock)

    setCart(prevCart =>
      prevCart.map(item =>
        item.id === platId
          ? { ...item, quantity: limitedQuantity }
          : item
      )
    )
  }

  const removeFromCart = (platId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== platId))
  }

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0)
  }

  const clearCart = () => {
    setCart([])
    localStorage.removeItem('cart')
  }

  const value = {
    cart,
    addToCart,
    updateQuantity,
    removeFromCart,
    getTotalItems,
    clearCart,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart doit être utilisé dans CartProvider')
  }
  return context
}
