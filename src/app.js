// Format Day and Time
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

// Current Weather Call
function displayCurrentWeather(response) {
  let h1Element = document.querySelector("#city-name");
  let descriptionElement = document.querySelector("#weather-description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#winds");
  let currentTempElement = document.querySelector("#current-temp");
  let HighTempElement = document.querySelector("#high-temp");
  let LowTempElement = document.querySelector("#low-temp");
  let iconElement = document.querySelector("#icon");

  fahrenheitTemperature = response.data.main.temp;

  h1Element.innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  currentTempElement.innerHTML = Math.round(fahrenheitTemperature);
  HighTempElement.innerHTML = Math.round(response.data.main.temp_max);
  LowTempElement.innerHTML = Math.round(response.data.main.temp_min);
  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
}

// API Call
function search(city) {
  let apiKey = "1d92aebec33d3d8890c4cc40ed26f1eb";
  let units = "imperial";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayCurrentWeather);
}

// Search Engine Call
function findCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#search-bar");
  search(cityInput.value);
}

// Celsius Temperature Call
function showCelsiusTemp(event) {
  event.preventDefault();
  fahrenheitLink.classList.remove("active");
  celsiusLink.classList.add("active");
  let celsiusTemperature = ((fahrenheitTemperature - 32) * 5) / 9;
  let currentTempElement = document.querySelector("#current-temp");
  currentTempElement.innerHTML = Math.round(celsiusTemperature);
}

function showFahrenheitTemp(event) {
  event.preventDefault();
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let currentTempElement = document.querySelector("#current-temp");
  currentTempElement.innerHTML = Math.round(fahrenheitTemperature);
}

// Default City When Page Loads
search("Las Vegas");

let fahrenheitTemperature = null;

// Search Engine Call
let form = document.querySelector("#search-form");
form.addEventListener("submit", findCity);

// Current City Button Call
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

// Celsius Temperature Call
let celsiusLink = document.querySelector("#celsius-temp");
celsiusLink.addEventListener("click", showCelsiusTemp);

// Fahrenheit Temperature Call
let fahrenheitLink = document.querySelector("#fahrenheit-temp");
fahrenheitLink.addEventListener("click", showFahrenheitTemp);
