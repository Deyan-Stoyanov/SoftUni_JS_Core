function matchDates(arrOfDates) {
    let regex = /^[1-3]?[0-9]\-[A-Z][a-z]{2}\-[1-2][0-9]{3}$/;
    arrOfDates = arrOfDates.join(' ').split(/[.\s\t]/g);
    arrOfDates = arrOfDates.filter(x => regex.test(x) === true);
    for (let date of arrOfDates) {
        let data = date.split('-').map(x => x.trim());
        console.log(`${date} (Day: ${data[0]}, Month: ${data[1]}, Year: ${data[2]})`);
    }
}

matchDates(['I dont know what to test anymore so here are some random dates.',
    '15-May-1996',
    '21-June-995',
    '31-February-3000',
    'woops that was invalid...',
    '111-Nov-2332',
    '01-January-0001',
    'What the fuck',
    '11-Sep-2001',
    'One minute of silence!'
]);
