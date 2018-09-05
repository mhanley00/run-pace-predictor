$(document).ready(function () {

  var lngLatArray = [];

  // ----------------------GOOGLE MAPS API-------------------------------------//

function locationInput(){
  $("#calculate-button").on("click",
    function geocode() {

      // Input of location from User
      var location = $("#current-location").val();
      // Turn location into City and State.
      axios.get("https://maps.googleapis.com/maps/api/geocode/json", {
        params: {
          address: location,
          key: "AIzaSyBZsXrosKvRGdreWJo2EPOxhvxor5LBaBQ"
        }
      })
        .then(function (response) {
          console.log("GoogleAPI:");
          console.log(response);

          var latResult = response.data.results[0].geometry.location.lat;
          console.log(latResult);
          // latResult = lngLatArray[0];


          var lngResult = response.data.results[0].geometry.location.lng;
          console.log(lngResult);
          // lngResult = lngLatArray[1];
          tempInput(latResult, lngResult);

        })
        .catch(function (error) {
          console.log(error);
        })

    })
  }


  //------------------------------Dark Sky API------------------------------------------



  // var long = -77.0369;
  // var lat = 38.9072;

  function tempInput(lat, long){
    
    console.log("long: " + long);
    console.log("lat: " + lat);
  // var long= lngLatArray[1];
  // var lat= lngLatArray[0];
  // console.log("long/lattitude:")
  // console.log(lngLatArray);
  // var long= lngResult;
  // var lat= latResult;
  var queryURL = "https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/91a177081e40dcac6289e7c200157364/" + lat + "," + long;

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {
    console.log("darkskyAPI:")
    console.log(response);
    var currentTemp = response.currently.temperature;
    var currentHum = response.currently.humidity;
    var currentWs = response.currently.windSpeed;
    // console.log(currentTemp);
    // console.log(currentHum);
    // console.log(currentWs);

    // Appending weather info onto DOM
    $("#today-temp").append("<div class= 'todayTemp'>" + currentTemp + "</div>");

    $("#today-hum").append("<div class= 'todayHum'>" + currentHum + "</div>");

    $("#today-ws").append("<div class= 'todayWs'>" + currentWs + "</div>");



  })
}

locationInput();
// tempInput();
  // Calling Functions


  //--------------------------------Calculate Button------------------------------------------


  // End of Document.ready
});