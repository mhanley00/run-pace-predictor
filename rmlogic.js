$( document ).ready(function() {


//------------------------------Dark Sky API------------------------------------------


  // var queryURL = "https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/91a177081e40dcac6289e7c200157364/37.8267,-122.4233";
  var long= 84.3240;
  var lat= 27.7172;
  var queryURL = "https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/91a177081e40dcac6289e7c200157364/"+lat+","+long;

    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      console.log("darkskyAPI:")
      console.log(response);
      var currentTemp= response.currently.temperature;
      var currentHum=response.currently.humidity;
      var currentWs=response.currently.windSpeed;
      // console.log(currentTemp);
      // console.log(currentHum);
      // console.log(currentWs);

      // Appending weather info onto DOM
      $("#today-temp").append("<div class= 'todayTemp'>"+currentTemp+"</div>");

      $("#today-hum").append("<div class= 'todayHum'>"+currentHum+"</div>");

      $("#today-ws").append("<div class= 'todayWs'>"+currentWs+"</div>");


      
    });$("#calculate-button").on("click", 
    function geocode(){
      var location= "Arlington, VA" 
      // Turn location into City and State.
      axios.get("https://maps.googleapis.com/maps/api/geocode/json", {
        params:{
          address: location,
          key: "AIzaSyBZsXrosKvRGdreWJo2EPOxhvxor5LBaBQ"
        }
      })
      .then(function(response){
        console.log("GoogleAPI:");
        console.log(response);
    
      var latResult= response.data.results[0].geometry.location.lat;
      console.log(latResult);
    
      var lngResult=response.data.results[0].geometry.location.lng;
      console.log(lngResult);
    
    
      })
      .catch(function(error){
        console.log(error);
      })
    
    });

// ----------------------GOOGLE MAPS API-------------------------------------//
// geocode();


//--------------------------------Calculate Button------------------------------------------


    // End of Document.ready
  });