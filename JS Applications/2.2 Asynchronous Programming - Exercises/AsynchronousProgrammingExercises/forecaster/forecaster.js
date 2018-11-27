function attachEvents() {
    $("#submit").on("click", function () {
        $("#forecast").css("display", "block");
        $.get("https://judgetests.firebaseio.com/locations.json")
            .then(getWeather)
            .catch(displayError);

        function getWeather(arr) {
            let location = $("location").val();
            let code = "";
            for (let obj of arr) {
                if (obj.location == location) {
                    code = obj.code;
                    break;
                }
            }
            $.get(`https://judgetests.firebaseio.com/forecast/today/${code}.json`)
                .then(displayToday)
                .catch(displayError);

            $.get(`https://judgetests.firebaseio.com/forecast/upcoming/${code}.json`)
                .then(displayThreeDays)
                .catch(displayError);

            let weather = {
                "Sunny": "&#x2600;",
                "Partly sunny": "&#x26C5;",
                "Overcast": "&#x2601;",
                "Rain": "&#x2614;",
            };

            function displayToday(obj) {
                $("#current").empty();
                $("#current").append($("<div class=\"label\"></div>").text("Current conditions"));
                $("#current").append($("<span class=\"condition symbol\"></span>").html(weather[obj.forecast.condition]));
                let condition = ($("<span class=\"condition\"></span>"));
                $(condition).append($("<span class=\"forecast-data\"></span>").text(obj.name));
                $(condition).append($("<span class=\"forecast-data\"></span>").html(obj.forecast.high + "&#176;/" + obj.forecast.low + "&#176;"));
                $(condition).append($("<span class=\"forecast-data\"></span>").text(obj.forecast.condition));
                $("#current").append(condition);
            }

            function displayThreeDays(obj) {
                $("#upcoming").empty();
                $("#upcoming").append($("<div class=\"label\"></div>").text("Three-day forecast"));
                for (let f of obj.forecast) {
                    let span = $("<span class=\"upcomming\"></span>");
                    $(span).append($("<span class=\"symbol\"></span>").html(weather[f.condition]));
                    $(span).append($("<span class=\"forecast-data\"></span>").html(f.high + "&#176;/" + f.low + "&#176;"));
                    $(span).append($("<span class=\"forecast-data\"></span>").text(f.condition));
                    $("#upcoming").append(span);
                }
            }
        }

        function displayError(err) {
            $("#forecast").append("<span>").text("Error");
        }
    });
}
