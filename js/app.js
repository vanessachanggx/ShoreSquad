// app.js - ShoreSquad main JS

document.addEventListener('DOMContentLoaded', () => {
    // Only update weather and social sections, not the map section
    fetchWeatherForecast();

    // TODO: Add social features (e.g., join/host events)
    const socialSection = document.getElementById('social');
    socialSection.innerHTML = '<p>Social features coming soon!</p>';
});

async function fetchWeatherForecast() {
    const weatherSection = document.getElementById('weather');
    weatherSection.innerHTML = '<p>Loading weather forecast...</p>';
    try {
        // NEA 4-day weather forecast API endpoint
        const response = await fetch('https://api.data.gov.sg/v1/environment/4-day-weather-forecast');
        const data = await response.json();
        if (data.items && data.items.length > 0) {
            const forecasts = data.items[0].forecasts;
            let html = '<h2>Singapore 4-Day Weather Forecast</h2>';
            html += '<div class="weather-forecast-grid">';
            forecasts.forEach(day => {
                html += `<div class="weather-day">
                    <div class="weather-date">${day.date}</div>
                    <div class="weather-forecast">${day.forecast}</div>
                    <div class="weather-temp">${day.temperature.low}&deg;C - ${day.temperature.high}&deg;C</div>
                </div>`;
            });
            html += '</div>';
            weatherSection.innerHTML = html;
        } else {
            weatherSection.innerHTML = '<p>No weather forecast available.</p>';
        }
    } catch (err) {
        weatherSection.innerHTML = '<p>Failed to load weather forecast.</p>';
    }
}
