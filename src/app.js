function formatTime(timestamp) {
  let now = new Date(timestamp);
  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${hours}:${minutes}`;
}

function formatDate(timestamp) {
  let now = new Date(timestamp);
  let days = [
    "Sunay",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[now.getDay()];
  let date = now.getDate();
  let month = now.getMonth();
  return `${day} ${date}/${month}`;
}

function displayWeather(response) {
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = response.data.name;
  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = response.data.weather[0].description;

  celciusValue = response.data.main.temp;

  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  let windElement = document.querySelector("#wind");
  windElement.innerHTML = Math.round(response.data.wind.speed);
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = response.data.main.humidity;
  let maxtempElement = document.querySelector("#maxtemp");
  maxtempElement.innerHTML = Math.round(response.data.main.temp_max);
  let mintempElement = document.querySelector("#mintemp");
  mintempElement.innerHTML = Math.round(response.data.main.temp_min);
  let dateElement = document.querySelector("#date");
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  let timeElement = document.querySelector("#time");
  timeElement.innerHTML = formatTime(response.data.dt * 1000);
  let iconeElement = document.querySelector("#icone-weather");
  iconeElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconeElement.setAttribute(
    "alt",
    `http://openweathermap.org/img/wn/${response.data.weather[0].description}@2x.png`
  );

  let reminder = document.querySelector("#reminder");
  if (response.data.main.temp > 20 && response.data.main.temp < 30) {
    reminder.innerHTML = `Remember to drink a lot of water!`;
  } else if (response.data.main.temp < 5) {
    reminder.innerHTML = `Remember to dress up warm!`;
  } else if (response.data.main.temp >= 30) {
    reminder.innerHTML = `Remember to put a lot of sunscreen!`;
  } else {
    reminder.innerHTML = `Have an amazing day!`;
  }
}

function search(city) {
  let apiKey = "940cab7f2dffe0039b455473a663a1f7";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayWeather);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

function displayFarenheit(event) {
  event.preventDefault();
  celciusElement.classList.remove("active");
  farenheitElement.classList.add("active");
  let temperatureElement = document.querySelector("#temperature");
  let farenheitValue = Math.round(celciusValue * 1.8) + 32;
  temperatureElement.innerHTML = farenheitValue;
}
function displayCelcius(event) {
  event.preventDefault();
  farenheitElement.classList.remove("active");
  celciusElement.classList.add("active");
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celciusValue);
}
let farenheitElement = document.querySelector("#farenheit-link");
farenheitElement.addEventListener("click", displayFarenheit);
let celciusElement = document.querySelector("#celcius-link");
celciusElement.addEventListener("click", displayCelcius);

let celciusValue = null;

function displayForecast() {
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  let days = ["Thu", "Fri", "Sat", "Sun", "Mon", "Tue"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
           <div class="col-2">
             <div class="weather-forecast-day">
               ${day}
             </div> 
             <img src="http://openweathermap.org/img/wn/04d@2x.png" width="40"/>
             <div class="weather-forecast-temperature">
               <span class="weather-forecast-temperature-max">
                 14°
               </span>
               <span class="weather-forecast-temperature-min">
                 12°
               </span>
             </div>
           </div> `;
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}
displayForecast();

search("London");
