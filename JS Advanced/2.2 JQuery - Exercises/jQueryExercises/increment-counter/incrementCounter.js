function increment(element) {
    let container = $(element);
    let fragment = document.createDocumentFragment();
    let textarea = $("<textarea>");
    textarea.addClass("counter");
    textarea.val("0");
    textarea.attr("disabled", "true");
    let incrementButton = $("<button>");
    incrementButton.addClass("btn");
    incrementButton.text("Increment");
    incrementButton.attr("id", "incrementBtn");
    let addButton = $("<button>");
    addButton.addClass("btn");
    addButton.text("Add");
    addButton.attr("id", "addBtn");
    let ul = $("<ul>");
    ul.addClass("results");
    $(incrementButton).on("click", function () {
        textarea.val(+textarea.val() + 1);
    });
    $(addButton).on("click", function () {
        let li = $("<li>" + textarea.val() + "</li>");
        li.appendTo(ul);
    });
    textarea.appendTo(fragment);
    incrementButton.appendTo(fragment);
    addButton.appendTo(fragment);
    ul.appendTo(fragment);
    container.append(fragment);
}
