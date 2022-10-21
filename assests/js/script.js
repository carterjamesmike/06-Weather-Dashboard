var geocodeUrl = 'http://api.openweathermap.org/geo/1.0/direct?q=London&limit=1&appid=0cd8570e03d2182052245fb88b455b9c';
var forcastURL = 'https://api.openweathermap.org/data/2.5/forecast?lat=30.267197359964705&lon=-97.7348848064757&appid=0cd8570e03d2182052245fb88b455b9c&units=imperial';


// fetch(geocodeUrl)
//   .then(function (response) {
//     return response.json();
//   })
//   .then(function (data) {
//     console.log(data);
//     console.log(data[0].lat);
//     console.log(data[0].lon);
//     // for (var i = 0; i < data.length; i++) {
//     //   console.log(data[i].lat);
//     //   console.log(data[i].lon);
//     // }
//   });



fetch(forcastURL)
  .then(function (response) {
    console.log("Hello?");
    return response.json();
  })
  .then(function (data) {
    console.log("Something");
    console.log(data)
    // console.log(data.list[0].main.temp);
    for (var i =0; i < 5; i++) {
        console.log("Something else " + i);
        console.log(data.list[i].main.temp);
        console.log(data.list[i].wind.speed);
        console.log(data.list[i].main.humidity);
    }
  });

