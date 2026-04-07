import { useState, useEffect } from 'react'
import axios from 'axios'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useCart } from '../context/CartContext'

const API = 'http://localhost:8000/api'

// SVG du panier
const CartSVG = () => (
  <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 456.029 456.029" width="20px" height="20px" fill="currentColor">
    <g><path d="M345.6,338.862c-29.184,0-53.248,23.552-53.248,53.248c0,29.184,23.552,53.248,53.248,53.248c29.184,0,53.248-23.552,53.248-53.248C398.336,362.926,374.784,338.862,345.6,338.862z"/></g>
    <g><path d="M439.296,84.91c-1.024,0-2.56-0.512-4.096-0.512H112.64l-5.12-34.304C104.448,27.566,84.992,10.67,61.952,10.67H20.48C9.216,10.67,0,19.886,0,31.15c0,11.264,9.216,20.48,20.48,20.48h41.472c2.56,0,4.608,2.048,5.12,4.608l31.744,216.064c4.096,27.136,27.648,47.616,55.296,47.616h212.992c26.624,0,49.664-18.944,55.296-45.056l33.28-166.4C457.728,97.71,450.56,86.958,439.296,84.91z"/></g>
    <g><path d="M215.04,389.55c-1.024-28.16-24.576-50.688-52.736-50.688c-29.696,1.536-52.224,26.112-51.2,55.296c1.024,28.16,24.064,50.688,52.224,50.688h1.024C193.536,443.31,216.576,418.734,215.04,389.55z"/></g>
  </svg>
)

export default function Home() {
  const [plats, setPlats] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeCategory, setActiveCategory] = useState('')
  const [halal, setHalal] = useState(false)
  const [vegetarien, setVegetarien] = useState(false)
  const[sansGluten, setSansGluten] = useState(false)
  const [search, setSearch] = useState('')

  // UI States
  const [isCartOpen, setIsCartOpen] = useState(false)
  const[orderType, setOrderType] = useState('Emporter')

  // ON UTILISE ICI LE CONTEXT
  const { cart, addToCart, updateQuantity, removeFromCart, getTotalItems } = useCart()

  const cartItemCount = getTotalItems()
  const subtotal = cart.reduce((sum, item) => sum + (parseFloat(item.prix) * item.quantity), 0)
  const fees = orderType === 'Livraison' ? 15.00 : 0
  const total = subtotal + fees

  useEffect(() => {
    axios.get(`${API}/categories`).then(res => setCategories(res.data.data))
  },[])

  useEffect(() => {
    if (window.$) {
      window.$('#customCarousel1').carousel({ interval: 5000, ride: 'carousel' })
      window.$('.client_owl-carousel').owlCarousel({ loop: true, margin: 20, nav: true, responsive: { 0: { items: 1 }, 600: { items: 2 } } })
    }
  },[])

  useEffect(() => {
    const fetchPlats = (showLoader = false) => {
      if (showLoader) setLoading(true)
      const params = {}
      if (activeCategory) params.categorie_id = activeCategory
      if (halal) params.halal = true
      if (vegetarien) params.vegetarien = true
      if (sansGluten) params.sans_gluten = true
      if (search) params.search = search
      axios.get(`${API}/plats`, { params }).then(res => {
        setPlats(res.data.data)
        if (showLoader) setLoading(false)
      })
    }
    fetchPlats(true)
    const intervalId = setInterval(() => { fetchPlats(false) }, 15000)
    return () => clearInterval(intervalId)
  }, [activeCategory, halal, vegetarien, sansGluten, search])

  const scrollTo = (id) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div style={{ position: 'relative' }}>
      
      {/* On relie la Navbar pour que le clic sur son icône ouvre le Panier */}
      <Navbar scrollTo={scrollTo} onOpenCart={() => setIsCartOpen(true)} />

      {/* BOUTON FLOTTANT (s'affiche uniquement si on a qqch dans le panier) */}
      {cartItemCount > 0 && !isCartOpen && (
        <div onClick={() => setIsCartOpen(true)} style={{ position: 'fixed', bottom: '30px', right: '30px', zIndex: 9999, cursor: 'pointer' }}>
          <div style={{ position: 'relative', backgroundColor: '#ffbe33', width: '65px', height: '65px', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', boxShadow: '0 4px 15px rgba(0,0,0,0.3)', color: 'white' }}>
            <CartSVG />
            <span style={{ position: 'absolute', top: '-3px', right: '-3px', backgroundColor: '#ff4d4d', color: 'white', fontSize: '13px', fontWeight: 'bold', minWidth: '24px', height: '24px', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', border: '2px solid white', boxShadow: '0 2px 4px rgba(0,0,0,0.2)' }}>
              {cartItemCount}
            </span>
          </div>
        </div>
      )}

      {/* MODAL DU PANIER COULISSANT */}
      {isCartOpen && (
        <>
          <div onClick={() => setIsCartOpen(false)} style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 10000 }}></div>
          <div style={{ position: 'fixed', top: 0, right: 0, width: '400px', height: '100%', backgroundColor: 'white', zIndex: 10001, padding: '30px', display: 'flex', flexDirection: 'column', boxShadow: '-5px 0 20px rgba(0,0,0,0.2)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px', marginTop: '20px' }}>
              <h3 style={{ margin: 0, fontWeight: 'bold' }}>🛒 Mon Panier</h3>
              <button onClick={() => setIsCartOpen(false)} style={{ background: '#ff4d4d', color: 'white', border: 'none', borderRadius: '50%', width: '30px', height: '30px', cursor: 'pointer' }}>✕</button>
            </div>

            <div style={{ flex: 1, overflowY: 'auto' }}>
              {cart.map(item => (
                <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px', borderBottom: '1px solid #eee', paddingBottom: '10px' }}>
                  <div>
                    <h6 style={{ margin: 0 }}>{item.nom}</h6>
                    <small style={{ color: '#ffbe33', fontWeight: 'bold' }}>{item.prix} MAD</small>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity - 1, item.quantite_stock || 999)} 
                      style={{ border: '1px solid #ddd', background: 'none', borderRadius: '50%', width: '24px', height: '24px', cursor: 'pointer' }}>
                      -
                    </button>
                    <span style={{ fontWeight: 'bold' }}>{item.quantity}</span>
                    
                    {/* Le bouton + se désactive avec limite de stock */}
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity + 1, item.quantite_stock || 999)} 
                      disabled={item.quantity >= (item.quantite_stock || 999)}
                      style={{ 
                        border: '1px solid #ddd', 
                        background: 'none', 
                        borderRadius: '50%', 
                        width: '24px', height: '24px', 
                        cursor: item.quantity >= (item.quantite_stock || 999) ? 'not-allowed' : 'pointer',
                        opacity: item.quantity >= (item.quantite_stock || 999) ? 0.4 : 1
                      }}>
                      +
                    </button>
                    <button onClick={() => removeFromCart(item.id)} style={{ border: 'none', background: 'none', color: 'red', cursor: 'pointer', marginLeft: '10px' }}>🗑️</button>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ background: '#f9f9f9', padding: '15px', borderRadius: '10px', marginTop: '20px' }}>
              <p style={{ fontWeight: 'bold', marginBottom: '10px' }}>Type de commande :</p>
              <div style={{ display: 'flex', gap: '10px' }}>
                <button onClick={() => setOrderType('Emporter')} style={{ flex: 1, padding: '8px', borderRadius: '5px', cursor: 'pointer', border: orderType === 'Emporter' ? '2px solid #ffbe33' : '1px solid #ddd', backgroundColor: orderType === 'Emporter' ? '#fff' : '#eee' }}>🛍️ Emporter</button>
                <button onClick={() => setOrderType('Livraison')} style={{ flex: 1, padding: '8px', borderRadius: '5px', cursor: 'pointer', border: orderType === 'Livraison' ? '2px solid #ffbe33' : '1px solid #ddd', backgroundColor: orderType === 'Livraison' ? '#fff' : '#eee' }}>🚚 Livraison</button>
              </div>
            </div>

            <div style={{ marginTop: '20px', paddingTop: '15px', borderTop: '2px solid #eee' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}><p>Total Produits</p><p>{subtotal.toFixed(2)} MAD</p></div>
              {orderType === 'Livraison' && <div style={{ display: 'flex', justifyContent: 'space-between' }}><p>Frais Livraison</p><p>+ 15.00 MAD</p></div>}
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.2rem', fontWeight: 'bold', marginTop: '10px' }}><span>Total</span><span style={{ color: '#28a745' }}>{total.toFixed(2)} MAD</span></div>
            </div>

            <button style={{ width: '100%', padding: '15px', backgroundColor: '#ffbe33', color: 'white', border: 'none', borderRadius: '5px', fontWeight: 'bold', fontSize: '1.1rem', cursor: 'pointer', marginTop: '20px' }}>Valider la Commande</button>
          </div>
        </>
      )}

      {/* ======== SECTION HERO ======== */}
      <div id="hero-section" className="hero_area">
        <div className="bg-box">
          <img src="/assets/images/hero-bg.jpg" alt="" />
        </div>
        <section className="slider_section">
          <div id="customCarousel1" className="carousel slide" data-ride="carousel" data-interval="5000" data-pause="false">
            <div className="carousel-inner">
              <div className="carousel-item active">
                <div className="container">
                  <div className="row">
                    <div className="col-md-7 col-lg-6">
                      <div className="detail-box">
                        <h1>Fast Food Restaurant</h1>
                        <p>Doloremque, itaque aperiam facilis rerum, commodi, temporibus sapiente ad mollitia laborum quam quisquam esse error unde.</p>
                        <div className="btn-box">
                          <a href="#" onClick={(e) => { e.preventDefault(); scrollTo('menu-section'); }} className="btn1">Order Now</a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* ======== SECTION OFFER ======== */}
      <section id="offer-section" className="offer_section layout_padding-bottom">
        <div className="offer_container">
          <div className="container">
            <div className="row">
              <div className="col-md-6">
                <div className="box">
                  <div className="img-box"><img src="/assets/images/o1.jpg" alt="" /></div>
                  <div className="detail-box">
                    <h5>Tasty Thursdays</h5>
                    <h6><span>20%</span> Off</h6>
                    <a href="#" onClick={(e) => { e.preventDefault(); scrollTo('menu-section'); }}>Order Now <CartSVG /></a>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="box">
                  <div className="img-box"><img src="/assets/images/o2.jpg" alt="" /></div>
                  <div className="detail-box">
                    <h5>Pizza Days</h5>
                    <h6><span>15%</span> Off</h6>
                    <a href="#" onClick={(e) => { e.preventDefault(); scrollTo('menu-section'); }}>Order Now <CartSVG /></a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ======== SECTION MENU AVEC GESTION STOCK ======== */}
      <section id="menu-section" className="food_section layout_padding-bottom mt-5">
        <div className="container">
          <div className="heading_container heading_center">
            <h2>Our Menu</h2>
          </div>
          <div className="d-flex justify-content-center mb-3">
            <input type="text" className="form-control w-50" placeholder="🔍 Rechercher un plat..." value={search} onChange={e => setSearch(e.target.value)} />
          </div>
          <div className="d-flex justify-content-center mb-3" style={{ gap: '10px' }}>
            <button className={`btn ${halal ? 'btn-warning' : 'btn-outline-warning'}`} onClick={() => setHalal(!halal)}>🌙 Halal</button>
            <button className={`btn ${vegetarien ? 'btn-success' : 'btn-outline-success'}`} onClick={() => setVegetarien(!vegetarien)}>🥗 Végétarien</button>
            <button className={`btn ${sansGluten ? 'btn-info' : 'btn-outline-info'}`} onClick={() => setSansGluten(!sansGluten)}>🌾 Sans Gluten</button>
          </div>
          <ul className="filters_menu">
            <li className={activeCategory === '' ? 'active' : ''} onClick={() => setActiveCategory('')}>All</li>
            {categories.map(cat => (
              <li key={cat.id} className={activeCategory === String(cat.id) ? 'active' : ''} onClick={() => setActiveCategory(String(cat.id))}>{cat.nom}</li>
            ))}
          </ul>
          {loading ? (
            <div className="text-center py-5"><p>Chargement...</p></div>
          ) : (
            <div className="filters-content">
              <div className="row grid">
                {plats.length === 0 ? (
                  <div className="text-center py-5 w-100"><p>Aucun plat trouvé</p></div>
                ) : (
                  plats.map(plat => {
                    // Petite vérification pour éviter les undefined sur stock
                    const quantite_dispo = plat.quantite_stock !== undefined ? plat.quantite_stock : 999;
                    
                    return (
                    <div key={plat.id} className="col-sm-6 col-lg-4 all">
                      <div className="box">
                        <div>
                          <div className="img-box">
                            <img src={plat.image || '/assets/images/f1.png'} alt={plat.nom} />
                          </div>
                          <div className="detail-box">
                            <h5>{plat.nom}</h5>
                            <p>{plat.description}</p>
                            
                            {/* NOUVELLE STRUCTURE QUI GERE LE STOCK */}
                            <div className="options" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                              <div>
                                <h6 style={{ margin: 0 }}>{plat.prix} MAD</h6>
                                {plat.est_disponible && quantite_dispo > 0 ? (
                                  <small style={{ color: '#28a745', fontWeight: 'bold' }}>{quantite_dispo > 50 ? 'En stock' : `${quantite_dispo} en stock`}</small>
                                ) : (
                                  <small style={{ color: '#dc3545', fontWeight: 'bold' }}>Rupture de stock</small>
                                )}
                              </div>
                              
                              {/* BOUTON PANIER */}
                              {plat.est_disponible && quantite_dispo > 0 ? (
                                <a href="#" onClick={(e) => { e.preventDefault(); addToCart(plat); }}>
                                  <CartSVG />
                                </a>
                              ) : (
                                <a href="#" style={{ opacity: 0.4, cursor: 'not-allowed', backgroundColor: '#eee', borderRadius: '50%', padding: '8px' }} onClick={(e) => e.preventDefault()} title="Rupture de stock">
                                  <CartSVG />
                                </a>
                              )}
                            </div>

                            <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap', marginTop: '6px' }}>
                              {plat.est_halal && <span style={{ background: '#28a745', color: 'white', padding: '2px 8px', borderRadius: '10px', fontSize: '11px' }}>🌙 Halal</span>}
                              {plat.est_vegetarien && <span style={{ background: '#17a2b8', color: 'white', padding: '2px 8px', borderRadius: '10px', fontSize: '11px' }}>🥗 Végé</span>}
                              {plat.est_sans_gluten && <span style={{ background: '#ffc107', color: 'white', padding: '2px 8px', borderRadius: '10px', fontSize: '11px' }}>🌾 S.G</span>}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )})
                )}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ======== SECTION ABOUT ======== */}
      <section id="about-section" className="about_section layout_padding">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <div className="img-box">
                <img src="/assets/images/about-img.png" alt="" />
              </div>
            </div>
            <div className="col-md-6">
              <div className="detail-box">
                <div className="heading_container">
                  <h2>Nous sommes La Maison</h2>
                </div>
                <p>Un restaurant gastronomique au cœur de Casablanca, proposant une cuisine authentique marocaine et internationale préparée avec des ingrédients frais.</p>
                <a href="#" onClick={(e) => { e.preventDefault(); scrollTo('hero-section'); }}>Read More</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ======== SECTION RESERVATION ======== */}
      <section id="book-section" className="book_section layout_padding">
        <div className="container">
          <div className="heading_container">
            <h2>Réservez une Table</h2>
          </div>
          <div className="row">
            <div className="col-md-6">
              <div className="form_container">
                <div><input type="text" className="form-control" placeholder="Your Name" /></div>
                <div><input type="text" className="form-control" placeholder="Phone Number" /></div>
                <div><input type="email" className="form-control" placeholder="Your Email" /></div>
                <div>
                  <select className="form-control" defaultValue="">
                    <option value="" disabled>How many persons?</option>
                    {[2,3,4,5].map(n => <option key={n} value={n}>{n}</option>)}
                  </select>
                </div>
                <div><input type="date" className="form-control" /></div>
                <div className="btn_box"><button>Book Now</button></div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="map_container">
                <iframe title="map" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d106375.68698354904!2d-7.6635008!3d33.5730818!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xda7cd4778aa113b%3A0xb06c1d84f310fd3!2sCasablanca!5e0!3m2!1sfr!2sma!4v1234567890" width="100%" height="345" style={{ border: 0 }} allowFullScreen="" loading="lazy"></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>
      
       {/* ======== CLIENTS ======== */}
      <section id="clients-section" className="client_section layout_padding-bottom">
        <div className="container">
          <div className="heading_container heading_center psudo_white_primary mb_45">
            <h2>What Says Our Customers</h2>
          </div>
          <div className="carousel-wrap row">
            <div className="owl-carousel client_owl-carousel">
              {[
                { name: 'Moana Michell', img: 'client1.jpg', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },
                { name: 'Mike Hamell', img: 'client2.jpg', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },
              ].map(({ name, img, text }) => (
                <div key={name} className="item">
                  <div className="box">
                    <div className="detail-box">
                      <p>{text}</p>
                      <h6>{name}</h6>
                      <p>magna aliqua</p>
                    </div>
                    <div className="img-box">
                      <img src={`/assets/images/${img}`} alt="" className="box-img" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}