//Element variables and array
var submitBtn = document.getElementById('submit-button');
var inputSubmit = document.getElementById('city-form');
var inputCity = document.getElementById('city-name');
var searchHistory = document.querySelector('#search-history');
var searchArr = [];

//Takes user input and fetches lat and lon from geocoding api as well as call renderHistory fx and getWeatherData fx and displays user selected city on current weather card
function getGeocode () {
    var userInput = document.getElementById('city-search').value;
    renderHistory(userInput)
    var clearInput = document.getElementById('city-search');
    var geocodeUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${userInput}&limit=1&appid=0cd8570e03d2182052245fb88b455b9c`;
    inputCity.textContent = userInput;
    clearInput.value = '';
    fetch(geocodeUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            if (data.length === 0) {
                inputCity.textContent = searchArr[1];
                while (searchHistory.firstChild) {
                    searchHistory.removeChild(searchHistory.firstChild);
                  }
                searchArr.splice(0);
            } else { 
            var lat = data[0].lat;
            var lon = data[0].lon;
            getWeatherData(lat, lon);
            }
        });
}

//Fetches weather data from user selected city and displays it
function getWeatherData (lat, lon,) {
    var forcastURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=0cd8570e03d2182052245fb88b455b9c&units=imperial`;

    fetch(forcastURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            const displayDate = moment();
            for (var i =0; i < 6; i++) {
                var temp = data.list[i].main.temp;
                var wind = data.list[i].wind.speed;
                var humidity = data.list[i].main.humidity;
                var icon = data.list[i].weather[0].icon;

                var tempText = document.getElementById(`current-temp-${i}`);
                tempText.textContent = `Temp: ${temp}`;
                var windText = document.getElementById(`current-wind-${i}`);
                windText.textContent = `Wind: ${wind}`;
                var humidityText = document.getElementById(`current-humidity-${i}`);
                humidityText.textContent = `Humidity: ${humidity}`;
                var futureDate = document.getElementById(`date-${i}`);
                futureDate.textContent = displayDate.add(i/i, 'd').format('dddd MMM Do');

                document.getElementById(`img-${i}`).innerHTML = '<img src=https://openweathermap.org/img/wn/' + icon + '@2x.png' + ' width=50, height=50>'; 
                
            }
        });
}

//Creates 'buttons' from user input history
function renderHistory(userInput) {
    searchHistory.innerHTML = "";
    searchArr.unshift(userInput);

    for (var i = 0; i < searchArr.length; i++) {
        var recentSearch = searchArr[i];
        var li = document.createElement("li");
        var button = document.createElement("button");
        
        button.setAttribute("id", searchArr[i])
        li.setAttribute("data-index", i);
        button.textContent = recentSearch;
        li.appendChild(button);
        searchHistory.appendChild(li);
      }
}

//Pulls id from user input history buttons and calls seperate fx to fetch lat and lon from geocoding api
searchHistory.addEventListener("click", function(event) {
    var element = event.target;
  
    if (element.matches("button") === true) {
        var btnAttribute= element.getAttribute('id');
        getSearchGeocode(btnAttribute);
    }
});

//Fetches lat and lon through geocoding api specifically for the user input history buttons and calls getWeatherData fx
function getSearchGeocode (btnAttribute) {
    inputCity.textContent = btnAttribute;
    var geocodeUrlHistory = `http://api.openweathermap.org/geo/1.0/direct?q=${btnAttribute}&limit=1&appid=0cd8570e03d2182052245fb88b455b9c`;

    fetch(geocodeUrlHistory)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            var lat = data[0].lat;
            var lon = data[0].lon;

            getWeatherData(lat, lon);
        });
}


//Event listeners for form submit and submit button
submitBtn.addEventListener('click', getGeocode);
inputSubmit.addEventListener('submit', function (event) {
    event.preventDefault();
    getGeocode();
});


