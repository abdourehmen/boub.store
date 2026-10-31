import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import ProductsSection from './components/ProductsSection'; // استيراد قسم المنتجات

export default function App() {
  const [lang, setLang] = useState('ar');

  return (
    <div>
      <Navbar currentLang={lang} setLang={setLang} />
      <Hero currentLang={lang} />
      <Services currentLang={lang} />
      <ProductsSection currentLang={lang} /> {/* عرض المنتجات */}
    </div>
  );
}