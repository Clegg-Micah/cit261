/*eslint-env browser, es6, console*/
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

//TODO Combat cleanup --> reset DONE reset has been accomplished by healing the monster, now the only thing left to do is to modularly set the stats of the monster, should be pretty easy with a setStats function belonging to the Actor Class
//TODO JSON --> build creatures from JSON
//TODO Town --> Resting, Buying items built from JSON
//TODO Options ---> CSS overhaul
//TODO Credits --> Video of scrolling text
//TODO Audio --> on attack, on rest, on purchase, on death (Character and otherwise)
//TODO Canvas --> Portrait or something
//TODO Animations --> Attack, TakeDamage(Screenshake), Waiting for all of that to happen, Menu animations,
//TODO Transitions --> 3 transitions from each view plus perhaps something for the console, make it write it out maybe.
//transforms

const JSONFILE = "../json/rpg-data.json";

//Grabbing document elements for use in DOM manipulation
const MAINMENU = document.getElementById("menu-main");
const CHARCREATE = document.getElementById("char-creation");
const CHARCREATEBTN = document.getElementById("create-character");
const CHARCREATEFORM = document.getElementById("create-form");
const CREATEBACKBTN = document.getElementById("create-back");
const GAMESCREEN = document.getElementById("game-display");
const CONSOLE = document.getElementById("console");
const LOADBTN = document.getElementById("menu-load-game");

//Character information in Sidebar
const CHARNAME = document.getElementById("p-name");
const PLAYERINFO = document.getElementById("player-info");
const PLAYERHEALTH = document.getElementById("p-hp");
const PLAYERGOLD = document.getElementById("p-gold");

//In-game navigation buttons
const INGAMEBUTTONS = document.getElementsByClassName("ingame-button");
const NAVMENU = document.getElementById("menu-nav");
const DISPLAY = document.getElementById("display");
const DISPLAYIMG = document.getElementById("picture-box");

//Combat elements
const COMBATBUTTONS = document.getElementsByClassName("combat-button");
const COMBATMENU = document.getElementById("combat-menu");
const COMBATTEXT = document.getElementById("combat-text");

//Town elements
const TOWNINTERFACE = document.getElementById("town-interface");
const REST = document.getElementById("rest");

//Globals to "turn off" Event handlers
var inputPause = false; //True turns navigation buttons off and turns combat on
var loadbtnset = localStorage.getItem("saved");

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
    dealDamage(target) {
        gameConsoleLog(["p", this.name, " attacks ", target.name, "."]);
        var damage = (this.attack - target.defense);
        if (damage < 0) {
            damage = 0;
        }
        if (target.name === "Goblin") {
            DISPLAYIMG.classList.toggle("slash");
            setTimeout(function () {
                DISPLAYIMG.classList.toggle("slash");
            }, 1000);
        }
        if (this.name === "Goblin") {
            GAMESCREEN.classList.toggle("shake");
            setTimeout(function () {
                GAMESCREEN.classList.toggle("shake");
            }, 250);
        }
        target.takeDamage(damage);
    }


    takeDamage(damage) {
        this.health -= damage;
        gameConsoleLog(["p", this.name, " takes ", damage, " damage."]);
        if (this.health <= 0) {
            console.log(this.name + " is dead!");
            gameConsoleLog(["p", this.name, " has died!"]);
            this.health = 0;
        }

    }
    giveGold(gold) {
        this.gold = Number(this.gold) + gold;
        gameConsoleLog(["p", this.name, " takes ", gold, " gold pieces!"]);
    }
    payGold(gold) {
        var canPay = true;
        this.gold = Number(this.gold) - gold;
        if (this.gold < 0) {
            canPay = false;
            this.gold = Number(this.gold) + gold;
            gameConsoleLog(["p", this.name, " cannot pay for that!"]);
        } else {
            canPay = true;
            gameConsoleLog(["p", this.name, " pays ", gold, " gold pieces!"]);
        }
        return canPay;
    }
    heal(healamount) {
        this.health = Number(this.health) + healamount;
        if (this.health > this.maxhealth) {
            this.health = this.maxhealth;
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
        PLAYERGOLD.innerHTML = this.gold;
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
        localStorage.setItem("saved", "true");
        console.log("Saved character: ", localStorage.getItem("hero-name"));
        gameConsoleLog(["p", "Game Saved!"]);
        setInterval(hero.save(), 60000);
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
        gameConsoleLog(["p", this.name, " Loaded!"]);
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
    hero.save();
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
            DISPLAY.innerHTML = this.responseText;
            console.log(JSON.parse(this.responseText));
        } else {
            console.log("JSON was unsuccessful");
        }
    };
    xhttp.open("GET", "json/rpg-data.json", true);
    xhttp.send();
}


/* !!!!! EVENT HANDLERS !!!!! */


function startCombat() {
    toggleInputPause();

    //Choose random monster
    //Setup monster from JSON data
    console.log("monster stats", monster.health);
    var intro = "Before you stands a " + monster.name + ". It looks angry!";
    COMBATTEXT.innerHTML = intro;
    COMBATTEXT.classList.toggle("hide");
    //Display img's source gets whatever image is related to the monster.
    DISPLAYIMG.classList.toggle("hide");
    // display the buttons
    COMBATMENU.classList.toggle("hide");

    //Problem with the faulty logic was the event listeners not being properly turned on and off so instead I went with the approach of relying upon toggleInputPause to 'Turn' them on and off
}

function endCombat(monster) {
    toggleInputPause();
    //remove monster / reset monster

    //
    if (monster.name === "Goblin") {
        DISPLAYIMG.classList.toggle("flash");
        setTimeout(function () {
            DISPLAYIMG.classList.toggle("flash");
            COMBATMENU.classList.toggle("hide");
            COMBATTEXT.classList.toggle("hide");
            DISPLAYIMG.classList.toggle("hide");
        }, 2000);
    }
}

//Main Menu listener    ----    Parent based listener
document.getElementById("menu-main-list").addEventListener("click", menu, false);
NAVMENU.addEventListener("click", menu, false);

//Set the return key to "submit" the char-create form
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
COMBATMENU.addEventListener("click", function (e) {
    combatInput(e);
}, false);

REST.addEventListener("click", menu, false);
//Main menu event handler(probably more menus eventually)
function menu(e) {
    if (inputPause === true) {
        //De nothing
    } else if (e.target && e.target.nodeName == "BUTTON") {
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
                TOWNINTERFACE.classList.add("hide");
                startCombat();
                break;
            case "to-town":
                TOWNINTERFACE.classList.toggle("hide");
                break;
            case "rest":
                if (hero.payGold(5)) {
                    if (hero.health === hero.maxhealth) {
                        gameConsoleLog(["p", hero.name, " is already at max health"]);
                    } else {
                        hero.heal(999);
                        hero.displayStats();
                    }
                }
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

function combatInput(e) {
    if (inputPause === false) {
        //Do nothing
    } else if (e.target && e.target.nodeName == "BUTTON") {
        //Do the things to the target
        var menuSelection = e.target.id;
        console.log(menuSelection);
        console.log("List item ", e.target.id.replace("post-", ""), " was clicked!");
        switch (menuSelection) {
            case "combat-attack":
                hero.dealDamage(monster);
                //After 2 monsters they don't regen health. Weird.
                if (monster.health > 0) {
                    monster.dealDamage(hero);
                    hero.displayStats();
                } else if (monster.health <= 0) {
                    hero.giveGold(monster.gold);
                    hero.displayStats();
                    monster.heal(999);
                    endCombat(monster);
                }
                break;
            case "combat-defend":
                hero.defense = hero.defense * 2;
                monster.dealDamage(hero);
                hero.defense = hero.defense / 2;
                hero.displayStats();
                break;
            case "combat-flee":
                var fleeChance = Math.floor(Math.random() * 10);
                if (fleeChance > 2) {
                    //80% chance flat
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

function toggleInputPause() {
    inputPause = !inputPause;

    for (var x = 0; x < INGAMEBUTTONS.length; x++) {
        INGAMEBUTTONS[x].classList.toggle("disabled");
    }
    for (var y = 0; y < COMBATBUTTONS.length; y++) {
        COMBATBUTTONS[y].classList.toggle("disabled");
    }
    console.log("input toggled!");
}

//MENUBACK.addEventListener("click", showMain);


/* ****** COMBAT ******* */




/*Utilities */
function gameConsoleLog(data) {
    var results = make(data);
    CONSOLE.appendChild(results);
    CONSOLE.scrollTop = CONSOLE.scrollHeight;
}

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

function removeElement(elementId) {
    // Removes an element from the document
    var element = document.getElementById(elementId);
    element.parentNode.removeChild(element);
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

function getData(target) {
    console.log("target is: " + target);
    fetch(JSONFILE)
        .then(response => response.json())
        .then(function (data) {

            console.log("This is the Json Object in the getData function");
            console.log(data);
            console.log("This is JSON's target" + data[target]);
            //        Catch garbage and place placeholder title
            if (target == "undefined" || target.includes("<ul>")) {
                //DO something
            }
            data = data[target];
            console.log("Inside of data target");
            console.log(data);
            serverData = JSON.parse(data);
            console.log(serverData);
        })

        .catch(error => console.log('Error:', error));
}


/* Initiating commands */

//Pending on Object completion to allow for easy insertion
getData("monsters"); //Loads the JSON file to a JS Object
var hero = new Hero("Hadvar", 25, 5, 2, 20); //Placeholder object put Hero into Global scope. Also determines base stats.
let monster = new Actor("Goblin", 5, 3, 1, 10);
if (loadbtnset === "true") {
    LOADBTN.classList.toggle("disabled");
}

