import { useState, useEffect } from 'react'
import api from '../api/axios'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'


export default function Menu() {
  const [plats, setPlats] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [activeCategory, setActiveCategory] = useState('')
  const [halal, setHalal] = useState(false)
  const [vegetarien, setVegetarien] = useState(false)
  const [sansGluten, setSansGluten] = useState(false)
  const [search, setSearch] = useState('')

  useEffect(() => {
    api.get('/categories')
      .then(res => {
        console.log('✅ Catégories chargées:', res.data.data)
        setCategories(res.data.data)
      })
      .catch(err => {
        console.error('❌ Erreur catégories:', err.message)
        setError('Impossible de charger les catégories')
      })
  }, [])

  useEffect(() => {
    setLoading(true)
    const params = {}
    if (activeCategory) params.categorie_id = activeCategory
    if (halal) params.halal = true
    if (vegetarien) params.vegetarien = true
    if (sansGluten) params.sans_gluten = true
    if (search) params.search = search
    
    console.log('🔄 Fetch plats avec params:', params)
    
    api.get('/plats', { params })
      .then(res => {
        console.log('✅ Plats chargés:', res.data.data)
        setPlats(res.data.data)
        setLoading(false)
      })
      .catch(err => {
        console.error('❌ Erreur plats:', err.message, err)
        setError(err.message || 'Impossible de charger les plats')
        setLoading(false)
        setPlats([])
      })
  }, [activeCategory, halal, vegetarien, sansGluten, search])

  return (
    <div>
      <div className="hero_area" style={{ minHeight: 'auto' }}>
        <Navbar />
      </div>

      <section className="food_section layout_padding-bottom">
        <div className="container">
          <div className="heading_container heading_center">
            <h2>Notre Menu</h2>
          </div>

          {/* Affichage des erreurs */}
          {error && (
            <div style={{
              background: '#f8d7da',
              border: '1px solid #f5c6cb',
              color: '#721c24',
              padding: '15px',
              borderRadius: '5px',
              marginBottom: '20px',
            }}>
              <strong>❌ Erreur:</strong> {error}
            </div>
          )}
          <div className="d-flex justify-content-center mb-3">
            <input
              type="text"
              className="form-control w-50"
              placeholder="🔍 Rechercher un plat..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>

          {/* Filters */}
          <div className="d-flex justify-content-center mb-3" style={{ gap: '10px' }}>
            <button
              className={`btn ${halal ? 'btn-warning' : 'btn-outline-warning'}`}
              onClick={() => setHalal(!halal)}>
              🌙 Halal
            </button>
            <button
              className={`btn ${vegetarien ? 'btn-success' : 'btn-outline-success'}`}
              onClick={() => setVegetarien(!vegetarien)}>
              🥗 Végétarien
            </button>
            <button
              className={`btn ${sansGluten ? 'btn-info' : 'btn-outline-info'}`}
              onClick={() => setSansGluten(!sansGluten)}>
              🌾 Sans Gluten
            </button>
          </div>

          {/* Category tabs */}
          <ul className="filters_menu">
            <li
              className={activeCategory === '' ? 'active' : ''}
              onClick={() => setActiveCategory('')}>
              All
            </li>
            {categories.map(cat => (
              <li
                key={cat.id}
                className={activeCategory === String(cat.id) ? 'active' : ''}
                onClick={() => setActiveCategory(String(cat.id))}>
                {cat.nom}
              </li>
            ))}
          </ul>

          {/* Plats */}
          {loading ? (
            <div className="text-center py-5">
              <p>Chargement...</p>
            </div>
          ) : (
            <div className="filters-content">
              <div className="row grid">
                {plats.length === 0 ? (
                  <div className="text-center py-5 w-100">
                    <p>Aucun plat trouvé</p>
                  </div>
                ) : (
                  plats.map(plat => (
                    <PlatCard key={plat.id} plat={plat} />
                  ))
                )}
              </div>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  )
}