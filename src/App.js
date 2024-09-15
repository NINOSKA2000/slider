// src/App.js
import React, { useState, useEffect } from "react";
import "./App.css";
import data from "./data.json"; // Asegúrate de que la ruta sea correcta
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay } from "swiper/modules";

// Componentes de flechas personalizadas
const CustomPrevButton = ({ onClick }) => (
  <button className="custom-prev-button" onClick={onClick}>
<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="none" viewBox="0 0 24 24">
  <path stroke="url(#a)" stroke-linejoin="round" d="m15 6-5.293 5.293a1 1 0 0 0 0 1.414L15 18"/>
  <defs>
    <linearGradient id="a" x1="12" x2="12" y1="6" y2="18" gradientUnits="userSpaceOnUse">
      <stop stop-color="#BB39D3"/>
      <stop offset="1" stop-color="#611D6D"/>
    </linearGradient>
  </defs>
</svg>


  </button>
);

const CustomNextButton = ({ onClick }) => (
  <button className="custom-next-button" onClick={onClick}>
  <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="none" viewBox="0 0 24 24">
  <path stroke="url(#a)" stroke-linejoin="round" d="m9 6 5.293 5.293a1 1 0 0 1 0 1.414L9 18"/>
  <defs>
    <linearGradient id="a" x1="12" x2="12" y1="6" y2="18" gradientUnits="userSpaceOnUse">
      <stop stop-color="#BB39D3"/>
      <stop offset="1" stop-color="#611D6D"/>
    </linearGradient>
  </defs>
</svg>




  </button>
);

const Product = ({ title, price, brand, image_url, url }) => {
  return (
    <div className="product-card">
      <img src={image_url} alt={title} className="product-card__image" />
      <div className="product-card__info">
        <h3 className="product-card__title">{title}</h3>
        <a href={url} className="product-card__button">
          {price} $
        </a>
      </div>
    </div>
  );
};

function App() {
  const [products, setProducts] = useState([]);
  const [autoplayDelay, setAutoplayDelay] = useState(3000);

  const [swiperInstances, setSwiperInstances] = useState({});

  useEffect(() => {
    setProducts(data);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAutoplayDelay(3000); // Cambia el retraso después de 1.2 segundos
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  const handlePrev = (index) => {
    if (swiperInstances[index]) {
      swiperInstances[index].slidePrev();
      swiperInstances[index].autoplay.start(); // Reinicia el autoplay
    }
  };

  const handleNext = (index) => {
    if (swiperInstances[index]) {
      swiperInstances[index].slideNext();
      swiperInstances[index].autoplay.start(); // Reinicia el autoplay
    }
  };

  return (
    <div className="outfit-builder__products">
      {products.map((category, index) => (
        <div key={category.name} className="outfit-builder__categories">
          <p className="outfit-builder__category-name">{category.name}</p>

          <div className="container-mySwiper">
            <Swiper
              slidesPerView={5}
              centeredSlides={true}
              spaceBetween={14}
              autoplay={{ delay: autoplayDelay, disableOnInteraction: false }}
              pagination={{ clickable: false }}
              modules={[Autoplay]}
              className="mySwiper"
              onSwiper={(swiper) => {
                setSwiperInstances((prev) => ({ ...prev, [index]: swiper }));
              }}
              breakpoints={{
                320: { slidesPerView: 1 },
                480: { slidesPerView: 2 },
                640: { slidesPerView: 3 },
                768: { slidesPerView: 3 },
                1024: { slidesPerView: 5 },
              }}
            >
              {category.items.map((card) => (
                <div className="swiper-sliders">
                  <SwiperSlide key={card.id}>
                    <Product {...card} />
                  </SwiperSlide>
                </div>
              ))}
            </Swiper>
            {/* Botones de navegación personalizados */}
            
          </div>

          <div className="custom-navigation">
              <CustomPrevButton onClick={() => handlePrev(index)} />
              <CustomNextButton onClick={() => handleNext(index)} />
            </div>
        </div>
      ))}
    </div>
  );
}

export default App;
