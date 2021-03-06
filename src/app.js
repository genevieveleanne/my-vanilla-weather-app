// Format Current Day and Time Begins
function showDate(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let currentDay = days[date.getDay()];

  let currentHour = date.getHours();
  if (currentHour < 12) {
    let greetingElement = document.querySelector("#greeting");
    greetingElement.innerHTML = `Good morning!`;
  } else {
    if (currentHour >= 18) {
      let greetingElement = document.querySelector("#greeting");
      greetingElement.innerHTML = `Good evening!`;
    } else {
      let greetingElement = document.querySelector("#greeting");
      greetingElement.innerHTML = `Good afternoon!`;
    }
  }

  let currentMinutes = date.getMinutes();
  if (currentMinutes < 10) {
    currentMinutes = `0${currentMinutes}`;
  }

  return `${currentDay} ${currentHour}:${currentMinutes}`;
}

let now = new Date();
let h2 = document.querySelector("h2.day-time");
h2.innerHTML = showDate(now);
// Format Current Day and Time Complete

// Format Forecast Day Begins
function formatForecastDay(timestamp) {
  let day = new Date(timestamp * 1000);
  let weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let getDay = day.getDay();

  return weekdays[getDay];
}
// Format Forecast Day Complete

// Display Forecast Begins
function displayForecast(response) {
  let dailyForecast = response.data.daily;

  let forecast = document.querySelector("#forecast");

  let forecastHTML = `<div class="row forecast">`;
  dailyForecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        ` <div class="col-2">
      <div class="forecast-day">${formatForecastDay(forecastDay.dt)}</div>
      <div class ="forecast-description">${
        forecastDay.weather[0].description
      }</div>
      <img src="https://openweathermap.org/img/wn/${
        forecastDay.weather[0].icon
      }@2x.png" width="50" />
      <div class="forecast-temperature">
      <span class="forecast-high-temperature">H:${Math.round(
        forecastDay.temp.max
      )}??</span>
      <span class="forecast-low-temperature">L:${Math.round(
        forecastDay.temp.min
      )}??</span>
      </div>
      </div>`;
    }
  });

  forecastHTML = forecastHTML + `</div>`;

  forecast.innerHTML = forecastHTML;
}
// Display Forecast Complete

// Forecast Call
function getForecast(coordinates) {
  let apiKey = "1fc48f0961dfe9fce83c65e9089afb69";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayForecast);
}

// Display Current Weather Begins
function displayCurrentWeather(response) {
  let h1Element = document.querySelector("#city-name");
  let descriptionElement = document.querySelector("#weather-description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#winds");
  let currentTempElement = document.querySelector("#current-temp");
  let iconElement = document.querySelector("#icon");

  h1Element.innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  currentTempElement.innerHTML = Math.round(response.data.main.temp);
  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );

  getForecast(response.data.coord);
}
// Display Current Weather Complete

// User Input Begins
function findCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#search-bar");
  search(cityInput.value);
}
// User Input Complete

// Current City Display Begins
function showPosition(position) {
  let apiKey = "1d92aebec33d3d8890c4cc40ed26f1eb";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let units = "imperial";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${units}&appid=${apiKey}`;
  axios.get(apiUrl).then(displayCurrentWeather);
}

function getCurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

let currentCityButton = document.querySelector("#current-city-button");
currentCityButton.addEventListener("click", getCurrentPosition);
// Current City Display Complete

// API Call
function search(city) {
  let apiKey = "1d92aebec33d3d8890c4cc40ed26f1eb";
  let units = "imperial";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayCurrentWeather);
}

// Default City When Page Loads
search("Las Vegas");

// Search Engine Call
let form = document.querySelector("#search-form");
form.addEventListener("submit", findCity);
