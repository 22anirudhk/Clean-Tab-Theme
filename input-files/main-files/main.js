var age = document.getElementById("age-number");

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

var greeting = document.getElementById("greeting");
var name = localStorage["name"];
var dayOfWeek = document.getElementById("dayOfWeek");
var temperature = document.getElementById("temperature");

var nightTheme = false;



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
        temperature.innerHTML = roundTo(json, 1) + "°";
    }

    var x = document.getElementById("demo");
}

function initialize() {
    changeGreeting();
    addAge();
    addTime();
    changeTheme();
    calcTemperature();
}

setInterval(addAge(), 60000);
setInterval(calcTemperature(), 86400000);

function changeTheme() {
    if (hour >= 21 || hour <= 5) {
        nightTheme = true;
    }
    if (nightTheme) {
        greeting.style.color = "white";
        age.style.color = "orange";
        document.body.style.background = "#1D1D1D";
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
    n = (Math.round(n) / multiplicator).toFixed(2);
    if (negative) {
        n = (n * -1).toFixed(2);
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
    if (age.innerText.includes("years")) {
        age.innerHTML = ((year - inputYear) + Math.round(numDays / 365.25 * 1000) / 1000) + " years";
    } else {
        age.innerHTML += (year - inputYear) + Math.round(numDays / 365.25 * 1000) / 1000 + " years";
    }

}



function changeGreeting() {
    greeting.innerHTML += timeToPartOfDay();
    greeting.innerHTML += name + ".";
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