document.getElementById('cityForm').addEventListener('submit', function(event){
    event.preventDefault();

    const city = document.getElementById('city').value;

    if (city) {
        getWeather(city);
    } else {
        alert('Please enter a location!');
    }
});

async function getWeather(location) {
    try {
        const apiKey = 'YZSP48M68KQET2YYZHANAXPVQ';
        const apiUrl = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=metric&key=${apiKey}&contentType=json`;
        const response = await fetch(apiUrl);
        if(!response.ok) {
            throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }
        const weatherData = await response.json();
        displayWeather(weatherData);
    } catch (error) {
        console.error('Failed to fetch weather data:', error);
        alert("Could not retrieve weather information. Please try again.");
    }
}

function displayWeather(data) {
    const container = document.getElementById('container');
    container.innerHTML = ''; // Clear previous results

    const weatherInfo = document.createElement('div');
    weatherInfo.classList.add('weather-info');

    // Current weather
    const currentWeather = document.createElement('div');
    currentWeather.classList.add('current-weather');

    const cityName = document.createElement('h2');
    cityName.textContent = data.address;
    currentWeather.appendChild(cityName);

    const temperature = document.createElement('p');
    temperature.textContent = `Temperature: ${data.currentConditions.temp}°C`;
    currentWeather.appendChild(temperature);

    const condition = document.createElement('p');
    condition.textContent = `Condition: ${data.currentConditions.conditions}`;
    currentWeather.appendChild(condition);

    const humidity = document.createElement('p');
    humidity.textContent = `Humidity: ${data.currentConditions.humidity}%`;
    currentWeather.appendChild(humidity);

    const windSpeed = document.createElement('p');
    windSpeed.textContent = `Wind Speed: ${data.currentConditions.windspeed} km/h`;
    currentWeather.appendChild(windSpeed);

    weatherInfo.appendChild(currentWeather);

    // Weekly forecast
    const weeklyForecast = document.createElement('div');
    weeklyForecast.classList.add('weekly-forecast');

    const forecastTitle = document.createElement('h3');
    forecastTitle.textContent = 'Weekly Forecast';
    weeklyForecast.appendChild(forecastTitle);

    data.days.slice(1, 8).forEach(day => {
        const dayForecast = document.createElement('div');
        dayForecast.classList.add('day-forecast');

        const date = new Date(day.datetime);
        const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });

        dayForecast.innerHTML = `
            <p>${dayName}</p>
            <p>High: ${day.tempmax}°C</p>
            <p>Low: ${day.tempmin}°C</p>
            <p>${day.conditions}</p>
        `;

        weeklyForecast.appendChild(dayForecast);
    });

    weatherInfo.appendChild(weeklyForecast);
    container.appendChild(weatherInfo);
}