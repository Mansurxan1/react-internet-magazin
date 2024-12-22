import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

const ProductGallery = ({ images, onImageClick }) => {
  if (!images || images.length <= 1) {
    return ''; 
  }

  return (
    <div className="product__details-images">
      <Swiper
        modules={[Autoplay]}
        spaceBetween={10}
        slidesPerView={2.5} 
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        grabCursor={true}
        className="product-swiper"
      >
        {images.map((image, index) => (
          <SwiperSlide key={index} className="product__swiper-width">
            <img
              src={image}
              alt=""
              className="product__details-img"
              onClick={() => onImageClick && onImageClick(image)}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ProductGallery;
