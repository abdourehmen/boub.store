import React, { useEffect, useRef, useState } from 'react';
import './Animations.css';

export default function AnimateOnScroll({ children, animation = 'fade-up', delay = 0 }) {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target); // تفعيل الأنيشن مرة واحدة عند الظهور
        }
      });
    }, { threshold: 0.15 }); // يبدأ الأنيشن عندما يظهر 15% من العنصر على الشاشة

    const currentElement = domRef.current;
    if (currentElement) {
      observer.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, []);

  return (
    <div
      ref={domRef}
      className={`scroll-animate ${animation} ${isVisible ? 'is-visible' : ''}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}