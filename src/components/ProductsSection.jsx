import React, { useState, useRef, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import ProductCard from './ProductCard';
import AnimateOnScroll from './AnimateOnScroll';

const translations = {
  ar: {
    searchPlaceholder: "ابحث عن منتج...",
    titles: {
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
    }
  }
};

export default function ProductsSection({ currentLang = 'ar', onViewDetails }) {
  const t = translations[currentLang] || translations.ar;
  const [searchTerm, setSearchTerm] = useState('');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const bestRef = useRef(null);
  const saleRef = useRef(null);
  const newRef = useRef(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data, error } = await supabase
          .from('products')
          .select('*');
        
        if (error) throw error;
        setProducts(data || []);
      } catch (err) {
        setError('فشل في جلب المنتجات من Supabase');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const scrollContainer = (ref, direction) => {
    if (ref.current) {
      const scrollAmount = 320;
      ref.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const filteredProducts = products.filter(p => 
    p.name && p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const bestSellers = filteredProducts.filter(p => p.category === 'best');
  const saleProducts = filteredProducts.filter(p => p.category === 'sale');
  const newProducts = filteredProducts.filter(p => p.category === 'new');

  if (loading) {
    return <div style={{ textAlign: 'center', padding: '50px', fontSize: '18px' }}>جاري تحميل المنتجات...</div>;
  }

  if (error) {
    return <div style={{ textAlign: 'center', padding: '50px', color: '#ef4444', fontSize: '18px' }}>{error}</div>;
  }

  // دالة مساعدة لإنشاء السلايدر الأفقي لكل قسم مع الأسهم
  const renderCategorySlider = (title, items, ref, categoryKey) => {
    if (items.length === 0) return null;

    return (
      <div className="category-block" key={categoryKey} style={{ marginBottom: '45px' }}>
        <div style={{ borderBottom: '2px solid #e2e8f0', paddingBottom: '10px', marginBottom: '20px' }}>
          <h2 style={{ fontSize: '22px', fontWeight: 'bold', color: '#1e293b' }}>{title}</h2>
        </div>
        
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
          {/* زر السهم الأيمن للتمرير */}
          <button 
            onClick={() => scrollContainer(ref, currentLang === 'ar' ? 'right' : 'left')}
            style={{
              position: 'absolute',
              right: '-20px',
              zIndex: 10,
              background: '#fff',
              border: '1px solid #cbd5e1',
              borderRadius: '50%',
              width: '42px',
              height: '42px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
              fontSize: '18px',
              fontWeight: 'bold',
              color: '#334155'
            }}
          >
            &#10095;
          </button>

          {/* حاوية السلايدر الأفقي */}
          <div 
            ref={ref}
            style={{
              display: 'flex',
              gap: '20px',
              overflowX: 'auto',
              scrollBehavior: 'smooth',
              width: '100%',
              padding: '10px 5px',
              scrollbarWidth: 'none', /* إخفاء شريط التمرير */
            }}
          >
            {items.map((product, index) => (
              <div 
                key={product.id} 
                style={{ 
                  minWidth: '270px', 
                  maxWidth: '270px', 
                  flex: '0 0 auto',
                  background: '#fff', 
                  borderRadius: '12px', 
                  overflow: 'hidden', 
                  boxShadow: '0 4px 15px rgba(0,0,0,0.06)' 
                }}
              >
                <AnimateOnScroll animation="zoom-in" delay={index * 80}>
                  <ProductCard product={product} currentLang={currentLang} onViewDetails={onViewDetails} />
                </AnimateOnScroll>
              </div>
            ))}
          </div>

          {/* زر السهم الأيسر للتمرير */}
          <button 
            onClick={() => scrollContainer(ref, currentLang === 'ar' ? 'left' : 'right')}
            style={{
              position: 'absolute',
              left: '-20px',
              zIndex: 10,
              background: '#fff',
              border: '1px solid #cbd5e1',
              borderRadius: '50%',
              width: '42px',
              height: '42px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
              fontSize: '18px',
              fontWeight: 'bold',
              color: '#334155'
            }}
          >
            &#10094;
          </button>
        </div>
      </div>
    );
  };

  return (
    <section className="products-section" id="products" style={{ padding: '40px 20px', background: '#f8fafc' }}>
      <div className="products-container" style={{ maxWidth: '1200px', margin: '0 auto' }}>
        
        {/* خانة البحث */}
        <AnimateOnScroll animation="slide-right">
          <div className="search-bar-container" style={{ marginBottom: '35px', textAlign: 'center' }}>
            <input 
              type="text" 
              placeholder={t.searchPlaceholder} 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ 
                width: '100%', 
                maxWidth: '450px', 
                padding: '12px 20px', 
                borderRadius: '30px', 
                border: '1px solid #cbd5e1', 
                outline: 'none',
                boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                fontSize: '16px'
              }}
            />
          </div>
        </AnimateOnScroll>

        {/* عرض الأقسام بالسلايدر الأفقي مع الأسهم */}
        {renderCategorySlider(t.titles.best, bestSellers, bestRef, 'best')}
        {renderCategorySlider(t.titles.sale, saleProducts, saleRef, 'sale')}
        {renderCategorySlider(t.titles.new, newProducts, newRef, 'new')}

        {products.length === 0 && (
          <div style={{ textAlign: 'center', padding: '50px', color: '#64748b', fontSize: '16px' }}>
            لا توجد منتجات مضافة حالياً.
          </div>
        )}

      </div>
    </section>
  );
}