function timer() {
    let interval;
    $("#start-timer").on("click", function () {
        let time = 0;
        time += +($("#seconds").text());
        time += +($("#minutes").text()) * 60;
        time += +($("#hours").text()) * 3600;
        interval = setInterval(function () {
            time += 1;
            let seconds = time % 60;
            let minutes = Math.floor(time / 60);
            let hours = Math.floor(time / 3600);
            while(minutes > 60){
                minutes -= 60;
            }
            while(hours > 24){
                hours -= 24;
            }
            $("#seconds").text(seconds < 10 ? "0" + seconds : seconds);
            $("#minutes").text(minutes < 10 ? "0" + minutes : minutes);
            $("#hours").text(hours < 10 ? "0" + hours : hours);
        },
        1000);
    });
    $("#stop-timer").on("click", function () {
        clearInterval(interval);
    });
}
