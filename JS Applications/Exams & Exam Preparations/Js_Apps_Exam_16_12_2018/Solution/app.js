$(() => {
    const app = Sammy("#container", function () {
        this.use('Handlebars', 'hbs');

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

        const petPartials = {
            create: "./templates/pets/create.hbs",
            dashboard: "./templates/pets/dashboard.hbs",
            delete: "./templates/pets/delete.hbs",
            myPet: "./templates/pets/myPet.hbs",
            myPetDetails: "./templates/pets/myPetDetails.hbs",
            myPets: "./templates/pets/myPets.hbs",
            otherPet: "./templates/pets/otherPet.hbs",
            otherPetDetails: "./templates/pets/otherPetDetails.hbs"
        };

        function checkLoggedIn(ctx) {
            ctx.loggedIn = sessionStorage.getItem("authtoken") != undefined;
            ctx.username = sessionStorage.getItem("username");
            ctx.userId = sessionStorage.getItem("userId");
        }

        function showHomeScreen(ctx) {
            checkLoggedIn(ctx);
            if (ctx.loggedIn) {
                displayDashboard(ctx);
            } else {
                ctx
                    .loadPartials(commonPartials)
                    .then(function () {
                        this.partial(homePartial);
                    }).catch(auth.handleError);
            }
        }

        function getLogin(ctx) {
            checkLoggedIn(ctx);
            ctx
                .loadPartials(commonPartials)
                .then(function () {
                    this.partial(userPartials.login);
                }).catch(auth.handleError);
        }

        function postLogin(ctx) {
            checkLoggedIn(ctx);
            let username = ctx.params.username;
            let password = ctx.params.password;

            if (username.length < 3) {
                auth.showError("Username must be at least 3 symbols");
            } else if (password.length < 6) {
                auth.showError("Password must be at least 6 symbols");
            } else {
                auth.showLoading();
                auth
                    .login(username, password)
                    .then(function (response) {
                        auth.saveSession(response);
                        auth.showInfo("Login successful.");
                        ctx.redirect("#/");
                    }).catch(auth.handleError);
            }
        }

        function getRegister(ctx) {
            checkLoggedIn(ctx);
            ctx
                .loadPartials(commonPartials)
                .then(function () {
                    this.partial(userPartials.register);
                }).catch(auth.handleError);
        }

        function postRegister(ctx) {
            checkLoggedIn(ctx);
            let username = ctx.params.username;
            let password = ctx.params.password;
            if (username.length < 3) {
                auth.showError("Username must be at least 3 symbols");
            } else if (password.length < 6) {
                auth.showError("Password must be at least 6 symbols");
            } else {
                auth.showLoading();
                auth
                    .register(username, password)
                    .then(function (response) {
                        auth.saveSession(response);
                        auth.showInfo("User registration successful.");
                        ctx.redirect("#/");
                    }).catch(auth.handleError);
            }
        }

        function getLogout(ctx) {
            checkLoggedIn(ctx);
            auth.showLoading();
            auth
                .logout()
                .then(function () {
                    sessionStorage.clear();
                    auth.showInfo("Logout successful.");
                    ctx.redirect("#/");
                }).catch(auth.handleError);
        }

        function displayDashboard(ctx) {
            checkLoggedIn(ctx);
            ctx
                .loadPartials({
                    header: commonPartials.header,
                    footer: commonPartials.footer,
                    otherPet: petPartials.otherPet
                })
                .then(function () {
                    requester
                        .get("appdata", "pets", "kinvey")
                        .then(response => {
                            response = response.filter(x => x._acl.creator != ctx.userId).sort((x, y) => {
                                return y.likes - x.likes;
                            });
                            let category = document.URL.substring(document.URL.lastIndexOf("/") + 1);
                            if (category != "" && category != "all") {
                                if (category == "other") {
                                    response = response.filter(x => x.category.toLowerCase() == "other");
                                } else {
                                    response = response.filter(x => x.category.toLowerCase() == category.substring(0, category.length - 1));
                                }
                            }
                            ctx.otherPets = response;
                            this.partial(petPartials.dashboard);
                        })
                        .catch(auth.handleError);
                }).catch(auth.handleError);
        }

        function getCreatePet(ctx) {
            checkLoggedIn(ctx);
            ctx
                .loadPartials(commonPartials)
                .then(function () {
                    this.partial(petPartials.create);
                }).catch(auth.handleError);
        }


        function postCreatePet(ctx) {
            checkLoggedIn(ctx);
            let name = ctx.params.name;
            let description = ctx.params.description;
            let imageURL = ctx.params.imageURL;
            let category = ctx.params.category;

            const petData = {
                "name": name,
                "description": description,
                "imageURL": imageURL,
                "category": category,
                "likes": 0
            };

            auth.showLoading();
            requester
                .post("appdata", "pets", "kinvey", petData)
                .then(function () {
                    auth.showInfo("Pet created.");
                    ctx.redirect("#/");
                }).catch(auth.handleError);
        }

        function displayMyPets(ctx) {
            checkLoggedIn(ctx);
            ctx
                .loadPartials({
                    header: commonPartials.header,
                    footer: commonPartials.footer,
                    myPet: petPartials.myPet
                }).then(function () {
                    auth.showLoading();
                    requester
                        .get("appdata", "pets", "kinvey")
                        .then(response => {
                            response = response.filter(x => x._acl.creator == ctx.userId);
                            ctx.myPets = response;
                            this.partial(petPartials.myPets);
                        })
                        .catch(auth.handleError);
                }).catch(auth.handleError);
        }

        function displayOtherPetDetails(ctx) {
            checkLoggedIn(ctx);
            let petId = this.params["id"].replace(":", "");
            ctx
                .loadPartials(commonPartials)
                .then(function () {
                    requester.get("appdata", "pets/" + petId, "kinvey")
                        .then(response => {
                            ctx.name = response.name;
                            ctx.likes = response.likes;
                            ctx.imageURL = response.imageURL;
                            ctx.description = response.description;
                            ctx.petId = petId;
                            this.partial(petPartials.otherPetDetails);
                        }).catch(auth.handleError);
                }).catch(auth.handleError);
        }

        function getDisplayMyPetDetails(ctx) {
            checkLoggedIn(ctx);
            let petId = this.params["id"].replace(":", "");
            ctx
                .loadPartials(commonPartials)
                .then(function () {
                    requester.get("appdata", "pets/" + petId, "kinvey")
                        .then(response => {
                            ctx.name = response.name;
                            ctx.likes = response.likes;
                            ctx.imageURL = response.imageURL;
                            ctx.description = response.description;
                            ctx.petId = petId;
                            this.partial(petPartials.myPetDetails);
                        }).catch(auth.handleError);
                }).catch(auth.handleError);
        }

        function postDisplayMyPetDetails(ctx) {
            checkLoggedIn(ctx);
            let petId = document.URL.substring(document.URL.lastIndexOf(":") + 1);
            let description = ctx.params.description;

            requester
                .get("appdata", "pets/" + petId, "kinvey")
                .then(response => {
                    let name = response.name;
                    let imageURL = response.imageURL;
                    let likes = response.likes;
                    let category = response.category;

                    let updatedPetData = {
                        "name": name,
                        "description": description,
                        "imageURL": imageURL,
                        "category": category,
                        "likes": likes
                    };

                    auth.showLoading();
                    requester
                        .update("appdata", "pets/" + petId, "kinvey", updatedPetData)
                        .then(function () {
                            auth.showInfo("Updated successfully!");
                            ctx.redirect("#/");
                        }).catch(auth.handleError);

                }).catch(auth.handleError);
        }

        function getDelete(ctx) {
            checkLoggedIn(ctx);
            let petId = this.params["id"].replace(":", "");
            ctx
                .loadPartials(commonPartials)
                .then(function () {
                    requester.get("appdata", "pets/" + petId, "kinvey")
                        .then(response => {
                            ctx.name = response.name;
                            ctx.likes = response.likes;
                            ctx.imageURL = response.imageURL;
                            ctx.description = response.description;
                            ctx.petId = petId;
                            this.partial(petPartials.delete);
                        }).catch(auth.handleError);
                }).catch(auth.handleError);
        }

        function postDelete(ctx) {
            checkLoggedIn(ctx)
            let petId = document.URL.substring(document.URL.lastIndexOf(":") + 1);
            auth.showLoading();
            requester.remove("appdata", "pets/" + petId, "kinvey")
                .then(function () {
                    auth.showInfo("Pet removed successfully!");
                    ctx.redirect("#/")
                }).catch(auth.handleError);
        }

        function likePet(ctx) {
            checkLoggedIn(ctx);
            let petId = this.params["id"].replace(":", "");
            requester
                .get("appdata", "pets/" + petId, "kinvey")
                .then(response => {
                    let updatedPetData = {
                        "name": response.name,
                        "description": response.description,
                        "imageURL": response.imageURL,
                        "category": response.category,
                        "likes": +response.likes + 1
                    };

                    requester
                        .update("appdata", "pets/" + petId, "kinvey", updatedPetData)
                        .then(function () {
                            history.go(-1);
                        }).catch(auth.handleError);
                }).catch(auth.handleError);
        }


        //Homepage
        this.get("/", showHomeScreen);
        this.get("/#", showHomeScreen);
        this.get("#/home", showHomeScreen);
        this.get("/index.html", showHomeScreen);

        //Login
        this.get("#/login", getLogin);
        this.post("#/login", postLogin);

        //Register
        this.get("#/register", getRegister);
        this.post("#/register", postRegister);

        //Logout
        this.get("#/logout", getLogout);

        //Display Dashboard
        this.get("#/pets/all", displayDashboard);
        this.get("#/pets/cats", displayDashboard);
        this.get("#/pets/dogs", displayDashboard);
        this.get("#/pets/parrots", displayDashboard);
        this.get("#/pets/reptiles", displayDashboard);
        this.get("#/pets/other", displayDashboard);

        //Create
        this.get("#/pets/add", getCreatePet);
        this.post("#/pets/add", postCreatePet);

        //MyPets
        this.get("#/pets/myPets", displayMyPets);

        //Details
        this.get("#/pets/details/:id", displayOtherPetDetails);
        this.get("#/pets/myPets/edit/:id", getDisplayMyPetDetails);
        this.post("#/pets/myPets/edit/:id", postDisplayMyPetDetails);

        //Pet a pet
        this.get("#/pets/like/:id", likePet);

        //Delete
        this.get("#/pets/myPets/delete/:id", getDelete);
        this.post("#/pets/myPets/delete/:id", postDelete);
    });

    app.run();
});
