import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';

export default function App() {
  // حالة اللغة (افتراضياً العربية 'ar')
  const [lang, setLang] = useState('ar');

  return (
    <div>
      {/* تمرير اللغة ودالة التغيير إلى الـ Navbar */}
      <Navbar currentLang={lang} setLang={setLang} />
      
      {/* تمرير اللغة الحالية إلى الـ Hero إذا أردت ترجمة محتواه لاحقاً */}
      <Hero lang={lang} />
    </div>
  );
}