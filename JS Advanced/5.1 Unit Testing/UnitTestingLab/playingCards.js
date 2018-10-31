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

console.log(makeCard('A', 'S'));
