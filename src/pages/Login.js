import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../features/user/userSlice";
import "./Login.css";

const loginSchema = yup.object({
  email: yup
    .string()
    .email("Adresse email invalide")
    .required("L'adresse email est requise"),
  password: yup.string().required("Le mot de passe est requis"),
});

const Login = () => {
  const authState = useSelector(state => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: (values) => {
      dispatch(loginUser(values));
      navigate('/');
    },
  });

  return (
    <div className="ebay-login-container">
      <div className="ebay-login-wrapper">


        {/* Main Content */}
        <div className="ebay-login-content">
          <div className="ebay-login-card">
            <h1 className="ebay-login-title">Bonjour</h1>
            <p className="ebay-login-subtitle">
              Connectez-vous à votre compte ou{" "}
              <Link to="/signup" className="ebay-signup-link">
                créez-en un
              </Link>
            </p>

            <form onSubmit={formik.handleSubmit} className="ebay-login-form">
              <div className="ebay-form-group">
                <label htmlFor="email" className="ebay-form-label">
                  Adresse email ou nom d'utilisateur
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className={`ebay-form-input ${
                    formik.touched.email && formik.errors.email ? 'error' : ''
                  }`}
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="Saisissez votre adresse email"
                />
                {formik.touched.email && formik.errors.email && (
                  <div className="ebay-error-message">{formik.errors.email}</div>
                )}
              </div>

              <div className="ebay-form-group">
                <label htmlFor="password" className="ebay-form-label">
                  Mot de passe
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  className={`ebay-form-input ${
                    formik.touched.password && formik.errors.password ? 'error' : ''
                  }`}
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="Saisissez votre mot de passe"
                />
                {formik.touched.password && formik.errors.password && (
                  <div className="ebay-error-message">{formik.errors.password}</div>
                )}
              </div>

              <div className="ebay-form-options">
                <label className="ebay-checkbox-container">
                  <input type="checkbox" className="ebay-checkbox" />
                  <span className="ebay-checkbox-text">Rester connecté</span>
                </label>
              </div>

              <button type="submit" className="ebay-login-button">
                Se connecter
              </button>
            </form>

            <div className="ebay-login-footer">
              <Link to="/forgot-password" className="ebay-forgot-link">
                Mot de passe oublié ?
              </Link>
            </div>
          </div>

          {/* Side Benefits */}
          <div className="ebay-benefits-section">
            <h3 className="ebay-benefits-title">Pourquoi créer un compte ?</h3>
            <ul className="ebay-benefits-list">
              <li className="ebay-benefit-item">
                <span className="ebay-benefit-icon">✓</span>
                Accès à vos commandes et historique
              </li>
              <li className="ebay-benefit-item">
                <span className="ebay-benefit-icon">✓</span>
                Suivi de vos articles favoris
              </li>
              <li className="ebay-benefit-item">
                <span className="ebay-benefit-icon">✓</span>
                Processus de commande plus rapide
              </li>
              <li className="ebay-benefit-item">
                <span className="ebay-benefit-icon">✓</span>
                Offres personnalisées
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
