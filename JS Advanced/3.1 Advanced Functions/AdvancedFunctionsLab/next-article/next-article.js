function getArticleGenerator(articles) {
    let container = $("#content");
    return function () {
        if (articles.length > 0) {
            let article = $(`<article><p>${articles.shift()}</p></article>`);
            article.appendTo(container);
        }
    };
}
