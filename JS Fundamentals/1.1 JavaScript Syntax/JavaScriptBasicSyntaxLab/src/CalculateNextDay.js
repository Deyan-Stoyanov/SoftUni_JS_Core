function addOneDayToDate(year, month, day) {
    let date = new Date(year, month - 1, day);
    let newDate = new Date(date);
    newDate.setDate(newDate.getDate() + 1);
    console.log(newDate.getFullYear() + '-' + (newDate.getMonth() + 1) + '-' + newDate.getDate());
}