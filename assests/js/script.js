var submitBtn = document.getElementById('submit-button');
var inputSubmit = document.getElementById('city-search');
var inputCity = document.getElementById('city-name');
var searchHistory = document.querySelector('#search-history');
var searchArr = [];


function getGeocode () {
    var userInput = document.getElementById('city-search').value;
    renderHistory(userInput)
    var clearInput = document.getElementById('city-search');
    // console.log(userInput);
    var geocodeUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${userInput}&limit=1&appid=0cd8570e03d2182052245fb88b455b9c`;
    inputCity.textContent = userInput;
    clearInput.value = '';
    fetch(geocodeUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            var lat = data[0].lat;
            var lon = data[0].lon;
            // console.log(`This is the lat ${lat} and lon ${lon}`);
            getWeatherData(lat, lon);
        });
}

function getWeatherData (lat, lon) {
    // console.log(`getWeatherData fx lat: ${lat} and lon: ${lon}`);
    var forcastURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=0cd8570e03d2182052245fb88b455b9c&units=imperial`;
    // console.log(forcastURL);

    fetch(forcastURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            // console.log(data.list[0].main.temp);
            const displayDate = moment();
            for (var i =0; i < 6; i++) {
                // console.log(data);
                // console.log(`Day ${i+1}`);
                var temp = data.list[i].main.temp;
                var wind = data.list[i].wind.speed;
                var humidity = data.list[i].main.humidity;
                var icon = data.list[i].weather[0].icon;
                // console.log(`This is day ${i+1} temp: ${temp} and the wind: ${wind} and the humidity: ${humidity}`);
                // console.log(data.list[i].main.temp);
                // console.log(data.list[i].wind.speed);
                // console.log(data.list[i].main.humidity);
                // console.log(icon);
                // console.log(icon.toString());
                var tempText = document.getElementById(`current-temp-${i}`);
                // tempText.textContent = `Temp: ${temp}`;
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

function renderHistory(userInput) {
    searchHistory.innerHTML = "";
    // console.log("Hello?");
    // console.log(userInput);
    searchArr.unshift(userInput);

    for (var i = 0; i < searchArr.length; i++) {
        var recentSearch = searchArr[i];
        var li = document.createElement("li");
        var button = document.createElement("button");

   
        li.setAttribute("data-index", i);
       
        button.textContent = recentSearch;
        li.appendChild(button);
        searchHistory.appendChild(li);
        console.log(searchArr);
      }

    }



function test () {
    console.log("Success!"); 
}
    
submitBtn.addEventListener('click', getGeocode);
// inputSubmit.addEventListener('submit', test);
// submitBtn.addEventListener('click', test)


//Needs
                //Display weather data on page
                //Search history
    //Search history funcitonality
    //Add eventListener to submit function
                //Link momemnt for date functionality
    //Minor styling
                //Icons for weather


//Wants
    //Capitlize inputCity
    //Major styling

