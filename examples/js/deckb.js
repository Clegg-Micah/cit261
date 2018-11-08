//Selecting Elements
var CARDOUTPUT = document.getElementById("jsoutput");
var TABLE = document.getElementById("table");
//logic
var deck;
var deck_shuffled;
//var cardOutput = document.createElement("div");
var alertMessage = "Javascript Loaded!";
var suits = ["Spades", "Hearts", "Clubs", "Diamonds"];
var perSuit = 13;

//Constructor
function Card(value, suit) {
    console.log("Card function called.");
    //TODO make type catcher setting default did not work.
    this.value = value;
    this.suit = suit;
    if(value == 1) {
        this.type = "Ace";
    } else if (value < 11) {
        this.type = "Number";
    } else {
        switch(value) {
            case 11:
                this.type = "Jack";
                break;
            case 12:
                this.type = "Queen";
                break;
            case 13:
                this.type = "King";
                break;
            default:
                this.type = undefined;
                console.warn("Invalid Card Value: " + value);
        }
    }
}
function buildDeck() {
    var cards = [];
    var card = 1;
    for(var x = 0; x<suits.length; x++) {
        for (var y=0; y<perSuit; y++) {
            cards.push(new Card(y+1, suits[x]));
        }
    }
    return cards;
}
/*
function buildDeck() {
    console.log("buildDeck function called.");
    var cards = [];
    var card = 0;
    for (var x=0; x<suits.length; x++) {
        console.log("x loop", x);
        console.log(suits.length);
        for (var y=0; y<perSuit; y++) {
            console.log("y loop", y);
            cards.push(new Card(y, suits[x], "number"));

            console.log(cards[card]);
                switch(y) {
                    case 0:
                        cards[card].type = "Ace";
                        break;
                    case 10:
                        cards[card].type = "Jack";
                        break;
                    case 11:
                        cards[card].type = "Queen";
                        break;
                    case 12:
                        cards[card].type = "King";
                        break;
            }
            card++;
            console.log(cards);
        }
        console.log(cards);
        return cards;
    }
}
*/
function displayDeck(deck, destination) {
    console.log("displayDeck function called.");
    console.log(deck);
    var deckList = "";
    for (var x = 0; x < deck.length; x++) {
        deckList += displayCard(deck[x]);
    }
    console.log(deckList);
    destination.innerHTML = deckList;
}
function displayCard(card) {
    var text = "";
    var x;
    if( card.type.toLowerCase() == "number") {
        text += card.value + " of " + card.suit;
    } else {
        text += card.type + " of " + card.suit;
    }
    text += ", ";
    return text;
}
function shuffle(array) {
    console.log("shuffle function called.");
    var currentIndex = array.length;
    var temporaryValue;
    var randomIndex;
    var newArray = array.slice();
    //while there are elements to shuffle...
    while(0 !== currentIndex) {

        //Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // Swap itwith the current element.
        temporaryValue = newArray[currentIndex];
        newArray[currentIndex] = newArray[randomIndex];
        newArray[randomIndex] = temporaryValue;
    }
    console.log("Shuffled Array: ", newArray);
    return newArray;
}
/*
    TODO Create a function which displays the deck as a set of cards stored in divs.
*/
    alert(alertMessage);
deck = buildDeck();
displayDeck(deck, CARDOUTPUT);
deck_shuffled = shuffle(deck);
displayDeck(deck_shuffled, TABLE);



