import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import ProductsSection from './components/ProductsSection';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';
import ProductModal from './components/ProductModal';
import CheckoutModal from './components/CheckoutModal'; // استيراد نافذة إتمام الطلب

export default function App() {
  const [lang, setLang] = useState('ar');
  const [selectedProduct, setSelectedProduct] = useState(null); // منتج نافذة التفاصيل
  const [checkoutData, setCheckoutData] = useState(null); // بيانات منتج نافذة الطلب

  return (
    <div>
      <Navbar currentLang={lang} setLang={setLang} />
      <Hero currentLang={lang} />
      <Services currentLang={lang} />
      <ProductsSection currentLang={lang} onViewDetails={setSelectedProduct} />
      <Testimonials currentLang={lang} />
      <Footer currentLang={lang} />

      {/* نافذة تفاصيل المنتج */}
      {selectedProduct && (
        <ProductModal 
          product={selectedProduct} 
          currentLang={lang} 
          onClose={() => setSelectedProduct(null)}
          onCheckout={(product, size) => {
            setSelectedProduct(null); // إغلاق نافذة تفاصيل المنتج تماماً
            setCheckoutData({ product, selectedSize: size }); // فتح نافذة إتمام الطلب
          }}
        />
      )}

      {/* نافذة إتمام الطلب وملء المعلومات */}
      {checkoutData && (
        <CheckoutModal 
          product={checkoutData.product} 
          selectedSize={checkoutData.selectedSize} 
          currentLang={lang} 
          onClose={() => setCheckoutData(null)} 
        />
      )}
    </div>
  );
}