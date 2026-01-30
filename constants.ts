import { CategoryType, Product } from './types';

export const MOCK_PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Bộ Lắp Ráp Thành Phố Tương Lai",
    category: CategoryType.LEGO,
    price: 599000,
    image: "https://picsum.photos/seed/lego1/800/800",
    description: "Bộ đồ chơi lắp ráp chi tiết với hơn 500 mảnh ghép, giúp bé phát triển tư duy không gian.",
    stock: 20
  },
  {
    id: 2,
    name: "Gấu Bông Khổng Lồ 1m2",
    category: CategoryType.DOLL,
    price: 350000,
    image: "https://picsum.photos/seed/bear1/800/800",
    description: "Gấu bông cao cấp, lông mềm mịn, an toàn cho da bé.",
    stock: 15
  },
  {
    id: 3,
    name: "Bảng Chữ Cái Thông Minh",
    category: CategoryType.EDUCATION,
    price: 120000,
    image: "https://picsum.photos/seed/edu1/800/800",
    description: "Bảng gỗ học chữ cái và số, sơn an toàn, màu sắc bắt mắt.",
    stock: 50
  },
  {
    id: 4,
    name: "Xe Trượt Scooter Cao Cấp",
    category: CategoryType.OUTDOOR,
    price: 450000,
    image: "https://picsum.photos/seed/scooter/800/800",
    description: "Xe trượt 3 bánh có đèn LED, điều chỉnh độ cao linh hoạt.",
    stock: 10
  },
  {
    id: 5,
    name: "Siêu Xe Điều Khiển Từ Xa",
    category: CategoryType.VEHICLE,
    price: 299000,
    image: "https://picsum.photos/seed/car1/800/800",
    description: "Xe đua tốc độ cao, pin sạc, điều khiển nhạy bén.",
    stock: 30
  },
  {
    id: 6,
    name: "Bộ Xếp Hình Lâu Đài Công Chúa",
    category: CategoryType.LEGO,
    price: 650000,
    image: "https://picsum.photos/seed/castle/800/800",
    description: "Lâu đài màu hồng mơ mộng cho bé gái thỏa sức sáng tạo.",
    stock: 12
  },
  {
    id: 7,
    name: "Búp Bê Thời Trang Cao Cấp",
    category: CategoryType.DOLL,
    price: 180000,
    image: "https://picsum.photos/seed/doll2/800/800",
    description: "Búp bê với 10 bộ váy thay thế, khớp cử động linh hoạt.",
    stock: 25
  },
  {
    id: 8,
    name: "Bộ Thí Nghiệm Khoa Học Vui",
    category: CategoryType.EDUCATION,
    price: 220000,
    image: "https://picsum.photos/seed/science/800/800",
    description: "20 thí nghiệm an toàn giúp bé khám phá thế giới khoa học.",
    stock: 18
  }
];

export const BANK_INFO = {
  bankName: "MB Bank (Ngân hàng Quân Đội)",
  accountNumber: "9999999999",
  accountName: "CONG TY DO CHOI TOYWONDERLAND",
  branch: "Hội Sở Chính"
};
