() => {
    class Balloon{
        constructor(color, gasWeight){
            this.color = color;
            this.gasWeight = gasWeight;
        }
    }

    class PartyBalloon extends Balloon{
        constructor(color, weight, ribbonColor, ribbonLength){
            super(color, weight);
            this.ribbonColor = ribbonColor;
            this.ribbonLength = ribbonLength;
        }
        get ribbon(){
            return {
                color: this.ribbonColor,
                length: this.ribbonLength
            };
        }
    }

    class BirthdayBalloon extends PartyBalloon{
        constructor(color, weight, ribbonColor, ribbonLength, text){
            super(color, weight, ribbonColor, ribbonLength);
            this.text = text;
        }
        get text(){
            return this._text;
        }

        set text(newText){
            this._text = newText;
        }
    }

    return {
        Balloon,
        PartyBalloon,
        BirthdayBalloon
    };
};
