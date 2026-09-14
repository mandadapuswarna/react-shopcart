# ShopCart

ShopCart is a React-based shopping cart demo that fetches products from a public API, displays them in a clean storefront layout, allows users to search products, and adds selected items to a cart summary.

This project is a simple storefront application built to demonstrate how a React app can fetch product data, search through items, and manage a shopping cart with a clean user experience.

## Project overview

The app currently includes:

- Product API integration using the FakeStore API
- Product grid listing
- Search by product title
- Add-to-cart interaction
- Cart count and order summary
- Lightweight Vite + React setup

## Current features

- Product API integration
- Product listing
- Basic search
- Add to cart
- Dedicated cart page with quantity controls
- Cart persistence with local storage
- Checkout form with order summary and validation
- Responsive layouts for mobile, tablet, and desktop screens
- Toast notifications for cart and order actions
- Temporary add-to-cart button feedback
- Visible product count and scroll-to-top navigation
- Cart count
- Loading state while products are being fetched
- Error handling with retry option
- Empty state when no products are available

The project is designed to be extended with additional cart management and storefront improvements as needed.

## Tech stack

- React
- Vite
- JavaScript
- CSS

## Project structure

```bash
Shopcart/
├── index.html
├── package.json
├── README.md
├── src/
│   ├── App.jsx
│   ├── main.jsx
│   ├── styles.css
│   ├── components/
│   │   ├── Header/
│   │   ├── ProductCard/
│   │   ├── ProductGrid/
│   │   ├── SearchBar/
│   │   └── Loader/
│   ├── services/
│   │   └── productService.js
│   └── utils/
│       └── constants.js
└── dist/   # generated after build
```

## Requirements

Node.js version: 24 or newer

Check your version:

```bash
node --version
```

## Getting started

1. Open the project folder.
2. Install dependencies:

```bash
npm install
```

3. Start the app in development mode:

```bash
npm run dev
```

4. Open the local URL shown in the terminal, usually:

```bash
http://localhost:5173
```

## Production build

To generate a production build:

```bash
npm run build
```

This creates the optimized files in the `dist` folder.

## Notes

- The app fetches demo product data from the FakeStore API.
- Search is case-insensitive and matches the product title.
- The cart tracks item quantities and shows a dedicated cart page with subtotal, free shipping, and totals.
- Cart items and quantities remain available after refreshing the browser.
- Checkout validates required fields and email format, then clears the cart after a successful submission.
- The layout uses one product column on small mobile screens, three columns on tablet screens, and four columns on desktop screens.
- Important cart and order actions display dismissible notifications that disappear automatically.
- Loading, error, and empty states are handled gracefully to improve the user experience.

