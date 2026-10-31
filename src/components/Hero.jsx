import React, { useState, useEffect } from 'react';
import './Hero.css';

// قائمة الصور التي تريد التنقل بينها
const heroImages = [
  '/hero-photo1.jpg',
  '/hero-photo2.jpg' // استبدل الاسم بصورتك الثانية الجديدة في مجلد public
];

export default function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
    }, 4000); // تتغير الصورة كل 4 ثوانٍ

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="hero-section" id="home">
      {heroImages.map((img, index) => (
        <img
          key={index}
          src={img}
          alt={`Boub Store Hero ${index + 1}`}
          className={`hero-banner-img ${index === currentIndex ? 'active' : ''}`}
        />
      ))}
    </div>
  );
}