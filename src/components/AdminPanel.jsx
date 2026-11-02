import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

export default function AdminPanel() {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    category: 'best'
  });
  const [imageFiles, setImageFiles] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [products, setProducts] = useState([]); // قائمة جميع المنتجات
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [message, setMessage] = useState('');

  // جلب جميع المنتجات عند فتح لوحة التحكم
  const fetchProducts = async () => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProducts(data || []);
    } catch (err) {
      console.error('خطأ في جلب المنتجات:', err.message);
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // اختيار الصور بشكل تراكمي (بحد أقصى 3)
  const handleFileChange = (e) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      
      setImageFiles(prevFiles => {
        const combinedFiles = [...prevFiles, ...newFiles].slice(0, 3);
        const previews = combinedFiles.map(file => URL.createObjectURL(file));
        setImagePreviews(previews);
        return combinedFiles;
      });
    }
  };

  // حذف صورة من المعاينة قبل الرفع
  const handleRemovePreview = (index) => {
    setImageFiles(prev => prev.filter((_, i) => i !== index));
    setImagePreviews(prev => prev.filter((_, i) => i !== index));
  };

  // إضافة منتج جديد
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const uploadedImageUrls = [];

      for (const file of imageFiles) {
        const safeFileName = file.name.replace(/[^a-zA-Z0-9_.-]/g, '_');
        const fileName = `${Date.now()}-${safeFileName}`;

        const { error: uploadError } = await supabase.storage
          .from('products-images')
          .upload(fileName, file);

        if (uploadError) throw uploadError;

        const { data: publicUrlData } = supabase.storage
          .from('products-images')
          .getPublicUrl(fileName);

        uploadedImageUrls.push(publicUrlData.publicUrl);
      }

      const { error: dbError } = await supabase
        .from('products')
        .insert([
          {
            name: formData.name,
            price: parseFloat(formData.price),
            description: formData.description,
            category: formData.category,
            images: uploadedImageUrls
          }
        ]);

      if (dbError) throw dbError;

      setMessage('تم إضافة المنتج بنجاح وتحديث القائمة!');
      setFormData({ name: '', price: '', description: '', category: 'best' });
      setImageFiles([]);
      setImagePreviews([]);
      fetchProducts(); // تحديث القائمة فوراً
    } catch (err) {
      setMessage(`خطأ: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  // حذف منتج من قاعدة البيانات
  const handleDeleteProduct = async (id) => {
    if (!window.confirm('هل أنت متأكد من رغبتك في حذف هذا المنتج؟')) return;

    try {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      setProducts(prev => prev.filter(p => p.id !== id));
      setMessage('تم حذف المنتج بنجاح.');
    } catch (err) {
      setMessage(`خطأ في الحذف: ${err.message}`);
    }
  };

  return (
    <div style={{ maxWidth: '1000px', margin: '40px auto', padding: '30px', background: '#f8fafc', borderRadius: '16px', boxShadow: '0 4px 25px rgba(0,0,0,0.06)', fontFamily: 'Cairo, sans-serif' }} dir="rtl">
      
      <h2 style={{ textAlign: 'center', marginBottom: '30px', color: '#1e293b', fontSize: '28px', fontWeight: 'bold' }}>
        لوحة التحكم المركزية (Supabase Admin)
      </h2>
      
      {message && (
        <div style={{ padding: '12px 20px', borderRadius: '8px', background: message.includes('نجاح') ? '#d1fae5' : '#fee2e2', color: message.includes('نجاح') ? '#065f46' : '#991b1b', marginBottom: '25px', textAlign: 'center', fontWeight: '500' }}>
          {message}
        </div>
      )}

      {/* قسم إضافة منتج جديد */}
      <div style={{ background: '#fff', padding: '25px', borderRadius: '12px', boxShadow: '0 2px 10px rgba(0,0,0,0.03)', marginBottom: '40px' }}>
        <h3 style={{ marginBottom: '20px', color: '#334155', fontSize: '20px', borderBottom: '2px solid #f1f5f9', paddingBottom: '10px' }}>
          إضافة منتج جديد
        </h3>

        <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#475569' }}>اسم المنتج</label>
            <input 
              type="text" 
              name="name" 
              placeholder="مثال: قفازات دراجات احترافية" 
              value={formData.name} 
              onChange={handleChange} 
              required 
              style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e1', outline: 'none' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#475569' }}>السعر (دج)</label>
            <input 
              type="number" 
              name="price" 
              placeholder="مثال: 2500" 
              value={formData.price} 
              onChange={handleChange} 
              required 
              style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e1', outline: 'none' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#475569' }}>تصنيف القسم</label>
            <select 
              name="category" 
              value={formData.category} 
              onChange={handleChange}
              style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e1', background: '#fff', outline: 'none' }}
            >
              <option value="best">الأكثر مبيعا</option>
              <option value="sale">التخفيضات</option>
              <option value="new">جديد</option>
            </select>
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#475569' }}>صور المنتج (حتى 3 صور)</label>
            <input 
              type="file" 
              accept="image/*"
              multiple
              onChange={handleFileChange} 
              style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1', background: '#f8fafc' }}
            />
          </div>

          {/* معاينة الصور المصغرة */}
          {imagePreviews.length > 0 && (
            <div style={{ gridColumn: 'span 2', display: 'flex', gap: '15px', alignItems: 'center', marginTop: '5px' }}>
              {imagePreviews.map((src, index) => (
                <div key={index} style={{ position: 'relative' }}>
                  <img 
                    src={src} 
                    alt={`preview-${index}`} 
                    style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '8px', border: '2px solid #e2e8f0' }} 
                  />
                  <button 
                    type="button"
                    onClick={() => handleRemovePreview(index)}
                    style={{ position: 'absolute', top: '-5px', right: '-5px', background: '#ef4444', color: '#fff', border: 'none', borderRadius: '50%', width: '22px', height: '22px', cursor: 'pointer', fontSize: '12px' }}
                  >
                    &times;
                  </button>
                </div>
              ))}
            </div>
          )}

          <div style={{ gridColumn: 'span 2' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#475569' }}>وصف المنتج</label>
            <textarea 
              name="description" 
              placeholder="اكتب تفاصيل ووصف المنتج هنا..." 
              value={formData.description} 
              onChange={handleChange} 
              rows="3" 
              style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e1', outline: 'none' }}
            ></textarea>
          </div>

          <div style={{ gridColumn: 'span 2' }}>
            <button 
              type="submit" 
              disabled={loading}
              style={{ width: '100%', padding: '14px', background: '#0f172a', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: 'bold', fontSize: '16px', cursor: 'pointer', transition: '0.3s' }}
            >
              {loading ? 'جاري الرفع والحفظ...' : 'حفظ وإضافة المنتج إلى المتجر'}
            </button>
          </div>

        </form>
      </div>

      {/* قسم عرض جميع المنتجات الحالية */}
      <div style={{ background: '#fff', padding: '25px', borderRadius: '12px', boxShadow: '0 2px 10px rgba(0,0,0,0.03)' }}>
        <h3 style={{ marginBottom: '20px', color: '#334155', fontSize: '20px', borderBottom: '2px solid #f1f5f9', paddingBottom: '10px' }}>
          جميع المنتجات الموجودة في المتجر ({products.length})
        </h3>

        {fetching ? (
          <p style={{ textAlign: 'center', padding: '20px', color: '#64748b' }}>جاري تحميل المنتجات...</p>
        ) : products.length > 0 ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
            {products.map((product) => (
              <div key={product.id} style={{ border: '1px solid #e2e8f0', borderRadius: '10px', padding: '15px', background: '#f8fafc', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                
                {/* عرض الصورة الأولى كصورة مصغرة */}
                {product.images && product.images.length > 0 ? (
                  <img src={product.images[0]} alt={product.name} style={{ width: '100%', height: '160px', objectFit: 'cover', borderRadius: '8px' }} />
                ) : (
                  <div style={{ width: '100%', height: '160px', background: '#e2e8f0', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748b' }}>لا توجد صورة</div>
                )}

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h4 style={{ margin: 0, fontSize: '18px', color: '#1e293b' }}>{product.name}</h4>
                  <span style={{ fontWeight: 'bold', color: '#059669' }}>{product.price} دج</span>
                </div>

                <p style={{ margin: 0, fontSize: '14px', color: '#64748b' }}>القسم: <b>{product.category}</b></p>

                <button 
                  onClick={() => handleDeleteProduct(product.id)}
                  style={{ padding: '8px', background: '#fee2e2', color: '#dc2626', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer', transition: '0.2s', marginTop: 'auto' }}
                >
                  حذف المنتج
                </button>

              </div>
            ))}
          </div>
        ) : (
          <p style={{ textAlign: 'center', padding: '30px', color: '#64748b' }}>لا توجد أي منتجات مضافة حتى الآن.</p>
        )}
      </div>

    </div>
  );
}