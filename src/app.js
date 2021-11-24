// API Integration Begins
function displayCurrentWeather(response) {
  let h1Element = document.querySelector("#city-name");
  let descriptionElement = document.querySelector("#weather-description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#winds");
  let currentTempElement = document.querySelector("#current-temp");
  let HighTempElement = document.querySelector("#high-temp");
  let LowTempElement = document.querySelector("#low-temp");
  h1Element.innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  currentTempElement.innerHTML = Math.round(response.data.main.temp);
  HighTempElement.innerHTML = Math.round(response.data.main.temp_max);
  LowTempElement.innerHTML = Math.round(response.data.main.temp_min);
}

let apiKey = "1d92aebec33d3d8890c4cc40ed26f1eb";
let units = "imperial";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Las Vegas&appid=${apiKey}&units=${units}`;

axios.get(apiUrl).then(displayCurrentWeather);
// API Integration Complete
