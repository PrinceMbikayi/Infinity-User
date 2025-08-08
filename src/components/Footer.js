import React from "react";
import { Link } from "react-router-dom";
import { BsLinkedin, BsGithub, BsYoutube, BsInstagram } from "react-icons/bs";
import newsletter from "../images/newsletter.png";
// import "./Footer.css";

const Footer = () => {
  return (
    <>
      <footer className="py-4">
        <div className="container-xxl">
          <div className="row align-items-center">
            <div className="col-5">
              <div className="footer-top-data d-flex gap-30 align-items-center">
                <img src={newsletter} alt="newsletter" />
                <h2 className="mb-0 text-white">Sign Up for Newsletter</h2>
              </div>
            </div>
            <div className="col-7">
              <div className="input-group">
                <input
                  type="text"
                  className="form-control py-1"
                  placeholder="Your Email Address"
                  aria-label="Your Email Address"
                  aria-describedby="basic-addon2"
                />
                <span className="input-group-text p-2" id="basic-addon2">
                  Subscribe
                </span>
              </div>
            </div>
          </div>
        </div>
      </footer>
      <footer className="py-4">
        <div className="container-xxl">
          <div className="row">
            <div className="col-4">
              <h4 className="text-white mb-4">Contact Us</h4>
              <div>
                <address className="text-white fs-6">
                  867, Boulevard Kanyamuhanga <br /> Les Volcans, Goma, DR Congo{" "}
                  <br />
                  PinCode: 16094
                </address>
                <a
                  href="tel:+243 902901951"
                  className="mt-3 d-block mb-1 text-white"
                >
                  +243 902901951
                </a>
                <a
                  href="mailto:dreamlicious.srs@gmail.com"
                  className="mt-2 d-block mb-0 text-white"
                >
                  support@ritzglobal.org
                </a>
                <div className="social_icons d-flex align-items-center gap-30 mt-4">
                  <a className="text-white" href="#">
                    <BsLinkedin className="fs-4" />
                  </a>
                  <a className="text-white" href="#">
                    <BsInstagram className="fs-4" />
                  </a>
                  <a className="text-white" href="#">
                    <BsGithub className="fs-4" />
                  </a>
                  <a className="text-white" href="#">
                    <BsYoutube className="fs-4" />
                  </a>
                </div>
              </div>
            </div>
            <div className="col-3">
              <h4 className="text-white mb-4">Informations Légales</h4>
              <div className="footer-link d-flex flex-column">
                <Link to="/privacy-policy" className="text-white py-2 mb-1">
                  Politique de Confidentialité
                </Link>
                <Link to="/refund-policy" className="text-white py-2 mb-1">
                  Politique de Retour
                </Link>
                <Link to="/shipping-policy" className="text-white py-2 mb-1">
                  Politique de Livraison
                </Link>
                <Link to="/term-conditions" className="text-white py-2 mb-1">
                  Conditions Générales
                </Link>
                <Link to="/blogs" className="text-white py-2 mb-1">
                  Blog
                </Link>
              </div>
            </div>
            <div className="col-2">
              <h4 className="text-white mb-4">Mon Compte</h4>
              <div className="footer-link d-flex flex-column">
                <Link to="/login" className="text-white py-2 mb-1">
                  Connexion
                </Link>
                <Link to="/signup" className="text-white py-2 mb-1">
                  Inscription
                </Link>
                <Link to="/my-profile" className="text-white py-2 mb-1">
                  Mon Profil
                </Link>
                <Link to="/my-orders" className="text-white py-2 mb-1">
                  Mes Commandes
                </Link>
                <Link to="/wishlist" className="text-white py-2 mb-1">
                  Ma Liste de Souhaits
                </Link>
              </div>
            </div>
            <div className="col-2">
              <h4 className="text-white mb-4">Support Client</h4>
              <div className="footer-link d-flex flex-column">
                <Link to="/faq" className="text-white py-2 mb-1">
                  FAQ
                </Link>
                <Link to="/contact" className="text-white py-2 mb-1">
                  Nous Contacter
                </Link>
                <Link to="/about" className="text-white py-2 mb-1">
                  À Propos
                </Link>
                <a href="tel:+243902901951" className="text-white py-2 mb-1">
                  Support Téléphonique
                </a>
                <a href="mailto:support@ritzglobal.org" className="text-white py-2 mb-1">
                  Support Email
                </a>
              </div>
            </div>
            <div className="col-1">
              <h4 className="text-white mb-4">Catégories</h4>
              <div className="footer-link d-flex flex-column">
                <Link to="/product?category=Ordinateurs" className="text-white py-2 mb-1">
                  Ordinateurs
                </Link>
                <Link to="/product?category=Téléphones" className="text-white py-2 mb-1">
                  Téléphones
                </Link>
                <Link to="/product?category=Tablettes" className="text-white py-2 mb-1">
                  Tablettes
                </Link>
                <Link to="/product?category=Montres" className="text-white py-2 mb-1">
                  Montres
                </Link>
                <Link to="/promotions" className="text-white py-2 mb-1">
                  Promotions
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
      
      {/* Section méthodes de paiement et certifications */}
      <footer className="py-3" style={{ backgroundColor: 'var(--color-3b4149)' }}>
        <div className="container-xxl">
          <div className="row align-items-center">
            <div className="col-md-6">
              <div className="payment-methods">
                <h6 className="text-white mb-2">Méthodes de Paiement Sécurisées</h6>
                <div className="d-flex align-items-center gap-15">
                  <span className="text-white-50 fs-6">💳 Visa</span>
                  <span className="text-white-50 fs-6">💳 MasterCard</span>
                  <span className="text-white-50 fs-6">💳 PayPal</span>
                  <span className="text-white-50 fs-6">🏦 Virement</span>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="certifications text-md-end">
                <h6 className="text-white mb-2">Certifications & Sécurité</h6>
                <div className="d-flex justify-content-md-end align-items-center gap-15">
                  <span className="text-white-50 fs-6">🔒 SSL Sécurisé</span>
                  <span className="text-white-50 fs-6">✅ Site Vérifié</span>
                  <span className="text-white-50 fs-6">🛡️ Protection Acheteur</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
      
      <footer className="py-4">
        <div className="container-xxl">
          <div className="row">
            <div className="col-md-6">
              <p className="mb-0 text-white">
                &copy; {new Date().getFullYear()} Ritz Global. Tous droits réservés.
              </p>
            </div>
            <div className="col-md-6">
              <p className="mb-0 text-white text-md-end">
                Développé avec ❤️ pour une expérience e-commerce exceptionnelle
              </p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
