$(() => {
    renderCatTemplate();

    function renderCatTemplate() {
        $("#allCats").empty();
        let finalCats = {
            "cats": window.cats
        };
        $.get("cat-template.hbs", function (source) {
            let template = Handlebars.compile(source);
            let html = template(finalCats);
            $("#allCats").html(html);
            $(".btn.btn-primary").on("click", function () {
                if ($(this).text() == "Show status code") {
                    $(this).text("Hide status code");
                    $(this).next().css("display", "block");
                } else {
                    $(this).text("Show status code");
                    $(this).next().css("display", "none");
                }
            });
        }, "html");
    }
});
