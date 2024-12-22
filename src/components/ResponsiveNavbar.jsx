import { Link, useLocation } from "react-router-dom";
import { IoHomeSharp } from "react-icons/io5";
import { TbCategory } from "react-icons/tb";
import { FaCartShopping, FaHeart } from "react-icons/fa6";
import { FaRegUser } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";

const ResponsiveNavbar = ({ setSidebarVisible }) => {
  const location = useLocation();
  const cartItemCount = useSelector((state) =>
    state.cart.items.reduce((total, item) => total + item.quantity, 0)
  );
  const { t, i18n } = useTranslation();
  const isCartPage = location.pathname === "/cart";
  const isHomePage = location.pathname === "/";
  const isCategoryPage = location.pathname.startsWith("/category/");
  const isUserPage = location.pathname === "/user-form";
  const isFavoritesPage = location.pathname === "/favorites";

  const handleCategoryClick = () => {
    if (window.innerWidth < 850) {
      setSidebarVisible(true); 
    }
  };
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "instant", 
    });
  }, [location]);

  return (
    <nav className="phone__tablet">
      <Link to="/" className={`phone__tablet-link ${isHomePage ? "active" : ""}`}>
        <span className={`icon ${isHomePage ? "active-icon" : ""}`}>
          <IoHomeSharp />
        </span>
        <span className={`label ${isHomePage ? "active-text" : ""}`}>{t("home")}</span>
      </Link>
      <Link
        to="/category/all"
        className={`icon phone__tablet-link ${isCategoryPage ? "active" : ""}`}  
        onClick={handleCategoryClick} 
      >
        <span className={`icon category ${isCategoryPage ? "active-icon" : ""}`}>
          <TbCategory />
        </span>
        <span className={`label category-name ${isCategoryPage ? "active-text" : ""}`}>
          {t("catalog")}
        </span>
      </Link>
      <Link
        to="/favorites"
        className={`phone__tablet-link ${isFavoritesPage ? "active" : ""}`}
      >
        <span className={`icon favorites ${isFavoritesPage ? "active-icons" : ""}`}>
          <FaHeart />
        </span>
        <span className={`label favorites-name ${isFavoritesPage ? "active-texts" : ""}`}>
          {t("favorites")}
        </span>
      </Link>
      <Link to="/cart" className={`phone__tablet-link ${isCartPage ? "active" : ""}`}>
        <span className={`icon basket ${isCartPage ? "active-icon" : ""}`}>
          <FaCartShopping />
        </span>
        <span className="cart-number">{cartItemCount}</span>
        <span className={`label cart-name ${isCartPage ? "active-text" : ""}`}>{t("cart")}</span>
      </Link>
      <Link to="/user-form" className={`phone__tablet-link ${isUserPage ? "active" : ""}`}>
        <span className={`icon ${isUserPage ? "active-icon" : ""}`}>
          <FaRegUser />
        </span>
        <span className={`label ${isUserPage ? "active-text" : ""}`}>{t("login")}</span>
      </Link>
    </nav>
  );
};

export default ResponsiveNavbar;