console.log("CSS Theme toggler loaded"); 

let themes = [
    {
        name: "dark",
        properpties: {
            backgroundColor: "darkgrey", 
            fontColor: "white", 
            "theme-100": "#4641d1"
        }
    }, 
    {
        name:"light", 
        properpties: {
            backgroundColor: "#87E0E0",
            fontColor: "black", 
            "theme-100": "#4641d1"
        }
    }, 
]; 

// Read theme name stored in local storage
// and update CSS variables based on that name
function getChosenTheme() {

}

// Set theme name to lcoal storage 
// and update CSS variables based on that name 
function setChosenTheme (newThemeName) {

}

// Loop through properties key in chosen theme object 
// and apply theme properties to CSS 
function updateCSsVariables() {

}

let rootElement = document.querySelector(":root"); 
// get :root varibale to access elements

function getVariableFromCSS() {
    console.log(rootElement);

    // console.log(document.documentElement.style.getPropertyValue("--backgroundColor")); 

    let rootStyles = getComputedStyle(rootElement);
    console.log(rootStyles.getPropertyValue("--backgroundColor")); 
}

getVariableFromCSS(); 