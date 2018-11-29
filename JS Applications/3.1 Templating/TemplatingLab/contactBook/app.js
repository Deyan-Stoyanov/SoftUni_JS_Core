(() => {
    let finalData;
    $.getJSON("data.json", function (dataSource) {
        finalData = {
            "contacts": dataSource
        };
    });
    $.get("./templates/contacts.hbs", function (contactTemplateSource) {
        let contactTemplate = Handlebars.compile(contactTemplateSource);
        let html = contactTemplate(finalData);
        $("#list").append(html);
    }, "html");
    $.get("./templates/partials/personalContacts.hbs", function (contactPartialTemplateSource) {
        Handlebars.registerPartial("personalContacts", contactPartialTemplateSource);
    }, "html");
    $.get("./templates/partials/personalInfo.hbs", function (infoPartialTemplateSource) {
        Handlebars.registerPartial("personalInfo", infoPartialTemplateSource);
    }, "html");
    $.get("./templates/details.hbs", function (detailsTemplateSource) {
        const detailsTemplate = Handlebars.compile(detailsTemplateSource);
        $(".contact").on("click", function () {
            $(".content > div").removeClass("contactSelected");
            $(this).addClass("contactSelected");
            let index = $(this).attr("data-id");
            let result = detailsTemplate(finalData.contacts[index]);
            $("#details > div").remove();
            $("#details").append(result);
        });
    }, "html");
})();
