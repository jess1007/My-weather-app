let now = new Date();
let hours = now.getHours();
let minutes = now.getMinutes();
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
let date = `${day} ${hours}:${minutes}`;
let todayDate = document.querySelector("#date");
todayDate.innerHTML = `${date}`;

function search(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#searchCity");
  let h1 = document.querySelector("h1");
  h1.innerHTML = `${cityInput.value}`;
  let apiKey = "639a25b57aa39c61186426161599dec9";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&appid=${apiKey}&units=metric`;
  axios.get(`${apiUrl}`).then(showWeather);
}
let form = document.querySelector("form");
form.addEventListener("submit", search);
form.addEventListener("click", search);

function showWeather(response) {
  let currentCity = response.data.name;
  let todayCity = document.querySelector("h1");
  todayCity.innerHTML = `${currentCity}`;
  let currentTemp = Math.round(response.data.main.temp);
  let todayTemp = document.querySelector("#today-temperature");
  todayTemp.innerHTML = `${currentTemp}`;
  let currentWind = Math.round(response.data.wind.speed);
  let todayWind = document.querySelector("#today-wind");
  todayWind.innerHTML = `${currentWind}`;
  let currentHumidity = response.data.main.humidity;
  let todayHumidity = document.querySelector("#today-humidity");
  todayHumidity.innerHTML = `${currentHumidity}`;
  let currentFeelsLike = Math.round(response.data.main.feels_like);
  let todayFeelsLike = document.querySelector("#today-feels-like");
  todayFeelsLike.innerHTML = `${currentFeelsLike}`;
}
function searchLocation(position) {
  let apiKey = "639a25b57aa39c61186426161599dec9";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(`${apiUrl}`).then(showWeather);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}
let current = document.querySelector("#current-location-button");
current.addEventListener("click", getCurrentLocation);
current.addEventListener("submit", getCurrentLocation);
