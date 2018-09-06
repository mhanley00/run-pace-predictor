// var distanceInput = $("#distance"),
// 	hoursInput = $("#hours"),
// 	minutesInput = $("#minutes"),
// 	secondsInput = $("#seconds"),
// 	calculateBtn = $("#calculate_btn"),
// 	paceText = $("#pace");

//   $(".calculate").on("click", function() {
// 	var miles = parseFloat(distanceInput.value),
// 		hours = parseFloat(hoursInput.value),
// 		minutes = parseFloat(minutesInput.value),
// 		seconds = parseFloat(secondsInput.value);


var pRunTime = (pHours * 60) + (pMinutes * 60) + (pSeconds); // past run time from user input, probably need the $($stuff)
//might change this to document.dataform.phours etc
var pRunDist; // past run distance from user input

//_________________________________________________________________
//BASIC PACE CALCULATOR
//---------———————————————————————————————————————————–––––––––––––
var distance; //made new generiic variables for the function paceCalc
var hours;
var minutes;
var seconds;
function paceCalc (distance, hours, minutes, seconds) {
  distance = parseFloat(distance), hours = parseFloat(hours), 
  minutes = parseFloat(minutes), seconds = parseFloat(seconds);
    var avgPace;
    var totalTime = 0;
    totalTime += hours*3600;
    totalTime += minutes*60;
    totalTime += seconds;
    var cpPace = Math.floor(totalTime/distance);
    var paceMins = Math.floor (cpPace/60);
    var paceSecs = cpPace - (paceMins*60);
    if (paceSecs < 10) {
        paceSecs = '0'+ paceSecs;
      }
    avgPace = paceMins + ":" + paceSecs;
    return avgPace;
  }
  console.log(paceCalc(13.1,1,35,18));
  paceCalc(26.2,3,29,09); //variables with user input will go in here

//_________________________________________________________________
//WIND MPH TIME OFFSET - IN SECONDS PER MILE
//---------———————————————————————————————————————————–––––––––––––
  var windMPH1 = 20; //these will be the values from the form input
  var pace1 = 8.2;
  
  //use different names for vars from input form and things passing into function 
  function windOffset(windMPH, paceMPH){
    //winOffset will return the wind's impact on runner's time seconds per mile. Later
    //Next we'll add this to the heat/temp offset
    var windSecOffset;
    var windDivPace = windMPH/paceMPH; //step-by-step so Math.pow doesn't freak out
  // return (12*(Math.pow(windDivPace ,2)));
  var windSecOffset = (12*(Math.pow(windDivPace ,2)));
  return windSecOffset;
  }
  console.log("wind offset s/mi: " + windOffset(windMPH1,pace1));
  windOffset(windMPH1,pace1); // w/ vars from input form (listed above)
  //THIS MEANS THAT WE CAN USE THE SAME "BASE" FUNCTION TO CALC OFFSET AT RACE TIME AND TODAY

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
//x >= 0.001 && x <= 0.009
var temperature;
var dewPoint;
var basePace;
function heatEffect(temperature, dewPoint, basePace){
  var heatScore = temperature + dewPoint;
  if (heatScore <= 100) {
    var lowHeatEst = basePace;
    var highHeatEst = basePace;
  } 
  else if (heatScore >=101 && heatScore <=110){
    var lowHeatEst = basePace;
    var highHeatEst = (basePace*.005) + basePace;
  }
  else if (heatScore >=111 && heatScore <=120){
    var lowHeatEst = (basePace*.005) + basePace;
    var highHeatEst = (basePace*.01) + basePace;
  }
  else if (heatScore >=121 && heatScore <=130){
    var lowHeatEst = (basePace*.01) + basePace;
    var highHeatEst = (basePace*.02) + basePace;
  }
  else if (heatScore >=131 && heatScore <=140){
    var lowHeatEst = (basePace*.02) + basePace;
    var highHeatEst = (basePace*.03) + basePace;
  }
  else if (heatScore >=141 && heatScore <=150){
    var lowHeatEst = (basePace*.03) + basePace;
    var highHeatEst = (basePace*.045) + basePace;
  }
  else if (heatScore >=151 && heatScore <=160){
    var lowHeatEst = (basePace*.045) + basePace;
    var highHeatEst = (basePace*.06) + basePace;
  }
  else if (heatScore >=161 && heatScore <=170){
    var lowHeatEst = (basePace*.06) + basePace;
    var highHeatEst = (basePace*.08) + basePace;
  }
  else if (heatScore >=171 && heatScore <=180){
    var lowHeatEst = (basePace*.08) + basePace;
    var highHeatEst = (basePace*.1) + basePace;
  }
  else if (heatScore >=180){
    return "Head to the pool!" //write to DOM
  }
  return lowHeatEst + " – " + highHeatEst;
}
console.log(heatEffect(78,58,420));

//_________________________________________________________________
//AG% CALCULATOR
//---------———————————————————————————————————————————–––––––––––––
var gender; // gender male/female from user input
var ages = new Array(5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100);
var pAGP; // AG% of past race time, calculated/ assinged to function AGCalc
var womens = {
  OC:{'5km': [3.1, 886]},
  '50': {'5km':[3.1, 0.8937],	
  '6km':[6, 0.8914]},
  '60': {'5km':[5, 0.77], 
  '6km' :[6, .777]}
};
var gender;
console.log("world record time: " + womens.OC['5km'][1]); //this now returns 886 🙌
function AGCalc (gender, age, distance, ageRunTime) {
age = parseFloat(age), ageRunTime = parseFloat(ageRunTime);
if (gender === 'm'){
  var offset = mens[age][distance][1];
  var AGadj = (mens['OC'][distance][1])/offset;
  var pAGP = AGadj/ageRunTime;
}
if (gender === 'f'){
  var offset = womens[age][distance][1];
  var AGadj = (womens['OC'][distance][1])/offset;
  var pAGP = AGadj/ageRunTime;
}
return pAGP;
}
console.log("Your AG% is: " +AGCalc('f', 50, '5km', 3000));
 AGCalc('f', 50, '5km', 2000);
