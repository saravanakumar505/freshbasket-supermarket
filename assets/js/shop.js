/**
 * FRESHBASKET SUPERMARKET & DAILY GROCERY - SHOP CATALOG ENGINE
 * Product Mock Database, Filters, Search, Sorting, Grid/List view & Pagination
 */

// Grocery Products Database
const GROCERY_PRODUCTS = [
  {
    id: 'prod-001',
    name: 'Fresh Organic Bananas (Yelakki)',
    category: 'Fruits & Vegetables',
    categorySlug: 'fruits-vegetables',
    price: 49,
    originalPrice: 65,
    unit: '1 kg',
    rating: 4.8,
    reviews: 142,
    discount: 25,
    dietary: ['organic', 'vegan', 'gluten-free'],
    image: '../assets/images/organic-yelakki-bananas.webp',
    description: 'Farm-fresh organic Yelakki bananas sourced directly from local Karnataka orchards. Rich in potassium and fiber.',
    inStock: true,
    badge: 'Best Seller'
  },
  {
    id: 'prod-002',
    name: 'Royal Shimla Red Apples',
    category: 'Fruits & Vegetables',
    categorySlug: 'fruits-vegetables',
    price: 149,
    originalPrice: 180,
    unit: '1 kg (approx 4-5 pcs)',
    rating: 4.7,
    reviews: 98,
    discount: 17,
    dietary: ['organic', 'vegan'],
    image: '../assets/images/shimla-red-apples.webp',
    description: 'Crisp, juicy and sweet red apples imported from Himachal Pradesh orchards. Perfect for fresh snacks & salads.',
    inStock: true,
    badge: 'Fresh Arrival'
  },
  {
    id: 'prod-003',
    name: 'Farm Fresh Toned Milk (Pouch)',
    category: 'Dairy & Eggs',
    categorySlug: 'dairy-eggs',
    price: 62,
    originalPrice: 65,
    unit: '1 Litre',
    rating: 4.9,
    reviews: 310,
    discount: 5,
    dietary: ['gluten-free'],
    image: '../assets/images/farm-toned-milk.webp',
    description: 'Pasteurised homogenised toned milk packed with calcium, vitamin D, and essential proteins.',
    inStock: true,
    badge: 'Daily Staple'
  },
  {
    id: 'prod-004',
    name: 'Organic Country Brown Eggs (12 pcs)',
    category: 'Dairy & Eggs',
    categorySlug: 'dairy-eggs',
    price: 110,
    originalPrice: 135,
    unit: ' Pack of 12',
    rating: 4.9,
    reviews: 215,
    discount: 18,
    dietary: ['organic', 'gluten-free'],
    image: '../assets/images/organic Eggs.png',
    description: 'Antibiotic-free country eggs from free-roaming farm hens. High protein yellow yolk.',
    inStock: true,
    badge: 'Farm Choice'
  },
  {
    id: 'prod-005',
    name: 'Whole Wheat Multigrain Bread',
    category: 'Bakery',
    categorySlug: 'bakery',
    price: 45,
    originalPrice: 55,
    unit: '400g Pack',
    rating: 4.6,
    reviews: 84,
    discount: 18,
    dietary: ['vegan'],
    image: '../assets/images/fresh-bakery-category.webp',
    description: 'Freshly baked artisanal whole wheat bread with oats, flaxseed, pumpkin seeds and sesame.',
    inStock: true,
    badge: 'Freshly Baked'
  },
  {
    id: 'prod-006',
    name: 'Fresh Butter Croissants (2 Pcs)',
    category: 'Bakery',
    categorySlug: 'bakery',
    price: 89,
    originalPrice: 110,
    unit: ' Pack of 2',
    rating: 4.8,
    reviews: 67,
    discount: 19,
    dietary: [],
    image: '../assets/images/butter-croissants.webp',
    description: 'Flaky, buttery golden French croissants baked fresh every morning in our in-store bakery.',
    inStock: true,
    badge: 'Chef Special'
  },
  {
    id: 'prod-007',
    name: 'Cold Pressed Premium Mustard Oil',
    category: 'Pantry',
    categorySlug: 'pantry',
    price: 195,
    originalPrice: 240,
    unit: '1 Litre Bottle',
    rating: 4.7,
    reviews: 120,
    discount: 18,
    dietary: ['organic', 'vegan', 'gluten-free'],
    image: '../assets/images/mustard-oil-bottle.webp',
    description: 'Pure Kachi Ghani cold-pressed mustard oil with sharp pungent aroma and rich natural antioxidant content.',
    inStock: true,
    badge: 'Pure & Natural'
  },
  {
    id: 'prod-008',
    name: 'Premium Basmati Rice (Aged 2 Years)',
    category: 'Pantry',
    categorySlug: 'pantry',
    price: 185,
    originalPrice: 220,
    unit: '1 kg Pack',
    rating: 4.9,
    reviews: 350,
    discount: 16,
    dietary: ['gluten-free', 'vegan'],
    image: '../assets/images/basmati-rice-grain.webp',
    description: 'Extra long grain aromatic basmati rice aged naturally for superior fluffy texture and rich aroma.',
    inStock: true,
    badge: 'Top Seller'
  },
  {
    id: 'prod-009',
    name: 'Fresh Valencia Orange Juice (No Added Sugar)',
    category: 'Beverages',
    categorySlug: 'beverages',
    price: 125,
    originalPrice: 150,
    unit: '1 Litre Bottle',
    rating: 4.7,
    reviews: 95,
    discount: 16,
    dietary: ['vegan', 'gluten-free'],
    image: '../assets/images/valencia-orange-juice.webp',
    description: '100% pure squeezed cold-pressed orange juice packed with natural Vitamin C. Zero preservatives.',
    inStock: true,
    badge: 'No Added Sugar'
  },
  {
    id: 'prod-010',
    name: 'Artisanal Green Tea Leaves with Jasmine',
    category: 'Beverages',
    categorySlug: 'beverages',
    price: 249,
    originalPrice: 299,
    unit: '100g Tin Box',
    rating: 4.8,
    reviews: 73,
    discount: 16,
    dietary: ['organic', 'vegan'],
    image: '../assets/images/green-tea-leaves.webp',
    description: 'Whole leaf Darjeeling green tea blended with fragrant night-blooming jasmine flowers.',
    inStock: true,
    badge: 'Organic'
  },
  {
    id: 'prod-011',
    name: 'Crunchy Salted Potato Chips',
    category: 'Snacks',
    categorySlug: 'snacks',
    price: 35,
    originalPrice: 40,
    unit: '120g Pack',
    rating: 4.5,
    reviews: 180,
    discount: 12,
    dietary: ['vegan'],
    image: '../assets/images/salted-potato-chips.webp',
    description: 'Crispy wafer-thin potato chips sprinkled with sea salt. Perfect evening tea-time snack.',
    inStock: true,
    badge: 'Popular'
  },
  {
    id: 'prod-012',
    name: 'Eco-Friendly Dishwashing Liquid (Lemon)',
    category: 'Household',
    categorySlug: 'household',
    price: 115,
    originalPrice: 140,
    unit: '750ml Refill',
    rating: 4.6,
    reviews: 112,
    discount: 17,
    dietary: [],
    image: '../assets/images/Eco-Friendly Dishwashing.webp',
    description: 'Tough on grease, gentle on hands. Biodegradable dishwashing gel enriched with real lemon power.',
    inStock: true,
    badge: 'Eco Friendly'
  }
];

let currentFilteredProducts = [...GROCERY_PRODUCTS];
let currentViewMode = 'grid'; // grid or list

document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('shop-product-container')) {
    initShopPage();
  }
});

function initShopPage() {
  renderProducts(currentFilteredProducts);
  initFilterControls();
  initSortAndSearch();
  initViewToggle();
}

/* Render Product Cards */
function renderProducts(products) {
  const container = document.getElementById('shop-product-container');
  const countEl = document.getElementById('product-count-display');
  if (!container) return;

  if (countEl) {
    countEl.textContent = `Showing ${products.length} products`;
  }

  if (products.length === 0) {
    container.className = 'col-span-full py-12 text-center';
    container.innerHTML = `
      <div class="max-w-md mx-auto">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-14 h-14 mx-auto mb-4 text-slate-300 dark:text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
        <h3 class="text-xl font-bold mb-2">No products match your filters</h3>
        <p class="text-slate-500 mb-6">Try clearing some filter options or search for another keyword.</p>
        <button id="reset-filters-btn" class="px-5 py-2.5 bg-emerald-600 text-white font-medium rounded-lg hover:bg-emerald-700 transition-colors">
          Reset All Filters
        </button>
      </div>
    `;
    const resetBtn = document.getElementById('reset-filters-btn');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        resetAllFilters();
      });
    }
    return;
  }

  if (currentViewMode === 'grid') {
    container.className = 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6';
    container.innerHTML = products.map(product => createProductGridCard(product)).join('');
  } else {
    container.className = 'space-y-4';
    container.innerHTML = products.map(product => createProductListRow(product)).join('');
  }

  attachProductCardEvents();
}

/* HTML Generator for Grid Card */
function createProductGridCard(product) {
  const wishlist = JSON.parse(localStorage.getItem('fb_wishlist') || '[]');
  const isWishlisted = wishlist.some(item => item.id === product.id);
  const heartFill = isWishlisted ? 'text-red-500' : 'text-slate-400 dark:text-slate-500';
  const heartSvgFill = isWishlisted ? 'fill-red-500 stroke-red-500' : 'fill-none stroke-current';

  return `
    <div class="product-card" data-id="${product.id}">
      <div class="product-img-wrapper">
        <img src="${product.image}" alt="${product.name}" loading="lazy">
        ${product.discount ? `<span class="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-md">-${product.discount}%</span>` : ''}
        ${product.badge ? `<span class="absolute top-2 right-2 bg-amber-500 text-slate-900 text-xs font-bold px-2 py-1 rounded-md">${product.badge}</span>` : ''}
        <button class="wishlist-btn absolute bottom-2 right-2 w-9 h-9 bg-white/90 dark:bg-slate-800/90 rounded-full shadow flex items-center justify-center ${heartFill} hover:text-red-500 transition-colors" data-id="${product.id}" title="Add to Wishlist">
          <svg xmlns="http://www.w3.org/2000/svg" class="wishlist-heart-svg w-4.5 h-4.5 w-[18px] h-[18px] transition-colors ${heartSvgFill}" viewBox="0 0 24 24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
        </button>
      </div>
      <div class="flex-1 flex flex-col justify-between">
        <div>
          <span class="text-xs text-emerald-600 dark:text-emerald-400 font-semibold uppercase tracking-wider">${product.category}</span>
          <h3 class="font-bold text-slate-900 dark:text-slate-100 mt-1 mb-1 line-clamp-2 hover:text-emerald-600 transition-colors">
            <a href="product-details.html?id=${product.id}">${product.name}</a>
          </h3>
          <p class="text-xs text-slate-500 dark:text-slate-400 mb-2">${product.unit}</p>
          <div class="flex items-center gap-1 text-amber-400 text-xs mb-3">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5 fill-amber-400 stroke-amber-400" viewBox="0 0 24 24" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
            <span class="font-bold text-slate-800 dark:text-slate-200">${product.rating}</span>
            <span class="text-slate-400">(${product.reviews})</span>
          </div>
        </div>
        <div>
          <div class="flex items-baseline gap-2 mb-3">
            <span class="text-lg font-extrabold text-slate-900 dark:text-slate-100">₹${product.price}</span>
            ${product.originalPrice ? `<span class="text-xs text-slate-400 line-through">₹${product.originalPrice}</span>` : ''}
          </div>
          <div class="flex items-center gap-2">
            <button class="add-to-cart-btn flex-1 py-2 px-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs rounded-lg transition-colors flex items-center justify-center gap-1.5" data-id="${product.id}">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><line x1="3" x2="21" y1="6" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
              Add to Cart
            </button>
            <button class="add-to-list-btn p-2 bg-slate-100 dark:bg-slate-800 hover:bg-emerald-100 text-slate-700 dark:text-slate-300 hover:text-emerald-700 rounded-lg transition-colors" title="Add to Shopping List" data-id="${product.id}">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="8" x2="21" y1="6" y2="6"/><line x1="8" x2="21" y1="12" y2="12"/><line x1="8" x2="21" y1="18" y2="18"/><line x1="3" x2="3.01" y1="6" y2="6"/><line x1="3" x2="3.01" y1="12" y2="12"/><line x1="3" x2="3.01" y1="18" y2="18"/></svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  `;
}

/* HTML Generator for List Row */
function createProductListRow(product) {
  const wishlist = JSON.parse(localStorage.getItem('fb_wishlist') || '[]');
  const isWishlisted = wishlist.some(item => item.id === product.id);
  const heartFill = isWishlisted ? 'text-red-500' : 'text-slate-400 dark:text-slate-500';
  const heartSvgFill = isWishlisted ? 'fill-red-500 stroke-red-500' : 'fill-none stroke-current';

  return `
    <div class="product-card flex-row gap-4 p-4 items-center" data-id="${product.id}">
      <div class="product-img-wrapper w-32 h-32 flex-shrink-0 mb-0">
        <img src="${product.image}" alt="${product.name}" loading="lazy">
        ${product.discount ? `<span class="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-1.5 py-0.5 rounded">-${product.discount}%</span>` : ''}
      </div>
      <div class="flex-1 flex flex-col sm:flex-row justify-between gap-4">
        <div>
          <span class="text-xs text-emerald-600 dark:text-emerald-400 font-semibold uppercase tracking-wider">${product.category}</span>
          <h3 class="font-bold text-lg text-slate-900 dark:text-slate-100 mt-1 mb-1">
            <a href="product-details.html?id=${product.id}">${product.name}</a>
          </h3>
          <p class="text-xs text-slate-500 dark:text-slate-400 mb-2">${product.unit} • ${product.description}</p>
          <div class="flex items-center gap-1 text-amber-400 text-xs">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5 fill-amber-400 stroke-amber-400" viewBox="0 0 24 24" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
            <span class="font-bold text-slate-800 dark:text-slate-200">${product.rating}</span>
            <span class="text-slate-400">(${product.reviews} customer reviews)</span>
          </div>
        </div>
        <div class="flex flex-col justify-between items-start sm:items-end min-w-[140px]">
          <div class="mb-3">
            <span class="text-xl font-extrabold text-slate-900 dark:text-slate-100">₹${product.price}</span>
            ${product.originalPrice ? `<span class="text-xs text-slate-400 line-through block text-right">₹${product.originalPrice}</span>` : ''}
          </div>
          <div class="flex items-center gap-2 w-full sm:w-auto">
            <button class="add-to-cart-btn px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs rounded-lg transition-colors flex items-center justify-center gap-1.5" data-id="${product.id}">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><line x1="3" x2="21" y1="6" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
              Add to Cart
            </button>
            <button class="wishlist-btn p-2 border border-slate-200 dark:border-slate-700 rounded-lg ${heartFill} hover:text-red-500 transition-colors" data-id="${product.id}" title="Add to Wishlist">
              <svg xmlns="http://www.w3.org/2000/svg" class="wishlist-heart-svg w-[18px] h-[18px] transition-colors ${heartSvgFill}" viewBox="0 0 24 24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  `;
}

/* Event listeners on product card actions */
function attachProductCardEvents() {
  document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const id = e.currentTarget.getAttribute('data-id');
      const product = GROCERY_PRODUCTS.find(p => p.id === id);
      if (product) {
        addToCart(product, 1);
      }
    });
  });

  document.querySelectorAll('.wishlist-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const id = e.currentTarget.getAttribute('data-id');
      const product = GROCERY_PRODUCTS.find(p => p.id === id);
      if (product) {
        toggleWishlist(product, e.currentTarget);
      }
    });
  });

  document.querySelectorAll('.add-to-list-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const id = e.currentTarget.getAttribute('data-id');
      const product = GROCERY_PRODUCTS.find(p => p.id === id);
      if (product) {
        addToShoppingList(product);
      }
    });
  });
}

/* Filters & Search Implementation */
function initFilterControls() {
  const categoryInputs = document.querySelectorAll('.filter-category-checkbox');
  const priceRange = document.getElementById('price-range-input');
  const priceVal = document.getElementById('price-range-value');
  const dietaryInputs = document.querySelectorAll('.filter-dietary-checkbox');

  if (priceRange && priceVal) {
    priceRange.addEventListener('input', (e) => {
      priceVal.textContent = `₹${e.target.value}`;
      applyFilters();
    });
  }

  categoryInputs.forEach(input => input.addEventListener('change', applyFilters));
  dietaryInputs.forEach(input => input.addEventListener('change', applyFilters));
}

function applyFilters() {
  const selectedCategories = Array.from(document.querySelectorAll('.filter-category-checkbox:checked')).map(c => c.value);
  const selectedDietary = Array.from(document.querySelectorAll('.filter-dietary-checkbox:checked')).map(d => d.value);
  const maxPriceInput = document.getElementById('price-range-input');
  const maxPrice = maxPriceInput ? parseFloat(maxPriceInput.value) : 1000;
  const searchKeyword = (document.getElementById('shop-search-input')?.value || '').toLowerCase();

  currentFilteredProducts = GROCERY_PRODUCTS.filter(product => {
    const matchCategory = selectedCategories.length === 0 || selectedCategories.includes(product.categorySlug);
    const matchPrice = product.price <= maxPrice;
    const matchDietary = selectedDietary.length === 0 || selectedDietary.every(d => product.dietary.includes(d));
    const matchSearch = searchKeyword === '' || product.name.toLowerCase().includes(searchKeyword) || product.category.toLowerCase().includes(searchKeyword);

    return matchCategory && matchPrice && matchDietary && matchSearch;
  });

  renderProducts(currentFilteredProducts);
}

function initSortAndSearch() {
  const sortSelect = document.getElementById('shop-sort-select');
  const searchInput = document.getElementById('shop-search-input');

  if (sortSelect) {
    sortSelect.addEventListener('change', (e) => {
      const val = e.target.value;
      if (val === 'price-low') {
        currentFilteredProducts.sort((a, b) => a.price - b.price);
      } else if (val === 'price-high') {
        currentFilteredProducts.sort((a, b) => b.price - a.price);
      } else if (val === 'rating') {
        currentFilteredProducts.sort((a, b) => b.rating - a.rating);
      } else if (val === 'discount') {
        currentFilteredProducts.sort((a, b) => b.discount - a.discount);
      } else {
        currentFilteredProducts = [...GROCERY_PRODUCTS];
      }
      renderProducts(currentFilteredProducts);
    });
  }

  if (searchInput) {
    searchInput.addEventListener('input', () => {
      applyFilters();
    });
  }
}

function initViewToggle() {
  const gridBtn = document.getElementById('view-grid-btn');
  const listBtn = document.getElementById('view-list-btn');

  if (!gridBtn || !listBtn) return;

  gridBtn.addEventListener('click', () => {
    currentViewMode = 'grid';
    gridBtn.classList.add('text-emerald-600', 'border-emerald-600');
    listBtn.classList.remove('text-emerald-600', 'border-emerald-600');
    renderProducts(currentFilteredProducts);
  });

  listBtn.addEventListener('click', () => {
    currentViewMode = 'list';
    listBtn.classList.add('text-emerald-600', 'border-emerald-600');
    gridBtn.classList.remove('text-emerald-600', 'border-emerald-600');
    renderProducts(currentFilteredProducts);
  });
}

function resetAllFilters() {
  document.querySelectorAll('.filter-category-checkbox').forEach(c => c.checked = false);
  document.querySelectorAll('.filter-dietary-checkbox').forEach(d => d.checked = false);
  const searchInput = document.getElementById('shop-search-input');
  if (searchInput) searchInput.value = '';
  const priceRange = document.getElementById('price-range-input');
  if (priceRange) {
    priceRange.value = 500;
    const priceVal = document.getElementById('price-range-value');
    if (priceVal) priceVal.textContent = '₹500';
  }
  currentFilteredProducts = [...GROCERY_PRODUCTS];
  renderProducts(currentFilteredProducts);
}
