const city = document.getElementById("city");
const temperature = document.getElementById("temperature");
const weatherDescription = document.getElementById("weather-description");
const weatherIcon = document.getElementById("weather-icon");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");

// main function for fetch api and get the city and api key from json file
async function fetchData() {
  try {
    const data = await loadJsonData();
    const apiKey = data.apiKey;
    const city = data.city;
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=fr  `;

    // call weather data display function
    displayWeatherData(apiUrl);

    setInterval(() => displayWeatherData(apiUrl), 3600000); // update each hour (milliseconds)
  } catch {
    console.error(
      "Une erreur s'est produite lors de la récupération des données"
    );
  }
}

// function for loading json file data
async function loadJsonData() {
  const response = await fetch("conf.json");
  return await response.json();
}

// function for displaying weather data
async function displayWeatherData(apiUrl) {
  try {
    const response = await fetch(apiUrl);
    const weatherData = await response.json();

    city.textContent = weatherData.name;
    temperature.textContent = ` ${Math.round(weatherData.main.temp)} °`;
    weatherDescription.textContent = ` ${weatherData.weather[0].description} `;
    weatherIcon.src = getWeatherIcon(weatherData.weather[0].icon);
    humidity.textContent = `Humidité : ${weatherData.main.humidity} %`;
    wind.textContent = `Vent : ${Math.round(weatherData.wind.speed)} km/h`;
  } catch {
    console.error(
      "Une erreur s'est produite lors de la récupération des données météo"
    );
  }
}

// function for fetch weather icon code
function getWeatherIcon(iconCode) {
  try {
    const iconURL = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
    return iconURL;
  } catch {
    console.error(
      "Une erreur s'est produite lors de la récupération de l'icône météo"
    );
  }
}

// main function call
fetchData();
