export default function Footer() {
  return (
    <footer className="footer_section">
      <div className="container">
        <div className="row">
          <div className="col-md-4 footer-col">
            <div className="footer_contact">
              <h4>Contact Us</h4>
              <div className="contact_link_box">
                <a href="#"><i className="fa fa-map-marker"></i> <span>Casablanca, Maroc</span></a>
                <a href="#"><i className="fa fa-phone"></i> <span>+212 6 00 00 00 00</span></a>
                <a href="#"><i className="fa fa-envelope"></i> <span>contact@lamaison.ma</span></a>
              </div>
            </div>
          </div>
          <div className="col-md-4 footer-col">
            <div className="footer_detail">
              <a href="#" className="footer-logo">La Maison</a>
              <p>Restaurant gastronomique au cœur de Casablanca, des saveurs authentiques depuis 2012.</p>
              <div className="footer_social">
                <a href="#"><i className="fa fa-facebook"></i></a>
                <a href="#"><i className="fa fa-instagram"></i></a>
                <a href="#"><i className="fa fa-twitter"></i></a>
              </div>
            </div>
          </div>
          <div className="col-md-4 footer-col">
            <h4>Opening Hours</h4>
            <p>Everyday</p>
            <p>10:00 AM - 11:00 PM</p>
          </div>
        </div>
        <div className="footer-info">
          <p>© 2026 La Maison Restaurant. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  )
}