// BiGeo Application - Main JavaScript

// ===== DATA STRUCTURES =====

let currentLanguage = 'en';
let isOffline = false;
let currentDashboard = 'landing';
let currentTab = {}; // Track active tab per dashboard
let productIdCounter = 4;
let dispatchIdCounter = 1;
let orderIdCounter = 1;
let charts = {}; // Store chart instances

const translations = {
  en: {
    'dashboard': 'Dashboard',
    'producer': 'Producer',
    'product': 'Product',
    'status': 'Status',
    'register': 'Register',
    'submit': 'Submit',
    'scan': 'Scan QR',
    'track': 'Track',
    'register-product': 'Register Product',
    'product-name': 'Product Name',
    'quantity': 'Quantity',
    'category': 'Category',
    'quality-grade': 'Quality Grade',
    'location': 'Location',
    'pickup-date': 'Expected Pickup Date',
    'my-products': 'My Products',
    'track-shipment': 'Track Shipment',
    'offline-message': 'Working in offline mode - data will sync when online'
  },
  te: {
    'dashboard': 'డాష్\u200cబోర్డ్',
    'producer': 'ఉత్పత్తిదారు',
    'product': 'ఉత్పత్తి',
    'status': 'స్థితి',
    'register': 'నమోదు',
    'submit': 'సమర్పించు',
    'scan': 'QR స్కాన్ చేయండి',
    'track': 'ట్రాక్',
    'register-product': 'ఉత్పత్తిని నమోదు చేయండి',
    'product-name': 'ఉత్పత్తి పేరు',
    'quantity': 'పరిమాణం',
    'category': 'వర్గం',
    'quality-grade': 'నాణ్యత గ్రేడ్',
    'location': 'స్థానం',
    'pickup-date': 'ఊహించిన పికప్ తేదీ',
    'my-products': 'నా ఉత్పత్తులు',
    'track-shipment': 'షిప్\u200cమెంట్ ట్రాక్ చేయండి',
    'offline-message': 'ఆఫ్\u200cలైన్ మోడ్\u200cలో పని చేస్తోంది - ఆన్\u200cలైన్ అయినప్పుడు డేటా సింక్ అవుతుంది'
  }
};

const statusColors = {
  pending: { color: '#8B8D98', label: 'Pending', telugu: 'పెండింగ్' },
  confirmed: { color: '#2E86DE', label: 'Confirmed', telugu: 'నిర్ధారించబడింది' },
  enroute: { color: '#FFB020', label: 'En-route', telugu: 'మార్గంలో' },
  delivered: { color: '#28A745', label: 'Delivered', telugu: 'పంపిణీ చేయబడింది' },
  issue: { color: '#DC3545', label: 'Issue', telugu: 'సమస్య' }
};

const villages = ['Raghavapuram', 'Peddapur', 'Kondapalli', 'Muppavarapu', 'Nadukuru'];
const hubs = ['Vijayawada Hub', 'Guntur Hub', 'Eluru Hub'];
const cities = ['Hyderabad', 'Bangalore', 'Chennai', 'Visakhapatnam'];
const rcaAgents = [
  { name: 'Ramesh Kumar', phone: '+91 98765 43210' },
  { name: 'Lakshmi Devi', phone: '+91 98765 43211' },
  { name: 'Srinivas Reddy', phone: '+91 98765 43212' },
  { name: 'Anjali Patel', phone: '+91 98765 43213' }
];

// Sample MSME Products
const sampleMSMEProducts = [
  {
    id: 'BG-PROD-1001',
    name: 'Handloom Cotton Saree',
    category: 'Handloom Textiles',
    village: 'Raghavapuram',
    producer: 'Lakshmi Devi',
    grade: 'A',
    price: 2500,
    rating: 4.8,
    stock: 15,
    icon: '🧵'
  },
  {
    id: 'BG-PROD-1002',
    name: 'Bamboo Storage Basket Set',
    category: 'Bamboo Crafts',
    village: 'Kondapalli',
    producer: 'Srinivas Reddy',
    grade: 'A',
    price: 450,
    rating: 4.5,
    stock: 30,
    icon: '🧺'
  },
  {
    id: 'BG-PROD-1003',
    name: 'Organic Turmeric Powder (500g)',
    category: 'Spices & Food Products',
    village: 'Peddapur',
    producer: 'Anjali Patel',
    grade: 'A',
    price: 180,
    rating: 4.9,
    stock: 100,
    icon: '🌿'
  },
  {
    id: 'BG-PROD-1004',
    name: 'Handmade Clay Pot Set',
    category: 'Pottery & Ceramics',
    village: 'Nadukuru',
    producer: 'Ramesh Kumar',
    grade: 'B',
    price: 350,
    rating: 4.3,
    stock: 20,
    icon: '🏺'
  },
  {
    id: 'BG-PROD-1005',
    name: 'Traditional Beaded Necklace',
    category: 'Handmade Jewelry',
    village: 'Muppavarapu',
    producer: 'Priya Sharma',
    grade: 'A',
    price: 800,
    rating: 4.7,
    stock: 12,
    icon: '💎'
  },
  {
    id: 'BG-PROD-1006',
    name: 'Wooden Toy Set',
    category: 'Wooden Handicrafts',
    village: 'Mangalagiri',
    producer: 'Venkat Rao',
    grade: 'A',
    price: 600,
    rating: 4.6,
    stock: 25,
    icon: '🪀'
  },
  {
    id: 'BG-PROD-1007',
    name: 'Silk Dupatta',
    category: 'Handloom Textiles',
    village: 'Raghavapuram',
    producer: 'Lakshmi Devi',
    grade: 'A',
    price: 1200,
    rating: 4.9,
    stock: 8,
    icon: '🧵'
  },
  {
    id: 'BG-PROD-1008',
    name: 'Bamboo Lamp',
    category: 'Bamboo Crafts',
    village: 'Kondapalli',
    producer: 'Srinivas Reddy',
    grade: 'A',
    price: 850,
    rating: 4.6,
    stock: 15,
    icon: '🧺'
  }
];

// In-memory data storage
let products = [
  {
    id: 'BG-PROD-0001',
    name: 'Handloom Cotton Saree',
    quantity: '2 pieces',
    category: 'Handloom Textiles',
    grade: 'A',
    village: 'Raghavapuram',
    status: 'confirmed',
    rca: 'Ramesh Kumar',
    pickupDate: '2025-10-28',
    qcScore: null
  },
  {
    id: 'BG-PROD-0002',
    name: 'Bamboo Basket Set',
    quantity: '5 pieces',
    category: 'Bamboo Crafts',
    grade: 'A',
    village: 'Peddapur',
    status: 'enroute',
    rca: 'Lakshmi Devi',
    pickupDate: '2025-10-27',
    qcScore: null
  },
  {
    id: 'BG-PROD-0003',
    name: 'Organic Turmeric Powder',
    quantity: '10 kg',
    category: 'Spices & Food Products',
    grade: 'A',
    village: 'Kondapalli',
    status: 'delivered',
    rca: 'Srinivas Reddy',
    pickupDate: '2025-10-26',
    qcScore: { appearance: 9, freshness: 8, packaging: 9, grade: 'Excellent' }
  }
];

let dispatches = [];
let orders = [];
let queuedActions = [];

// ===== UTILITY FUNCTIONS =====

function showToast(message, duration = 3000) {
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, duration);
}

function translate(key) {
  return translations[currentLanguage][key] || key;
}

function updateTranslations() {
  document.querySelectorAll('[data-translate]').forEach(element => {
    const key = element.getAttribute('data-translate');
    const translated = translate(key);
    if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
      element.placeholder = translated;
    } else {
      element.textContent = translated;
    }
  });
}

function getStatusBadge(status) {
  const statusInfo = statusColors[status] || statusColors.pending;
  const label = currentLanguage === 'te' ? statusInfo.telugu : statusInfo.label;
  return `<span class="status-badge ${status}">${label}</span>`;
}

function generateProductId() {
  const id = `BG-PROD-${String(productIdCounter).padStart(4, '0')}`;
  productIdCounter++;
  return id;
}

function generateDispatchId() {
  const id = `BG-DISP-${String(dispatchIdCounter).padStart(4, '0')}`;
  dispatchIdCounter++;
  return id;
}

function generateOrderId() {
  const id = `BG-ORD-${String(orderIdCounter).padStart(4, '0')}`;
  orderIdCounter++;
  return id;
}

function getProductById(id) {
  return products.find(p => p.id === id);
}

// ===== NAVIGATION =====

// Particle animation system
function createParticles(containerId, colors, count = 30) {
  const container = document.getElementById(containerId);
  if (!container) return;
  
  container.innerHTML = '';
  
  for (let i = 0; i < count; i++) {
    const particle = document.createElement('div');
    const size = Math.random() * 8 + 4;
    const color = colors[Math.floor(Math.random() * colors.length)];
    const startX = Math.random() * 100;
    const startY = Math.random() * 100;
    const duration = Math.random() * 20 + 15;
    const delay = Math.random() * 5;
    
    particle.style.cssText = `
      position: absolute;
      width: ${size}px;
      height: ${size}px;
      background: ${color};
      border-radius: 50%;
      left: ${startX}%;
      top: ${startY}%;
      opacity: ${Math.random() * 0.5 + 0.2};
      animation: floatParticle ${duration}s ${delay}s infinite ease-in-out;
      box-shadow: 0 0 ${size * 2}px ${color};
    `;
    
    container.appendChild(particle);
  }
  
  // Add keyframe animation if not exists
  if (!document.getElementById('particle-keyframes')) {
    const style = document.createElement('style');
    style.id = 'particle-keyframes';
    style.textContent = `
      @keyframes floatParticle {
        0%, 100% {
          transform: translate(0, 0) rotate(0deg);
        }
        25% {
          transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px) rotate(90deg);
        }
        50% {
          transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px) rotate(180deg);
        }
        75% {
          transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px) rotate(270deg);
        }
      }
    `;
    document.head.appendChild(style);
  }
}

function showDashboard(role) {
  // Hide all sections
  document.getElementById('landing-page').style.display = 'none';
  document.getElementById('producer-dashboard').style.display = 'none';
  document.getElementById('rca-dashboard').style.display = 'none';
  document.getElementById('hub-dashboard').style.display = 'none';
  document.getElementById('consumer-dashboard').style.display = 'none';
  
  // Show selected dashboard
  const dashboardMap = {
    'producer': 'producer-dashboard',
    'rca': 'rca-dashboard',
    'hub': 'hub-dashboard',
    'consumer': 'consumer-dashboard'
  };
  
  const dashboardId = dashboardMap[role];
  if (dashboardId) {
    document.getElementById(dashboardId).style.display = 'block';
    currentDashboard = role;
    
    // Update header
    const titleMap = {
      'producer': 'Producer Dashboard',
      'rca': 'RCA Dashboard',
      'hub': 'Hub Operator Dashboard',
      'consumer': 'Consumer Dashboard'
    };
    document.getElementById('dashboard-title').textContent = titleMap[role];
    document.getElementById('back-home-btn').style.display = 'block';
    
    // Initialize dashboard with particles
    switch(role) {
      case 'producer':
        renderProducerDashboard();
        setTimeout(() => {
          createParticles('producer-particles', [
            'rgba(16, 185, 129, 0.6)',
            'rgba(20, 184, 166, 0.6)',
            'rgba(52, 211, 153, 0.6)'
          ]);
        }, 100);
        break;
      case 'rca':
        renderRCADashboard();
        setTimeout(() => {
          createParticles('rca-particles', [
            'rgba(59, 130, 246, 0.6)',
            'rgba(99, 102, 241, 0.6)',
            'rgba(96, 165, 250, 0.6)'
          ]);
        }, 100);
        break;
      case 'hub':
        renderHubDashboard();
        setTimeout(() => {
          createParticles('hub-particles', [
            'rgba(168, 85, 247, 0.6)',
            'rgba(236, 72, 153, 0.6)',
            'rgba(192, 132, 252, 0.6)'
          ]);
        }, 100);
        break;
      case 'consumer':
        renderConsumerDashboard();
        setTimeout(() => {
          createParticles('consumer-particles', [
            'rgba(249, 115, 22, 0.6)',
            'rgba(239, 68, 68, 0.6)',
            'rgba(251, 146, 60, 0.6)'
          ]);
        }, 100);
        break;
    }
  }
}

function goHome() {
  document.getElementById('landing-page').style.display = 'block';
  document.getElementById('producer-dashboard').style.display = 'none';
  document.getElementById('rca-dashboard').style.display = 'none';
  document.getElementById('hub-dashboard').style.display = 'none';
  document.getElementById('consumer-dashboard').style.display = 'none';
  document.getElementById('dashboard-title').textContent = '';
  document.getElementById('back-home-btn').style.display = 'none';
  currentDashboard = 'landing';
}

// ===== PRODUCER DASHBOARD =====

function renderProducerDashboard() {
  renderProducerProducts();
  renderProducerEscrow();
  initProducerMap();
}

function renderProducerProducts() {
  const container = document.getElementById('producer-products-list');
  const userProducts = products.filter(p => true); // In real app, filter by user
  
  if (userProducts.length === 0) {
    container.innerHTML = '<p style="color: var(--color-text-secondary);">No products registered yet.</p>';
    return;
  }
  
  container.innerHTML = userProducts.map(product => `
    <div class="product-item">
      <div class="product-header">
        <div>
          <div class="product-name">${product.name}</div>
          <div style="font-size: var(--font-size-sm); color: var(--color-text-secondary);">${product.id}</div>
        </div>
        ${getStatusBadge(product.status)}
      </div>
      <div class="product-details">
        <div><strong>Quantity:</strong> ${product.quantity}</div>
        <div><strong>Grade:</strong> ${product.grade}</div>
        <div><strong>Location:</strong> ${product.village}</div>
        <div><strong>RCA:</strong> ${product.rca || 'Not assigned'}</div>
        <div><strong>Pickup:</strong> ${product.pickupDate}</div>
      </div>
    </div>
  `).join('');
}

function renderProducerEscrow() {
  const container = document.getElementById('producer-escrow');
  const milestones = [
    { stage: 'Product Registration', percentage: 20, status: 'completed' },
    { stage: 'RCA Pickup', percentage: 30, status: 'completed' },
    { stage: 'Hub QC Pass', percentage: 30, status: 'pending' },
    { stage: 'Delivery Confirmation', percentage: 20, status: 'pending' }
  ];
  
  container.innerHTML = milestones.map(m => `
    <div class="escrow-milestone ${m.status}">
      <div class="escrow-icon">${m.status === 'completed' ? '✓' : '○'}</div>
      <div class="escrow-details">
        <div class="escrow-stage">${m.stage}</div>
        <div class="escrow-percentage">${m.percentage}% payment</div>
      </div>
    </div>
  `).join('');
}

function initProducerMap() {
  const mapContainer = document.getElementById('producer-map');
  mapContainer.innerHTML = `
    <div style="height: 100%; display: flex; align-items: center; justify-content: center; flex-direction: column; gap: 12px; padding: 20px; text-align: center;">
      <div style="font-size: 48px;">📍</div>
      <div><strong>Route Tracking</strong></div>
      <div style="font-size: var(--font-size-sm); color: var(--color-text-secondary);">Village → Hub → City</div>
      <div style="margin-top: 12px;">
        <div style="display: inline-block; width: 60px; height: 4px; background: var(--status-delivered); margin: 0 4px;"></div>
        <div style="display: inline-block; width: 60px; height: 4px; background: var(--status-delivered); margin: 0 4px;"></div>
        <div style="display: inline-block; width: 60px; height: 4px; background: var(--status-pending); margin: 0 4px;"></div>
      </div>
    </div>
  `;
}

// ===== RCA DASHBOARD =====

function renderRCADashboard() {
  renderRCAPendingList();
  updateRCAStats();
}

function renderRCAPendingList() {
  const container = document.getElementById('rca-pending-list');
  const pendingProducts = products.filter(p => p.status === 'pending' || p.status === 'confirmed');
  
  if (pendingProducts.length === 0) {
    container.innerHTML = '<p style="color: var(--color-text-secondary);">No pending pickups.</p>';
    return;
  }
  
  container.innerHTML = pendingProducts.map(product => `
    <div class="pending-item">
      <div class="item-info">
        <div class="item-title">${product.name} (${product.id})</div>
        <div class="item-details">
          ${product.village} • ${product.quantity} • Grade ${product.grade}
        </div>
      </div>
      <button class="btn btn--primary btn--sm" onclick="confirmPickup('${product.id}')">
        Confirm Pickup
      </button>
    </div>
  `).join('');
}

function confirmPickup(productId) {
  const product = getProductById(productId);
  if (product) {
    product.status = 'confirmed';
    product.rca = rcaAgents[0].name;
    showToast(`Pickup confirmed for ${product.name}`);
    renderRCAPendingList();
    updateRCAStats();
  }
}

function updateRCAStats() {
  const collected = products.filter(p => p.status === 'confirmed' || p.status === 'enroute').length;
  const pending = products.filter(p => p.status === 'pending').length;
  const dispatchCount = dispatches.length;
  
  animateValue('rca-collected', 0, collected, 1000);
  animateValue('rca-pending', 0, pending, 1000);
  animateValue('rca-dispatches', 0, dispatchCount, 1000);
}

function animateValue(id, start, end, duration) {
  const element = document.getElementById(id);
  if (!element) return;
  
  const range = end - start;
  const increment = range / (duration / 16);
  let current = start;
  
  const timer = setInterval(() => {
    current += increment;
    if ((increment > 0 && current >= end) || (increment < 0 && current <= end)) {
      element.textContent = end;
      clearInterval(timer);
    } else {
      element.textContent = Math.floor(current);
    }
  }, 16);
}

function handleRCAManualVerify() {
  const productId = document.getElementById('rca-manual-id').value.trim();
  if (!productId) {
    showToast('Please enter a Product ID');
    return;
  }
  
  const product = getProductById(productId);
  const resultContainer = document.getElementById('rca-scan-result');
  
  if (product) {
    resultContainer.innerHTML = `
      <div style="margin-bottom: 12px;"><strong>Product Found:</strong></div>
      <div><strong>Name:</strong> ${product.name}</div>
      <div><strong>Quantity:</strong> ${product.quantity}</div>
      <div><strong>Location:</strong> ${product.village}</div>
      <div><strong>Status:</strong> ${getStatusBadge(product.status)}</div>
      <button class="btn btn--primary" style="margin-top: 12px; width: 100%;" onclick="markAsPickedUp('${product.id}')">
        Mark as Picked Up
      </button>
    `;
    resultContainer.classList.add('show');
  } else {
    resultContainer.innerHTML = `<div style="color: var(--status-issue);">Product not found</div>`;
    resultContainer.classList.add('show');
  }
}

function markAsPickedUp(productId) {
  const product = getProductById(productId);
  if (product) {
    product.status = 'confirmed';
    showToast(`${product.name} marked as picked up`);
    renderRCAPendingList();
    document.getElementById('rca-scan-result').classList.remove('show');
    document.getElementById('rca-manual-id').value = '';
  }
}

// ===== HUB DASHBOARD =====

function renderHubDashboard() {
  renderHubIncomingList();
  populateQCProductSelect();
  initHubMap();
}

function renderHubIncomingList() {
  const container = document.getElementById('hub-incoming-list');
  const incomingProducts = products.filter(p => p.status === 'enroute' || p.status === 'confirmed');
  
  if (incomingProducts.length === 0) {
    container.innerHTML = '<p style="color: var(--color-text-secondary);">No incoming shipments.</p>';
    return;
  }
  
  container.innerHTML = incomingProducts.map(product => `
    <div class="incoming-item">
      <div class="item-info">
        <div class="item-title">${product.name} (${product.id})</div>
        <div class="item-details">
          From: ${product.village} • ${product.quantity} • RCA: ${product.rca || 'N/A'}
        </div>
      </div>
      <button class="btn btn--secondary btn--sm" onclick="markAsReceived('${product.id}')">
        Mark Received
      </button>
    </div>
  `).join('');
}

function markAsReceived(productId) {
  const product = getProductById(productId);
  if (product) {
    product.status = 'enroute';
    showToast(`${product.name} received at hub`);
    renderHubIncomingList();
    populateQCProductSelect();
  }
}

function populateQCProductSelect() {
  const select = document.getElementById('qc-product');
  const receivedProducts = products.filter(p => p.status === 'enroute');
  
  select.innerHTML = '<option value="">Select a product...</option>' + 
    receivedProducts.map(p => `<option value="${p.id}">${p.name} (${p.id})</option>`).join('');
}

function initHubMap() {
  const mapContainer = document.getElementById('hub-map');
  mapContainer.innerHTML = `
    <div style="height: 100%; display: flex; align-items: center; justify-content: center; flex-direction: column; gap: 12px;">
      <div style="font-size: 48px;">🏢</div>
      <div><strong>Hub Location</strong></div>
      <div style="font-size: var(--font-size-sm); color: var(--color-text-secondary);">Vijayawada Hub</div>
      <div style="margin-top: 12px; display: flex; gap: 16px;">
        <div style="text-align: center;">
          <div style="font-size: var(--font-size-xl); color: var(--status-confirmed);">🚚 3</div>
          <div style="font-size: var(--font-size-xs);">Incoming</div>
        </div>
        <div style="text-align: center;">
          <div style="font-size: var(--font-size-xl); color: var(--status-delivered);">🚛 2</div>
          <div style="font-size: var(--font-size-xs);">Outgoing</div>
        </div>
      </div>
    </div>
  `;
}

// ===== CONSUMER DASHBOARD =====

function renderConsumerDashboard() {
  renderConsumerProducts();
  renderConsumerOrders();
  initConsumerMap();
}

function renderConsumerProducts() {
  const container = document.getElementById('consumer-products-grid');
  const availableProducts = products.filter(p => p.status === 'delivered' || p.status === 'enroute');
  
  const productIcons = {
    'Handloom Textiles': '🧵',
    'Bamboo Crafts': '🧺',
    'Spices & Food Products': '🌿',
    'Pottery & Ceramics': '🏺',
    'Handmade Jewelry': '💎',
    'Wooden Handicrafts': '🪀'
  };
  
  // Use sample products for better display
  const displayProducts = sampleMSMEProducts.slice(0, 6);
  
  container.innerHTML = displayProducts.map(product => `
    <div class="product-card">
      <div class="product-image">${product.icon}</div>
      <div class="product-title">${product.name}</div>
      <div class="product-origin">From ${product.village}</div>
      <div style="font-size: var(--font-size-sm); margin-bottom: 8px;">
        <strong>Quality:</strong> Grade ${product.grade} ⭐ ${product.rating}
      </div>
      <div class="product-price">₹${product.price}</div>
      <button class="btn btn--primary btn--sm" style="width: 100%;" onclick="placeOrder('${product.id}')">
        Order Now
      </button>
    </div>
  `).join('');
}

function placeOrder(productId) {
  const product = getProductById(productId);
  if (product) {
    const orderId = generateOrderId();
    const order = {
      id: orderId,
      productId: product.id,
      productName: product.name,
      status: 'enroute',
      date: new Date().toISOString().split('T')[0]
    };
    orders.push(order);
    showToast(`Order placed: ${orderId}`);
    renderConsumerOrders();
  }
}

function renderConsumerOrders() {
  const container = document.getElementById('consumer-orders-list');
  
  if (orders.length === 0) {
    container.innerHTML = '<p style="color: var(--color-text-secondary);">No orders yet.</p>';
    return;
  }
  
  container.innerHTML = orders.map(order => `
    <div class="order-item">
      <div class="order-header">
        <div class="order-id">${order.id}</div>
        ${getStatusBadge(order.status)}
      </div>
      <div style="margin-top: 8px; font-size: var(--font-size-sm);">
        <div><strong>Product:</strong> ${order.productName}</div>
        <div><strong>Date:</strong> ${order.date}</div>
        <div style="margin-top: 8px;">
          <button class="btn btn--secondary btn--sm" onclick="trackOrder('${order.id}')">
            Track Order
          </button>
        </div>
      </div>
    </div>
  `).join('');
}

function trackOrder(orderId) {
  showToast(`Tracking order ${orderId}`);
}

function initConsumerMap() {
  // Initialize tracking map with Leaflet
  setTimeout(() => {
    const pickupLocation = [16.5062, 80.6480]; // Raghavapuram
    const hubLocation = [16.5193, 80.6305]; // Vijayawada
    const deliveryLocation = [17.4485, 78.3908]; // Hyderabad
    
    const map = L.map('consumer-map').setView([16.8, 79.5], 8);
    
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
      maxZoom: 18
    }).addTo(map);
    
    // Custom icons
    const pickupIcon = L.divIcon({
      html: '<div style="background: #10B981; color: white; width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 16px; border: 3px solid white; box-shadow: 0 2px 8px rgba(0,0,0,0.3);">📍</div>',
      className: 'custom-icon',
      iconSize: [32, 32]
    });
    
    const hubIcon = L.divIcon({
      html: '<div style="background: #3B82F6; color: white; width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 16px; border: 3px solid white; box-shadow: 0 2px 8px rgba(0,0,0,0.3);">🏭</div>',
      className: 'custom-icon',
      iconSize: [32, 32]
    });
    
    const vehicleIcon = L.divIcon({
      html: '<div style="background: #F59E0B; color: white; width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 20px; border: 3px solid white; box-shadow: 0 4px 12px rgba(0,0,0,0.4); animation: pulse 2s infinite;">🚚</div>',
      className: 'custom-icon',
      iconSize: [40, 40]
    });
    
    const deliveryIcon = L.divIcon({
      html: '<div style="background: #EF4444; color: white; width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 16px; border: 3px solid white; box-shadow: 0 2px 8px rgba(0,0,0,0.3);">🏠</div>',
      className: 'custom-icon',
      iconSize: [32, 32]
    });
    
    // Add markers
    L.marker(pickupLocation, {icon: pickupIcon})
      .addTo(map)
      .bindPopup('<b>Pickup Point</b><br>Raghavapuram Village');
    
    L.marker(hubLocation, {icon: hubIcon})
      .addTo(map)
      .bindPopup('<b>Processing Hub</b><br>Vijayawada Hub');
    
    L.marker(deliveryLocation, {icon: deliveryIcon})
      .addTo(map)
      .bindPopup('<b>Delivery Destination</b><br>Hitech City, Hyderabad');
    
    // Draw route polyline
    const routeCoordinates = [
      pickupLocation,
      hubLocation,
      [16.7, 79.0],
      [17.0, 79.5],
      [17.2, 79.0],
      deliveryLocation
    ];
    
    const routeLine = L.polyline(routeCoordinates, {
      color: '#3B82F6',
      weight: 4,
      opacity: 0.6,
      dashArray: '10, 10'
    }).addTo(map);
    
    // Vehicle marker (animated)
    let currentStep = 2;
    let vehicleMarker = L.marker(routeCoordinates[currentStep], {icon: vehicleIcon}).addTo(map);
    
    // Animate vehicle movement
    let animationProgress = 0;
    setInterval(() => {
      if (currentStep < routeCoordinates.length - 1) {
        const start = routeCoordinates[currentStep];
        const end = routeCoordinates[currentStep + 1];
        
        animationProgress += 0.002;
        if (animationProgress >= 1) {
          animationProgress = 0;
          currentStep++;
          if (currentStep >= routeCoordinates.length - 1) {
            currentStep = 2;
          }
        }
        
        const lat = start[0] + (end[0] - start[0]) * animationProgress;
        const lng = start[1] + (end[1] - start[1]) * animationProgress;
        
        vehicleMarker.setLatLng([lat, lng]);
        
        // Update ETA
        const remainingSteps = (routeCoordinates.length - 1) - currentStep;
        const eta = Math.round(remainingSteps * 8 + (1 - animationProgress) * 8);
        const etaEl = document.getElementById('consumer-eta');
        if (etaEl) etaEl.textContent = eta + ' minutes';
      }
    }, 100);
    
    // Fit map to show entire route
    map.fitBounds(routeLine.getBounds(), {padding: [50, 50]});
  }, 500);
}

// ===== FORM HANDLERS =====

// Producer - Register Product
document.getElementById('register-product-form').addEventListener('submit', function(e) {
  e.preventDefault();
  
  const product = {
    id: generateProductId(),
    name: document.getElementById('prod-name').value,
    quantity: document.getElementById('prod-quantity').value,
    category: document.getElementById('prod-category').value,
    grade: document.getElementById('prod-grade').value,
    village: document.getElementById('prod-location').value,
    status: 'pending',
    rca: null,
    pickupDate: document.getElementById('prod-date').value,
    qcScore: null
  };
  
  if (isOffline) {
    queuedActions.push({ type: 'register-product', data: product });
    showToast(`Product ${product.id} queued (Offline Mode)`);
  } else {
    products.push(product);
    showToast(`Product registered: ${product.id}`);
  }
  
  this.reset();
  renderProducerDashboard();
});

// RCA - Create Dispatch
document.getElementById('create-dispatch-form').addEventListener('submit', function(e) {
  e.preventDefault();
  
  const dispatch = {
    id: generateDispatchId(),
    products: document.getElementById('dispatch-products').value,
    hub: document.getElementById('dispatch-hub').value,
    vehicle: document.getElementById('dispatch-vehicle').value,
    driver: document.getElementById('dispatch-driver').value,
    eta: document.getElementById('dispatch-eta').value,
    status: 'enroute'
  };
  
  dispatches.push(dispatch);
  
  // Update product statuses
  const productIds = dispatch.products.split(',').map(id => id.trim());
  productIds.forEach(id => {
    const product = getProductById(id);
    if (product) {
      product.status = 'enroute';
    }
  });
  
  showToast(`Dispatch created: ${dispatch.id}`);
  this.reset();
  renderRCADashboard();
});

// Hub - QC Form
document.getElementById('qc-form').addEventListener('submit', function(e) {
  e.preventDefault();
  
  const productId = document.getElementById('qc-product').value;
  const product = getProductById(productId);
  
  if (product) {
    product.qcScore = {
      appearance: document.getElementById('qc-appearance').value,
      freshness: document.getElementById('qc-freshness').value,
      packaging: document.getElementById('qc-packaging').value,
      grade: document.getElementById('qc-grade').value,
      notes: document.getElementById('qc-notes').value
    };
    
    showToast(`QC score submitted for ${product.name}`);
    this.reset();
  }
});

// Hub - Forward Form
document.getElementById('forward-form').addEventListener('submit', function(e) {
  e.preventDefault();
  
  const city = document.getElementById('forward-city').value;
  const productIds = document.getElementById('forward-products').value;
  
  showToast(`Outbound batch created for ${city}`);
  this.reset();
});

// Consumer - Delivery Confirmation
document.getElementById('delivery-confirm-form').addEventListener('submit', function(e) {
  e.preventDefault();
  
  const orderId = document.getElementById('confirm-order-id').value;
  const rating = document.getElementById('rating-value').value;
  const feedback = document.getElementById('confirm-feedback').value;
  
  const order = orders.find(o => o.id === orderId);
  if (order) {
    order.status = 'delivered';
    order.rating = rating;
    order.feedback = feedback;
    showToast(`Delivery confirmed for ${orderId}`);
    this.reset();
    renderConsumerOrders();
  } else {
    showToast('Order not found');
  }
});

// ===== MODAL & QR SCANNER =====

let qrModalCallback = null;

function openQRModal(callback) {
  qrModalCallback = callback;
  document.getElementById('qr-modal').classList.add('show');
}

function closeQRModal() {
  document.getElementById('qr-modal').classList.remove('show');
  qrModalCallback = null;
}

document.getElementById('qr-modal-close').addEventListener('click', closeQRModal);

document.getElementById('rca-scan-qr').addEventListener('click', function() {
  openQRModal((data) => {
    document.getElementById('rca-manual-id').value = data;
    handleRCAManualVerify();
  });
});

document.getElementById('consumer-scan-qr').addEventListener('click', function() {
  openQRModal((data) => {
    document.getElementById('confirm-order-id').value = data;
  });
});

document.getElementById('qr-use-camera').addEventListener('click', function() {
  setTimeout(() => {
    const mockId = 'BG-PROD-0001';
    showToast('QR Code Scanned!');
    if (qrModalCallback) qrModalCallback(mockId);
    closeQRModal();
  }, 1000);
});

document.getElementById('qr-upload-btn').addEventListener('click', function() {
  document.getElementById('qr-upload').click();
});

document.getElementById('qr-upload').addEventListener('change', function() {
  if (this.files.length > 0) {
    setTimeout(() => {
      const mockId = 'BG-PROD-0002';
      showToast('QR Code Scanned from Image!');
      if (qrModalCallback) qrModalCallback(mockId);
      closeQRModal();
    }, 1000);
  }
});

document.getElementById('qr-manual-btn').addEventListener('click', function() {
  const manualId = document.getElementById('qr-manual-input').value.trim();
  if (manualId) {
    showToast('ID Entered!');
    if (qrModalCallback) qrModalCallback(manualId);
    closeQRModal();
  } else {
    showToast('Please enter an ID');
  }
});

// ===== STAR RATING =====

const stars = document.querySelectorAll('.star');
stars.forEach((star, index) => {
  star.addEventListener('click', function() {
    const rating = this.getAttribute('data-rating');
    document.getElementById('rating-value').value = rating;
    
    stars.forEach((s, i) => {
      if (i < rating) {
        s.classList.add('active');
      } else {
        s.classList.remove('active');
      }
    });
  });
});

// ===== EVENT LISTENERS =====

// Role Selection Cards - Make them clickable (both click and touch)
document.querySelectorAll('.role-card').forEach(card => {
  // Make sure cards are keyboard accessible
  card.setAttribute('tabindex', '0');
  card.setAttribute('role', 'button');
  
  const handleActivation = function() {
    const role = this.getAttribute('data-role');
    if (role) {
      console.log(`Navigating to ${role} dashboard`);
      showDashboard(role);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };
  
  // Click event
  card.addEventListener('click', handleActivation);
  
  // Touch event for mobile
  card.addEventListener('touchend', function(e) {
    e.preventDefault();
    handleActivation.call(this);
  });
  
  // Keyboard accessibility
  card.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleActivation.call(this);
    }
  });
});

// Back to Home
document.getElementById('back-home-btn').addEventListener('click', goHome);

// Language Toggle
document.getElementById('lang-toggle').addEventListener('click', function() {
  currentLanguage = currentLanguage === 'en' ? 'te' : 'en';
  this.textContent = currentLanguage === 'en' ? 'తెలుగు' : 'English';
  updateTranslations();
  
  // Re-render current dashboard to update status badges
  if (currentDashboard !== 'landing') {
    showDashboard(currentDashboard);
  }
});

// Offline Toggle
document.getElementById('offline-toggle').addEventListener('click', function() {
  isOffline = !isOffline;
  const banner = document.getElementById('offline-banner');
  
  if (isOffline) {
    this.textContent = 'Go Online';
    this.style.background = 'var(--status-enroute)';
    banner.style.display = 'block';
    showToast('Switched to Offline Mode');
  } else {
    this.textContent = 'Offline Mode';
    this.style.background = '';
    banner.style.display = 'none';
    
      // Process queued actions
    if (queuedActions.length > 0) {
      showToast(`Syncing ${queuedActions.length} queued actions...`);
      setTimeout(() => {
        queuedActions.forEach(action => {
          if (action.type === 'register-product') {
            products.push(action.data);
          }
        });
        queuedActions = [];
        showToast('✓ All data synced successfully!');
        if (currentDashboard !== 'landing') {
          showDashboard(currentDashboard);
        }
      }, 1500);
    } else {
      showToast('✓ Back Online');
    }
  }
});

// RCA Manual Verify
document.getElementById('rca-manual-submit').addEventListener('click', handleRCAManualVerify);

// ===== LOCATION PICKER =====

let locationPickerMap;
let selectedMarker;
let selectedLocation = null;
let locationPickerCallback = null;

function openLocationPicker(callback) {
  locationPickerCallback = callback;
  document.getElementById('location-picker-modal').style.display = 'flex';
  
  setTimeout(() => {
    if (!locationPickerMap) {
      // Initialize map
      locationPickerMap = L.map('location-map').setView([16.5, 80.6], 10);
      
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
      }).addTo(locationPickerMap);
      
      // Click to select location
      locationPickerMap.on('click', function(e) {
        selectLocation(e.latlng.lat, e.latlng.lng);
      });
    } else {
      locationPickerMap.invalidateSize();
    }
  }, 100);
}

function selectLocation(lat, lng) {
  // Remove previous marker if exists
  if (selectedMarker) {
    locationPickerMap.removeLayer(selectedMarker);
  }
  
  // Add new marker
  selectedMarker = L.marker([lat, lng], {
    icon: L.divIcon({
      html: '<div style="background: #EF4444; color: white; width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 20px; border: 3px solid white; box-shadow: 0 2px 8px rgba(0,0,0,0.3);">📍</div>',
      className: 'custom-icon',
      iconSize: [32, 32]
    })
  }).addTo(locationPickerMap);
  
  // Store selected location
  const mockAddress = getMockAddress(lat, lng);
  selectedLocation = { lat, lng, address: mockAddress };
  
  document.getElementById('selected-address').textContent = mockAddress;
  document.getElementById('selected-coordinates').textContent = `${lat.toFixed(6)}, ${lng.toFixed(6)}`;
}

function getMockAddress(lat, lng) {
  // Mock address generation based on coordinates
  const villages = [
    'Raghavapuram Village',
    'Peddapur Village', 
    'Kondapalli Village',
    'Nadukuru Village',
    'Mangalagiri Town'
  ];
  
  if (lat > 17) {
    return 'Hitech City, Hyderabad, Telangana, India';
  } else if (lat > 16.5) {
    return 'Vijayawada, Krishna District, Andhra Pradesh, India';
  } else {
    const randomVillage = villages[Math.floor(Math.random() * villages.length)];
    return `${randomVillage}, Krishna District, Andhra Pradesh, India`;
  }
}

function closeLocationPicker() {
  document.getElementById('location-picker-modal').style.display = 'none';
  selectedLocation = null;
  const suggestionsDiv = document.getElementById('location-suggestions');
  if (suggestionsDiv) suggestionsDiv.style.display = 'none';
}

function confirmLocation() {
  if (selectedLocation && locationPickerCallback) {
    locationPickerCallback(selectedLocation);
  }
  closeLocationPicker();
}

function searchLocations() {
  const query = document.getElementById('location-search').value;
  if (query.length > 2) {
    performLocationSearch(query);
  }
}

function performLocationSearch(query) {
  // Mock search results
  const mockResults = [
    {name: 'Raghavapuram Village, Andhra Pradesh', lat: 16.5062, lng: 80.6480},
    {name: 'Vijayawada Hub, Andhra Pradesh', lat: 16.5193, lng: 80.6305},
    {name: 'Guntur, Andhra Pradesh', lat: 16.3067, lng: 80.4365},
    {name: 'Hyderabad, Telangana', lat: 17.3850, lng: 78.4867},
    {name: 'Kondapalli, Andhra Pradesh', lat: 16.6200, lng: 80.5400},
    {name: 'Nadukuru, Andhra Pradesh', lat: 16.0833, lng: 80.0167}
  ].filter(loc => loc.name.toLowerCase().includes(query.toLowerCase()));
  
  const suggestionsDiv = document.getElementById('location-suggestions');
  if (mockResults.length > 0) {
    suggestionsDiv.style.display = 'block';
    suggestionsDiv.innerHTML = mockResults.map(loc => 
      `<div class="suggestion-item" onclick="selectLocationFromSearch(${loc.lat}, ${loc.lng})">
        📍 ${loc.name}
      </div>`
    ).join('');
  } else {
    suggestionsDiv.style.display = 'none';
  }
}

function selectLocationFromSearch(lat, lng) {
  selectLocation(lat, lng);
  locationPickerMap.setView([lat, lng], 13);
  document.getElementById('location-suggestions').style.display = 'none';
}

// Location search on input
document.addEventListener('DOMContentLoaded', function() {
  const searchInput = document.getElementById('location-search');
  if (searchInput) {
    searchInput.addEventListener('input', function(e) {
      const query = e.target.value;
      if (query.length > 2) {
        performLocationSearch(query);
      } else {
        document.getElementById('location-suggestions').style.display = 'none';
      }
    });
  }
});

// ===== TAB SWITCHING =====

function switchTab(dashboard, tab) {
  // Hide all tabs for this dashboard
  const mainTab = document.getElementById(`${dashboard}-main-tab`);
  const analyticsTab = document.getElementById(`${dashboard}-analytics-tab`);
  
  if (tab === 'main') {
    mainTab.style.display = 'block';
    analyticsTab.style.display = 'none';
  } else if (tab === 'analytics') {
    mainTab.style.display = 'none';
    analyticsTab.style.display = 'block';
    
    // Initialize analytics when tab is opened
    setTimeout(() => {
      initAnalytics(dashboard);
    }, 100);
  }
  
  // Update tab button states
  const tabs = document.querySelectorAll(`#${dashboard}-dashboard .tab-btn`);
  tabs.forEach((btn, index) => {
    if ((tab === 'main' && index === 0) || (tab === 'analytics' && index === 1)) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });
  
  currentTab[dashboard] = tab;
}

// ===== ANALYTICS INITIALIZATION =====

function initAnalytics(dashboard) {
  switch(dashboard) {
    case 'producer':
      initProducerAnalytics();
      break;
    case 'rca':
      initRCAAnalytics();
      break;
    case 'hub':
      initHubAnalytics();
      break;
    case 'consumer':
      initConsumerAnalytics();
      break;
  }
}

// ===== PRODUCER ANALYTICS =====

function initProducerAnalytics() {
  // Animate KPIs
  animateKPIValue('producer-kpi-revenue', 0, 235000, 1500, (val) => `₹${val.toLocaleString('en-IN')}`);
  animateKPIValue('producer-kpi-products', 0, 38, 1000);
  animateKPIValue('producer-kpi-rating', 0, 4.6, 1200, (val) => val.toFixed(1));
  animateKPIValue('producer-kpi-customers', 0, 67, 1000, (val) => `${val}%`);
  
  // Sales Performance Chart
  createLineChart('producer-sales-chart', {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
    datasets: [{
      label: 'Revenue (₹)',
      data: [12000, 15000, 18000, 22000, 20000, 25000, 28000, 30000, 27000, 32000],
      borderColor: '#10B981',
      backgroundColor: 'rgba(16, 185, 129, 0.1)',
      borderWidth: 3,
      tension: 0.4,
      fill: true
    }]
  });
  
  // Category Distribution
  createDoughnutChart('producer-category-chart', {
    labels: ['Handloom', 'Bamboo', 'Spices', 'Pottery', 'Jewelry', 'Woodcraft'],
    datasets: [{
      data: [35, 20, 25, 10, 5, 5],
      backgroundColor: [
        'rgba(59, 130, 246, 0.8)',
        'rgba(16, 185, 129, 0.8)',
        'rgba(245, 158, 11, 0.8)',
        'rgba(168, 85, 247, 0.8)',
        'rgba(236, 72, 153, 0.8)',
        'rgba(249, 115, 22, 0.8)'
      ],
      borderColor: 'rgba(255, 255, 255, 0.2)',
      borderWidth: 2
    }]
  });
  
  // Order Status
  createBarChart('producer-status-chart', {
    labels: ['Pending', 'Confirmed', 'En-route', 'Delivered'],
    datasets: [{
      label: 'Orders',
      data: [5, 12, 8, 45],
      backgroundColor: [
        'rgba(139, 141, 152, 0.8)',
        'rgba(59, 130, 246, 0.8)',
        'rgba(245, 158, 11, 0.8)',
        'rgba(16, 185, 129, 0.8)'
      ],
      borderWidth: 0
    }]
  });
  
  // Monthly Listings
  createBarChart('producer-listings-chart', {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
    datasets: [{
      label: 'Products Listed',
      data: [3, 5, 4, 7, 6, 8, 9, 7, 10, 12],
      backgroundColor: 'rgba(16, 185, 129, 0.8)',
      borderWidth: 0
    }]
  });
  
  // Top Products
  createHorizontalBarChart('producer-top-products-chart', {
    labels: ['Cotton Saree', 'Bamboo Basket', 'Turmeric', 'Clay Pot', 'Silk Dupatta'],
    datasets: [{
      label: 'Revenue (₹)',
      data: [15000, 8000, 6500, 4200, 3800],
      backgroundColor: 'rgba(16, 185, 129, 0.8)',
      borderWidth: 0
    }]
  });
}

// ===== RCA ANALYTICS =====

function initRCAAnalytics() {
  // Animate KPIs
  animateKPIValue('rca-kpi-collections', 0, 287, 1500);
  animateKPIValue('rca-kpi-distance', 0, 1450, 1500, (val) => `${val} km`);
  animateKPIValue('rca-kpi-daily', 0, 12, 1000);
  animateKPIValue('rca-kpi-ontime', 0, 88, 1200, (val) => `${val}%`);
  
  // Daily Collections
  createLineChart('rca-collections-chart', {
    labels: Array.from({length: 30}, (_, i) => `Day ${i+1}`),
    datasets: [{
      label: 'Collections',
      data: [8, 12, 10, 15, 11, 14, 9, 16, 13, 17, 12, 15, 11, 18, 14, 16, 12, 19, 15, 17, 13, 20, 16, 18, 14, 21, 17, 19, 15, 22],
      borderColor: '#3B82F6',
      backgroundColor: 'rgba(59, 130, 246, 0.1)',
      borderWidth: 3,
      tension: 0.4,
      fill: true
    }]
  });
  
  // Collection by Village
  createBarChart('rca-village-chart', {
    labels: ['Raghavapuram', 'Peddapur', 'Kondapalli', 'Muppavarapu', 'Nadukuru'],
    datasets: [{
      label: 'Collections',
      data: [65, 48, 52, 38, 84],
      backgroundColor: 'rgba(59, 130, 246, 0.8)',
      borderWidth: 0
    }]
  });
  
  // Pickup Status
  createDoughnutChart('rca-status-chart', {
    labels: ['Completed', 'Pending', 'Cancelled', 'Rescheduled'],
    datasets: [{
      data: [75, 15, 5, 5],
      backgroundColor: [
        'rgba(16, 185, 129, 0.8)',
        'rgba(245, 158, 11, 0.8)',
        'rgba(239, 68, 68, 0.8)',
        'rgba(139, 141, 152, 0.8)'
      ],
      borderColor: 'rgba(255, 255, 255, 0.2)',
      borderWidth: 2
    }]
  });
  
  // Distance Covered
  createLineChart('rca-distance-chart', {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [{
      label: 'Distance (km)',
      data: [320, 380, 410, 340],
      borderColor: '#3B82F6',
      backgroundColor: 'rgba(59, 130, 246, 0.2)',
      borderWidth: 3,
      tension: 0.4,
      fill: true
    }]
  });
  
  // Product Categories
  createHorizontalBarChart('rca-category-chart', {
    labels: ['Handloom', 'Bamboo', 'Spices', 'Pottery', 'Jewelry', 'Woodcraft'],
    datasets: [{
      label: 'Collections',
      data: [95, 62, 78, 34, 18, 28],
      backgroundColor: 'rgba(59, 130, 246, 0.8)',
      borderWidth: 0
    }]
  });
}

// ===== HUB ANALYTICS =====

function initHubAnalytics() {
  // Animate KPIs
  animateKPIValue('hub-kpi-processed', 0, 512, 1500);
  animateKPIValue('hub-kpi-time', 0, 18, 1000, (val) => `${val} hrs`);
  animateKPIValue('hub-kpi-quality', 0, 95, 1200, (val) => `${val}%`);
  animateKPIValue('hub-kpi-utilization', 0, 72, 1000, (val) => `${val}%`);
  
  // Incoming vs Outgoing
  createLineChart('hub-flow-chart', {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [
      {
        label: 'Incoming',
        data: [125, 138, 142, 130],
        borderColor: '#3B82F6',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        borderWidth: 3,
        tension: 0.4
      },
      {
        label: 'Outgoing',
        data: [118, 132, 136, 126],
        borderColor: '#10B981',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        borderWidth: 3,
        tension: 0.4
      }
    ]
  });
  
  // Quality Scores
  createBarChart('hub-quality-chart', {
    labels: ['Excellent', 'Good', 'Fair', 'Poor', 'Reject'],
    datasets: [{
      label: 'Count',
      data: [120, 95, 35, 8, 2],
      backgroundColor: [
        'rgba(16, 185, 129, 0.8)',
        'rgba(59, 130, 246, 0.8)',
        'rgba(245, 158, 11, 0.8)',
        'rgba(239, 68, 68, 0.8)',
        'rgba(139, 141, 152, 0.8)'
      ],
      borderWidth: 0
    }]
  });
  
  // Processing Time
  createLineChart('hub-processing-chart', {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [{
      label: 'Avg. Hours',
      data: [22, 20, 18, 17],
      borderColor: '#A855F7',
      backgroundColor: 'rgba(168, 85, 247, 0.1)',
      borderWidth: 3,
      tension: 0.4,
      fill: true
    }]
  });
  
  // Destination Cities
  createDoughnutChart('hub-destination-chart', {
    labels: ['Hyderabad', 'Bangalore', 'Chennai', 'Others'],
    datasets: [{
      data: [40, 25, 20, 15],
      backgroundColor: [
        'rgba(168, 85, 247, 0.8)',
        'rgba(236, 72, 153, 0.8)',
        'rgba(59, 130, 246, 0.8)',
        'rgba(139, 141, 152, 0.8)'
      ],
      borderColor: 'rgba(255, 255, 255, 0.2)',
      borderWidth: 2
    }]
  });
  
  // Product Condition
  createDoughnutChart('hub-condition-chart', {
    labels: ['Perfect', 'Minor Damage', 'Major Damage', 'Rejected'],
    datasets: [{
      data: [85, 10, 3, 2],
      backgroundColor: [
        'rgba(16, 185, 129, 0.8)',
        'rgba(245, 158, 11, 0.8)',
        'rgba(239, 68, 68, 0.8)',
        'rgba(139, 141, 152, 0.8)'
      ],
      borderColor: 'rgba(255, 255, 255, 0.2)',
      borderWidth: 2
    }]
  });
}

// ===== CONSUMER ANALYTICS =====

function initConsumerAnalytics() {
  // Animate KPIs
  animateKPIValue('consumer-kpi-orders', 0, 42, 1000);
  animateKPIValue('consumer-kpi-spent', 0, 56780, 1500, (val) => `₹${val.toLocaleString('en-IN')}`);
  animateKPIValue('consumer-kpi-avg', 0, 1352, 1200, (val) => `₹${val.toLocaleString('en-IN')}`);
  animateKPIValue('consumer-kpi-savings', 0, 8450, 1500, (val) => `₹${val.toLocaleString('en-IN')}`);
  
  // Monthly Spending
  createBarChart('consumer-spending-chart', {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [{
      label: 'Spending (₹)',
      data: [8500, 9200, 10500, 8900, 9800, 9880],
      backgroundColor: 'rgba(249, 115, 22, 0.8)',
      borderWidth: 0
    }]
  });
  
  // Order Status
  createDoughnutChart('consumer-status-chart', {
    labels: ['Delivered', 'In Transit', 'Pending', 'Cancelled'],
    datasets: [{
      data: [80, 15, 3, 2],
      backgroundColor: [
        'rgba(16, 185, 129, 0.8)',
        'rgba(245, 158, 11, 0.8)',
        'rgba(139, 141, 152, 0.8)',
        'rgba(239, 68, 68, 0.8)'
      ],
      borderColor: 'rgba(255, 255, 255, 0.2)',
      borderWidth: 2
    }]
  });
  
  // Category Preferences
  createHorizontalBarChart('consumer-preference-chart', {
    labels: ['Handloom', 'Spices', 'Bamboo', 'Pottery', 'Jewelry'],
    datasets: [{
      label: 'Orders',
      data: [15, 12, 8, 5, 2],
      backgroundColor: 'rgba(249, 115, 22, 0.8)',
      borderWidth: 0
    }]
  });
  
  // Delivery Performance
  createLineChart('consumer-delivery-chart', {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [{
      label: 'On-time Delivery %',
      data: [88, 91, 89, 93, 95, 94],
      borderColor: '#10B981',
      backgroundColor: 'rgba(16, 185, 129, 0.1)',
      borderWidth: 3,
      tension: 0.4,
      fill: true
    }]
  });
  
  // Favorite Villages
  createDoughnutChart('consumer-villages-chart', {
    labels: ['Raghavapuram', 'Kondapalli', 'Peddapur', 'Nadukuru', 'Others'],
    datasets: [{
      data: [35, 28, 18, 12, 7],
      backgroundColor: [
        'rgba(249, 115, 22, 0.8)',
        'rgba(239, 68, 68, 0.8)',
        'rgba(59, 130, 246, 0.8)',
        'rgba(16, 185, 129, 0.8)',
        'rgba(139, 141, 152, 0.8)'
      ],
      borderColor: 'rgba(255, 255, 255, 0.2)',
      borderWidth: 2
    }]
  });
}

// ===== CHART CREATION HELPERS =====

function createLineChart(canvasId, data) {
  const ctx = document.getElementById(canvasId);
  if (!ctx) return;
  
  // Destroy existing chart if it exists
  if (charts[canvasId]) {
    charts[canvasId].destroy();
  }
  
  charts[canvasId] = new Chart(ctx, {
    type: 'line',
    data: data,
    options: {
      responsive: true,
      maintainAspectRatio: true,
      plugins: {
        legend: {
          labels: {
            color: '#FFFFFF',
            font: { size: 12 }
          }
        },
        tooltip: {
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          titleColor: '#FFFFFF',
          bodyColor: '#FFFFFF',
          borderColor: 'rgba(255, 255, 255, 0.2)',
          borderWidth: 1
        }
      },
      scales: {
        x: {
          ticks: { color: 'rgba(255, 255, 255, 0.7)', font: { size: 11 } },
          grid: { color: 'rgba(255, 255, 255, 0.1)' }
        },
        y: {
          ticks: { color: 'rgba(255, 255, 255, 0.7)', font: { size: 11 } },
          grid: { color: 'rgba(255, 255, 255, 0.1)' }
        }
      }
    }
  });
}

function createBarChart(canvasId, data) {
  const ctx = document.getElementById(canvasId);
  if (!ctx) return;
  
  if (charts[canvasId]) {
    charts[canvasId].destroy();
  }
  
  charts[canvasId] = new Chart(ctx, {
    type: 'bar',
    data: data,
    options: {
      responsive: true,
      maintainAspectRatio: true,
      plugins: {
        legend: {
          display: false
        },
        tooltip: {
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          titleColor: '#FFFFFF',
          bodyColor: '#FFFFFF'
        }
      },
      scales: {
        x: {
          ticks: { color: 'rgba(255, 255, 255, 0.7)', font: { size: 11 } },
          grid: { display: false }
        },
        y: {
          ticks: { color: 'rgba(255, 255, 255, 0.7)', font: { size: 11 } },
          grid: { color: 'rgba(255, 255, 255, 0.1)' }
        }
      }
    }
  });
}

function createHorizontalBarChart(canvasId, data) {
  const ctx = document.getElementById(canvasId);
  if (!ctx) return;
  
  if (charts[canvasId]) {
    charts[canvasId].destroy();
  }
  
  charts[canvasId] = new Chart(ctx, {
    type: 'bar',
    data: data,
    options: {
      indexAxis: 'y',
      responsive: true,
      maintainAspectRatio: true,
      plugins: {
        legend: {
          display: false
        },
        tooltip: {
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          titleColor: '#FFFFFF',
          bodyColor: '#FFFFFF'
        }
      },
      scales: {
        x: {
          ticks: { color: 'rgba(255, 255, 255, 0.7)', font: { size: 11 } },
          grid: { color: 'rgba(255, 255, 255, 0.1)' }
        },
        y: {
          ticks: { color: 'rgba(255, 255, 255, 0.7)', font: { size: 11 } },
          grid: { display: false }
        }
      }
    }
  });
}

function createDoughnutChart(canvasId, data) {
  const ctx = document.getElementById(canvasId);
  if (!ctx) return;
  
  if (charts[canvasId]) {
    charts[canvasId].destroy();
  }
  
  charts[canvasId] = new Chart(ctx, {
    type: 'doughnut',
    data: data,
    options: {
      responsive: true,
      maintainAspectRatio: true,
      plugins: {
        legend: {
          position: 'right',
          labels: {
            color: '#FFFFFF',
            padding: 15,
            font: { size: 11 }
          }
        },
        tooltip: {
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          titleColor: '#FFFFFF',
          bodyColor: '#FFFFFF',
          callbacks: {
            label: function(context) {
              return context.label + ': ' + context.parsed + '%';
            }
          }
        }
      }
    }
  });
}

function animateKPIValue(id, start, end, duration, formatter = null) {
  const element = document.getElementById(id);
  if (!element) return;
  
  const range = end - start;
  const increment = range / (duration / 16);
  let current = start;
  
  const timer = setInterval(() => {
    current += increment;
    if ((increment > 0 && current >= end) || (increment < 0 && current <= end)) {
      const finalValue = formatter ? formatter(end) : end;
      element.textContent = finalValue;
      clearInterval(timer);
    } else {
      const value = formatter ? formatter(Math.floor(current)) : Math.floor(current);
      element.textContent = value;
    }
  }, 16);
}

// Make functions globally accessible
window.switchTab = switchTab;
window.scrollToSection = scrollToSection;
window.scrollCarousel = scrollCarousel;
window.showDashboard = showDashboard;
window.confirmPickup = confirmPickup;
window.handleRCAManualVerify = handleRCAManualVerify;
window.markAsPickedUp = markAsPickedUp;
window.markAsReceived = markAsReceived;
window.placeOrder = placeOrder;
window.trackOrder = trackOrder;
window.openLocationPicker = openLocationPicker;
window.closeLocationPicker = closeLocationPicker;
window.confirmLocation = confirmLocation;
window.selectLocation = selectLocation;
window.searchLocations = searchLocations;
window.selectLocationFromSearch = selectLocationFromSearch;

// ===== SCROLL ANIMATIONS =====

function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, observerOptions);

  // Observe all animated elements
  document.querySelectorAll('.scroll-fade-in, .scroll-fade-in-right, .scroll-stagger, .scroll-slide-in').forEach(el => {
    observer.observe(el);
  });

  // Animated counters
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.stat-number').forEach(el => {
    counterObserver.observe(el);
  });
}

function animateCounter(element) {
  const target = parseInt(element.getAttribute('data-target'));
  const duration = 2000;
  const increment = target / (duration / 16);
  let current = 0;

  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      element.textContent = target + '+';
      element.style.transform = 'scale(1.1)';
      setTimeout(() => {
        element.style.transform = 'scale(1)';
      }, 200);
      clearInterval(timer);
    } else {
      element.textContent = Math.floor(current);
    }
  }, 16);
}

// ===== LANDING PAGE FUNCTIONS =====

function scrollToSection(sectionId) {
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

function renderProductsCarousel() {
  const carousel = document.getElementById('products-carousel');
  if (!carousel) return;

  carousel.innerHTML = sampleMSMEProducts.map(product => `
    <div class="showcase-product-card">
      <div class="showcase-product-image">${product.icon}</div>
      <div class="showcase-product-name">${product.name}</div>
      <div class="showcase-product-village">📍 ${product.village}</div>
      <div class="showcase-product-price">₹${product.price}</div>
      <button class="btn btn--primary btn--sm" style="width: 100%;" onclick="showDashboard('consumer')">
        View Details
      </button>
    </div>
  `).join('');
}

function scrollCarousel(direction) {
  const carousel = document.getElementById('products-carousel');
  if (!carousel) return;
  
  const scrollAmount = 320;
  carousel.scrollLeft += direction * scrollAmount;
}

// ===== INITIALIZATION =====

document.addEventListener('DOMContentLoaded', function() {
  updateTranslations();
  initScrollAnimations();
  renderProductsCarousel();
  initRevolutionParticles();
  console.log('BiGeo MSME Platform Initialized - Enhanced Edition');
});

// Initialize particles for revolution section
function initRevolutionParticles() {
  const particlesContainer = document.getElementById('particles-bg');
  if (!particlesContainer) return;
  
  const colors = [
    'rgba(16, 185, 129, 0.4)',
    'rgba(59, 130, 246, 0.4)',
    'rgba(168, 85, 247, 0.4)',
    'rgba(249, 115, 22, 0.4)',
    'rgba(236, 72, 153, 0.4)'
  ];
  
  for (let i = 0; i < 40; i++) {
    const particle = document.createElement('div');
    const size = Math.random() * 10 + 5;
    const color = colors[Math.floor(Math.random() * colors.length)];
    const startX = Math.random() * 100;
    const startY = Math.random() * 100;
    const duration = Math.random() * 25 + 20;
    const delay = Math.random() * 10;
    
    particle.style.cssText = `
      position: absolute;
      width: ${size}px;
      height: ${size}px;
      background: ${color};
      border-radius: 50%;
      left: ${startX}%;
      top: ${startY}%;
      opacity: 0.6;
      animation: floatParticle ${duration}s ${delay}s infinite ease-in-out;
      box-shadow: 0 0 ${size * 3}px ${color};
    `;
    
    particlesContainer.appendChild(particle);
  }
}