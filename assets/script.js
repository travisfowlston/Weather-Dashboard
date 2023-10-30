var dateTracker = document.getElementById("currentDay");
var currentHour = dayjs().hour();

/* References Day.js to keep the current date and time displayed. */
var updateDate = function() {
  var now = dayjs().format('MMMM DD, YYYY [at] h:mm:ss A')
  dateTracker.textContent = ("It is currently: " + now)
}

updateDate();
setInterval(updateDate, 1000);

/* Created a function that takes user input to search the weather by city name. */
var searchByCity = function() {
var APIKey = "de99e6b29e427c9fd645f9257f272d1e";
var submitButton = document.getElementById("submit-btn");

submitButton.addEventListener("click", function () {
  /* Prevents default action of submit button. */
  event.preventDefault();
 
  /* Uses the user input to generate the url path by inserting the city name. */
  var cityName = document.getElementById("userInput").value;
  var apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=imperial&appid=${APIKey}`;
  var forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=imperial&appid=${APIKey}`;
  
  /* Fetches and parses the response using json. */
  fetch(apiUrl)
    .then(function (response) {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Error: " + response.status);
      }
    })
    .then(function (data) {
      /* Retrieves the selected data. */
      var temperature = data.main.temp;
      var windSpeed = data.wind.speed;
      var humidity = data.main.humidity;

      /* Updates the HTML with the selected data. */
      document.getElementById("city-name").textContent = "City: " + data.name;
      document.getElementById("temp").textContent = "Temperature: " + temperature + "°F";
      document.getElementById("wind").textContent = "Wind: " + windSpeed + " mph";
      document.getElementById("humidity").textContent = "Humidity: " + humidity + "%";
  })
    .catch(function (error) {
      console.log("Error:", error);
    });
/* Retrieves the 5-day Forecast. */
fetch(forecastUrl)
  .then(function (response) {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error("Error: " + response.status);
    }
  })
  .then(function (data) {
    var forecastList = data.list;

    /* Created the container element where the cards will be appended */
    var forecastContainer = document.getElementById("forecast-container");

    /* Loops through the forecast list only counting every 8th element so it only displays every 24hrs. */
    for (var i = 0; i < forecastList.length; i += 8) {
      var forecastData = forecastList[i];

      /* Retrieves the date, temperature, wind speed, and humidity from the forecast data */
      var forecastDate = forecastData.dt_txt;
      var forecastTemp = forecastData.main.temp;
      var forecastWindSpeed = forecastData.wind.speed;
      var forecastHumidity = forecastData.main.humidity;

      /* Created a new card element */
      var card = document.createElement("div");
      card.classList.add("card");

      /* Created elements for the date, temperature, wind speed, and humidity */
      var dateEl = document.createElement("p");
      dateEl.textContent = "Date: " + forecastDate;

      var tempEl = document.createElement("p");
      tempEl.textContent = "Temperature: " + forecastTemp + "°F";

      var windEl = document.createElement("p");
      windEl.textContent = "Wind: " + forecastWindSpeed + " mph";

      var humidityEl = document.createElement("p");
      humidityEl.textContent = "Humidity: " + forecastHumidity + "%";

      /* Appends the elements to the card */
      card.appendChild(dateEl);
      card.appendChild(tempEl);
      card.appendChild(windEl);
      card.appendChild(humidityEl);

      /* Appends the card to the container. */
      forecastContainer.appendChild(card);
    }
  })
  .catch(function (error) {
    console.log("Error:", error);
  });
})
}

searchByCity()