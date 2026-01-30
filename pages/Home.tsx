import React, { useState, useMemo } from 'react';
import { ShoppingCart, Star, Sparkles, Rocket } from 'lucide-react';
import { Product, CategoryType } from '../types';
import { MOCK_PRODUCTS } from '../constants';
import { ProductCard } from '../components/ProductCard';
import { Modal } from '../components/Modal';

interface HomeProps {
  onAddToCart: (product: Product) => void;
}

export const Home: React.FC<HomeProps> = ({ onAddToCart }) => {
  const [selectedCategory, setSelectedCategory] = useState<CategoryType | 'ALL'>('ALL');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const filteredProducts = useMemo(() => {
    if (selectedCategory === 'ALL') return MOCK_PRODUCTS;
    return MOCK_PRODUCTS.filter(p => p.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <div>
      {/* Enhanced Hero Banner */}
      <div className="relative bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-[2.5rem] overflow-hidden shadow-2xl mb-16 min-h-[500px] flex items-center">
        {/* Decorative Circles */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-yellow-400/20 rounded-full blur-3xl translate-x-1/3 translate-y-1/3"></div>
        
        <div className="container mx-auto px-6 md:px-12 grid md:grid-cols-2 gap-12 items-center relative z-10">
            <div className="text-white space-y-6">
                <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full text-sm font-bold border border-white/30">
                    <Sparkles size={16} className="text-yellow-300" />
                    <span>Thế giới đồ chơi số 1 Việt Nam</span>
                </div>
                <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                    Khơi Dậy <span className="text-yellow-300">Sáng Tạo</span> <br/>
                    Ươm Mầm <span className="text-cyan-300">Tài Năng</span>
                </h1>
                <p className="text-lg md:text-xl text-indigo-100 max-w-lg leading-relaxed">
                    Khám phá hàng ngàn mẫu đồ chơi giáo dục, lắp ráp và vận động giúp bé phát triển toàn diện cả thể chất lẫn trí tuệ.
                </p>
                <div className="flex gap-4 pt-4">
                    <button 
                         onClick={() => {
                             const el = document.getElementById('products-section');
                             el?.scrollIntoView({ behavior: 'smooth' });
                         }}
                         className="bg-yellow-400 text-yellow-900 px-8 py-4 rounded-full font-bold hover:bg-yellow-300 transition-all shadow-lg hover:shadow-yellow-400/50 flex items-center gap-2 transform hover:-translate-y-1"
                    >
                        <Rocket size={20} /> Khám Phá Ngay
                    </button>
                    <button className="bg-white/10 text-white border border-white/50 px-8 py-4 rounded-full font-bold hover:bg-white/20 transition-all backdrop-blur-sm">
                        Xem Ưu Đãi
                    </button>
                </div>
            </div>
            
            {/* Right Image/Graphic */}
            <div className="relative hidden md:block">
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-full filter blur-xl opacity-50 transform translate-y-10"></div>
                <img 
                    src="https://images.unsplash.com/photo-1596461404942-36815926d239?q=80&w=2070&auto=format&fit=crop" 
                    alt="Happy Kid" 
                    className="relative z-10 w-full h-auto rounded-[2rem] shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-700 border-8 border-white/20"
                />
                
                {/* Floating Badges */}
                <div className="absolute -top-10 -right-10 bg-white p-4 rounded-2xl shadow-xl animate-bounce" style={{animationDuration: '3s'}}>
                    <div className="flex items-center gap-1 text-yellow-500 font-bold text-lg">
                        <Star fill="currentColor" /> 4.9/5
                    </div>
                    <div className="text-gray-500 text-sm">Đánh giá</div>
                </div>
            </div>
        </div>
      </div>

      {/* Category Filter */}
      <div id="products-section" className="mb-12">
        <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-800 mb-3">Danh Mục Sản Phẩm</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-cyan-400 to-blue-600 mx-auto rounded-full"></div>
        </div>
        
        <div className="flex flex-wrap justify-center gap-3 md:gap-4">
          <button 
            onClick={() => setSelectedCategory('ALL')}
            className={`px-6 py-3 rounded-full font-bold text-sm transition-all duration-300 border-2 ${selectedCategory === 'ALL' ? 'bg-blue-600 border-blue-600 text-white shadow-lg transform scale-105' : 'bg-white border-gray-200 text-gray-600 hover:border-blue-300 hover:text-blue-500'}`}
          >
            Tất cả
          </button>
          {Object.values(CategoryType).filter(c => c !== 'Tất cả').map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-6 py-3 rounded-full font-bold text-sm transition-all duration-300 border-2 ${selectedCategory === cat ? 'bg-blue-600 border-blue-600 text-white shadow-lg transform scale-105' : 'bg-white border-gray-200 text-gray-600 hover:border-blue-300 hover:text-blue-500'}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Product Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredProducts.map(product => (
            <ProductCard 
              key={product.id} 
              product={product} 
              onAddToCart={onAddToCart}
              onViewDetails={(p) => setSelectedProduct(p)}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-300">
            <div className="text-6xl mb-4 grayscale opacity-50">🧸</div>
            <p className="text-gray-500 font-medium">Không tìm thấy sản phẩm nào trong danh mục này.</p>
        </div>
      )}

      {/* Product Detail Modal */}
      <Modal 
        isOpen={!!selectedProduct} 
        onClose={() => setSelectedProduct(null)}
        title={selectedProduct?.name}
      >
        {selectedProduct && (
            <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-gray-50 rounded-xl p-4 flex items-center justify-center">
                    <img src={selectedProduct.image} alt={selectedProduct.name} className="w-full h-auto max-h-[400px] object-contain rounded-lg shadow-sm mix-blend-multiply" />
                </div>
                <div className="flex flex-col">
                    <div className="mb-4">
                        <div className="flex items-center justify-between mb-4">
                            <span className="inline-block px-4 py-1 bg-cyan-100 text-cyan-700 rounded-full text-sm font-bold uppercase tracking-wider">
                                {selectedProduct.category}
                            </span>
                            <span className={`text-sm font-bold ${selectedProduct.stock > 0 ? 'text-green-600' : 'text-red-500'}`}>
                                {selectedProduct.stock > 0 ? 'Còn hàng' : 'Hết hàng'}
                            </span>
                        </div>
                        
                        <h3 className="text-3xl font-bold text-gray-800 mb-3 leading-tight">{selectedProduct.name}</h3>
                        
                        <div className="flex items-baseline gap-4 mb-6">
                             <p className="text-4xl font-bold text-red-600">
                                {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(selectedProduct.price)}
                            </p>
                            {/* Fake original price */}
                            <p className="text-lg text-gray-400 line-through">
                                {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(selectedProduct.price * 1.2)}
                            </p>
                        </div>
                        
                        <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 mb-6">
                            <h4 className="font-bold text-gray-700 mb-2">Mô tả sản phẩm:</h4>
                            <p className="text-gray-600 leading-relaxed">
                                {selectedProduct.description}
                            </p>
                        </div>
                        
                        <ul className="space-y-2 mb-8 text-sm text-gray-500">
                            <li className="flex items-center gap-2"><CheckMark /> Cam kết chính hãng 100%</li>
                            <li className="flex items-center gap-2"><CheckMark /> Bảo hành 12 tháng</li>
                            <li className="flex items-center gap-2"><CheckMark /> Đổi trả trong 7 ngày</li>
                        </ul>
                    </div>
                    
                    <div className="mt-auto pt-4 border-t border-gray-100">
                        <button 
                            onClick={() => {
                                onAddToCart(selectedProduct);
                                setSelectedProduct(null);
                            }}
                            className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white py-4 rounded-xl font-bold text-lg hover:from-blue-700 hover:to-cyan-600 transition-all shadow-lg hover:shadow-cyan-500/30 flex items-center justify-center gap-3 group"
                        >
                            <span className="group-hover:scale-110 transition-transform"><ShoppingCart /></span> 
                            Thêm Vào Giỏ Hàng
                        </button>
                    </div>
                </div>
            </div>
        )}
      </Modal>
    </div>
  );
};

const CheckMark = () => (
    <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
);
