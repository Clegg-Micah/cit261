//Selecting Elements
var CARDOUTPUT = document.getElementById("jsoutput");
var TABLE = document.getElementById("table");
//logic
var deck;
//var cardOutput = document.createElement("div");
var alertMessage = "Javascript Loaded!";
var suits = ["Spades", "Hearts", "Clubs", "Diamonds"];
var perSuit = 13;

//Constructor
function Card(value, suit, type) {
    console.log("Card function called.");
    //TODO make type catcher setting default did not work.
    this.value = value;
    this.suit = suit;
    if(typeof(type) === undefined) {
        this.type = "Number";
    }
    this.type = type;
}
function buildDeck() {
    var cards = [];
    var card = 1;
    for(var x = 0; x<suits.length; x++) {
        for (var y=0; y<perSuit; y++) {
            cards.push(card);
            card++;
        }
    }
    return cards;
}
//function buildDeck() {
//    console.log("buildDeck function called.");
//    var cards = [];
//    var card = 0;
//    for (var x=0; x<suits.length; x++) {
//        console.log("x loop", x);
//        console.log(suits.length);
//        for (var y=0; y<perSuit; y++) {
//            console.log("y loop", y);
//            cards.push(new Card(y, suits[x], "number"));
//
//            console.log(cards[card]);
//                switch(y) {
//                    case 0:
//                        cards[card].type = "Ace";
//                        break;
//                    case 10:
//                        cards[card].type = "Jack";
//                        break;
//                    case 11:
//                        cards[card].type = "Queen";
//                        break;
//                    case 12:
//                        cards[card].type = "King";
//                        break;
//            }
//            card++;
//            console.log(cards);
//        }
//        console.log(cards);
//        return cards;
//    }
//}
function displayDeck(deck) {
    console.log("displayDeck function called.");
    console.log(deck);
    var deckList = "";
    for (var x = 0; x < deck.length; x++) {
        deckList += deck[x] + " ";
        console.log("Card: " + deckList);
    }
    CARDOUTPUT.innerHTML = deckList;
}
function shuffle(array) {
    console.log("shuffle function called.");
    var currentIndex = array.length, temporaryValue, randomIndex;

    //while there are elements to shuffle...
    while(0 !== currentIndex) {

        //Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // Swap itwith the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}
/*
    TODO Create a function which displays the deck as a set of cards stored in divs.
*/
    alert(alertMessage);
deck = buildDeck();
displayDeck(deck);
deck = shuffle(deck);


