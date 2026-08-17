/**
 * FRESHBASKET SUPERMARKET - CUSTOMER DASHBOARD SUITE
 * Dashboard stats population, order history table, reorder actions & profile manager
 */

document.addEventListener('DOMContentLoaded', () => {
  initDashboardOverview();
  initDashboardOrderHistory();
  initReorderHandler();
  initProfileForm();
});

function initDashboardOverview() {
  const pointsEl = document.getElementById('dash-loyalty-points');
  const activeOrderWidget = document.getElementById('dash-active-order-widget');
  const totalOrdersEl = document.getElementById('dash-total-orders');

  const history = JSON.parse(localStorage.getItem('fb_order_history') || '[]');
  const lastOrder = JSON.parse(localStorage.getItem('fb_last_order') || 'null');

  if (pointsEl) pointsEl.textContent = '2,450';
  if (totalOrdersEl) totalOrdersEl.textContent = history.length > 0 ? history.length : '12';

  if (activeOrderWidget && lastOrder) {
    activeOrderWidget.innerHTML = `
      <div class="flex flex-wrap items-center justify-between gap-4">
        <div>
          <div class="flex items-center gap-2">
            <span class="w-3 h-3 bg-emerald-500 rounded-full animate-ping"></span>
            <h4 class="font-bold text-slate-900 dark:text-slate-100">Order #${lastOrder.orderId} is ${lastOrder.status}</h4>
          </div>
          <p class="text-xs text-slate-500 mt-1">Expected delivery slot: <strong>${lastOrder.deliverySlot}</strong></p>
        </div>
        <a href="../order-tracking.html" class="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs rounded-lg transition-colors">
          Track Live Order
        </a>
      </div>
    `;
  }
}

function initDashboardOrderHistory() {
  const container = document.getElementById('dash-order-history-tbody');
  if (!container) return;

  const history = JSON.parse(localStorage.getItem('fb_order_history') || '[]');

  const demoOrders = history.length > 0 ? history : [
    { orderId: 'FB-918234', date: '12 Aug 2026', grandTotal: 540, status: 'Delivered', itemsCount: 4 },
    { orderId: 'FB-782190', date: '05 Aug 2026', grandTotal: 1250, status: 'Delivered', itemsCount: 9 },
    { orderId: 'FB-654123', date: '28 Jul 2026', grandTotal: 340, status: 'Delivered', itemsCount: 3 }
  ];

  container.innerHTML = demoOrders.map(order => `
    <tr class="border-b border-slate-100 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-900/40">
      <td class="py-3 px-4 font-bold text-slate-900 dark:text-slate-100">#${order.orderId}</td>
      <td class="py-3 px-4 text-xs text-slate-500">${order.date}</td>
      <td class="py-3 px-4 text-xs text-slate-600 dark:text-slate-400">${order.itemsCount || order.items?.length || 3} items</td>
      <td class="py-3 px-4 font-bold text-emerald-600">₹${order.grandTotal}</td>
      <td class="py-3 px-4">
        <span class="px-2.5 py-1 text-xs font-semibold rounded-full ${order.status === 'Delivered' ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300' : 'bg-amber-100 text-amber-800'}">
          ${order.status}
        </span>
      </td>
      <td class="py-3 px-4 text-right">
        <button class="reorder-btn px-3 py-1.5 bg-slate-900 dark:bg-slate-700 hover:bg-emerald-600 text-white font-medium text-xs rounded-lg transition-colors" data-order-id="${order.orderId}">
          <i class="fas fa-rotate-left mr-1"></i> Reorder
        </button>
      </td>
    </tr>
  `).join('');

  initReorderHandler();
}

function initReorderHandler() {
  document.querySelectorAll('.reorder-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      // Demo reorder: add default staples back into cart
      const defaultReorderItems = [
        { id: 'prod-001', name: 'Fresh Organic Bananas (Yelakki)', price: 49, unit: '1 kg', quantity: 2, image: '../../assets/images/organic-yelakki-bananas.webp', category: 'Fruits & Vegetables' },
        { id: 'prod-003', name: 'Farm Fresh Toned Milk (Pouch)', price: 62, unit: '1 Litre', quantity: 2, image: '../../assets/images/farm-toned-milk.webp', category: 'Dairy & Eggs' },
        { id: 'prod-005', name: 'Whole Wheat Multigrain Bread', price: 45, unit: '400g Pack', quantity: 1, image: '../../assets/images/fresh-bakery-category.webp', category: 'Bakery' }
      ];

      let cart = getCart();
      defaultReorderItems.forEach(item => {
        const existing = cart.find(c => c.id === item.id);
        if (existing) existing.quantity += item.quantity;
        else cart.push(item);
      });

      saveCart(cart);
      showToast('Reorder items added back to your cart!', 'success');
      setTimeout(() => {
        window.location.href = '../cart.html';
      }, 800);
    });
  });
}

function initProfileForm() {
  const profileForm = document.getElementById('profile-settings-form');
  if (!profileForm) return;

  profileForm.addEventListener('submit', (e) => {
    e.preventDefault();
    showToast('Profile information saved successfully', 'success');
  });
}
