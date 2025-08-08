import React from "react";
import ReactStars from "react-rating-stars-component";
import { Link, useLocation, useNavigate } from "react-router-dom";
import prodcompare from "../images/prodcompare.svg";
import wish from "../images/wish.svg";
import wishlist from "../images/wishlist.svg";
import watch from "../images/watch.jpg";
import watch2 from "../images/watch-1.avif";
import addcart from "../images/add-cart.svg";
import view from "../images/view.svg";
import { useDispatch, useSelector } from "react-redux";
import { addToWishlist } from "../features/products/productSlice";

const ProductCard = (props) => {
  const { grid, data } = props;
  let location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const addToWish = (id) => {
    dispatch(addToWishlist(id));
  };

  return (
    <>
      {data?.map((item, index) => {
        return (
          <div
            key={index}
            className={`${
              location.pathname === "/product" ? `gr-${grid}` : "col-lg-3 col-md-4 col-sm-6 col-12"
            } mb-4`}
          >
            <div className="product-card-modern group cursor-pointer">
              {/* Product Image */}
              <div className="product-card-image" onClick={() => navigate("/product/" + item?._id)}>
                <img
                  src={
                    item?.images && item.images[0]?.url
                      ? item.images[0].url
                      : "/images/default.jpg"
                  }
                  alt={item?.title || "Product"}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                
                {/* Product Badge */}
                {item?.tags && item.tags.includes('featured') && (
                  <div className="product-badge featured">
                    Vedette
                  </div>
                )}
                {item?.tags && item.tags.includes('sale') && (
                  <div className="product-badge sale">
                    Promo
                  </div>
                )}
                
                {/* Product Actions */}
                <div className="product-actions">
                  <button 
                    className="product-action-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      addToWish(item?._id);
                    }}
                    title="Ajouter aux favoris"
                  >
                    <img src={wish} alt="wishlist" className="w-4 h-4" />
                  </button>
                  <Link 
                    to={"/product/" + item?._id}
                    className="product-action-btn"
                    title="Voir le produit"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <img src={view} alt="view" className="w-4 h-4" />
                  </Link>
                  <button 
                    className="product-action-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      // Add to compare functionality
                    }}
                    title="Comparer"
                  >
                    <img src={prodcompare} alt="compare" className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              {/* Product Content */}
              <div className="product-card-content" onClick={() => navigate("/product/" + item?._id)}>
                {/* Brand */}
                <div className="product-brand">
                  {item?.brand}
                </div>
                
                {/* Title */}
                <h3 className="product-title">
                  {item?.title}
                </h3>
                
                {/* Rating */}
                <div className="product-rating">
                  <div className="product-stars">
                    <ReactStars
                      count={5}
                      size={16}
                      value={parseFloat(item?.totalrating) || 0}
                      edit={false}
                      activeColor="#FFA726"
                      color="#E0E0E0"
                    />
                  </div>
                  <span className="product-rating-text">
                    ({item?.totalrating || 0})
                  </span>
                </div>
                
                {/* Description - Only show in list view */}
                {grid === 12 && (
                  <div 
                    className="text-sm text-gray-600 mb-3 line-clamp-3"
                    dangerouslySetInnerHTML={{ __html: item?.description }}
                  />
                )}
                
                {/* Price */}
                <div className="product-price">
                  <span className="product-price-current">
                    €{item?.price}
                  </span>
                  {item?.originalPrice && item.originalPrice > item.price && (
                    <>
                      <span className="product-price-original">
                        €{item.originalPrice}
                      </span>
                      <span className="product-discount">
                        -{Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)}%
                      </span>
                    </>
                  )}
                </div>
              </div>
              
              {/* Add to Cart Footer */}
              <div className="product-card-footer">
                <button 
                  className="add-to-cart-btn btn-modern btn-primary w-full"
                  onClick={(e) => {
                    e.stopPropagation();
                    // Add to cart functionality
                  }}
                >
                  <img src={addcart} alt="" className="w-4 h-4 mr-2" />
                  Ajouter au panier
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default ProductCard;
