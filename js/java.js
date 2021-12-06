// Display forecast function

function displayForecast() {
  let forecastElement = document.querySelector("#forecast");

  let days = ["Thu", "Fri", "Sat", "Sun"];

  let forecastHTML = `<div class="row">`;
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
      <div class="col-2">
        <div class="weather-forecast-date">${day}</div>
        <img
          src="http://openweathermap.org/img/wn/50d@2x.png"
          alt=""
          width="42"
        />
        <div class="weather-forecast-temperatures">
          <span class="weather-forecast-temperature-max"> 18° </span>
          <span class="weather-forecast-temperature-min"> 12° </span>
        </div>
      </div>
  `;
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
  console.log(forecastHTML);
}

// Display weather function

function showWeather(response) {
  let temp = Math.round(response.data.main.temp);
  let city = response.data.name;
  let description = response.data.weather[0].main;
  let windSpeed = Math.round(response.data.wind.speed);
  let tempDisplay = document.querySelector("h1 .temperature");
  let descriptionDisplay = document.querySelector("#weather-description");
  let windSpeedDisplay = document.querySelector("#wind-speed");
  let cityDisplay = document.querySelector("h2");
  let iconElement = document.querySelector("#icon");
  celsiusTemperature = temp;
  tempDisplay.innerHTML = `${temp}`;
  descriptionDisplay.innerHTML = `${description}`;
  windSpeedDisplay.innerHTML = `Wind: ${windSpeed} km/h`;
  cityDisplay.innerHTML = `${city}`;
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute(
    "alt",
    `http://openweathermap.org/img/wn${response.data.weather[0].description}`
  );
}

// Search by location function

function searchByLocation(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let units = "metric";
  let apiKey = "53315a4c01471ff10f1bbba4b3a95f94";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showWeather);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchByLocation);
}

// Search by city function

function searchByCity(city) {
  let apiKey = "53315a4c01471ff10f1bbba4b3a95f94";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input-id").value;
  searchByCity(city);
}

// Time and date display function

function formatDate(date) {
  let todaysDate = date.getDate();
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let dayIndex = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[dayIndex];
  let monthIndex = date.getMonth();
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let month = months[monthIndex];

  return `${day}, ${month} ${todaysDate} at ${hours}:${minutes}`;
}

// Temperature unit display function

function convertToFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function convertToCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

// Triggers

let celsiusTemperature = 17;

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", convertToCelsius);

let searchButton = document.querySelector("form");
searchButton.addEventListener("click", handleSubmit);

let currentLocationButton = document.querySelector("#location-button-id");
currentLocationButton.addEventListener("click", getCurrentLocation);

let dateElement = document.querySelector("#date-time");
let currentTime = new Date();
dateElement.innerHTML = formatDate(currentTime);

searchByCity("London");
displayForecast();
