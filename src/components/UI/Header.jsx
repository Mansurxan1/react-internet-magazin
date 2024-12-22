import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Scrollbar, Navigation } from "swiper/modules";
import { useNavigate } from "react-router-dom";
import "swiper/css";
import "swiper/css/scrollbar";
import "swiper/css/navigation";

const Header = ({ categoryProducts }) => {
  const navigate = useNavigate();

  const handleProductClick = (product) => {
    navigate(`/product/${product.id}`, { state: { product } });
  };

  return (
    <header className="header">
      <div className="container">
        <Swiper modules={[Autoplay, Scrollbar, Navigation]} 
          scrollbar={{ draggable: true }} navigation 
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          spaceBetween={10} grabCursor={true} className="header__swiper"
        >
          {categoryProducts.map((product) => (
            <SwiperSlide key={product.id} className="header__products"
              onClick={() => handleProductClick(product)}
            >
              <div className="header__products-item">
                <div className="header__products-imgbox">
                  <img src={product.images && product.images[0]} alt={product.title}
                    className="header__products-img"/>
                </div>
                <h4 className="header__products-name">{product.title}</h4>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </header>
  );
};

export default Header;
