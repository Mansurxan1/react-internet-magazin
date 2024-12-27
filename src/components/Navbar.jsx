import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { TbCategory } from "react-icons/tb";
import { FaCartShopping, FaSun, FaHeart } from "react-icons/fa6";
import { RxMoon } from "react-icons/rx";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import eng from "../assets/images/eng.png";
import uz from "../assets/images/uz.png";
import logo from "../assets/images/LOGO.jpg";

const Navbar = () => {
  const [language, setLanguage] = useState("uz");
  const [darkMode, setDarkMode] = useState(false);
  const [active, setActive] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const cartItems = useSelector((state) => state.cart.items);

  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") || "uz";
    const savedDarkMode = localStorage.getItem("darkMode") === "true";
    setLanguage(savedLanguage);
    i18n.changeLanguage(savedLanguage);
    setDarkMode(savedDarkMode);
    if (savedDarkMode) {
      document.documentElement.classList.add("dark");
    }
  }, [i18n]);

  useEffect(() => {
    if (!location.pathname.startsWith("/search")) {
      setSearchQuery("");
    }
  }, [location.pathname]);

  useEffect(() => {
    if (location.pathname.includes("/category/")) {
      setActive("category");
    } else {
      const pathToActiveMap = {
        "/": "logo",
        "/cart": "cart",
        "/user-form": "user",
        "/favorites": "favorites",
      };
      setActive(pathToActiveMap[location.pathname] || "");
    }
  }, [location]);

  const handleCategoryClick = () => {
    navigate("/category/all");
    setActive("category");
  };

  const handleCartClick = () => {
    navigate("/cart");
    setActive("cart");
  };

  const handleLogoClick = () => {
    navigate("/");
    setActive("logo");
  };

  const handleUserClick = () => {
    navigate("/user-form");
    setActive("user");
  };

  const handleFavoritesClick = () => {
    navigate("/favorites");
    setActive("favorites");
  };

  const toggleLanguage = () => {
    const newLang = language === "uz" ? "en" : "uz";
    setLanguage(newLang);
    i18n.changeLanguage(newLang);
    localStorage.setItem("language", newLang);
  };

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    document.documentElement.classList.toggle("dark", newDarkMode);
    localStorage.setItem("darkMode", newDarkMode ? "true" : "false");
  };

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    navigate(query ? `/search?q=${query}` : "/");
  };

  return (
    <nav className="nav">
      <div className="container">
        <div className="nav__link">
          <button onClick={handleLogoClick} className={`logo ${active === "logo" ? "active" : ""}`}>
            <img src={logo} alt="Logo" />
          </button>
          <button onClick={handleCategoryClick} className={`nav__category-toggle ${active === "category" ? "active" : ""}`}>
            <TbCategory /> <span>{t("catalog")}</span>
          </button>
        </div>
        <div className="nav__content">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder={t("search")}
            className="nav__content-search"
          />
          <button onClick={toggleDarkMode} className="nav__content-darkmode">
            {darkMode ? <RxMoon /> : <FaSun />}
          </button>
          <button className="nav__content-language" onClick={toggleLanguage}>
            <img src={language === "uz" ? uz : eng} alt="language" />
          </button>
          <button className={`nav__content-favorites ${active === "favorites" ? "active" : ""}`} onClick={handleFavoritesClick}>
            <FaHeart />
          </button>
          <button className={`nav__content-basket ${active === "cart" ? "active" : ""}`} onClick={handleCartClick}>
            <FaCartShopping />
            <p className="nav__basket-number">
              {cartItems.reduce((total, item) => total + item.quantity, 0)}
            </p>
          </button>
          <button className={`nav__content-user ${active === "user" ? "active" : ""}`} onClick={handleUserClick}>
            {t("login")}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
