import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../features/user/userSlice";
import "./Signup.css";

const signUpSchema = yup.object({
  firstname: yup.string().required("Le prénom est requis"),
  lastname: yup.string().required("Le nom est requis"),
  email: yup
    .string()
    .email("Adresse email invalide")
    .required("L'adresse email est requise"),
  mobile: yup.string().required("Le numéro de téléphone est requis"),
  password: yup
    .string()
    .min(8, "Le mot de passe doit contenir au moins 8 caractères")
    .required("Le mot de passe est requis"),
});

const Signup = () => {
  const authState = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const formik = useFormik({
    initialValues: {
      firstname: "",
      lastname: "",
      email: "",
      mobile: "",
      password: "",
    },
    validationSchema: signUpSchema,
    onSubmit: (values) => {
      dispatch(registerUser(values));
      navigate("/login");
    },
  });

  return (
    <div className="ebay-signup-container">
      <div className="ebay-signup-wrapper">


        {/* Main Content */}
        <div className="ebay-signup-content">
          <div className="ebay-signup-card">
            <h1 className="ebay-signup-title">Créer un compte personnel</h1>
            <p className="ebay-signup-subtitle">
              Vous avez déjà un compte ?{" "}
              <Link to="/login" className="ebay-login-link">
                Se connecter
              </Link>
            </p>

            <form onSubmit={formik.handleSubmit} className="ebay-signup-form">
              <div className="ebay-form-row">
                <div className="ebay-form-group">
                  <label htmlFor="firstname" className="ebay-form-label">
                    Prénom
                  </label>
                  <input
                    type="text"
                    id="firstname"
                    name="firstname"
                    className={`ebay-form-input ${
                      formik.touched.firstname && formik.errors.firstname ? 'error' : ''
                    }`}
                    value={formik.values.firstname}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="Prénom"
                  />
                  {formik.touched.firstname && formik.errors.firstname && (
                    <div className="ebay-error-message">{formik.errors.firstname}</div>
                  )}
                </div>

                <div className="ebay-form-group">
                  <label htmlFor="lastname" className="ebay-form-label">
                    Nom
                  </label>
                  <input
                    type="text"
                    id="lastname"
                    name="lastname"
                    className={`ebay-form-input ${
                      formik.touched.lastname && formik.errors.lastname ? 'error' : ''
                    }`}
                    value={formik.values.lastname}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="Nom"
                  />
                  {formik.touched.lastname && formik.errors.lastname && (
                    <div className="ebay-error-message">{formik.errors.lastname}</div>
                  )}
                </div>
              </div>

              <div className="ebay-form-group">
                <label htmlFor="email" className="ebay-form-label">
                  Adresse email
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
                <label htmlFor="mobile" className="ebay-form-label">
                  Numéro de téléphone mobile
                </label>
                <input
                  type="tel"
                  id="mobile"
                  name="mobile"
                  className={`ebay-form-input ${
                    formik.touched.mobile && formik.errors.mobile ? 'error' : ''
                  }`}
                  value={formik.values.mobile}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="Numéro de téléphone"
                />
                {formik.touched.mobile && formik.errors.mobile && (
                  <div className="ebay-error-message">{formik.errors.mobile}</div>
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
                  placeholder="Créer un mot de passe"
                />
                {formik.touched.password && formik.errors.password && (
                  <div className="ebay-error-message">{formik.errors.password}</div>
                )}
                <div className="ebay-password-hint">
                  Au moins 8 caractères
                </div>
              </div>

              <div className="ebay-terms-section">
                <p className="ebay-terms-text">
                  En créant un compte, vous acceptez nos{" "}
                  <Link to="/terms" className="ebay-terms-link">
                    Conditions d'utilisation
                  </Link>{" "}
                  et notre{" "}
                  <Link to="/privacy" className="ebay-terms-link">
                    Politique de confidentialité
                  </Link>
                  .
                </p>
              </div>

              <button type="submit" className="ebay-signup-button">
                Créer un compte personnel
              </button>
            </form>
          </div>

          {/* Side Benefits */}
          <div className="ebay-benefits-section">
            <h3 className="ebay-benefits-title">Avantages d'un compte RITZGLOBAL</h3>
            <ul className="ebay-benefits-list">
              <li className="ebay-benefit-item">
                <span className="ebay-benefit-icon">🛒</span>
                <div>
                  <strong>Achat simplifié</strong>
                  <p>Processus de commande plus rapide avec vos informations sauvegardées</p>
                </div>
              </li>
              <li className="ebay-benefit-item">
                <span className="ebay-benefit-icon">❤️</span>
                <div>
                  <strong>Liste de souhaits</strong>
                  <p>Sauvegardez vos articles préférés pour plus tard</p>
                </div>
              </li>
              <li className="ebay-benefit-item">
                <span className="ebay-benefit-icon">📦</span>
                <div>
                  <strong>Suivi des commandes</strong>
                  <p>Suivez vos commandes et consultez votre historique d'achats</p>
                </div>
              </li>
              <li className="ebay-benefit-item">
                <span className="ebay-benefit-icon">🎯</span>
                <div>
                  <strong>Offres personnalisées</strong>
                  <p>Recevez des recommandations basées sur vos préférences</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
