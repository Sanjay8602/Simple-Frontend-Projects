const apiKey = "Put your API key"; 

async function getWeather(city = null, lat = null, lon = null) {
    let url;
    if (city) {
        url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    } else if (lat && lon) {
        url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
    } else {
        alert("Please enter a city name or allow location access!");
        return;
    }

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("City not found!");

        const data = await response.json();
        displayWeather(data);
        getForecast(data.coord.lat, data.coord.lon);
    } catch (error) {
        alert(error.message);
    }
}

async function getForecast(lat, lon) {
    const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("Failed to get forecast!");

        const data = await response.json();
        displayForecast(data);
    } catch (error) {
        alert(error.message);
    }
}

function displayWeather(data) {
    document.getElementById("cityName").textContent = data.name;
    document.getElementById("temperature").textContent = `🌡 Temperature: ${data.main.temp}°C`;
    document.getElementById("condition").textContent = `☁ Condition: ${data.weather[0].description}`;
    document.getElementById("weatherIcon").src = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;

    document.getElementById("weatherResult").style.display = "block";
}

function displayForecast(data) {
    const forecastDiv = document.getElementById("forecast");
    forecastDiv.innerHTML = "";
    const dailyForecasts = {};

    data.list.forEach(entry => {
        const date = entry.dt_txt.split(" ")[0];
        if (!dailyForecasts[date]) {
            dailyForecasts[date] = entry;
        }
    });

    Object.values(dailyForecasts).slice(0, 5).forEach(forecast => {
        const div = document.createElement("div");
        div.classList.add("forecast-item");
        div.innerHTML = `
            <p>${forecast.dt_txt.split(" ")[0]}</p>
            <img src="https://openweathermap.org/img/wn/${forecast.weather[0].icon}.png" alt="Weather Icon">
            <p>${forecast.main.temp}°C</p>
        `;
        forecastDiv.appendChild(div);
    });

    document.getElementById("forecastContainer").style.display = "block";
}

document.getElementById("geoBtn").addEventListener("click", () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                getWeather(null, position.coords.latitude, position.coords.longitude);
            },
            () => alert("Location access denied!")
        );
    } else {
        alert("Geolocation not supported!");
    }
});

document.getElementById("darkModeToggle").addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
});
