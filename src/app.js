let now = new Date();
let h3 = document.querySelector("h3");

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
let hours = now.getHours();
let minutes = now.getMinutes();
h3.innerHTML = `${day} ${hours} : ${minutes}`;

function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-text-input");

  let h2 = document.querySelector("h2");
  h2.innerHTML = `${searchInput.value}`;
}
let form = document.querySelector("#search-bar");
form.addEventListener("submit", search);

function convertToFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = 66;
}

function convertToCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = 19;
}

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", convertToCelsius);

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#searchInput").value;
  searchCity(city);
}

function searchCity(city) {
  let apiKey = "4a3bde4f38d4bf8dd3fce4fd0d9bac46";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayWeather);
}

let cityForm = document.querySelector("#searchCity");
cityForm.addEventListener("click", handleSubmit);

function displayWeather(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#currentTemp").innerHTML = `${Math.round(
    response.data.main.temp
  )} °C`;
  document.querySelector("#currentWind").innerHTML = `Wind: ${Math.round(
    response.data.wind.speed
  )} m/s`;
  document.querySelector(
    "#currentHumidity"
  ).innerHTML = `Humidity: ${Math.round(response.data.main.humidity)} %`;
  document.querySelector("#highLow").innerHTML = `H: ${Math.round(
    response.data.main.temp_max
  )}°C L: ${Math.round(response.data.main.temp_min)}°C`;
}

searchCity("Leimen");

function searchByLocation(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "4a3bde4f38d4bf8dd3fce4fd0d9bac46";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayWeather);
}

function handleSubmitCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchByLocation);
}

let currentLocationButton = document.querySelector("#currentLocationButton");
currentLocationButton.addEventListener("click", handleSubmitCurrentLocation);
