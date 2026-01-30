import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Checkout } from './pages/Checkout';
import { Admin } from './pages/Admin';
import { Auth } from './pages/Auth';
import { Profile } from './pages/Profile';
import { Product, CartItem, User } from './types';

const App: React.FC = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [user, setUser] = useState<User | null>(null);

  // Persistence
  useEffect(() => {
    const savedCart = localStorage.getItem('toy_cart');
    if (savedCart) setCart(JSON.parse(savedCart));
    
    const savedUser = localStorage.getItem('toy_user');
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  useEffect(() => {
    localStorage.setItem('toy_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    if (user) {
        localStorage.setItem('toy_user', JSON.stringify(user));
    } else {
        localStorage.removeItem('toy_user');
    }
  }, [user]);

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const updateQuantity = (productId: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    setCart(prev => prev.map(item => 
      item.id === productId ? { ...item, quantity: newQuantity } : item
    ));
  };

  const removeFromCart = (productId: number) => {
    setCart(prev => prev.filter(item => item.id !== productId));
  };

  const clearCart = () => setCart([]);
  const handleLogin = (u: User) => setUser(u);
  const handleLogout = () => {
      setUser(null);
      // Optional: Navigate home or login
  };

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <Router>
      <Routes>
        {/* Admin Route - Standalone Layout */}
        <Route path="/admin/*" element={
            user?.role === 'admin' ? <Admin /> : <Navigate to="/login" />
        } />

        {/* User Routes - Wrapped in Main Layout */}
        <Route path="/*" element={
            <Layout cartCount={cartCount} user={user} onLogout={handleLogout}>
                <Routes>
                    <Route path="/" element={<Home onAddToCart={addToCart} />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/cart" element={
                      <Checkout 
                        cart={cart} 
                        clearCart={clearCart} 
                        updateQuantity={updateQuantity}
                        removeFromCart={removeFromCart}
                      />
                    } />
                    <Route path="/login" element={<Auth onLogin={handleLogin} />} />
                    <Route path="/profile" element={
                        user ? <Profile user={user} onLogout={handleLogout} /> : <Navigate to="/login" />
                    } />
                </Routes>
            </Layout>
        } />
      </Routes>
    </Router>
  );
};

export default App;