// Light and dark mode
var icon = document.getElementById("icon");

icon.onclick = function () {
    document.body.classList.toggle("light-theme");
    if (document.body.classList.contains("light-theme")) {
        icon.src = "images/light&dark/moon.png";
    } else {
        icon.src = "images/light&dark/sun.png";
    }
}

