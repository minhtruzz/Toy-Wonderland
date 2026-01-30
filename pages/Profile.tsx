import React from 'react';
import { User } from '../types';
import { Package, User as UserIcon, MapPin, Phone, LogOut } from 'lucide-react';
import { MOCK_PRODUCTS } from '../constants';

interface ProfileProps {
  user: User;
  onLogout: () => void;
}

export const Profile: React.FC<ProfileProps> = ({ user, onLogout }) => {
  // Mock Order History
  const mockOrders = [
    { id: 'ORD-9921', date: '2024-05-20', total: 850000, status: 'Đang giao', items: [MOCK_PRODUCTS[0]] },
    { id: 'ORD-8812', date: '2024-04-15', total: 350000, status: 'Hoàn thành', items: [MOCK_PRODUCTS[1]] },
  ];

  return (
    <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
      {/* Sidebar Info */}
      <div className="md:col-span-1">
        <div className="bg-white rounded-3xl shadow-lg p-8 text-center sticky top-24">
            <div className="w-24 h-24 bg-yellow-400 rounded-full mx-auto flex items-center justify-center text-4xl font-bold text-yellow-900 mb-4 shadow-inner">
                {user.name.charAt(0)}
            </div>
            <h2 className="text-xl font-bold text-gray-800 mb-1">{user.name}</h2>
            <p className="text-gray-500 text-sm mb-6">{user.email}</p>
            
            <div className="space-y-4 text-left text-sm text-gray-600 border-t border-gray-100 pt-6">
                <div className="flex items-center gap-3">
                    <Phone size={18} className="text-blue-500" />
                    <span>{user.phone || 'Chưa cập nhật SĐT'}</span>
                </div>
                <div className="flex items-center gap-3">
                    <MapPin size={18} className="text-blue-500" />
                    <span>{user.address || 'Chưa cập nhật địa chỉ'}</span>
                </div>
            </div>

            <button 
                onClick={onLogout}
                className="w-full mt-8 border border-red-200 text-red-500 py-2 rounded-xl font-bold hover:bg-red-50 flex items-center justify-center gap-2 transition-colors"
            >
                <LogOut size={18} /> Đăng Xuất
            </button>
        </div>
      </div>

      {/* Main Content: Orders */}
      <div className="md:col-span-2 space-y-6">
        <h3 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <Package className="text-blue-600" /> Lịch Sử Đơn Hàng
        </h3>
        
        {mockOrders.length > 0 ? (
            mockOrders.map(order => (
                <div key={order.id} className="bg-white rounded-2xl shadow-md p-6 border border-gray-100">
                    <div className="flex justify-between items-start mb-4 pb-4 border-b border-gray-100">
                        <div>
                            <span className="font-bold text-gray-800 text-lg">{order.id}</span>
                            <p className="text-sm text-gray-500">Ngày đặt: {order.date}</p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-sm font-bold ${order.status === 'Hoàn thành' ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-600'}`}>
                            {order.status}
                        </span>
                    </div>
                    
                    <div className="space-y-4 mb-4">
                        {order.items.map((item, idx) => (
                             <div key={idx} className="flex gap-4 items-center">
                                <img src={item.image} alt="" className="w-16 h-16 rounded-lg object-cover" />
                                <div>
                                    <p className="font-medium text-gray-800">{item.name}</p>
                                    <p className="text-sm text-gray-500">x1</p>
                                </div>
                             </div>
                        ))}
                    </div>
                    
                    <div className="flex justify-end pt-2">
                        <p className="text-gray-600">Tổng tiền: <span className="text-xl font-bold text-red-600">{new Intl.NumberFormat('vi-VN').format(order.total)}₫</span></p>
                    </div>
                </div>
            ))
        ) : (
            <div className="bg-white rounded-2xl p-10 text-center text-gray-500">
                <p>Bạn chưa có đơn hàng nào.</p>
            </div>
        )}
      </div>
    </div>
  );
};