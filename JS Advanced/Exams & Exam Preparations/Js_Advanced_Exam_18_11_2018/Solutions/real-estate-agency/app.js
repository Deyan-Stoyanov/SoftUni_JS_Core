function realEstateAgency() {
	let totalProfit = +$("h1").text().split(" ")[2];
	$("button[name='regOffer']").on("click", function () {
		let price = $("input[name='apartmentRent']").val();
		let type = $("input[name='apartmentType']").val();
		let commission = $("input[name='agencyCommission']").val();
		if (type == "" || type.includes(":") || isNaN(price) || isNaN(commission) || +price <= 0 || +commission < 0 || +commission > 100) {
			$("#message").text("Your offer registration went wrong, try again.");
		} else {
			$("#message").text("Your offer was created successfully.");
			let div = $("<div>");
			div.addClass("apartment");
			let pRent = $("<p>").text(`Rent: ${price}`);
			let pType = $("<p>").text(`Type: ${type}`);
			let pComm = $("<p>").text(`Commission: ${commission}`);
			$(div).append(pRent);
			$(div).append(pType);
			$(div).append(pComm);
			$("#building").append(div);
		}
		$("input[name='apartmentRent']").val("");
		$("input[name='apartmentType']").val("");
		$("input[name='agencyCommission']").val("");
	});

	$("button[name='findOffer']").on("click", function () {
		let budget = $("input[name='familyBudget']").val();
		let type = $("input[name='familyApartmentType']").val();
		let name = $("input[name='familyName']").val();
		let currentMessage = "We were unable to find you a home, so sorry :(";
		if (!isNaN(budget) && +budget > 0 && type != "" && name != "") {
			let allAppartments = $(".apartment");
			for (let a of allAppartments) {
				let currentType = $(a).children().eq(1).text();
				if (currentType.split(": ")[1] == type) {
					let currentRent = $(a).children().eq(0).text().split(": ")[1];
					let currentCommission = $(a).children().eq(2).text().split(": ")[1];
					let total = currentRent + (currentRent * currentCommission / 100);
					if (total <= budget) {
						currentMessage = "Enjoy your new home! :))";
						let profit = (currentRent * currentCommission / 100) * 2;
						$("h1").text(`Agency profit: ${totalProfit + profit} lv.`);
						$(a).empty();
						$(a).addClass("apartment");
						$(a).css("border", "2px solid red")
						let pFamily = $("<p>").text(name);
						let pLives = $("<p>").text("live here now");
						$(a).append(pFamily);
						$(a).append(pLives);
						let moveOutButton = $("<button>").text("MoveOut");
						$(moveOutButton).on("click", function () {
							let familyName = $(moveOutButton).parent().children().eq(0).text();
							let msg = `They had found cockroaches in ${familyName}\'s apartment`;
							$("#message").text(msg);
							moveOutButton.parent().remove();
						});
						$(a).append(moveOutButton);
					}
				}
			}
		}
		$("#message").text(currentMessage);
		$("input[name='familyBudget']").val("");
		$("input[name='familyApartmentType']").val("");
		$("input[name='familyName']").val("");
	});
}
