function acceptance() {
	let company = $("input[name='shippingCompany']").val();
	let product = $("input[name='productName']").val();
	let quantity = $("input[name='productQuantity']").val();
	let scrape = $("input[name='productScrape']").val();
	if (company != "" && product != "" && quantity != "" & scrape != "" && !isNaN(+quantity) && !isNaN(+scrape)) {
		if (+quantity - +scrape > 0) {
			let div = $("<div>");
			let p = $("<p>").text(`[${company}] ${product} - ${+quantity - +scrape} pieces`);
			let button = $("<button type=\"button\">Out of stock</button>");
			button.on("click", function () {
				button.parent().remove();
			});
			div.append(p);
			div.append(button);
			$("#warehouse").append(div);
			$("input[name='shippingCompany']").val("");
			$("input[name='productName']").val("");
			$("input[name='productQuantity']").val("");
			$("input[name='productScrape']").val("");
		}
	}
}
