class Rat {
    constructor(name) {
        this.name = name;
        this.unitedRats = [];
        Object.seal(this);
    }
    unite(rat) {
        if (rat instanceof Rat) {
            this.unitedRats.push(rat);
        }
    }
    getRats() {
        return this.unitedRats;
    }
    toString() {
        let str = this.name;
        for (let rat of unitedRats) {
            str += `\n##${rat.name}`;
        }
        return str;
    }
}
