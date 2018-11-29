function attachEvents() {
    $("#btnLoadTowns").on("click", function () {
        $("#root").empty();
        let towns = $("#towns").val().split(", ").filter(x => x != "").map(x => {
            return {
                "townName": x
            };
        });
        let finalData = {
            "towns": towns
        };
        $.get('towns-template.hbs', function (source) {
            let template = Handlebars.compile(source);
            let html = template(finalData);
            $("#root").html(html);
        }, 'html');
    });
}
