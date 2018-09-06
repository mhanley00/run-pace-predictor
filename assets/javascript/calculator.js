//   $(".calculate").on("click", function() {
// 	var miles = parseFloat(distanceInput.value),
// 		hours = parseFloat(hoursInput.value),
// 		minutes = parseFloat(minutesInput.value),
// 		seconds = parseFloat(secondsInput.value);
//_________________________________________________________________
//GLOBAL VARIABLES - EXPLANATION BELOW or RIGHT of VAR DECLARATION
//---------———————————————————————————————————————————–––––––––––––
// PREVIOUS RUN TIME, DISTANCE, WEATHER
var pHoursG;
var pMinutesG;
var pSecondsG;
var pRunDistG;
var pWindmphG;
var pTempG;
var pDewG;


//past run secons from user input
var pRunTimeG = (pHoursG * 60 * 60) + (pMinutesG * 60) + (pSecondsG); // past run time from user input
 // previous/past run distance from user input
var pAvgPaceG = []; //pAvgePaceG is initally in seconds, then turns into MM:SS in final function call as FinalAdjustedPaceG
//these will be the values from the form input
var pPacemphG = (60 / pAvgPaceG);
var pWindSecOffsetG;
var pPaceRangeG = []; //holds low and high estimates for added seconds per mile due to heat in array


var pHeatSecOffsetG = [];

var FinalAdjustedPaceG = []; // final adjusted paces in MM:SS-MM:SS

//BASE RUN PACE
var basePaceG; //based on pAvePace but later we subtract wind and heat offsets

// CURRENT RUN TIME, DISTANCE, WEATHER


var cWindmphG; //FROM API CALL
var cPacemphG; (60 / basePaceG);
var cWindSecOffsetG;

var cTempG; //FROM API CALL
var cDewG;

//_________________________________________________________________
//INITIALIZE VARIABLES (ie giant callback)
//---------———————————————————————————————————————————–––––––––––––
function initVars(){
  //this will go at end; grab all variables from form, make global variables
//   pHoursG = $("#p-run-hours").val(); //past run hours from user input
//  pMinutesG = $("#p-run-mins").val(); //past run minutes from user input
//  pSecondsG = $("#p-run-secs").val(); 
//  pRunDistG = $("#p-run-dist").val();
//  pWindmphG = $("#p-wind-mph").val(); 
//  pTempG = $("#p-temp").val();
//  pDewG = $("#p-dew").val();
  var pRunDistG= 3.1;
  var pHoursG= 0;
  var pMinutesG= 20;
  var pSecondsG= 0;

  paceCalc (pRunDistG, pHoursG, pMinutesG, pSecondsG, pAvgPaceG);
  console.log("TEsting Precalc");
  console.log("pacecalc: "+ pRunDistG, pHoursG, pMinutesG, pSecondsG, pAvgPaceG) //  paceCalc (pRunDistG, pHoursG, pMinutesG, pSecondsG, cPaceRangeG);
  windOffset(pWindmphG, pPacemphG, pWindSecOffsetG);
  heatEffect(pTempG, pDewG, pHeatSecOffsetG);
}

function initVars2() {
  windOffset(cWindmphG, cPacemphG, cWindSecOffsetG);
  heatEffect(cTempG, cDewG, cHeatSecOffsetG);
}


//jquery document ready

initVars()
// .then(
//   getBasePace (pAvgPaceG, pWindSecOffsetG, pHeatSecOffsetG, basePaceG)
//   .then(initvars2()).then(adjustedPace(basePaceG, cWindSecOffsetG, cHeatSecOffsetG)));
//_________________________________________________________________
//BASIC PACE CALCULATOR
//---------———————————————————————————————————————————–––––––––––––

function paceCalc (distance, hours, minutes, seconds, globals) {
  var distance = parseFloat(distance); //this will come from global variable from form, not (distance)
  var hours = parseFloat(hours); //this will come from global variable from form, not (distance)
  var minutes = parseFloat(minutes);//this will come from global variable from form, not (distance)
  var seconds = parseFloat(seconds);//this will come from global variable from form, not (distance)
  var totalTime = 0;
    totalTime += hours*3600;
    totalTime += minutes*60;
    totalTime += seconds;
    globals = totalTime;
    $("#race-pace").empty().append(globals);
    // return pAvgPaceG in seconds don't need to return, this adjusts the global varaible average pace
  }
  console.log(paceCalc(13.1,1,35,18));
  paceCalc(26.2,3,29,09); //variables with user input will go in here

//_________________________________________________________________
//WIND MPH TIME OFFSET - IN SECONDS PER MILE
//---------———————————————————————————————————————————–––––––––––––
function windOffset(windMPH, paceMPH, globals){
    //winOffset will return the wind's impact on runner's time seconds per mile.
    //Next we'll add this to the heat/temp offset
  var windDivPace = windMPH/paceMPH; //step-by-step so Math.pow doesn't freak out
  globals = (12*(Math.pow(windDivPace ,2)));
  // return windSecOffset; DO NOT NEED, THIS IS GLOBAL
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
//For version that calculates the new pace, see repl: https://repl.it/@mhanley00/Run-Pace-Head-Adj
function heatEffect(temperature, dewPoint, basePace, globals){
var temperature;
var dewPoint;
var basePace;
  var heatScore = temperature + dewPoint;
  if (heatScore <= 100) {
    var lowHeatEst = 0;
    var highHeatEst = 0;
  } 
  else if (heatScore >=101 && heatScore <=110){
    var lowHeatEst = 0;
    var highHeatEst = basePace*.005;
  }
  else if (heatScore >=111 && heatScore <=120){
    var lowHeatEst = basePace*.005;
    var highHeatEst = basePace*.01;
  }
  else if (heatScore >=121 && heatScore <=130){
    var lowHeatEst = basePace*.01;
    var highHeatEst = basePace*.02;
  }
  else if (heatScore >=131 && heatScore <=140){
    var lowHeatEst = basePace*.02;
    var highHeatEst = basePace*.03;
  }
  else if (heatScore >=141 && heatScore <=150){
    var lowHeatEst = basePace*.03;
    var highHeatEst = basePace*.045;
  }
  else if (heatScore >=151 && heatScore <=160){
    var lowHeatEst = basePace*.045;
    var highHeatEst = basePace*.06;
  }
  else if (heatScore >=161 && heatScore <=170){
    var lowHeatEst = basePace*.06;
    var highHeatEst = basePace*.08;
  }
  else if (heatScore >=171 && heatScore <=180){
    var lowHeatEst = basePace*.08;
    var highHeatEst = basePace*.1;
  }
  else if (heatScore >=180){
    return "Head to the pool!" //write to DOM
  }
  // return lowHeatEst + " – " + highHeatEst;
  // return highHeatEst + " – " + lowHeatEst;
  globals=highHeatEst;
  // return paceRange;

}
console.log(heatEffect(20,100, 100, pHeatSecOffsetG));
heatEffect(20,100, 1000);

//_________________________________________________________________
//GET BASE PACE
//---------———————————————————————————————————————————–––––––––––––
function getBasePace (pace, windOffset, heatOffset, globals){
  var totalOffset = windOffsetSeconds + heatOffsetSeconds;
  globals = pace - totalOffset;

}

//_________________________________________________________________
//ADJUST BASE PACE VIA CURRENT TEMP, WIND
//---------———————————————————————————————————————————–––––––––––––

function adjustedPace (basePace, windOffsetSeconds, paceRange) {
  var windAdjustedPace = basePace + windOffsetSeconds;
  var cpPace = Math.floor(windAdjustedPace);
  
  for (var i = 0; i< paceRange.length; i++) {
    var paceMins = Math.floor (cpPace/60);
    var paceSecs = cpPace - (paceMins*60);
    if (paceSecs < 10) {
        paceSecs = '0'+ paceSecs;
      }
    formattedPace = paceMins + ":" + paceSecs;
  FinalAdjustedPaceG.push(windAdjustedPace + paceRange[i]);
  
  }
}




  //make sure these are all global
//probably need separate global vars for past and current run times/weather





//_________________________________________________________________
//AG% CALCULATOR
//---------———————————————————————————————————————————–––––––––––––
var gender; // gender male/female from user input
var ages = new Array(5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100);
var pAGP; // AG% of past race time, calculated/ assinged to function AGCalc
var gender;
var womens = {
  OC:{'5km': [3.1, 886]},
  '50': {'5km':[3.1, 0.8937],	
  '6km':[6, 0.8914]},
  '60': {'5km':[5, 0.77], 
  '6km' :[6, .777]}
};
//console.log("world record time: " + womens.OC['5km'][1]); //this now returns 886 🙌
function AGCalc (gender, age, distance, ageRunTime, globals) {
age = parseFloat(age), ageRunTime = parseFloat(ageRunTime);
if (gender === 'm'){
  var offset = mens[age][distance][1];
  var AGadj = (mens['OC'][distance][1])/offset;
  globals = AGadj/ageRunTime;
}
if (gender === 'f'){
  var offset = womens[age][distance][1];
  var AGadj = (womens['OC'][distance][1])/offset;
  globals = AGadj/ageRunTime;
}
// return globals; 
}
console.log("Your AG% is: " +AGCalc('f', 50, '5km', 3000));
 AGCalc('f', 50, '5km', 2000);

