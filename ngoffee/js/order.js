/**
 * NGOFFEE - Order System JavaScript
 * Handles: Room selection, Menu browsing, Cart, Payment, Order confirmation
 */

// ============================================================
// MENU DATA (same as main.js)
// ============================================================
const menuItems = [
  { id: 1, name: 'Cappuccino', category: 'coffee', price: 28000, desc: 'Espresso dengan susu steamed dan foam lembut', color: '#4a2c17' },
  { id: 2, name: 'Caffe Latte', category: 'coffee', price: 26000, desc: 'Espresso dengan susu steamed yang creamy', color: '#6b3d1f' },
  { id: 3, name: 'Americano', category: 'coffee', price: 22000, desc: 'Espresso dengan air panas, rasa bold dan clean', color: '#2d2d2d' },
  { id: 4, name: 'Mocha Latte', category: 'coffee', price: 32000, desc: 'Espresso, cokelat premium, dan susu steamed', color: '#8b5230' },
  { id: 5, name: 'Vanilla Latte', category: 'coffee', price: 30000, desc: 'Latte dengan sirup vanilla premium', color: '#a86840' },
  { id: 6, name: 'Affogato', category: 'coffee', price: 35000, desc: 'Espresso panas dituang di atas gelato vanilla', color: '#c8956c' },
  { id: 7, name: 'Matcha Latte', category: 'non-coffee', price: 28000, desc: 'Bubuk matcha premium Jepang dengan susu', color: '#145740' },
  { id: 8, name: 'Cokelat Panas', category: 'non-coffee', price: 25000, desc: 'Cokelat premium dengan susu steamed', color: '#6b3d1f' },
  { id: 9, name: 'Fresh Orange', category: 'non-coffee', price: 20000, desc: 'Jus jeruk segar diperas langsung', color: '#f59e0b' },
  { id: 10, name: 'Thai Tea', category: 'non-coffee', price: 22000, desc: 'Teh Thailand dengan susu kental manis', color: '#ea580c' },
  { id: 11, name: 'Lemon Tea', category: 'non-coffee', price: 18000, desc: 'Teh lemon segar dan menyegarkan', color: '#84cc16' },
  { id: 12, name: 'Nasi Goreng Spesial', category: 'food', price: 35000, desc: 'Nasi goreng dengan telur, ayam, dan sayuran segar', color: '#dc2626' },
  { id: 13, name: 'Chicken Katsu', category: 'food', price: 42000, desc: 'Ayam katsu crispy dengan saus curry Jepang', color: '#d4a574' },
  { id: 14, name: 'Beef Burger', category: 'food', price: 45000, desc: 'Burger daging sapi premium dengan keju', color: '#8b5230' },
  { id: 15, name: 'Pasta Carbonara', category: 'food', price: 40000, desc: 'Spaghetti dengan saus carbonara creamy', color: '#ecd3b2' },
  { id: 16, name: 'Mie Goreng', category: 'food', price: 30000, desc: 'Mie goreng dengan telur dan sayuran', color: '#ea580c' },
  { id: 17, name: 'Croissant', category: 'snack', price: 18000, desc: 'Croissant butter renyah dan berlapis', color: '#d4a574' },
  { id: 18, name: 'Churros', category: 'snack', price: 22000, desc: 'Churros hangat dengan saus cokelat', color: '#c8956c' },
  { id: 19, name: 'French Fries', category: 'snack', price: 20000, desc: 'Kentang goreng crispy dengan saus', color: '#f59e0b' },
  { id: 20, name: 'Brownies', category: 'snack', price: 25000, desc: 'Brownies cokelat premium yang moist', color: '#4a2c17' },
  { id: 21, name: 'Roti Bakar', category: 'snack', price: 15000, desc: 'Roti bakar dengan selai dan mentega', color: '#a86840' },
];

// ============================================================
// STATE
// ============================================================
let cart = [];
let selectedRoom = '';
let selectedPayment = '';
let orderCounter = 1;

// ============================================================
// DOM READY
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
  initRoomSelection();
  initMenuBrowsing();
  initPaymentModal();
  initSuccessModal();
});

// ============================================================
// ROOM SELECTION
// ============================================================
function initRoomSelection() {
  const roomSelect = document.getElementById('roomSelect');
  const enterBtn = document.getElementById('enterOrderBtn');
  const qrPage = document.getElementById('qrScanPage');
  const orderPage = document.getElementById('orderPage');

  roomSelect.addEventListener('change', () => {
    selectedRoom = roomSelect.value;
    enterBtn.disabled = !selectedRoom;
  });

  enterBtn.addEventListener('click', () => {
    if (!selectedRoom) return;
    
    qrPage.style.display = 'none';
    orderPage.style.display = 'block';
    document.getElementById('roomNumber').textContent = selectedRoom;
    
    renderOrderMenu();
  });
}

// ============================================================
// MENU BROWSING & SEARCH
// ============================================================
function initMenuBrowsing() {
  const categories = document.querySelectorAll('.order-category');
  const searchInput = document.getElementById('menuSearch');

  categories.forEach(cat => {
    cat.addEventListener('click', () => {
      categories.forEach(c => c.classList.remove('active'));
      cat.classList.add('active');
      renderOrderMenu(cat.dataset.cat, searchInput.value);
    });
  });

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const activeCat = document.querySelector('.order-category.active');
      renderOrderMenu(activeCat ? activeCat.dataset.cat : 'all', e.target.value);
    });
  }
}

function renderOrderMenu(category = 'all', search = '') {
  const grid = document.getElementById('orderMenuGrid');
  if (!grid) return;

  let items = category === 'all' 
    ? menuItems 
    : menuItems.filter(item => item.category === category);

  if (search) {
    const q = search.toLowerCase();
    items = items.filter(item => 
      item.name.toLowerCase().includes(q) || 
      item.desc.toLowerCase().includes(q)
    );
  }

  if (items.length === 0) {
    grid.innerHTML = `
      <div class="empty-state" style="grid-column: 1 / -1;">
        <div class="empty-icon">🔍</div>
        <h4>Menu tidak ditemukan</h4>
        <p>Coba kata kunci lain atau pilih kategori yang berbeda</p>
      </div>
    `;
    return;
  }

  grid.innerHTML = items.map(item => {
    const cartItem = cart.find(c => c.id === item.id);
    const qty = cartItem ? cartItem.qty : 0;

    return `
      <div class="order-menu-item" data-id="${item.id}">
        <svg class="order-menu-item-img" viewBox="0 0 250 150" xmlns="http://www.w3.org/2000/svg">
          <rect width="250" height="150" fill="${item.color}"/>
          <circle cx="125" cy="65" r="35" fill="rgba(255,255,255,0.1)"/>
          <circle cx="125" cy="65" r="20" fill="rgba(255,255,255,0.1)"/>
          <text x="125" y="70" text-anchor="middle" dominant-baseline="central" font-size="24">
            ${getCategoryEmoji(item.category)}
          </text>
          <text x="125" y="120" text-anchor="middle" font-family="Poppins" font-weight="600" 
            font-size="10" fill="rgba(255,255,255,0.7)">${item.name}</text>
        </svg>
        <div class="order-menu-item-body">
          <div class="order-menu-item-name">${item.name}</div>
          <div style="font-size: 0.8rem; color: #737373; margin-bottom: 8px;">${item.desc}</div>
          <div class="order-item-actions">
            <div class="order-menu-item-price">${formatPrice(item.price)}</div>
            ${qty > 0 ? `
              <div class="qty-control">
                <button class="qty-btn" onclick="updateCart(${item.id}, -1)">−</button>
                <span class="qty-value">${qty}</span>
                <button class="qty-btn" onclick="updateCart(${item.id}, 1)">+</button>
              </div>
            ` : `
              <button class="menu-card-add" onclick="addToCart(${item.id})" title="Tambah">
                <i class="fas fa-plus"></i>
              </button>
            `}
          </div>
        </div>
      </div>
    `;
  }).join('');
}

// ============================================================
// CART MANAGEMENT
// ============================================================
function addToCart(itemId) {
  const item = menuItems.find(m => m.id === itemId);
  if (!item) return;

  const existing = cart.find(c => c.id === itemId);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ ...item, qty: 1 });
  }

  showToast(`${item.name} ditambahkan ke keranjang`, 'success');
  updateCartUI();
  renderOrderMenu(getActiveCategory(), getSearchValue());
}

function updateCart(itemId, delta) {
  const item = cart.find(c => c.id === itemId);
  if (!item) return;

  item.qty += delta;
  if (item.qty <= 0) {
    cart = cart.filter(c => c.id !== itemId);
  }

  updateCartUI();
  renderOrderMenu(getActiveCategory(), getSearchValue());
}

function removeFromCart(itemId) {
  const item = cart.find(c => c.id === itemId);
  if (item) {
    showToast(`${item.name} dihapus dari keranjang`, 'warning');
  }
  cart = cart.filter(c => c.id !== itemId);
  updateCartUI();
  renderOrderMenu(getActiveCategory(), getSearchValue());
}

function updateCartUI() {
  const cartItems = document.getElementById('cartItems');
  const cartCount = document.getElementById('cartCount');
  const cartSummary = document.getElementById('cartSummary');
  const checkoutBtn = document.getElementById('checkoutBtn');
  const subtotalEl = document.getElementById('subtotalAmount');
  const totalEl = document.getElementById('totalAmount');

  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);

  cartCount.textContent = totalItems;

  if (cart.length === 0) {
    cartItems.innerHTML = `
      <div class="empty-state">
        <div class="empty-icon">🛒</div>
        <h4>Keranjang Kosong</h4>
        <p>Pilih menu untuk memulai pesanan Anda</p>
      </div>
    `;
    cartSummary.style.display = 'none';
    checkoutBtn.disabled = true;
  } else {
    cartItems.innerHTML = cart.map(item => `
      <div class="cart-item">
        <svg class="cart-item-img" viewBox="0 0 55 55" xmlns="http://www.w3.org/2000/svg">
          <rect width="55" height="55" rx="6" fill="${item.color}"/>
          <text x="27" y="30" text-anchor="middle" dominant-baseline="central" font-size="18">
            ${getCategoryEmoji(item.category)}
          </text>
        </svg>
        <div class="cart-item-info">
          <div class="cart-item-name">${item.name}</div>
          <div class="cart-item-price">${formatPrice(item.price)}</div>
          <div class="cart-item-qty">x${item.qty} = ${formatPrice(item.price * item.qty)}</div>
        </div>
        <button class="cart-item-remove" onclick="removeFromCart(${item.id})" title="Hapus">
          <i class="fas fa-trash-alt"></i>
        </button>
      </div>
    `).join('');
    
    cartSummary.style.display = 'block';
    subtotalEl.textContent = formatPrice(subtotal);
    totalEl.textContent = formatPrice(subtotal);
    checkoutBtn.disabled = false;
  }
}

// ============================================================
// PAYMENT MODAL
// ============================================================
function initPaymentModal() {
  const checkoutBtn = document.getElementById('checkoutBtn');
  const paymentModal = document.getElementById('paymentModal');
  const closeBtn = document.getElementById('closePaymentModal');
  const qrisOption = document.getElementById('paymentQris');
  const cashOption = document.getElementById('paymentCash');
  const qrisUpload = document.getElementById('qrisUpload');
  const qrisFile = document.getElementById('qrisFile');
  const confirmBtn = document.getElementById('confirmPaymentBtn');
  const paymentTotal = document.getElementById('paymentTotal');

  checkoutBtn.addEventListener('click', () => {
    const total = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
    paymentTotal.textContent = formatPrice(total);
    paymentModal.classList.add('active');
    selectedPayment = '';
    qrisOption.classList.remove('selected');
    cashOption.classList.remove('selected');
    qrisUpload.classList.remove('show');
    confirmBtn.disabled = true;
  });

  closeBtn.addEventListener('click', () => {
    paymentModal.classList.remove('active');
  });

  paymentModal.addEventListener('click', (e) => {
    if (e.target === paymentModal) {
      paymentModal.classList.remove('active');
    }
  });

  qrisOption.addEventListener('click', () => {
    selectedPayment = 'QRIS';
    qrisOption.classList.add('selected');
    cashOption.classList.remove('selected');
    qrisUpload.classList.add('show');
    confirmBtn.disabled = true; // Wait for file upload
  });

  cashOption.addEventListener('click', () => {
    selectedPayment = 'Cash';
    cashOption.classList.add('selected');
    qrisOption.classList.remove('selected');
    qrisUpload.classList.remove('show');
    confirmBtn.disabled = false;
  });

  qrisUpload.addEventListener('click', () => {
    qrisFile.click();
  });

  qrisFile.addEventListener('change', (e) => {
    if (e.target.files.length > 0) {
      const fileName = e.target.files[0].name;
      qrisUpload.innerHTML = `
        <i class="fas fa-check-circle" style="font-size: 2rem; color: #22c55e; margin-bottom: 8px;"></i>
        <p style="color: #166534; font-weight: 600;">Bukti pembayaran diunggah</p>
        <p style="font-size: 0.78rem; color: #737373; margin-top: 4px;">${fileName}</p>
      `;
      confirmBtn.disabled = false;
    }
  });

  confirmBtn.addEventListener('click', () => {
    processOrder();
  });
}

// ============================================================
// ORDER PROCESSING
// ============================================================
function processOrder() {
  const paymentModal = document.getElementById('paymentModal');
  const successModal = document.getElementById('successModal');
  const notes = document.getElementById('orderNotes').value;

  // Generate order number
  const now = new Date();
  const dateStr = now.getFullYear().toString() +
    String(now.getMonth() + 1).padStart(2, '0') +
    String(now.getDate()).padStart(2, '0');
  const orderNum = `NGF-${dateStr}-${String(orderCounter).padStart(4, '0')}`;
  orderCounter++;

  // Create order object
  const order = {
    id: orderNum,
    room: selectedRoom,
    items: [...cart],
    total: cart.reduce((sum, item) => sum + (item.price * item.qty), 0),
    payment: selectedPayment,
    notes: notes,
    status: 'pending',
    timestamp: now.toISOString()
  };

  // Save to localStorage (simulated backend)
  const orders = JSON.parse(localStorage.getItem('ngoffee_orders') || '[]');
  orders.push(order);
  localStorage.setItem('ngoffee_orders', JSON.stringify(orders));

  // Close payment modal, show success
  paymentModal.classList.remove('active');
  
  document.getElementById('orderNumber').textContent = orderNum;
  document.getElementById('successRoom').textContent = `Kamar ${selectedRoom}`;
  document.getElementById('successPayment').textContent = selectedPayment;
  
  successModal.classList.add('active');

  // Clear cart
  cart = [];
  updateCartUI();
  renderOrderMenu(getActiveCategory(), getSearchValue());
}

// ============================================================
// SUCCESS MODAL
// ============================================================
function initSuccessModal() {
  const newOrderBtn = document.getElementById('newOrderBtn');
  const successModal = document.getElementById('successModal');

  newOrderBtn.addEventListener('click', () => {
    successModal.classList.remove('active');
    document.getElementById('orderNotes').value = '';
  });
}

// ============================================================
// UTILITY FUNCTIONS
// ============================================================
function formatPrice(price) {
  return 'Rp ' + price.toLocaleString('id-ID');
}

function getCategoryEmoji(category) {
  const emojis = {
    'coffee': '☕',
    'non-coffee': '🧃',
    'food': '🍽️',
    'snack': '🍰'
  };
  return emojis[category] || '🍴';
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

function getActiveCategory() {
  const active = document.querySelector('.order-category.active');
  return active ? active.dataset.cat : 'all';
}

function getSearchValue() {
  const input = document.getElementById('menuSearch');
  return input ? input.value : '';
}
