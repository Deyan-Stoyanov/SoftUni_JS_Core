function attachEventsListeners(){
    function fillInputFields(days, hours, minutes, seconds, daysInput, hoursInput, minutesInput, secondsInput){
        daysInput.value = Math.round(days * 10) / 10;
        hoursInput.value = Math.round(hours * 10) / 10;
        minutesInput.value = Math.round(minutes * 10) / 10;
        secondsInput.value = Math.round(seconds * 10) / 10;
    }
    let daysInput = document.getElementById('days');
    let hoursInput = document.getElementById('hours');
    let minutesInput = document.getElementById('minutes');
    let secondsInput = document.getElementById('seconds');

    let days;
    let hours;
    let minutes;
    let seconds;

    document.getElementById('daysBtn').addEventListener('click', () => {
        days = +daysInput.value;
        hours = days * 24;
        minutes = hours * 60;
        seconds = minutes * 60;
        fillInputFields(days, hours, minutes, seconds, daysInput, hoursInput, minutesInput, secondsInput);
    });

    document.getElementById('hoursBtn').addEventListener('click', () => {
        hours = +hoursInput.value;
        days = hours / 24;
        minutes = hours * 60;
        seconds = minutes * 60;
        fillInputFields(days, hours, minutes, seconds, daysInput, hoursInput, minutesInput, secondsInput);
    });

    document.getElementById('minutesBtn').addEventListener('click', () => {
        minutes = +minutesInput.value;
        hours = minutes / 60;
        days = hours / 24;
        seconds = minutes * 60;
        fillInputFields(days, hours, minutes, seconds, daysInput, hoursInput, minutesInput, secondsInput);
    });

    document.getElementById('secondsBtn').addEventListener('click', () => {
        seconds = +secondsInput.value;
        minutes = seconds / 60;
        hours = minutes / 60;
        days = hours / 24;
        fillInputFields(days, hours, minutes, seconds, daysInput, hoursInput, minutesInput, secondsInput);
    });
}
