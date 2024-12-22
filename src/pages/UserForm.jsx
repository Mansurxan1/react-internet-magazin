import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const UserForm = () => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "+998",
    password: "",
    confirmPassword: "",
  });
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'instant'
    });
  }, [location]);

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [userInfo, setUserInfo] = useState(null);
  const { t } = useTranslation();
  const handleShowRegister = () => setIsRegistering(true);
  const handleShowLogin = () => setIsRegistering(false);

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    if (!formData.firstName) {
      newErrors.firstName = "Ismni kiriting!";
      isValid = false;
    }
    if (!formData.lastName) {
      newErrors.lastName = "Familiyani kiriting!";
      isValid = false;
    }
    if (!formData.phone) {
      newErrors.phone = "Telefon raqamini kiriting!";
      isValid = false;
    } else if (!/^\+998\d{9}$/.test(formData.phone)) {
      newErrors.phone = "Telefon raqami 13 xonadan iborat bo'lishi kerak!";
      isValid = false;
    }
    if (!formData.password) {
      newErrors.password = "Parolni kiriting!";
      isValid = false;
    }
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Parolni tasdiqlang!";
      isValid = false;
    }
    if (formData.password && formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Parollar mos kelmayapti!";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      if (isRegistering) {
        alert("Ro'yxatdan o'tildi!");
      } else {
        setUserInfo({
          firstName: formData.firstName,
          lastName: formData.lastName,
          phone: formData.phone,
        });
        alert("Kirish muvaffaqiyatli!");
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePhoneChange = (e) => {
    const value = e.target.value;

    if (/^\+998\d{0,9}$/.test(value)) {
      setFormData({ ...formData, phone: value });
    }
  };

  return (
    <section className="user__form">
      <div className="user__form-container">
        <div className={`user__form-section user__form-section--register ${isRegistering ? 'active' : ''}`}>
          <h2 className="user__form-heading">{t("signup")}</h2>
          <form onSubmit={handleSubmit}>
            <input type="text" name="firstName" value={formData.firstName}
              onChange={handleInputChange} placeholder={t("name")} required
              className="user__form-input"/>
            {errors.firstName && <span className="user__form-error">{errors.firstName}</span>}
            <input type="text" name="lastName" value={formData.lastName} onChange={handleInputChange}
              placeholder={t("username")} required className="user__form-input" />
            {errors.lastName && <span className="user__form-error">{errors.lastName}</span>}
            <input type="text" name="phone" value={formData.phone} onChange={handlePhoneChange}
              required maxLength="13" className="user__form-input" />
            {errors.phone && <span className="user__form-error">{errors.phone}</span>}
            <input type="password" name="password" value={formData.password} onChange={handleInputChange}
              placeholder={t("pasword")} required className="user__form-input"/>
            {errors.password && <span className="user__form-error">{errors.password}</span>}
            <input type="password" name="confirmPassword" value={formData.confirmPassword}
              onChange={handleInputChange} placeholder="Parolni tasdiqlang" required
              className="user__form-input" />
            {errors.confirmPassword && <span className="user__form-error">{errors.confirmPassword}</span>}
            <button type="submit" className="user__form-button--primary">{t("signup")}</button>
          </form>
          <button onClick={handleShowLogin} className="user__form-button--secondary" >
            {t("registered")}
          </button>
        </div>

        <div className={`user__form-section user__form-section--login ${isRegistering ? 'inactive' : ''}`}>
          <h2 className="user__form-heading">{t('signin')}</h2>
          <form onSubmit={handleSubmit}>
            <input type="text" name="firstName" value={formData.firstName} onChange={handleInputChange}
              placeholder={t("name")} required className="user__form-input" />
            {errors.firstName && <span className="user__form-error">{errors.firstName}</span>}
            <input type="text" name="phone" value={formData.phone} onChange={handlePhoneChange}
              required maxLength="13" className="user__form-input" />
            {errors.phone && <span className="user__form-error">{errors.phone}</span>}
            <input type="password" name="password" value={formData.password}
              onChange={handleInputChange} placeholder={t("pasword")} required
              className="user__form-input" />
            {errors.password && <span className="user__form-error">{errors.password}</span>}
            <button type="submit" className="user__form-button--primary">{t('signin')}</button>
          </form>
          <button onClick={handleShowRegister} className="user__form-button--secondary" >
            {t('signup')}
          </button>
        </div>
      </div>

    </section>
  );
};

export default UserForm;