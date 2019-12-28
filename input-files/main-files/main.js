var age = document.getElementById("age-number");

console.log("page has loaded. " + localStorage["nightTheme"]);

var today = new Date();
var month = today.getMonth() + 1; //January is 0
var day = today.getDate(); //gets the day
var year = today.getFullYear();

var timeString = today.toString();
var hour = timeString.substring(16, 18);
var minutes = timeString.substring(19, 21);

var dayOfWeek;

var inputYear = localStorage["inputYear"];
var inputMonth = localStorage["inputMonth"];
var inputDay = localStorage["inputDay"];
var numDays = localStorage["numDays"];

var inputDate = new Date(inputYear, inputMonth - 1, inputDay, 0, 0, 0, 0);

var greeting = document.getElementById("greeting");
var name = localStorage["name"];
var dayOfWeek = document.getElementById("dayOfWeek");
var temperature = document.getElementById("temperature");

var tempValue;

var nightTheme;

var dataEntered;

if (localStorage["dataEntered"]) {
    dataEntered = true;
} else {
    dataEntered = false;
}




console.log(localStorage["dataEntered"]);
if (!dataEntered) {
    window.location.href = "../initial.html";
}


initialize();

function calcTemperature() {
    var data = null;

    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function() {
        if (this.readyState === this.DONE) {
            console.log(this.responseText);
        }
    });

    var options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
    }

    navigator.geolocation.getCurrentPosition(success, error, options);
    var lat = localStorage["latitude"];
    var long = localStorage["longitude"];


    let proxyurl = "https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/b26921014111d63c30fef10af3c2b1f1/";

    var finalurl = proxyurl + lat + "," + long;
    console.log(finalurl);

    fetch(finalurl)
        .then(response => response.text())
        .then(contents => setTemp(contents))
        .catch(() => console.log("Can’t access " + finalurl + " response. Blocked by browser?"))

    function success(pos) {
        localStorage["longitude"] = pos.coords.longitude;
        localStorage["latitude"] = pos.coords.latitude;
    }

    function error(pos) {
        console.log("bruh");
        return "";
    }

    function setTemp(str) {
        json = JSON.parse(str).currently["temperature"];
        tempValue = json;
        localStorage["tempValue"] = tempValue;
         //json = json-10 sometimes works better for some reason.
    }

    var x = document.getElementById("demo");
    console.log("Longitude: " + localStorage["longitude"]);
    console.log("Latitude: " + localStorage["latitude"]);
}

function initialize() {
    calcTemperature();
    console.log(tempValue);
    checkCelsius();
    checkIfPC();
    changeGreeting();
    addAge();
    addTime();
    changeTheme();
    
}

function checkForMyTemp() {
    if(tempValue === undefined)
    {
        return false; // dont go ahead
    }
    return true;
}

function checkCelsius() {
    if(checkForMyTemp())
    {
        if(localStorage["celsiusEnabled"] == "true")
        {
            var myTempValue = (tempValue-32) * 5 / 9;
            temperature.innerHTML = roundTo(myTempValue, 1) + "° C";
        }
        else
        {
            temperature.innerHTML = roundTo(tempValue, 1) + "° F";
        }
    }
    else
    {
        console.log("Im not in")
    }
}

function checkIfPC() {
    var everything = document.getElementById("myBody");
    console.log(localStorage["isPC"]);
    if(localStorage["isPC"] == "true")
    {
        everything.style.fontFamily = "AvenirLTStd-Medium";
        console.log(everything.style.fontFamily);
    }
}



setInterval(addAge, 100);
setInterval(changeTheme, 1000);
setInterval(checkCelsius, 100);
setInterval(calcTemperature, 86400000);

function changeTheme() {
    nightTheme = localStorage["nightTheme"];
    // console.log(nightTheme);
        
    if(nightTheme == "true")
        {
            greeting.style.color = "white";
            age.style.color = "orange";
            document.getElementById("temperature").style.color = "gray";
            document.getElementById("dayOfWeek").style.color = "gray";
        }
        else
        {
            greeting.style.color = "black";
            age.style.color = "gray";
            document.getElementById("temperature").style.color = "orange";
            document.getElementById("dayOfWeek").style.color = "orange";
        }

    if(localStorage["photoEnabled"] == "false")
    {
        if(nightTheme == "true")
        {
            document.body.style.background = "#1D1D1D";
        }
        else
        {
            document.body.style.background = "white";
        }
        
    }
    else
    {
        var link = localStorage["imageLink"]; //check for https?
        console.log(link);
        if(link == "" || !imageExists(link))
        {
            document.getElementById("myBody").style.backgroundImage =  'url(https://hdqwalls.com/download/minimalist-landscape-4k-jt-1440x900.jpg)';//reeeee
        }
        else
        {
            document.getElementById("myBody").style.backgroundImage =  'url('+link+')';//reeeee
        }
    }

}


//rounding function
//https://stackoverflow.com/questions/15762768/javascript-math-round-to-two-decimal-places
function roundTo(n, digits) {
    var negative = false;
    if (digits === undefined) {
        digits = 0;
    }
    if (n < 0) {
        negative = true;
        n = n * -1;
    }
    var multiplicator = Math.pow(10, digits);
    n = parseFloat((n * multiplicator).toFixed(11));
    n = (Math.round(n) / multiplicator).toFixed(digits);
    if (negative) {
        n = (n * -1).toFixed(digits);
    }
    return n;
}

function addTime() {
    var tempDayOfWeek = timeString.substring(0, 3);


    if (tempDayOfWeek === "Mon") {
        dayOfWeek = "Monday";
    } else if (tempDayOfWeek === "Tue") {
        dayOfWeek = "Tuesday";
    } else if (tempDayOfWeek === "Wed") {
        dayOfWeek = "Wednesday";
    } else if (tempDayOfWeek === "Thu") {
        dayOfWeek = "Thursday";
    } else if (tempDayOfWeek === "Fri") {
        dayOfWeek = "Friday!";
    } else if (tempDayOfWeek === "Sat") {
        dayOfWeek = "Saturday";
    } else {
        dayOfWeek = "Sunday";
    }

    document.getElementById("dayOfWeek").innerHTML += dayOfWeek;
}

function addAge() {
    //console.log(inputDate);
    
      var ageRaw = (new Date() - inputDate) / (1000 * 60 * 60 * 24 * 365.25);
      var ageVal = roundTo(ageRaw, 9);
      let ageStr = "" + ageVal;
      age.innerHTML = ageVal + '<span class="post-text"> years old</span>';
      
    

}



//By  Felipe Oriani 
function imageExists(url){

    var image = new Image();

    image.src = url;

    if (!image.complete) {
        return false;
    }
    else if (image.height === 0) {
        return false;
    }

    return true;
}



function changeGreeting() {
    greeting.innerHTML = timeToPartOfDay();
    greeting.innerHTML += localStorage["name"] + ".";
    console.log(localStorage["name"]);
}

function timeToPartOfDay() {
    if (hour > 5 && hour < 12) {
        return "Good Morning, ";
    } else if (hour >= 12 && hour < 16) {
        return "Good Afternoon, ";
    } else if (hour >= 16 && hour < 21) {
        return "Good Evening, ";
    } else {
        return "It's sleep time, ";
    }
}
