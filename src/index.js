function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${day} ${hours}:${minutes}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[date.getDay()];
}
  function displayForecast(response) {
    let forecastHtml = "";
  
    response.data.daily.forEach(function (day, index) {
      if (index < 5) {
        forecastHtml+=
          `
        <div class="weather-forecast-day">
          <div class="weather-forecast-date">${formatDay(day.time)}</div>
  
          <img src="${day.condition.icon_url}" class="weather-forecast-icon" />
          <div class="weather-forecast-temperatures">
            <div class="weather-forecast-temperature">
              <strong>${Math.round(day.temperature.maximum)}º</strong>
            </div>
            <div class="weather-forecast-temperature">${Math.round(
              day.temperature.minimum
            )}º</div>
          </div>
        </div>
      `;
      }
    });
  
    let forecastElement = document.querySelector("#forecast");
    forecastElement.innerHTML = forecastHtml;
  }
  function getForecast(city) {
    let apiKey = "b2a5adcct04b33178913oc335f405433";
    let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
    axios(apiUrl).then(displayForecast);
  }
  function refreshWeather(response) {
    let temperatureElement = document.querySelector("#temperature");
    let temperature = response.data.temperature.current;
    let cityElement = document.querySelector("#city");
    let descriptionElement = document.querySelector("#description");
    let humidityElement = document.querySelector("#humidity");
    let windSpeedElement = document.querySelector("#wind-speed");
    let timeElement = document.querySelector("#time");
    let date = new Date(response.data.time * 1000);
    let iconElement = document.querySelector("#icon");
    let backgroundImage = document.querySelector("#body");
  
    cityElement.innerHTML = response.data.city;
    timeElement.innerHTML = formatDate(date);
    descriptionElement.innerHTML = response.data.condition.description;
    humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
    windSpeedElement.innerHTML = `${response.data.wind.speed}km/h`;
    temperatureElement.innerHTML = Math.round(temperature);
    iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="weather-app-icon" />`;
    if(response.data.condition.description == "clear sky"){
      backgroundImage.style.backgroundImage =  "url('src/images/clear sky.jpg')";
    }
    else if(response.data.condition.description == "mist" || "smoke" || "	haze" || "fog" || "tornado"){
      backgroundImage.style.backgroundImage =  "url('src/images/mist.jpg')";
    }
    else if(response.data.condition.description == "rain" || "light rain" || "shower rain" || "	moderate rain" || "very heavy rain" || "extreme rain" || "freezing rain" ){
      backgroundImage.style.backgroundImage =  "url('src/images/rain.jpg')";
    }
    else if(response.data.condition.description == "thunderstorm" || "light thunderstorm" || "thunderstorm with light rain" || "thunderstorm with rain"){
      backgroundImage.style.backgroundImage =  "url('src/images/thunderstorm.jpg')";
    }
    else if(response.data.condition.description == "snow" || "light snow" || "heavy snow" || "light rain and snow" || "rain and snow" || "light shower snow"){
      backgroundImage.style.backgroundImage =  "url('src/images/snow.jpg')";
    }
    else if(response.data.condition.description == "scattered clouds" || "broken clouds" || "overcast clouds" || "few clouds"){
      backgroundImage.style.backgroundImage =  "url('src/images/clouds.jpg')";
    }
    getForecast(response.data.city);
  }
  function searchCity(city) {
    let apiKey = "b2a5adcct04b33178913oc335f405433";
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;
    axios.get(apiUrl).then(refreshWeather);
  }
  function handleSearchSubmit(event) {
    event.preventDefault();
    let searchInput = document.querySelector("#search-form-input");
  
    searchCity(searchInput.value);
  } 
  let searchFormElement = document.querySelector("#search-form");
  searchFormElement.addEventListener("submit", handleSearchSubmit);
  
  searchCity("Japan");
