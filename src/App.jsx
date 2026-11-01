import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import ProductsSection from './components/ProductsSection';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';
import ProductModal from './components/ProductModal';
import CheckoutModal from './components/CheckoutModal';
import './components/Animations.css';

export default function App() {
  const [lang, setLang] = useState('ar');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [checkoutData, setCheckoutData] = useState(null);

  return (
    <>
      {/* محتوى الموقع الأساسي مغلف بأنيشن فتح الصفحة */}
      <div className="page-entrance-wrapper">
        <Navbar currentLang={lang} setLang={setLang} />
        <Hero currentLang={lang} />
        <Services currentLang={lang} />
        <ProductsSection currentLang={lang} onViewDetails={setSelectedProduct} />
        <Testimonials currentLang={lang} />
        <Footer currentLang={lang} />
      </div>

      {/* النوافذ المنبثقة خارج الحاوية لضمان ظهورها بدقة في مكان التصفح الحالي */}
      {selectedProduct && (
        <ProductModal 
          product={selectedProduct} 
          currentLang={lang} 
          onClose={() => setSelectedProduct(null)}
          onCheckout={(product, size) => {
            setSelectedProduct(null);
            setCheckoutData({ product, selectedSize: size });
          }}
        />
      )}

      {checkoutData && (
        <CheckoutModal 
          product={checkoutData.product} 
          selectedSize={checkoutData.selectedSize} 
          currentLang={lang} 
          onClose={() => setCheckoutData(null)} 
        />
      )}
    </>
  );
}