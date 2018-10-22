function initializeTable() {
  function fixLinks() {
    $("#countriesTable a").css("display", "inline");
    $($("#countriesTable tr")[2])
      .find('a:contains("Up")')
      .css("display", "none");
    $($("#countriesTable tr")[$("#countriesTable tr").length - 1])
      .find('a:contains("Down")')
      .css("display", "none");
  }

  function moveRowUp() {
    let row = $(this)
      .parent()
      .parent();
    row.fadeOut(() => {
      row.insertBefore(row.prev());
      row.fadeIn();
      fixLinks();
    });
  }

  function moveRowDown() {
    let row = $(this)
      .parent()
      .parent();
    row.fadeOut(() => {
      row.insertAfter(row.next());
      row.fadeIn();
      fixLinks();
    });
  }

  function deleteRow() {
    let row = $(this)
      .parent()
      .parent();
    row.fadeOut(() => {
      row.remove();
      fixLinks();
    });
  }

  function addCountry(country, capital) {
    let row = $("<tr>")
      .append($("<td>").text(country))
      .append($("<td>").text(capital))
      .append(
        $("<td>")
          .append($("<a href='#'>[Up]</a>").on("click", moveRowUp))
          .append($("<a href='#'>[Down]</a>").on("click", moveRowDown))
          .append($("<a href='#'>[Delete]</a>").on("click", deleteRow))
      );
    row.css("display", "none");
    $("#countriesTable").append(row);
    row.fadeIn();
    fixLinks();
  }

  $("#createLink").on("click", function() {
    let country = $("#newCountryText").val();
    let capital = $("#newCapitalText").val();
    addCountry(country, capital);
    $("#newCountryText").val("");
    $("#newCapitalText").val("");
    fixLinks();
  });
  addCountry("Bulgaria", "Sofia");
  addCountry("Germany", "Berlin");
  addCountry("Russia", "Moscow");
}
