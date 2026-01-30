import React from 'react';
import { ShoppingCart, Eye } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onViewDetails: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart, onViewDetails }) => {
  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100 group flex flex-col h-full">
      <div className="relative overflow-hidden aspect-square cursor-pointer" onClick={() => onViewDetails(product)}>
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2">
           <button 
             onClick={(e) => { e.stopPropagation(); onViewDetails(product); }}
             className="bg-white text-gray-800 p-2 rounded-full hover:bg-yellow-400 transition-colors"
           >
             <Eye size={20} />
           </button>
           <button 
             onClick={(e) => { e.stopPropagation(); onAddToCart(product); }}
             className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-500 transition-colors"
           >
             <ShoppingCart size={20} />
           </button>
        </div>
        {product.stock < 5 && (
            <span className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full font-bold">
                Sắp hết
            </span>
        )}
      </div>
      
      <div className="p-4 flex flex-col flex-grow">
        <div className="text-xs text-blue-500 font-bold mb-1 uppercase tracking-wider">{product.category}</div>
        <h3 
          className="text-lg font-bold text-gray-800 mb-2 line-clamp-2 cursor-pointer hover:text-blue-600"
          onClick={() => onViewDetails(product)}
        >
            {product.name}
        </h3>
        <p className="text-gray-500 text-sm mb-4 line-clamp-2 flex-grow">{product.description}</p>
        
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
          <span className="text-xl font-bold text-red-600">
            {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.price)}
          </span>
          <button 
            onClick={() => onAddToCart(product)}
            className="bg-blue-100 text-blue-600 hover:bg-blue-600 hover:text-white px-3 py-1.5 rounded-lg text-sm font-semibold transition-colors flex items-center gap-1"
          >
             + Thêm
          </button>
        </div>
      </div>
    </div>
  );
};