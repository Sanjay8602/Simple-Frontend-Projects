const apiKey = 'aa6523f39a1a4cb1a57e0f4b18feb40e'; // Replace with your NewsAPI key
const newsContainer = document.getElementById('newsContainer');
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const countrySelect = document.getElementById('countrySelect');
const loading = document.getElementById('loading');

// Function to show/hide loading spinner
function toggleLoading(show) {
    loading.classList.toggle('hidden', !show);
}

// Function to fetch and display news
async function fetchNews(query = '', country = 'us') {
    toggleLoading(true);
    let url = `https://newsapi.org/v2/top-headlines?country=${country}&apiKey=${apiKey}`;
    if (query) {
        url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(query)}&apiKey=${apiKey}`;
    }

    try {
        console.log('Fetching news from:', url); // Debug: Log the URL
        const response = await fetch(url);
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || `HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log('API response:', data); // Debug: Log the response
        displayNews(data.articles);
    } catch (error) {
        console.error('Error fetching news:', error); // Debug: Log the error
        newsContainer.innerHTML = `<p class="text-red-500 text-center">Error: ${error.message}. Please check your API key or try again later.</p>`;
    } finally {
        toggleLoading(false);
    }
}

// Function to display news articles
function displayNews(articles) {
    newsContainer.innerHTML = '';
    if (!articles || articles.length === 0) {
        newsContainer.innerHTML = '<p class="text-center text-gray-500">No articles found.</p>';
        return;
    }

    articles.forEach(article => {
        const articleElement = document.createElement('div');
        articleElement.className = 'bg-white p-4 rounded-md shadow-md';
        articleElement.innerHTML = `
            <img src="${article.urlToImage || 'https://via.placeholder.com/300x200'}" alt="Article image" class="w-full h-48 object-cover rounded-md mb-4">
            <h2 class="text-xl font-semibold mb-2">${article.title}</h2>
            <p class="text-gray-600 mb-4">${article.description || 'No description available.'}</p>
            <a href="${article.url}" target="_blank" class="text-blue-600 hover:underline">Read more</a>
        `;
        newsContainer.appendChild(articleElement);
    });
}


searchBtn.addEventListener('click', () => {
    const query = searchInput.value.trim();
    const country = countrySelect.value;
    fetchNews(query, country);
});

// Event listener for Enter key in search input
searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const query = searchInput.value.trim();
        const country = countrySelect.value;
        fetchNews(query, country);
    }
});

// Event listener for country selection
countrySelect.addEventListener('change', () => {
    const query = searchInput.value.trim();
    const country = countrySelect.value;
    fetchNews(query, country);
});

// Fetch top headlines for default country (US) on page load
fetchNews();