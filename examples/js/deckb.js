//Canvas stuff
var GAME = document.getElementById("game");
var ctx = GAME.getContext("2d");
//Selecting Elements
var CARDOUTPUT = document.getElementById("jsoutput");
//logic
var deck = buildDeck(52);
//var cardOutput = document.createElement("div");
var alertMessage = "Javascript Loaded!";
var suits = ["Spades", "Hearts", "Clubs", "Diamonds"];

//Constructor
alert(alertMessage);
function Card(value, suit, type = "Number") {

    //TODO make type catcher setting default did not work.
    this.value = value;
    this.suit = suit;
    this.type = type;
}
alert(alertMessage);
function buildDeck(length, suitList=["Spades", "Hearts", "Clubs", "Diamonds"], perSuit=13) {
    var cards = [];
    for (var x=0; x<suitList.length; x++) {
        for( y=0; y<perSuit y++) {
            if(y!=0 && y<10) {
                cards[x*y+y] = new Card(y+1, suitList[x]);
            } else {
                switch(y) {
                    case 0:
                        cards[x*y+y] = new Card(y+1, suitList[x], "Ace")
                        break;
                    case 10:
                        cards[x*y+y] = new Card(y+1, suitList[x], "Jack")
                        break;
                    case 11:
                        cards[x*y+y] = new Card(y+1, suitList[x], "Queen")
                        break;
                    case 12:
                        cards[x*y+y] = new Card(y+1, suitList[x], "King")
                        break;
                }
            }
        }
        console.log(cards);
    }
    return cards;
}
alert(alertMessage);
function displayDeck(deck) {
    var deckList = "";
    var x=0;
    for (x in deck) {
        deckList += deck[x] + " ";
    }
    CARDOUTPUT.innerHTML = deckList;
}
alert(alertMessage);
function shuffle(array) {
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
function createCards(deck) {
    var x = 0;
    for (x in deck) {
        if
    }
}
    alert(alertMessage);
displayDeck(deck);
deck = shuffle(deck);

