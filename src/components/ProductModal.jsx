import React, { useState } from 'react';
import './ProductModal.css';

const translations = {
  ar: {
    sizeLabel: "المقاس",
    priceLabel: "السعر",
    orderBtn: "اتمام الطلب",
    sizes: ["S", "M", "L", "XL"]
  },
  en: {
    sizeLabel: "Size",
    priceLabel: "Price",
    orderBtn: "Checkout",
    sizes: ["S", "M", "L", "XL"]
  }
};

export default function ProductModal({ product, currentLang = 'ar', onClose, onCheckout }) {
  if (!product) return null;

  const t = translations[currentLang] || translations.ar;
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState(t.sizes[0]);

  const images = product.images && product.images.length > 0 
    ? product.images 
    : [product.image || '/hero-photo1.jpg'];

  const handlePrev = () => {
    setActiveImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose}>&times;</button>
        
        <div className="modal-content-grid">
          <div className="modal-image-section">
            <div className="modal-image-box">
              {images.length > 1 && (
                <button className="modal-slider-btn modal-prev" onClick={handlePrev}>&#10094;</button>
              )}
              
              <img src={images[activeImageIndex]} alt={product.name} className="modal-product-img" />

              {images.length > 1 && (
                <button className="modal-slider-btn modal-next" onClick={handleNext}>&#10095;</button>
              )}
            </div>
          </div>

          <div className="modal-separator"></div>

          <div className="modal-info-section">
            <h2 className="modal-product-title">{product.name}</h2>
            
            <div className="modal-info-row">
              <span className="modal-label">{t.sizeLabel}</span>
              <div className="modal-sizes-container">
                {t.sizes.map((size) => (
                  <button
                    key={size}
                    className={`modal-size-btn ${selectedSize === size ? 'active' : ''}`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div className="modal-info-row">
              <span className="modal-label">{t.priceLabel}</span>
              <span className="modal-price">{product.price}da</span>
            </div>

            {/* الانتقال لفتح نافذة الطلب وإغلاق نافذة التفاصيل */}
            <button className="modal-order-btn" onClick={() => onCheckout && onCheckout(product, selectedSize)}>
              {t.orderBtn}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}