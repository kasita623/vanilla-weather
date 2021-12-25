function displayWeather(response) {
  console.log(response.data);
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
}

let apiKey = "940cab7f2dffe0039b455473a663a1f7";
let units = "metric";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Malaga&appid=${apiKey}&units=${units}`;

axios.get(apiUrl).then(displayWeather);
