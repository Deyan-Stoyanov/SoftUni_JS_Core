function scanTickets(str, info) {
    let nameRegex = /( [A-z][A-Za-z]*\-[A-z][A-Za-z]* )|( [A-z][A-Za-z]*\-[A-z][A-Za-z]*\.\-[A-z][A-Za-z]* )/gm;
    let airportRegex = / [A-Z]{3}\/[A-Z]{3} /gm;
    let flightNumberRegex = / [A-Z]{1,3}[0-9]{1,5} /gm;
    let companyRegex = /\ \- [A-Z][A-Za-z]*\*[A-Z][A-Za-z]* /gm;
    let passengerName = str.match(nameRegex)[0].replace(/\-/gmi, ' ').trim();
    let airportNames = str.match(airportRegex)[0].trim();
    let fromAirport = airportNames.split('/')[0];
    let toAirport = airportNames.split('/')[1];
    let flightNumber = str.match(flightNumberRegex)[0].trim();
    let companyName = str.match(companyRegex)[0].replace(/\*/gmi, ' ').replace(/\-/gmi, '').trim();
    switch (info.toLowerCase()) {
        case 'name':
            return `Mr/Ms, ${passengerName}, have a nice flight!`;
        case 'flight':
            return `Your flight number ${flightNumber} is from ${fromAirport} to ${toAirport}.`;
        case 'company':
            return `Have a nice flight with ${companyName}.`;
        case 'all':
            return `Mr/Ms, ${passengerName}, your flight number ${flightNumber} is from ${fromAirport} to ${toAirport}. Have a nice flight with ${companyName}.`;
        default:
            return '';
    }
}

console.log(scanTickets(' TEST-T.-TESTOV   SOF/VIE OS806 - Austrian*Airlines T24G55 STD11:15 STA11:50 ', 'all'));
