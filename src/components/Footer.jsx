import React from 'react';
import './Footer.css';

const translations = {
  ar: {
    contactTitle: "اتصل بنا",
    accountTitle: "حسابي",
    linksTitle: "حسابي",
    phone: "0794 74 57 89",
    instagram: "boub.store2",
    home: "الرئيسية",
    new: "الجديد",
    best: "الأكثر مبيعا",
    sale: "التخفيضات"
  },
  en: {
    contactTitle: "Contact Us",
    accountTitle: "My Account",
    linksTitle: "My Account",
    phone: "0794 74 57 89",
    instagram: "boub.store2",
    home: "Home",
    new: "New",
    best: "Best Sellers",
    sale: "Sale"
  }
};

export default function Footer({ currentLang = 'ar' }) {
  const t = translations[currentLang] || translations.ar;

  return (
    <footer className="store-footer">
      <div className="footer-container">
        
        {/* العمود الأول: Contact Us مع أيقونة الهاتف (رابط اتصال مباشر) */}
        <div className="footer-col">
          <h3 className="footer-title">{t.contactTitle}</h3>
          <div className="footer-content">
            <a href={`tel:${t.phone.replace(/\s+/g, '')}`} className="footer-with-icon footer-link-item">
              <svg className="footer-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
              </svg>
              <span className="footer-text">{t.phone}</span>
            </a>
          </div>
        </div>

        {/* فاصل عمودي */}
        <div className="footer-separator"></div>

        {/* العمود الثاني: My Account مع رابط الإنستغرام الحقيقي */}
        <div className="footer-col">
          <h3 className="footer-title">{t.accountTitle}</h3>
          <div className="footer-content">
            <a 
              href="https://www.instagram.com/boub.store2" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="footer-with-icon footer-link-item"
            >
              {/* أيقونة الإنستغرام */}
              <svg className="footer-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.51"></line>
              </svg>
              <span className="footer-text">{t.instagram}</span>
            </a>
          </div>
        </div>

        {/* فاصل عمودي */}
        <div className="footer-separator"></div>

        {/* العمود الثالث: روابط التنقل */}
        <div className="footer-col">
          <h3 className="footer-title">{t.linksTitle}</h3>
          <ul className="footer-links">
            <li><a href="#home">{t.home}</a></li>
            <li><a href="#new">{t.new}</a></li>
            <li><a href="#best">{t.best}</a></li>
            <li><a href="#sale">{t.sale}</a></li>
          </ul>
        </div>

      </div>
    </footer>
  );
}