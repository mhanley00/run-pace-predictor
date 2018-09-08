var pWindmphG;
var pAvgePaceSecsG;
var pTempG;
var pDewG;
var pAvgePaceSecsG; //pAvgePaceSecsG = cpPace; holds the global var for calculations in seconds
var pWindSecOffsetG;
var pHeatSecOffsetG = [];
var basePaceG; //based on pAvePace but later we subtract wind and heat offsets
var cWindmphG; //FROM API CALL
var cWindSecOffsetG;

var cTempG; //FROM API CALL
var cDewG;//FROM API CALL

$("#calculate-button").on("click",

    //_________________________________________________________________
    //GOOGLE MAPS API
    //---------———————————————————————————————————————————–––––––––––––
    function geocode() {
        // Input of location from User
        // If then Statement.  If Input of Current Location is empty, then run the following, if not Alert the user. Reset the Field first before proceeding.
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
//_________________________________________________________________
//DARK SKY API
//---------———————————————————————————————————————————–––––––––––––  


// var long = -77.0369;
// var lat = 38.9072;

function tempInput(lat, long) {

    console.log("long: " + long);
    console.log("lat: " + lat);
    // var long= lngLatArray[1];
    // var lat= lngLatArray[0];
    console.log("long/lattitude:")
    // console.log(lngLatArray);
    // var long= lngResult;
    // var lat= latResult;
    var queryURL = "https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/91a177081e40dcac6289e7c200157364/" + lat + "," + long;

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response1) {
        console.log("darkskyAPI:")
        console.log(response1);
        setTimeout(function(){
            console.log('hello what is goin on?');
           // runCalculations();// call function here
        }, 7000);
        var currentTemp = response1.currently.temperature;
        var currentDew = response1.currently.dewPoint;
        var currentWs = response1.currently.windSpeed;
        // console.log(currentTemp);
        // console.log(currentDew);
        // console.log(currentWs);

        // Appending weather info onto DOM
        $("#today-temp").empty().append("<div class= 'todayTemp'>" + currentTemp + "</div>");

        $("#today-hum").empty().append("<div class= 'todayHum'>" + currentDew + "</div>");

        $("#today-ws").empty().append("<div class= 'todayWs'>" + currentWs + "</div>");

        cWindmphG = currentWs; // see cWindOffset(windMPH2, pPace2)
        cTempG = currentTemp;
        cDewG = currentDew;



    })
}


    function runCalculations() { //start of massive call. Have snacks on hand.
        //_________________________________________________________________
        //GLOBAL VARIABLES - EXPLANATION BELOW or RIGHT of VAR DECLARATION
        //---------———————————————————————————————————————————–––––––––––––
        // PREVIOUS RUN TIME, DISTANCE, WEATHER
        var pHoursG = $("#p-run-hours").val(); //past run hours from user input
        var pMinutesG = $("#p-run-mins").val(); //past run minutes from user input
        var pSecondsG = $("#p-run-secs").val(); //past run secons from user input
        // var pRunTimeG = (pHoursG * 60 * 60) + (pMinutesG * 60) + (pSecondsG); // past run time from user input
        var pRunDistG = $("#p-run-dist").val(); // previous/past run distance from user input
        var pAvgPaceG; //pAvgPaceG is initally in seconds, then renders to MM:SS
        //pAvgePaceSecsG; //pAvgePaceSecsG = cpPace; holds the global var for calculations in seconds

        pWindmphG = $("#p-wind-mph").val(); //these will be the values from the form input

        pTempG = $("#p-temp").val();
        pDewG = $("#p-dew").val();


        //_________________________________________________________________
        //BASIC PACE CALCULATOR
        //---------———————————————————————————————————————————–––––––––––––

        function paceCalc(distance, hours, minutes, seconds) {
            var distance = parseFloat(distance); //this will come from global variable from form, not (distance)
            var hours = parseFloat(hours); //this will come from global variable from form, not (distance)
            var minutes = parseFloat(minutes);//this will come from global variable from form, not (distance)
            var seconds = parseFloat(seconds);//this will come from global variable from form, not (distance)
            var totalTime = 0;
            totalTime += hours * 3600;
            totalTime += minutes * 60;
            totalTime += seconds;
            var cpPace = Math.floor(totalTime / distance);
            pAvgePaceSecsG = cpPace; //this is updating the global var for calculations in seconds
            var paceMins = Math.floor(cpPace / 60);
            var paceSecs = cpPace - (paceMins * 60);
            if (paceSecs < 10) {
                paceSecs = '0' + paceSecs;
            }
            pAvgPaceG = paceMins + ":" + paceSecs;
            $("#race-pace").empty().append(pAvgPaceG);
            // return pAvgPaceG in seconds don't need to return, this adjusts the global varaible average pace
        }

        //_________________________________________________________________
        //WIND MPH TIME OFFSET - IN SECONDS PER MILE - PAST
        //---------———————————————————————————————————————————–––––––––––––
        function pWindOffset(windMPH, pPace) { //renamed from calculator.js "windOffset()"
            //winOffset will return the wind's impact on runner's time seconds per mile.
            //This does not get written to the DOM. Next we'll add this to the heat/temp offset.
            //45 / 3,600 = 0.0125 hours.
            var paceMPH = 1 / (pPace / 3600); //dividing seconds per mile by 1 hour (3600")
            console.log("paceMPH: ME" + paceMPH);
            var windDivPace = windMPH 
            windDivPace/ paceMPH; //step-by-step so Math.pow doesn't freak out
            pWindSecOffsetG = (12 * (Math.pow(windDivPace, 2)));
            console.log(pWindSecOffsetG);
        }
        //_________________________________________________________________
        //HEAT TIME OFFSET - IN SECONDS PER MILE
        //---------———————————————————————————————————————————–––––––––––––
        // 100 or less:   no pace adjustment
        // 101 to 110:   0% to 0.5% pace adjustment
        // 111 to 120:   0.5% to 1.0% pace adjustment
        // 121 to 130:   1.0% to 2.0% pace adjustment
        // 131 to 140:   2.0% to 3.0% pace adjustment
        // 141 to 150:   3.0% to 4.5% pace adjustment
        // 151 to 160:   4.5% to 6.0% pace adjustment
        // 161 to 170:   6.0% to 8.0% pace adjustment
        // 171 to 180:   8.0% to 10.0% pace adjustment
        // Above 180:   hard running not recommended
        //This works in repl but not in here: https://repl.it/@mhanley00/Heat-Offset-Sec-Per-Mile
        function heatEffect(temperature, dewPoint, basePace) {
            // var temperature;
            // var dewPoint;
            // var basePace;
            var lowHeatEst;
            var highHeatEst;
            var heatScore = parseFloat(temperature) + parseFloat(dewPoint);
            console.log("heatScore: " + heatScore);
            console.log("temperature: " + temperature);
            console.log("dewPoint: " + dewPoint);
            if (heatScore <= 100) {
                lowHeatEst = 0;
                highHeatEst = 0;
                console.log("lowHeatEst: " + lowHeatEst);
            }
            else if (heatScore >= 101 && heatScore <= 110) {
                lowHeatEst = 0;
                highHeatEst = basePace * .005;
                console.log("lowHeatEst: " + lowHeatEst);
            }
            else if (heatScore >= 111 && heatScore <= 120) {
                lowHeatEst = basePace * .005;
                highHeatEst = basePace * .01;
                console.log("lowHeatEst: " + lowHeatEst);
            }
            else if (heatScore >= 121 && heatScore <= 130) {
                lowHeatEst = basePace * .01;
                highHeatEst = basePace * .02;
                console.log("lowHeatEst: " + lowHeatEst);
            }
            else if (heatScore >= 131 && heatScore <= 140) {
                lowHeatEst = basePace * .02;
                highHeatEst = basePace * .03;
                console.log("lowHeatEst: " + lowHeatEst);
            }
            else if (heatScore >= 141 && heatScore <= 150) {
                lowHeatEst = basePace * .03;
                highHeatEst = basePace * .045;
                console.log("lowHeatEst: " + lowHeatEst);
            }
            else if (heatScore >= 151 && heatScore <= 160) {
                lowHeatEst = basePace * .045;
                highHeatEst = basePace * .06;
                console.log("lowHeatEst: " + lowHeatEst);
            }
            else if (heatScore >= 161 && heatScore <= 170) {
                lowHeatEst = basePace * .06;
                highHeatEst = basePace * .08;
                console.log("lowHeatEst: " + lowHeatEst);
            }
            else if (heatScore >= 171 && heatScore <= 180) {
                lowHeatEst = basePace * .08;
                highHeatEst = basePace * .1;
                console.log("lowHeatEst: " + lowHeatEst);
            }
            else {
                return "Head to the pool!"; //write to DOM
            }
            console.log("lowHeatEst: " + lowHeatEst);
            console.log("highHeatEst: " + highHeatEst);
            pHeatSecOffsetG.push(lowHeatEst, highHeatEst);
            console.log('pHeatSecOffsetG: ' + pHeatSecOffsetG);

        }
        //_________________________________________________________________
        //GET BASE PACE
        //---------———————————————————————————————————————————–––––––––––––
        function getBasePace(pace, windOffset, heatOffset) {
            var totalOffset = parseFloat(windOffset) + parseFloat(heatOffset);
            basePaceG = parseFloat(pace) - parseFloat(totalOffset);

        }

        function cWindOffset(windMPH2, pPace2) { 
            //cWindmphG = currentWs; // see Dark Sky API call
        // cTempG = currentTemp;
        // cDewG = currentDew;
            //winOffset will return the wind's impact on runner's time seconds per mile.
            //This does not get written to the DOM. Next we'll add this to the heat/temp offset.
            //45 / 3,600 = 0.0125 hours.
            var paceMPH2 = 1 / (pPace2 / 3600); //dividing seconds per mile by 1 hour (3600")
            console.log("windMPH2L " + windMPH2);
            console.log("paceMPH2: " + paceMPH2);
            var windDivPace = parseFloat(windMPH2) / parseFloat(paceMPH2); //step-by-step so Math.pow doesn't freak out
            console.log("windDivPace: " + windDivPace);
            cWindSecOffsetG = (12 * (Math.pow(windDivPace, 2)));
        }

        //_________________________________________________________________
        //GRAND FINALE - CALL CALCULATION FUNCTIONS
        //---------———————————————————————————————————————————–––––––––––––
        paceCalc(pRunDistG, pHoursG, pMinutesG, pSecondsG);
        pWindOffset(pWindmphG, pAvgePaceSecsG);
        heatEffect(pTempG, pDewG, pAvgePaceSecsG);
        console.log(pWindSecOffsetG);
        console.log(pHeatSecOffsetG);
        getBasePace(pAvgePaceSecsG, pWindSecOffsetG, pHeatSecOffsetG);
        console.log(basePaceG); //note: basePaceG is in seconds for base calculations
        cWindOffset(cWindmphG, basePaceG);
        console.log("cWindSecOffsetG: " +cWindSecOffsetG);



    }// end of function runCalculations ()


