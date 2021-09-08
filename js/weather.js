//date time
let todayDate = document.querySelector("#today-date");
let currentDate = new Date();
let days = [
  "Monday", 
  "Tuesday", 
  "Wednesday", 
  "Thursday", 
  "Friday", 
  "Saturday",
  "Sunday"
];
let currentDay = days[currentDate.getDay()];
let currentHour = currentDate.getHours();
let currentMin = currentDate.getMinutes();

if (currentMin > 10) {
todayDate.innerHTML = `${currentDay} ${currentHour}:${currentMin}`;
} else {
  todayDate.innerHTML = `${currentDay} ${currentHour}:0${currentMin}`;

}

//show result
function showCurrentWeatherCondition(result) {
let city = document.querySelector("#form-input-city").value;
let h2 = document.querySelector("#city-name-result");
h2.innerHTML = `${city}`;

//show temperature
let cityTemp = document.querySelector("#city-temp");
cityTemp.innerHTML = `${Math.round(result.data.main.temp)}°C`;
//show max-temp
let cityTempMax = document.querySelector("#max-temp");
cityTempMax.innerHTML = `${Math.round(result.data.main.temp_max)}°C`;
//show min-temp
let cityTempMin = document.querySelector("#min-temp");
cityTempMin.innerHTML = `${Math.round(result.data.main.temp_min)}°C`;
//show sky description
let weatherDescript = document.querySelector("#description");
weatherDescript.innerHTML = `${result.data.weather[0].description}`;
//show feels like
let feelLikeTemp = document.querySelector("#feels-like");
feelLikeTemp.innerHTML = `${Math.round(result.data.main.feels_like)}°C`;
//show humidity
let humidity1 = document.querySelector("#humidity");
humidity1.innerHTML = `${result.data.main.humidity}%`;
}


// search city
function showAnsweredCity(response) {
response.preventDefault ();
let city = document.querySelector("#form-input-city").value;
let apiKey = "26cc4e1e98bc3a9df038576aea64ceb0";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
axios.get(apiUrl).then(showCurrentWeatherCondition);
}

//type in search-bar, and "submit"
let searchForm = document.querySelector("form");
searchForm.addEventListener("submit", showAnsweredCity);

// Current geo location

function showPosition(position) {
let apiKey = "26cc4e1e98bc3a9df038576aea64ceb0";
let apiUrl =`https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
axios.get(apiUrl).then(showCurrentWeatherCondition);
}

function getCurrentPosition(event) {
event.preventDefault();
console.log(event);
navigator.geolocation.getCurrentPosition(showPosition);
}

//click current location button
let locationButton = document.querySelector("#current-location-button");
locationButton.addEventListener("click", getCurrentPosition);

//°C/°F

function convertFahrenheit (event) {
  event.preventDefault();
  let currentMaxFahrenheit = document.querySelector("#max-temp");
  let currentMinFahrenheit = document.querySelector("#min-temp");
  let maxFahrenheit = Math.round(25*1.8+32);
  let minFahrenheit = Math.round(10*1.8+32);
  currentMaxFahrenheit.innerHTML = `${maxFahrenheit}°F`;
  currentMinFahrenheit.innerHTML = `${minFahrenheit}°F`;
}

function convertCelcius (event) {
  event.preventDefault();
  let currentMaxCelcius = document.querySelector("#max-temp");
  let currentMinCelcius = document.querySelector("#min-temp");
  currentMaxCelcius.innerHTML = "25°C";
  currentMinCelcius.innerHTML = "10°C";
}

let fahrenheit = document.querySelector("#fahrenheit-button");
fahrenheit.addEventListener("click",convertFahrenheit);

let celcius = document.querySelector("#celcius-button");
celcius.addEventListener("click",convertCelcius);
