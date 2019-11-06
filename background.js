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