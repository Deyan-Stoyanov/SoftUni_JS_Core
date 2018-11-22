function attachEvents() {
    const baseURL = 'https://phonebook-nakov.firebaseio.com/phonebook';

    function displayPhoneNumbers(data) {
        let keys = Array.from(Object.keys(data)).sort((a, b) => {
            return data[a].person.localeCompare(data[b].person);
        });
        for (let key of keys) {
            let li = $("<li>");
            li.text(`${data[key].person}: ${data[key].phone}`);
            let deleteBtn = $("<button>[Delete]</button>");
            deleteBtn.on("click", function () {
                $.ajax({
                    method: 'DELETE',
                    url: baseURL + '/' + key + '.json'
                }).then(function () {
                    li.remove();
                }).catch(displayError);

            });
            li.append(deleteBtn);
            $("#phonebook").append(li);
        }
    }

    function displayError(err) {
        console.log(err);
    }

    function load() {
        $("#phonebook").empty();
        $.ajax({
                method: "GET",
                url: baseURL + ".json",
                dataType: "jsonp"
            })
            .then(displayPhoneNumbers)
            .catch(displayError);
    }


    $("#btnCreate").on("click", () => {
        if ($("#person").val() != "" && $("#phone").val() != "") {
            let newPersonJSON = JSON.stringify({
                "person": $("#person").val(),
                "phone": $("#phone").val()
            });
            $.ajax({
                    method: 'POST',
                    url: baseURL + '.json',
                    data: newPersonJSON
                })
                .then(function () {
                    $("#person").val("");
                    $("#phone").val("");
                    load();
                });
        }
    });

    $("#btnLoad").on("click", () => {
        load();
    });
}
