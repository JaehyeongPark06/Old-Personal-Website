// Light and dark mode
var icon = document.getElementById("icon");

let localData = localStorage.getItem("theme");

if (localData == "dark") {
    icon.src = "images/light&dark/sun.png";
    document.body.classList.remove("light-theme");
} else if (localData == "light") {
    icon.src = "images/light&dark/moon.png";
    document.body.classList.add("light-theme");
}

icon.onclick = function () {
    document.body.classList.toggle("light-theme");
    if (document.body.classList.contains("light-theme")) {
        icon.src = "images/light&dark/moon.png";
        localStorage.setItem("theme", "light");
    } else {
        icon.src = "images/light&dark/sun.png";
        localStorage.setItem("theme", "dark");
    }
}

function showTheme() {
    if (localStorage.getItem ("theme") == null) {
        localStorage.setItem("theme", "light");
    }
}

function showContent() {
    document.body.style.visibility = 'visible';
    document.body.style.opacity = 1;
}

window.addEventListener('DOMContentLoaded', function () {
    showTheme();
    showContent();
});
