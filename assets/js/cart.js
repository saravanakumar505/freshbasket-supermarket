/**
 * FRESHBASKET SUPERMARKET - CART CONTROLLER
 * LocalStorage state management, subtotal calculation, coupon discounts, and cart page renderer
 */

function getCart() {
  return JSON.parse(localStorage.getItem('fb_cart') || '[]');
}

function saveCart(cart) {
  localStorage.setItem('fb_cart', JSON.stringify(cart));
  if (typeof updateHeaderBadges === 'function') {
    updateHeaderBadges();
  }
}

function addToCart(product, quantity = 1) {
  let cart = getCart();
  const index = cart.findIndex(item => item.id === product.id);

  if (index > -1) {
    cart[index].quantity += quantity;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice,
      unit: product.unit,
      image: product.image,
      category: product.category,
      quantity: quantity
    });
  }

  saveCart(cart);
  showToast(`Added "${product.name}" to your cart`, 'success');

  if (document.getElementById('cart-items-table')) {
    renderCartPage();
  }
}

function updateCartQuantity(id, change) {
  let cart = getCart();
  const index = cart.findIndex(item => item.id === id);

  if (index > -1) {
    cart[index].quantity += change;
    if (cart[index].quantity <= 0) {
      cart.splice(index, 1);
    }
    saveCart(cart);
    renderCartPage();
  }
}

function removeFromCart(id) {
  let cart = getCart();
  cart = cart.filter(item => item.id !== id);
  saveCart(cart);
  showToast('Item removed from cart', 'warning');
  renderCartPage();
}

function clearCart() {
  saveCart([]);
  renderCartPage();
}

function renderCartPage() {
  const container = document.getElementById('cart-items-table');
  const summaryContainer = document.getElementById('cart-summary-container');
  if (!container) return;

  const cart = getCart();

  if (cart.length === 0) {
    container.innerHTML = `
      <div class="p-8 text-center bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
        <i class="fas fa-shopping-basket text-6xl text-slate-300 dark:text-slate-600 mb-4"></i>
        <h3 class="text-xl font-bold mb-2">Your Basket is Empty</h3>
        <p class="text-slate-500 mb-6">Looks like you haven't added any fresh groceries to your cart yet.</p>
        <a href="shop.html" class="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg transition-colors">
          <i class="fas fa-arrow-left"></i>
          Start Shopping
        </a>
      </div>
    `;
    if (summaryContainer) {
      summaryContainer.innerHTML = '';
    }
    return;
  }

  container.innerHTML = `
    <div class="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
      <div class="p-4 border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50 flex justify-between items-center">
        <h2 class="font-bold text-lg text-slate-900 dark:text-slate-100">Shopping Basket (${cart.reduce((a, c) => a + c.quantity, 0)} Items)</h2>
        <button onclick="clearCart()" class="text-xs text-red-500 hover:underline flex items-center gap-1 font-medium">
          <i class="fas fa-trash-can"></i> Clear Basket
        </button>
      </div>
      <div class="divide-y divide-slate-200 dark:divide-slate-700">
        ${cart.map(item => `
          <div class="p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div class="flex items-center gap-4">
              <img src="${item.image}" alt="${item.name}" class="w-16 h-16 object-contain rounded-lg bg-slate-100 dark:bg-slate-900 p-1">
              <div>
                <span class="text-xs text-emerald-600 font-semibold">${item.category || 'Grocery'}</span>
                <h4 class="font-bold text-slate-900 dark:text-slate-100 text-sm">${item.name}</h4>
                <p class="text-xs text-slate-500">${item.unit} • ₹${item.price} each</p>
              </div>
            </div>
            <div class="flex items-center justify-between w-full sm:w-auto gap-6">
              <div class="quantity-control">
                <button onclick="updateCartQuantity('${item.id}', -1)"><i class="fas fa-minus text-xs"></i></button>
                <input type="text" value="${item.quantity}" readonly>
                <button onclick="updateCartQuantity('${item.id}', 1)"><i class="fas fa-plus text-xs"></i></button>
              </div>
              <div class="text-right min-w-[80px]">
                <span class="font-extrabold text-slate-900 dark:text-slate-100 block">₹${item.price * item.quantity}</span>
              </div>
              <button onclick="removeFromCart('${item.id}')" class="text-slate-400 hover:text-red-500 transition-colors p-1" title="Remove Item">
                <i class="fas fa-times"></i>
              </button>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;

  renderCartSummary(summaryContainer, cart);
}

function renderCartSummary(summaryContainer, cart) {
  if (!summaryContainer) return;

  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const appliedCoupon = JSON.parse(localStorage.getItem('fb_applied_coupon') || 'null');
  let discount = 0;

  if (appliedCoupon) {
    if (appliedCoupon.code === 'FRESH10') {
      discount = Math.round(subtotal * 0.10);
    } else if (appliedCoupon.code === 'SAVE50') {
      discount = 50;
    }
  }

  const deliveryFee = subtotal >= 500 || subtotal === 0 ? 0 : 40;
  const tax = Math.round((subtotal - discount) * 0.05); // 5% GST
  const grandTotal = Math.max(0, subtotal - discount + deliveryFee + tax);

  summaryContainer.innerHTML = `
    <div class="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6 space-y-4">
      <h3 class="font-bold text-lg text-slate-900 dark:text-slate-100 pb-3 border-b border-slate-200 dark:border-slate-700">Order Summary</h3>
      
      <!-- Coupon Field -->
      <div>
        <label class="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1.5">Have a Promo Coupon?</label>
        <div class="flex gap-2">
          <input type="text" id="coupon-input" placeholder="e.g. FRESH10 or SAVE50" value="${appliedCoupon ? appliedCoupon.code : ''}" class="flex-1 px-3 py-2 text-xs border border-slate-200 dark:border-slate-700 rounded-lg uppercase">
          <button id="apply-coupon-btn" class="px-4 py-2 bg-slate-900 dark:bg-slate-700 hover:bg-emerald-600 text-white font-semibold text-xs rounded-lg transition-colors">
            ${appliedCoupon ? 'Applied' : 'Apply'}
          </button>
        </div>
        ${appliedCoupon ? `<p class="text-xs text-emerald-600 mt-1 font-medium"><i class="fas fa-tag"></i> Promo code '${appliedCoupon.code}' applied!</p>` : ''}
      </div>

      <div class="space-y-2 text-sm text-slate-600 dark:text-slate-300 pt-2 border-t border-slate-100 dark:border-slate-700">
        <div class="flex justify-between">
          <span>Subtotal</span>
          <span class="font-semibold text-slate-900 dark:text-slate-100">₹${subtotal}</span>
        </div>
        ${discount > 0 ? `
          <div class="flex justify-between text-emerald-600 font-medium">
            <span>Discount Coupon</span>
            <span>-₹${discount}</span>
          </div>
        ` : ''}
        <div class="flex justify-between">
          <span>Delivery Charge</span>
          <span>${deliveryFee === 0 ? '<span class="text-emerald-600 font-bold">FREE</span>' : '₹' + deliveryFee}</span>
        </div>
        <div class="flex justify-between">
          <span>Estimated GST (5%)</span>
          <span class="font-semibold text-slate-900 dark:text-slate-100">₹${tax}</span>
        </div>
      </div>

      <div class="pt-3 border-t border-slate-200 dark:border-slate-700 flex justify-between items-baseline">
        <span class="font-bold text-base text-slate-900 dark:text-slate-100">Grand Total</span>
        <span class="font-extrabold text-2xl text-emerald-600">₹${grandTotal}</span>
      </div>

      ${deliveryFee > 0 ? `
        <div class="p-2.5 bg-amber-50 dark:bg-amber-900/30 border border-amber-200 dark:border-amber-800 rounded-lg text-xs text-amber-800 dark:text-amber-200">
          <i class="fas fa-truck-fast"></i> Add <strong>₹${500 - subtotal}</strong> more to qualify for <strong>FREE Delivery!</strong>
        </div>
      ` : `
        <div class="p-2.5 bg-emerald-50 dark:bg-emerald-900/30 border border-emerald-200 dark:border-emerald-800 rounded-lg text-xs text-emerald-800 dark:text-emerald-200 font-medium">
          <i class="fas fa-circle-check"></i> You've unlocked <strong>FREE Express Home Delivery!</strong>
        </div>
      `}

      <a href="checkout.html" class="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-center rounded-xl block transition-colors shadow-lg shadow-emerald-600/20">
        Proceed to Checkout <i class="fas fa-arrow-right ml-2"></i>
      </a>
    </div>
  `;

  const couponBtn = document.getElementById('apply-coupon-btn');
  if (couponBtn) {
    couponBtn.addEventListener('click', () => {
      const code = (document.getElementById('coupon-input')?.value || '').trim().toUpperCase();
      if (code === 'FRESH10' || code === 'SAVE50') {
        localStorage.setItem('fb_applied_coupon', JSON.stringify({ code }));
        showToast(`Coupon ${code} applied successfully!`, 'success');
        renderCartPage();
      } else {
        showToast('Invalid coupon code. Try FRESH10 or SAVE50', 'error');
      }
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('cart-items-table')) {
    renderCartPage();
  }
});
