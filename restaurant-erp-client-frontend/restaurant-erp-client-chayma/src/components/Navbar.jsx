import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'

const CartSVG = () => (
  <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 456.029 456.029" width="22px" height="22px" fill="currentColor">
    <g><g><path d="M345.6,338.862c-29.184,0-53.248,23.552-53.248,53.248c0,29.184,23.552,53.248,53.248,53.248c29.184,0,53.248-23.552,53.248-53.248C398.336,362.926,374.784,338.862,345.6,338.862z"/></g></g>
    <g><g><path d="M439.296,84.91c-1.024,0-2.56-0.512-4.096-0.512H112.64l-5.12-34.304C104.448,27.566,84.992,10.67,61.952,10.67H20.48C9.216,10.67,0,19.886,0,31.15c0,11.264,9.216,20.48,20.48,20.48h41.472c2.56,0,4.608,2.048,5.12,4.608l31.744,216.064c4.096,27.136,27.648,47.616,55.296,47.616h212.992c26.624,0,49.664-18.944,55.296-45.056l33.28-166.4C457.728,97.71,450.56,86.958,439.296,84.91z"/></g></g>
    <g><g><path d="M215.04,389.55c-1.024-28.16-24.576-50.688-52.736-50.688c-29.696,1.536-52.224,26.112-51.2,55.296c1.024,28.16,24.064,50.688,52.224,50.688h1.024C193.536,443.31,216.576,418.734,215.04,389.55z"/></g></g>
  </svg>
)

// AJOUT DE LA PROP `onOpenCart` ICI 👇
export default function Navbar({ scrollTo, onOpenCart }) {
  const navigate = useNavigate()
  const { getTotalItems } = useCart()
  const totalItems = getTotalItems()

  const handleNav = (e, id) => {
    e.preventDefault()
    if (scrollTo) {
      scrollTo(id)
    } else {
      navigate('/')
      setTimeout(() => {
        const el = document.getElementById(id)
        if (el) el.scrollIntoView({ behavior: 'smooth' })
      }, 100)
    }
  }

  return (
    <header className="header_section">
      <div className="container">
        <nav className="navbar navbar-expand-lg custom_nav-container">
          <a className="navbar-brand" href="#" onClick={e => handleNav(e, 'hero-section')}>
            <span>La Maison</span>
          </a>
          <button className="navbar-toggler" type="button"
            data-toggle="collapse" data-target="#navbarSupportedContent">
            <span></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mx-auto">
              <li className="nav-item">
                <a className="nav-link" href="#" onClick={e => handleNav(e, 'hero-section')}>Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#" onClick={e => handleNav(e, 'menu-section')}>Menu</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#" onClick={e => handleNav(e, 'about-section')}>About</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#" onClick={e => handleNav(e, 'book-section')}>Book Table</a>
              </li>
            </ul>
            <div className="user_option">
              <a href="#" className="user_link">
                <i className="fa fa-user" aria-hidden="true"></i>
              </a>

              {/* === BOUTON DU PANIER CORRIGÉ === */}
              <a 
                className="cart_link" 
                href="#" 
                onClick={(e) => { 
                  e.preventDefault(); 
                  if(onOpenCart) onOpenCart(); /* CA APPELLE LA FONCTION D'OUVERTURE ! */
                }}
                style={{ 
                  position: 'relative', 
                  display: 'inline-flex', 
                  alignItems: 'center', 
                  marginRight: '15px' 
                }}
              >
                <CartSVG />
                
                {/* POINT ROUGE BADGE PARFAITEMENT CENTRÉ */}
                {totalItems > 0 && (
                  <span
                    style={{
                      position: 'absolute',
                      top: '-6px',
                      right: '-8px',
                      backgroundColor: '#ff4d4d',
                      color: 'white',
                      borderRadius: '50%',
                      width: '18px',
                      height: '18px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '11px',
                      fontWeight: 'bold',
                      boxShadow: '0px 2px 4px rgba(0,0,0,0.3)',
                      border: '1px solid #222831'
                    }}>
                    {totalItems}
                  </span>
                )}
              </a>

              <form className="form-inline">
                <button className="btn my-2 my-sm-0 nav_search-btn" type="submit">
                  <i className="fa fa-search" aria-hidden="true"></i>
                </button>
              </form>
              <a href="#" className="order_online" onClick={e => handleNav(e, 'menu-section')}>
                Order Online
              </a>
            </div>
          </div>
        </nav>
      </div>
    </header>
  )
}