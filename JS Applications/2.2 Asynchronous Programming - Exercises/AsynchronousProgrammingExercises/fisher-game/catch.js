function attachEvents() {
    $(".load").on("click", function () {
        $.ajax({
                url: "https://baas.kinvey.com/appdata/kid_rJdXwvYR7/biggestCatches",
                method: "GET",
                beforeSend: function (xhr) {
                    xhr.setRequestHeader("Authorization", "Basic " + btoa("admin:1234"));
                }
            }).then(displayCatches)
            .catch(function (err) {
                console.log(err.status);
            });

        function displayCatches(arr) {
            $("#catches").empty();
            for (let obj of arr) {
                let div = $(`<div class="catch" data-id="${obj._id}">
                <label>Angler</label>
                <input type="text" class="angler" value="${obj.angler}" />
                <label>Weight</label>
                <input type="number" class="weight" value="${obj.weight}" />
                <label>Species</label>
                <input type="text" class="species" value="${obj.species}" />
                <label>Location</label>
                <input type="text" class="location" value="${obj.location}" />
                <label>Bait</label>
                <input type="text" class="bait" value="${obj.bait}" />
                <label>Capture Time</label>
                <input type="number" class="captureTime" value="${obj.captureTime}" />
            </div>`);

                let updateButton = $("<button class=\"update\">Update</button>");
                $(updateButton).on("click", function () {
                    $.ajax({
                            url: "https://baas.kinvey.com/appdata/kid_rJdXwvYR7/biggestCatches/" + obj._id,
                            method: "PUT",
                            dataType: "application/json",
                            beforeSend: function (xhr) {
                                xhr.setRequestHeader("Authorization", "Basic " + btoa("admin:1234"));
                            },
                            data: {
                                "angler": $(`#catches .catch[data-id="${obj._id}"] .angler`).val(),
                                "weight": $(`#catches .catch[data-id="${obj._id}"] .weight`).val(),
                                "species": $(`#catches .catch[data-id="${obj._id}"] .species`).val(),
                                "location": $(`#catches .catch[data-id="${obj._id}"] .location`).val(),
                                "bait": $(`#catches .catch[data-id="${obj._id}"] .bait`).val(),
                                "captureTime": $(`#catches .catch[data-id="${obj._id}"] .captureTime`).val()
                            }
                        }).then()
                        .catch(function (err) {
                            console.log(err.status);
                        });
                });
                let deleteButton = $("<button class=\"delete\">Delete</button>");
                $(deleteButton).on("click", function () {
                    $.ajax({
                            url: "https://baas.kinvey.com/appdata/kid_rJdXwvYR7/biggestCatches/" + obj._id,
                            method: "DELETE",
                            beforeSend: function (xhr) {
                                xhr.setRequestHeader("Authorization", "Basic " + btoa("admin:1234"));
                            }
                        }).then($(this).parent().remove())
                        .catch(function (err) {
                            console.log(err.status);
                        });
                });
                $(div).append(updateButton);
                $(div).append(deleteButton);
                $("#catches").append(div);
            }
        }
    });
    $(".add").on("click", function () {
        $.ajax({
                url: "https://baas.kinvey.com/appdata/kid_rJdXwvYR7/biggestCatches",
                method: "POST",
                dataType: "application/json",
                beforeSend: function (xhr) {
                    xhr.setRequestHeader("Authorization", "Basic " + btoa("admin:1234"));
                },
                data: {
                    "angler": $("#addForm .angler").val(),
                    "weight": $("#addForm .weight").val(),
                    "species": $("#addForm .species").val(),
                    "location": $("#addForm .location").val(),
                    "bait": $("#addForm .bait").val(),
                    "captureTime": $("#addForm .captureTime").val()
                }
            }).then()
            .catch(function (err) {
                console.log(err.status);
            });
    });

}
