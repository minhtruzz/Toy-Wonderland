import React, { useState, useEffect } from 'react';
import { MOCK_PRODUCTS } from '../constants';
import { Package, Users, ShoppingBag, Grid, Plus, Trash2, Edit, Search, Bell, LogOut, Eye, CheckCircle, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { CategoryType, Order } from '../types';
import { Modal } from '../components/Modal';

// --- Types bổ sung cho State ---
interface ProductState {
    id: number;
    name: string;
    category: string;
    price: number;
    stock: number;
    image: string;
}

interface CategoryState {
    id: number;
    name: string;
    count: number;
}

interface UserState {
    id: number;
    name: string;
    email: string;
    role: string;
    joinDate: string;
}

export const Admin: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'products' | 'orders' | 'categories' | 'users'>('products');
    const navigate = useNavigate();

    // --- 1. STATE QUẢN LÝ DỮ LIỆU ---
    // Khởi tạo Products từ MOCK_PRODUCTS
    const [products, setProducts] = useState<ProductState[]>(MOCK_PRODUCTS);

    // Khởi tạo Orders từ LocalStorage
    const [orders, setOrders] = useState<Order[]>([]);

    // Khởi tạo Categories (Mock data ban đầu)
    const [categories, setCategories] = useState<CategoryState[]>(
        Object.values(CategoryType).filter(c => c !== 'Tất cả').map((name, index) => ({
            id: index + 1,
            name,
            count: Math.floor(Math.random() * 50) + 10
        }))
    );

    // Khởi tạo Users (Mock data ban đầu)
    const [users, setUsers] = useState<UserState[]>([
        { id: 1, name: 'Nguyễn Văn Admin', email: 'admin@gmail.com', role: 'admin', joinDate: '2023-01-01' },
        { id: 2, name: 'Trần Khách Hàng', email: 'khachhang@gmail.com', role: 'user', joinDate: '2023-05-15' },
        { id: 3, name: 'Lê Thị Demo', email: 'demo@gmail.com', role: 'user', joinDate: '2023-08-20' },
    ]);

    // --- 2. STATE CHO MODAL & FORM ---
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [formType, setFormType] = useState<'product' | 'category' | 'user'>('product');
    const [editingId, setEditingId] = useState<number | null>(null); // null = Thêm mới, number = Sửa

    // Form Data tổng quát
    const [formData, setFormData] = useState({
        name: '',
        price: '',
        category: '',
        stock: '',
        image: '',
        email: '',
        role: 'user'
    });

    // Load orders
    useEffect(() => {
        const savedOrders = localStorage.getItem('toy_orders');
        if (savedOrders) {
            setOrders(JSON.parse(savedOrders));
        }
    }, []);

    // --- 3. XỬ LÝ LOGIC CRUD (THÊM / SỬA / XÓA) ---

    // Mở Form (Reset dữ liệu nếu là thêm mới, Fill dữ liệu nếu là sửa)
    const openForm = (type: 'product' | 'category' | 'user', item?: any) => {
        setFormType(type);
        setEditingId(item ? item.id : null);
        setIsFormOpen(true);

        if (item) {
            // Chế độ Edit
            setFormData({
                name: item.name || '',
                price: item.price ? item.price.toString() : '',
                category: item.category || '',
                stock: item.stock ? item.stock.toString() : '',
                image: item.image || '',
                email: item.email || '',
                role: item.role || 'user'
            });
        } else {
            // Chế độ Add
            setFormData({
                name: '',
                price: '',
                category: Object.values(CategoryType)[0] || '',
                stock: '',
                image: 'https://images.unsplash.com/photo-1558060370-d644479cb673?w=500&q=80', // Default dummy image
                email: '',
                role: 'user'
            });
        }
    };

    // Xóa item
    const handleDelete = (type: 'product' | 'category' | 'user', id: number) => {
        if (!window.confirm('Bạn có chắc chắn muốn xóa không?')) return;

        if (type === 'product') setProducts(prev => prev.filter(p => p.id !== id));
        if (type === 'category') setCategories(prev => prev.filter(c => c.id !== id));
        if (type === 'user') setUsers(prev => prev.filter(u => u.id !== id));
    };

    // Lưu Form (Xử lý cả Thêm mới và Cập nhật)
    const handleSave = () => {
        if (formType === 'product') {
            const newProduct: ProductState = {
                id: editingId || Date.now(),
                name: formData.name,
                price: Number(formData.price),
                category: formData.category,
                stock: Number(formData.stock),
                image: formData.image
            };

            if (editingId) {
                setProducts(prev => prev.map(p => p.id === editingId ? newProduct : p));
            } else {
                setProducts(prev => [newProduct, ...prev]);
            }
        }
        else if (formType === 'category') {
            const newCategory: CategoryState = {
                id: editingId || Date.now(),
                name: formData.name,
                count: editingId ? (categories.find(c => c.id === editingId)?.count || 0) : 0
            };
            if (editingId) {
                setCategories(prev => prev.map(c => c.id === editingId ? newCategory : c));
            } else {
                setCategories(prev => [...prev, newCategory]);
            }
        }
        else if (formType === 'user') {
            const newUser: UserState = {
                id: editingId || Date.now(),
                name: formData.name,
                email: formData.email,
                role: formData.role,
                joinDate: editingId ? (users.find(u => u.id === editingId)?.joinDate || '') : new Date().toISOString().split('T')[0]
            };
            if (editingId) {
                setUsers(prev => prev.map(u => u.id === editingId ? newUser : u));
            } else {
                setUsers(prev => [...prev, newUser]);
            }
        }

        setIsFormOpen(false);
    };

    const handleUpdateOrderStatus = (orderId: string, newStatus: 'paid' | 'shipped') => {
        const updatedOrders = orders.map(o => o.id === orderId ? { ...o, status: newStatus } : o);
        setOrders(updatedOrders as Order[]);
        localStorage.setItem('toy_orders', JSON.stringify(updatedOrders));
        if (selectedOrder && selectedOrder.id === orderId) {
            setSelectedOrder({ ...selectedOrder, status: newStatus });
        }
    };

    const tabs = [
        { id: 'products', label: 'Sản phẩm', icon: Package },
        { id: 'orders', label: 'Đơn hàng', icon: ShoppingBag },
        { id: 'categories', label: 'Danh mục', icon: Grid },
        { id: 'users', label: 'Tài khoản', icon: Users },
    ];

    const renderStatusBadge = (status: string) => {
        switch (status) {
            case 'pending': return <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-bold flex items-center gap-1 w-fit"><Clock size={12} /> Chờ duyệt</span>;
            case 'paid': return <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-bold flex items-center gap-1 w-fit"><CheckCircle size={12} /> Đã thanh toán</span>;
            case 'shipped': return <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold flex items-center gap-1 w-fit"><TruckIcon size={12} /> Đang giao</span>;
            default: return <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-bold">{status}</span>;
        }
    };

    return (
        <div className="flex h-screen bg-gray-100 font-sans">
            {/* Sidebar */}
            <aside className="w-64 bg-slate-900 text-white flex flex-col shadow-2xl z-20">
                <div className="p-6 border-b border-gray-800 flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-2xl">🧸</div>
                    <div className="font-bold text-xl tracking-tight">Admin<span className="text-blue-500">Panel</span></div>
                </div>

                <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
                    <p className="px-4 text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Menu chính</p>
                    {tabs.map((tab) => {
                        const Icon = tab.icon;
                        return (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id as any)}
                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium text-sm ${activeTab === tab.id ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/50' : 'text-gray-400 hover:bg-gray-800 hover:text-white'}`}
                            >
                                <Icon size={20} /> {tab.label}
                            </button>
                        )
                    })}
                </nav>

                <div className="p-4 border-t border-gray-800">
                    <button
                        onClick={() => {
                            localStorage.removeItem('toy_user');
                            navigate('/');
                        }}
                        className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-900/20 rounded-xl transition-colors text-sm font-medium"
                    >
                        <LogOut size={20} /> Đăng xuất
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col overflow-hidden">
                {/* Top Header */}
                <header className="bg-white shadow-sm px-8 py-4 flex justify-between items-center z-10">
                    <h2 className="text-2xl font-bold text-gray-800 capitalize">{tabs.find(t => t.id === activeTab)?.label}</h2>
                    <div className="flex items-center gap-4">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                            <input type="text" placeholder="Tìm kiếm..." className="pl-10 pr-4 py-2 rounded-full border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 w-64 text-sm" />
                        </div>
                        <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-full relative">
                            <Bell size={20} />
                            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                        </button>
                        <div className="w-8 h-8 bg-gradient-to-tr from-blue-500 to-purple-500 rounded-full"></div>
                    </div>
                </header>

                {/* Dashboard Content */}
                <div className="flex-1 overflow-auto p-8">

                    {/* --- PRODUCTS TAB --- */}
                    {activeTab === 'products' && (
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-200">
                            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                                <h3 className="font-bold text-gray-700">Danh sách sản phẩm</h3>
                                <button
                                    onClick={() => openForm('product')}
                                    className="bg-blue-600 text-white px-4 py-2 rounded-lg font-bold flex items-center gap-2 hover:bg-blue-700 transition-colors text-sm shadow-lg shadow-blue-500/30"
                                >
                                    <Plus size={16} /> Thêm Mới
                                </button>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead className="bg-gray-50/50">
                                        <tr>
                                            <th className="p-4 text-xs font-bold text-gray-500 uppercase">ID</th>
                                            <th className="p-4 text-xs font-bold text-gray-500 uppercase">Sản phẩm</th>
                                            <th className="p-4 text-xs font-bold text-gray-500 uppercase">Giá</th>
                                            <th className="p-4 text-xs font-bold text-gray-500 uppercase">Trạng thái</th>
                                            <th className="p-4 text-xs font-bold text-gray-500 uppercase text-right">Hành động</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100">
                                        {products.map((product) => (
                                            <tr key={product.id} className="hover:bg-gray-50/80 transition-colors group">
                                                <td className="p-4 text-gray-500 font-mono text-sm">#{product.id}</td>
                                                <td className="p-4">
                                                    <div className="flex items-center gap-3">
                                                        <img src={product.image} alt="" className="w-10 h-10 rounded-lg object-cover shadow-sm" />
                                                        <div>
                                                            <p className="font-semibold text-gray-800 text-sm">{product.name}</p>
                                                            <p className="text-xs text-gray-500">{product.category}</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="p-4 font-medium text-gray-700">{new Intl.NumberFormat('vi-VN').format(product.price)}₫</td>
                                                <td className="p-4">
                                                    <span className={`px-2 py-1 rounded-full text-xs font-bold ${product.stock < 15 ? 'bg-red-50 text-red-600 border border-red-100' : 'bg-green-50 text-green-600 border border-green-100'}`}>
                                                        {product.stock} trong kho
                                                    </span>
                                                </td>
                                                <td className="p-4 text-right">
                                                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                        <button onClick={() => openForm('product', product)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"><Edit size={16} /></button>
                                                        <button onClick={() => handleDelete('product', product.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg"><Trash2 size={16} /></button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {/* --- ORDERS TAB --- */}
                    {activeTab === 'orders' && (
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-200">
                            <div className="p-6 border-b border-gray-100">
                                <h3 className="font-bold text-gray-700">Danh sách đơn hàng</h3>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead className="bg-gray-50/50">
                                        <tr>
                                            <th className="p-4 text-xs font-bold text-gray-500 uppercase">Mã Đơn</th>
                                            <th className="p-4 text-xs font-bold text-gray-500 uppercase">Khách Hàng</th>
                                            <th className="p-4 text-xs font-bold text-gray-500 uppercase">Ngày Đặt</th>
                                            <th className="p-4 text-xs font-bold text-gray-500 uppercase">Tổng Tiền</th>
                                            <th className="p-4 text-xs font-bold text-gray-500 uppercase">Trạng Thái</th>
                                            <th className="p-4 text-xs font-bold text-gray-500 uppercase text-right">Chi Tiết</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100">
                                        {orders.length > 0 ? orders.map((order) => (
                                            <tr key={order.id} className="hover:bg-gray-50/80 transition-colors">
                                                <td className="p-4 font-mono text-blue-600 font-bold text-sm">{order.id}</td>
                                                <td className="p-4 text-sm font-medium">{order.customerName}</td>
                                                <td className="p-4 text-gray-500 text-sm">{order.date}</td>
                                                <td className="p-4 font-bold text-red-600">{new Intl.NumberFormat('vi-VN').format(order.total)}₫</td>
                                                <td className="p-4">{renderStatusBadge(order.status)}</td>
                                                <td className="p-4 text-right">
                                                    <button
                                                        onClick={() => setSelectedOrder(order)}
                                                        className="p-2 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
                                                    >
                                                        <Eye size={18} />
                                                    </button>
                                                </td>
                                            </tr>
                                        )) : (
                                            <tr>
                                                <td colSpan={6} className="p-8 text-center text-gray-400">Chưa có đơn hàng nào</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {/* --- CATEGORIES TAB --- */}
                    {activeTab === 'categories' && (
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-200">
                            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                                <h3 className="font-bold text-gray-700">Danh mục sản phẩm</h3>
                                <button
                                    onClick={() => openForm('category')}
                                    className="bg-blue-600 text-white px-4 py-2 rounded-lg font-bold flex items-center gap-2 hover:bg-blue-700 text-sm"
                                >
                                    <Plus size={16} /> Thêm Danh Mục
                                </button>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
                                {categories.map((cat) => (
                                    <div key={cat.id} className="p-6 rounded-xl border border-gray-200 hover:border-blue-400 hover:shadow-md transition-all bg-gray-50 flex items-center justify-between group">
                                        <div>
                                            <h4 className="font-bold text-gray-800 text-lg mb-1">{cat.name}</h4>
                                            <p className="text-gray-500 text-sm">{cat.count} sản phẩm</p>
                                        </div>
                                        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button onClick={() => openForm('category', cat)} className="p-2 bg-white text-blue-600 rounded-lg shadow-sm"><Edit size={16} /></button>
                                            <button onClick={() => handleDelete('category', cat.id)} className="p-2 bg-white text-red-600 rounded-lg shadow-sm"><Trash2 size={16} /></button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* --- USERS TAB --- */}
                    {activeTab === 'users' && (
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-200">
                            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                                <h3 className="font-bold text-gray-700">Danh sách tài khoản</h3>
                                {/* NÚT THÊM TÀI KHOẢN MỚI */}
                                <button
                                    onClick={() => openForm('user')}
                                    className="bg-blue-600 text-white px-4 py-2 rounded-lg font-bold flex items-center gap-2 hover:bg-blue-700 transition-colors text-sm shadow-lg shadow-blue-500/30"
                                >
                                    <Plus size={16} /> Thêm Tài khoản
                                </button>
                            </div>
                            <table className="w-full text-left border-collapse">
                                <thead className="bg-gray-50/50">
                                    <tr>
                                        <th className="p-4 text-xs font-bold text-gray-500 uppercase">ID</th>
                                        <th className="p-4 text-xs font-bold text-gray-500 uppercase">Họ Tên</th>
                                        <th className="p-4 text-xs font-bold text-gray-500 uppercase">Email</th>
                                        <th className="p-4 text-xs font-bold text-gray-500 uppercase">Vai trò</th>
                                        <th className="p-4 text-xs font-bold text-gray-500 uppercase">Ngày tham gia</th>
                                        <th className="p-4 text-xs font-bold text-gray-500 uppercase text-right">Hành động</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {users.map(user => (
                                        <tr key={user.id} className="hover:bg-gray-50">
                                            <td className="p-4 text-gray-500">#{user.id}</td>
                                            <td className="p-4 font-bold text-gray-700">{user.name}</td>
                                            <td className="p-4 text-gray-600">{user.email}</td>
                                            <td className="p-4">
                                                <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${user.role === 'admin' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'}`}>
                                                    {user.role}
                                                </span>
                                            </td>
                                            <td className="p-4 text-gray-500 text-sm">{user.joinDate}</td>
                                            <td className="p-4 text-right">
                                                <div className="flex justify-end gap-2">
                                                    <button onClick={() => openForm('user', user)} className="text-gray-400 hover:text-blue-600 p-2"><Edit size={18} /></button>
                                                    <button onClick={() => handleDelete('user', user.id)} className="text-gray-400 hover:text-red-600 p-2"><Trash2 size={18} /></button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </main>

            {/* --- FORM MODAL (THÊM / SỬA) --- */}
            <Modal
                isOpen={isFormOpen}
                onClose={() => setIsFormOpen(false)}
                title={`${editingId ? 'Cập nhật' : 'Thêm mới'} ${formType === 'product' ? 'Sản phẩm' : formType === 'category' ? 'Danh mục' : 'Tài khoản'}`}
            >
                <div className="space-y-4">
                    {formType === 'product' && (
                        <>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Tên sản phẩm</label>
                                <input type="text" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none" placeholder="Nhập tên sản phẩm" />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Giá (VNĐ)</label>
                                    <input type="number" value={formData.price} onChange={e => setFormData({ ...formData, price: e.target.value })} className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none" placeholder="0" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Tồn kho</label>
                                    <input type="number" value={formData.stock} onChange={e => setFormData({ ...formData, stock: e.target.value })} className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none" placeholder="0" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Danh mục</label>
                                <select value={formData.category} onChange={e => setFormData({ ...formData, category: e.target.value })} className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none">
                                    {categories.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">URL Hình ảnh</label>
                                <input type="text" value={formData.image} onChange={e => setFormData({ ...formData, image: e.target.value })} className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none" placeholder="https://..." />
                            </div>
                        </>
                    )}

                    {formType === 'category' && (
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Tên danh mục</label>
                            <input type="text" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none" placeholder="Nhập tên danh mục" />
                        </div>
                    )}

                    {formType === 'user' && (
                        <>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Họ tên</label>
                                <input type="text" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none" placeholder="Nhập họ tên" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                <input type="email" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none" placeholder="email@example.com" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Vai trò</label>
                                <select value={formData.role} onChange={e => setFormData({ ...formData, role: e.target.value })} className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none">
                                    <option value="user">User</option>
                                    <option value="admin">Admin</option>
                                </select>
                            </div>
                        </>
                    )}

                    <div className="pt-4 border-t flex gap-3">
                        <button onClick={() => setIsFormOpen(false)} className="flex-1 py-2 rounded-lg bg-gray-100 text-gray-700 font-bold hover:bg-gray-200">Hủy</button>
                        <button onClick={handleSave} className="flex-1 py-2 rounded-lg bg-blue-600 text-white font-bold hover:bg-blue-700">Lưu</button>
                    </div>
                </div>
            </Modal>

            {/* Order Detail Modal (Giữ nguyên) */}
            <Modal
                isOpen={!!selectedOrder}
                onClose={() => setSelectedOrder(null)}
                title={`Chi tiết đơn hàng ${selectedOrder?.id}`}
            >
                {selectedOrder && (
                    <div className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                                <h4 className="font-bold text-gray-700 mb-3 flex items-center gap-2"><Users size={16} /> Thông tin khách hàng</h4>
                                <p className="text-sm mb-1"><span className="text-gray-500">Họ tên:</span> <span className="font-medium">{selectedOrder.customerName}</span></p>
                                <p className="text-sm mb-1"><span className="text-gray-500">SĐT:</span> <span className="font-medium">{selectedOrder.phone}</span></p>
                                <p className="text-sm"><span className="text-gray-500">Địa chỉ:</span> <span className="font-medium">{selectedOrder.address}</span></p>
                            </div>
                            <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                                <h4 className="font-bold text-gray-700 mb-3 flex items-center gap-2"><ShoppingBag size={16} /> Thông tin đơn hàng</h4>
                                <p className="text-sm mb-1 flex justify-between"><span className="text-gray-500">Trạng thái:</span> {renderStatusBadge(selectedOrder.status)}</p>
                                <p className="text-sm mb-1 flex justify-between"><span className="text-gray-500">Ngày đặt:</span> <span className="font-medium">{selectedOrder.date}</span></p>
                                <p className="text-sm flex justify-between"><span className="text-gray-500">Tổng tiền:</span> <span className="font-bold text-red-600 text-lg">{new Intl.NumberFormat('vi-VN').format(selectedOrder.total)}₫</span></p>
                            </div>
                        </div>

                        <div>
                            <h4 className="font-bold text-gray-700 mb-3">Sản phẩm đã đặt</h4>
                            <div className="border rounded-xl overflow-hidden">
                                <table className="w-full text-left text-sm">
                                    <thead className="bg-gray-100">
                                        <tr>
                                            <th className="p-3">Sản phẩm</th>
                                            <th className="p-3 text-center">SL</th>
                                            <th className="p-3 text-right">Đơn giá</th>
                                            <th className="p-3 text-right">Thành tiền</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y">
                                        {selectedOrder.items.map((item, idx) => (
                                            <tr key={idx}>
                                                <td className="p-3 flex items-center gap-3">
                                                    <img src={item.image} className="w-10 h-10 rounded object-cover border" />
                                                    <span className="font-medium">{item.name}</span>
                                                </td>
                                                <td className="p-3 text-center">x{item.quantity}</td>
                                                <td className="p-3 text-right">{new Intl.NumberFormat('vi-VN').format(item.price)}₫</td>
                                                <td className="p-3 text-right font-bold">{new Intl.NumberFormat('vi-VN').format(item.price * item.quantity)}₫</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {selectedOrder.status === 'pending' && (
                            <div className="flex gap-4 pt-4 border-t">
                                <button
                                    onClick={() => handleUpdateOrderStatus(selectedOrder.id, 'paid')}
                                    className="flex-1 bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 shadow-lg flex items-center justify-center gap-2"
                                >
                                    <CheckCircle size={20} /> Xác nhận đã thanh toán
                                </button>
                            </div>
                        )}
                        {selectedOrder.status === 'paid' && (
                            <div className="flex gap-4 pt-4 border-t">
                                <button
                                    onClick={() => handleUpdateOrderStatus(selectedOrder.id, 'shipped')}
                                    className="flex-1 bg-green-600 text-white py-3 rounded-xl font-bold hover:bg-green-700 shadow-lg flex items-center justify-center gap-2"
                                >
                                    <TruckIcon size={20} /> Xác nhận giao hàng
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </Modal>
        </div>
    );
};

const TruckIcon = ({ size }: { size: number }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="1" y="3" width="15" height="13"></rect>
        <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon>
        <circle cx="5.5" cy="18.5" r="2.5"></circle>
        <circle cx="18.5" cy="18.5" r="2.5"></circle>
    </svg>
);