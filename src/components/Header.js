import React, { useEffect, useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { BsSearch } from "react-icons/bs";

import wishlist from "../images/wishlist.svg";
import user from "../images/user.svg";
import cart from "../images/cart.svg";
import logo from "../images/logo-ritz-new.jpeg";

import { useDispatch, useSelector } from "react-redux";
import { Typeahead } from "react-bootstrap-typeahead";
import "react-bootstrap-typeahead/css/Typeahead.css";
import { getAProduct } from "../features/products/productSlice";
import { IoMdMenu } from "react-icons/io";

import "./Header.css";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartState = useSelector((state) => state.auth.cartProducts);
  const authState = useSelector((state) => state.auth);
  const productState = useSelector((state) => state.product.products);
  const [total, setTotal] = useState(null);
  const [productOpt, setProductOpt] = useState([]);
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    let sum = 0;
    if (cartState && cartState.length > 0) {
      for (let index = 0; index < cartState.length; index++) {
        sum = sum + Number(cartState[index].quantity) * cartState[index].price;
      }
    }
    setTotal(sum);
  }, [cartState]);

  useEffect(() => {
    let data = [];
    if (productState && productState.length > 0) {
      for (let index = 0; index < productState.length; index++) {
        const element = productState[index];
        data.push({ id: index, prod: element?._id, name: element?.title });
      }
    }
    setProductOpt(data);
  }, [productState]);

  const handleLogout = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <>
      {/* Unified Header - eBay Inspired */}
      <header className="header-unified">
        {/* Top Strip with Logo */}
        <div className="header-top-strip">
          <div className="container">
            <div className="d-flex justify-content-between align-items-center">
              <div className="d-flex align-items-center gap-4">
                {/* Logo */}
                <div className="header-logo">
                  <Link to="/" className="logo-link">
                    <img src={logo} alt="Ritz Global" className="logo-image" />
                  </Link>
                </div>
              </div>
              <span className="top-strip-text">
                Hotline:{" "}
                <a href="tel:+243902901951" className="top-strip-link">
                  +243 902 901 951
                </a>
              </span>
            </div>
          </div>
        </div>

        {/* Main Header Content */}
        <div className="header-main">
          <div className="container">
            <div className="header-content">
              {/* Compact Search Bar */}
              <div className="header-search-compact">
                <div className="search-wrapper-compact">
                  <Typeahead
                    id="product-search"
                    className="search-input-compact"
                    onChange={(selected) => {
                      navigate(`/product/${selected[0]?.prod}`);
                      dispatch(getAProduct(selected[0]?.prod));
                    }}
                    options={productOpt}
                    labelKey={"name"}
                    minLength={2}
                    placeholder="Rechercher..."
                  />
                  <button className="search-button-compact">
                    <BsSearch size={16} />
                  </button>
                </div>
              </div>

              {/* Navigation */}
              <nav className="header-nav d-none d-lg-flex">
                <NavLink to="/" className="nav-item">
                  Accueil
                </NavLink>
                <div className="nav-item dropdown">
                  <button className="nav-link" data-bs-toggle="dropdown">
                    Produits
                    <i className="fas fa-chevron-down ms-1"></i>
                  </button>
                  <ul className="dropdown-menu">
                    <li>
                      <Link className="dropdown-item" to="/product">
                        Tous les produits
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="dropdown-item"
                        to="/product?category=Ordinateurs"
                      >
                        Ordinateurs
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="dropdown-item"
                        to="/product?category=Téléphones"
                      >
                        Téléphones
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="dropdown-item"
                        to="/product?category=Accessoires"
                      >
                        Accessoires
                      </Link>
                    </li>
                  </ul>
                </div>
                <NavLink to="/promotions" className="nav-item">
                  Promotions
                </NavLink>
              </nav>

              {/* Actions */}
              <div className="header-actions">
                {/* Wishlist */}
                <Link to="/wishlist" className="action-item d-none d-md-flex">
                  <img src={wishlist} alt="wishlist" className="action-icon" />
                  <span className="action-text d-none d-lg-block">Favoris</span>
                </Link>

                {/* User Account */}
                <div className="action-item dropdown">
                  <button className="action-button" data-bs-toggle="dropdown">
                    <img src={user} alt="user" className="action-icon" />
                    <span className="action-text d-none d-lg-block">
                      {authState?.user
                        ? `Bonjour ${authState.user.firstname}`
                        : "Mon Compte"}
                    </span>
                    <i className="fas fa-chevron-down ms-1 d-none d-lg-block"></i>
                  </button>
                  <ul className="dropdown-menu">
                    {authState?.user === null ? (
                      <>
                        <li>
                          <Link className="dropdown-item" to="/login">
                            Connexion
                          </Link>
                        </li>
                        <li>
                          <Link className="dropdown-item" to="/signup">
                            Inscription
                          </Link>
                        </li>
                      </>
                    ) : (
                      <>
                        <li>
                          <Link className="dropdown-item" to="/my-profile">
                            Mon Profil
                          </Link>
                        </li>
                        <li>
                          <Link className="dropdown-item" to="/my-orders">
                            Mes Commandes
                          </Link>
                        </li>
                        <li>
                          <Link className="dropdown-item" to="/wishlist">
                            Ma Liste de Souhaits
                          </Link>
                        </li>
                        <li>
                          <hr className="dropdown-divider" />
                        </li>
                        <li>
                          <button
                            onClick={handleLogout}
                            className="dropdown-item w-full text-left"
                          >
                            Déconnexion
                          </button>
                        </li>
                      </>
                    )}
                  </ul>
                </div>

                {/* Cart */}
                <Link to="/cart" className="action-item cart-item">
                  <div className="cart-icon-wrapper">
                    <img src={cart} alt="cart" className="action-icon" />
                    {cartState && cartState.length > 0 && (
                      <span className="cart-badge">{cartState.length}</span>
                    )}
                  </div>
                  <div className="cart-info d-none d-lg-block">
                    <span className="cart-text">Panier</span>
                    <span className="cart-total">
                      €{total ? total.toFixed(2) : "0.00"}
                    </span>
                  </div>
                </Link>

                {/* Mobile Menu Toggle */}
                <button
                  className="mobile-menu-toggle d-lg-none"
                  onClick={toggleMenu}
                  aria-label="Toggle menu"
                >
                  <IoMdMenu size={24} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="mobile-search d-md-none">
          <div className="container">
            <div className="search-wrapper">
              <Typeahead
                id="mobile-product-search"
                className="search-input"
                onChange={(selected) => {
                  navigate(`/product/${selected[0]?.prod}`);
                  dispatch(getAProduct(selected[0]?.prod));
                }}
                options={productOpt}
                labelKey={"name"}
                minLength={2}
                placeholder="Rechercher des produits..."
              />
              <button className="search-button">
                <BsSearch size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {showMenu && (
          <div className="mobile-menu">
            <div className="mobile-menu-content">
              <nav>
                <NavLink
                  to="/"
                  className="mobile-nav-link"
                  onClick={toggleMenu}
                >
                  Accueil
                </NavLink>
                <NavLink
                  to="/product"
                  className="mobile-nav-link"
                  onClick={toggleMenu}
                >
                  Produits
                </NavLink>
                <NavLink
                  to="/promotions"
                  className="mobile-nav-link"
                  onClick={toggleMenu}
                >
                  Promotions
                </NavLink>
                <NavLink
                  to="/wishlist"
                  className="mobile-nav-link"
                  onClick={toggleMenu}
                >
                  Favoris
                </NavLink>
                <NavLink
                  to="/contact"
                  className="mobile-nav-link"
                  onClick={toggleMenu}
                >
                  Contact
                </NavLink>
              </nav>
            </div>
          </div>
        )}
      </header>
    </>
  );
};

export default Header;
