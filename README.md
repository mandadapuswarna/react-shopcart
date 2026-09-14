# ShopCart

A responsive e-commerce storefront built with React.

ShopCart fetches products from the FakeStore API and provides a complete frontend shopping experience. Users can browse products, search, filter by category, sort results, view product details, manage a shopping cart, and complete a simulated checkout.

The project demonstrates practical React concepts including API integration, reusable components, custom hooks, client-side routing, cart state management, browser persistence, form validation, and responsive UI design.

## Live Demo

Coming soon.

---

## Features

### Product Browsing

* Fetch products from the FakeStore API
* Display products in a responsive product grid
* View product image, title, price, category, and rating
* Handle loading, error, and empty states
* Retry product fetching when an API request fails

### Product Search

* Search products by title
* Case-insensitive search
* Display the number of matching products
* Clear the current search
* Display a helpful message when no products match the search
* Use a reusable `useDebounce` custom hook to delay search updates

### Category Filtering

* Fetch product categories from the API
* Filter products by category
* Highlight the currently selected category
* Include an `All Products` option
* Combine category filtering with product search

### Product Sorting

Sort products by:

* Default
* Price: Low to High
* Price: High to Low
* Name: A to Z
* Name: Z to A

Search, category filtering, and sorting work together to display the correct product results.

### Product Details

* View individual product details
* Display product image
* Display title
* Display category
* Display rating and review count
* Display price
* Display product description
* Add products to the cart from the product details page
* Support direct navigation to product URLs

### Shopping Cart

* Dedicated cart page
* Add products to the cart
* Increase item quantity
* Decrease item quantity
* Remove individual products
* Display product image, title, price, and quantity controls
* Display subtotal
* Display free shipping
* Calculate the total automatically
* Display an empty cart state
* Continue shopping from the empty cart

### Cart Persistence

* Persist cart data using browser `localStorage`
* Restore cart items after a page refresh
* Preserve item quantities
* Display a cart badge with the total number of items
* Automatically update the cart count when items are added, removed, or updated

### Checkout

* Dedicated `/checkout` route
* Full Name validation
* Email validation
* Address field
* City field
* Postal Code field
* Order summary
* Display products and quantities
* Display the order total
* Clear the cart after successful checkout
* Simulated checkout flow without real payment processing

### Responsive Design

The application is designed for:

* Mobile: approximately `375px`
* Tablet: approximately `768px`
* Desktop: approximately `1440px`

Responsive improvements include:

* Responsive navigation
* Adaptive product grid
* Mobile-friendly product cards
* Stacked product details on smaller screens
* Readable cart layouts
* Responsive checkout form
* Improved spacing and controls across screen sizes

### User Experience

* Toast notifications for important actions
* Product added to cart feedback
* Product removed from cart feedback
* Order placed successfully feedback
* Auto-dismissing notifications
* Dismissible toast notifications
* Temporary add-to-cart button feedback
* Visible product count
* Scroll to top when navigating between pages

---

## Application Routes

| Route           | Description                     |
| --------------- | ------------------------------- |
| `/`             | Product listing and storefront  |
| `/products/:id` | Individual product details      |
| `/cart`         | Shopping cart                   |
| `/checkout`     | Checkout form and order summary |

---

## Technologies

* React
* Vite
* JavaScript
* CSS
* React Router
* FakeStore API
* Browser `localStorage`

---

## Key React Concepts Demonstrated

This project demonstrates practical usage of:

* Functional components
* Component composition
* Reusable components
* Props
* State management
* Derived data
* Custom hooks
* `useState`
* `useEffect`
* Client-side routing with React Router
* `useParams`
* `useLocation`
* Controlled forms
* Form validation
* Conditional rendering
* List rendering
* Event handling
* API integration
* Browser `localStorage`

---

## Project Structure

```text
src/
├── components/
│   ├── Header/
│   ├── CategoryFilter/
│   ├── Loader/
│   ├── ProductCard/
│   ├── ProductGrid/
│   ├── SearchBar/
│   ├── ScrollToTop.jsx
│   ├── SortSelect/
│   └── Toast/
│
├── hooks/
│   ├── useDebounce.js
│   └── useLocalStorage.js
│
├── pages/
│   ├── CartPage.jsx
│   ├── CheckoutPage.jsx
│   ├── ProductDetailsPage.jsx
│   └── ProductsPage.jsx
│
├── services/
│   └── productService.js
│
├── utils/
│   └── constants.js
│
├── App.jsx
├── main.jsx
└── styles.css
```

---

## Getting Started

### Prerequisites

Make sure you have a recent version of Node.js installed.

Check your Node.js version:

```bash
node --version
```

### Install Dependencies

```bash
npm install
```

### Start the Development Server

```bash
npm run dev
```

Open the local URL displayed in the terminal.

Vite commonly runs on:

```text
http://localhost:5173
```

---

## Production Build

To create an optimized production build:

```bash
npm run build
```

The production files will be generated in the `dist` directory.

---

## API

ShopCart uses the FakeStore API to retrieve demo product and category data.

The API provides:

* Product information
* Product categories
* Product prices
* Product descriptions
* Product ratings

---

## Future Improvements

Potential future enhancements include:

* User authentication
* Backend integration
* Real payment processing
* Wishlist functionality
* Order history
* Product reviews
* Pagination
* Advanced filtering
* Server-side cart persistence

---

## Author

Built as a React portfolio project demonstrating practical frontend development concepts and a complete client-side e-commerce workflow.
