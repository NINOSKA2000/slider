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
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
  <path stroke="#6D56A4" stroke-linecap="round" stroke-width="2" d="M4 4h1.626c.567 0 .85 0 1.076.124a1 1 0 0 1 .25.195c.175.189.244.464.381 1.014l.182.727c.101.404.152.606.23.776a2 2 0 0 0 1.446 1.13C9.375 8 9.583 8 10 8v0"/>
  <path stroke="#6D56A4" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 17H7.55c-.145 0-.218 0-.274-.006a1 1 0 0 1-.867-1.203 3.07 3.07 0 0 1 .081-.262v0c.052-.154.077-.231.106-.3a2 2 0 0 1 1.698-1.224C8.368 14 8.45 14 8.611 14H14"/>
  <path stroke="#6D56A4" stroke-linecap="round" stroke-width="2" d="M14.528 14h-3.554c-1.216 0-1.824 0-2.293-.275a1.999 1.999 0 0 1-.521-.442c-.35-.418-.45-1.018-.649-2.217-.203-1.215-.304-1.823-.063-2.273a1.5 1.5 0 0 1 .408-.482C8.26 8 8.876 8 10.108 8h6.656c1.45 0 2.175 0 2.469.474.293.475-.032 1.123-.68 2.42l-.447.895c-.538 1.076-.807 1.614-1.29 1.912-.484.299-1.085.299-2.288.299Z"/>
  <circle cx="17" cy="20" r="1" fill="#6D56A4"/>
  <circle cx="9" cy="20" r="1" fill="#6D56A4"/>
</svg>

          {price} $
        </a>
      </div>
    </div>
  );
};

function App() {
  const [products, setProducts] = useState([]);
  const [autoplayDelay, setAutoplayDelay] = useState(1);

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
