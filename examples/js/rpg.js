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
const MAINMENU = document.getElementById("menu-main");
const CHARCREATE = document.getElementById("char-creation");
const CHARCREATEBTN = document.getElementById("create-character");
const CHARCREATEFORM = document.getElementById("create-form");
const CREATEBACKBTN = document.getElementById("create-back");
const GAMESCREEN = document.getElementById("game-display");

//Character information in Sidebar
const CHARNAME = document.getElementById("p-name");
const PLAYERINFO = document.getElementById("player-info");
const PLAYERHEALTH = document.getElementById("p-hp");

//In-game navigation buttons
const NAVMENU = document.getElementById("menu-nav");
const DISPLAY = document.getElementById("display");

//Combat Buttons
const COMBATMENU = document.getElementById("combat-menu");

class Actor {
    //The actor is the most used object for this game. It defines Heroes and monsters and is the basis for every other living thing.
    constructor(name, health, attack, defense, gold) {
        this.name = name;
        this.maxhealth = health;
        this.health = health;
        this.attack = attack;
        this.defense = defense;
        //String showing what the person attacks with.
        this.gold = gold; //This is used as the gold available/looted upon death
    }
    //Inventory and Equipped Items may be held in a different object, however they do still belong to the character.
    //Stats have been cut for simplicity's sake
    displayActorStats() {

    }
    dealDamage(target) {
        var damage = (this.attack - target.defense);
        target.takeDamage(damage);
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
    constructor(name, health, attack, defense, gold) {
        super(name, health, attack, defense, gold);
        //Equipment and inventory may get canned.
        this.inventory = [
        ];
        this.equipped = [
            {
                "armor": "none",
                "protection": 0,
            },
            {
                "weapon": "none",
                "damage": 2
            }
        ];
    }
    displayStats() {
        CHARNAME.innerHTML = this.name;

        PLAYERHEALTH.innerHTML = this.health + "/" + this.maxhealth;
    }
    displayEquipment() {

    }
    displayInventory() {

    }
    /* save to localStorage */
    save() {
        localStorage.setItem("hero-name", hero.name);
        localStorage.setItem("hero-health", hero.maxhealth);
        localStorage.setItem("hero-attack", hero.attack);
        localStorage.setItem("hero-gold", hero.gold);
        localStorage.setItem("hero-inventory", hero.inventory);
        localStorage.setItem("hero-equipped", hero.name);
        console.log("Saved character: ", localStorage.getItem("hero-name"));
    }
    /* load from localStorage */
    load() {
        this.name = localStorage.getItem("hero-name");
        this.maxhealth = localStorage.getItem("hero-health");
        this.attack = localStorage.getItem("hero-attack");
        this.gold = localStorage.getItem("hero-gold");
        this.inventory = localStorage.getItem("hero-inventory");
        this.equipped = localStorage.getItem("hero-equpped");
        console.log("Hero loaded: ", hero);
        console.log(hero.name);
        this.displayStats();
    }
    toString() {
        var x = this.name;
        return x;

    }
}

/* FUNCTIONALITY */

function createCharFromForm() {
    //Character Creation

    //collect data from form
    hero.name = document.getElementById("create-name").value;
    //document.getElementById("create-profession").value];
    hero.displayStats();
    CHARCREATE.classList.toggle("hide");
    GAMESCREEN.classList.toggle("hide");
}

//Load and save
/* loadJSON -- Modified from w3schools*/
function loadJSONDoc() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            document.getElementById("display").innerHTML = this.responseText;
            return JSON.parse(this.responseText);
        }
    };
    xhttp.open("GET", "json/rpg-data.json", true);
    xhttp.send();
}


/* !!!!! EVENT HANDLERS !!!!! */
//Main menu event handler(probably more menus eventually)
function menu(e) {
    if (e.target && e.target.nodeName == "BUTTON") {
        //Do the things to the target
        var menuSelection = e.target.id;
        console.log(menuSelection);
        console.log("List item ", e.target.id.replace("post-", ""), " was clicked!");
        switch (menuSelection) {
            case "menu-new-game":
                MAINMENU.classList.toggle("hide");
                CHARCREATE.classList.toggle("hide");
                break;
            case "menu-load-game":
                MAINMENU.classList.toggle("hide");
                hero.load();
                GAMESCREEN.classList.toggle("hide");
                break;
            case "menu-option":
                //Show options as a modal or something
                break;
            case "menu-credits":
                //Show credits
                break;
            case "new-adventure":
                startCombat(goblin);
                break;
            case "to-town":
                //display shop
                break;
            case "save-game":
                hero.save();
                break;
            case "menu-back":
                showMain("game");
                break;
            default:
                //Do nothing (drop the event)
                break;
        }
    }
    e.stopPropagation();
}


function combatInput(e, monster) {
    if (e.target && e.target.nodeName == "BUTTON") {
        //Do the things to the target
        var menuSelection = e.target.id;
        console.log(menuSelection);
        console.log("List item ", e.target.id.replace("post-", ""), " was clicked!");
        switch (menuSelection) {
            case "combat-attack":
                hero.dealDamage(monster);
                monster.dealDamage(hero);
                break;
            case "combat-defend":
                hero.defense = hero.defense * 2;
                monster.dealDamage(hero);
                hero.defense = hero.defense / 2;
                break;
            case "combat-flee":
                var fleeChance = Math.floor(Math.random() * 10);
                if (fleeChance > 4) {
                    //60% chance flat
                    endCombat();
                } else {
                    //display failed attempt
                }

                break;
            default:
                //do nothing (drop the event)
                break;
        }
    }
    e.stopPropagation();
}

function startCombat(monster) {
    var intro = make(["p", "Before you stands a ", monster.name, ". It looks angry!"]);
    DISPLAY.appendChild(intro);
    // activate the event handler
    COMBATMENU.addEventListener("click", function(e) {
        combatInput(e, monster);
    }, false);
    // display the buttons
    COMBATMENU.classList.toggle("hide");


}

function endCombat() {

}

//Main Menu listener    ----    Parent based listener
document.getElementById("menu-main-list").addEventListener("click", menu, false);
NAVMENU.addEventListener("click", menu, false);
/*form Event listeners */
//Removes the ability to use the keypress and remaps to "submit" the form.
CHARCREATEFORM.onkeypress = function (e) {
    var key = e.charCode || e.keyCode || 0;
    if (key == 13) {
        e.preventDefault();
        createCharFromForm();
    }
};
CHARCREATEBTN.addEventListener("click", createCharFromForm);
CREATEBACKBTN.addEventListener("click", function () {
    showMain("char-create");
});

//MENUBACK.addEventListener("click", showMain);


/* ****** COMBAT ******* */




/*Utilities */

function showMain(currentView) {
    if (currentView === "char-create") {
        CHARCREATE.classList.toggle("hide");
        MAINMENU.classList.toggle("hide");
    } else if (currentView === "game") {
        GAMESCREEN.classList.toggle("hide");
        MAINMENU.classList.toggle("hide");
    }
}

/*This is my lightweight version of the make function below I may switch over once I feel comfortable with make's structure.*/
function newElement(element, text, parent) {
    //Pass parent by Element Id creates the element and appends it to another element.
    var el = document.createElement(element);
    var t = document.createTextNode(text);
    el.appendChild(t);
    document.getElementById(parent).appendChild(el);
}

//Other people's code
//Matthew Crumley's make function
//Called like this
//make(["p", "Here is a ", ["a", { href:"http://www.google.com/" }, "link"], "."]);
//Returns:
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
        } else {
            el.appendChild(document.createTextNode(desc[i]));
        }
    }

    return el;
}

/* Initiating commands */

//Pending on Object completion to allow for easy insertion
//var serverData = loadJSONDoc(); //Loads the JSON file to a JS Object

var hero = new Hero("Hadvar", 25, 5, 2, 20); //Placeholder object put Hero into Global scope. Also determines base stats.
var goblin = new Actor("Goblin", 5, 3, 1, 10);
