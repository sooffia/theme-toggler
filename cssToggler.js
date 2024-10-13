console.log("CSS Theme toggler loaded"); 

let rootElement = document.querySelector(":root"); 
// get :root varibale to access elements
let themeToggleButton = document.getElementById("themeToggle"); 

//DEFINING THEMES 
// contains two objects 
let themes = [
    {
        name: "dark",
        properties: {
            backgroundColor: "darkgrey", 
            fontColor: "white", 
            "theme-100": "#4641d1"
        }
    }, 
    {
        name:"light", 
        properties: {
            backgroundColor: "#87E0E0",
            fontColor: "black", 
            "theme-100": "#4641d1"
        }
    }, 
]; 

//GET CHOSEN THEME FROM LOCAL STORAGE
// this function retrieves the selected theme currently from the browser's local Storage
// local Storage is used to store data in the browser so that it persists even after the page is refreshed or shut down.
    // - it allwos u to store data as jey-value pairs in the browser 
    // - in this case it has been used to remeber the user's theme preference
// getItem("theme") - gets the value associated with the key theme.
    // - if the theme key exists in localStorage it returns the value (dark or light)
function getChosenTheme() {
    let foundTheme = localStorage.getItem("theme"); 
    console.log(foundTheme); 
    return foundTheme; 
}

//SET THE CHOSEN THEME TO LOCAL STORAGE 
// this function saves the user's selected theme into local Storage
// setItem("theme", newThemeName) stores the provided newThemeName under the key "theme"
    // after the theme is saved in local Storage, it calls updateCSsVariables() function to apply the chosen theme to the page
function setChosenTheme (newThemeName) {
    localStorage.setItem("theme", newThemeName); 
    updateCSsVariables(); 
}

//APPLIES A DEFAULT THEME IF NONE IS FOUND
// if theme is not found (null is returned), the script falls back to the system's color scheme preferences and applues the corresponding theme 
// if no theme is stored in local Storage, the script checks the user's system preference (light or dark)
// based on this, it sets the theme in local storage and updates the page's theme using setChosenTheme()
if (getChosenTheme() == null) {
    const darkThemeMq = window.matchMedia("(prefers-color-scheme: dark)"); 
    if (darkThemeMq.matches) {
        setChosenTheme("dark"); 
        console.log("No theme found, applied the dark theme"); 
    } else {
        setChosenTheme("light"); 
        console.log("No theme foudn, applied the light theme"); 
    }
 } else {
    updateCSsVariables(); 
 }

function updateButtonText() {
    if (getChosenTheme() == "dark") {
        themeToggleButton.innerText = "Change theme to Light"
    } else {
        themeToggleButton.innerText = "Change theme to Dark"
    }
}

// TOGGLE AND SAVE THE NEW THEME
// if the user clciks the theme toggle button, toggleTheme() function is caled: 
    // the function checks the current theme (getChosenTheme()), and if dark it changes it to light.. vice versa
    // after setting the new theme using setChosenTheme(), the theme is saved to localStorage - the page updates accordingly 
function toggleTheme() {
    if (getChosenTheme() == "dark") {
        setChosenTheme("light"); 
        
    } else {
        setChosenTheme("dark"); 
    }
}

// EVENT LISTENER FOR THE BUTTON
// an event listener to the button (themeToggleButton) which calls toggleTheme() when the button is clicked
themeToggleButton.addEventListener("click", toggleTheme); 

//APPLYING CSS VARIABLES FROM THE CHOSEN THEME
// it finds the theme object that matches the theme stored in local Storage (using themes.find())
// loops through each properpty in the properties object of the matching theme using Object.keys 
// for each property, it applies the corresponding value to a CSS variable on the :root element
function updateCSsVariables() {
    // find the matching theme object 
    let matchingTheme = themes.find(themeObject => themeObject.name == getChosenTheme()); 
    console.log(matchingTheme);

    // find the properties object in the matching theme object 
    Object.keys(matchingTheme.properties).forEach(cssProperty => {
        console.log(cssProperty + ": " + matchingTheme.properties[cssProperty]); 
        rootElement.style.setProperty(`--${cssProperty}`, matchingTheme.properties[cssProperty]); 
    }); 
    updateButtonText(); 
}

function getVariableFromCSS() {
    console.log(rootElement);

    // console.log(document.documentElement.style.getPropertyValue("--backgroundColor")); 
    let rootStyles = getComputedStyle(rootElement);
    console.log(rootStyles.getPropertyValue("--backgroundColor")); 
}

getVariableFromCSS(); 

// HOW IT WORKS:
    // - if it's users first time loading the page, getChosenTheme() calls localSotrage.getitem("theme"), which will return null as key "theme" has yet to exist 
    // - since no theme is stored, the system is checked using widnow.matchMedia 
    // - then setChosenTheme() function is called, which stores the chosen theme in localStorage: 
        // as a result, this creates the theme key in local Storage and saves the theme name ( light or dark) as its value 
    // - on the next load, the code will check if the theme key exits in local storage using let foundTheme = .....
        // if the key exists (e.g., foundTheme = "dark") - it applies the corresponding theme without chekcing the system preferences again 
