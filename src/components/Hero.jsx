import React, { useState, useEffect } from 'react';
import './Hero.css';

// قائمة الشرائح مع تخصيص صورة لكل من الكمبيوتر والجوال (تمت إضافة الشريحة الثالثة)
const heroSlides = [
  {
    desktop: '/hero-banner-img desktop-img1.jpg',
    mobile: '/hero-banner-img mobile-img1.jpg'
  },
  {
    desktop: '/hero-banner-img desktop-img2.jpg',
    mobile: '/hero-banner-img mobile-img2.jpg'
  },
  {
    desktop: '/hero-banner-img desktop-img3.jpg', // صورة الكمبيوتر للشريحة الثالثة
    mobile: '/hero-banner-img mobile-img3.jpg'   // صورة الجوال للشريحة الثالثة
  }
];

export default function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % heroSlides.length);
    }, 2000); // تتغير الصور تلقائياً كل 2 ثوانٍ

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