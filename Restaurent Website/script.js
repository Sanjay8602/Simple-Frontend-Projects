document.addEventListener("DOMContentLoaded", () => {
  const menuItems = [
    { name: "Paneer Butter Masala", price: "₹220", image: "images/paneer.jpg", category: "North Indian" },
    { name: "Chole Bhature", price: "₹150", image: "images/chole.jpg", category: "North Indian" },
    { name: "Butter Naan", price: "₹40", image: "images/naan.jpg", category: "North Indian" },
    { name: "Gulab Jamun", price: "₹60", image: "images/gulabjamun.jpg", category: "North Indian" },

    { name: "Dosa", price: "₹100", image: "images/dosa.jpg", category: "South Indian" },
    { name: "Idli Sambhar", price: "₹80", image: "images/idli.jpg", category: "South Indian" },
    { name: "Sambar Vada", price: "₹90", image: "images/vada.jpg", category: "South Indian" },
    { name: "Rasam Rice", price: "₹110", image: "images/rasam.jpg", category: "South Indian" },

    { name: "Pasta Alfredo", price: "₹180", image: "images/pasta.jpg", category: "Italian" },
    { name: "Margherita Pizza", price: "₹250", image: "images/pizza.jpg", category: "Italian" },
    { name: "Lasagna", price: "₹270", image: "images/lasagna.jpg", category: "Italian" },
    { name: "Tiramisu", price: "₹200", image: "images/tiramisu.jpg", category: "Italian" },
  ];

  const menuContainer = document.getElementById("menuContainer");

  function renderMenu(category) {
    menuContainer.innerHTML = "";
    const filteredItems = category === "All"
      ? menuItems
      : menuItems.filter(item => item.category === category);

    filteredItems.forEach(item => {
      const div = document.createElement("div");
      div.className = "menu-item";
      div.innerHTML = `
        <img src="${item.image}" alt="${item.name}" class="menu-img" />
        <h3>${item.name}</h3>
        <p>${item.price}</p>
      `;
      menuContainer.appendChild(div);
    });
  }

  // Filter button click logic
  document.querySelectorAll(".filter-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      renderMenu(btn.dataset.category);
    });
  });

  // Load all by default
  renderMenu("All");
});
