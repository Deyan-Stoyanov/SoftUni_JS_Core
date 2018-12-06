$(() => {
    const app = Sammy("#main", function () {
        this.use("Handlebars", "hbs");

        const commonPartials = {
            header: "../templates/common/header.hbs",
            footer: "../templates/common/footer.hbs"
        };

        function checkLoggedIn(ctx) {
            ctx.loggedIn = sessionStorage.getItem("authtoken") !== null;
            ctx.username = sessionStorage.getItem("username");
            ctx.teamId = sessionStorage.getItem("teamId");
            ctx.hasTeam = sessionStorage.getItem("teamId") != "null" && sessionStorage.getItem("teamId") != "undefined";
        }

        function homePage(ctx) {
            checkLoggedIn(ctx);
            ctx.loadPartials(commonPartials)
                .then(function () {
                    this.partial("../templates/home/home.hbs");
                }).catch(auth.handleError);
        }

        this.get("#/home", homePage);
        this.get("#/", homePage);
        this.get("/index.html", homePage);

        this.get("#/about", function (ctx) {
            checkLoggedIn(ctx);
            this.loadPartials(commonPartials).then(function () {
                this.partial("../templates/about/about.hbs");
            });
        });

        this.get("#/login", function () {
            this.loadPartials({
                header: commonPartials.header,
                footer: commonPartials.footer,
                loginForm: "../templates/login/loginForm.hbs"
            }).then(function () {
                this.partial("../templates/login/loginPage.hbs");
            });
        });

        this.get("#/register", function () {
            this.loadPartials({
                header: commonPartials.header,
                footer: commonPartials.footer,
                registerForm: "../templates/register/registerForm.hbs"
            }).then(function () {
                this.partial("../templates/register/registerPage.hbs");
            });
        });

        this.post("#/login", function (ctx) {
            let username = ctx.params.username;
            let password = ctx.params.password;

            auth.login(username, password)
                .then(function (response) {
                    auth.saveSession(response);
                    auth.showInfo("Successfully logged in!");
                    homePage(ctx);
                }).catch(auth.handleError);
        });

        this.post("#/register", function (ctx) {
            let username = ctx.params.username;
            let password = ctx.params.password;
            let repeatPassword = ctx.params.repeatPassword;

            if (password !== repeatPassword) {
                auth.showError("Passwords do not match");
            } else {
                auth.register(username, password)
                    .then(function (response) {
                        auth.saveSession(response);
                        auth.showInfo("Successfully registered!");
                        homePage(ctx);
                    }).catch(auth.handleError);
            }
        });

        this.get("#/logout", function (ctx) {
            auth.logout()
                .then(function () {
                    sessionStorage.clear();
                    auth.showInfo("Logged out");
                    homePage(ctx);
                }).catch(auth.handleError);
        });

        function showCatalog(ctx) {
            checkLoggedIn(ctx);
            ctx.hasNoTeam = sessionStorage.getItem("teamId") !== null;
            this.loadPartials({
                header: commonPartials.header,
                footer: commonPartials.footer,
                team: "../templates/catalog/team.hbs"
            }).then(function () {
                teamsService.loadTeams()
                    .then((response) => {
                        ctx.teams = response;
                        this.partial("../templates/catalog/teamCatalog.hbs");
                    }).catch(auth.handleError);
            });
        }

        this.get("#/catalog", showCatalog);

        this.get("#/create", function (ctx) {
            checkLoggedIn(ctx);
            ctx.hasNoTeam = sessionStorage.getItem("teamId") !== null;
            this.loadPartials({
                header: commonPartials.header,
                footer: commonPartials.footer,
                createForm: "../templates/create/createForm.hbs"
            }).then(function () {
                this.partial("../templates/create/createPage.hbs");
            }).catch(auth.handleError);

        });

        this.post("#/create", function (ctx) {
            let name = ctx.params.name;
            let comment = ctx.params.comment;
            teamsService.createTeam(name, comment)
                .then(function (response) {
                    ctx.redirect("#/catalog");
                })
                .catch(auth.handleError);
        });

        this.get("#/catalog/:id", function (ctx) {
            checkLoggedIn(ctx);
            ctx.hasNoTeam = sessionStorage.getItem("teamId") !== null;
            let id = this.params["id"].replace(":", "");
            this.loadPartials({
                header: commonPartials.header,
                footer: commonPartials.footer,
                teamControls: "../templates/catalog/teamControls.hbs",
                teamMember: "../templates/catalog/teamMember.hbs"
            }).then(function () {
                teamsService.loadTeamDetails(id)
                    .then((response) => {
                        ctx.teamId = id;
                        ctx.name = response["name"];
                        ctx.comment = response["comment"];
                        ctx.members = response["members"];
                        ctx.isAuthor = response["_acl"]["creator"] == sessionStorage.getItem("userId");
                        ctx.isOnTeam = sessionStorage.getItem("teamId") == id;
                        this.partial("../templates/catalog/details.hbs");
                    }).catch(auth.handleError);
            });

        });

        this.get("#/join/:id", function (ctx) {
            let teamId = this.params["id"].replace(":", "");
            teamsService.joinTeam(teamId).then(response => {
                sessionStorage.setItem("teamId", response.teamId);
                auth.showInfo("Joined successfully.");
                ctx.redirect("#/home");
            }).catch(auth.handleError);
        });

        this.get("#/edit/:id", function (ctx) {
            checkLoggedIn(ctx);
            ctx.hasNoTeam = sessionStorage.getItem("teamId") !== null;
            this.loadPartials({
                header: commonPartials.header,
                footer: commonPartials.footer,
                editForm: "../templates/edit/editForm.hbs"
            }).then(function () {
                this.partial("../templates/edit/editPage.hbs");
            }).catch(auth.handleError);
        });

        this.post("#/edit/:id", function (ctx) {
            checkLoggedIn(ctx);
            let teamId = document.URL.substring(document.URL.lastIndexOf(":") + 1);
            ctx.hasNoTeam = sessionStorage.getItem("teamId") !== null;
            let name = ctx.params.name;
            let comment = ctx.params.comment;
            teamsService.edit(teamId, name, comment)
                .then(function () {
                    auth.showInfo("Edited successfully.");
                    ctx.redirect("#/catalog");
                })
                .catch(auth.handleError);
        });

        this.get("#/leave", function (ctx) {
            checkLoggedIn(ctx);
            teamsService.leaveTeam()
                .then(function () {
                    sessionStorage.setItem("teamId", null);
                    auth.showInfo("Left successfully.");
                    ctx.redirect("#/home");
                }).catch(auth.handleError);
        });


    });

    app.run("#/");
});
