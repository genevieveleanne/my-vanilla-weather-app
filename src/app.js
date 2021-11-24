// Format Day and Time Begins
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

  let currentMinutes = date.getMinutes();
  if (currentMinutes < 10) {
    currentMinutes = `0${currentMinutes}`;
  }

  return `${currentDay} ${currentHour}:${currentMinutes}`;
}

let now = new Date();
let h2 = document.querySelector("h2.day-time");
h2.innerHTML = showDate(now);
// Format Day and Time Complete

// Current Weather Begins
function displayCurrentWeather(response) {
  let h1Element = document.querySelector("#city-name");
  let descriptionElement = document.querySelector("#weather-description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#winds");
  let currentTempElement = document.querySelector("#current-temp");
  let HighTempElement = document.querySelector("#high-temp");
  let LowTempElement = document.querySelector("#low-temp");
  let iconElement = document.querySelector("#icon");

  h1Element.innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  currentTempElement.innerHTML = Math.round(response.data.main.temp);
  HighTempElement.innerHTML = Math.round(response.data.main.temp_max);
  LowTempElement.innerHTML = Math.round(response.data.main.temp_min);
  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
}
// Current Weather Complete

// API Call Begins
let apiKey = "1d92aebec33d3d8890c4cc40ed26f1eb";
let units = "imperial";
let city = "Sacramento";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;

axios.get(apiUrl).then(displayCurrentWeather);
// API Call Complete
