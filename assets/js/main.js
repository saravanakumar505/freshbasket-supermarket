/**
 * FRESHBASKET SUPERMARKET & DAILY GROCERY - MAIN UTILITIES & THEME ENGINE
 * Global state initialization, theme & RTL management, header badges & notifications
 */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initRTL();
  initStickyHeader();
  initMobileMenu();
  initSearchModal();
  updateHeaderBadges();
  initHomeDropdown();
  initLucideIcons();
});

/* =========================================
   1. THEME CONTROLLER (DARK / LIGHT MODE)
   ========================================= */
function initTheme() {
  const savedTheme = localStorage.getItem('fb_theme') || localStorage.getItem('freshbasket_theme');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const initialTheme = savedTheme || (systemPrefersDark ? 'dark' : 'light');

  applyTheme(initialTheme);

  const themeToggleBtns = document.querySelectorAll('.theme-toggle-btn, #themeToggle');
  themeToggleBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const currentIsDark = document.documentElement.classList.contains('dark');
      const newTheme = currentIsDark ? 'light' : 'dark';
      applyTheme(newTheme);
      localStorage.setItem('fb_theme', newTheme);
      localStorage.setItem('freshbasket_theme', newTheme);
      // Theme toggles silently without toast notification
    });
  });

  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem('fb_theme') && !localStorage.getItem('freshbasket_theme')) {
      applyTheme(e.matches ? 'dark' : 'light');
    }
  });
}

function applyTheme(theme) {
  const isDark = theme === 'dark';
  if (isDark) {
    document.documentElement.setAttribute('data-theme', 'dark');
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.removeAttribute('data-theme');
    document.documentElement.classList.remove('dark');
  }

  const themeToggleBtns = document.querySelectorAll('.theme-toggle-btn, #themeToggle');
  themeToggleBtns.forEach(btn => {
    btn.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
    btn.setAttribute('title', isDark ? 'Switch to light mode' : 'Switch to dark mode');

    const iconContainer = btn.querySelector('.theme-icon-container') || btn;
    if (isDark) {
      iconContainer.innerHTML = '<i data-lucide="sun" class="w-4 h-4 text-amber-400 transition-transform duration-200 hover:rotate-45"></i>';
    } else {
      iconContainer.innerHTML = '<i data-lucide="moon" class="w-4 h-4 text-slate-700 dark:text-slate-300 transition-transform duration-200 hover:-rotate-12"></i>';
    }

    const label = btn.querySelector('.theme-label-text');
    if (label) {
      label.textContent = isDark ? 'Light Mode' : 'Dark Mode';
    }
  });

  if (window.lucide && typeof window.lucide.createIcons === 'function') {
    window.lucide.createIcons();
  }
}

/* =========================================
   2. RTL (RIGHT-TO-LEFT) CONTROLLER
   ========================================= */
function initRTL() {
  const savedRTL = localStorage.getItem('fb_rtl');
  const isRTL = savedRTL === 'true';

  applyRTL(isRTL);

  const rtlToggleBtns = document.querySelectorAll('.rtl-toggle-btn');
  rtlToggleBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const currentRTL = document.documentElement.getAttribute('dir') === 'rtl';
      const newRTL = !currentRTL;
      applyRTL(newRTL);
      localStorage.setItem('fb_rtl', newRTL.toString());
      // RTL toggles silently without toast notification
    });
  });
}

function applyRTL(isRTL) {
  if (isRTL) {
    document.documentElement.setAttribute('dir', 'rtl');
  } else {
    document.documentElement.removeAttribute('dir');
  }

  const rtlToggleBtns = document.querySelectorAll('.rtl-toggle-btn');
  rtlToggleBtns.forEach(btn => {
    btn.setAttribute('aria-label', isRTL ? 'Switch to LTR' : 'Switch to RTL');
    btn.setAttribute('title', isRTL ? 'Switch to LTR' : 'Switch to RTL');

    const label = btn.querySelector('.rtl-label-text');
    if (label) {
      label.textContent = isRTL ? 'LTR' : 'RTL';
    }
  });
}

/* =========================================
   3. STICKY HEADER & SCROLL BEHAVIOR
   ========================================= */
function initStickyHeader() {
  const header = document.querySelector('.header-sticky');
  if (!header) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('is-scrolled');
    } else {
      header.classList.remove('is-scrolled');
    }
  });
}

/* =========================================
   4. MOBILE MENU & DRAWER TOGGLE
   ========================================= */
function initMobileMenu() {
  const toggleBtn = document.getElementById('mobile-menu-toggle');
  const mobileDrawer = document.getElementById('mobile-menu-drawer');
  const closeBtn = document.getElementById('mobile-menu-close');
  const overlay = document.getElementById('mobile-menu-overlay');

  if (!mobileDrawer) return;

  function openMenu() {
    mobileDrawer.classList.remove('translate-x-full');
    if (overlay) overlay.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    mobileDrawer.classList.add('translate-x-full');
    if (overlay) overlay.classList.add('hidden');
    document.body.style.overflow = '';
  }

  if (toggleBtn) toggleBtn.addEventListener('click', openMenu);
  if (closeBtn) closeBtn.addEventListener('click', closeMenu);
  if (overlay) overlay.addEventListener('click', closeMenu);

  // Close mobile menu drawer when clicking a page navigation link
  const pageLinks = mobileDrawer.querySelectorAll('.mobile-nav-link');
  pageLinks.forEach(link => {
    link.addEventListener('click', () => {
      closeMenu();
    });
  });
}

/* =========================================
   5. SEARCH MODAL CONTROLLER
   ========================================= */
function initSearchModal() {
  const searchTriggers = document.querySelectorAll('.search-modal-trigger');
  const searchModal = document.getElementById('search-modal');
  const closeBtn = document.getElementById('search-modal-close');

  if (!searchModal) return;

  searchTriggers.forEach(btn => {
    btn.addEventListener('click', () => {
      searchModal.classList.remove('hidden');
      const input = searchModal.querySelector('input');
      if (input) setTimeout(() => input.focus(), 100);
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      searchModal.classList.add('hidden');
    });
  }

  searchModal.addEventListener('click', (e) => {
    if (e.target === searchModal) searchModal.classList.add('hidden');
  });
}

/* =========================================
   6. HEADER BADGES COUNTER (CART & WISHLIST)
   ========================================= */
function updateHeaderBadges() {
  const cart = JSON.parse(localStorage.getItem('fb_cart') || '[]');
  const wishlist = JSON.parse(localStorage.getItem('fb_wishlist') || '[]');

  const cartCount = cart.reduce((acc, item) => acc + (item.quantity || 1), 0);
  const wishlistCount = wishlist.length;

  const cartBadges = document.querySelectorAll('.cart-badge-count');
  cartBadges.forEach(badge => {
    badge.textContent = cartCount;
    badge.style.display = cartCount > 0 ? 'flex' : 'none';
  });

  const wishlistBadges = document.querySelectorAll('.wishlist-badge-count');
  wishlistBadges.forEach(badge => {
    badge.textContent = wishlistCount;
    badge.style.display = wishlistCount > 0 ? 'flex' : 'none';
  });
}

/* =========================================
   7. TOAST NOTIFICATION SYSTEM
   ========================================= */
function showToast(message, type = 'success') {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;

  const iconClass = type === 'success' ? 'fa-check-circle' : type === 'warning' ? 'fa-exclamation-triangle' : 'fa-info-circle';
  toast.innerHTML = `
    <i class="fas ${iconClass} text-lg"></i>
    <span>${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(100%)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}
/* =========================================
   8. HOME DROPDOWN — MOBILE ACCORDION TOGGLE
   ========================================= */
function initHomeDropdown() {
  // Mobile accordion: find any mobile drawer Home button
  const mobileHomeToggles = document.querySelectorAll('.mobile-home-submenu-toggle');

  mobileHomeToggles.forEach(toggle => {
    if (toggle.dataset.homeDropdownInitialized) return;
    toggle.dataset.homeDropdownInitialized = 'true';

    const parent = toggle.closest('.mobile-home-accordion') || toggle.parentElement;
    const submenu = parent ? parent.querySelector('.mobile-home-submenu') : null;
    const chevron = toggle.querySelector('.mobile-home-chevron');

    if (!submenu) return;

    toggle.addEventListener('click', (e) => {
      e.preventDefault();
      const isOpen = !submenu.classList.contains('hidden');

      if (isOpen) {
        submenu.classList.add('hidden');
        if (chevron) chevron.style.transform = 'rotate(0deg)';
        toggle.setAttribute('aria-expanded', 'false');
      } else {
        submenu.classList.remove('hidden');
        if (chevron) chevron.style.transform = 'rotate(180deg)';
        toggle.setAttribute('aria-expanded', 'true');
      }
    });

    // Keyboard support
    toggle.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggle.click();
      }
    });
  });

  // Desktop: accessible button toggle in addition to CSS :hover
  const homeDropdownBtn = document.getElementById('home-dropdown-btn');
  const homeDropdownWrapper = document.getElementById('home-dropdown-wrapper');

  if (homeDropdownBtn && homeDropdownWrapper) {
    homeDropdownBtn.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const firstLink = homeDropdownWrapper.querySelector('[role="menuitem"]');
        if (firstLink) firstLink.focus();
      }
    });
  }
}

/* =========================================
   9. LUCIDE SVG ICON INITIALIZER
   ========================================= */
function initLucideIcons() {
  const renderIcons = () => {
    if (window.lucide && typeof window.lucide.createIcons === 'function') {
      window.lucide.createIcons();
    }
  };

  renderIcons();
  window.addEventListener('load', renderIcons);
  setTimeout(renderIcons, 100);
  setTimeout(renderIcons, 300);
  setTimeout(renderIcons, 1000);
}

