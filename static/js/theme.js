// HTML elements
let main = document.getElementById("page")
let switcher = document.getElementById("themeButton")

// Settings
let storedTheme = localStorage.theme;

// Events
switcher.addEventListener("click", themeEvent);
document.addEventListener('DOMContentLoaded', function() {
    if (storedTheme != null || storedTheme != undefined) {
        changeTheme(storedTheme);
    };
}, false);

function themeEvent() {
    // Get the current theme and change it

    if (main.classList.value.includes("dark")) {
        changeTheme("light")
        storeTheme("light")
        switcher._tippy.setContent(`Dark theme`);
    } else {
        changeTheme("dark")
        storeTheme("dark")
        switcher._tippy.setContent(`Light theme`);
    }

    // Define a default theme if not set
    if (storedTheme == null || storedTheme == undefined) {
        storeTheme("dark")
    }
}

function storeTheme(theme) {
    try {
        localStorage.theme = theme;
        return true
    } catch (e) {
        console.log(e)
        return false
    } 
}

function changeTheme(theme) {

    if (theme == "dark") {
        // Enables the dark mode
        document.getElementById("page").classList.add("dark")
    } else {
        // Enables the light mode
        document.getElementById("page").classList.remove("dark")
    }
}
