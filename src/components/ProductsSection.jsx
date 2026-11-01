import React, { useState, useRef } from 'react';
import ProductCard from './ProductCard';
import './ProductsSection.css';

const translations = {
  ar: {
    searchPlaceholder: "ابحث عن منتج...",
    titles: {
      best: "الأكثر مبيعا",
      sale: "التخفيضات",
      new: "جديد"
    },
    badges: {
      best: "الأكثر مبيعا",
      sale: "التخفيضات",
      new: "جديد"
    }
  },
  en: {
    searchPlaceholder: "Search for a product...",
    titles: {
      best: "Best Sellers",
      sale: "Sale",
      new: "New"
    },
    badges: {
      best: "Best Seller",
      sale: "Sale",
      new: "New"
    }
  }
};

export default function ProductsSection({ currentLang = 'ar', onViewDetails }) {
  const t = translations[currentLang] || translations.ar;
  const [searchTerm, setSearchTerm] = useState('');

  const bestRef = useRef(null);
  const saleRef = useRef(null);
  const newRef = useRef(null);

  const scrollContainer = (ref, direction) => {
    if (ref.current) {
      const scrollAmount = 350;
      ref.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const products = [
    {
      id: 1,
      name: currentLang === 'ar' ? 'قفازات جلدية فاخرة' : 'Luxury Leather Gloves',
      price: 1500,
      oldPrice: null,
      badge: t.badges.best,
      category: 'best',
      images: ['/hero-photo1.jpg', '/hero-photo2.jpg', '/hero-photo1.jpg']
    },
    {
      id: 2,
      name: currentLang === 'ar' ? 'نظارات شمسية كلاسيكية' : 'Classic Sunglasses',
      price: 1500,
      oldPrice: null,
      badge: t.badges.best,
      category: 'best',
      images: ['/hero-photo2.jpg', '/hero-photo1.jpg', '/hero-photo2.jpg']
    },
    {
      id: 3,
      name: currentLang === 'ar' ? 'وشاح حرير أنيق' : 'Elegant Silk Scarf',
      price: 1500,
      oldPrice: null,
      badge: t.badges.best,
      category: 'best',
      images: ['/hero-photo1.jpg', '/hero-photo2.jpg', '/hero-photo1.jpg']
    },
    {
      id: 4,
      name: currentLang === 'ar' ? 'قفازات شتوية دافئة' : 'Warm Winter Gloves',
      price: 1500,
      oldPrice: 2000,
      badge: t.badges.sale,
      category: 'sale',
      images: ['/hero-photo2.jpg', '/hero-photo1.jpg', '/hero-photo2.jpg']
    },
    {
      id: 5,
      name: currentLang === 'ar' ? 'نظارات بإطار عصري' : 'Modern Frame Glasses',
      price: 1500,
      oldPrice: 2000,
      badge: t.badges.sale,
      category: 'sale',
      images: ['/hero-photo1.jpg', '/hero-photo2.jpg', '/hero-photo1.jpg']
    },
    {
      id: 6,
      name: currentLang === 'ar' ? 'وشاح قطني راقي' : 'Premium Cotton Scarf',
      price: 1500,
      oldPrice: 2000,
      badge: t.badges.sale,
      category: 'sale',
      images: ['/hero-photo2.jpg', '/hero-photo1.jpg', '/hero-photo2.jpg']
    },
    {
      id: 7,
      name: currentLang === 'ar' ? 'قفازات قيادة أنيقة' : 'Chic Driving Gloves',
      price: 1500,
      oldPrice: null,
      badge: t.badges.new,
      category: 'new',
      images: ['/hero-photo1.jpg', '/hero-photo2.jpg', '/hero-photo1.jpg']
    },
    {
      id: 8,
      name: currentLang === 'ar' ? 'نظارات شمسية راقية' : 'Designer Sunglasses',
      price: 1500,
      oldPrice: null,
      badge: t.badges.new,
      category: 'new',
      images: ['/hero-photo2.jpg', '/hero-photo1.jpg', '/hero-photo2.jpg']
    },
    {
      id: 9,
      name: currentLang === 'ar' ? 'وشاح مطرز مميز' : 'Embroidered Scarf',
      price: 1500,
      oldPrice: null,
      badge: t.badges.new,
      category: 'new',
      images: ['/hero-photo1.jpg', '/hero-photo2.jpg', '/hero-photo1.jpg']
    }
  ];

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const bestSellers = filteredProducts.filter(p => p.category === 'best');
  const saleProducts = filteredProducts.filter(p => p.category === 'sale');
  const newProducts = filteredProducts.filter(p => p.category === 'new');

  return (
    <section className="products-section" id="products">
      <div className="products-container">
        
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

        {/* 1. قسم الأكثر مبيعا */}
        {bestSellers.length > 0 && (
          <div className="category-block" id="best">
            <div className="category-header-row">
              <h2 className="section-category-title">{t.titles.best}</h2>
            </div>
            <div className="slider-outer-container">
              <button className="slider-side-btn slider-prev" onClick={() => scrollContainer(bestRef, 'left')}>&#10094;</button>
              <div className="products-slider" ref={bestRef}>
                {bestSellers.map(product => (
                  <div className="slider-card-wrapper" key={product.id}>
                    <ProductCard product={product} currentLang={currentLang} onViewDetails={onViewDetails} />
                  </div>
                ))}
              </div>
              <button className="slider-side-btn slider-next" onClick={() => scrollContainer(bestRef, 'right')}>&#10095;</button>
            </div>
          </div>
        )}

        {/* 2. قسم التخفيضات */}
        {saleProducts.length > 0 && (
          <div className="category-block" id="sale">
            <div className="category-header-row">
              <h2 className="section-category-title">{t.titles.sale}</h2>
            </div>
            <div className="slider-outer-container">
              <button className="slider-side-btn slider-prev" onClick={() => scrollContainer(saleRef, 'left')}>&#10094;</button>
              <div className="products-slider" ref={saleRef}>
                {saleProducts.map(product => (
                  <div className="slider-card-wrapper" key={product.id}>
                    <ProductCard product={product} currentLang={currentLang} onViewDetails={onViewDetails} />
                  </div>
                ))}
              </div>
              <button className="slider-side-btn slider-next" onClick={() => scrollContainer(saleRef, 'right')}>&#10095;</button>
            </div>
          </div>
        )}

        {/* 3. قسم الجديد */}
        {newProducts.length > 0 && (
          <div className="category-block" id="new">
            <div className="category-header-row">
              <h2 className="section-category-title">{t.titles.new}</h2>
            </div>
            <div className="slider-outer-container">
              <button className="slider-side-btn slider-prev" onClick={() => scrollContainer(newRef, 'left')}>&#10094;</button>
              <div className="products-slider" ref={newRef}>
                {newProducts.map(product => (
                  <div className="slider-card-wrapper" key={product.id}>
                    <ProductCard product={product} currentLang={currentLang} onViewDetails={onViewDetails} />
                  </div>
                ))}
              </div>
              <button className="slider-side-btn slider-next" onClick={() => scrollContainer(newRef, 'right')}>&#10095;</button>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}