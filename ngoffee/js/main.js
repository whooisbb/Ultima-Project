/**
 * NGOFFEE - Main Website JavaScript
 * Handles: Navigation, Menu display, Scroll effects, Contact form
 */

// ============================================================
// MENU DATA
// ============================================================
const menuData = [
  {
    id: 1, name: 'Cappuccino', category: 'coffee', price: 28000,
    desc: 'Espresso dengan susu steamed dan foam lembut', badge: 'Best Seller',
    color: '#4a2c17'
  },
  {
    id: 2, name: 'Caffe Latte', category: 'coffee', price: 26000,
    desc: 'Espresso dengan susu steamed yang creamy', badge: '',
    color: '#6b3d1f'
  },
  {
    id: 3, name: 'Americano', category: 'coffee', price: 22000,
    desc: 'Espresso dengan air panas, rasa bold dan clean', badge: '',
    color: '#2d2d2d'
  },
  {
    id: 4, name: 'Mocha Latte', category: 'coffee', price: 32000,
    desc: 'Espresso, cokelat premium, dan susu steamed', badge: 'Popular',
    color: '#8b5230'
  },
  {
    id: 5, name: 'Vanilla Latte', category: 'coffee', price: 30000,
    desc: 'Latte dengan sirup vanilla premium', badge: '',
    color: '#a86840'
  },
  {
    id: 6, name: 'Affogato', category: 'coffee', price: 35000,
    desc: 'Espresso panas dituang di atas gelato vanilla', badge: 'Special',
    color: '#c8956c'
  },
  {
    id: 7, name: 'Matcha Latte', category: 'non-coffee', price: 28000,
    desc: 'Bubuk matcha premium Jepang dengan susu', badge: 'Popular',
    color: '#145740'
  },
  {
    id: 8, name: 'Cokelat Panas', category: 'non-coffee', price: 25000,
    desc: 'Cokelat premium dengan susu steamed', badge: '',
    color: '#6b3d1f'
  },
  {
    id: 9, name: 'Fresh Orange', category: 'non-coffee', price: 20000,
    desc: 'Jus jeruk segar diperas langsung', badge: '',
    color: '#f59e0b'
  },
  {
    id: 10, name: 'Thai Tea', category: 'non-coffee', price: 22000,
    desc: 'Teh Thailand dengan susu kental manis', badge: '',
    color: '#ea580c'
  },
  {
    id: 11, name: 'Nasi Goreng Spesial', category: 'food', price: 35000,
    desc: 'Nasi goreng dengan telur, ayam, dan sayuran segar', badge: 'Chef Pick',
    color: '#dc2626'
  },
  {
    id: 12, name: 'Chicken Katsu', category: 'food', price: 42000,
    desc: 'Ayam katsu crispy dengan saus curry Jepang', badge: 'Best Seller',
    color: '#d4a574'
  },
  {
    id: 13, name: 'Beef Burger', category: 'food', price: 45000,
    desc: 'Burger daging sapi premium dengan keju dan sayuran', badge: '',
    color: '#8b5230'
  },
  {
    id: 14, name: 'Pasta Carbonara', category: 'food', price: 40000,
    desc: 'Spaghetti dengan saus carbonara creamy dan bacon', badge: '',
    color: '#ecd3b2'
  },
  {
    id: 15, name: 'Croissant', category: 'snack', price: 18000,
    desc: 'Croissant butter renyah dan berlapis-lapis', badge: '',
    color: '#d4a574'
  },
  {
    id: 16, name: 'Churros', category: 'snack', price: 22000,
    desc: 'Churros hangat dengan saus cokelat dan karamel', badge: 'Popular',
    color: '#c8956c'
  },
  {
    id: 17, name: 'French Fries', category: 'snack', price: 20000,
    desc: 'Kentang goreng crispy dengan saus spesial', badge: '',
    color: '#f59e0b'
  },
  {
    id: 18, name: 'Brownies', category: 'snack', price: 25000,
    desc: 'Brownies cokelat premium yang moist dan rich', badge: 'New',
    color: '#4a2c17'
  },
];

// ============================================================
// DOM READY
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initMobileNav();
  initMenuSection();
  initScrollReveal();
  initContactForm();
});

// ============================================================
// NAVBAR SCROLL EFFECT
// ============================================================
function initNavbar() {
  const navbar = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Active section highlighting
    const sections = document.querySelectorAll('section[id]');
    let currentSection = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      if (window.scrollY >= sectionTop) {
        currentSection = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSection}`) {
        link.classList.add('active');
      }
    });
  });
}

// ============================================================
// MOBILE NAVIGATION
// ============================================================
function initMobileNav() {
  const toggle = document.getElementById('navToggle');
  const links = document.getElementById('navLinks');

  if (toggle && links) {
    toggle.addEventListener('click', () => {
      links.classList.toggle('open');
    });

    // Close on link click
    links.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        links.classList.remove('open');
      });
    });
  }
}

// ============================================================
// MENU SECTION
// ============================================================
function initMenuSection() {
  const menuGrid = document.getElementById('menuGrid');
  const menuTabs = document.querySelectorAll('.menu-tab');

  if (!menuGrid) return;

  // Render menu
  function renderMenu(category = 'all') {
    const filtered = category === 'all' 
      ? menuData 
      : menuData.filter(item => item.category === category);
    
    menuGrid.innerHTML = filtered.map(item => `
      <div class="menu-card" data-category="${item.category}">
        <div class="menu-card-img-wrapper">
          <svg class="menu-card-img" viewBox="0 0 300 200" xmlns="http://www.w3.org/2000/svg">
            <rect width="300" height="200" fill="${item.color}"/>
            <circle cx="150" cy="90" r="50" fill="rgba(255,255,255,0.1)"/>
            <circle cx="150" cy="90" r="30" fill="rgba(255,255,255,0.1)"/>
            <text x="150" y="95" text-anchor="middle" dominant-baseline="central" 
              font-family="Poppins" font-weight="700" font-size="14" fill="rgba(255,255,255,0.9)">
              ${getCategoryEmoji(item.category)}
            </text>
            <text x="150" y="160" text-anchor="middle" font-family="Poppins" font-weight="600" 
              font-size="11" fill="rgba(255,255,255,0.7)">${item.name}</text>
          </svg>
          ${item.badge ? `<span class="badge badge-accent menu-card-badge">${item.badge}</span>` : ''}
        </div>
        <div class="menu-card-body">
          <div class="menu-card-name">${item.name}</div>
          <div class="menu-card-desc">${item.desc}</div>
          <div class="menu-card-footer">
            <span class="menu-card-price">${formatPrice(item.price)}</span>
            <a href="order.html" class="menu-card-add" title="Pesan">
              <i class="fas fa-plus"></i>
            </a>
          </div>
        </div>
      </div>
    `).join('');
  }

  renderMenu();

  // Tab click handler
  menuTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      menuTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      renderMenu(tab.dataset.category);
    });
  });
}

// ============================================================
// SCROLL REVEAL ANIMATION
// ============================================================
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => observer.observe(el));
}

// ============================================================
// CONTACT FORM
// ============================================================
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    showToast('Pesan berhasil dikirim! Kami akan segera menghubungi Anda.', 'success');
    form.reset();
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
  
  const icons = {
    success: '✅',
    error: '❌',
    warning: '⚠️',
    info: 'ℹ️'
  };
  
  toast.innerHTML = `<span>${icons[type] || 'ℹ️'}</span> ${message}`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(50px)';
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}

// Export for other scripts
window.menuData = menuData;
window.formatPrice = formatPrice;
window.getCategoryEmoji = getCategoryEmoji;
window.showToast = showToast;
