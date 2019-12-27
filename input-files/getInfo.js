var myButton = document.getElementById("submit-button");

var today = new Date();
var month = today.getMonth() + 1; //January is 0
var day = today.getDate(); //gets the day
var year = today.getFullYear();
var numDays = 0;
var daysBetween;

var inputMonth;
var inputDay;
var inputYear;
var name;

function initializeSystemVars() {
    localStorage["isPC"] = "off";
}



myButton.onclick = function() {

    inputMonth = parseInt(document.getElementById("input").value.substring(5, 7));
    inputDay = parseInt(document.getElementById("input").value.substring(8, 10));
    inputYear = parseInt(document.getElementById("input").value.substring(0, 4));

    if (inputYear > year || inputYear < (year - 100)) {
        linebreak = document.createElement("br");
        document.getElementById("button-div").appendChild(linebreak);
        document.getElementById("button-label").innerHTML += "Please enter a valid date."

        return;
    } else {
        name = document.getElementById("name").value;

        localStorage["values"] = document.getElementById("input").value;


        if (month === inputMonth && day === inputDay) {
            daysBetween = 0;
        } else if (month > inputMonth) {
            daysBetween = getNumDays(inputMonth, inputDay, year, month, day, year); //act like it's the same year.
        } else {
            daysBetween = getNumDays(inputMonth, inputDay, year, month, day, year);
        }

        numDays = daysBetween;

        var isPC = document.getElementById("isPC").checked;

        localStorage["inputMonth"] = inputMonth;
        localStorage["inputDay"] = inputDay;
        localStorage["inputYear"] = inputYear;
        localStorage["numDays"] = numDays;
        localStorage["getNumDays"] = getNumDays;
        localStorage["name"] = name;
        localStorage["dataEntered"] = true;
        localStorage["isPC"] = isPC;
        localStorage.nightTheme = false;
        window.location.href = "main-files/main.html";

    }
}

function changeNightMode() {
    nightTheme = !nightTime;
}



var getNumDays = function(startingMonth, startingDay, startingYear, endingMonth, endingDay, endingYear) //get num days from the input day
    {
        if (startingYear === endingYear && startingMonth === endingMonth && startingDay === endingDay) {
            return 1;
        } else if (startingYear === endingYear && startingMonth === endingMonth) {
            return endingDay - startingDay + 1;
        } else if (startingYear === endingYear) {
            //Count number of days left in month
            if (startingMonth === 1 || startingMonth === 3 || startingMonth === 5 || startingMonth === 7 || startingMonth === 8 || startingMonth === 10 || startingMonth === 12) {
                numDays += (31 - startingDay + 1);
            } else if (startingMonth === 2) {
                if (startingYear % 4 === 0) {
                    numDays += 29 - startingDay + 1;
                } else {
                    numDays += 28 - startingDay + 1;
                }
            } else {
                numDays += (30 - startingDay + 1);
            }

            //Account for the rest of the months
            for (var currentMonth = startingMonth + 1; currentMonth < endingMonth; currentMonth++) {
                if (currentMonth === 2) {
                    if (startingYear % 4 === 0) {
                        numDays += 28;
                    } else {
                        numDays += 29;
                    }
                } else if (currentMonth === 1 || currentMonth === 3 || currentMonth === 5 || currentMonth === 7 || currentMonth === 8 || currentMonth === 10 || currentMonth === 12) //If month has 31 days
                {
                    numDays += 31;
                } else {
                    numDays += 30;
                }
            }

            //Go up to ending date.
            numDays += endingDay;
        } else {
            if (startingMonth === 1 || startingMonth === 3 || startingMonth === 5 || startingMonth === 7 || startingMonth === 8 || startingMonth === 10 || startingMonth === 12) {
                numDays += (31 - startingDay + 1);
            } else if (startingMonth === 2) {
                if (startingYear % 4 === 0) {
                    numDays += 28 - startingDay + 1;
                } else {
                    numDays += 29 - startingDay + 1;
                }
            } else {
                numDays += (30 - startingDay + 1);
            }

            //Account for the rest of the months
            for (var currentMonth = startingMonth + 1; currentMonth <= 12; currentMonth++) {
                if (currentMonth === 2) {
                    if (startingYear % 4 === 0) {
                        numDays += 29;
                    } else {
                        numDays += 28;
                    }
                } else if (currentMonth === 1 || currentMonth === 3 || currentMonth === 5 || currentMonth === 7 || currentMonth === 8 || currentMonth === 10 || currentMonth === 12) //If month has 31 days
                {
                    numDays += 31;
                } else {
                    numDays += 30;
                }
            }

            for (var currentMonth = 1; currentMonth < endingMonth; currentMonth++) {
                if (currentMonth === 2) {
                    if (endingYear % 4 === 0) {
                        numDays += 28;
                    } else {
                        numDays += 29;
                    }
                } else if (currentMonth === 1 || currentMonth === 3 || currentMonth === 5 || currentMonth === 7 || currentMonth === 8 || currentMonth === 10 || currentMonth === 12) //If month has 31 days
                {
                    numDays += 31;
                } else {
                    numDays += 30;
                }
            }

            //Add days until end date in ending month
            numDays += endingDay;
        }


        return numDays;
    }