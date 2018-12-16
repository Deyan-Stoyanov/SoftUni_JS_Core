$(() => {
    const app = Sammy("#container", function () {
        this.use('Handlebars', 'hbs');

        let total = 0;

        $(document).on({
            ajaxStart: () => auth.showLoading
        });

        const commonPartials = {
            header: "./templates/common/header.hbs",
            footer: "./templates/common/footer.hbs"
        };

        const homePartial = "./templates/home/home.hbs";

        const userPartials = {
            login: "./templates/user/login.hbs",
            register: "./templates/user/register.hbs"
        };

        const receiptPartials = {
            details: "./templates/receipt/details.hbs",
            receipt: "./templates/receipt/receipt.hbs",
            catalog: "./templates/receipt/catalog.hbs",
            create: "./templates/receipt/create.hbs"
        };

        function checkLoggedIn(ctx) {
            ctx.loggedIn = sessionStorage.getItem("authtoken") != undefined;
            ctx.username = sessionStorage.getItem("username");
            ctx.userId = sessionStorage.getItem("userId");
            ctx.total = total;
        }

        function showHomeScreen(ctx) {
            checkLoggedIn(ctx);
            if (ctx.loggedIn) {
                feed(ctx);
            } else {
                ctx
                    .loadPartials({
                        header: commonPartials.header,
                        footer: commonPartials.footer,
                        login: userPartials.login,
                        register: userPartials.register
                    })
                    .then(function () {
                        this.partial(homePartial);
                    }).catch(auth.handleError);
            }
        }

        function postLogin(ctx) {
            checkLoggedIn(ctx);
            let username = ctx.params["username-login"];
            let password = ctx.params["password-login"];

            auth
                .login(username, password)
                .then(function (response) {
                    auth.saveSession(response);
                    auth.showInfo("Successfully logged in!");
                    showHomeScreen(ctx);
                }).catch(auth.handleError);
        }

        function postRegister(ctx) {
            checkLoggedIn(ctx);
            let username = ctx.params["username-register"];
            let password = ctx.params["password-register"];
            let repeatPassword = ctx.params["password-register-check"];

            if (username.length < 5) {
                auth.showError("Username should not be below 5 characters!");
            } else if (password == "") {
                auth.showError("Password should not be empty!");
            } else if (password != repeatPassword) {
                auth.showError("Passwords do not match!");
            } else {
                auth
                    .register(username, password, repeatPassword)
                    .then(function () {
                        auth.showInfo("Successfully registered!");
                        showHomeScreen(ctx);
                    }).catch(auth.handleError);
            }
        }

        function postLogout(ctx) {
            checkLoggedIn(ctx);
            auth
                .logout()
                .then(function () {
                    sessionStorage.clear();
                    auth.showInfo("Successfully logged out");
                    showHomeScreen(ctx);
                }).catch(auth.handleError);
        }

        function feed(ctx) {
            checkLoggedIn(ctx);
            ctx
                .loadPartials({
                    header: commonPartials.header,
                    footer: commonPartials.footer,
                    receipt: receiptPartials.receipt
                })
                .then(function () {
                    requester
                        .get("appdata", "receipts", "kinvey")
                        .then(response => {
                            // response.forEach(x => x.isAuthor = (x.author == ctx.username));
                            ctx.receipts = response;
                            this.partial(receiptPartials.create);
                        })
                        .catch(auth.handleError);
                }).catch(auth.handleError);
        }

        function createReceipt(ctx) {
            let product = ctx.params.type;
            let quantity = ctx.params.qty;
            let price = ctx.params.price;
            let subTotal = quantity * price;
            let productData = {
                "product": product,
                "quantity": quantity,
                "price": price,
                "subTotal": subTotal,
                "author": sessionStorage.getItem("username")
            };
            requester
                .post("appdata", "receipts", "kinvey", productData)
                .then(function () {
                    auth.showInfo("Successfully created!");
                    total += subTotal;
                    showHomeScreen(ctx);
                }).catch(auth.handleError);
        }

        //Homepage
        this.get("/", showHomeScreen);
        this.get("/#", showHomeScreen);
        this.get("#/home", showHomeScreen);
        this.get("#/index.html", showHomeScreen);

        //User
        this.post("#/login", postLogin);
        this.post("#/register", postRegister);
        this.get("#/logout", postLogout);

        //Receipt
        this.post("#/create", createReceipt);


    });

    app.run();
});
