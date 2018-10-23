let createBook = (function generate() {
    let id = 1;

    return function (selector, title, author, number) {
        let container = $("<div>");
        container.attr("id", "book" + id++);

        let titlePar = $("<p>" + title + "</p>");
        titlePar.addClass("title");
        container.append(titlePar);

        let authorPar = $("<p>" + author + "</p>");
        authorPar.addClass("author");
        container.append(authorPar);

        let isbnPar = $("<p>" + number + "</p>");
        isbnPar.addClass("isbn");
        container.append(isbnPar);

        let selectButton = $("<button>Select</button>");
        selectButton.on("click", function () {
            container.css("border", "2px solid blue");
        });
        container.append(selectButton);

        let deselectButton = $("<button>Deselect</button>");
        deselectButton.on("click", function () {
            container.css("border", "");
        });
        container.append(deselectButton);

        $(selector).append(container);
    };
}());
