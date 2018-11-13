function makeReservation(container) {
    $("#submit").prop("disabled", false);
    $("#edit").prop("disabled", true);
    $("#continue").prop("disabled", true);

    $("#submit").on("click", () => {
        if ($("#fullName").val() !== "" && $("#email").val() !== "") {
            $("#infoPreview")
                .append($("<li>").text(`Name: ${$("#fullName").val()}`))
                .append($("<li>").text(`E-mail: ${$("#email").val()}`))
                .append($("<li>").text(`Phone: ${$("#phoneNumber").val()}`))
                .append($("<li>").text(`Address: ${$("#address").val()}`))
                .append($("<li>").text(`Postal Code: ${$("#postalCode").val()}`));
            $("ul li").css("display", "block");
            $("#submit").prop("disabled", true);
            $("#edit").prop("disabled", false);
            $("#continue").prop("disabled", false);
            $("#fullName").val("");
            $("#email").val("");
            $("#phoneNumber").val("");
            $("#address").val("");
            $("#postalCode").val("");
        }
    });

    $("#edit").on("click", () => {
        let values = $("#infoPreview").children();
        let inputs = $("input");
        for (let i = 0; i < inputs.length; i++) {
            $(inputs[i]).val($(values[i]).text().substr($(values[i]).text().indexOf(":") + 2));
        }
        $("#infoPreview").empty();
        $("#submit").prop("disabled", false);
        $("#edit").prop("disabled", true);
        $("#continue").prop("disabled", true);
    });

    $("#continue").on("click", () => {
        $("#submit").prop("disabled", true);
        $("#edit").prop("disabled", true);
        $("#continue").prop("disabled", true);
        $("#container").html("<h2>Payment details</h2><select id=\"paymentOptions\" class=\"custom-select\"><option selected disabled hidden>Choose</option><option value=\"creditCard\">Credit Card</option><option value=\"bankTransfer\">Bank Transfer</option></select><div id=\"extraDetails\"></div>");


        $("#paymentOptions").on("change", () => {
            let selectedValue = $("#paymentOptions option:selected").val();
            $("#extraDetails").empty();
            if (selectedValue == "creditCard") {
                $("#extraDetails").html("<div class=\"inputLabel\">Card Number<input></div><br><div class=\"inputLabel\">Expiration Date<input></div><br><div class=\"inputLabel\">Security Numbers<input></div><br><button id=\"checkOut\">Check Out</button>");
            } else {
                $("#extraDetails").html("<p>You have 48 hours to transfer the amount to:<br>IBAN: GR96 0810 0010 0000 0123 4567 890</p><button id=\"checkOut\">Check Out</button>");
            }
            $("#checkOut").on("click", () => {
                $("#wrapper").empty();
                $("#wrapper").append("<h4>Thank you for your reservation!</h4>");
            });
        });
    });
}
