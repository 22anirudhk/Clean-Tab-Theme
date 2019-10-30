var age = document.getElementById("age");

var today = new Date();
var month = today.getMonth() + 1;//January is 0
var day = today.getDate(); //gets the day
var year = today.getFullYear();

var inputYear = localStorage["inputYear"];
var inputMonth = localStorage["inputMonth"];
var inputDay = localStorage["inputDay"];
var numDays = localStorage["numDays"];


age.innerHTML += (year-inputYear) + Math.round(numDays/365.25 * 1000)/1000 + " years old.";
console.log(numDays); //fix this division
