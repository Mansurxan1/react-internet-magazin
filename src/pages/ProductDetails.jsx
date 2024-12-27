import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FaCartPlus, FaTimes, FaHeart } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart } from '../Features/cart/cartSlice';
import ProductGallery from "../components/UI/ProductImages";
import { addToFavorites, removeFromFavorites } from "../Features/favoritesSlice/favoritesSlice";

const ProductDetails = () => {
  const location = useLocation();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const product = location.state?.product; 
  const cartItems = useSelector((state) => state.cart.items);
  const favoritesItems = useSelector((state) => state.favorites.items);
  
  if (!product) {
    return <div>{t("Mahsulot topilmadi")}</div>;  
  }

  const cartItem = cartItems.find(item => item.id === product?.id);
  const cartCount = cartItem ? cartItem.quantity : 0;  
  const isFavorited = favoritesItems.some(item => item.id === product?.id);
  const [currentImage, setCurrentImage] = useState(
    product?.images?.length > 0 ? product.images[0] : null
  );

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'instant'
    });
  }, [location]);

  const handleIncrement = () => {
    dispatch(addToCart(product)); 
  };

  const handleDecrement = () => {
    dispatch(removeFromCart(product.id));  
  };

  const handleFavoriteClick = () => {
    if (isFavorited) {
      dispatch(removeFromFavorites(product.id)); 
    } else {
      dispatch(addToFavorites(product)); 
    }
  };

  return (
    <section className="product">
      <div className="container">
        <div className="product__header">
          <h2 className="product__title">{product.title}</h2>
          <FaTimes className="product__close-icon" onClick={() => window.history.back()} />
        </div>
        <div className="product__details">
          <div className="product__details-images">
            <img src={currentImage} alt={product.title} className="product__details-image" />
            <button className={`products__box-like ${isFavorited ? "active" : ""}`}
              onClick={(e) => { e.stopPropagation(); handleFavoriteClick(); }}>
              <FaHeart />
            </button>
            <ProductGallery images={product.images} onImageClick={setCurrentImage} />
          </div>
          <div className="product__details-about">
            <div className="product__details-info">
              <p className="product__details-price">
                <strong>{t("price")}:</strong> ${product.price}
              </p>
              <p className="product__details-stock">
                <strong>{t("stocks")}:</strong> {product.stock} {t("stock")}
              </p>
              <p className="product__details-rating">
                <strong>{t('rating')}:</strong> 
                <span style={{ color: "#FFD700" }}>★</span> {product.rating.toFixed(1)}
              </p>
              <p className="product__details-desc">
                <strong>{t("description")}:</strong> {product.description}
              </p>
              <p><strong>{t("warrantyInformation")}:</strong> {product.warrantyInformation}</p>
              {product.shippingInformation && (
                <p className="product__details-delivery">
                  <strong>{t("delivery")}:</strong> {product.shippingInformation}
                </p>
              )}
              <p className="product__details-quanty">
                <strong>{t("Minimumorderquantity")}:</strong> {product.minimumOrderQuantity}
              </p>
            </div>

            {product.reviews?.length > 0 && (
              <div className="product__details-reviews">
                <h3>{t("reviews")} {product.reviews.length}</h3>
                <ul className="product__details-list">
                  {product.reviews.map((review, index) => (
                    <li key={index} className="product__details-link">
                      <p>
                        <strong>{review.reviewerName}</strong>: {review.comment} 
                        <span style={{ color: "#FFD700" }}>★</span> {review.rating}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="product__box-actions">
              {cartCount > 0 ? (
                <div className="product__box-counter">
                  <button className="counter-btn bg decrement-btn" onClick={handleDecrement}>
                    -
                  </button>
                  <span className="counter-value">{cartCount}</span>
                  <button className="counter-btn bg increment-btn" onClick={handleIncrement}
                    disabled={cartItems.find(item => item.id === product.id)?.quantity >= product.stock}>
                    +
                  </button>
                </div>
              ) : (
                <button className="product__box-btn" onClick={handleIncrement}>
                  <FaCartPlus />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetails;
