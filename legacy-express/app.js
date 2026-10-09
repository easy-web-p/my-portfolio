// Douyin Admin - Client Controller (Node.js & Express REST API)

let currentFilter = 'all';
let currentSearch = '';

document.addEventListener('DOMContentLoaded', () => {
  initApp();
});

function initApp() {
  fetchStats();
  fetchOrders();
  fetchAnalytics();
  fetchActivities();
  setupEventListeners();
}

// -------------------------------------------------------------
// EVENT LISTENERS
// -------------------------------------------------------------
function setupEventListeners() {
  // Search input
  const searchInput = document.getElementById('search-input');
  let debounceTimeout;
  searchInput.addEventListener('input', (e) => {
    clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(() => {
      currentSearch = e.target.value.trim();
      fetchOrders();
    }, 300);
  });

  // Filter tabs
  const filterBtns = document.querySelectorAll('.filter-btn');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentFilter = btn.dataset.status;
      fetchOrders();
    });
  });

  // Add Order Modal
  const modal = document.getElementById('modal-add-order');
  const btnAdd = document.getElementById('btn-add-order');
  const btnClose = document.getElementById('modal-close-btn');
  const btnCancel = document.getElementById('modal-cancel-btn');
  const formAddOrder = document.getElementById('add-order-form');

  const openModal = () => modal.classList.add('show');
  const closeModal = () => {
    modal.classList.remove('show');
    formAddOrder.reset();
  };

  btnAdd.addEventListener('click', openModal);
  btnClose.addEventListener('click', closeModal);
  btnCancel.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  // Form Submit (POST /api/orders)
  formAddOrder.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('order-name').value;
    const price = document.getElementById('order-price').value;
    const customer = document.getElementById('order-customer').value;
    const status = document.getElementById('order-status').value;

    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, price: parseFloat(price), customer, status })
      });
      const data = await res.json();

      if (data.success) {
        showToast('✅ เพิ่มออเดอร์ใหม่สำเร็จ');
        closeModal();
        fetchOrders();
        fetchStats();
        fetchActivities();
      } else {
        showToast(`❌ เกิดข้อผิดพลาด: ${data.message}`);
      }
    } catch (err) {
      showToast('❌ ไม่สามารถเชื่อมต่อกับ Express Server ได้');
    }
  });

  // Refresh Analytics Button
  const btnRefresh = document.getElementById('btn-refresh-analytics');
  if (btnRefresh) {
    btnRefresh.addEventListener('click', () => {
      fetchAnalytics();
      showToast('🔄 อัปเดตข้อมูล Analytics แล้ว');
    });
  }

  // Notification Button
  const btnNotify = document.getElementById('btn-notify');
  if (btnNotify) {
    btnNotify.addEventListener('click', () => {
      showToast('🔔 ไม่มีข้อความแจ้งเตือนใหม่ในขณะนี้');
    });
  }
}

// -------------------------------------------------------------
// API FETCH FUNCTIONS
// -------------------------------------------------------------

// Fetch Stats
async function fetchStats() {
  try {
    const res = await fetch('/api/stats');
    const result = await res.json();
    if (result.success && result.data) {
      const { totalSales, totalSalesGrowth, customers, customersGrowth, ordersCount, ordersGrowth, reviews } = result.data;
      document.getElementById('stat-sales').textContent = totalSales;
      document.getElementById('stat-sales-growth').textContent = `↑ ${totalSalesGrowth} เดือนนี้`;
      document.getElementById('stat-customers').textContent = customers;
      document.getElementById('stat-customers-growth').textContent = `↑ ${customersGrowth} Active`;
      document.getElementById('stat-orders').textContent = ordersCount;
      document.getElementById('stat-orders-growth').textContent = `↑ ${ordersGrowth} สำเร็จ`;
      document.getElementById('stat-reviews').textContent = reviews;
    }
  } catch (err) {
    console.error('Error fetching stats:', err);
  }
}

// Fetch Orders
async function fetchOrders() {
  try {
    const params = new URLSearchParams();
    if (currentSearch) params.append('search', currentSearch);
    if (currentFilter && currentFilter !== 'all') params.append('status', currentFilter);

    const res = await fetch(`/api/orders?${params.toString()}`);
    const result = await res.json();
    
    if (result.success) {
      renderOrdersTable(result.data);
      const navOrderCount = document.getElementById('nav-order-count');
      if (navOrderCount) navOrderCount.textContent = result.count;
      document.getElementById('orders-subtitle').textContent = `พบ ${result.count} รายการคำสั่งซื้อ (จาก Node.js API)`;
    }
  } catch (err) {
    console.error('Error fetching orders:', err);
    document.getElementById('orders-tbody').innerHTML = `
      <tr>
        <td colspan="5" style="text-align:center; color:#ef4444; padding:20px;">
          ❌ ไม่สามารถดึงข้อมูลจาก Node.js API ได้
        </td>
      </tr>
    `;
  }
}

// Render Orders Table
function renderOrdersTable(orders) {
  const tbody = document.getElementById('orders-tbody');
  if (!orders || orders.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="5" style="text-align:center; padding:30px; color:#94a3b8;">
          🔍 ไม่พบรายการคำสั่งซื้อที่ตรงกับเงื่อนไข
        </td>
      </tr>
    `;
    return;
  }

  const statusLabels = {
    success: 'Completed',
    pending: 'Shipping',
    cancel: 'Cancelled'
  };

  tbody.innerHTML = orders.map(order => `
    <tr>
      <td>
        <div class="product-cell">${escapeHtml(order.name)}</div>
        <div style="font-size:11px; color:#94a3b8;">ID: #${order.id} | ${order.date || ''}</div>
      </td>
      <td>
        <div class="customer-cell">👤 ${escapeHtml(order.customer || 'ลูกค้าทั่วไป')}</div>
      </td>
      <td>
        <div class="price-cell">${order.price}</div>
      </td>
      <td>
        <span class="status-badge ${order.status}">
          ● ${statusLabels[order.status] || order.status}
        </span>
      </td>
      <td>
        <div class="actions-cell">
          <select class="btn-status-toggle" onchange="changeOrderStatus(${order.id}, this.value)" title="เปลี่ยนสถานะ">
            <option value="pending" ${order.status === 'pending' ? 'selected' : ''}>Shipping</option>
            <option value="success" ${order.status === 'success' ? 'selected' : ''}>Completed</option>
            <option value="cancel" ${order.status === 'cancel' ? 'selected' : ''}>Cancelled</option>
          </select>
          <button class="btn-delete" onclick="deleteOrder(${order.id})" title="ลบออเดอร์">🗑️</button>
        </div>
      </td>
    </tr>
  `).join('');
}

// Change Order Status (PATCH /api/orders/:id/status)
window.changeOrderStatus = async function(id, newStatus) {
  try {
    const res = await fetch(`/api/orders/${id}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: newStatus })
    });
    const data = await res.json();
    if (data.success) {
      showToast(`⚡ อัปเดตสถานะออเดอร์ #${id} เรียบร้อยแล้ว`);
      fetchOrders();
    } else {
      showToast(`❌ ${data.message}`);
    }
  } catch (err) {
    showToast('❌ ไม่สามารถอัปเดตสถานะได้');
  }
};

// Delete Order (DELETE /api/orders/:id)
window.deleteOrder = async function(id) {
  if (!confirm(`ต้องการลบออเดอร์ #${id} ใช่หรือไม่?`)) return;

  try {
    const res = await fetch(`/api/orders/${id}`, {
      method: 'DELETE'
    });
    const data = await res.json();
    if (data.success) {
      showToast(`🗑️ ลบออเดอร์ #${id} เรียบร้อยแล้ว`);
      fetchOrders();
      fetchStats();
    } else {
      showToast(`❌ ${data.message}`);
    }
  } catch (err) {
    showToast('❌ ไม่สามารถลบออเดอร์ได้');
  }
};

// Fetch Analytics & Performance
async function fetchAnalytics() {
  try {
    const res = await fetch('/api/analytics');
    const result = await res.json();
    if (result.success && result.data) {
      const { performance } = result.data;
      if (performance) {
        document.getElementById('perf-rate').textContent = `${performance.successRate}%`;
        document.getElementById('perf-bar').style.width = `${performance.successRate}%`;
        document.getElementById('perf-rating').textContent = performance.rating;
        document.getElementById('perf-positive').textContent = `${performance.positiveRate}%`;
      }
    }
  } catch (err) {
    console.error('Error fetching analytics:', err);
  }
}

// Fetch Activities
async function fetchActivities() {
  try {
    const res = await fetch('/api/activities');
    const result = await res.json();
    if (result.success && result.data) {
      const container = document.getElementById('activity-list');
      container.innerHTML = result.data.map(item => `
        <div class="activity-item">
          <div>
            <h4>${escapeHtml(item.title)}</h4>
            <p>${escapeHtml(item.desc)} • <span style="color:#94a3b8;">${item.time}</span></p>
          </div>
          <span class="activity-badge">${item.change}</span>
        </div>
      `).join('');
    }
  } catch (err) {
    console.error('Error fetching activities:', err);
  }
}

// Utility: Show Toast
function showToast(message) {
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.style.display = 'block';
  setTimeout(() => {
    toast.style.display = 'none';
  }, 3000);
}

// Utility: Escape HTML
function escapeHtml(str) {
  if (!str) return '';
  return String(str).replace(/[&<>"']/g, (m) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  })[m]);
}
