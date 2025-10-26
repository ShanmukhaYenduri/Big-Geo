// BiGeo Application - Main JavaScript

// ===== DATA STRUCTURES =====

let currentLanguage = 'en';
let isOffline = false;
let currentDashboard = 'landing';
let productIdCounter = 4;
let dispatchIdCounter = 1;
let orderIdCounter = 1;

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
    
    // Initialize dashboard
    switch(role) {
      case 'producer':
        renderProducerDashboard();
        break;
      case 'rca':
        renderRCADashboard();
        break;
      case 'hub':
        renderHubDashboard();
        break;
      case 'consumer':
        renderConsumerDashboard();
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
  
  document.getElementById('rca-collected').textContent = collected;
  document.getElementById('rca-pending').textContent = pending;
  document.getElementById('rca-dispatches').textContent = dispatchCount;
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
  const mapContainer = document.getElementById('consumer-map');
  mapContainer.innerHTML = `
    <div style="height: 100%; display: flex; align-items: center; justify-content: center; flex-direction: column; gap: 12px;">
      <div style="font-size: 64px;">🚚</div>
      <div><strong>Delivery in Progress</strong></div>
      <div style="font-size: var(--font-size-sm); color: var(--color-text-secondary);">Live tracking simulation</div>
      <div style="margin-top: 12px;">
        <div style="width: 200px; height: 4px; background: var(--color-border); border-radius: 999px; overflow: hidden;">
          <div style="width: 65%; height: 100%; background: var(--status-delivered);"></div>
        </div>
        <div style="text-align: center; margin-top: 8px; font-size: var(--font-size-sm);">65% Complete</div>
      </div>
    </div>
  `;
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

// CTA Buttons
document.querySelectorAll('.cta-btn').forEach(btn => {
  btn.addEventListener('click', function() {
    const role = this.getAttribute('data-role');
    showDashboard(role);
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
        showToast('All data synced!');
        if (currentDashboard !== 'landing') {
          showDashboard(currentDashboard);
        }
      }, 1500);
    } else {
      showToast('Back Online');
    }
  }
});

// RCA Manual Verify
document.getElementById('rca-manual-submit').addEventListener('click', handleRCAManualVerify);

// Make functions globally accessible
window.scrollToSection = scrollToSection;
window.scrollCarousel = scrollCarousel;

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
  const step = target / (duration / 16);
  let current = 0;

  const timer = setInterval(() => {
    current += step;
    if (current >= target) {
      element.textContent = target + '+';
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
  console.log('BiGeo MSME Platform Initialized');
});