import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
// On ajoute l'import du Provider ici
import { CartProvider } from './context/CartContext.jsx' 

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CartProvider> {/* On enveloppe tout ici */}
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </CartProvider>
  </StrictMode>,
)