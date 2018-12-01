/*Javascript for RPG
* This is the core document which essentially will act like a main()
*/
var character = {
    name: "",
    class: "",
    maxHP: 15,
    maxMP: 0,
    strength: 4,
    agility: 4,
    attack: 0,
    armor: 0,
    equipped: [
        {weapon: "none"},
        {armor: "none"}
    ],
    inventory: []
};
var statBar = document.getElementsByClassName("player-info");
/* Main menu assignment */
var mainMenu = document.getElementById("main-menu");

/* Main menu funtionality */
function createCharacter(event) {
    event.preventDefault;
    //collect data from form
    var charName = document.getElementById("create-name").value;
    console.log(charName);
    var charClass = document.getElementById("create-class").value;
    console.log("Character Information: Name: ", charName, " Class: ", charClass);
}



function displayStats(character) {
    console.log(statBar);
}

/* display monster */

/* show function accepts a stricng which determines which element/window*/
function show(targetElement) {
    console.log("Showing", targetElement);
    switch(targetElement) {
        case "options":
            break;
        case "credits":

            break;
    }
}

/* Adding Event Listeners */
//document.getElementById("menu-new-game").addEventListener("click", ));
//document.getElementById("menu-load-game").addEventListener("click", loadGame());
//document.getElementById("menu-option").addEventListener("click", show("options"));
//document.getElementById("menu-credits").addEventListener("click",show("credits"));
/*form Event listeners */
var charCreate = document.getElementById("create-character");
charCreate.addEventListener("click", function(event) {
    //Character Creation

    //collect data from form
    var charData = [document.getElementById("create-name").value, document.getElementById("create-class").value];
    console.log(charData);
    //TODO convert charData into an Object
    var text = 'Character Information: Name: ' + charData[0] + " Class: " + charData[1];
    document.getElementById("results").innerHTML = text;
    document.getElementById("results").classList.toggle("hide");
    //TODO display stats to the side (Diablo Style)
});
/* Initiating commands */
//var serverData = loadJSONDoc(); //Loads the JSON file to a JS Object



//Other people's code
//Matthew Crumley's make function
//Called like this
//make(["p", "Here is a ", ["a", { href:"http://www.google.com/" }, "link"], "."]);
//Displays:
//<p>Here is a <a href="http://www.google.com/">link</a>.</p>
function isArray(a) {
    return Object.prototype.toString.call(a) === "[object Array]";
}

function make(desc) {
    if (!isArray(desc)) {
        return make.call(this, Array.prototype.slice.call(arguments));
    }

    var name = desc[0];
    var attributes = desc[1];

    var el = document.createElement(name);

    var start = 1;
    if (typeof attributes === "object" && attributes !== null && !isArray(attributes)) {
        for (var attr in attributes) {
            el[attr] = attributes[attr];
        }
        start = 2;
    }

    for (var i = start; i < desc.length; i++) {
        if (isArray(desc[i])) {
            el.appendChild(make(desc[i]));
        }
        else {
            el.appendChild(document.createTextNode(desc[i]));
        }
    }

    return el;
}
