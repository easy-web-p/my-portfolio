import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// In-Memory Data Store
let stats = {
  totalSales: '฿3,250,000',
  totalSalesGrowth: '+12.5%',
  customers: '1,240',
  customersGrowth: '+8.2%',
  ordersCount: '5,620',
  ordersGrowth: '+14.1%',
  reviews: '4.9',
  reviewsCount: '890'
};

let orders = [
  { id: 1, name: 'iPhone 16 Pro Max 256GB', price: '฿45,000', rawPrice: 45000, customer: 'สมชาย ใจดี', status: 'success', date: '2026-09-08 21:30' },
  { id: 2, name: 'MacBook Air M4 512GB', price: '฿39,000', rawPrice: 39000, customer: 'วิภาดา รักเรียน', status: 'pending', date: '2026-09-08 20:15' },
  { id: 3, name: 'iPad Pro 11" M4', price: '฿29,000', rawPrice: 29000, customer: 'กิตติศักดิ์ มั่นคง', status: 'success', date: '2026-09-08 19:40' },
  { id: 4, name: 'Apple Watch Series 10', price: '฿15,000', rawPrice: 15000, customer: 'นภาพร สดใส', status: 'cancel', date: '2026-09-08 18:20' },
  { id: 5, name: 'AirPods Pro 2 USB-C', price: '฿8,900', rawPrice: 8900, customer: 'ธนวัฒน์ พัฒนา', status: 'success', date: '2026-09-08 17:05' },
  { id: 6, name: 'Magic Keyboard with Touch ID', price: '฿5,900', rawPrice: 5900, customer: 'พิมพิศา งามดี', status: 'pending', date: '2026-09-08 15:50' }
];

let activities = [
  { id: 1, title: 'New Customers', desc: '12 new users registered today', time: '10 นาทีที่แล้ว', change: '+12' },
  { id: 2, title: 'Orders Placed', desc: '28 new orders ready for shipping', time: '25 นาทีที่แล้ว', change: '+28' },
  { id: 3, title: 'Reviews Received', desc: '7 customers gave 5-star rating', time: '1 ชั่วโมงที่แล้ว', change: '+7' },
  { id: 4, title: 'Stock Updated', desc: 'iPhone 16 Pro Max restocked 50 units', time: '3 ชั่วโมงที่แล้ว', change: '📦' }
];

const analytics = {
  monthlyData: [
    { month: 'ม.ค.', sales: 180 },
    { month: 'ก.พ.', sales: 220 },
    { month: 'มี.ค.', sales: 290 },
    { month: 'เม.ย.', sales: 260 },
    { month: 'พ.ค.', sales: 340 },
    { month: 'มิ.ย.', sales: 310 },
    { month: 'ก.ค.', sales: 420 },
    { month: 'ส.ค.', sales: 480 },
    { month: 'ก.ย.', sales: 550 }
  ],
  performance: {
    successRate: 88,
    rating: 4.9,
    positiveRate: 98
  }
};

// API Endpoints

// GET: Dashboard Stats
app.get('/api/stats', (req, res) => {
  res.json({ success: true, data: stats });
});

// GET: Orders list with optional search & filter
app.get('/api/orders', (req, res) => {
  const { search, status } = req.query;
  let filtered = [...orders];

  if (search) {
    const s = search.toLowerCase();
    filtered = filtered.filter(o => 
      o.name.toLowerCase().includes(s) || 
      (o.customer && o.customer.toLowerCase().includes(s))
    );
  }

  if (status && status !== 'all') {
    filtered = filtered.filter(o => o.status === status);
  }

  res.json({ success: true, count: filtered.length, data: filtered });
});

// POST: Add new order
app.post('/api/orders', (req, res) => {
  const { name, price, customer, status } = req.body;
  if (!name || !price) {
    return res.status(400).json({ success: false, message: 'กรุณาระบุชื่อสินค้าและราคา' });
  }

  const numericPrice = typeof price === 'number' ? price : parseFloat(String(price).replace(/[^0-9.]/g, '')) || 0;
  const formattedPrice = `฿${numericPrice.toLocaleString('th-TH')}`;

  const newOrder = {
    id: orders.length > 0 ? Math.max(...orders.map(o => o.id)) + 1 : 1,
    name: name.trim(),
    price: formattedPrice,
    rawPrice: numericPrice,
    customer: customer ? customer.trim() : 'ลูกค้าทั่วไป',
    status: status || 'pending',
    date: new Date().toISOString().replace('T', ' ').substring(0, 16)
  };

  orders.unshift(newOrder);

  // Add activity log
  activities.unshift({
    id: Date.now(),
    title: 'Order Created',
    desc: `New order #${newOrder.id} - ${newOrder.name}`,
    time: 'เมื่อสักครู่',
    change: '+1'
  });

  res.status(201).json({ success: true, message: 'เพิ่มออเดอร์สำเร็จ', data: newOrder });
});

// PATCH: Update order status
app.patch('/api/orders/:id/status', (req, res) => {
  const orderId = parseInt(req.params.id);
  const { status } = req.body;

  const validStatuses = ['success', 'pending', 'cancel'];
  if (!validStatuses.includes(status)) {
    return res.status(400).json({ success: false, message: 'สถานะไม่ถูกต้อง (ต้องเป็น success, pending, หรือ cancel)' });
  }

  const order = orders.find(o => o.id === orderId);
  if (!order) {
    return res.status(404).json({ success: false, message: 'ไม่พบออเดอร์ที่ต้องการ' });
  }

  order.status = status;
  res.json({ success: true, message: 'อัปเดตสถานะสำเร็จ', data: order });
});

// DELETE: Remove order
app.delete('/api/orders/:id', (req, res) => {
  const orderId = parseInt(req.params.id);
  const initialLength = orders.length;
  orders = orders.filter(o => o.id !== orderId);

  if (orders.length === initialLength) {
    return res.status(404).json({ success: false, message: 'ไม่พบออเดอร์ที่ต้องการลบ' });
  }

  res.json({ success: true, message: 'ลบออเดอร์สำเร็จ' });
});

// GET: Analytics & Performance
app.get('/api/analytics', (req, res) => {
  res.json({ success: true, data: analytics });
});

// GET: Activities
app.get('/api/activities', (req, res) => {
  res.json({ success: true, data: activities });
});

// Serve frontend for all other routes
app.use((req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start Server
app.listen(PORT, () => {
  console.log(`\n🚀 Node.js + Express Web Server กำลังทำงานที่:`);
  console.log(`➜ Local:   http://localhost:${PORT}`);
  console.log(`➜ API URL: http://localhost:${PORT}/api/orders\n`);
});
