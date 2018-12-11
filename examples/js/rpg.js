/*eslint-env browser, es6*/
/*Javascript for RPG
 * This is the core document which essentially will act like a main()
 * Some ES6 features are used.
    * Class
 */
/*--------TABLE OF CONTENTS-------
*   DOM Variables
*   CLASS DECLARATIONS
*   FUNCTIONALITY
*   EVENT HANDLERS
*   UTILITIES
*
*/

//TODO create an actual order to the code to make this mess make sense.

//Grabbing document elements for use in DOM manipulation
const STATBAR = document.getElementById("player-info");
const MAINMENU = document.getElementById("menu-main");
const CHARCREATE = document.getElementById("char-creation");
const CHARCREATEBTN = document.getElementById("create-character");
const CHARCREATEFORM = document.getElementById("create-form");
const GAMESCREEN = document.getElementById("game-display");


const CHARNAME = document.getElementById("p-name");
const PLAYERINFO = document.getElementById("player-info");


class Actor {
    //The actor is the most used object for this game. It defines Heroes and monsters and is the basis for every other living thing.
    constructor(name, health, attack, gold) {
        this.name = name;
        this.maxhealth = health;
        this.health = health;
        this.attack = attack;
        //String showing what the person attacks with.
        this.gold = gold; //This is used as the gold available/looted upon death
    }
    //Inventory and Equipped Items may be held in a different object, however they do still belong to the character.
    //Stats have been cut for simplicity's sake
    displayActorStats() {

    }
    dealDamage(target) {
        target.takedamage(this.attack);
    }

    takeDamage(damage) {
        this.health = this.health - damage;
        if (this.health <= 0) {
            console.log(this.name + " is dead!");
        }
    }
    //Get Functions
    //Attack
    //Armor
    //Equipped
    //Inventory
    //Gold
    //Stats
}
class Hero extends Actor {
    constructor(name, health, attack, gold) {
        super(name, health, attack, gold);
        this.inventory = [];
        this.equipped = [];
    }
    displayStats() {
        CHARNAME.innerHTML = this.name;
        //show health
        var hp = make(["li", ["span", "HP: ", this.health, "/", this.maxhealth]]);
        PLAYERINFO.appendChild(hp);
        console.log(STATBAR);
    }
    displayEquipment() {

    }
    displayInventory() {

    }
}

/* FUNCTIONALITY */


function createActor(targetActor, charData) {
   //Updates the player character with the new data from the character creation form
    targetActor.name = charData;
    targetActor
}
function createCharFromForm() {
    //Character Creation

    //collect data from form
    hero.name = document.getElementById("create-name").value;
    //document.getElementById("create-profession").value];
//    document.getElementById("results").innerHTML = text;
//    document.getElementById("results").classList.toggle("hide");
    //TODO display stats to the side during character creation(Diablo Style)
    //This will use createElement() to dynamically create it
    //There is no need to hardcode it. this can use one of the transitions.

    //Spit the character to the global variable
    hero.displayStats();
    CHARCREATE.classList.toggle("hide");
    GAMESCREEN.classList.toggle("hide");
}

/* !!!!! EVENT HANDLERS !!!!! */
//Main menu event handler(probably more menus eventually)
function menu(e, menuname) {
    if (e.target && e.target.nodeName == "BUTTON") {
        //Do the things to the target
        var menuSelection = e.target.id;
        console.log(menuSelection);
        console.log("List item ", e.target.id.replace("post-", ""), " was clicked!");
        switch(menuSelection) {
            case "menu-new-game":
                MAINMENU.classList.toggle("hide");
                CHARCREATE.classList.toggle("hide");
                break;
            case "menu-load-game":
                MAINMENU.classList.toggle("hide");
                hero.displayStats();
                GAMESCREEN.classList.toggle("hide");
                break;
            case "menu-option":
                //Show options as a modal or something
                break;
            case "menu-creadits":
                //Show credits
                break;
            default:
                //Do nothing (drop the event)
                break;
        }

    }
    e.stopPropagation();
}
//Main Menu listener    ----    Parent based listener
document.getElementById("menu-main-list").addEventListener("click", menu, false);
/*form Event listeners */
//Removes the ability to use the keypress
CHARCREATEFORM.onkeypress = function(e) {
    var key = e.charCode || e.keyCode || 0;
    if (key == 13) {
        e.preventDefault();
        createCharFromForm();
    }
}
CHARCREATEBTN.addEventListener("click", createCharFromForm);





/*Utilities */


/*This is my lightweight version of the make function below I may switch over once I feel comfortable with make's structure.*/
function newElement(element, text, parent) {
    //Pass parent by Element Id creates the element and appends it to another element.
    var el = document.createElement(element);
    var t = document.createTextNode(text);
    el.appendChild(t);
    document.getElementById(parent).appendChild(el)
}

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

/* Initiating commands */

//Pending on Object completion to allow for easy insertion
//var serverData = loadJSONDoc(); //Loads the JSON file to a JS Object

var hero = new Hero("Hadvar", 25, 5, 20); //Placeholder object put Hero into Global scope. Also determines base stats.
