import  { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import Products from "../components/UI/Products"; 

const Favorites = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1); 
  };

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'instant'
    });
  }, [location]);

  const favoriteItems = useSelector((state) => state.favorites.items); 

  return (
    <section className="favorites__page">
      <div className="container">
        <button className="back__button" onClick={handleBackClick}>
          <FaArrowLeft /> {t('back')} 
        </button>
        <h2>{t('favorites')}</h2>
        <div className="favorites__page-box">
          {favoriteItems.length > 0 ? (
            <Products products={favoriteItems} /> 
          ) : (
            <p className="favorites__page-text">{t('noFavorites')}</p>
                      )}
        </div>
      </div>
    </section>
  );
};

export default Favorites;
