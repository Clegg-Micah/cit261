const CARDOUTPUT = document.getElementById("jsoutput");
var deck = buildDeck(52);

function buildDeck(length) {
    var cards = [];
    for(var x=0; x<length; x++) {
        cards[x] = x+1;
        console.log(cards[x]);
    }
    return cards;
}

function displayDeck(deck) {
    CARDOUTPUT.innerHTML(deck);
}
