// Light and dark mode
var icon = document.getElementById("icon");

if (localStorage.getItem("theme") == null) {
    localStorage.setItem("theme", "dark");
}

let localData = localStorage.getItem("theme");

if (localData === "light") {
    icon.src = "images/light&dark/moon.png";
    document.body.classList.remove("dark-theme");
} else if (localData === "dark") {
    icon.src = "images/light&dark/sun.png";
    document.body.classList.toggle("dark-theme");
}

icon.onclick = function () {
    document.body.classList.toggle("dark-theme");
    if (document.body.classList.contains("dark-theme")) {
        icon.src = "images/light&dark/sun.png";
        localStorage.setItem("theme", "dark")
    } else {
        icon.src = "images/light&dark/moon.png";
        localStorage.setItem("theme", "light")
    }
}

