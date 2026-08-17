/**
 * FRESHBASKET SUPERMARKET - WEEKLY SHOPPING LIST MANAGER
 * Custom list builder, checkbox toggles, localStorage sync & single-click 'Add All to Cart'
 */

const DEFAULT_SHOPPING_LIST = [
  { id: 'item-1', name: 'Fresh Toned Milk', unit: '1 Litre', quantity: 2, price: 62, checked: false, image: '../assets/images/farm-toned-milk.webp' },
  { id: 'item-2', name: 'Organic Country Brown Eggs', unit: '12 Pcs', quantity: 1, price: 110, checked: false, image: '../assets/images/country-brown-eggs.webp' },
  { id: 'item-3', name: 'Whole Wheat Bread', unit: '400g Pack', quantity: 2, price: 45, checked: true, image: '../assets/images/fresh-bakery-category.webp' },
  { id: 'item-4', name: 'Royal Shimla Red Apples', unit: '1 kg', quantity: 1, price: 149, checked: false, image: '../assets/images/shimla-red-apples.webp' },
  { id: 'item-5', name: 'Basmati Rice (Aged)', unit: '1 kg', quantity: 2, price: 185, checked: false, image: '../assets/images/basmati-rice-grain.webp' }
];

function getShoppingList() {
  const saved = localStorage.getItem('fb_shopping_list');
  if (!saved) {
    localStorage.setItem('fb_shopping_list', JSON.stringify(DEFAULT_SHOPPING_LIST));
    return DEFAULT_SHOPPING_LIST;
  }
  return JSON.parse(saved);
}

function saveShoppingList(list) {
  localStorage.setItem('fb_shopping_list', JSON.stringify(list));
  renderShoppingListPage();
}

function addToShoppingList(product) {
  let list = getShoppingList();
  const existing = list.find(item => item.name.toLowerCase() === product.name.toLowerCase());

  if (existing) {
    existing.quantity += 1;
  } else {
    list.push({
      id: 'item-' + Date.now(),
      name: product.name,
      unit: product.unit || '1 Pack',
      quantity: 1,
      price: product.price || 50,
      checked: false,
      image: product.image
    });
  }

  saveShoppingList(list);
  showToast(`Added "${product.name}" to your Weekly Shopping List`, 'success');
}

function toggleShoppingItemCheck(id) {
  let list = getShoppingList();
  const item = list.find(i => i.id === id);
  if (item) {
    item.checked = !item.checked;
    saveShoppingList(list);
  }
}

function updateShoppingItemQty(id, change) {
  let list = getShoppingList();
  const item = list.find(i => i.id === id);
  if (item) {
    item.quantity += change;
    if (item.quantity <= 0) {
      list = list.filter(i => i.id !== id);
    }
    saveShoppingList(list);
  }
}

function removeShoppingItem(id) {
  let list = getShoppingList().filter(i => i.id !== id);
  saveShoppingList(list);
  showToast('Item removed from shopping list', 'warning');
}

function addAllShoppingListToCart() {
  const list = getShoppingList();
  if (list.length === 0) {
    showToast('Your shopping list is currently empty', 'warning');
    return;
  }

  let cart = getCart();
  list.forEach(item => {
    const existing = cart.find(c => c.name.toLowerCase() === item.name.toLowerCase());
    if (existing) {
      existing.quantity += item.quantity;
    } else {
      cart.push({
        id: item.id,
        name: item.name,
        price: item.price,
        unit: item.unit,
        image: item.image || '../assets/images/hero-grocery-store.webp',
        quantity: item.quantity
      });
    }
  });

  saveCart(cart);
  showToast(`Successfully added ${list.length} weekly items to your Cart!`, 'success');
}

function renderShoppingListPage() {
  const container = document.getElementById('shopping-list-container');
  if (!container) return;

  const list = getShoppingList();

  if (list.length === 0) {
    container.innerHTML = `
      <div class="p-8 text-center bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
        <i class="fas fa-clipboard-list text-6xl text-slate-300 dark:text-slate-600 mb-4"></i>
        <h3 class="text-xl font-bold mb-2">Your Weekly Shopping List is Empty</h3>
        <p class="text-slate-500 mb-6">Create your recurring weekly grocery checklist for one-click reordering.</p>
        <button id="add-custom-item-btn" class="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-lg">
          <i class="fas fa-plus mr-1"></i> Add Custom Item
        </button>
      </div>
    `;
    return;
  }

  const totalPrice = list.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  container.innerHTML = `
    <div class="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden space-y-4">
      <div class="p-4 bg-slate-50 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-700 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 class="font-bold text-lg text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <i class="fas fa-basket-shopping text-emerald-600"></i> My Weekly Groceries List
          </h2>
          <p class="text-xs text-slate-500">${list.length} Items • Total estimated cost: <strong class="text-emerald-600">₹${totalPrice}</strong></p>
        </div>
        <div class="flex items-center gap-2">
          <button onclick="addAllShoppingListToCart()" class="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-lg transition-colors flex items-center gap-1.5 shadow-md shadow-emerald-600/20">
            <i class="fas fa-cart-plus"></i> Add All to Cart
          </button>
        </div>
      </div>

      <div class="p-4 space-y-3">
        <!-- New Quick Item Form -->
        <form id="new-list-item-form" class="flex gap-2 mb-4">
          <input type="text" id="new-item-name" placeholder="Add item (e.g. 2 Pack Organic Yogurt)" required class="flex-1 px-3 py-2 text-sm border border-slate-200 dark:border-slate-700 rounded-lg">
          <button type="submit" class="px-4 py-2 bg-slate-900 dark:bg-slate-700 hover:bg-emerald-600 text-white font-semibold text-xs rounded-lg transition-colors">
            + Add
          </button>
        </form>

        <div class="divide-y divide-slate-100 dark:divide-slate-700">
          ${list.map(item => `
            <div class="py-3 flex items-center justify-between gap-4 ${item.checked ? 'opacity-50 line-through' : ''}">
              <div class="flex items-center gap-3">
                <input type="checkbox" ${item.checked ? 'checked' : ''} onchange="toggleShoppingItemCheck('${item.id}')" class="w-5 h-5 accent-emerald-600 rounded cursor-pointer">
                <div>
                  <h4 class="font-bold text-slate-900 dark:text-slate-100 text-sm">${item.name}</h4>
                  <span class="text-xs text-slate-500">${item.unit} • ₹${item.price}</span>
                </div>
              </div>
              <div class="flex items-center gap-3">
                <div class="quantity-control">
                  <button onclick="updateShoppingItemQty('${item.id}', -1)"><i class="fas fa-minus text-xs"></i></button>
                  <input type="text" value="${item.quantity}" readonly>
                  <button onclick="updateShoppingItemQty('${item.id}', 1)"><i class="fas fa-plus text-xs"></i></button>
                </div>
                <span class="font-bold text-slate-900 dark:text-slate-100 text-sm min-w-[50px] text-right">₹${item.price * item.quantity}</span>
                <button onclick="removeShoppingItem('${item.id}')" class="text-slate-400 hover:text-red-500 p-1">
                  <i class="fas fa-trash-can text-sm"></i>
                </button>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `;

  const addForm = document.getElementById('new-list-item-form');
  if (addForm) {
    addForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = document.getElementById('new-item-name');
      if (input && input.value.trim()) {
        addToShoppingList({ name: input.value.trim(), price: 60, unit: '1 Pack' });
        input.value = '';
      }
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('shopping-list-container')) {
    renderShoppingListPage();
  }
});
