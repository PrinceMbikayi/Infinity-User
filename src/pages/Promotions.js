import React, { useEffect, useState } from "react";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import ProductCard from "../components/ProductCard";
import Container from "../components/Container";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../features/products/productSlice";

const Promotions = () => {
  const dispatch = useDispatch();
  const productState = useSelector((state) => state?.product?.product);
  const [promotionalProducts, setPromotionalProducts] = useState([]);

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  useEffect(() => {
    // Filtrer les produits en promotion (par exemple, ceux avec un prix réduit)
    if (productState && productState.length > 0) {
      const promoProducts = productState.filter(product => {
        // Logique pour identifier les produits en promotion
        // Ici on peut filtrer par tags, prix spéciaux, etc.
        return product.tags && product.tags.includes("promotion") || 
               product.tags && product.tags.includes("sale") ||
               product.tags && product.tags.includes("discount");
      });
      setPromotionalProducts(promoProducts);
    }
  }, [productState]);

  return (
    <>
      <Meta title={"Promotions et Offres Spéciales"} />
      <BreadCrumb title="Promotions" />
      <Container class1="store-wrapper home-wrapper-2 py-5">
        <div className="row">
          <div className="col-12">
            <div className="section-heading mb-4">
              <h2>🔥 Promotions et Offres Spéciales</h2>
              <p className="mb-0">Découvrez nos meilleures offres et économisez sur vos produits préférés !</p>
            </div>
          </div>
        </div>
        
        {/* Bannière promotionnelle */}
        <div className="row mb-5">
          <div className="col-12">
            <div className="promo-banner p-4 text-center" style={{
              background: 'linear-gradient(135deg, var(--color-febd69), var(--color-bf4800))',
              borderRadius: '10px',
              color: 'white'
            }}>
              <h3 className="mb-2">🎉 OFFRES LIMITÉES</h3>
              <p className="mb-0 fs-5">Jusqu'à -50% sur une sélection de produits</p>
            </div>
          </div>
        </div>

        {/* Produits en promotion */}
        <div className="row">
          <div className="col-12">
            <div className="row">
              {promotionalProducts && promotionalProducts.length > 0 ? (
                promotionalProducts.map((item, index) => (
                  <div key={index} className="col-3">
                    <ProductCard
                      id={item?._id}
                      title={item?.title}
                      description={item?.description}
                      price={item?.price}
                      brand={item?.brand}
                      totalrating={item?.totalrating.toString()}
                      sold={item?.sold}
                      quantity={item?.quantity}
                      images={item?.images}
                    />
                  </div>
                ))
              ) : (
                <div className="col-12 text-center py-5">
                  <div className="no-promotions p-5">
                    <h4>🎯 Aucune promotion en cours</h4>
                    <p className="text-muted">Revenez bientôt pour découvrir nos nouvelles offres !</p>
                    <p className="mt-3">
                      <a href="/product" className="button">Voir tous les produits</a>
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Section offres spéciales */}
        <div className="row mt-5">
          <div className="col-12">
            <div className="special-offers">
              <h3 className="section-heading">Offres Spéciales</h3>
              <div className="row">
                <div className="col-md-4 mb-3">
                  <div className="offer-card p-4 text-center" style={{
                    backgroundColor: 'var(--color-f5f5f7)',
                    borderRadius: '8px',
                    border: '1px solid var(--color-ededed)'
                  }}>
                    <h5>🚚 Livraison Gratuite</h5>
                    <p className="mb-0">Sur toutes les commandes de plus de 100$</p>
                  </div>
                </div>
                <div className="col-md-4 mb-3">
                  <div className="offer-card p-4 text-center" style={{
                    backgroundColor: 'var(--color-f5f5f7)',
                    borderRadius: '8px',
                    border: '1px solid var(--color-ededed)'
                  }}>
                    <h5>🔄 Retours Gratuits</h5>
                    <p className="mb-0">30 jours pour changer d'avis</p>
                  </div>
                </div>
                <div className="col-md-4 mb-3">
                  <div className="offer-card p-4 text-center" style={{
                    backgroundColor: 'var(--color-f5f5f7)',
                    borderRadius: '8px',
                    border: '1px solid var(--color-ededed)'
                  }}>
                    <h5>🎁 Programme Fidélité</h5>
                    <p className="mb-0">Gagnez des points à chaque achat</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Promotions;