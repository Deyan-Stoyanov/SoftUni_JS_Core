function parseTickets(arr, sortingCriteria) {
    class Ticket {
        constructor(destination, price, status) {
            [this.destination, this.price, this.status] = [destination, price, status];
        }
    }
    let tickets = [];
    for (let str of arr) {
        let [destination, price, status] = str.split("|").filter(x => x !== "");
        let ticket = new Ticket(destination, +price, status);
        tickets.push(ticket);
    }
    let sortedTickets = tickets.sort((a, b) => {
        if(typeof a[sortingCriteria] == "number"){
            return a[sortingCriteria] - b[sortingCriteria];
        }
        return a[sortingCriteria].localeCompare(b[sortingCriteria]);
    });
    return sortedTickets;
}

console.log(parseTickets(['Philadelphia|94.20|available',
        'New York City|95.99|available',
        'New York City|95.99|sold',
        'Boston|126.20|departed'
    ],
    'destination'
));
