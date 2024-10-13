console.log("CSS Theme toggler loaded"); 

let rootElement = document.querySelector(":root"); 
// get :root varibale to access elements
let themeToggleButton = document.getElementById("themeToggle"); 

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

// Read theme name stored in local storage
// and update CSS variables based on that name
function getChosenTheme() {
    let foundTheme = localStorage.getItem("theme"); 
    console.log(foundTheme); 
    return foundTheme; 
}

// Set theme name to lcoal storage 
// and update CSS variables based on that name 
function setChosenTheme (newThemeName) {
    localStorage.setItem("theme", newThemeName); 
    updateCSsVariables(); 
}

// something abou deleting keys but is there again when the page refeshes 
if (getChosenTheme() == null) {
    // if a theme does not exist in local storage 
    // get the system light/darkl preferences 
    // and apply that 
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

function toggleTheme() {
    if (getChosenTheme() == "dark") {
        setChosenTheme("light"); 
        
    } else {
        setChosenTheme("dark"); 
    }
}

// themeToggleButton.onclick = toggleTheme; 
themeToggleButton.addEventListener("click", toggleTheme); 

// Loop through properties key in chosen theme object 
// and apply theme properties to CSS 
function updateCSsVariables() {
    // find the matching theme object 
    let matchingTheme = themes.find(themeObject => themeObject.name == getChosenTheme()); 
    console.log(matchingTheme);

    // find the properties object in the matching theme object 
    Object.keys(matchingTheme.properties).forEach(cssProperty => {
        console.log(cssProperty + ": " + matchingTheme.properties[cssProperty]); 
        rootElement.style.setProperty(`--${cssProperty}`, matchingTheme.properties[cssProperty]); 
    }); 
    // loop through all properties 
    // apply property value to CSS variables 

    updateButtonText(); 
}

function getVariableFromCSS() {
    console.log(rootElement);

    // console.log(document.documentElement.style.getPropertyValue("--backgroundColor")); 
    let rootStyles = getComputedStyle(rootElement);
    console.log(rootStyles.getPropertyValue("--backgroundColor")); 
}

getVariableFromCSS(); 