function attachEvents() {
    const baseURL = "https://js-apps-first-demo-db.firebaseio.com/messegger";

    $.get(baseURL)
        .then(displayMessages)
        .catch(displayError);

    function displayMessages(data) {
        let keys = Array.from(Object.keys(data)).sort((a, b) => {
            return data[a].timestamp - data[b].timestamp;
        });
        let result = "";
        for (let key of keys) {
            result += `${data[key].author}: ${data[key].content}\n`;
        }
        $("#messages").text(result);
    }

    function displayError(error) {
        $("#messages").text("Error");
    }

    $("#submit").on("click", function () {
        if ($('#author').val() != "" && $('#content').val() != "") {
            $("#messages").val("");
            let newMessageJSON = JSON.stringify({
                author: $('#author').val(),
                content: $('#content').val(),
                timestamp: Date.now()
            });
            $.post( + '.json', newMessageJSON)
                .then(loadMessages)
                .catch(displayError);

            function loadMessages() {
                $.get(baseURL + '.json')
                    .then(displayMessages)
                    .catch(displayError);
            }
        }
        $('#author').val("");
        $('#content').val("");
    });

    $("#refresh").on("click", function () {
        $.get(baseURL)
            .then(displayMessages)
            .catch(displayError);
        $('#author').val("");
        $('#content').val("");
    });
}
