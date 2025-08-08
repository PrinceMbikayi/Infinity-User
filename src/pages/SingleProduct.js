import React, { useEffect, useState } from "react";
import ReactStars from "react-rating-stars-component";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import ProductCard from "../components/ProductCard";
import ReactImageZoom from "react-image-zoom";
import Color from "../components/Color";
import { TbGitCompare } from "react-icons/tb";
import { AiOutlineHeart } from "react-icons/ai";
import { Link, useLocation, useNavigate } from "react-router-dom";
import watch from "../images/watch.jpg";
import Container from "../components/Container";
import { useDispatch, useSelector } from "react-redux";
import {
  addRating,
  getAProduct,
  getAllProducts,
} from "../features/products/productSlice";
import { toast } from "react-toastify";
import { addProdToCart, getUserCart } from "../features/user/userSlice";
import { base_url, config } from "../utils/axiosConfig";
import { loadStripe } from '@stripe/stripe-js';
import axios from "axios";
import "./SingleProduct.css";

const SingleProduct = () => {
  const stripePromise = loadStripe('pk_test_51PLbOjRx1MID7VUPEYdxUvLTSBWMjTjoIfG8pEU6FP93a2Os19t7DAAtYcp3E0KKLYspyqhZUzNdwYQeHoOtojwO00e56rZMMj');
  
  const [color, setColor] = useState(null);
  const [selectedColorData, setSelectedColorData] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [alreadyAdded, setAlreadyAdded] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const location = useLocation();
  const navigate = useNavigate();
  const getProductId = location.pathname.split("/")[2];
  const dispatch = useDispatch();
  const productState = useSelector((state) => state?.product?.singleproduct);
  const productsState = useSelector((state) => state?.product?.product);
  const cartState = useSelector((state) => state?.auth?.cartProducts);
  const [selectedSize, setSelectedSize] = useState("");

  useEffect(() => {
    dispatch(getAProduct(getProductId));
    dispatch(getUserCart());
    dispatch(getAllProducts());
  }, []);
  useEffect(() => {
    for (let index = 0; index < cartState?.length; index++) {
      if (getProductId === cartState[index]?.productId?._id) {
        setAlreadyAdded(true);
      }
    }
  }, []);

  // Fonction pour gérer le changement de couleur
  const handleColorChange = (colorId) => {
    setColor(colorId);
    // Trouver les données de la couleur sélectionnée
    const colorData = productState?.color?.find(c => c._id === colorId);
    setSelectedColorData(colorData);
    
    // Simuler le changement d'image basé sur la couleur
    // En réalité, vous devriez avoir des images spécifiques pour chaque couleur
    if (productState?.images && productState.images.length > 1) {
      const colorIndex = productState.color?.findIndex(c => c._id === colorId);
      if (colorIndex !== -1 && colorIndex < productState.images.length) {
        setCurrentImageIndex(colorIndex);
      }
    }
  };

  // Fonction pour gérer le changement de taille
  const handleSizeChange = (size) => {
    setSelectedSize(size);
    // Ici vous pouvez ajouter la logique pour changer le produit selon la taille
    // si vous avez des produits différents pour chaque taille
  };

  const uploadCart = () => {
    if (color === null) {
      toast.error("Please Choose Color");
      return false;
    }
    if (!selectedSize) {
      toast.error("Please Choose Size");
      return false;
    } else {
      dispatch(
        addProdToCart({
          productId: productState?._id,
          quantity,
          color,
          price: productState?.price,
          image: productState?.images[0]?.url,
          diskSize: selectedSize,
        })
      );
      navigate("/cart");
    }
  };

  const handleBuyNow = async () => {
    // Vérifier que la couleur et la taille sont sélectionnées
    if (color === null) {
      toast.error("Please Choose Color");
      return false;
    }
    if (!selectedSize) {
      toast.error("Please Choose Size");
      return false;
    }

    // Préparer les données du produit pour le paiement direct
    const cartItems = [{
      productId: productState?._id,
      quantity: parseInt(quantity),
    }];

    try {
      // Créer une session de checkout en appelant le backend
      const response = await axios.post(
        `${base_url}payments/create-checkout-session`,
        { products: cartItems },
        config
      );
    
      const { sessionId } = response.data;

      // Rediriger vers Stripe Checkout
      const stripe = await stripePromise;
      const { error } = await stripe.redirectToCheckout({
        sessionId,
      });

      if (error) {
        console.error('Stripe Checkout Error:', error);
        toast.error('Unable to redirect to Stripe Checkout.');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Payment initiation failed. Please try again.');
    }
  };
  const props = {
    width: 594,
    height: 600,
    zoomWidth: 600,

    img: productState?.images[currentImageIndex]?.url
      ? productState?.images[currentImageIndex]?.url
      : productState?.images[0]?.url
      ? productState?.images[0]?.url
      : "https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?cs=srgb&dl=pexels-fernando-arcos-190819.jpg&fm=jpg",
  };

  const [orderedProduct, setorderedProduct] = useState(true);
  const copyToClipboard = (text) => {
    console.log("text", text);
    var textField = document.createElement("textarea");
    textField.innerText = text;
    document.body.appendChild(textField);
    textField.select();
    document.execCommand("copy");
    textField.remove();
  };
  const closeModal = () => {};
  const [popularProduct, setPopularProduct] = useState([]);
  useEffect(() => {
    let data = [];
    for (let index = 0; index < productsState.length; index++) {
      const element = productsState[index];
      if (element.tags === "popular") {
        data.push(element);
      }
      setPopularProduct(data);
    }
  }, [productState]);
  console.log(popularProduct);

  const [star, setStar] = useState(null);
  const [comment, setComment] = useState(null);
  const addRatingToProduct = () => {
    if (star === null) {
      toast.error("Please add star rating");
      return false;
    } else if (comment === null) {
      toast.error("Please Write Review About the Product.");
      return false;
    } else {
      dispatch(
        addRating({ star: star, comment: comment, prodId: getProductId })
      );
      setTimeout(() => {
        dispatch(getAProduct(getProductId));
      }, 100);
    }
    return false;
  };

  return (
    <>
      <Meta title={"Product Name"} />
      <BreadCrumb title={productState?.title} />
      <div className="amazon-product-wrapper">
        <Container class1="amazon-product-container">
          <div className="row">
            <div className="col-12 col-lg-6 amazon-image-section">
              <div className="amazon-main-image">
                <ReactImageZoom {...props} />
              </div>
              <div className="amazon-thumbnail-gallery">
                {productState?.images.map((item, index) => {
                  return (
                    <div 
                      key={index} 
                      className={`amazon-thumbnail ${currentImageIndex === index ? 'active' : ''}`}
                      onClick={() => setCurrentImageIndex(index)}
                    >
                      <img src={item?.url} className="img-fluid" alt="" />
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="col-12 col-lg-6 amazon-info-section">
              <div className="amazon-product-details">
                <h1 className="amazon-product-title">{productState?.title}</h1>
                
                <div className="amazon-rating-section">
                  <ReactStars
                    count={5}
                    size={20}
                    value={Number(productState?.totalratings) || 0}
                    edit={false}
                    activeColor="#ffd700"
                  />
                  <a className="amazon-rating-text" href="#review">
                    ( 2 Reviews )
                  </a>
                </div>
                
                <div className="amazon-price-section">
                  <span className="amazon-price-currency">$</span>
                  <span className="amazon-price">{productState?.price}</span>
                </div>
              <div className="amazon-details-section">
                  <div className="amazon-detail-row">
                    <span className="amazon-detail-label">Type:</span>
                    <span className="amazon-detail-value">Watch</span>
                  </div>
                  <div className="amazon-detail-row">
                    <span className="amazon-detail-label">Brand:</span>
                    <span className="amazon-detail-value">{productState?.brand}</span>
                  </div>
                  <div className="amazon-detail-row">
                    <span className="amazon-detail-label">Category:</span>
                    <span className="amazon-detail-value">{productState?.category}</span>
                  </div>
                  <div className="amazon-detail-row">
                    <span className="amazon-detail-label">Tags:</span>
                    <span className="amazon-detail-value">{productState?.tags}</span>
                  </div>
                  <div className="amazon-detail-row">
                    <span className="amazon-detail-label">Availability:</span>
                    <span className="amazon-detail-value">In Stock</span>
                  </div>
                </div>
                <div className="amazon-selection-section">
                  <h3 className="amazon-selection-title">Taille:</h3>
                  <div className="amazon-size-options">
                    {productState?.diskSizes.map((item, index) => (
                      <span
                        onClick={() => handleSizeChange(item.size)}
                        key={index}
                        className={`amazon-size-option ${
                          selectedSize === item.size ? "selected" : ""
                        }`}
                      >
                        {item.size}
                      </span>
                    ))}
                  </div>
                </div>
                {alreadyAdded === false && (
                  <div className="amazon-selection-section amazon-color-section">
                    <h3 className="amazon-selection-title">Couleur:</h3>
                    {selectedColorData && (
                      <div className="amazon-selected-color-info">
                        <span className="amazon-color-name">Couleur sélectionnée: {selectedColorData.title}</span>
                      </div>
                    )}
                    <Color
                      setColor={handleColorChange}
                      color={color}
                      colorData={productState?.color}
                    />
                  </div>
                )}
                {alreadyAdded === false && (
                  <div className="amazon-quantity-section">
                    <span className="amazon-quantity-label">Quantity:</span>
                    <input
                      type="number"
                      min={1}
                      max={10}
                      className="amazon-quantity-input"
                      onChange={(e) => setQuantity(e.target.value)}
                      value={quantity}
                    />
                  </div>
                )}
                
                <div className="amazon-actions-section">
                  <button
                    className="amazon-add-to-cart"
                    type="button"
                    onClick={() => {
                      alreadyAdded ? navigate("/cart") : uploadCart();
                    }}
                  >
                    {alreadyAdded ? "Go To Cart" : "Add to Cart"}
                  </button>
                  {!alreadyAdded && (
                    <button 
                      className="amazon-buy-now" 
                      type="button"
                      onClick={handleBuyNow}
                    >
                      Buy Now
                    </button>
                  )}
                </div>
                <div className="amazon-secondary-actions">
                  <a href="" className="amazon-secondary-action">
                    <TbGitCompare className="fs-5" /> Add to Compare
                  </a>
                  <a href="" className="amazon-secondary-action">
                    <AiOutlineHeart className="fs-5" /> Add to Wishlist
                  </a>
                </div>
                <div className="amazon-delivery-section">
                  <h3 className="amazon-delivery-title">Shipping & Returns</h3>
                  <p className="amazon-delivery-info">
                    <span className="amazon-delivery-highlight">Free shipping and returns</span> available on all orders!<br />
                    We ship all US domestic orders within <span className="amazon-delivery-highlight">5-10 business days!</span>
                  </p>
                </div>
                
                <div className="amazon-product-link">
                  <div className="amazon-link-label">Product Link:</div>
                  <button
                    type="button"
                    className="amazon-copy-link"
                    onClick={() => {
                      copyToClipboard(window.location.href);
                    }}
                  >
                    Copy Product Link
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>
      <Container class1="description-wrapper py-3 py-md-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <h4>Description</h4>
            <div className="bg-white p-3">
              <p
                dangerouslySetInnerHTML={{
                  __html: productState?.description,
                }}
              ></p>
            </div>
          </div>
        </div>
      </Container>
      <Container class1="reviews-wrapper home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <h3 id="review">Reviews</h3>
            <div className="review-inner-wrapper">
              <div className="review-head d-flex justify-content-between align-items-end">
                <div>
                  <h4 className="mb-2">Customer Reviews</h4>
                  <div className="d-flex align-items-center gap-10">
                    <ReactStars
                      count={5}
                      size={24}
                      value={4}
                      edit={false}
                      activeColor="#ffd700"
                    />
                    <p className="mb-0">Based on 2 Reviews</p>
                  </div>
                </div>
                {orderedProduct && (
                  <div>
                    <a className="text-dark text-decoration-underline" href="">
                      Write a Review
                    </a>
                  </div>
                )}
              </div>
              <div className="review-form py-4">
                <h4>Write a Review</h4>
                <div>
                  <ReactStars
                    count={5}
                    size={24}
                    value={4}
                    edit={true}
                    activeColor="#ffd700"
                    onChange={(e) => {
                      setStar(e);
                    }}
                  />
                </div>
                <div>
                  <textarea
                    name=""
                    id=""
                    className="w-100 form-control"
                    cols="30"
                    rows="4"
                    placeholder="Comments"
                    onChange={(e) => {
                      setComment(e.target.value);
                    }}
                  ></textarea>
                </div>
                <div className="d-flex justify-content-end mt-3">
                  <button
                    onClick={addRatingToProduct}
                    className="button border-0"
                    type="button"
                  >
                    Submit Review
                  </button>
                </div>
              </div>
              <div className="reviews mt-4">
                {productState &&
                  productState.ratings?.map((item, index) => {
                    return (
                      <div key={index} className="review">
                        <div className="d-flex gap-10 align-items-center">
                          <ReactStars
                            count={5}
                            size={24}
                            value={Number(item?.star) || 0}
                            edit={false}
                            activeColor="#ffd700"
                          />
                        </div>
                        <p className="mt-3">{item?.comment}</p>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      </Container>
      <Container class1="popular-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <h3 className="section-heading">Our Popular Products</h3>
          </div>
        </div>
        <div className="row">
          <ProductCard data={popularProduct} />
        </div>
      </Container>
    </>
  );
};

export default SingleProduct;
