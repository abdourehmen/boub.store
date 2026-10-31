import React from 'react';
import './Testimonials.css';

// قاموس الترجمة لقسم آراء العملاء (عرض الصور فقط بدون تعليقات)
const translations = {
  ar: {
    sectionTitle: "آراء العملاء",
    reviews: [
      { id: 1, image: "/rev1(4).png" },
      { id: 2, image: "/rev1(5).png" },
      { id: 3, image: "/rev1(6).png" },
      { id: 4, image: "/rev1(7).png" }
    ]
  },
  en: {
    sectionTitle: "Customer Reviews",
    reviews: [
      { id: 1, image: "/rev1(4).png" },
      { id: 2, image: "/rev1(5).png" },
      { id: 3, image: "/rev1(6).png" },
      { id: 4, image: "/rev1(7).png" }
    ]
  }
};

export default function Testimonials({ currentLang = 'ar' }) {
  const t = translations[currentLang] || translations.ar;

  return (
    <section className="testimonials-section" id="testimonials">
      <div className="testimonials-container">
        {/* الخط الفاصل من الأعلى */}
        <div className="section-divider"></div>
        
        {/* عنوان القسم في المنتصف */}
        <h2 className="section-main-title">{t.sectionTitle}</h2>
        
        {/* شبكة الكروت الأربعة للصور */}
        <div className="testimonials-grid">
          {t.reviews.map((review) => (
            <div key={review.id} className="testimonial-card">
              <div className="testimonial-img-box">
                <img src={review.image} alt="Customer Review" className="testimonial-img" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}