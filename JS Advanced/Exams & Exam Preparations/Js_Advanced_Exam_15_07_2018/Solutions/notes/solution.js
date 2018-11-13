function addSticker() {
    let title = $(".title").val();
    let content = $(".content").val();
    if (title != "" && content != "") {
        let li = $("<li class=\"note-content\">");
        $(li).append("<a class=\"button\">x</a>")
            .append(`<h2>${title}</h2>`).on("click", () => {
                li.remove();
            })
            .append("<hr>")
            .append(`<p>${content}</p>`);

        $(".title").val("");
        $(".content").val("");
        $("#sticker-list").append(li);
    }
}
