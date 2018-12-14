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

        const memePartials = {
            catalog: "./templates/memes/catalog.hbs",
            create: "./templates/memes/create.hbs",
            details: "./templates/memes/details.hbs",
            edit: "./templates/memes/edit.hbs",
            userMeme: "./templates/memes/userMeme.hbs",
            meme: "./templates/memes/meme.hbs"
        };

        const userPartials = {
            login: "./templates/user/login.hbs",
            profile: "./templates/user/profile.hbs",
            register: "./templates/user/register.hbs",
        };

        function checkLoggedIn(ctx) {
            ctx.loggedIn = sessionStorage.getItem("authtoken") != undefined;
            ctx.username = sessionStorage.getItem("username");
            ctx.userId = sessionStorage.getItem("userId");
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
                        meme: memePartials.meme
                    })
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

            auth
                .login(username, password)
                .then(function (response) {
                    auth.saveSession(response);
                    auth.showInfo("Successfully logged in!");
                    showHomeScreen(ctx);
                }).catch(auth.handleError);
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
            let repeatPassword = ctx.params.repeatPass;
            let email = ctx.params.email;
            let avatarUrl = ctx.params.avatarUrl;
            if (username.length < 3) {
                auth.showError("Username must be at least 3 characters long!");
            } else if (password.length < 6) {
                auth.showError("Password must be at least 6 characters long!");
            } else if (password != repeatPassword) {
                auth.showError("Passwords do not match!");
            } else {
                auth
                    .register(username, password, repeatPassword, email, avatarUrl)
                    .then(function (response) {
                        auth.saveSession(response);
                        auth.showInfo("Successfully registered!");
                        showHomeScreen(ctx);
                    }).catch(auth.handleError);
            }
        }

        function logout(ctx) {
            checkLoggedIn(ctx);
            auth
                .logout()
                .then(function () {
                    sessionStorage.clear();
                    auth.showInfo("Logout successful!");
                    showHomeScreen(ctx);
                }).catch(auth.handleError);
        }

        function getCreate(ctx) {
            checkLoggedIn(ctx);
            ctx
                .loadPartials(commonPartials)
                .then(function () {
                    this.partial(memePartials.create);
                }).catch(auth.handleError);
        }

        function postCreate(ctx) {
            checkLoggedIn(ctx);
            let title = ctx.params.title;
            let description = ctx.params.description;
            let imageUrl = ctx.params.imageUrl;

            if (title.length > 33) {
                auth.showError("Title should not exceed 33 characters!");
            } else if (description.length < 30 || description.length > 450) {
                auth.showError("Description should be between 33 and 450 characters!");
            } else if (!(imageUrl.startsWith("http"))) {
                auth.showError("Url invalid!");
            } else {
                const memeData = {
                    "title": title,
                    "description": description,
                    "imageUrl": imageUrl,
                    "author": sessionStorage.getItem("username")
                };
                requester
                    .post("appdata", "memes", "kinvey", memeData)
                    .then(function () {
                        auth.showInfo("Successfully published!");
                        showHomeScreen(ctx);
                    }).catch(auth.handleError);
            }
        }

        function feed(ctx) {
            checkLoggedIn(ctx);
            ctx
                .loadPartials({
                    header: commonPartials.header,
                    footer: commonPartials.footer,
                    meme: memePartials.meme
                })
                .then(function () {
                    requester
                        .get("appdata", "memes", "kinvey")
                        .then(response => {
                            response.forEach(x => x.isAuthor = (x.author == ctx.username));
                            ctx.memes = response;
                            this.partial("./templates/memes/catalog.hbs");
                        })
                        .catch(auth.handleError);
                }).catch(auth.handleError);
        }

        function getEdit(ctx) {
            checkLoggedIn(ctx);
            let memeId = this.params["id"].replace(":", "");
            ctx
                .loadPartials(commonPartials)
                .then(function () {
                    requester
                        .get("appdata", "memes/" + memeId, "kinvey")
                        .then(response => {
                            ctx.title = response.title;
                            ctx.description = response.description;
                            ctx.imageUrl = response.imageUrl;
                            ctx.author = response.author;
                            this.partial(memePartials.edit);
                        }).catch(auth.handleError);
                }).catch(auth.handleError);
        }

        function postEdit(ctx) {
            checkLoggedIn(ctx);
            let memeId = document.URL.substring(document.URL.lastIndexOf(":") + 1);
            ctx.memeId = memeId;
            let title = ctx.params.title;
            let description = ctx.params.description;
            let imageUrl = ctx.params.imageUrl;
            if (title.length > 33) {
                auth.showError("Title should not exceed 33 characters!");
            } else if (description.length < 30 || description.length > 450) {
                auth.showError("Description should be between 33 and 450 characters!");
            } else if (!(imageUrl.startsWith("http"))) {
                auth.showError("Url invalid!");
            } else {
                const memeData = {
                    "title": title,
                    "description": description,
                    "imageUrl": imageUrl,
                    "author": sessionStorage.getItem("username")
                };
                requester
                    .update("appdata", "memes/" + memeId, "kinvey", memeData)
                    .then(function () {
                        auth.showInfo("Successfully updated!");
                        showHomeScreen(ctx);
                    }).catch(auth.handleError);
            }
        }

        function getDelete(ctx) {
            let memeId = this.params["id"].replace(":", "");
            requester.remove("appdata", "memes/" + memeId, "kinvey")
                .then(function () {
                    auth.showInfo("Succesfully deleted!");
                    showHomeScreen(ctx);
                }).catch(auth.handleError);
        }

        function loadDetails(ctx) {
            checkLoggedIn(ctx);
            let memeId = this.params["id"].replace(":", "");
            ctx
                .loadPartials(commonPartials)
                .then(function () {
                    requester
                        .get("appdata", "memes/" + memeId, "kinvey")
                        .then(response => {
                            ctx.title = response.title;
                            ctx.description = response.description;
                            ctx.imageUrl = response.imageUrl;
                            ctx.author = response.author;
                            ctx.isAuthor = response.author == sessionStorage.getItem("username");
                            this.partial(memePartials.details);
                        }).catch(auth.handleError);
                }).catch(auth.handleError);
        }

        function loadProfile(ctx) {
            checkLoggedIn(ctx);
            const userId = document.URL.substring(document.URL.lastIndexOf(":") + 1);
            ctx
                .loadPartials({
                    header: commonPartials.header,
                    footer: commonPartials.footer,
                    userMeme: memePartials.userMeme
                }).then(function () {
                    requester.get("user", userId, "kinvey")
                        .then(response => {
                            ctx.username = response.username;
                            ctx.avatarUrl = response.avatarUrl;
                            ctx.userId = userId;
                            requester.get("appdata", "memes", "kinvey")
                                .then(allMemes => {
                                    ctx.memes = allMemes.filter(x => x.author == ctx.username);
                                    this.partial(userPartials.profile);
                                }).catch(auth.handleError);
                        }).catch(auth.handleError);
                }).catch(auth.handleError);
        }

        function deleteProfile(ctx) {
            const userId = document.URL.substring(document.URL.lastIndexOf(":") + 1);
            logout(ctx);
            requester.remove("user", userId, "kinvey")
                .then(function () {
                    auth.showInfo("Succesfully deleted profile!");
                    showHomeScreen(ctx);
                }).catch(auth.handleError);
        }

        //Homepage
        this.get("/", showHomeScreen);
        this.get("/#", showHomeScreen);
        this.get("#/home", showHomeScreen);
        this.get("#/index.html", showHomeScreen);

        //Login
        this.get("#/login", getLogin);
        this.post("#/login", postLogin);

        //Register
        this.get("#/register", getRegister);
        this.post("#/register", postRegister);

        //Logout
        this.get("#/logout", logout);

        //CRUD
        this.get("#/memes", feed);

        this.get("#/memes/details/:id", loadDetails);

        this.get("#/memes/create", getCreate);
        this.post("#/memes/create", postCreate);

        this.get("#/memes/edit/:id", getEdit);
        this.post("#/memes/edit/:id", postEdit);

        this.get("#/memes/delete/:id", getDelete);

        //User
        this.get("#/profile/:id", loadProfile);
        this.get("#/profile/delete/:id", deleteProfile);

    });

    app.run();
});
