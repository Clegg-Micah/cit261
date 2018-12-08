/*eslint-env browser, es6*/
/*Javascript for RPG
 * This is the core document which essentially will act like a main()
 * Some ES6 features are used.
 */
//TODO change Character into an object constructor: https://www.w3schools.com/js/js_object_constructors.asp

function Character(name, profession, level){
    name: "",
    profession: "",
    level: 0,
        //Inventory and Equipped Items may be held in a different object, however they do still belong to the character.
    inventory: [],
    equipped: [],
    //Stats are built from profession
    str: 0,
    agi: 0,
    end: 0,
    pow: 0,
    maxhp: function () {
        var max = this.end * 2 * this.level;
        return max;
    },
    currenthp: 0,
    maxmp: character.pow * 2 * character.level,
    currentmp: 0
};
//Get Functions
//Attack
//Armor
//Equipped
//Inventory
//Gold
//Stats


//setEquipment
//class Character {
//    constructor(name, profession, level) {
//        this.name = name;
//        this.profession = profession;
//        this.level = level;
//        var inventory = [];
//        var equipped = [];
//    }
//Get Functions
//Attack
//Armor
//Equipped
//Inventory
//Gold
//Stats


//setEquipment

//}

var STATBAR = document.getElementById("player-info");
var MAINMENU = document.getElementById("main-menu");
var CHARCREATE = document.getElementById("char-creation");

/* Main menu funtionality */
function createCharacter(charData, level) {
    //TODO implement Character constructor
    character = new
    character.name = charData[0];
    character.profession = charData[1];
    character.level = level;

    //TODO This part will probably become a prototype of the constructor
    switch (character.profession) {
        case "Warrior":
            character.strength = 7;
            character.agility = 5;
            character.endurance = 7;
            character.pow = 3;
            break;
        case "Ranger":
            character.strength = 5;
            character.agility = 7;
            character.endurance = 5;
            character.pow = 5;
            break;
        default:
            character.strength = 5;
            character.agility = 5;
            character.endurance = 5;
            character.pow = 5;
    }
    displayStats();
}



function displayStats() {
    newElement("li", character.currenthp + " / " + character.maxhp, "player-info");
    console.log(STATBAR);
}

function newElement(element, text, parent) {
    //Pass parent by Element Id creates the element and appends it to another element.
    var el = document.createElement(element);
    var t = document.createTextNode(text);
    el.appendChild(t);
    document.getElementById(parent).appendChild(el)
}

/* display monster */

/* show function accepts a string which determines which element/window
    Called as part of the main-menu event handler*/
//function show(targetElement) {
//    console.log("Showing", targetElement);
//    switch (targetElement) {
//        case "char-creation":
//            MAINMENU.classList.toggle("hide");
//            CHARCREATE.classList.toggle("hide");
//            break;
//        case "options":
//            break;
//        case "credits":
//
//            break;
//    }
//}
function menu(e) {
    if (e.target !== e.currentTarget) {
        //Do the things to the target
        var menuSelection = e.target.id;
        console.log(menuSelection);
        alert("Main menu selected: " + menuSelection);
    }
    e.stopPropagation();
}

function newGame() {
    show("char-creation");

}

/* Adding Event Listeners */
//Main Menu listener    ----    Parent based listener
document.getElementById("menu-main-list").addEventListener("click", menu, false);
/*form Event listeners */
var charCreate = document.getElementById("create-character");
charCreate.addEventListener("click", function () {
    //Character Creation

    //collect data from form
    var charData = [document.getElementById("create-name").value, document.getElementById("create-profession").value];
    console.log(charData);
    //TODO convert charData into an Object
    var text = 'Character Information: Name: ' + charData[0] + " Profession: " + charData[1];
    document.getElementById("results").innerHTML = text;
    document.getElementById("results").classList.toggle("hide");
    //TODO display stats to the side (Diablo Style)
    //This will use createElement() to dynamically create it
    //There is no need to hardcode it.

    //Spit the character to the global variable
    createCharacter(charData);
});
/* Initiating commands */
//var serverData = loadJSONDoc(); //Loads the JSON file to a JS Object



//Other people's code
//Matthew Crumley's make function
//Called like this
//make(["p", "Here is a ", ["a", { href:"http://www.google.com/" }, "link"], "."]);
//Displays:
//<p>Here is a <a href="http://www.google.com/">link</a>.</p>
//function isArray(a) {
//    return Object.prototype.toString.call(a) === "[object Array]";
//}

//function make(desc) {
//    if (!isArray(desc)) {
//        return make.call(this, Array.prototype.slice.call(arguments));
//    }
//
//    var name = desc[0];
//    var attributes = desc[1];
//
//    var el = document.createElement(name);
//
//    var start = 1;
//    if (typeof attributes === "object" && attributes !== null && !isArray(attributes)) {
//        for (var attr in attributes) {
//            el[attr] = attributes[attr];
//        }
//        start = 2;
//    }
//
//    for (var i = start; i < desc.length; i++) {
//        if (isArray(desc[i])) {
//            el.appendChild(make(desc[i]));
//        }
//        else {
//            el.appendChild(document.createTextNode(desc[i]));
//        }
//    }
//
//    return el;
//}
