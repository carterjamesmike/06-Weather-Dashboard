var submitBtn = document.getElementById("submit-button");
var lat; 
var lon;
    var forcastURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=0cd8570e03d2182052245fb88b455b9c&units=imperial`;





function getAPI () {
let input = document.getElementById("city-search").value;
console.log(input);
var geocodeUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${input}&limit=1&appid=0cd8570e03d2182052245fb88b455b9c`;

fetch(geocodeUrl)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
       lat = data[0].lat;
       lon = data[0].lon;
    console.log(typeof "lat");
    console.log(`This is the lat ${lat} and lon ${lon}`);

    console.log(forcastURL);
  });

console.log(typeof "lat");

   fetch(forcastURL)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
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
    }
  });

}

submitBtn.addEventListener('click', getAPI)
