/**
 * FRESHBASKET SUPERMARKET - CHECKOUT ENGINE
 * Multi-step form controller, Delivery vs Store Pickup switcher, Date & Time slot picker, and demo payment process
 */

document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('checkout-form')) {
    initCheckoutPage();
  }
});

function initCheckoutPage() {
  renderCheckoutSummary();
  initDeliveryPickupToggle();
  initPaymentSelection();
  initFormSubmission();
}

function renderCheckoutSummary() {
  const container = document.getElementById('checkout-order-summary');
  if (!container) return;

  const cart = getCart();
  if (cart.length === 0) {
    window.location.href = 'cart.html';
    return;
  }

  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const appliedCoupon = JSON.parse(localStorage.getItem('fb_applied_coupon') || 'null');
  let discount = 0;

  if (appliedCoupon) {
    if (appliedCoupon.code === 'FRESH10') discount = Math.round(subtotal * 0.10);
    else if (appliedCoupon.code === 'SAVE50') discount = 50;
  }

  const deliveryFee = subtotal >= 500 ? 0 : 40;
  const tax = Math.round((subtotal - discount) * 0.05);
  const grandTotal = Math.max(0, subtotal - discount + deliveryFee + tax);

  container.innerHTML = `
    <div class="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6 space-y-4 sticky top-24">
      <h3 class="font-bold text-lg text-slate-900 dark:text-slate-100 pb-3 border-b border-slate-200 dark:border-slate-700">Order Overview</h3>
      <div class="max-h-60 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-700 pr-1">
        ${cart.map(item => `
          <div class="py-2.5 flex items-center justify-between text-xs">
            <div class="flex items-center gap-2">
              <span class="font-bold text-emerald-600">${item.quantity}x</span>
              <span class="font-medium text-slate-800 dark:text-slate-200 line-clamp-1">${item.name}</span>
            </div>
            <span class="font-bold text-slate-900 dark:text-slate-100">₹${item.price * item.quantity}</span>
          </div>
        `).join('')}
      </div>

      <div class="space-y-2 text-xs text-slate-600 dark:text-slate-300 pt-3 border-t border-slate-200 dark:border-slate-700">
        <div class="flex justify-between"><span>Subtotal</span><span>₹${subtotal}</span></div>
        ${discount > 0 ? `<div class="flex justify-between text-emerald-600"><span>Discount</span><span>-₹${discount}</span></div>` : ''}
        <div class="flex justify-between"><span>Delivery Fee</span><span>${deliveryFee === 0 ? 'FREE' : '₹' + deliveryFee}</span></div>
        <div class="flex justify-between"><span>GST (5%)</span><span>₹${tax}</span></div>
      </div>

      <div class="pt-3 border-t border-slate-200 dark:border-slate-700 flex justify-between items-baseline">
        <span class="font-bold text-sm text-slate-900 dark:text-slate-100">Total Payable</span>
        <span class="font-extrabold text-xl text-emerald-600">₹${grandTotal}</span>
      </div>

      <button type="submit" form="checkout-form" class="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl transition-colors shadow-lg shadow-emerald-600/20">
        Place Order (₹${grandTotal})
      </button>
    </div>
  `;
}

function initDeliveryPickupToggle() {
  const deliveryTab = document.getElementById('tab-delivery');
  const pickupTab = document.getElementById('tab-pickup');
  const addressSection = document.getElementById('section-address');
  const storePickupSection = document.getElementById('section-pickup-store');

  if (!deliveryTab || !pickupTab) return;

  deliveryTab.addEventListener('click', () => {
    deliveryTab.classList.add('bg-emerald-600', 'text-white');
    deliveryTab.classList.remove('bg-slate-100', 'text-slate-700', 'dark:bg-slate-800');
    pickupTab.classList.remove('bg-emerald-600', 'text-white');
    pickupTab.classList.add('bg-slate-100', 'text-slate-700', 'dark:bg-slate-800');

    if (addressSection) addressSection.classList.remove('hidden');
    if (storePickupSection) storePickupSection.classList.add('hidden');
  });

  pickupTab.addEventListener('click', () => {
    pickupTab.classList.add('bg-emerald-600', 'text-white');
    pickupTab.classList.remove('bg-slate-100', 'text-slate-700', 'dark:bg-slate-800');
    deliveryTab.classList.remove('bg-emerald-600', 'text-white');
    deliveryTab.classList.add('bg-slate-100', 'text-slate-700', 'dark:bg-slate-800');

    if (addressSection) addressSection.classList.add('hidden');
    if (storePickupSection) storePickupSection.classList.remove('hidden');
  });
}

function initPaymentSelection() {
  const paymentOptions = document.querySelectorAll('.payment-option-radio');
  paymentOptions.forEach(radio => {
    radio.addEventListener('change', (e) => {
      document.querySelectorAll('.payment-card-details').forEach(card => card.classList.add('hidden'));
      const targetDetail = document.getElementById(`payment-detail-${e.target.value}`);
      if (targetDetail) targetDetail.classList.remove('hidden');
    });
  });
}

function initFormSubmission() {
  const form = document.getElementById('checkout-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const orderId = 'FB-' + Math.floor(100000 + Math.random() * 900000);
    const cart = getCart();
    const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

    const orderData = {
      orderId: orderId,
      date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
      time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
      items: cart,
      subtotal: subtotal,
      grandTotal: subtotal + (subtotal >= 500 ? 0 : 40),
      status: 'Confirmed',
      deliverySlot: document.getElementById('delivery-time-slot')?.value || 'Today, 6:00 PM - 8:00 PM',
      deliveryAddress: 'Flat 402, Green Avenue, RS Puram, Coimbatore - 641002'
    };

    localStorage.setItem('fb_last_order', JSON.stringify(orderData));

    // Save to order history
    let history = JSON.parse(localStorage.getItem('fb_order_history') || '[]');
    history.unshift(orderData);
    localStorage.setItem('fb_order_history', JSON.stringify(history));

    // Clear cart
    localStorage.removeItem('fb_cart');
    localStorage.removeItem('fb_applied_coupon');

    showToast('Order Placed Successfully!', 'success');

    setTimeout(() => {
      window.location.href = 'order-confirmation.html';
    }, 1000);
  });
}
