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
    "Sunday",
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
  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  return `${day} ${date} ${months[month]}`;
}

function getForecast(coordinates) {
  let apiKey = "940cab7f2dffe0039b455473a663a1f7";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
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
  getForecast(response.data.coord);
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

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  console.log(response.data.daily);
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
           <div class="col-2">
             <div class="weather-forecast-day">
               ${formatDay(forecastDay.dt)}
             </div> 
             <img src="http://openweathermap.org/img/wn/${
               forecastDay.weather[0].icon
             }@2x.png" width="40"/>
             <div class="weather-forecast-temperature">
               <span class="weather-forecast-temperature-max">
                ${Math.round(forecastDay.temp.max)}°
               </span>
               <span class="weather-forecast-temperature-min">
                 ${Math.round(forecastDay.temp.min)}°
               </span>
             </div>
           </div> `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

search("London");
