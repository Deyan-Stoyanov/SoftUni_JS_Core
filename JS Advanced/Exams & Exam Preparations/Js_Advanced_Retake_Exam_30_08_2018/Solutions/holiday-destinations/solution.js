function addDestination() {
    let inputData = $(".inputData");
    let city = $(inputData[0]).val();
    let country = $(inputData[1]).val();
    let season = $("#seasons option:selected").text();
    if (city != "" && country != "") {
        let tr = $("<tr>")
            .append($("<td>").text(`${city}, ${country}`))
            .append($("<td>").text(season));
        $("#destinationsList").append(tr);
    }
    $("#" + season.toLowerCase()).val(+$("#" + season.toLowerCase()).val() + 1);
    $(".inputData").val("");
}
