import React, { useState } from 'react';
import ProductCard from './ProductCard';
import './ProductsSection.css';

const translations = {
  ar: {
    sectionTitle: "المنتجات",
    searchPlaceholder: "ابحث عن منتج...",
    badges: {
      best: "الأكثر مبيعا",
      sale: "التخفيضات",
      new: "جديد"
    }
  },
  en: {
    sectionTitle: "Products",
    searchPlaceholder: "Search for a product...",
    badges: {
      best: "Best Seller",
      sale: "Sale",
      new: "New"
    }
  }
};

export default function ProductsSection({ currentLang = 'ar' }) {
  const t = translations[currentLang] || translations.ar;
  const [searchTerm, setSearchTerm] = useState('');

  // عينة منتجات المتجر (قفازات، نظارات، أوشحة)
  const products = [
    {
      id: 1,
      name: currentLang === 'ar' ? 'قفازات جلدية فاخرة' : 'Luxury Leather Gloves',
      price: 1500,
      oldPrice: null,
      badge: t.badges.best,
      hasVariants: false,
      image: '/hero-photo1.jpg'
    },
    {
      id: 2,
      name: currentLang === 'ar' ? 'نظارات شمسية كلاسيكية' : 'Classic Sunglasses',
      price: 1500,
      oldPrice: null,
      badge: t.badges.best,
      hasVariants: true,
      image: '/hero-photo2.jpg'
    },
    {
      id: 3,
      name: currentLang === 'ar' ? 'وشاح حرير أنيق' : 'Elegant Silk Scarf',
      price: 1500,
      oldPrice: null,
      badge: t.badges.best,
      hasVariants: true,
      image: '/hero-photo1.jpg'
    },
    {
      id: 4,
      name: currentLang === 'ar' ? 'قفازات شتوية دافئة' : 'Warm Winter Gloves',
      price: 1500,
      oldPrice: 2000,
      badge: t.badges.sale,
      hasVariants: true,
      image: '/hero-photo2.jpg'
    },
    {
      id: 5,
      name: currentLang === 'ar' ? 'نظارات بإطار عصري' : 'Modern Frame Glasses',
      price: 1500,
      oldPrice: 2000,
      badge: t.badges.sale,
      hasVariants: true,
      image: '/hero-photo1.jpg'
    },
    {
      id: 6,
      name: currentLang === 'ar' ? 'وشاح قطني راقي' : 'Premium Cotton Scarf',
      price: 1500,
      oldPrice: 2000,
      badge: t.badges.sale,
      hasVariants: true,
      image: '/hero-photo2.jpg'
    },
    {
      id: 7,
      name: currentLang === 'ar' ? 'قفازات قيادة أنيقة' : 'Chic Driving Gloves',
      price: 1500,
      oldPrice: null,
      badge: t.badges.new,
      hasVariants: false,
      image: '/hero-photo1.jpg'
    },
    {
      id: 8,
      name: currentLang === 'ar' ? 'نظارات شمسية راقية' : 'Designer Sunglasses',
      price: 1500,
      oldPrice: null,
      badge: t.badges.new,
      hasVariants: false,
      image: '/hero-photo2.jpg'
    },
    {
      id: 9,
      name: currentLang === 'ar' ? 'وشاح مطرز مميز' : 'Embroidered Scarf',
      price: 1500,
      oldPrice: null,
      badge: t.badges.new,
      hasVariants: false,
      image: '/hero-photo1.jpg'
    }
  ];

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section className="products-section" id="products">
      <div className="products-container">
        <h2 className="section-main-title">{t.sectionTitle}</h2>
        
        {/* خانة البحث */}
        <div className="search-bar-container">
          <input 
            type="text" 
            placeholder={t.searchPlaceholder} 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>

        {/* شبكة الكروت */}
        <div className="products-grid">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} currentLang={currentLang} />
          ))}
        </div>
      </div>
    </section>
  );
}