document.addEventListener("DOMContentLoaded", () => {
  const menuItems = [
    { 
      id: 1, 
      name: "Paneer Butter Masala", 
      price: 220, 
      image: "images/paneer.jpg", 
      category: "North Indian",
      description: "Creamy and rich paneer cooked in a tomato-based gravy with aromatic spices.",
      rating: 4.5
    },
    { 
      id: 2, 
      name: "Chole Bhature", 
      price: 150, 
      image: "images/chole.jpg", 
      category: "North Indian",
      description: "Spicy chickpea curry served with deep-fried bread, a classic Punjabi dish.",
      rating: 4.2
    },
    { 
      id: 3, 
      name: "Butter Naan", 
      price: 40, 
      image: "images/naan.jpg", 
      category: "North Indian",
      description: "Soft and fluffy leavened bread brushed with butter, perfect with any curry.",
      rating: 4.0
    },
    { 
      id: 4, 
      name: "Gulab Jamun", 
      price: 60, 
      image: "images/gulabjamun.jpg", 
      category: "North Indian",
      description: "Deep-fried milk solids soaked in sugar syrup, a popular Indian dessert.",
      rating: 4.7
    },
    { 
      id: 5, 
      name: "Dosa", 
      price: 100, 
      image: "images/dosa.jpg", 
      category: "South Indian",
      description: "Crispy fermented rice and lentil crepe, served with sambar and chutney.",
      rating: 4.3
    },
    { 
      id: 6, 
      name: "Idli Sambhar", 
      price: 80, 
      image: "images/idli.jpg", 
      category: "South Indian",
      description: "Steamed rice cakes served with lentil soup and coconut chutney.",
      rating: 4.1
    },
    { 
      id: 7, 
      name: "Sambar Vada", 
      price: 90, 
      image: "images/vada.jpg", 
      category: "South Indian",
      description: "Crispy lentil donuts soaked in flavorful sambar, a perfect breakfast.",
      rating: 4.4
    },
    { 
      id: 8, 
      name: "Rasam Rice", 
      price: 110, 
      image: "images/rasam.jpg", 
      category: "South Indian",
      description: "Peppery and tangy soup served with rice, light and comforting.",
      rating: 4.0
    },
    { 
      id: 9, 
      name: "Pasta Alfredo", 
      price: 180, 
      image: "images/pasta.jpg", 
      category: "Italian",
      description: "Creamy white sauce pasta with parmesan cheese and garlic.",
      rating: 4.6
    },
    { 
      id: 10, 
      name: "Margherita Pizza", 
      price: 250, 
      image: "images/pizza.jpg", 
      category: "Italian",
      description: "Classic pizza with tomato sauce, mozzarella cheese, and fresh basil.",
      rating: 4.8
    },
    { 
      id: 11, 
      name: "Lasagna", 
      price: 270, 
      image: "images/lasagna.jpg", 
      category: "Italian",
      description: "Layered pasta with meat sauce, cheese, and béchamel sauce.",
      rating: 4.5
    },
    { 
      id: 12, 
      name: "Tiramisu", 
      price: 200, 
      image: "images/tiramisu.jpg", 
      category: "Italian",
      description: "Coffee-flavored Italian dessert with layers of ladyfingers and mascarpone.",
      rating: 4.9
    }
  ];

  // DOM Elements
  const menuContainer = document.getElementById("menuContainer");
  const searchInput = document.getElementById("searchInput");
  const searchBtn = document.getElementById("searchBtn");
  const clearSearchBtn = document.getElementById("clearSearchBtn");
  const cartToggle = document.getElementById("cartToggle");
  const cartDropdown = document.getElementById("cartDropdown");
  const cartItems = document.getElementById("cartItems");
  const cartTotal = document.getElementById("cartTotal");
  const cartCount = document.querySelector(".cart-count");
  const clearCartBtn = document.getElementById("clearCartBtn");
  const checkoutBtn = document.getElementById("checkoutBtn");
  const itemModal = document.getElementById("itemModal");
  const modalImage = document.getElementById("modalImage");
  const modalTitle = document.getElementById("modalTitle");
  const modalCategory = document.getElementById("modalCategory");
  const modalRating = document.getElementById("modalRating");
  const modalDescription = document.getElementById("modalDescription");
  const modalPrice = document.getElementById("modalPrice");
  const itemQty = document.getElementById("itemQty");
  const increaseQty = document.getElementById("increaseQty");
  const decreaseQty = document.getElementById("decreaseQty");
  const addToCartBtn = document.getElementById("addToCartBtn");
  const closeModal = document.querySelector(".close-modal");
  const notification = document.getElementById("notification");
  const loadingSpinner = document.getElementById("loadingSpinner");
  const backToTopBtn = document.getElementById("backToTopBtn");
  const currencySelect = document.getElementById("currencySelect");

  // State
  let currentFilter = "All";
  let currentItem = null;
  let quantity = 1;
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  let orderHistory = JSON.parse(localStorage.getItem('orderHistory')) || [];
  let currency = localStorage.getItem('currency') || 'INR';
  const exchangeRate = 0.012; // INR to USD (fixed for demo, 1 INR = 0.012 USD)
  const fallbackImage = 'images/fallback.jpg';

  // Initialize
  currencySelect.value = currency;
  renderMenu(menuItems);
  updateCart();
  setupEventListeners();

  // Functions
  function formatPrice(price) {
    if (currency === 'USD') {
      return `$${(price * exchangeRate).toFixed(2)}`;
    }
    return `₹${price}`;
  }

  function convertPrice(price) {
    return currency === 'USD' ? price * exchangeRate : price;
  }

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
        <img src="${item.image || fallbackImage}" alt="${item.name}" class="menu-img" />
        <div class="item-info">
          <h3>${item.name}</h3>
          <p>${formatPrice(item.price)}</p>
          <div class="rating">${renderStars(item.rating)}</div>
          <button class="quick-view-btn" aria-label="View details for ${item.name}">Quick View</button>
        </div>
      `;
      div.addEventListener("click", () => openItemModal(item));
      menuContainer.appendChild(div);
    });
  }

  function renderStars(rating) {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5 ? 1 : 0;
    const emptyStars = 5 - fullStars - halfStar;
    return (
      '<i class="fas fa-star"></i>'.repeat(fullStars) +
      (halfStar ? '<i class="fas fa-star-half-alt"></i>' : '') +
      '<i class="far fa-star"></i>'.repeat(emptyStars)
    );
  }

  function filterMenu(category) {
    currentFilter = category;
    document.querySelectorAll(".filter-btn").forEach(btn => {
      btn.classList.toggle("active", btn.dataset.category === category);
    });
    
    loadingSpinner.classList.add("show");
    setTimeout(() => {
      let filteredItems = category === "All" 
        ? menuItems 
        : menuItems.filter(item => item.category === category);
      
      if (searchInput.value) {
        filteredItems = searchMenu(searchInput.value, filteredItems);
      }
      
      renderMenu(filteredItems);
      loadingSpinner.classList.remove("show");
    }, 500); // Simulate loading delay
  }

  function searchMenu(query, items = menuItems) {
    const searchTerm = query.toLowerCase();
    return items.filter(item => 
      item.name.toLowerCase().includes(searchTerm) || 
      item.description.toLowerCase().includes(searchTerm));
  }

  function openItemModal(item) {
    currentItem = item;
    quantity = 1;
    modalImage.src = item.image || fallbackImage;
    modalImage.alt = item.name;
    modalTitle.textContent = item.name;
    modalCategory.textContent = item.category;
    modalRating.innerHTML = renderStars(item.rating);
    modalDescription.textContent = item.description;
    modalPrice.textContent = formatPrice(item.price);
    itemQty.textContent = quantity;
    itemModal.classList.add("show");
    addToCartBtn.focus(); // Accessibility: focus on add to cart
  }

  function closeItemModal() {
    itemModal.classList.remove("show");
  }

  function updateCart() {
    cartItems.innerHTML = cart.length === 0 
      ? '<p class="empty-cart">Your cart is empty</p>'
      : cart.map(item => `
          <div class="cart-item" data-id="${item.id}">
            <div class="cart-item-info">
              <div class="cart-item-name">${item.name}</div>
              <div class="cart-item-price">${formatPrice(item.price * item.quantity)}</div>
            </div>
            <div class="cart-item-qty">
              <button class="decrease-item" aria-label="Decrease quantity of ${item.name}">-</button>
              <span>${item.quantity}</span>
              <button class="increase-item" aria-label="Increase quantity of ${item.name}">+</button>
            </div>
          </div>
        `).join("");
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotal.textContent = formatPrice(total);
    
    const itemCount = cart.reduce((count, item) => count + item.quantity, 0);
    cartCount.textContent = itemCount;
    
    localStorage.setItem('cart', JSON.stringify(cart));
    
    document.querySelectorAll(".decrease-item").forEach(btn => {
      btn.addEventListener("click", (e) => {
        const itemId = parseInt(e.target.closest(".cart-item").dataset.id);
        updateCartItemQuantity(itemId, -1);
      });
    });
    
    document.querySelectorAll(".increase-item").forEach(btn => {
      btn.addEventListener("click", (e) => {
        const itemId = parseInt(e.target.closest(".cart-item").dataset.id);
        updateCartItemQuantity(itemId, 1);
      });
    });
  }

  function addToCart() {
    if (!currentItem) return;
    
    const existingItem = cart.find(item => item.id === currentItem.id);
    
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.push({
        id: currentItem.id,
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

  function clearCart() {
    if (cart.length === 0) {
      showNotification("Cart is already empty");
      return;
    }
    cart = [];
    updateCart();
    showNotification("Cart cleared");
  }

  function checkout() {
    if (cart.length === 0) {
      showNotification("Your cart is empty");
      return;
    }
    
    const order = {
      id: Date.now(),
      items: [...cart],
      total: cart.reduce((sum, item) => sum + (item.price * item.quantity), 0),
      date: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })
    };
    orderHistory.push(order);
    localStorage.setItem('orderHistory', JSON.stringify(orderHistory));
    
    showNotification("Order placed successfully!");
    cart = [];
    updateCart();
    cartDropdown.classList.remove("show");
  }

  function showNotification(message) {
    notification.textContent = message;
    notification.classList.add("show");
    
    setTimeout(() => {
      notification.classList.remove("show");
    }, 5000); // Extended to 5 seconds
  }

  function updateCurrency() {
    currency = currencySelect.value;
    localStorage.setItem('currency', currency);
    renderMenu(
      currentFilter === "All" 
        ? menuItems 
        : menuItems.filter(item => item.category === currentFilter)
    );
    updateCart();
    if (currentItem) {
      modalPrice.textContent = formatPrice(currentItem.price);
    }
  }

  function handleScroll() {
    if (window.scrollY > 300) {
      backToTopBtn.classList.add("show");
    } else {
      backToTopBtn.classList.remove("show");
    }
  }

  function setupEventListeners() {
    // Filter buttons
    document.querySelectorAll(".filter-btn").forEach(btn => {
      btn.addEventListener("click", () => filterMenu(btn.dataset.category));
    });
    
    // Search functionality
    searchBtn.addEventListener("click", () => {
      loadingSpinner.classList.add("show");
      setTimeout(() => {
        const query = searchInput.value.trim();
        let filteredItems = currentFilter === "All" 
          ? menuItems 
          : menuItems.filter(item => item.category === currentFilter);
        
        if (query) {
          filteredItems = searchMenu(query, filteredItems);
        }
        
        renderMenu(filteredItems);
        loadingSpinner.classList.remove("show");
      }, 500);
    });
    
    searchInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        searchBtn.click();
      }
    });
    
    clearSearchBtn.addEventListener("click", () => {
      searchInput.value = "";
      filterMenu(currentFilter);
      searchInput.focus();
    });
    
    // Cart toggle
    cartToggle.addEventListener("click", (e) => {
      e.stopPropagation();
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
    
    clearCartBtn.addEventListener("click", clearCart);
    
    checkoutBtn.addEventListener("click", checkout);
    
    // Back to top
    backToTopBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    
    // Currency toggle
    currencySelect.addEventListener("change", updateCurrency);
    
    // Scroll handling
    window.addEventListener("scroll", handleScroll);
  }
});
