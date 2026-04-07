import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default function About() {
  return (
    <div>
      <div className="hero_area" style={{ minHeight: 'auto' }}>
        <Navbar />
      </div>
      <section className="about_section layout_padding">
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
                <p>
                  Un restaurant gastronomique au cœur de Casablanca, proposant une cuisine authentique marocaine et internationale préparée avec des ingrédients frais.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  )
}