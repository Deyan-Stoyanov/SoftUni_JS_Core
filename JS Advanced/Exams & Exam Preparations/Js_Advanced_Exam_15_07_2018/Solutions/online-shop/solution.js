function onlineShop(selector) {
    let form = `<div id="header">Online Shop Inventory</div>
    <div class="block">
        <label class="field">Product details:</label>
        <br>
        <input placeholder="Enter product" class="custom-select">
        <input class="input1" id="price" type="number" min="1" max="999999" value="1"><label class="text">BGN</label>
        <input class="input1" id="quantity" type="number" min="1" value="1"><label class="text">Qty.</label>
        <button id="submit" class="button" disabled>Submit</button>
        <br><br>
        <label class="field">Inventory:</label>
        <br>
        <ul class="display">
        </ul>
        <br>
        <label class="field">Capacity:</label><input id="capacity" readonly>
        <label class="field">(maximum capacity is 150 items.)</label>
        <br>
        <label class="field">Price:</label><input id="sum" readonly>
        <label class="field">BGN</label>
    </div>`;
    $(selector).html(form);
    let total = 0;
    $(".custom-select").on("input", () => {
        if ($(".custom-select").val() != "") {
            $("#submit").prop("disabled", false);
        }
    });
    $("#submit").on("click", () => {
        total += +$("#quantity").val();
        let price = +$("#price").val();
        let li = $("<li>").text(`Product: ${$(".custom-select").val()} Price: ${$("#price").val()} Quantity: ${$("#quantity").val()}`);
        $(".display").append(li);
        $("#sum").val(+$("#sum").val() + price);
        $("#capacity").val(total);
        $(".custom-select").val("");
        $("#price").val(1);
        $("#quantity").val(1);
        $("#submit").prop("disabled", true);
        if (total >= 150) {
            $("#submit").prop("disabled", true);
            $("#price").prop("disabled", true);
            $("#quantity").prop("disabled", true);
            $(".custom-select").prop("disabled", true);
            $("#capacity").val("full");
            $("#capacity").addClass("fullCapacity");
        }
    });
}
