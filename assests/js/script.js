var submitBtn = document.getElementById('submit-button');
var inputCity = document.getElementById('city-name');


function getGeocode () {
    var userInput = document.getElementById("city-search").value;
    console.log(userInput);
    var geocodeUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${userInput}&limit=1&appid=0cd8570e03d2182052245fb88b455b9c`;
    inputCity.textContent = userInput;
    
    fetch(geocodeUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            var lat = data[0].lat;
            var lon = data[0].lon;
            console.log(`This is the lat ${lat} and lon ${lon}`);
            getWeatherData(lat, lon);
        });
}

function getWeatherData (lat, lon) {
    console.log(`getWeatherData fx lat: ${lat} and lon: ${lon}`);
    var forcastURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=0cd8570e03d2182052245fb88b455b9c&units=imperial`;
    console.log(forcastURL);

    fetch(forcastURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data, lat, lon) {
            // console.log(data.list[0].main.temp);
            for (var i =0; i < 6; i++) {
                console.log(`Day ${i+1}`);
                var temp = data.list[i].main.temp;
                var wind = data.list[i].wind.speed;
                var humidity = data.list[i].main.humidity;
                console.log(`This is day ${i+1} temp: ${temp} and the wind: ${wind} and the humidity: ${humidity}`);
                console.log(data.list[i].main.temp);
                console.log(data.list[i].wind.speed);
                console.log(data.list[i].main.humidity);
                var tempText = document.getElementById(`current-temp-${i}`);
                tempText.textContent = `Temp: ${temp}`;
                var windText = document.getElementById(`current-wind-${i}`);
                windText.textContent = `Temp: ${wind}`;
                var humidityText = document.getElementById(`current-humidity-${i}`);
                humidityText.textContent = `Temp: ${humidity}`;
            }
        });

}


submitBtn.addEventListener('click', getGeocode)
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

