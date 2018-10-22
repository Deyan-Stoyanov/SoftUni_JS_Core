function search() {
    let insertedText = $("#searchText").val();
    let count = $("#towns li")
    .css("font-weight", "normal")
    .filter(function (index, x) {
        return x.textContent.toLowerCase().indexOf(insertedText.toLowerCase()) > -1 && insertedText != '';
    }).css("font-weight", "bold").length;
    $("#result").text(count + " matches found.");
}
