function lastDateFromPreviousMonth([day, month, year]) {
    let date = new Date(year, month - 1, 0);
    let lastDay = date.getDate();
    console.log(lastDay);
}

lastDateFromPreviousMonth([17, 3, 2002]);
