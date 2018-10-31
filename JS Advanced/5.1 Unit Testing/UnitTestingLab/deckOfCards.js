function printDeckOfCards(cards) {
    function makeCard(face, suit) {
        const validFaces = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];
        const validSuits = ["S", "H", "D", "C"];
        if (!validFaces.includes(face.toUpperCase())) {
            throw new Error(`Invalid card face: ${face}`);
        }
        if (!validSuits.includes(suit.toUpperCase())) {
            throw new Error(`Invalid card suit: ${suit}`);
        }
        let card = {
            face: face,
            suit: suit,
            toString: function () {
                let suitsToChar = {
                    "S": "\u2660",
                    "H": "\u2665",
                    "D": "\u2666",
                    "C": "\u2663"
                };
                return `${card.face}${suitsToChar[card.suit]}`;
            }
        };
        return card.toString();
    }
    let allCards = [];
    for (let card of cards) {
        try{
            let face, suit;
            if(card.length === 2){
                face = card[0];
                suit = card[1];
            } else {
                face = card[0] + card[1];
                suit = card[2];
            }
            let currentCard = makeCard(face, suit);
            allCards.push(currentCard);
        } catch(ex){
            console.log((`Invalid card: ${card}`));
        }
    }
    console.log(allCards.join(", "));
}

console.log(printDeckOfCards(['5S', '3D', 'QD', '1C']));
