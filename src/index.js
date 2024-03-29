let now = new Date();
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
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

function formatDayForecast(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

function showForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
  <div class="col-2">
              <div class="day-forecast">${formatDayForecast(
                forecastDay.dt
              )}</div>
              <img src="https://openweathermap.org/img/wn/${
                forecastDay.weather[0].icon
              }.png" alt="clouds" width="75%"/>
              <div class="temperature-forecast">
                <span class="temperature-forecast-min">${Math.round(
                  forecastDay.temp.min
                )}</span>°|<span class="temperature-forecast-max">${Math.round(
          forecastDay.temp.max
        )}</span>°
              </div>
            </div>
        `;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

let form = document.querySelector("form");
form.addEventListener("submit", handleClick);
form.addEventListener("click", handleClick);

function search(city) {
  let apiKey = "639a25b57aa39c61186426161599dec9";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(`${apiUrl}`).then(showWeather);
}
function handleClick(event) {
  event.preventDefault();
  let city = document.querySelector("#searchCity").value;
  search(city);
}

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
  let currentDescription = response.data.weather[0].description;
  let todayDescription = document.querySelector("#weather-description");
  todayDescription.innerHTML = `${currentDescription}`;
  let currentIcon = response.data.weather[0].icon;
  let todayIcon = document.querySelector("#icon");
  todayIcon.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${currentIcon}@2x.png`
  );
  todayIcon.setAttribute("alt", `${currentDescription}`);
  celsiusTemp = response.data.main.temp;
  getForecast(response.data.coord);
}
function getForecast(coordinates) {
  let apiKey = "639a25b57aa39c61186426161599dec9";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showForecast);
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

search("Melbourne");
