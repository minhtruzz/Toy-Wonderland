import React, { useState } from 'react';
import { CartItem } from '../types';
import { BANK_INFO } from '../constants';
import { Modal } from '../components/Modal';
import { CheckCircle, Copy, CreditCard, Truck, Trash2, Plus, Minus, Loader2, Clock, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

interface CheckoutProps {
  cart: CartItem[];
  clearCart: () => void;
  updateQuantity: (id: number, quantity: number) => void;
  removeFromCart: (id: number) => void;
}

export const Checkout: React.FC<CheckoutProps> = ({ cart, clearCart, updateQuantity, removeFromCart }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    note: ''
  });
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  
  // Payment Flow States
  const [paymentStep, setPaymentStep] = useState<'qr' | 'checking' | 'manual_pending'>('qr');

  const totalAmount = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shippingFee = 30000;
  const finalTotal = totalAmount + shippingFee;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return;
    setPaymentStep('qr'); // Reset step
    setShowPaymentModal(true);
  };

  const handleConfirmPayment = () => {
    setPaymentStep('checking');
    
    // Simulate Checking Transaction (Auto-check logic)
    setTimeout(() => {
        // Fallback to manual check
        setPaymentStep('manual_pending');
    }, 3000);
  };

  const handleFinishOrder = () => {
    setOrderSuccess(true);
    setShowPaymentModal(false);
    clearCart();
    
    // Save order to localStorage (Mock Database)
    const newOrder = {
        id: `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
        customerName: formData.name,
        phone: formData.phone,
        address: formData.address,
        items: cart,
        total: finalTotal,
        status: 'pending', // Chờ duyệt
        date: new Date().toISOString().split('T')[0]
    };
    
    const existingOrders = JSON.parse(localStorage.getItem('toy_orders') || '[]');
    localStorage.setItem('toy_orders', JSON.stringify([newOrder, ...existingOrders]));
  };

  if (cart.length === 0 && !orderSuccess) {
      return (
          <div className="text-center py-20 bg-white rounded-3xl shadow-sm">
              <div className="text-6xl mb-4">🛒</div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Giỏ hàng trống</h2>
              <p className="text-gray-500 mb-8">Hãy chọn thêm vài món đồ chơi thú vị nhé!</p>
              <Link to="/" className="bg-blue-600 text-white px-6 py-2 rounded-full font-bold hover:bg-blue-500">Quay lại mua sắm</Link>
          </div>
      )
  }

  if (orderSuccess) {
    return (
        <div className="text-center py-20 bg-white rounded-3xl shadow-sm animate-fade-in max-w-2xl mx-auto">
            <div className="w-24 h-24 bg-yellow-100 text-yellow-600 rounded-full flex items-center justify-center mx-auto mb-6 relative">
                <Clock size={48} />
                <div className="absolute -bottom-2 -right-2 bg-green-500 text-white p-2 rounded-full border-4 border-white">
                    <CheckCircle size={16} />
                </div>
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Đơn Hàng Đang Chờ Duyệt</h2>
            <div className="bg-yellow-50 p-6 rounded-xl border border-yellow-100 mb-8 text-left max-w-lg mx-auto">
                <p className="text-gray-700 mb-2 font-semibold">Cảm ơn bạn đã thanh toán!</p>
                <p className="text-gray-600 text-sm mb-4">
                    Chúng tôi đã nhận được thông báo thanh toán của bạn. Người bán sẽ kiểm tra giao dịch và xác nhận đơn hàng trong thời gian sớm nhất (thường từ 5-10 phút).
                </p>
                <p className="text-gray-600 text-sm">
                    Mã đơn hàng: <span className="font-mono font-bold text-gray-800">#{`ORD-${Math.floor(1000 + Math.random() * 9000)}`}</span>
                </p>
            </div>
            <div className="flex gap-4 justify-center">
                <Link to="/" className="bg-gray-100 text-gray-700 px-6 py-3 rounded-full font-bold hover:bg-gray-200">
                    Về trang chủ
                </Link>
                <Link to="/profile" className="bg-blue-600 text-white px-8 py-3 rounded-full font-bold hover:bg-blue-500 shadow-lg">
                    Theo dõi đơn hàng
                </Link>
            </div>
        </div>
    )
  }

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      {/* Order Info Form */}
      <div className="bg-white p-6 md:p-8 rounded-3xl shadow-lg h-fit order-2 lg:order-1">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <Truck className="text-blue-500" /> Thông Tin Giao Hàng
        </h2>
        <form onSubmit={handlePlaceOrder} className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Họ và tên</label>
                <input 
                    required type="text" name="name" value={formData.name} onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                    placeholder="Nguyễn Văn A"
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Số điện thoại</label>
                <input 
                    required type="tel" name="phone" value={formData.phone} onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                    placeholder="09xx xxx xxx"
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Địa chỉ nhận hàng</label>
                <textarea 
                    required name="address" value={formData.address} onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all h-24 resize-none"
                    placeholder="Số nhà, đường, phường/xã, quận/huyện..."
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Ghi chú (tùy chọn)</label>
                <input 
                    type="text" name="note" value={formData.note} onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                    placeholder="Giao hàng giờ hành chính..."
                />
            </div>
            
            <button 
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all mt-4"
            >
                Tiến Hành Thanh Toán
            </button>
        </form>
      </div>

      {/* Cart Summary */}
      <div className="bg-white p-6 md:p-8 rounded-3xl shadow-lg h-fit sticky top-24 order-1 lg:order-2">
        <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center justify-between">
            <span>Đơn Hàng Của Bạn</span>
            <span className="text-sm font-normal text-gray-500">{cart.reduce((a, b) => a + b.quantity, 0)} sản phẩm</span>
        </h2>
        <div className="space-y-4 mb-6 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
            {cart.map((item) => (
                <div key={item.id} className="flex gap-4 p-3 rounded-xl border border-gray-100 hover:border-blue-100 transition-colors bg-gray-50/50">
                    <img src={item.image} alt={item.name} className="w-20 h-20 rounded-lg object-cover bg-white" />
                    <div className="flex-grow flex flex-col justify-between">
                        <div className="flex justify-between items-start gap-2">
                            <h4 className="font-semibold text-gray-800 line-clamp-2 text-sm">{item.name}</h4>
                            <button 
                                onClick={() => removeFromCart(item.id)}
                                className="text-gray-400 hover:text-red-500 transition-colors p-1"
                            >
                                <Trash2 size={16} />
                            </button>
                        </div>
                        
                        <div className="flex justify-between items-end mt-2">
                             <div className="flex items-center bg-white border border-gray-200 rounded-lg">
                                <button 
                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                    disabled={item.quantity <= 1}
                                    className="p-1 hover:bg-gray-100 text-gray-600 disabled:opacity-30 disabled:hover:bg-transparent rounded-l-lg"
                                >
                                    <Minus size={14} />
                                </button>
                                <span className="px-2 text-sm font-semibold w-8 text-center">{item.quantity}</span>
                                <button 
                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                    className="p-1 hover:bg-gray-100 text-gray-600 rounded-r-lg"
                                >
                                    <Plus size={14} />
                                </button>
                            </div>
                            <span className="font-bold text-blue-600">
                                {new Intl.NumberFormat('vi-VN').format(item.price * item.quantity)}₫
                            </span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
        
        <div className="space-y-3 border-t border-gray-200 pt-6">
            <div className="flex justify-between text-gray-600">
                <span>Tạm tính:</span>
                <span className="font-medium">{new Intl.NumberFormat('vi-VN').format(totalAmount)}₫</span>
            </div>
            <div className="flex justify-between text-gray-600">
                <span>Phí vận chuyển:</span>
                <span className="font-medium">{new Intl.NumberFormat('vi-VN').format(shippingFee)}₫</span>
            </div>
            <div className="flex justify-between items-center text-xl font-bold text-gray-800 pt-4 border-t border-dashed border-gray-200 mt-2">
                <span>Tổng cộng:</span>
                <span className="text-red-600 text-2xl">{new Intl.NumberFormat('vi-VN').format(finalTotal)}₫</span>
            </div>
        </div>
      </div>

      {/* Payment Modal */}
      <Modal isOpen={showPaymentModal} onClose={() => setShowPaymentModal(false)} title="Thanh Toán Chuyển Khoản">
        <div className="text-center">
            {paymentStep === 'qr' && (
                <>
                    <p className="text-gray-600 mb-6">Vui lòng quét mã QR hoặc chuyển khoản theo thông tin dưới đây để hoàn tất đơn hàng.</p>
                    
                    <div className="bg-blue-50 p-6 rounded-2xl border-2 border-blue-100 mb-6 relative overflow-hidden">
                        {/* Fake QR for visual */}
                        <div className="bg-white w-48 h-48 mx-auto mb-4 p-2 rounded-lg shadow-sm border border-gray-200 flex items-center justify-center">
                            <img src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${BANK_INFO.accountNumber}`} alt="QR Code" className="w-full h-full" />
                        </div>
                        
                        <div className="space-y-3 text-left max-w-sm mx-auto">
                            <div className="flex justify-between items-center bg-white p-3 rounded-lg shadow-sm">
                                <span className="text-sm text-gray-500">Ngân hàng</span>
                                <span className="font-bold text-blue-800">{BANK_INFO.bankName}</span>
                            </div>
                            <div className="flex justify-between items-center bg-white p-3 rounded-lg shadow-sm">
                                <span className="text-sm text-gray-500">Số tài khoản</span>
                                <div className="flex items-center gap-2">
                                    <span className="font-bold text-gray-800">{BANK_INFO.accountNumber}</span>
                                    <button className="text-blue-500 hover:bg-blue-50 p-1 rounded"><Copy size={16} /></button>
                                </div>
                            </div>
                            <div className="flex justify-between items-center bg-white p-3 rounded-lg shadow-sm">
                                <span className="text-sm text-gray-500">Chủ tài khoản</span>
                                <span className="font-bold text-gray-800 text-sm">{BANK_INFO.accountName}</span>
                            </div>
                            <div className="flex justify-between items-center bg-white p-3 rounded-lg shadow-sm border-l-4 border-red-500">
                                <span className="text-sm text-gray-500">Số tiền</span>
                                <span className="font-bold text-red-600 text-lg">{new Intl.NumberFormat('vi-VN').format(finalTotal)}₫</span>
                            </div>
                            <div className="flex justify-between items-center bg-white p-3 rounded-lg shadow-sm">
                                <span className="text-sm text-gray-500">Nội dung CK</span>
                                <span className="font-bold text-blue-600">TOY {formData.phone}</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-4">
                        <button 
                            onClick={() => setShowPaymentModal(false)}
                            className="flex-1 py-3 border border-gray-300 rounded-xl font-semibold text-gray-600 hover:bg-gray-50"
                        >
                            Hủy bỏ
                        </button>
                        <button 
                            onClick={handleConfirmPayment}
                            className="flex-1 py-3 bg-green-600 text-white rounded-xl font-bold hover:bg-green-500 shadow-lg flex items-center justify-center gap-2"
                        >
                            <CreditCard size={20} /> Xác nhận đã chuyển
                        </button>
                    </div>
                </>
            )}

            {paymentStep === 'checking' && (
                <div className="py-12 flex flex-col items-center">
                    <Loader2 size={64} className="text-blue-500 animate-spin mb-6" />
                    <h3 className="text-xl font-bold text-gray-800 mb-2">Đang kiểm tra giao dịch...</h3>
                    <p className="text-gray-500">Vui lòng đợi trong giây lát, hệ thống đang quét dữ liệu ngân hàng.</p>
                </div>
            )}

            {paymentStep === 'manual_pending' && (
                <div className="py-6 flex flex-col items-center animate-fade-in">
                    <div className="w-20 h-20 bg-orange-100 text-orange-500 rounded-full flex items-center justify-center mb-6">
                        <AlertCircle size={40} />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">Chờ Xác Nhận Thủ Công</h3>
                    <div className="bg-orange-50 border border-orange-100 rounded-xl p-4 mb-8 text-sm text-orange-800 text-left w-full max-w-sm">
                        <p className="font-semibold mb-1">Hệ thống chưa nhận được tiền tự động.</p>
                        <p>Đừng lo lắng! Yêu cầu của bạn đã được chuyển sang chế độ chờ duyệt. Vui lòng nhấn <strong>"Hoàn tất"</strong> để tạo đơn hàng. Người bán sẽ kiểm tra và duyệt đơn trong 5-10 phút.</p>
                    </div>
                    
                    <button 
                        onClick={handleFinishOrder}
                        className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 shadow-lg"
                    >
                        Hoàn tất đặt hàng
                    </button>
                </div>
            )}
        </div>
      </Modal>
    </div>
  );
};