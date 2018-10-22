function extractText(){
    let content = $("li").toArray().map(x => x.textContent).join(", ");
    $("#result").text(content);
}
