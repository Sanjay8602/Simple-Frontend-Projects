// script.js
document.addEventListener("DOMContentLoaded", () => {
  const menuItems = [
    { 
      name: "Paneer Butter Masala", 
      price: 220, 
      image: "images/paneer.jpg", 
      category: "North Indian",
      description: "Creamy and rich paneer cooked in a tomato-based gravy with aromatic spices."
    },
    { 
      name: "Chole Bhature", 
      price: 150, 
      image: "images/chole.jpg", 
      category: "North Indian",
      description: "Spicy chickpea curry served with deep-fried bread, a classic Punjabi dish."
    },
    { 
      name: "Butter Naan", 
      price: 40, 
      image: "images/naan.jpg", 
      category: "North Indian",
      description: "Soft and fluffy leavened bread brushed with butter, perfect with any curry."
    },
    { 
      name: "Gulab Jamun", 
      price: 60, 
      image: "images/gulabjamun.jpg", 
      category: "North Indian",
      description: "Deep-fried milk solids soaked in sugar syrup, a popular Indian dessert."
    },
    { 
      name: "Dosa", 
      price: 100, 
      image: "images/dosa.jpg", 
      category: "South Indian",
      description: "Crispy fermented rice and lentil crepe, served with sambar and chutney."
    },
    { 
      name: "Idli Sambhar", 
      price: 80, 
      image: "images/idli.jpg", 
      category: "South Indian",
      description: "Steamed rice cakes served with lentil soup and coconut chutney."
    },
    { 
      name: "Sambar Vada", 
      price: 90, 
      image: "images/vada.jpg", 
      category: "South Indian",
      description: "Crispy lentil donuts soaked in flavorful sambar, a perfect breakfast."
    },
    { 
      name: "Rasam Rice", 
      price: 110, 
      image: "images/rasam.jpg", 
      category: "South Indian",
      description: "Peppery and tangy soup served with rice, light and comforting."
    },
    { 
      name: "Pasta Alfredo", 
      price: 180, 
      image: "images/pasta.jpg", 
      category: "Italian",
      description: "Creamy white sauce pasta with parmesan cheese and garlic."
    },
    { 
      name: "Margherita Pizza", 
      price: 250, 
      image: "images/pizza.jpg", 
      category: "Italian",
      description: "Classic pizza with tomato sauce, mozzarella cheese, and fresh basil."
    },
    { 
      name: "Lasagna", 
      price: 270, 
      image: "images/lasagna.jpg", 
      category: "Italian",
      description: "Layered pasta with meat sauce, cheese, and béchamel sauce."
    },
    { 
      name: "Tiramisu", 
      price: 200, 
      image: "images/tiramisu.jpg", 
      category: "Italian",
      description: "Coffee-flavored Italian dessert with layers of ladyfingers and mascarpone."
    }
  ];

  // DOM Elements
  const menuContainer = document.getElementById("menuContainer");
  const searchInput = document.getElementById("searchInput");
  const searchBtn = document.getElementById("searchBtn");
  const cartToggle = document.getElementById("cartToggle");
  const cartDropdown = document.getElementById("cartDropdown");
  const cartItems = document.getElementById("cartItems");
  const cartTotal = document.getElementById("cartTotal");
  const cartCount = document.querySelector(".cart-count");
  const checkoutBtn = document.getElementById("checkoutBtn");
  const itemModal = document.getElementById("itemModal");
  const modalImage = document.getElementById("modalImage");
  const modalTitle = document.getElementById("modalTitle");
  const modalCategory = document.getElementById("modalCategory");
  const modalPrice = document.getElementById("modalPrice");
  const itemQty = document.getElementById("itemQty");
  const increaseQty = document.getElementById("increaseQty");
  const decreaseQty = document.getElementById("decreaseQty");
  const addToCartBtn = document.getElementById("addToCartBtn");
  const closeModal = document.querySelector(".close-modal");
  const notification = document.getElementById("notification");

  // State
  let currentFilter = "All";
  let currentItem = null;
  let quantity = 1;
  let cart = [];
  
  // Initialize
  renderMenu(menuItems);
  setupEventListeners();

  // Functions
  function renderMenu(items) {
    menuContainer.innerHTML = "";
    
    if (items.length === 0) {
      menuContainer.innerHTML = `
        <div class="no-results">
          <i class="fas fa-utensils"></i>
          <p>No dishes found matching your search</p>
        </div>
      `;
      return;
    }
    
    items.forEach(item => {
      const div = document.createElement("div");
      div.className = "menu-item";
      div.innerHTML = `
        <img src="${item.image}" alt="${item.name}" class="menu-img" />
        <div class="item-info">
          <h3>${item.name}</h3>
          <p>₹${item.price}</p>
          <button class="quick-view-btn">Quick View</button>
        </div>
      `;
      div.addEventListener("click", () => openItemModal(item));
      menuContainer.appendChild(div);
    });
  }

  function filterMenu(category) {
    currentFilter = category;
    document.querySelectorAll(".filter-btn").forEach(btn => {
      btn.classList.toggle("active", btn.dataset.category === category);
    });
    
    let filteredItems = category === "All" 
      ? menuItems 
      : menuItems.filter(item => item.category === category);
    
    if (searchInput.value) {
      filteredItems = searchMenu(searchInput.value, filteredItems);
    }
    
    renderMenu(filteredItems);
  }

  function searchMenu(query, items = menuItems) {
    const searchTerm = query.toLowerCase();
    return items.filter(item => 
      item.name.toLowerCase().includes(searchTerm) || 
      item.description.toLowerCase().includes(searchTerm))
  }

  function openItemModal(item) {
    currentItem = item;
    quantity = 1;
    modalImage.src = item.image;
    modalImage.alt = item.name;
    modalTitle.textContent = item.name;
    modalCategory.textContent = item.category;
    modalPrice.textContent = `₹${item.price}`;
    itemQty.textContent = quantity;
    itemModal.classList.add("show");
  }

  function closeItemModal() {
    itemModal.classList.remove("show");
  }

  function updateCart() {
    // Update cart items display
    cartItems.innerHTML = cart.length === 0 
      ? '<p class="empty-cart">Your cart is empty</p>'
      : cart.map(item => `
          <div class="cart-item" data-id="${item.id}">
            <div class="cart-item-info">
              <div class="cart-item-name">${item.name}</div>
              <div class="cart-item-price">₹${item.price * item.quantity}</div>
            </div>
            <div class="cart-item-qty">
              <button class="decrease-item">-</button>
              <span>${item.quantity}</span>
              <button class="increase-item">+</button>
            </div>
          </div>
        `).join("");
    
    // Update cart total
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotal.textContent = `₹${total}`;
    
    // Update cart count
    const itemCount = cart.reduce((count, item) => count + item.quantity, 0);
    cartCount.textContent = itemCount;
    
    // Add event listeners to cart item buttons
    document.querySelectorAll(".decrease-item").forEach(btn => {
      btn.addEventListener("click", (e) => {
        const itemId = e.target.closest(".cart-item").dataset.id;
        updateCartItemQuantity(itemId, -1);
      });
    });
    
    document.querySelectorAll(".increase-item").forEach(btn => {
      btn.addEventListener("click", (e) => {
        const itemId = e.target.closest(".cart-item").dataset.id;
        updateCartItemQuantity(itemId, 1);
      });
    });
  }

  function addToCart() {
    if (!currentItem) return;
    
    const existingItem = cart.find(item => item.id === currentItem.name);
    
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.push({
        id: currentItem.name,
        name: currentItem.name,
        price: currentItem.price,
        quantity: quantity
      });
    }
    
    updateCart();
    showNotification(`${currentItem.name} added to cart`);
    closeItemModal();
  }

  function updateCartItemQuantity(itemId, change) {
    const item = cart.find(item => item.id === itemId);
    if (!item) return;
    
    item.quantity += change;
    
    if (item.quantity <= 0) {
      cart = cart.filter(i => i.id !== itemId);
    }
    
    updateCart();
  }

  function showNotification(message) {
    notification.textContent = message;
    notification.classList.add("show");
    
    setTimeout(() => {
      notification.classList.remove("show");
    }, 3000);
  }

  function checkout() {
    if (cart.length === 0) {
      showNotification("Your cart is empty");
      return;
    }
    
    showNotification("Order placed successfully!");
    cart = [];
    updateCart();
    cartDropdown.classList.remove("show");
  }

  function setupEventListeners() {
    // Filter buttons
    document.querySelectorAll(".filter-btn").forEach(btn => {
      btn.addEventListener("click", () => filterMenu(btn.dataset.category));
    });
    
    // Search functionality
    searchBtn.addEventListener("click", () => {
      const query = searchInput.value.trim();
      let filteredItems = currentFilter === "All" 
        ? menuItems 
        : menuItems.filter(item => item.category === currentFilter);
      
      if (query) {
        filteredItems = searchMenu(query, filteredItems);
      }
      
      renderMenu(filteredItems);
    });
    
    searchInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        searchBtn.click();
      }
    });
    
    // Cart toggle
    cartToggle.addEventListener("click", () => {
      cartDropdown.classList.toggle("show");
    });
    
    // Close cart when clicking outside
    document.addEventListener("click", (e) => {
      if (!e.target.closest(".cart-container") && !e.target.closest(".cart-btn")) {
        cartDropdown.classList.remove("show");
      }
    });
    
    // Modal controls
    closeModal.addEventListener("click", closeItemModal);
    
    increaseQty.addEventListener("click", () => {
      quantity++;
      itemQty.textContent = quantity;
    });
    
    decreaseQty.addEventListener("click", () => {
      if (quantity > 1) {
        quantity--;
        itemQty.textContent = quantity;
      }
    });
    
    addToCartBtn.addEventListener("click", addToCart);
    
    // Close modal when clicking outside
    itemModal.addEventListener("click", (e) => {
      if (e.target === itemModal) {
        closeItemModal();
      }
    });
    
    checkoutBtn.addEventListener("click", checkout);
  }
});
