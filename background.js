document.getElementById("darkModeSlider").onclick = function() {
    console.log(typeof localStorage["nightTheme"]);
    if (localStorage.nightTheme == "false") {
        localStorage.nightTheme = true;
    } else {
        localStorage.nightTheme = false;
    }
    console.log(localStorage["nightTheme"]);
}
window.onload = function() {
    if (localStorage["nightTheme"] == "true") {
        // console.log("ur ksalk d a");
        document.getElementById("darkModeSlider").click();
        localStorage["nightTheme"] = true;
    }
}

var mybutton = document.getElementById("reload-button");

mybutton.onclick = function() {
    var win = window.open("input-files/main-files/main.html", '_blank');
    win.focus();
};


function checkName() {
    var popupName = document.getElementById("name-change").value;
    if(popupName.length > 0)
    {
        localStorage["name"] = popupName;
        console.log("HIIHI");
    }
}

setInterval(checkName, 100);





