import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default function Reservation() {
  return (
    <div>
      <div className="hero_area" style={{ minHeight: 'auto' }}>
        <Navbar />
      </div>
      <section className="book_section layout_padding">
        <div className="container">
          <div className="heading_container">
            <h2>Réserver une Table</h2>
          </div>
          <div className="row justify-content-center">
            <div className="col-md-6">
              <div className="form_container">
                <div>
                  <input type="text" className="form-control" placeholder="Votre Nom" />
                </div>
                <div>
                  <input type="text" className="form-control" placeholder="Téléphone" />
                </div>
                <div>
                  <input type="email" className="form-control" placeholder="Email" />
                </div>
                <div>
                  <select className="form-control">
                    <option value="" disabled defaultValue>Nombre de personnes?</option>
                    {[2,3,4,5,6].map(n => <option key={n} value={n}>{n}</option>)}
                  </select>
                </div>
                <div>
                  <input type="date" className="form-control" />
                </div>
                <div className="btn_box">
                  <button>Réserver</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  )
}