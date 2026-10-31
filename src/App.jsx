import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import ProductsSection from './components/ProductsSection';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer'; // استيراد التذييل

export default function App() {
  const [lang, setLang] = useState('ar');

  return (
    <div>
      <Navbar currentLang={lang} setLang={setLang} />
      <Hero currentLang={lang} />
      <Services currentLang={lang} />
      <ProductsSection currentLang={lang} />
      <Testimonials currentLang={lang} />
      <Footer currentLang={lang} /> {/* عرض التذييل أسفل الصفحة */}
    </div>
  );
}