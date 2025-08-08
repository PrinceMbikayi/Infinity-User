import React, { useState, useEffect } from 'react'
import BreadCrumb from '../components/BreadCrumb'
import Container from '../components/Container'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { useDispatch, useSelector } from 'react-redux'
import { updateProfile, uploadProfileImage } from '../features/user/userSlice'
import { FiEdit, FiUser, FiMail, FiPhone, FiCamera, FiSave, FiX } from "react-icons/fi"
import { toast } from 'react-toastify'

const profileSchema = yup.object({
    firstname: yup
        .string()
        .min(2, "First name must be at least 2 characters")
        .required("First Name is Required"),
    lastname: yup
        .string()
        .min(2, "Last name must be at least 2 characters")
        .required("Last Name is Required"),
    email: yup
        .string()
        .email("Email Should be valid")
        .required("Email Address is Required"),
    mobile: yup
        .string()
        .matches(/^[0-9]{10}$/, "Please enter a valid 10-digit phone number")
        .required("Mobile No is Required"),
});

const Profile = () => {
    const dispatch = useDispatch()
    const userState = useSelector(state => state.auth.user)
    const { isLoading, isError, isSuccess, message } = useSelector(state => state?.auth)
    const [edit,setEdit]=useState(true)
    const [profileImage, setProfileImage] = useState(null)
    const [imagePreview, setImagePreview] = useState(null)
    const [isUploading, setIsUploading] = useState(false)

    useEffect(() => {
        if (isSuccess && message) {
            toast.success("Profile updated successfully!");
            setEdit(true);
        }
        if (isError && message) {
            toast.error(message);
        }
    }, [isSuccess, isError, message]);

    // Réinitialiser l'aperçu d'image quand l'utilisateur change
    useEffect(() => {
        setImagePreview(null);
        setIsUploading(false);
    }, [userState?.profileImage]);

    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            // Validation du fichier
            const maxSize = 5 * 1024 * 1024; // 5MB
            const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
            
            if (file.size > maxSize) {
                toast.error('La taille du fichier ne doit pas dépasser 5MB');
                return;
            }
            
            if (!allowedTypes.includes(file.type)) {
                toast.error('Format non supporté. Utilisez JPG, PNG ou WebP');
                return;
            }
            
            setProfileImage(file);
            setIsUploading(true);
            
            // Affichage immédiat de l'aperçu
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
            
            try {
                // Upload image avec gestion d'erreur
                await dispatch(uploadProfileImage(file)).unwrap();
                toast.success('Photo de profil mise à jour avec succès!');
            } catch (error) {
                toast.error('Erreur lors de l\'upload de la photo');
                // Réinitialiser l'aperçu en cas d'erreur
                setImagePreview(null);
            } finally {
                setIsUploading(false);
            }
        }
    };

    const formik = useFormik({
        enableReinitialize:true,
        initialValues: {
            firstname: userState?.firstname,
          lastname: userState?.lastname,
          email: userState?.email,
          mobile: userState?.mobile,
        },
        validationSchema: profileSchema,
        onSubmit: (values) => {
            dispatch(updateProfile(values))
            setEdit(true)
    
             
        
        },
      });
  return (
    <>
        <BreadCrumb title="Mon Profil" />
        <Container class1="profile-wrapper home-wrapper-2 py-5">
            <div className="row justify-content-center">
                <div className="col-lg-8 col-md-10">
                    <div className="profile-card bg-white rounded shadow-sm p-4">
                        {/* Header Section */}
                        <div className="profile-header d-flex justify-content-between align-items-center mb-4">
                            <h2 className="profile-title mb-0">
                                <FiUser className="me-2" />
                                Mon Profil
                            </h2>
                            <button
                                type="button"
                                className={`btn ${edit ? 'btn-primary' : 'btn-secondary'} d-flex align-items-center`}
                                onClick={() => setEdit(!edit)}
                            >
                                {edit ? (
                                    <>
                                        <FiEdit className="me-2" />
                                        Modifier le profil
                                    </>
                                ) : (
                                    <>
                                        <FiX className="me-2" />
                                        Annuler
                                    </>
                                )}
                            </button>
                        </div>

                        {/* Profile Image Section */}
                        <div className="profile-image-section text-center mb-4">
                            <div className="profile-image-container position-relative d-inline-block">
                                <div className="profile-image-wrapper position-relative">
                                    <img
                                        src={imagePreview || userState?.profileImage || "/images/user-avatar.svg"}
                                        alt="Profile"
                                        className="profile-image rounded-circle"
                                        style={{
                                            width: "120px",
                                            height: "120px",
                                            objectFit: "cover",
                                            border: "4px solid #f8f9fa",
                                            boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                                            opacity: isUploading ? 0.7 : 1,
                                            transition: "opacity 0.3s ease"
                                        }}
                                    />
                                    {isUploading && (
                                        <div 
                                            className="position-absolute top-50 start-50 translate-middle"
                                            style={{
                                                backgroundColor: "rgba(0,0,0,0.7)",
                                                borderRadius: "50%",
                                                width: "120px",
                                                height: "120px",
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                color: "white"
                                            }}
                                        >
                                            <div className="spinner-border spinner-border-sm" role="status">
                                                <span className="visually-hidden">Chargement...</span>
                                            </div>
                                        </div>
                                    )}
                                </div>
                                {!edit && (
                                    <>
                                        <input
                                            type="file"
                                            id="profileImageInput"
                                            accept="image/*"
                                            onChange={handleImageChange}
                                            style={{ display: "none" }}
                                        />
                                        <label
                                            htmlFor="profileImageInput"
                                            className="profile-image-edit-btn position-absolute"
                                            style={{
                                                bottom: "5px",
                                                right: "5px",
                                                backgroundColor: "#007bff",
                                                color: "white",
                                                borderRadius: "50%",
                                                width: "35px",
                                                height: "35px",
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                cursor: "pointer",
                                                border: "2px solid white",
                                                boxShadow: "0 2px 4px rgba(0,0,0,0.2)"
                                            }}
                                        >
                                            <FiCamera size={16} />
                                        </label>
                                    </>
                                )}
                            </div>
                            <h4 className="mt-3 mb-1">
                                {userState?.firstname} {userState?.lastname}
                            </h4>
                            <p className="text-muted mb-0">{userState?.email}</p>
                        </div>

                        {/* Profile Form */}
                        <form onSubmit={formik.handleSubmit}>
                            <div className="row g-3">
                                {/* First Name */}
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label htmlFor="firstname" className="form-label d-flex align-items-center">
                                            <FiUser className="me-2 text-primary" />
                                            Prénom
                                        </label>
                                        <input
                                            type="text"
                                            name="firstname"
                                            className={`form-control ${formik.touched.firstname && formik.errors.firstname ? 'is-invalid' : ''}`}
                                            id="firstname"
                                            value={formik.values.firstname}
                                            onChange={formik.handleChange("firstname")}
                                            onBlur={formik.handleBlur("firstname")}
                                            disabled={edit}
                                            style={{
                                                backgroundColor: edit ? "#f8f9fa" : "white",
                                                border: "1px solid #dee2e6",
                                                borderRadius: "8px",
                                                padding: "12px 16px"
                                            }}
                                        />
                                        {formik.touched.firstname && formik.errors.firstname && (
                                            <div className="invalid-feedback">
                                                {formik.errors.firstname}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Last Name */}
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label htmlFor="lastname" className="form-label d-flex align-items-center">
                                            <FiUser className="me-2 text-primary" />
                                            Nom
                                        </label>
                                        <input
                                            type="text"
                                            name="lastname"
                                            className={`form-control ${formik.touched.lastname && formik.errors.lastname ? 'is-invalid' : ''}`}
                                            id="lastname"
                                            value={formik.values.lastname}
                                            onChange={formik.handleChange("lastname")}
                                            onBlur={formik.handleBlur("lastname")}
                                            disabled={edit}
                                            style={{
                                                backgroundColor: edit ? "#f8f9fa" : "white",
                                                border: "1px solid #dee2e6",
                                                borderRadius: "8px",
                                                padding: "12px 16px"
                                            }}
                                        />
                                        {formik.touched.lastname && formik.errors.lastname && (
                                            <div className="invalid-feedback">
                                                {formik.errors.lastname}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Email */}
                                <div className="col-12">
                                    <div className="form-group">
                                        <label htmlFor="email" className="form-label d-flex align-items-center">
                                            <FiMail className="me-2 text-primary" />
                                            Adresse email
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            className={`form-control ${formik.touched.email && formik.errors.email ? 'is-invalid' : ''}`}
                                            id="email"
                                            value={formik.values.email}
                                            onChange={formik.handleChange("email")}
                                            onBlur={formik.handleBlur("email")}
                                            disabled={edit}
                                            style={{
                                                backgroundColor: edit ? "#f8f9fa" : "white",
                                                border: "1px solid #dee2e6",
                                                borderRadius: "8px",
                                                padding: "12px 16px"
                                            }}
                                        />
                                        {formik.touched.email && formik.errors.email && (
                                            <div className="invalid-feedback">
                                                {formik.errors.email}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Mobile */}
                                <div className="col-12">
                                    <div className="form-group">
                                        <label htmlFor="mobile" className="form-label d-flex align-items-center">
                                            <FiPhone className="me-2 text-primary" />
                                            Numéro de téléphone
                                        </label>
                                        <input
                                            type="tel"
                                            name="mobile"
                                            className={`form-control ${formik.touched.mobile && formik.errors.mobile ? 'is-invalid' : ''}`}
                                            id="mobile"
                                            value={formik.values.mobile}
                                            onChange={formik.handleChange("mobile")}
                                            onBlur={formik.handleBlur("mobile")}
                                            disabled={edit}
                                            style={{
                                                backgroundColor: edit ? "#f8f9fa" : "white",
                                                border: "1px solid #dee2e6",
                                                borderRadius: "8px",
                                                padding: "12px 16px"
                                            }}
                                        />
                                        {formik.touched.mobile && formik.errors.mobile && (
                                            <div className="invalid-feedback">
                                                {formik.errors.mobile}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Save Button */}
                                {!edit && (
                                    <div className="col-12 mt-4">
                                        <div className="d-flex gap-3 justify-content-end">
                                            <button
                                                type="button"
                                                className="btn btn-outline-secondary px-4"
                                                onClick={() => {
                                                    setEdit(true);
                                                    formik.resetForm();
                                                    setImagePreview(null);
                                                    setProfileImage(null);
                                                }}
                                            >
                                                <FiX className="me-2" />
                                                Annuler
                                            </button>
                                            <button
                                                type="submit"
                                                className="btn btn-primary px-4"
                                                disabled={isLoading}
                                            >
                                                {isLoading ? (
                                                    <>
                                                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                                        Enregistrement...
                                                    </>
                                                ) : (
                                                    <>
                                                        <FiSave className="me-2" />
                                                        Enregistrer les modifications
                                                    </>
                                                )}
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </Container>

        <style jsx>{`
            .profile-card {
                border: none;
                box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
                border-radius: 15px;
            }
            
            .profile-title {
                color: #2c3e50;
                font-weight: 600;
            }
            
            .form-label {
                font-weight: 500;
                color: #495057;
                margin-bottom: 8px;
            }
            
            .form-control:focus {
                border-color: #007bff;
                box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
            }
            
            .btn {
                border-radius: 8px;
                font-weight: 500;
                transition: all 0.3s ease;
            }
            
            .btn:hover {
                transform: translateY(-1px);
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
            }
            
            .profile-image-edit-btn:hover {
                background-color: #0056b3 !important;
                transform: scale(1.1);
            }
        `}</style>
    </>
)
}

export default Profile