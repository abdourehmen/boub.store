import React, { useState } from 'react';
import { Globe, Menu, X } from 'lucide-react';
import './Navbar.css';

// قاموس الترجمة لنصوص شريط التنقل
const translations = {
  ar: {
    home: "الرئيسية",
    new: "الجديد",
    best: "الأكثر مبيعا",
    sale: "التخفيضات"
  },
  en: {
    home: "Home",
    new: "New",
    best: "Best Sellers",
    sale: "Sale"
  }
};

export default function Navbar({ currentLang = 'ar', setLang }) {
  const [isOpen, setIsOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false); // حالة قائمة الجوال
  const t = translations[currentLang] || translations.ar;

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const selectLanguage = (lang) => {
    if (setLang) setLang(lang);
    setIsOpen(false);
  };

  return (
    <nav className="navbar">
      {/* زر القائمة الخاص بالجوال يظهر في أقصى اليسار/اليمين */}
      <button 
        className="mobile-menu-btn" 
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        aria-label="قائمة التنقل"
      >
        {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
      </button>

      {/* شعار المتجر مع تلوين الحرف الأول */}
      <a href="#home" className="nav-brand">
        <span className="brand-first-letter">B</span>OUB
      </a>
      
      {/* روابط التنقل المترجمة (للكمبيوتر والجوال عند الفتح) */}
      <ul className={`nav-links ${mobileMenuOpen ? 'active' : ''}`}>
        <li><a href="#home" onClick={() => setMobileMenuOpen(false)}>{t.home}</a></li>
        <li><a href="#new" onClick={() => setMobileMenuOpen(false)}>{t.new}</a></li>
        <li><a href="#best" onClick={() => setMobileMenuOpen(false)}>{t.best}</a></li>
        <li><a href="#sale" onClick={() => setMobileMenuOpen(false)}>{t.sale}</a></li>
      </ul>

      {/* الأيقونات واللوكو الدائري وقائمة اللغات */}
      <div className="nav-actions">
        <div className="nav-logo-circle">
          <img src="/logo.jpg" alt="Store Logo" />
        </div>
        
        <div className="lang-dropdown-container">
          <button className="icon-btn" onClick={toggleDropdown} aria-label="اختر لغة الموقع">
            <Globe size={22} />
          </button>

          {isOpen && (
            <div className="lang-menu">
              <button className="lang-option" onClick={() => selectLanguage('ar')}>
                <svg className="flag-svg" viewBox="0 0 3 2">
                  <rect width="1.5" height="2" fill="#006233"/>
                  <rect x="1.5" width="1.5" height="2" fill="#FFFFFF"/>
                  <circle cx="1.5" cy="1" r="0.4" fill="#D21034"/>
                  <circle cx="1.55" cy="1" r="0.3" fill="#FFFFFF"/>
                </svg>
                <span>العربية</span>
              </button>

              <button className="lang-option" onClick={() => selectLanguage('en')}>
                <svg className="flag-svg" viewBox="0 0 60 30">
                  <rect width="60" height="30" fill="#012169"/>
                  <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6"/>
                  <path d="M0,0 L60,30 M60,0 L0,30" stroke="#C8102E" strokeWidth="4"/>
                  <path d="M30,0 V30 M0,15 H60" stroke="#fff" strokeWidth="10"/>
                  <path d="M30,0 V30 M0,15 H60" stroke="#C8102E" strokeWidth="6"/>
                </svg>
                <span>English</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}