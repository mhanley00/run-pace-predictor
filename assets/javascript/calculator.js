var distanceInput = $("#distance"),
	hoursInput = $("#hours"),
	minutesInput = $("#minutes"),
	secondsInput = $("#seconds"),
	calculateBtn = $("#calculate_btn"),
	paceText = $("#pace");

  $(".calculate").on("click", function() {
	var miles = parseFloat(distanceInput.value),
		hours = parseFloat(hoursInput.value),
		minutes = parseFloat(minutesInput.value),
		seconds = parseFloat(secondsInput.value);


var pRunTime = (pHours * 60) + (pMinutes * 60) + (pSeconds); // past run time from user input
//might change this to document.dataform.phours etc
var pRunDist; // past run distance from user input

function paceCalc (pRunDist, pHours, pMinutes, pSeconds) {
    pRunDist = parseFloat(pRunDist), pHours = parseFloat(pHours), pMinutes = parseFloat(pMinutes), pSeconds = parseFloat(pSeconds);
    var pPace;
    var pRunTime = 0;
    pRunTime += pHours*3600;
    pRunTime += pMinutes*60;
    pRunTime += pSeconds;
    var cpPace = Math.floor(pRunTime/pRunDist);
    var paceMins = Math.floor (cpPace/60);
    var paceSecs = cpPace - (paceMins*60);
    if (paceSecs < 10) {
        paceSecs = '0'+ paceSecs;
      }
    pPace = paceMins + ":" + paceSecs;
    return pPace;
  }




var gender; // gender male/female from user input
var ages = new Array(5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100);
var pAGP; // AG% of past race time, calculated/ assinged to function AGCalc
//looking at Alan Jones calculator, note it's just looking at total time, not pace

var pTemp; // past race temp from user input


