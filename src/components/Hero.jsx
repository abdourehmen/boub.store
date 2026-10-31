import React, { useState, useEffect } from 'react';
import './Hero.css';

// قائمة الشرائح مع تخصيص صورة لكل من الكمبيوتر والجوال
const heroSlides = [
  {
    desktop: '/hero-banner-img desktop-img1.jpg',
    mobile: '/hero-banner-img mobile-img1.jpg' // صورة الجوال للشريحة الأولى
  },
  {
    desktop: '/hero-banner-img desktop-img2.jpg',
    mobile: '/hero-banner-img mobile-img2.jpg' // صورة الجوال للشريحة الثانية
  }
];

export default function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % heroSlides.length);
    }, 4000); // تتغير الصور كل 4 ثوانٍ

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="hero-section" id="home">
      {heroSlides.map((slide, index) => (
        <div
          key={index}
          className={`hero-slide ${index === currentIndex ? 'active' : ''}`}
        >
          {/* صورة الحاسوب */}
          <img
            src={slide.desktop}
            alt={`Hero Desktop ${index + 1}`}
            className="hero-banner-img desktop-img"
          />
          {/* صورة الجوال */}
          <img
            src={slide.mobile}
            alt={`Hero Mobile ${index + 1}`}
            className="hero-banner-img mobile-img"
          />
        </div>
      ))}
    </div>
  );
}