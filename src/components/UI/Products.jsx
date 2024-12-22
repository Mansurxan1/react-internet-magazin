import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaCartPlus, FaHeart } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import AOS from "aos"; 
import "aos/dist/aos.css"; 
import { useTranslation } from "react-i18next";
import { addToCart, removeFromCart, incrementQuantity } from "@/Features/cart/cartSlice";
import { addToFavorites, removeFromFavorites } from "@/Features/favoritesSlice/favoritesSlice";

const Products = ({ products }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const favoriteItems = useSelector((state) => state.favorites.items);
  const [sortedProducts, setSortedProducts] = useState(products);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease-in",
      once: false,
    });
  }, []);

  useEffect(() => {
    setSortedProducts(products); 
  }, [products]);

  const handleFavoriteClick = (product) => {
    const isFavorited = favoriteItems.some((item) => item.id === product.id);
    if (isFavorited) {
      dispatch(removeFromFavorites(product.id));
    } else {
      dispatch(addToFavorites(product));
    }
  };

  const handleCartClick = (product) => {
    dispatch(addToCart(product));
  };

  const handleIncrement = (product) => {
    dispatch(incrementQuantity({ id: product.id, stock: product.stock }));
  };

  const handleDecrement = (id) => {
    dispatch(removeFromCart(id));
  };

  const handleProductClick = (product) => {
    navigate(`/product/${product.id}`, { state: { product } });
  };

  const filteredProducts = sortedProducts.filter(
    (product) => typeof product.stock === "number" && product.stock > 0
  );

  return (
    <>
      {filteredProducts.map((product) => {
        const isFavorited = favoriteItems.some((item) => item.id === product.id);
        return (
          <div key={product.id} className="products__box" data-aos="fade-up" onClick={() => handleProductClick(product)}>
            <div className="products__box-imgbox">
              <Swiper modules={[Pagination]} pagination={{ clickable: true }}>
                {product.images && product.images.length > 1 ? (
                  product.images.map((image, index) => (
                    <SwiperSlide key={index}>
                      <img className="products__box-img" src={image} alt={product.title} />
                    </SwiperSlide>
                  ))
                ) : (
                  <img className="products__box-img" src={product.thumbnail} alt={product.title} />
                )}
              </Swiper>
            </div>
            <button
              className={`products__box-like ${isFavorited ? "active" : ""}`}
              onClick={(e) => {
                e.stopPropagation();
                handleFavoriteClick(product);
              }}
            >
              <FaHeart />
            </button>
            <div className="text-padding">
              <h4 className="products__box-title">{product.title}</h4>
              <p className="products__box-stock">
                {product.stock} {t("stock")}
              </p>
              <p className="products__box-quanty">
                {product.minimumOrderQuantity} {t("Minimum order quantity")}
              </p>
              <p className="products__box-prices">
                <span className="products__box-price">${product.price}</span>
              </p>
              <div className="products__box-actions" onClick={(e) => e.stopPropagation()}>
                {cartItems.find((item) => item.id === product.id) ? (
                  <div className="products__box-counter">
                    <button className="counter-btn decrement-btn" onClick={() => handleDecrement(product.id)}>
                      -
                    </button>
                    <span className="counter-value">
                      {cartItems.find((item) => item.id === product.id)?.quantity || 0}
                    </span>
                    <button
                      className="counter-btn increment-btn"
                      onClick={() => handleIncrement(product)}
                      disabled={
                        cartItems.find((item) => item.id === product.id)?.quantity >= product.stock
                      }
                    >
                      +
                    </button>
                  </div>
                ) : (
                  <button className="products__box-btn" onClick={() => handleCartClick(product)}>
                    <FaCartPlus />
                  </button>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default Products;

