function attachEvents(){
    $("#items").on("click", "li", function () {
        if($(this).hasClass("selected")){
            $(this).removeClass("selected");
            $(this).css("background", "");
        } else {
            $(this).addClass("selected");
            $(this).css("background", "#DDD");
        }
    });
    $("#showTownsButton").on("click", function() {
        $("#selectedTowns").text("Selected towns: " + $("#items li.selected").toArray().map(x => x.textContent).join(", "));
    });
}
