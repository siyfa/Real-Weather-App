//===============GLOBAL VARIABLES===============
const api = {
  key: "9889a9c1cb791596e68b60c666b9ba2d",
  baseurl: "https://api.openweathermap.org/data/2.5/forecast",
};
// SELECT ELEMENTS
const tempElement = document.querySelector(".temperature-value p");
const descElement = document.querySelector(".temperature-description p");
const locationElement = document.querySelector(".location p");
const timeElement = document.querySelector(".location date");
const locationIcon = document.querySelector(".weather-icon");
const notificationElement = document.querySelector(".notification");
const pressureElement = document.querySelector(".pressure");
const windSpeedElement = document.querySelector(".windSpeed");
const humidityElement = document.querySelector(".humidity");
const minTempElement = document.querySelector(".minTemp");
const maxTempElement = document.querySelector(".maxTemp");
const forecastWeather = document.querySelector(".forecast-weather p");
const forecastOne = document.querySelector(".forecast-1");
const forecastTwo = document.querySelector(".forecast-2");
const forecastThree = document.querySelector(".forecast-3");
const forecastFour = document.querySelector(".forecast-4");
const inputValue = document.querySelector(".inputValue");
const submitBtn = document.querySelector(".submitBtn");
const locationBtn = document.querySelector(".locationBtn");
const convert = document.querySelector(".convert");
const apiKey = "9889a9c1cb791596e68b60c666b9ba2d";

// App data
const weather = {};
const weatherOne = {};
const weatherTwo = {};
const weatherThree = {};
const weatherFour = {};
weather.temperature = {
  unit: "celsius",
};
weatherOne.temperature = {
  unit: "celsius",
};
weatherTwo.temperature = {
  unit: "celsius",
};
weatherThree.temperature = {
  unit: "celsius",
};
weatherFour.temperature = {
  unit: "celsius",
};

const cityData = {};
// APP CONSTS AND VARS
const KELVIN = 273;

//==================DATE BUILDER=================
const dateBuilder = (d) => {
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
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[d.getUTCDay()];
  let date = d.getUTCDate();
  let month = months[d.getUTCMonth()];
  let year = d.getUTCFullYear();

  return `${day} ${date} ${month} ${year}`;
};

(function displayDate() {
  const now = new Date();
  timeElement.innerHTML = dateBuilder(now);
})();

/// Fetching data with async
async function getWeather({ query, lat, lon }) {
  try {
    let response;
    if (query) {
      response = await fetch(`${api.baseurl}?q=${query}&appid=${api.key}`);
    } else {
      response = await fetch(
        `${api.baseurl}?lat=${lat}&lon=${lon}&appid=${api.key}`
      );
    }
    const data = await response.json();

    weather.city = data.city.name;
    weather.country = data.city.country;
    localStorage.setItem(
      "storedCity",
      JSON.stringify(weather.city, weather.country)
    );
    locationElement.innerHTML = `${weather.city}, ${weather.country}`;
    // get the weather data and recreate an array
    // having day and time(hour in my case) in the new array
    const allData = [];
    const time = new Date().getHours();
    data.list.forEach(function (single) {
      var textHour = single.dt_txt.substring(11, 13);
      //2)We got hold of hour from weatherData
      //example "dt_txt": "2020-07-28 21:00:00" ( var textHour= '21')
      var numberHour = parseInt(textHour, 10);
      //2) We converted string '21' to int 21 !
      var difference = Math.abs(time - numberHour);
      //3) In order to get latest time we finded out the difference
      // i.e. The data from API comes strictly from 00:00 then 3 ,6 , ..,21,24 aka 00:00
      // In order to get latest time we finded out the difference
      //example if it was 22:00 the 22(time)-21(numberHour)=1(difference)
      if (
        difference === 1 ||
        difference === 0 ||
        (time === 23 && numberHour === 21) ||
        (time === 24 && numberHour === 0) ||
        (time === 2 && numberHour === 00)
      ) {
        allData.push(single);
        //We pushed the satisfied timings in our daysArray
        weather.temperature.value = Math.floor(allData["0"].main.temp - KELVIN);
        weather.description = allData["0"].weather[0].description;
        weather.iconId = allData["0"].weather[0].icon;
        weather.country = allData["0"].sys.country;
        weather.speed = allData["0"].wind.speed;
        weather.pressure = allData["0"].main.pressure;
        weather.humidity = allData["0"].main.humidity;
        weather.temp_max = allData["0"].main.temp_max;
        weather.temp_min = allData["0"].main.temp_min;
        weather.time = allData["0"].dt_txt.substring(0, 10);
        localStorage.setItem(
          "storedWeatherOneTemp",
          JSON.stringify(weather.temperature.value)
        );
        localStorage.setItem(
          "storedWeatherOneDesc",
          JSON.stringify(weather.description)
        );
        localStorage.setItem(
          "storedWeatherOneIcon",
          JSON.stringify(weather.iconId)
        );
        localStorage.setItem(
          "storedWeatherOnecountry",
          JSON.stringify(weather.country)
        );
        localStorage.setItem(
          "storedWeatherOneSpeed",
          JSON.stringify(weather.speed)
        );
        localStorage.setItem(
          "storedWeatherOnePre",
          JSON.stringify(weather.pressure)
        );
        localStorage.setItem(
          "storedWeatherOneHum",
          JSON.stringify(weather.humidity)
        );
        localStorage.setItem(
          "storedWeatherOneMax",
          JSON.stringify(weather.temp_max)
        );
        localStorage.setItem(
          "storedWeatherOneMin",
          JSON.stringify(weather.temp_min)
        );
      }
    });
    /// Weather One
    weatherOne.temperature.value = Math.floor(allData["1"].main.temp - KELVIN);
    weatherOne.description = allData["1"].weather[0].description;
    weatherOne.iconId = allData["1"].weather[0].icon;
    weatherOne.time = allData["1"].dt_txt.substring(0, 10);
    /// Weather Two
    weatherTwo.temperature.value = Math.floor(allData["2"].main.temp - KELVIN);
    weatherTwo.description = allData["2"].weather[0].description;
    weatherTwo.iconId = allData["2"].weather[0].icon;
    weatherTwo.time = allData["2"].dt_txt.substring(0, 10);
    /// Weather Three
    weatherThree.temperature.value = Math.floor(
      allData["2"].main.temp - KELVIN
    );
    weatherThree.description = allData["3"].weather[0].description;
    weatherThree.iconId = allData["3"].weather[0].icon;
    weatherThree.time = allData["3"].dt_txt.substring(0, 10);
    /// Weather Four
    weatherFour.temperature.value = Math.floor(allData["4"].main.temp - KELVIN);
    weatherFour.description = allData["4"].weather[0].description;
    weatherFour.iconId = allData["4"].weather[0].icon;
    weatherFour.time = allData["4"].dt_txt.substring(0, 10);
    displayWeather();
  } catch (error) {
    console.error(error);
  }
}

// DISPLAY WEATHER TO UI
function displayWeather() {
  tempElement.innerHTML = `${weather.temperature.value}°<span>C</span>`;
  descElement.innerHTML = weather.description;
  locationIcon.innerHTML = `<img src="./icons/${weather.iconId}.png" alt="icon">`;
  pressureElement.innerHTML = `<i class="fab fa-superpowers" style="font-size: 24px"></i>${weather.pressure}  <span> hpa </span>`;
  windSpeedElement.innerHTML = `<i class="fas fa-wind" style="font-size: 24px"></i>${weather.speed}  <span> m/s </span>`;
  humidityElement.innerHTML = `<i class="fas fa-water" style="font-size: 24px"></i>${weather.humidity}  <span> % </span>`;
  minTempElement.innerHTML = `<i class="fas fa-temperature-low" style="font-size: 24px"></i>${weather.temp_min}  <span> low </span>`;
  maxTempElement.innerHTML = `<i class="fas fa-temperature-high" style="font-size: 24px"></i>${weather.temp_max}  <span> high</span>`;
  // timeElement.innerHTML = `${weather.time}`;
  // forcast one
  forecastOne.innerHTML = `
  <date>${weatherOne.time} </date>
  <div class="forecastBody">
    <div class="forecast-info">
      <img src="./icons/${weatherOne.iconId}.png" alt="icon"/>
    </div>
    <div class="weather-header-aside">
      <div class="temperature-value">
        <p>${weatherOne.temperature.value}°<span>C</span> </p>
      </div>
      <div class="temperature-description">
        <p>${weatherOne.description}</p>
      </div>
    </div>
  </div>
  `;
  ////forecast Two
  forecastTwo.innerHTML = `
  <date>${weatherTwo.time} </date>
  <div class="forecastBody">
    <div class="forecast-info">
      <img src="./icons/${weatherTwo.iconId}.png" alt="icon"/>
    </div>
    <div class="weather-header-aside">
      <div class="temperature-value">
        <p>${weatherTwo.temperature.value}°<span>C</span> </p>
      </div>
      <div class="temperature-description">
       <p>${weatherTwo.description}</p>
      </div>
    </div>
  </div>
  `;
  // Weather Three
  forecastThree.innerHTML = `
  <date>${weatherThree.time} </date>
  <div class="forecastBody">
    <div class="forecast-info">
      <img src="./icons/${weatherThree.iconId}.png" alt="icon"/>
    </div>
    <div class="weather-header-aside">
      <div class="temperature-value">
        <p>${weatherThree.temperature.value}°<span>C</span> </p>
      </div>
      <div class="temperature-description">
        <p>${weatherThree.description}</p>
      </div>
    </div>
  </div>
  `;
  //Weather Four
  forecastFour.innerHTML = `
  <date>${weatherFour.time} </date>
  <div class="forecastBody">
    <div class="forecast-info">
      <img src="./icons/${weatherFour.iconId}.png" alt="icon"/>
    </div>
    <div class="weather-header-aside">
      <div class="temperature-value">
        <p>${weatherFour.temperature.value}°<span>C</span> </p>
      </div>
      <div class="temperature-description">
        <p>${weatherFour.description}</p>
      </div>
    </div>
  </div>
  `;
}
// C to F conversion
function celsiusToFahrenheit(temperature) {
  return (temperature * 9) / 5 + 32;
}
// WHEN THE USER CLICKS ON THE TEMPERATURE ELEMENET
convert.addEventListener("click", function () {
  if (weather.temperature.value === undefined) return;

  if (weather.temperature.unit == "celsius") {
    let fahrenheit = celsiusToFahrenheit(weather.temperature.value);
    fahrenheit = Math.floor(fahrenheit);
    convert.innerHTML = "° Convert to Celsius";

    tempElement.innerHTML = `${fahrenheit}°<span>F</span>`;
    weather.temperature.unit = "fahrenheit";
  } else {
    tempElement.innerHTML = `${weather.temperature.value}°<span>C</span>`;
    weather.temperature.unit = "celsius";
    convert.innerHTML = "° Convert to Fahrenheit";
  }
});
//===================LOCAL STORAGE=================
function displayResultsFromLocal() {
  if (localStorage.getItem("storedCity") !== null) {
    let weatherData = JSON.parse(localStorage.getItem("storedCity"));
    locationElement.innerHTML = weatherData;
  }
  if (localStorage.getItem("storedWeatherOneTem") !== null) {
    let weatherOneTemp = JSON.parse(
      localStorage.getItem("storedWeatherOneTem")
    );
    tempElement.innerHTML = weatherOneTemp;
  }
  if (localStorage.getItem("storedWeatherOneDesc") !== null) {
    let weatherOneDesc = JSON.parse(
      localStorage.getItem("storedWeatherOneDesc")
    );
    descElement.innerHTML = weatherOneDesc;
  }
  if (localStorage.getItem("storedWeatherOneIcon") !== null) {
    let weatherOneIcon = JSON.parse(
      localStorage.getItem("storedWeatherOneIcon")
    );
    locationIcon.innerHTML = weatherOneIcon;
  }
  if (localStorage.getItem("storedWeatherOnePre") !== null) {
    let weatherOnePre = JSON.parse(localStorage.getItem("storedWeatherOnePre"));
    pressureElement.innerHTML = weatherOnePre;
  }
  if (localStorage.getItem("storedWeatherOneHum") !== null) {
    let weatherOneHum = JSON.parse(localStorage.getItem("storedWeatherOneHum"));
    humidityElement.innerHTML = weatherOneHum;
  }
  if (localStorage.getItem("storedWeatherOneMax") !== null) {
    let weatherOneMax = JSON.parse(localStorage.getItem("storedWeatherOneMax"));
    maxTempElement.innerHTML = weatherOneMax;
  }
  if (localStorage.getItem("storedWeatherOneMin") !== null) {
    let weatherOneMin = JSON.parse(localStorage.getItem("storedWeatherOneMin"));
    minTempElement.innerHTML = weatherOneMin;
  }
  if (localStorage.getItem("storedWeatherOneSpeed") !== null) {
    let weatherOneSpeed = JSON.parse(
      localStorage.getItem("storedWeatherOneSpeed")
    );
    windSpeedElement.innerHTML = weatherOneSpeed;
  }
}

//==================GET LOCATION=================
locationBtn.addEventListener("click", function (e) {
  (function getLocation() {
    try {
      let lon;
      let lat;

      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          lat = position.coords.latitude;
          lon = position.coords.longitude;

          getWeather({ lat: lat, lon: lon });
        });
      }
      displayResultsFromLocal();
    } catch (error) {
      console.error(error);
    }
  })();
});

//===================SEARCH QUERY==================
const setQueryAfterKeypress = (e) => {
  if (e.keyCode == 13) {
    query = inputValue.value;
    getWeather({ query: query });
  }
};

const setQueryAfterClick = (e) => {
  query = inputValue.value;
  getWeather({ query: query });
};

inputValue.addEventListener("keypress", setQueryAfterKeypress);
submitBtn.addEventListener("click", setQueryAfterClick);

//// Service Worker ///////////////
if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("/sw.js")
    .then((reg) => reg)
    .catch((err) => console.log("serviceWorker not register", err));
}
