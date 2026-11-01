import React from 'react';
import AnimateOnScroll from './AnimateOnScroll'; // استيراد مكون الأنيشن
import './Services.css';

// قاموس الترجمة لقسم الخدمات
const translations = {
  ar: {
    service1Title: 'توصيل سريع',
    service1Sub: 'توصيل لجميع ولايات الوطن',
    service2Title: 'خدمة العملاء',
    service2Sub: 'دعم فني متواصل عبر واتساب',
    service3Title: 'دفع آمن',
    service3Sub: 'الدفع عند الاستلام'
  },
  en: {
    service1Title: 'Free Shipping', 
    service1Sub: 'Delivery to all 58 wilayas',
    service2Title: 'Customer Service',
    service2Sub: 'Continuous support via WhatsApp',
    service3Title: 'Secure Payment',
    service3Sub: 'Cash on Delivery'
  }
};

export default function Services({ currentLang = 'ar' }) {
  const t = translations[currentLang] || translations.ar;

  const servicesData = [
    {
      icon: '/service-1.png',
      title: t.service1Title,
      subtitle: t.service1Sub
    },
    {
      icon: '/service-2.png',
      title: t.service2Title,
      subtitle: t.service2Sub
    },
    {
      icon: '/service-3.png',
      title: t.service3Title,
      subtitle: t.service3Sub
    }
  ];

  return (
    <section className="services-section">
      <div className="services-container">
        {servicesData.map((item, index) => (
          /* تغليف كل بطاقة بخاصية الأنيشن مع تأخير زمني تصاعدي (delay) */
          <AnimateOnScroll animation="zoom-in" delay={index * 150} key={index}>
            <div className="service-item">
              <div className="service-icon-circle">
                <img src={item.icon} alt={item.title} />
              </div>
              <div className="service-text">
                <h4 className="service-title">{item.title}</h4>
                <p className="service-subtitle">{item.subtitle}</p>
              </div>
            </div>
          </AnimateOnScroll>
        ))}
      </div>
    </section>
  );
}