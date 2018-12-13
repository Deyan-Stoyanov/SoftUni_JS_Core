$(() => {
    const app = Sammy('#container', function () {
        this.use('Handlebars', 'hbs');

        $(document).on({
            ajaxStart: () => auth.showLoading
        });

        const commonPartials = {
            header: "./views/common/header.hbs",
            footer: "./views/common/footer.hbs"
        };

        function checkLoggedIn(ctx) {
            ctx.loggedIn = sessionStorage.getItem("authtoken") != undefined;
            ctx.username = sessionStorage.getItem("username");
        }

        function homeScreen(ctx) {
            checkLoggedIn(ctx);
            ctx.loadPartials({
                    header: commonPartials.header,
                    footer: commonPartials.footer,
                    flight: "./views/flights/flight.hbs"
                })
                .then(function () {
                    requester
                        .get("appdata", "flights", "kinvey")
                        .then(response => {
                            response.forEach(x => x.isPublisher = (x.publisher == ctx.username));
                            ctx.flights = response;
                            debugger;
                            this.partial("./views/flights/catalog.hbs");
                        })
                        .catch(auth.handleError);
                }).catch(auth.handleError);
        }

        //Home
        this.get('/', homeScreen);
        this.get('#/home', homeScreen);
        this.get('/index.html', homeScreen);

        //User
        this.get('#/login', function (ctx) {
            checkLoggedIn(ctx);
            ctx.loadPartials(commonPartials)
                .then(function () {
                    this.partial('../views/user/login.hbs');
                }).catch(auth.handleError);
        });

        this.post("#/login", function (ctx) {
            let username = ctx.params.username;
            let password = ctx.params.pass;

            auth
                .login(username, password)
                .then(function (response) {
                    auth.saveSession(response);
                    auth.showInfo("Successfully logged in!");
                    homeScreen(ctx);
                })
                .catch(auth.handleError);
        });

        this.get('#/logout', function (ctx) {
            checkLoggedIn(ctx);
            auth.logout()
                .then(function () {
                    sessionStorage.clear();
                    auth.showInfo("Logout successful!");
                    homeScreen(ctx);
                });
        });

        this.get('#/register', function (ctx) {
            checkLoggedIn(ctx);
            ctx.loadPartials(commonPartials)
                .then(function () {
                    this.partial('../views/user/register.hbs');
                }).catch(auth.handleError);
        });

        this.post('#/register', function (ctx) {
            checkLoggedIn(ctx);
            let username = ctx.params.username;
            let password = ctx.params.pass;
            let repeatPassword = ctx.params.checkPass;
            auth.register(username, password, repeatPassword)
                .then(function (data) {
                    auth.saveSession(data);
                    auth.showInfo("Register successful!");
                    homeScreen(ctx);
                }).catch(auth.handleError);
        });

        //Flights

        this.get("#/flights", function (ctx) {
            checkLoggedIn(ctx);
            ctx.loadPartials({
                    header: commonPartials.header,
                    footer: commonPartials.footer,
                    flight: "./views/flights/flight.hbs"
                })
                .then(function () {
                    requester
                        .get("appdata", "flights", "kinvey")
                        .then(response => {
                            response.forEach(x => x.isPublisher = (x.publisher == ctx.username));
                            ctx.flights = response;
                            this.partial("./views/flights/myFlights.hbs");
                        })
                        .catch(auth.handleError);
                }).catch(auth.handleError);
        });

        this.get("#/flights/add", function (ctx) {
            checkLoggedIn(ctx);
            ctx.loadPartials(commonPartials)
                .then(function () {
                    this.partial("./views/flights/add.hbs");
                }).catch(auth.handleError);
        });

        this.post("#/flights/add", function (ctx) {
            checkLoggedIn(ctx);
            let destination = ctx.params.destination;
            let origin = ctx.params.origin;
            let departureDate = ctx.params.departureDate;
            let departureTime = ctx.params.departureTime;
            let seats = ctx.params.seats;
            let cost = ctx.params.cost;
            let img = ctx.params.img;
            let public = !!ctx.params.public;
            let publisher = sessionStorage.getItem("username");
            if (typeof + seats !== "number" || +seats < 0) {
                auth.showError("Seats is not a valid number!");
            } else if (typeof + cost !== "number" || +cost < 0) {
                auth.showError("Cost is not a valid number!");
            } else {
                let flightData = {
                    destination: destination,
                    origin: origin,
                    departureDate: departureDate,
                    departureTime: departureTime,
                    seats: seats,
                    img: img,
                    cost: cost,
                    public: public,
                    publisher: publisher
                };
                requester
                    .post("appdata", "flights", "kinvey", flightData)
                    .then(function (response) {
                        auth.showInfo("Successfully published!");
                        homeScreen(ctx);
                    })
                    .catch(auth.handleError);
            }
        });

        this.get("#/flights/details/:id", function (ctx) {
            checkLoggedIn(ctx);
            let flightId = this.params["id"].replace(":", "");
            ctx
                .loadPartials(commonPartials)
                .then(function () {
                    requester
                        .get("appdata", "flights/" + flightId, "kinvey")
                        .then(response => {
                            ctx.img = response.img;
                            ctx.destination = response.destination;
                            ctx.origin = response.origin;
                            ctx.departureDate = response.departureDate;
                            ctx.departureTime = response.departureTime;
                            ctx.flightId = flightId;
                            ctx.seats = response.seats;
                            ctx.cost = response.cost;
                            this.partial("../views/flights/details.hbs");
                        })
                        .catch(auth.handleError);
                })
                .catch(auth.handleError);
        });

        this.get("#/flights/edit/:id", function (ctx) {
            checkLoggedIn(ctx);
            let flightId = this.params["id"].replace(":", "");
            ctx
                .loadPartials(commonPartials)
                .then(function () {
                    requester
                        .get("appdata", "flights/" + flightId, "kinvey")
                        .then(response => {
                            ctx.img = response.img;
                            ctx.destination = response.destination;
                            ctx.origin = response.origin;
                            ctx.departureDate = response.departureDate;
                            ctx.departureTime = response.departureTime;
                            ctx.flightId = flightId;
                            ctx.seats = response.seats;
                            ctx.cost = response.cost;
                            this.partial("../views/flights/edit.hbs");
                        })
                        .catch(auth.handleError);
                })
                .catch(auth.handleError);
        });

        this.post("#/flights/edit/:id", function (ctx) {
            let flightId = document.URL.substring(document.URL.lastIndexOf(":") + 1);
            ctx.flightId = flightId;
            let destination = ctx.params.destination;
            let origin = ctx.params.origin;
            let departureDate = ctx.params.departureDate;
            let departureTime = ctx.params.departureTime;
            let seats = ctx.params.seats;
            let cost = ctx.params.cost;
            let img = ctx.params.img;
            let public = !!ctx.params.public;
            if (typeof + seats !== "number" || +seats < 0) {
                auth.showError("Seats is not a valid number!");
            } else if (typeof + cost !== "number" || +cost < 0) {
                auth.showError("Cost is not a valid number!");
            } else {
                let flightData = {
                    destination: destination,
                    origin: origin,
                    departureDate: departureDate,
                    departureTime: departureTime,
                    seats: seats,
                    img: img,
                    cost: cost,
                    public: public,
                    publisher: sessionStorage.getItem("username")
                };
                requester
                    .update("appdata", "flights/" + flightId, "kinvey", flightData)
                    .then(function (response) {
                        auth.showInfo("Successfully updated!");
                        homeScreen(ctx);
                    })
                    .catch(auth.handleError);
            }
        });

        this.get("#/flights/delete/:id", function (ctx) {
            let flightId = this.params["id"].replace(":", "").trim();
            requester.remove("appdata", "flights/" + flightId, "kinvey")
                .then(function () {
                    auth.showInfo("Succesfully deleted!");
                    homeScreen(ctx);
                }).catch(auth.handleError);
        });
    });

    app.run();
});
