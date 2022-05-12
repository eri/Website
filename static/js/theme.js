// HTML elements
const main = document.getElementById("page");
const switcher = document.getElementById("themeButton");

// Settings
const storedTheme = localStorage.theme;

// Events
document.onload = () => {
  if (!storedTheme) changeTheme(storedTheme);
};

switcher.onclick = () => {
  // Get the current theme and change it

  if (main.classList.value.includes("dark")) {
    changeTheme("light");
    storeTheme("light");
    switcher._tippy.setContent(`Dark theme`);
  } else {
    changeTheme("dark");
    storeTheme("dark");
    switcher._tippy.setContent(`Light theme`);
  }

  // Define a default theme if not set
  if (!storedTheme) storeTheme("dark");
};

const storeTheme = (theme) => {
  try {
    localStorage.theme = theme;
    return true;
  } catch (e) {
    console.error(e);
    return false;
  }
};

const changeTheme = (theme) => {
  // Enables the dark mode
  if (theme == "dark") document.getElementById("page").classList.add("dark");
  // Enables the light mode
  else document.getElementById("page").classList.remove("dark");
};
