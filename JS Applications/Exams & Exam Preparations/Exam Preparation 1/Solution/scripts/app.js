$(() => {
  const app = Sammy("#container", function () {
    this.use("Handlebars", "hbs");

    const commonPartials = {
      header: "../templates/header.hbs",
      footer: "../templates/footer.hbs"
    };

    function checkLoggedIn(ctx) {
      ctx.loggedIn = sessionStorage.getItem("authtoken") !== null;
      ctx.username = sessionStorage.getItem("username");
    }

    function homePage(ctx) {
      checkLoggedIn(ctx);
      ctx
        .loadPartials({
          header: commonPartials.header,
          footer: commonPartials.footer,
        })
        .then(function () {
          if (ctx.loggedIn) {
            ctx.redirect("#/allListings");
          } else {
            this.partial("../templates/main.hbs");
          }
        })
        .catch(auth.handleError);
    }

    this.get("#/home", homePage);
    this.get("/", homePage);
    this.get("/index.html", homePage);

    this.get("#/login", function (ctx) {
      ctx
        .loadPartials({
          header: commonPartials.header,
          footer: commonPartials.footer
        })
        .then(function () {
          this.partial("../templates/login.hbs");
        })
        .catch(auth.handleError);
    });

    this.post("#/login", function (ctx) {
      let username = ctx.params.username;
      let password = ctx.params.password;

      auth
        .login(username, password)
        .then(function (response) {
          auth.saveSession(response);
          auth.showInfo("Successfully logged in!");
          homePage(ctx);
        })
        .catch(auth.handleError);
    });

    this.get("#/register", function (ctx) {
      ctx
        .loadPartials({
          header: commonPartials.header,
          footer: commonPartials.footer
        })
        .then(function () {
          this.partial("../templates/register.hbs");
        })
        .catch(auth.handleError);
    });

    this.post("#/register", function (ctx) {
      let username = ctx.params.username;
      let password = ctx.params.password;
      let repeatPassword = ctx.params.repeatPass;

      if (password != repeatPassword) {
        auth.showError("Passwords do not match");
      } else {
        auth
          .register(username, password, repeatPassword)
          .then(function (response) {
            auth.saveSession(response);
            auth.showInfo("Successfully registered!");
            homePage(ctx);
          })
          .catch(auth.handleError);
      }
    });

    this.get("#/logout", function (ctx) {
      auth.logout().then(function () {
        localStorage.clear();
        sessionStorage.clear();
        auth.showInfo("Successfully logged out!");
        homePage(ctx);
      });
    });

    this.get("#/create", function (ctx) {
      checkLoggedIn(ctx);
      ctx
        .loadPartials({
          header: commonPartials.header,
          footer: commonPartials.footer
        })
        .then(function () {
          this.partial("../templates/create.hbs");
        })
        .catch(auth.handleError);
    });

    this.post("#/create", function (ctx) {
      let title = ctx.params.title;
      let description = ctx.params.description;
      let brand = ctx.params.brand;
      let model = ctx.params.model;
      let year = ctx.params.year;
      let imageUrl = ctx.params.imageUrl;
      let fuelType = ctx.params.fuelType;
      let price = ctx.params.price;
      if (title.length > 33) {
        auth.showError("Title must not exceed 33 characters!");
      } else if (description.length < 30 || description.length > 450) {
        auth.showError("Description must be between 30 and 450 characters!");
      } else if (
        brand.length > 11 ||
        model.length > 11 ||
        fuelType.length > 11
      ) {
        auth.showError(
          "Brand, Model and Fuel Type must not exceed 11 characters!"
        );
      } else if (model.length < 4) {
        auth.showError("Model must be above 4 characters!");
      } else if (year.length != 4) {
        auth.showError("Year must be exactly 4 characters!");
      } else if (price > 1000000) {
        auth.showError("Maximum price is 1000000$!");
      } else if (!imageUrl.startsWith("http")) {
        auth.showError("Invalid image URL!");
      } else {
        let carData = {
          title: title,
          description: description,
          brand: brand,
          model: model,
          year: year,
          imageUrl: imageUrl,
          fuelType: fuelType,
          price: price,
          seller: sessionStorage.getItem("username")
        };
        requester
          .post("appdata", "cars", "kinvey", carData)
          .then(function (response) {
            auth.showInfo("Successfully published!");
            homePage(ctx);
          })
          .catch(auth.handleError);
      }
    });

    this.get("#/allListings", function (ctx) {
      checkLoggedIn(ctx);
      ctx
        .loadPartials({
          header: commonPartials.header,
          footer: commonPartials.footer,
          listing: "../templates/listing.hbs"
        })
        .then(function () {
          requester
            .get("appdata", "cars", "kinvey")
            .then(response => {
              response.forEach(a => {
                a.isAuthor = a.seller == ctx.username;
              });
              ctx.listings = response;
              this.partial("../templates/allListings.hbs");
            })
            .catch(auth.handleError);
        })
        .catch(auth.handleError);
    });

    this.get("#/myListings", function (ctx) {
      checkLoggedIn(ctx);
      ctx
        .loadPartials({
          header: commonPartials.header,
          footer: commonPartials.footer,
          listing: "../templates/listing.hbs"
        })
        .then(function () {
          requester
            .get("appdata", "cars", "kinvey")
            .then(response => {
              response.forEach(a => {
                a.isAuthor = a.seller == ctx.username;
              });
              ctx.listings = response;
              this.partial("../templates/myListings.hbs");
            })
            .catch(auth.handleError);
        })
        .catch(auth.handleError);
    });

    this.get("#/details/:id", function (ctx) {
      checkLoggedIn(ctx);
      let listingId = this.params["id"].replace(":", "");
      ctx
        .loadPartials({
          header: commonPartials.header,
          footer: commonPartials.footer
        })
        .then(function () {
          requester
            .get("appdata", "cars/" + listingId, "kinvey")
            .then(response => {
              response.isAuthor = response.seller == ctx.username;
              ctx.title = response.title;
              ctx.imageUrl = response.imageUrl;
              ctx.brand = response.brand;
              ctx.model = response.model;
              ctx.year = response.year;
              ctx.fuelType = response.fuelType;
              ctx.price = response.price;
              ctx.description = response.description;
              ctx.isAuthor = response.seller == ctx.username;
              ctx.listingId = listingId;
              this.partial("../templates/details.hbs");
            })
            .catch(auth.handleError);
        })
        .catch(auth.handleError);
    });

    this.get("#/edit/:id", function (ctx) {
      checkLoggedIn(ctx);
      let listingId = this.params["id"].replace(":", "");
      ctx
        .loadPartials({
          header: commonPartials.header,
          footer: commonPartials.footer
        })
        .then(function () {
          requester
            .get("appdata", "cars/" + listingId, "kinvey")
            .then(response => {
              response.isAuthor = response.seller == ctx.username;
              ctx.title = response.title;
              ctx.description = response.description;
              ctx.imageUrl = response.imageUrl;
              ctx.brand = response.brand;
              ctx.model = response.model;
              ctx.year = response.year;
              ctx.fuelType = response.fuelType;
              ctx.price = response.price;
              this.partial("../templates/edit.hbs");
            })
            .catch(auth.handleError);
        }).catch(auth.handleError);
    });

    this.post("#/edit/:id", function (ctx) {
      let listingId = document.URL.substring(document.URL.lastIndexOf(":") + 1);
      ctx.listingId = listingId;
      let title = ctx.params.title;
      let description = ctx.params.description;
      let brand = ctx.params.brand;
      let model = ctx.params.model;
      let year = ctx.params.year;
      let imageUrl = ctx.params.imageUrl;
      let fuelType = ctx.params.fuelType;
      let price = ctx.params.price;
      if (title.length > 33) {
        auth.showError("Title must not exceed 33 characters!");
      } else if (description.length < 30 || description.length > 450) {
        auth.showError("Description must be between 30 and 450 characters!");
      } else if (
        brand.length > 11 ||
        model.length > 11 ||
        fuelType.length > 11
      ) {
        auth.showError(
          "Brand, Model and Fuel Type must not exceed 11 characters!"
        );
      } else if (model.length < 4) {
        auth.showError("Model must be above 4 characters!");
      } else if (year.length != 4) {
        auth.showError("Year must be exactly 4 characters!");
      } else if (price > 1000000) {
        auth.showError("Maximum price is 1000000$!");
      } else if (!imageUrl.startsWith("http")) {
        auth.showError("Invalid image URL!");
      } else {
        let carData = {
          title: title,
          description: description,
          brand: brand,
          model: model,
          year: year,
          imageUrl: imageUrl,
          fuelType: fuelType,
          price: price,
          seller: sessionStorage.getItem("username")
        };
        requester
          .update("appdata", "cars/" + listingId, "kinvey", carData)
          .then(function (response) {
            auth.showInfo("Successfully edited!");
            homePage(ctx);
          })
          .catch(auth.handleError);
      }
    });

    this.get("#/delete/:id", function (ctx) {
      let listingId = this.params["id"].replace(":", "");
      requester.remove("appdata", "cars/" + listingId, "kinvey")
        .then(function () {
          auth.showInfo("Successfully removed!");
          homePage(ctx);
        })
        .catch(auth.handleError);
    });
  });

  app.run();
});
