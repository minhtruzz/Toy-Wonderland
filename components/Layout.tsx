import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ShoppingCart, Menu, X, Home, Info, User as UserIcon, LogOut, LogIn } from 'lucide-react';
import { User } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  cartCount: number;
  user: User | null;
  onLogout: () => void;
}

export const Layout: React.FC<LayoutProps> = ({ children, cartCount, user, onLogout }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path: string) => location.pathname === path ? "text-yellow-300 font-bold" : "text-white hover:text-yellow-100 transition-colors";

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-cyan-500 to-blue-600 shadow-lg sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="bg-white p-2 rounded-full shadow-md group-hover:rotate-12 transition-transform duration-300">
                <span className="text-2xl">🧸</span>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold text-white tracking-wide leading-none">ToyWonderland</span>
              <span className="text-[10px] text-yellow-200 font-medium uppercase tracking-widest">Thế giới bé yêu</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8 bg-white/10 px-6 py-2 rounded-full backdrop-blur-sm">
            <Link to="/" className={`flex items-center gap-2 text-sm uppercase tracking-wide ${isActive('/')}`}>
              <Home size={18} /> Trang chủ
            </Link>
            <Link to="/about" className={`flex items-center gap-2 text-sm uppercase tracking-wide ${isActive('/about')}`}>
              <Info size={18} /> Giới thiệu
            </Link>
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-4">
             {/* User Menu */}
             <div className="hidden md:flex items-center gap-3 mr-2 border-r border-white/20 pr-4">
                {user ? (
                  <div className="flex items-center gap-3">
                    <Link to="/profile" className="flex items-center gap-2 text-white hover:text-yellow-200 font-medium text-sm">
                      <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center text-yellow-900 font-bold">
                        {user.name.charAt(0)}
                      </div>
                      <span>{user.name}</span>
                    </Link>
                    <button onClick={onLogout} title="Đăng xuất" className="text-white/80 hover:text-white">
                      <LogOut size={18} />
                    </button>
                  </div>
                ) : (
                  <Link to="/login" className="flex items-center gap-1 text-white hover:text-yellow-200 font-medium text-sm">
                    <LogIn size={18} /> Đăng nhập
                  </Link>
                )}
             </div>

            {/* Cart */}
            <Link to="/cart" className="relative p-2 text-white hover:bg-white/20 rounded-full transition-colors">
              <ShoppingCart size={24} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-blue-600 shadow-sm animate-bounce">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Mobile Toggle */}
            <button 
              className="md:hidden text-white p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-blue-700 text-white p-4 space-y-4 shadow-inner border-t border-blue-600">
            <Link to="/" className="block py-2 border-b border-blue-600" onClick={() => setIsMenuOpen(false)}>Trang chủ</Link>
            <Link to="/about" className="block py-2 border-b border-blue-600" onClick={() => setIsMenuOpen(false)}>Giới thiệu</Link>
            <Link to="/cart" className="block py-2 border-b border-blue-600" onClick={() => setIsMenuOpen(false)}>Giỏ hàng ({cartCount})</Link>
            {user ? (
               <>
                 <Link to="/profile" className="block py-2 font-bold text-yellow-300" onClick={() => setIsMenuOpen(false)}>Tài khoản: {user.name}</Link>
                 <button onClick={() => {onLogout(); setIsMenuOpen(false);}} className="block w-full text-left py-2 text-red-300">Đăng xuất</button>
               </>
            ) : (
                 <Link to="/login" className="block py-2 font-bold text-yellow-300" onClick={() => setIsMenuOpen(false)}>Đăng nhập / Đăng ký</Link>
            )}
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-grow container mx-auto px-4 py-8">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-gray-300 pt-12 pb-6">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="col-span-1 md:col-span-1">
            <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="text-3xl">🧸</span> ToyWonderland
            </h3>
            <p className="text-sm text-gray-400 mb-4">
              Thiên đường đồ chơi cho bé, nơi khơi nguồn sáng tạo và niềm vui bất tận.
            </p>
            <div className="flex gap-4">
               {/* Social placeholders */}
               <div className="w-8 h-8 bg-gray-700 rounded-full hover:bg-blue-500 transition-colors cursor-pointer"></div>
               <div className="w-8 h-8 bg-gray-700 rounded-full hover:bg-blue-500 transition-colors cursor-pointer"></div>
               <div className="w-8 h-8 bg-gray-700 rounded-full hover:bg-blue-500 transition-colors cursor-pointer"></div>
            </div>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-4 uppercase text-sm tracking-wider">Khám Phá</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="hover:text-cyan-400 transition-colors">Sản phẩm mới</Link></li>
              <li><Link to="/" className="hover:text-cyan-400 transition-colors">Sản phẩm bán chạy</Link></li>
              <li><Link to="/about" className="hover:text-cyan-400 transition-colors">Về chúng tôi</Link></li>
            </ul>
          </div>

          <div>
             <h4 className="text-white font-bold mb-4 uppercase text-sm tracking-wider">Hỗ Trợ</h4>
             <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-cyan-400 transition-colors">Chính sách đổi trả</a></li>
              <li><a href="#" className="hover:text-cyan-400 transition-colors">Chính sách bảo mật</a></li>
              <li><a href="#" className="hover:text-cyan-400 transition-colors">Hướng dẫn mua hàng</a></li>
             </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4 uppercase text-sm tracking-wider">Liên Hệ</h4>
            <p className="text-sm mb-2"><strong className="text-white">Hotline:</strong> 1900 1234</p>
            <p className="text-sm mb-2"><strong className="text-white">Email:</strong> cskh@toywonderland.vn</p>
            <p className="text-sm"><strong className="text-white">Địa chỉ:</strong> 123 Đường Mơ Ước, Quận 1, TP.HCM</p>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-6 text-center text-xs text-gray-500">
          © 2024 ToyWonderland. All rights reserved.
        </div>
      </footer>
    </div>
  );
};