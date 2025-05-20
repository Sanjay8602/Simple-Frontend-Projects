# Delicious Bites Restaurant Menu
## Description
Delicious Bites is a responsive web application showcasing a restaurant menu with North Indian, South Indian, and Italian dishes. Built with HTML, CSS, and JavaScript, it allows users to browse, filter, search, and add items to a cart, with features like currency toggling, cart persistence, and accessibility support.

### How It Works

Browse Menu: View 12 dishes (e.g., Paneer Butter Masala, Dosa, Margherita Pizza) in a grid with images, prices, ratings, and descriptions.
Filter & Search: Filter by category (All, North Indian, South Indian, Italian) or search by name/description. Clear search with a button.
Item Details: Click "Quick View" to see a modal with item details and quantity selection.
Cart: Add items to a cart, adjust quantities, or clear the cart. Cart data saves to localStorage.
Checkout: Simulate order placement, saving orders to localStorage with timestamps.
Currency Toggle: Switch between INR (₹) and USD ($) for prices.
Extras: Includes a loading spinner, back-to-top button, and accessibility features (ARIA labels, keyboard navigation).

## Project Structure
delicious-bites/
├── index.html        # Main webpage
├── styles.css        # Styling
├── script.js         # Functionality
├── images/           # Menu images and fallback
└── README.md         # This file

### Setup

Ensure images/ contains menu images and fallback.jpg.
Serve via a local server:python -m http.server 8000


Open http://localhost:8000 in a browser.

### Usage

Browse or filter dishes.
Search using the search bar; clear with the "×" button.
Click "Quick View" to view/add items to the cart.
Manage cart (add, remove, adjust quantities) and checkout.
Toggle currency (INR/USD) in the header.
Use the back-to-top button for long menus.

### Notes

Requires Font Awesome and Poppins font (loaded via CDN).
Test responsiveness and accessibility with screen readers.
Checkout is a placeholder; no payment integration.

### License
© 2025 Delicious Bites. All rights reserved.
Last updated: May 20, 2025
