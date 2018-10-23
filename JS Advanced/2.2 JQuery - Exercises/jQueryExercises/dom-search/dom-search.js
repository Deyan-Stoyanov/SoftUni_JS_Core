function domSearch(identifier, isCaseSensitive) {
    let div = $("<div>");
    div.addClass("add-controls");
    let label = $("<label>Enter text: <input></label>");
    label.appendTo(div);
    let insertButton = $("<a>Add</a>");
    insertButton.addClass("button");
    insertButton.css("display", "inline-block");
    insertButton.appendTo(div);
    div.appendTo($(identifier));

    let searchControlDiv = $("<div>");
    searchControlDiv.addClass("search-controls");
    let searchLabel = $("<label>Search: </label>");
    let input = $("<input>");
    $(input).on("input", function () {
        let value = $(".search-controls input").val();
        let items = $(`${identifier} strong`).toArray();
        for (let i of items) {
            let current = $(i);
            if (isCaseSensitive) {
                if ($(current).text().includes(value)) {
                   current.parent().css("display", "block");
                } else {
                    current.parent().css("display", "none");
                }

            } else {
                if ($(current).text().toLowerCase().includes(value.toLowerCase())) {
                    current.parent().css("display", "block");
                } else {
                    current.parent().css("display", "none");
                }
            }
        }

    });
    input.appendTo(searchLabel);
    searchLabel.appendTo(searchControlDiv);
    searchControlDiv.appendTo($(identifier));

    let resultControlDiv = $("<div>");
    resultControlDiv.addClass("result-controls");
    let ul = $("<ul>");
    ul.addClass("items-list");
    ul.appendTo(resultControlDiv);
    resultControlDiv.appendTo($(identifier));

    $(".add-controls a").on("click", function () {
        let item = $("<li>");
        item.addClass("list-item");
        let deleteButton = $("<a>X</a>");
        deleteButton.addClass("button");
        deleteButton.on("click", function () {
            $(this).parents("li").remove();
        });
        deleteButton.appendTo(item);
        let element = $("<strong>" + $(".add-controls input").val() + "</strong>");
        element.appendTo(item);
        item.appendTo($(".items-list"));
    });


}
