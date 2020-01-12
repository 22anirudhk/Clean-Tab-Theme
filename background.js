
    document.getElementById("darkModeSlider").onclick = function() {
        if (localStorage.nightTheme == "false") {
            localStorage.nightTheme = true;
        } else {
            localStorage.nightTheme = false;
        }
    }
    document.getElementById("celsius-enabled").onclick = function() {
        if (localStorage.celsiusEnabled == "false") {
            localStorage.celsiusEnabled = true;
        } else {
            localStorage.celsiusEnabled = false;
        }
    }

    

    document.getElementById("background-photo-enabled").onclick = function() {
        if (localStorage["photoEnabled"] == "false") {
            localStorage["photoEnabled"] = true;
        } else {
            localStorage["photoEnabled"] = false;
        }
    }

    document.getElementById("age-enabled").onclick = function() {
        if (localStorage["ageEnabled"] == "false") {
            localStorage["ageEnabled"] = true;
        } else {
            localStorage["ageEnabled"] = false;
        }
    }

    document.getElementById("reload-button").onclick = function() {
        var win = window.open("input-files/main-files/main.html", '_blank');
        win.focus();
    };
    
    function checkName() {
        var popupName = document.getElementById("name-change").value;
        if(popupName.length > 0)
        {
            localStorage["name"] = popupName;
        }
    }
    
    function checkImageLink() {
        var imageLink = document.getElementById("image-link").value;
        localStorage["imageLink"] = imageLink;
    }
    


// document.getElementById("age-shower").onclick = function() {
//     if (localStorage.enabledAge == "false") {
//         localStorage.enabledAge = true;
//     } else {
//         localStorage.enabledAge = false;
//     }
//     console.log(localStorage["nightTheme"]);
// }



window.onload = function() {
    if (localStorage["nightTheme"] == "true") {
        document.getElementById("darkModeSlider").click();
        localStorage["nightTheme"] = true; //gets reset by onclick method
    }

    if(localStorage["photoEnabled"] == "true") {
      document.getElementById("background-photo-enabled").click();
      localStorage["photoEnabled"] = true;
    }

    if (localStorage["celsiusEnabled"] == "true") {
        document.getElementById("celsius-enabled").click();
        localStorage["celsiusEnabled"] = true; //gets reset by onclick method
    }

    if(localStorage["ageEnabled"] == "true")
    {
        document.getElementById("age-enabled").click();
        this.localStorage["ageEnabled"] = true;
    }
}




//Doesnt work :(
// function getImage(input) {
    
//     if(localStorage["photoEnabled"] == "true")
//     {
//         if (input.files && input.files[0]) {
//             var reader = new FileReader();

//             reader.onload = function (e) {
//                 console.log(e.target.result);
//             };

//             reader.readAsDataURL(input.files[0]);
//         }
//     }
// }

// function imageIsLoaded() { 
//     alert(this.src);  // blob url
//     // update width and height ...
//   }

// var loadFile = function(event) {
// 	var image = document.getElementById("output");
// 	image.src = URL.createObjectURL(event.target.files[0]);
// };

setInterval(checkName, 100);
setInterval(checkImageLink, 100);



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