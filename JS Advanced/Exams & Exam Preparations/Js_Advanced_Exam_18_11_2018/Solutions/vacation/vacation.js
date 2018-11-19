class Vacation {
    constructor(organizer, destination, budget) {
        this.organizer = organizer;
        this.destination = destination;
        this.budget = budget;
        this.kids = {};
    }

    registerChild(name, grade, budget) {
        if (budget < this.budget) {
            return `${name}'s money is not enough to go on vacation to ${this.destination}.`;
        }
        if (!this.kids.hasOwnProperty(grade)) {
            this.kids[grade] = [];
        }
        if (this.kids[grade].filter(x => x.includes(name)).length == 1) {
            return `${name} is already in the list for this ${this.destination} vacation.`;
        }
        this.kids[grade].push(`${name}-${budget}`);
        return this.kids[grade];
    }

    removeChild(name, grade) {
        if (!this.kids.hasOwnProperty(grade) || this.kids[grade].filter(x => x.includes(name)).length == 0) {
            return `We couldn't find ${name} in ${grade} grade.`;
        }
        this.kids[grade] = this.kids[grade].filter(x => !x.includes(name));
        return this.kids[grade];
    }

    get numberOfChildren() {
        return Array.from(Object.keys(this.kids)).map(x => this.kids[x].length).reduce((acc, cur) => {
            return acc + cur;
        }, 0);
    }

    toString() {
        if (this.numberOfChildren === 0) {
            return `No children are enrolled for the trip and the organization of ${this.organizer} falls out...`;
        }
        let grades = Array.from(Object.keys(this.kids)).sort((a, b) => {
            return a - b;
        });
        let str = `${this.organizer} will take ${this.numberOfChildren} children on trip to ${this.destination}\n`;
        for (let grade of grades) {
            if (this.kids[grade].length > 0) {
                str += `Grade: ${grade}\n`;
                for (let child in this.kids[grade]) {
                    str += `${+child + 1}. ${this.kids[grade][child]}\n`;
                }
            }
        }
        return str;
    }
}
