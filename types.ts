export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  image: string;
  description: string;
  stock: number;
}

export interface CartItem extends Product {
  quantity: number;
}

export enum CategoryType {
  ALL = 'Tất cả',
  LEGO = 'Lego & Lắp ráp',
  DOLL = 'Búp bê & Gấu bông',
  EDUCATION = 'Giáo dục & Trí tuệ',
  OUTDOOR = 'Vận động ngoài trời',
  VEHICLE = 'Xe mô hình'
}

export interface Order {
  id: string;
  customerName: string;
  phone: string;
  address: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'paid' | 'shipped';
  date: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  phone?: string;
  address?: string;
}
