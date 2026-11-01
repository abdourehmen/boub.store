import React, { useState } from 'react';
import './CheckoutModal.css';

const translations = {
  ar: {
    totalPrice: "السعر الاجمالي",
    firstName: "الاسم",
    lastName: "اللقب",
    wilaya: "الولاية",
    baladia: "البلدية",
    address: "العنوان",
    submit: "طلب"
  },
  en: {
    totalPrice: "Total Price",
    firstName: "First Name",
    lastName: "Last Name",
    wilaya: "Wilaya",
    baladia: "Municipality",
    address: "Address",
    submit: "Order"
  }
};

export default function CheckoutModal({ product, selectedSize, currentLang = 'ar', onClose }) {
  const t = translations[currentLang] || translations.ar;
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    wilaya: '',
    baladia: '',
    address: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`تم إرسال الطلب بنجاح!\nالمنتج: ${product.name} (${selectedSize})\nالاسم: ${formData.firstName} ${formData.lastName}\nالعنوان: ${formData.wilaya}, ${formData.baladia}, ${formData.address}`);
    onClose();
  };

  return (
    <div className="checkout-overlay" onClick={onClose}>
      <div className="checkout-card" onClick={(e) => e.stopPropagation()}>
        {/* زر إغلاق النافذة */}
        <button className="checkout-close-btn" onClick={onClose}>&times;</button>
        
        {/* صندوق السعر الاجمالي */}
        <div className="checkout-total-box">
          <span className="checkout-total-label">{t.totalPrice}</span>
          <span className="checkout-total-price">{product.price}da</span>
        </div>

        <form onSubmit={handleSubmit} className="checkout-form">
          {/* الاسم */}
          <input 
            type="text" 
            name="firstName" 
            placeholder={t.firstName} 
            value={formData.firstName} 
            onChange={handleChange} 
            required 
            className="checkout-input"
          />

          {/* اللقب */}
          <input 
            type="text" 
            name="lastName" 
            placeholder={t.lastName} 
            value={formData.lastName} 
            onChange={handleChange} 
            required 
            className="checkout-input"
          />

          {/* الولاية والبلدية بجانب بعضهما */}
          <div className="checkout-row-inputs">
            <input 
              type="text" 
              name="wilaya" 
              placeholder={t.wilaya} 
              value={formData.wilaya} 
              onChange={handleChange} 
              required 
              className="checkout-input"
            />
            <input 
              type="text" 
              name="baladia" 
              placeholder={t.baladia} 
              value={formData.baladia} 
              onChange={handleChange} 
              required 
              className="checkout-input"
            />
          </div>

          {/* العنوان */}
          <input 
            type="text" 
            name="address" 
            placeholder={t.address} 
            value={formData.address} 
            onChange={handleChange} 
            required 
            className="checkout-input"
          />

          {/* خط فاصل */}
          <div className="checkout-divider"></div>

          {/* زر طلب */}
          <button type="submit" className="checkout-submit-btn">
            {t.submit}
          </button>
        </form>
      </div>
    </div>
  );
}