# FreshBasket — Premium Supermarket & Daily Grocery Store HTML Template

**FreshBasket** is a premium, production-ready, feature-rich HTML template designed for neighborhood supermarkets, organic produce stores, daily grocery delivery businesses, retail chains, and fresh food markets. Built as part of the Stackly Multipurpose HTML Template collection.

---

## Table of Contents
1. [Template Overview](#1-template-overview)
2. [Key Features](#2-key-features)
3. [Folder Structure](#3-folder-structure)
4. [Installation & Local Setup](#4-installation--local-setup)
5. [Customization Guide](#5-customization-guide)
   - [Changing Brand Colors](#changing-brand-colors)
   - [Changing Fonts](#changing-fonts)
   - [Replacing Images](#replacing-images)
   - [Adding / Editing Products](#adding--editing-products)
6. [Frontend Functionality (JavaScript Engine)](#6-frontend-functionality-javascript-engine)
   - [Cart Management](#cart-management)
   - [Weekly Shopping List](#weekly-shopping-list)
   - [Order History & Reorder](#order-history--reorder)
   - [Order Tracking Stepper](#order-tracking-stepper)
   - [Theme & RTL Controls](#theme--rtl-controls)
7. [Integrations & Placeholders](#7-integrations--placeholders)
8. [SEO & Performance Configuration](#8-seo--performance-configuration)
9. [Browser Support & Credits](#9-browser-support--credits)
10. [Changelog & Support](#10-changelog--support)

---

## 1. Template Overview
FreshBasket provides a complete, modern frontend e-commerce solution for grocery stores. It includes 26+ pre-built HTML pages, comprehensive responsive design, dark mode, RTL language support, customer dashboard suite, and full frontend state persistence powered by JavaScript and `localStorage`.

- **Brand Colors**: Emerald Green (`#16A34A`), Warm Amber (`#F59E0B`), Sale Red (`#EF4444`)
- **Typography**: Google Fonts — Inter & Poppins
- **Icon Library**: Font Awesome 6 Free
- **CSS Framework**: Tailwind CSS + Custom Design System Tokens

---

## 2. Key Features
- **26+ HTML Pages**: 2 Homepage variations, Shop catalog, Product Details, Categories, Offers, Cart, Checkout, Order Confirmation, Order Tracking, Weekly Shopping List, Loyalty Card, Delivery Coverage, Pricing, About, Contact, Login, Register, Forgot Password, 404, Coming Soon, and 9 Customer Dashboard pages.
- **Frontend State Management (`localStorage`)**:
  - Add to Cart, Quantity Stepper, Item Removal, Subtotal, 5% Tax (GST), Promo Coupon Validation (`FRESH10` & `SAVE50`), Free Delivery Thresholds.
  - Wishlist Favorites toggling.
  - Weekly Grocery Shopping List builder with checkboxes and single-click "Add All to Cart".
  - One-Click **Reorder** functionality on Order History.
  - Animated Order Status Stepper (Confirmed ➔ Packing ➔ Out for Delivery ➔ Delivered) with simulated step progression button.
- **Dark Mode**: Toggle between light and dark themes with system preference detection and `localStorage` persistence.
- **RTL Support**: Bi-directional layout engine (`dir="rtl"`) for Arabic/Hebrew layouts.
- **Responsive Layout**: Breakpoints optimized for mobile (<640px), tablet (640px-1024px), desktop (1024px-1280px), and large screens (>1280px).
- **SEO Ready**: Semantic HTML5 elements, unique `<title>` and `<meta description>` tags, JSON-LD structured data for GroceryStore, `robots.txt`, and `sitemap.xml`.

---

## 3. Folder Structure
```text
freshbasket-supermarket/
│
├── index.html                     # Primary Home Page Landing
├── package.json                   # NPM manifest for live server
├── robots.txt                     # SEO Crawler Configuration
├── sitemap.xml                    # XML Sitemap for indexing
├── README.md                      # Documentation
│
├── pages/
│   ├── home-2.html                # Editorial Organic Produce Homepage
│   ├── shop.html                  # E-Commerce Product Catalog
│   ├── product-details.html       # Detailed Product View & Reviews
│   ├── categories.html            # Supermarket Departments Directory
│   ├── offers.html                # Weekly Deals & BOGO Specials
│   ├── delivery-coverage.html     # PIN Code Checker & Coverage Map
│   ├── loyalty.html               # FreshBasket Rewards Loyalty Card
│   ├── about.html                 # Supermarket Story & Stats
│   ├── contact.html               # Store Locator & Contact Form
│   ├── cart.html                  # Shopping Basket & Cart Summary
│   ├── checkout.html              # Multi-step Delivery/Pickup Checkout
│   ├── order-confirmation.html    # Order Confirmation & Printable Receipt
│   ├── order-tracking.html        # Live Order Status Timeline Stepper
│   ├── order-history.html         # Past Order Log & Reorder Action
│   ├── shopping-list.html         # Weekly Grocery Checklist Builder
│   ├── pricing.html               # FreshPlus Delivery Subscriptions
│   ├── login.html                 # Customer Login Interface
│   ├── register.html              # Account Registration Interface
│   ├── forgot-password.html       # Password Reset Request
│   │
│   ├── dashboard/
│   │   ├── index.html             # Dashboard Overview & Active Widget
│   │   ├── profile.html           # Customer Profile Details Editor
│   │   ├── active-order.html      # Current Live Order Status View
│   │   ├── order-history.html     # Dashboard Purchase Log & Reorder
│   │   ├── shopping-list.html     # Embedded Weekly Grocery List
│   │   ├── loyalty.html           # Virtual Loyalty Card & Points Log
│   │   ├── addresses.html         # Address Book Manager
│   │   ├── settings.html          # Notification & Account Preferences
│   │   └── logout.html            # Logout Confirmation
│   │
│   ├── 404.html                   # Custom Branded 404 Error Page
│   └── coming-soon.html           # Maintenance / New Hub Launching Soon
│
└── assets/
    ├── css/
    │   ├── style.css              # Main Design Tokens & Components
    │   ├── dark-mode.css          # Dark Mode Theme Overrides
    │   └── rtl.css                # RTL Layout Overrides
    │
    └── js/
        ├── main.js                # Global Theme, RTL, Header & Toast JS
        ├── shop.js                # Catalog Filter, Sort & Search Engine
        ├── cart.js                # Cart CRUD, Tax & Coupon Logic
        ├── checkout.js            # Multi-Step Checkout Controller
        ├── shopping-list.js       # Weekly List Manager
        ├── wishlist.js            # Wishlist Favorites State
        ├── order-tracking.js      # Animated Stepper Controller
        └── dashboard.js           # Customer Dashboard Controller
```

---

## 4. Installation & Local Setup
No complex build steps or Node.js compiler required! This is a clean standard HTML5/CSS3/JS template.

### Method 1: Direct File Opening
Double-click `index.html` in any modern web browser (Chrome, Firefox, Safari, Edge).

### Method 2: NPM Live Server
```bash
cd freshbasket-supermarket
npm start
```
This runs `npx serve .` and hosts the template at `http://localhost:3000`.

---

## 5. Customization Guide

### Changing Brand Colors
Open `assets/css/style.css` and edit the CSS variables in the `:root` block:
```css
:root {
  --primary: #16A34A;       /* Main Emerald Green */
  --primary-dark: #15803D;  /* Dark Emerald */
  --secondary: #F59E0B;     /* Warm Amber/Yellow for Deals */
  --accent: #EF4444;        /* Sale Badges & Discounts */
}
```

### Changing Fonts
Update the Google Fonts import link in `assets/css/style.css`:
```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700&family=Poppins:wght@600;700;800&display=swap');
```

### Adding / Editing Products
Products are defined as a JSON array inside `assets/js/shop.js`. To add new products, append an object:
```javascript
{
  id: 'prod-013',
  name: 'Organic Honey (500g)',
  category: 'Pantry',
  categorySlug: 'pantry',
  price: 280,
  originalPrice: 320,
  unit: '500g Jar',
  rating: 4.9,
  reviews: 65,
  discount: 12,
  dietary: ['organic', 'gluten-free'],
  image: 'https://images.unsplash.com/...',
  inStock: true
}
```

---

## 6. Frontend Functionality (JavaScript Engine)

### Cart Management (`assets/js/cart.js`)
- Persists items in `localStorage.getItem('fb_cart')`.
- Promo codes: `FRESH10` gives 10% off; `SAVE50` gives ₹50 flat discount.
- Free express home delivery automatically unlocks for orders over ₹500.

### Weekly Shopping List (`assets/js/shopping-list.js`)
- Persists user's recurring list items in `localStorage.getItem('fb_shopping_list')`.
- Clicking **"Add All to Cart"** transfers all list items into the cart in a single click.

### Order History & Reorder (`assets/js/dashboard.js`)
- Clicking **"Reorder"** on any past purchase row automatically adds all items from that order back into the shopping cart.

### Theme & RTL Controls (`assets/js/main.js`)
- Clicking the dark mode moon/sun icon toggles `data-theme="dark"` on `<html>`.
- Clicking the RTL button toggles `dir="rtl"` on `<html>`. Both preferences save in `localStorage`.

---

## 7. Integrations & Placeholders
- **Contact Form**: Form action targets Formspree / Netlify Forms (`action="https://formspree.io/f/placeholder"`).
- **Google Maps**: Embed placeholder Google Maps iframe included in `delivery-coverage.html` and `contact.html`.
- **Payments**: Includes demo payment selectors for Credit/Debit Cards, UPI / GPay QR, and Cash on Delivery (COD).

---

## 8. SEO & Performance Configuration
- Open Graph metadata tags (`og:title`, `og:description`, `og:image`) included on pages.
- Structured Data (JSON-LD) for `GroceryStore` included on `index.html`.
- Clean semantic HTML structure with explicit `alt` attributes for screen readers.

---

## 9. Browser Support & Credits
- **Browsers**: Chrome 90+, Firefox 88+, Safari 14+, Edge 90+, iOS Safari, Android Chrome.
- **Credits**:
  - Icons: [Font Awesome 6](https://fontawesome.com/)
  - Typography: [Google Fonts](https://fonts.google.com/)
  - Tailwind CSS: [TailwindCSS CDN](https://tailwindcss.com/)

---

## 10. Changelog & Support
- **Version 1.0.0** (August 2026): Initial commercial marketplace release.
- **Support Email**: `support@stackly.example.com`
