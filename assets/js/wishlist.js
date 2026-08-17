/**
 * FRESHBASKET SUPERMARKET - WISHLIST ENGINE
 * Favorites state manager using LocalStorage
 */

function getWishlist() {
  return JSON.parse(localStorage.getItem('fb_wishlist') || '[]');
}

function saveWishlist(wishlist) {
  localStorage.setItem('fb_wishlist', JSON.stringify(wishlist));
  if (typeof updateHeaderBadges === 'function') {
    updateHeaderBadges();
  }
}

function toggleWishlist(product, buttonElement) {
  let wishlist = getWishlist();
  const index = wishlist.findIndex(item => item.id === product.id);

  if (index > -1) {
    wishlist.splice(index, 1);
    saveWishlist(wishlist);
    showToast(`Removed "${product.name}" from wishlist`, 'warning');
    if (buttonElement) {
      // Update SVG heart icon to unfilled state
      const svg = buttonElement.querySelector('.wishlist-heart-svg');
      if (svg) {
        svg.classList.remove('fill-red-500', 'stroke-red-500');
        svg.classList.add('fill-none', 'stroke-current');
      }
      buttonElement.classList.remove('text-red-500');
    }
  } else {
    wishlist.push({
      id: product.id,
      name: product.name,
      price: product.price,
      unit: product.unit,
      image: product.image,
      category: product.category
    });
    saveWishlist(wishlist);
    showToast(`Saved "${product.name}" to wishlist ❤️`, 'success');
    if (buttonElement) {
      // Update SVG heart icon to filled/active state
      const svg = buttonElement.querySelector('.wishlist-heart-svg');
      if (svg) {
        svg.classList.remove('fill-none', 'stroke-current');
        svg.classList.add('fill-red-500', 'stroke-red-500');
      }
      buttonElement.classList.add('text-red-500');
    }
  }
}
