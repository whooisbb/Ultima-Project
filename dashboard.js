/**
 * NGOFFEE - Dashboard JavaScript
 * Handles: Login, Kasir, Kitchen, Admin dashboard functionality
 */

// ============================================================
// SAMPLE DATA
// ============================================================
const sampleOrders = [
  { id: 'NGF-20241021-0001', room: '201', items: [{ name: 'Cappuccino', qty: 2, price: 28000 }, { name: 'Croissant', qty: 1, price: 18000 }], total: 74000, payment: 'QRIS', status: 'pending', time: '08:15' },
  { id: 'NGF-20241021-0002', room: '103', items: [{ name: 'Nasi Goreng Spesial', qty: 1, price: 35000 }, { name: 'Thai Tea', qty: 2, price: 22000 }], total: 79000, payment: 'Cash', status: 'pending', time: '08:30' },
  { id: 'NGF-20241021-0003', room: '302', items: [{ name: 'Chicken Katsu', qty: 1, price: 42000 }, { name: 'Matcha Latte', qty: 1, price: 28000 }], total: 70000, payment: 'QRIS', status: 'processing', time: '09:00' },
  { id: 'NGF-20241021-0004', room: '101', items: [{ name: 'Americano', qty: 3, price: 22000 }, { name: 'Brownies', qty: 2, price: 25000 }], total: 116000, payment: 'QRIS', status: 'ready', time: '09:15' },
  { id: 'NGF-20241021-0005', room: '204', items: [{ name: 'Beef Burger', qty: 2, price: 45000 }, { name: 'French Fries', qty: 2, price: 20000 }, { name: 'Fresh Orange', qty: 2, price: 20000 }], total: 170000, payment: 'Cash', status: 'delivered', time: '09:45' },
  { id: 'NGF-20241021-0006', room: '303', items: [{ name: 'Pasta Carbonara', qty: 1, price: 40000 }, { name: 'Caffe Latte', qty: 1, price: 26000 }], total: 66000, payment: 'QRIS', status: 'completed', time: '10:00' },
  { id: 'NGF-20241021-0007', room: '102', items: [{ name: 'Mocha Latte', qty: 2, price: 32000 }, { name: 'Churros', qty: 1, price: 22000 }], total: 86000, payment: 'Cash', status: 'pending', time: '10:30' },
  { id: 'NGF-20241021-0008', room: '301', items: [{ name: 'Vanilla Latte', qty: 1, price: 30000 }, { name: 'Roti Bakar', qty: 2, price: 15000 }], total: 60000, payment: 'QRIS', status: 'processing', time: '10:45' },
];

const sampleStaff = [
  { name: 'Admin Utama', username: 'admin', role: 'Admin', status: 'Aktif', lastLogin: '21 Okt 2024, 07:00' },
  { name: 'Siti Kasir', username: 'siti_kasir', role: 'Kasir', status: 'Aktif', lastLogin: '21 Okt 2024, 07:30' },
  { name: 'Budi Kitchen', username: 'budi_kitchen', role: 'Kitchen', status: 'Aktif', lastLogin: '21 Okt 2024, 07:45' },
  { name: 'Rina Kasir', username: 'rina_kasir', role: 'Kasir', status: 'Aktif', lastLogin: '20 Okt 2024, 14:00' },
  { name: 'Andi Kitchen', username: 'andi_kitchen', role: 'Kitchen', status: 'Nonaktif', lastLogin: '19 Okt 2024, 10:00' },
];

const sampleRooms = [
  { number: '101', floor: 1, type: 'Standard', status: 'Terisi', qr: 'Aktif' },
  { number: '102', floor: 1, type: 'Standard', status: 'Terisi', qr: 'Aktif' },
  { number: '103', floor: 1, type: 'Deluxe', status: 'Terisi', qr: 'Aktif' },
  { number: '201', floor: 2, type: 'Standard', status: 'Terisi', qr: 'Aktif' },
  { number: '202', floor: 2, type: 'Deluxe', status: 'Kosong', qr: 'Aktif' },
  { number: '203', floor: 2, type: 'Suite', status: 'Terisi', qr: 'Aktif' },
  { number: '301', floor: 3, type: 'Standard', status: 'Terisi', qr: 'Aktif' },
  { number: '302', floor: 3, type: 'Deluxe', status: 'Terisi', qr: 'Aktif' },
  { number: '303', floor: 3, type: 'Deluxe', status: 'Kosong', qr: 'Aktif' },
  { number: '304', floor: 3, type: 'Suite', status: 'Kosong', qr: 'Aktif' },
];

const sampleStock = [
  { name: 'Biji Kopi Arabica', category: 'Kopi', stock: 15, unit: 'kg', minStock: 5, status: 'Aman' },
  { name: 'Biji Kopi Robusta', category: 'Kopi', stock: 8, unit: 'kg', minStock: 5, status: 'Aman' },
  { name: 'Susu Segar', category: 'Bahan', stock: 20, unit: 'liter', minStock: 10, status: 'Aman' },
  { name: 'Gula Pasir', category: 'Bahan', stock: 10, unit: 'kg', minStock: 3, status: 'Aman' },
  { name: 'Bubuk Matcha', category: 'Bahan', stock: 2, unit: 'kg', minStock: 3, status: 'Rendah' },
  { name: 'Cokelat Bubuk', category: 'Bahan', stock: 3, unit: 'kg', minStock: 2, status: 'Aman' },
  { name: 'Daging Sapi', category: 'Protein', stock: 4, unit: 'kg', minStock: 5, status: 'Rendah' },
  { name: 'Daging Ayam', category: 'Protein', stock: 8, unit: 'kg', minStock: 5, status: 'Aman' },
  { name: 'Tepung Terigu', category: 'Bahan', stock: 12, unit: 'kg', minStock: 5, status: 'Aman' },
  { name: 'Mentega', category: 'Bahan', stock: 6, unit: 'kg', minStock: 3, status: 'Aman' },
];

const sampleMenuAdmin = [
  { id: 1, name: 'Cappuccino', category: 'coffee', price: 28000, stock: 50, status: 'Aktif' },
  { id: 2, name: 'Caffe Latte', category: 'coffee', price: 26000, stock: 45, status: 'Aktif' },
  { id: 3, name: 'Americano', category: 'coffee', price: 22000, stock: 60, status: 'Aktif' },
  { id: 4, name: 'Mocha Latte', category: 'coffee', price: 32000, stock: 35, status: 'Aktif' },
  { id: 5, name: 'Matcha Latte', category: 'non-coffee', price: 28000, stock: 30, status: 'Aktif' },
  { id: 6, name: 'Thai Tea', category: 'non-coffee', price: 22000, stock: 40, status: 'Aktif' },
  { id: 7, name: 'Nasi Goreng Spesial', category: 'food', price: 35000, stock: 25, status: 'Aktif' },
  { id: 8, name: 'Chicken Katsu', category: 'food', price: 42000, stock: 20, status: 'Aktif' },
  { id: 9, name: 'Beef Burger', category: 'food', price: 45000, stock: 15, status: 'Aktif' },
  { id: 10, name: 'Croissant', category: 'snack', price: 18000, stock: 30, status: 'Aktif' },
  { id: 11, name: 'Brownies', category: 'snack', price: 25000, stock: 20, status: 'Aktif' },
  { id: 12, name: 'Churros', category: 'snack', price: 22000, stock: 0, status: 'Habis' },
];

// ============================================================
// NAVIGATION CONFIG PER ROLE
// ============================================================
const roleNavConfig = {
  kasir: {
    label: 'Kasir',
    fullName: 'Siti Kasir',
    sections: [
      { id: 'overview', icon: 'fas fa-tachometer-alt', label: 'Overview', badge: null },
      { id: 'validasi', icon: 'fas fa-clipboard-check', label: 'Validasi Pesanan', badge: '5' },
      { id: 'transaksi', icon: 'fas fa-receipt', label: 'Transaksi Harian', badge: null },
    ],
    navGroups: [
      { label: 'Menu Utama', items: ['overview', 'validasi', 'transaksi'] }
    ]
  },
  kitchen: {
    label: 'Kitchen',
    fullName: 'Budi Kitchen',
    sections: [
      { id: 'antrian', icon: 'fas fa-list-ol', label: 'Antrian Pesanan', badge: '3' },
      { id: 'proses', icon: 'fas fa-fire', label: 'Sedang Diproses', badge: '2' },
      { id: 'siap-antar', icon: 'fas fa-check-double', label: 'Siap Diantar', badge: null },
      { id: 'stok', icon: 'fas fa-boxes', label: 'Stok Bahan', badge: null },
    ],
    navGroups: [
      { label: 'Pesanan', items: ['antrian', 'proses', 'siap-antar'] },
      { label: 'Inventori', items: ['stok'] }
    ]
  },
  admin: {
    label: 'Admin',
    fullName: 'Admin Utama',
    sections: [
      { id: 'overview', icon: 'fas fa-tachometer-alt', label: 'Overview', badge: null },
      { id: 'kelola-menu', icon: 'fas fa-utensils', label: 'Kelola Menu', badge: null },
      { id: 'kelola-kamar', icon: 'fas fa-hotel', label: 'Kamar & QR', badge: null },
      { id: 'kelola-staf', icon: 'fas fa-users', label: 'Kelola Staf', badge: null },
      { id: 'stok', icon: 'fas fa-boxes', label: 'Stok Bahan', badge: null },
      { id: 'laporan', icon: 'fas fa-chart-bar', label: 'Laporan', badge: null },
      { id: 'pengaturan', icon: 'fas fa-cog', label: 'Pengaturan', badge: null },
    ],
    navGroups: [
      { label: 'Dashboard', items: ['overview'] },
      { label: 'Manajemen', items: ['kelola-menu', 'kelola-kamar', 'kelola-staf', 'stok'] },
      { label: 'Laporan & Sistem', items: ['laporan', 'pengaturan'] }
    ]
  },
  owner: {
    label: 'Owner',
    fullName: 'Owner',
    sections: [
      { id: 'overview', icon: 'fas fa-tachometer-alt', label: 'Overview', badge: null },
      { id: 'laporan', icon: 'fas fa-chart-bar', label: 'Laporan', badge: null },
    ],
    navGroups: [
      { label: 'Dashboard', items: ['overview', 'laporan'] }
    ]
  }
};

// ============================================================
// STATE
// ============================================================
let currentRole = '';
let activeSection = '';

// ============================================================
// DOM READY
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
  initLogin();
  initLogout();
  initMenuForm();
  initTableFilters();
  setCurrentDate();
});

// ============================================================
// LOGIN
// ============================================================
function initLogin() {
  const roleCards = document.querySelectorAll('.role-card');
  const loginBtn = document.getElementById('loginBtn');

  roleCards.forEach(card => {
    card.addEventListener('click', () => {
      roleCards.forEach(c => c.classList.remove('active'));
      card.classList.add('active');
      currentRole = card.dataset.role;
      loginBtn.disabled = false;
    });
  });

  loginBtn.addEventListener('click', () => {
    if (!currentRole) return;
    
    document.getElementById('loginPage').style.display = 'none';
    document.getElementById('dashboardPage').style.display = 'flex';
    
    setupDashboard(currentRole);
  });
}

// ============================================================
// SETUP DASHBOARD BY ROLE
// ============================================================
function setupDashboard(role) {
  const config = roleNavConfig[role];
  if (!config) return;

  // Update sidebar role label
  document.getElementById('sidebarRole').textContent = config.label;
  document.getElementById('userName').textContent = config.fullName;
  document.getElementById('userRole').textContent = config.label;
  document.getElementById('userAvatar').textContent = config.fullName.charAt(0);

  // Build sidebar navigation
  const sidebarNav = document.getElementById('sidebarNav');
  let navHTML = '';

  config.navGroups.forEach(group => {
    navHTML += `<div class="sidebar-nav-label">${group.label}</div>`;
    group.items.forEach((itemId, idx) => {
      const section = config.sections.find(s => s.id === itemId);
      if (!section) return;
      const isFirst = navHTML.indexOf('sidebar-link active') === -1 && idx === 0 && group === config.navGroups[0];
      navHTML += `
        <a href="#" class="sidebar-link ${isFirst ? 'active' : ''}" data-section="${section.id}">
          <span class="link-icon"><i class="${section.icon}"></i></span>
          ${section.label}
          ${section.badge ? `<span class="link-badge">${section.badge}</span>` : ''}
        </a>
      `;
    });
  });

  sidebarNav.innerHTML = navHTML;

  // Set first section as active
  const firstSection = config.sections[0].id;
  showSection(firstSection);

  // Add click handlers
  document.querySelectorAll('.sidebar-link').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      document.querySelectorAll('.sidebar-link').forEach(l => l.classList.remove('active'));
      link.classList.add('active');
      showSection(link.dataset.section);
    });
  });

  // Populate tables
  populateTables();
}

// ============================================================
// SHOW SECTION
// ============================================================
function showSection(sectionId) {
  activeSection = sectionId;
  document.querySelectorAll('.dash-section').forEach(s => s.classList.remove('active'));
  const target = document.getElementById(`section-${sectionId}`);
  if (target) {
    target.classList.add('active');
  }
}

// ============================================================
// POPULATE TABLES
// ============================================================
function populateTables() {
  populateOrdersTable();
  populateValidasiTable();
  populateTransaksiTable();
  populateKitchenGrid();
  populateProsesGrid();
  populateSiapAntarGrid();
  populateAdminMenuTable();
  populateKamarTable();
  populateStafTable();
  populateStokTable();
}

function populateOrdersTable() {
  const tbody = document.getElementById('ordersTableBody');
  if (!tbody) return;

  // Merge localStorage orders with sample
  const storedOrders = JSON.parse(localStorage.getItem('ngoffee_orders') || '[]');
  const allOrders = [...sampleOrders];
  
  storedOrders.forEach(order => {
    allOrders.push({
      id: order.id,
      room: order.room,
      items: order.items,
      total: order.total,
      payment: order.payment,
      status: order.status || 'pending',
      time: new Date(order.timestamp).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
    });
  });

  tbody.innerHTML = allOrders.map(order => `
    <tr data-status="${order.status}">
      <td><span class="order-id">${order.id}</span></td>
      <td>${order.room}</td>
      <td>${order.items.map(i => `${i.name} x${i.qty}`).join(', ')}</td>
      <td><strong>${formatPrice(order.total)}</strong></td>
      <td><span class="badge ${order.payment === 'QRIS' ? 'badge-primary' : 'badge-accent'}">${order.payment}</span></td>
      <td><span class="status-badge ${order.status}">${getStatusLabel(order.status)}</span></td>
      <td>
        <div class="action-btns">
          ${order.status === 'pending' ? `
            <button class="action-btn" title="Validasi" onclick="changeOrderStatus('${order.id}', 'processing')">
              <i class="fas fa-check"></i>
            </button>
          ` : ''}
          <button class="action-btn" title="Detail">
            <i class="fas fa-eye"></i>
          </button>
        </div>
      </td>
    </tr>
  `).join('');
}

function populateValidasiTable() {
  const tbody = document.getElementById('validasiTableBody');
  if (!tbody) return;

  const pending = sampleOrders.filter(o => o.status === 'pending');
  
  tbody.innerHTML = pending.map(order => `
    <tr>
      <td><span class="order-id">${order.id}</span></td>
      <td>${order.room}</td>
      <td>${order.items.map(i => `${i.name} x${i.qty}`).join(', ')}</td>
      <td><strong>${formatPrice(order.total)}</strong></td>
      <td><span class="badge ${order.payment === 'QRIS' ? 'badge-primary' : 'badge-accent'}">${order.payment}</span></td>
      <td>${order.payment === 'QRIS' ? '<a href="#" style="color: #1a6b52; font-weight: 600;"><i class="fas fa-image"></i> Lihat</a>' : '-'}</td>
      <td>
        <div class="action-btns">
          <button class="action-btn" title="Validasi" onclick="changeOrderStatus('${order.id}', 'processing')" style="background: #dcfce7; border-color: #86efac; color: #166534;">
            <i class="fas fa-check"></i>
          </button>
          <button class="action-btn danger" title="Tolak">
            <i class="fas fa-times"></i>
          </button>
        </div>
      </td>
    </tr>
  `).join('');
}

function populateTransaksiTable() {
  const tbody = document.getElementById('transaksiTableBody');
  if (!tbody) return;

  const completed = sampleOrders.filter(o => ['completed', 'delivered'].includes(o.status));
  
  tbody.innerHTML = completed.map(order => `
    <tr>
      <td><span class="order-id">${order.id}</span></td>
      <td>${order.time}</td>
      <td>${order.room}</td>
      <td><strong>${formatPrice(order.total)}</strong></td>
      <td><span class="badge ${order.payment === 'QRIS' ? 'badge-primary' : 'badge-accent'}">${order.payment}</span></td>
      <td><span class="status-badge completed">Selesai</span></td>
    </tr>
  `).join('');
}

function populateKitchenGrid() {
  const grid = document.getElementById('kitchenGrid');
  if (!grid) return;

  const pending = sampleOrders.filter(o => o.status === 'pending' || o.status === 'processing');
  
  if (pending.length === 0) {
    grid.innerHTML = `
      <div class="empty-state" style="grid-column: 1 / -1;">
        <div class="empty-icon">👨‍🍳</div>
        <h4>Tidak ada antrian</h4>
        <p>Semua pesanan sudah diproses</p>
      </div>
    `;
    return;
  }

  grid.innerHTML = pending.map((order, idx) => `
    <div class="kitchen-card">
      <div class="kitchen-card-header">
        <span class="order-num">${order.id}</span>
        <span class="room-num"><i class="fas fa-door-open"></i> ${order.room}</span>
      </div>
      <div class="kitchen-card-body">
        ${order.items.map(item => `
          <div class="kitchen-item">
            <span class="kitchen-item-qty">${item.qty}</span>
            <span class="kitchen-item-name">${item.name}</span>
          </div>
        `).join('')}
      </div>
      <div class="kitchen-card-footer">
        <span class="timer"><i class="fas fa-clock"></i> ${order.time}</span>
        <div style="margin-left: auto; display: flex; gap: 6px;">
          <button class="btn btn-primary btn-sm" onclick="changeOrderStatus('${order.id}', 'processing')">
            <i class="fas fa-fire"></i> Proses
          </button>
        </div>
      </div>
    </div>
  `).join('');
}

function populateProsesGrid() {
  const grid = document.getElementById('prosesGrid');
  if (!grid) return;

  const processing = sampleOrders.filter(o => o.status === 'processing');
  
  if (processing.length === 0) {
    grid.innerHTML = `
      <div class="empty-state" style="grid-column: 1 / -1;">
        <div class="empty-icon">⏳</div>
        <h4>Tidak ada pesanan diproses</h4>
      </div>
    `;
    return;
  }

  grid.innerHTML = processing.map(order => `
    <div class="kitchen-card" style="border-left: 4px solid #3b82f6;">
      <div class="kitchen-card-header">
        <span class="order-num">${order.id}</span>
        <span class="status-badge processing">Diproses</span>
      </div>
      <div class="kitchen-card-body">
        ${order.items.map(item => `
          <div class="kitchen-item">
            <span class="kitchen-item-qty">${item.qty}</span>
            <span class="kitchen-item-name">${item.name}</span>
          </div>
        `).join('')}
      </div>
      <div class="kitchen-card-footer">
        <span class="timer"><i class="fas fa-clock"></i> ${order.time}</span>
        <button class="btn btn-primary btn-sm" style="margin-left: auto;" onclick="changeOrderStatus('${order.id}', 'ready')">
          <i class="fas fa-check"></i> Selesai
        </button>
      </div>
    </div>
  `).join('');
}

function populateSiapAntarGrid() {
  const grid = document.getElementById('siapAntarGrid');
  if (!grid) return;

  const ready = sampleOrders.filter(o => o.status === 'ready');
  
  if (ready.length === 0) {
    grid.innerHTML = `
      <div class="empty-state" style="grid-column: 1 / -1;">
        <div class="empty-icon">📦</div>
        <h4>Tidak ada pesanan siap antar</h4>
      </div>
    `;
    return;
  }

  grid.innerHTML = ready.map(order => `
    <div class="kitchen-card" style="border-left: 4px solid #22c55e;">
      <div class="kitchen-card-header">
        <span class="order-num">${order.id}</span>
        <span class="room-num"><i class="fas fa-door-open"></i> ${order.room}</span>
      </div>
      <div class="kitchen-card-body">
        ${order.items.map(item => `
          <div class="kitchen-item">
            <span class="kitchen-item-qty">${item.qty}</span>
            <span class="kitchen-item-name">${item.name}</span>
          </div>
        `).join('')}
      </div>
      <div class="kitchen-card-footer">
        <span class="status-badge ready">Siap Diantar</span>
        <button class="btn btn-accent btn-sm" style="margin-left: auto;" onclick="changeOrderStatus('${order.id}', 'delivered')">
          <i class="fas fa-truck"></i> Antar
        </button>
      </div>
    </div>
  `).join('');
}

function populateAdminMenuTable() {
  const tbody = document.getElementById('adminMenuTable');
  if (!tbody) return;

  const catLabels = { coffee: 'Kopi', 'non-coffee': 'Non-Kopi', food: 'Makanan', snack: 'Snack' };

  tbody.innerHTML = sampleMenuAdmin.map((item, idx) => `
    <tr>
      <td>${idx + 1}</td>
      <td><strong>${item.name}</strong></td>
      <td><span class="badge badge-primary">${catLabels[item.category] || item.category}</span></td>
      <td>${formatPrice(item.price)}</td>
      <td>${item.stock}</td>
      <td><span class="badge ${item.status === 'Aktif' ? 'badge-success' : 'badge-error'}">${item.status}</span></td>
      <td>
        <div class="action-btns">
          <button class="action-btn" title="Edit"><i class="fas fa-edit"></i></button>
          <button class="action-btn danger" title="Hapus"><i class="fas fa-trash"></i></button>
        </div>
      </td>
    </tr>
  `).join('');
}

function populateKamarTable() {
  const tbody = document.getElementById('kamarTableBody');
  if (!tbody) return;

  tbody.innerHTML = sampleRooms.map(room => `
    <tr>
      <td><strong>${room.number}</strong></td>
      <td>Lantai ${room.floor}</td>
      <td>${room.type}</td>
      <td><span class="badge ${room.status === 'Terisi' ? 'badge-success' : 'badge-warning'}">${room.status}</span></td>
      <td><span class="badge badge-primary"><i class="fas fa-qrcode"></i> ${room.qr}</span></td>
      <td>
        <div class="action-btns">
          <button class="action-btn" title="Generate QR"><i class="fas fa-qrcode"></i></button>
          <button class="action-btn" title="Edit"><i class="fas fa-edit"></i></button>
        </div>
      </td>
    </tr>
  `).join('');
}

function populateStafTable() {
  const tbody = document.getElementById('stafTableBody');
  if (!tbody) return;

  tbody.innerHTML = sampleStaff.map(staff => `
    <tr>
      <td><strong>${staff.name}</strong></td>
      <td>${staff.username}</td>
      <td><span class="badge badge-primary">${staff.role}</span></td>
      <td><span class="badge ${staff.status === 'Aktif' ? 'badge-success' : 'badge-error'}">${staff.status}</span></td>
      <td style="font-size: 0.85rem; color: #737373;">${staff.lastLogin}</td>
      <td>
        <div class="action-btns">
          <button class="action-btn" title="Edit"><i class="fas fa-edit"></i></button>
          <button class="action-btn danger" title="Hapus"><i class="fas fa-trash"></i></button>
        </div>
      </td>
    </tr>
  `).join('');
}

function populateStokTable() {
  const tbody = document.getElementById('stokTableBody');
  if (!tbody) return;

  tbody.innerHTML = sampleStock.map(item => `
    <tr>
      <td><strong>${item.name}</strong></td>
      <td>${item.category}</td>
      <td>${item.stock}</td>
      <td>${item.unit}</td>
      <td>${item.minStock}</td>
      <td><span class="badge ${item.status === 'Aman' ? 'badge-success' : 'badge-error'}">${item.status}</span></td>
      <td>
        <div class="action-btns">
          <button class="action-btn" title="Update Stok"><i class="fas fa-edit"></i></button>
        </div>
      </td>
    </tr>
  `).join('');
}

// ============================================================
// ORDER STATUS CHANGE
// ============================================================
function changeOrderStatus(orderId, newStatus) {
  const order = sampleOrders.find(o => o.id === orderId);
  if (order) {
    order.status = newStatus;
    showToast(`Pesanan ${orderId} diupdate ke: ${getStatusLabel(newStatus)}`, 'success');
    populateTables();
  }
}

// ============================================================
// TABLE FILTERS
// ============================================================
function initTableFilters() {
  document.addEventListener('click', (e) => {
    if (e.target.classList.contains('dash-filter')) {
      const parent = e.target.closest('.dash-table-header');
      if (!parent) return;
      
      parent.querySelectorAll('.dash-filter').forEach(f => f.classList.remove('active'));
      e.target.classList.add('active');
      
      const filter = e.target.dataset.filter;
      const table = parent.closest('.dash-table-card');
      const rows = table.querySelectorAll('tbody tr');
      
      rows.forEach(row => {
        if (filter === 'all' || row.dataset.status === filter) {
          row.style.display = '';
        } else {
          row.style.display = 'none';
        }
      });
    }
  });
}

// ============================================================
// MENU FORM (Admin)
// ============================================================
function initMenuForm() {
  const addBtn = document.getElementById('addMenuBtn');
  const cancelBtn = document.getElementById('cancelMenuBtn');
  const formCard = document.getElementById('menuFormCard');
  const menuForm = document.getElementById('menuForm');

  if (addBtn) {
    addBtn.addEventListener('click', () => {
      formCard.style.display = 'block';
      formCard.scrollIntoView({ behavior: 'smooth' });
    });
  }

  if (cancelBtn) {
    cancelBtn.addEventListener('click', () => {
      formCard.style.display = 'none';
      menuForm.reset();
    });
  }

  if (menuForm) {
    menuForm.addEventListener('submit', (e) => {
      e.preventDefault();
      showToast('Menu berhasil ditambahkan!', 'success');
      formCard.style.display = 'none';
      menuForm.reset();
    });
  }
}

// ============================================================
// LOGOUT
// ============================================================
function initLogout() {
  const logoutBtn = document.getElementById('logoutBtn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      document.getElementById('dashboardPage').style.display = 'none';
      document.getElementById('loginPage').style.display = 'flex';
      document.querySelectorAll('.role-card').forEach(c => c.classList.remove('active'));
      document.getElementById('loginBtn').disabled = true;
      currentRole = '';
    });
  }
}

// ============================================================
// UTILITIES
// ============================================================
function formatPrice(price) {
  return 'Rp ' + price.toLocaleString('id-ID');
}

function getStatusLabel(status) {
  const labels = {
    pending: 'Menunggu',
    processing: 'Diproses',
    ready: 'Siap Antar',
    delivered: 'Diantar',
    completed: 'Selesai'
  };
  return labels[status] || status;
}

function setCurrentDate() {
  const el = document.getElementById('currentDate');
  if (el) {
    const now = new Date();
    el.textContent = now.toLocaleDateString('id-ID', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }
}

function showToast(message, type = 'info') {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  
  const icons = { success: '✅', error: '❌', warning: '⚠️', info: 'ℹ️' };
  toast.innerHTML = `<span>${icons[type] || 'ℹ️'}</span> ${message}`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(50px)';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}
