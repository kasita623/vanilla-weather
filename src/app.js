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
let apiKey = "940cab7f2dffe0039b455473a663a1f7";
let units = "metric";
let city = "palma";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;

axios.get(apiUrl).then(displayWeather);
