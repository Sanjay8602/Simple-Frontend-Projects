document.addEventListener('DOMContentLoaded', () => {

  document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href').substring(1);
      document.getElementById(targetId).scrollIntoView({ behavior: 'smooth' });
    });
  });


  document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    const formMessage = document.getElementById('formMessage');

    if (!name || !email || !message) {
      formMessage.textContent = 'Please fill in all fields.';
      formMessage.style.color = 'red';
      return;
    }

    formMessage.textContent = `Thank you, ${name}! We will get back to you soon.`;
    formMessage.style.color = 'green';

    document.getElementById('contactForm').reset();
  });

  // Add menu items dynamically
  const menuData = [
    { category: 'North Indian', name: 'Paneer Butter Masala', price: 250 },
    { category: 'North Indian', name: 'Chole Bhature', price: 180 },
    { category: 'North Indian', name: 'Dal Makhani', price: 200 },
    { category: 'South Indian', name: 'Masala Dosa', price: 150 },
    { category: 'South Indian', name: 'Idli Sambar', price: 120 },
    { category: 'South Indian', name: 'Vegetable Uttapam', price: 130 }
  ];

  const menuContainer = document.getElementById('menuContainer');

  menuData.forEach(item => {
    const div = document.createElement('div');
    div.className = 'menu-item';
    div.innerHTML = `<h3>${item.name}</h3><p>${item.category} - ₹${item.price}</p>`;
    menuContainer.appendChild(div);
  });
});
