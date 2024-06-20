document.getElementById('search-btn').addEventListener('click', function() {
    const city = document.getElementById('city').value;
    if (city) {
        fetchWeatherData(city);
    }
});

async function fetchWeatherData(city) {
    const apiKey = 'your_openweathermap_api_key'; // Replace with your OpenWeatherMap API key
    const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        displayWeatherData(data);
    } catch (error) {
        console.error('Error fetching weather data:', error);
        alert('Failed to fetch weather data. Please try again.');
    }
}

function displayWeatherData(data) {
    const cityName = document.getElementById('city-name');
    const temperature = document.getElementById('temperature');
    const description = document.getElementById('description');
    const forecastList = document.getElementById('forecast-list');

    cityName.textContent = `${data.city.name}, ${data.city.country}`;
    temperature.textContent = `${data.list[0].main.temp} °C`;
    description.textContent = data.list[0].weather[0].description;

    forecastList.innerHTML = '';
    data.list.slice(0, 5).forEach(day => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <h4>${new Date(day.dt * 1000).toLocaleDateString()}</h4>
            <p>${day.weather[0].description}</p>
            <p>Temp: ${day.main.temp_max} °C / ${day.main.temp_min} °C</p>
        `;
        forecastList.appendChild(listItem);
    });
}
