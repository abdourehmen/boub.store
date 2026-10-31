import React, { useState } from 'react';
import { Eye } from 'lucide-react';
import './ProductCard.css';

export default function ProductCard({ product, currentLang = 'ar', onViewDetails }) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const images = product.images && product.images.length > 0 
    ? product.images 
    : [product.image];

  return (
    <div className="product-card">
      <div className="product-image-box">
        {product.badge && (
          <span className="product-badge">{product.badge}</span>
        )}

        {/* الصورة الحالية */}
        <img 
          src={images[activeImageIndex]} 
          alt={product.name} 
          className="product-img" 
        />

        {/* الأيقونات الجانبية التي تظهر عند تمرير الماوس (Hover) */}
        <div className="product-hover-actions">
          {/* زر تفاصيل المنتج مع أيقونة العين */}
          <button 
            className="action-circle-btn" 
            onClick={() => onViewDetails && onViewDetails(product)}
            aria-label="عرض تفاصيل المنتج"
          >
            <Eye size={18} />
          </button>

        </div>

        {/* مؤشرات التنقل بين الصور الثلاثة */}
        {images.length > 1 && (
          <div className="image-dots-container">
            {images.map((_, index) => (
              <button
                key={index}
                className={`image-dot ${index === activeImageIndex ? 'active' : ''}`}
                onClick={() => setActiveImageIndex(index)}
                aria-label={`عرض الصورة رقم ${index + 1}`}
              ></button>
            ))}
          </div>
        )}
      </div>

      <div className="product-info">
        <h3 className="product-title">{product.name}</h3>
        <div className="product-price-box">
          {product.oldPrice ? (
            <span className="product-price">
              {product.price}da / <span className="old-price">{product.oldPrice}da</span>
            </span>
          ) : (
            <span className="product-price">{product.price}da</span>
          )}
        </div>
      </div>
    </div>
  );
}