import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User } from '../types';

interface AuthProps {
  onLogin: (user: User) => void;
}

export const Auth: React.FC<AuthProps> = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    confirmPassword: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Hardcoded Admin Logic
    if (isLogin && formData.email === 'admin@gmail.com' && formData.password === '123') {
        const adminUser: User = {
            id: 'admin-1',
            name: 'Administrator',
            email: 'admin@gmail.com',
            role: 'admin'
        };
        onLogin(adminUser);
        navigate('/admin');
        return;
    }

    // Mock User Login
    const mockUser: User = {
        id: 'user-' + Date.now(),
        name: isLogin ? 'Khách hàng Demo' : formData.name,
        email: formData.email,
        role: 'user',
        phone: '0901234567',
        address: 'Hồ Chí Minh, Việt Nam'
    };
    
    // Simulate API delay
    setTimeout(() => {
        onLogin(mockUser);
        navigate('/');
    }, 500);
  };

  return (
    <div className="max-w-md mx-auto my-10">
      <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
        <div className="bg-gradient-to-r from-blue-500 to-cyan-500 p-8 text-center text-white">
            <div className="text-4xl mb-2">🧸</div>
            <h2 className="text-2xl font-bold">{isLogin ? 'Chào Mừng Trở Lại' : 'Tạo Tài Khoản Mới'}</h2>
            <p className="text-blue-100 mt-2 text-sm">Cùng khám phá thế giới đồ chơi tuyệt vời!</p>
        </div>
        
        <div className="p-8">
            <form onSubmit={handleSubmit} className="space-y-4">
                {!isLogin && (
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1">Họ tên</label>
                        <input 
                            name="name" type="text" required 
                            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
                            placeholder="Nhập họ tên của bạn"
                            onChange={handleChange}
                        />
                    </div>
                )}
                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">Email</label>
                    <input 
                        name="email" type="email" required 
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
                        placeholder="email@example.com"
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">Mật khẩu</label>
                    <input 
                        name="password" type="password" required 
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
                        placeholder="••••••••"
                        onChange={handleChange}
                    />
                </div>
                {!isLogin && (
                     <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1">Nhập lại mật khẩu</label>
                        <input 
                            name="confirmPassword" type="password" required 
                            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
                            placeholder="••••••••"
                            onChange={handleChange}
                        />
                    </div>
                )}

                <button 
                    type="submit"
                    className="w-full bg-blue-600 text-white font-bold py-3 rounded-xl hover:bg-blue-700 transition-colors shadow-lg mt-6"
                >
                    {isLogin ? 'Đăng Nhập' : 'Đăng Ký'}
                </button>
            </form>
            
            <div className="mt-6 text-center">
                <p className="text-gray-600 text-sm">
                    {isLogin ? 'Chưa có tài khoản?' : 'Đã có tài khoản?'}
                    <button 
                        onClick={() => setIsLogin(!isLogin)}
                        className="text-blue-600 font-bold ml-1 hover:underline"
                    >
                        {isLogin ? 'Đăng ký ngay' : 'Đăng nhập'}
                    </button>
                </p>
                {isLogin && (
                    <div className="mt-4 p-3 bg-yellow-50 rounded-lg text-xs text-yellow-800 border border-yellow-200">
                        <p><strong>Admin Demo:</strong> admin@gmail.com / 123</p>
                        <p><strong>User Demo:</strong> Bất kỳ email nào</p>
                    </div>
                )}
            </div>
        </div>
      </div>
    </div>
  );
};