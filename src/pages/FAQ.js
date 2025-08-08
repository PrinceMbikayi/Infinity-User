import React, { useState } from "react";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import Container from "../components/Container";
import { Link } from "react-router-dom";

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqData = [
    {
      question: "Comment passer une commande ?",
      answer: "Pour passer une commande, ajoutez simplement les produits souhaités à votre panier, puis cliquez sur 'Passer la commande'. Vous devrez créer un compte ou vous connecter, puis suivre les étapes de paiement."
    },
    {
      question: "Quels sont les modes de paiement acceptés ?",
      answer: "Nous acceptons les cartes de crédit (Visa, MasterCard, American Express), PayPal, et les virements bancaires. Tous les paiements sont sécurisés et cryptés."
    },
    {
      question: "Quels sont les délais de livraison ?",
      answer: "Les délais de livraison varient selon votre localisation : 2-3 jours ouvrables pour les livraisons locales, 5-7 jours pour les livraisons nationales, et 10-15 jours pour les livraisons internationales."
    },
    {
      question: "Puis-je retourner un produit ?",
      answer: "Oui, vous disposez de 30 jours à compter de la réception pour retourner un produit. Le produit doit être dans son état d'origine avec tous les accessoires et l'emballage."
    },
    {
      question: "Comment suivre ma commande ?",
      answer: "Une fois votre commande expédiée, vous recevrez un email avec un numéro de suivi. Vous pouvez également consulter le statut de votre commande dans votre espace client."
    },
    {
      question: "Que faire si un produit est défectueux ?",
      answer: "Si vous recevez un produit défectueux, contactez-nous immédiatement via notre formulaire de contact. Nous organiserons un échange ou un remboursement selon votre préférence."
    },
    {
      question: "Proposez-vous une garantie sur vos produits ?",
      answer: "Oui, tous nos produits bénéficient de la garantie constructeur. La durée varie selon le produit (généralement 1 à 2 ans). Les détails sont disponibles sur chaque fiche produit."
    },
    {
      question: "Comment modifier ou annuler ma commande ?",
      answer: "Vous pouvez modifier ou annuler votre commande dans les 2 heures suivant la confirmation, en nous contactant directement. Après ce délai, la commande est en cours de préparation."
    },
    {
      question: "Livrez-vous à l'international ?",
      answer: "Oui, nous livrons dans de nombreux pays. Les frais de livraison et délais varient selon la destination. Consultez notre page de livraison pour plus de détails."
    },
    {
      question: "Comment créer un compte ?",
      answer: "Cliquez sur 'Mon Compte' puis 'Inscription' dans le menu principal. Remplissez le formulaire avec vos informations personnelles. Vous recevrez un email de confirmation."
    }
  ];

  return (
    <>
      <Meta title={"FAQ - Questions Fréquentes"} />
      <BreadCrumb title="FAQ" />
      <Container class1="faq-wrapper home-wrapper-2 py-5">
        <div className="row">
          <div className="col-12">
            <div className="section-heading mb-4">
              <h2>❓ Questions Fréquemment Posées</h2>
              <p className="mb-0">Trouvez rapidement les réponses à vos questions les plus courantes</p>
            </div>
          </div>
        </div>

        {/* Section de recherche rapide */}
        <div className="row mb-5">
          <div className="col-12">
            <div className="quick-help p-4" style={{
              backgroundColor: 'var(--color-f5f5f7)',
              borderRadius: '10px',
              border: '1px solid var(--color-ededed)'
            }}>
              <h4 className="mb-3">🚀 Besoin d'aide rapide ?</h4>
              <div className="row">
                <div className="col-md-3 mb-2">
                  <Link to="/contact" className="btn btn-outline-primary w-100">
                    📞 Nous Contacter
                  </Link>
                </div>
                <div className="col-md-3 mb-2">
                  <Link to="/my-orders" className="btn btn-outline-primary w-100">
                    📦 Mes Commandes
                  </Link>
                </div>
                <div className="col-md-3 mb-2">
                  <Link to="/shipping-policy" className="btn btn-outline-primary w-100">
                    🚚 Livraison
                  </Link>
                </div>
                <div className="col-md-3 mb-2">
                  <Link to="/refund-policy" className="btn btn-outline-primary w-100">
                    🔄 Retours
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Accordion */}
        <div className="row">
          <div className="col-12">
            <div className="faq-accordion">
              {faqData.map((faq, index) => (
                <div key={index} className="faq-item mb-3">
                  <div 
                    className="faq-question p-3" 
                    style={{
                      backgroundColor: activeIndex === index ? 'var(--color-232f3e)' : 'var(--color-f5f5f7)',
                      color: activeIndex === index ? 'white' : 'var(--color-131921)',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      border: '1px solid var(--color-ededed)',
                      transition: 'all 0.3s ease'
                    }}
                    onClick={() => toggleAccordion(index)}
                  >
                    <div className="d-flex justify-content-between align-items-center">
                      <h5 className="mb-0">{faq.question}</h5>
                      <span className="fs-4">
                        {activeIndex === index ? '−' : '+'}
                      </span>
                    </div>
                  </div>
                  {activeIndex === index && (
                    <div 
                      className="faq-answer p-3 mt-2" 
                      style={{
                        backgroundColor: 'white',
                        borderRadius: '8px',
                        border: '1px solid var(--color-ededed)',
                        borderTop: 'none'
                      }}
                    >
                      <p className="mb-0">{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Section contact */}
        <div className="row mt-5">
          <div className="col-12">
            <div className="contact-section text-center p-4" style={{
              backgroundColor: 'var(--color-131921)',
              color: 'white',
              borderRadius: '10px'
            }}>
              <h4 className="mb-3">💬 Vous ne trouvez pas votre réponse ?</h4>
              <p className="mb-3">Notre équipe de support est là pour vous aider !</p>
              <div className="row justify-content-center">
                <div className="col-md-4 mb-2">
                  <Link to="/contact" className="button w-100">
                    Contactez-nous
                  </Link>
                </div>
                <div className="col-md-4 mb-2">
                  <a href="tel:+243902901951" className="button w-100" style={{
                    backgroundColor: 'var(--color-febd69)',
                    color: 'var(--color-131921)'
                  }}>
                    📞 +243 902 901 951
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default FAQ;