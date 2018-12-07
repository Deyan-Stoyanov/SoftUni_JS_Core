function startApp() {

    const templates = {};

    function loadTemplates() {
        $.get('../templates/ads-catalog.hbs', function (data) {
            templates['catalog'] = Handlebars.compile(data);
        });
    }

    loadTemplates();

    // Hide all views and show the selected view only
    function showView(viewName) {
        $('main > section').hide();
        $('#' + viewName).show();

        if (viewName === 'viewAds') {
            loadAds();
        }
    }


    (() => {
        showView("viewHome");
        $('header').find('a[data-target]').click(navigateTo);
        $('#buttonLoginUser').click(login);
        $('#buttonRegisterUser').click(register);
        $('#linkLogout').click(logout);
        $('#buttonCreateAd').click(createAd);
        $('.notification').click(function () {
            $(this).hide();
        });
    })();

    if (localStorage.getItem('authtoken') !== null) {
        userLoggedIn();
    } else {
        userLoggedOut();
    }

    // Shows only the correct links for a logged in user
    function userLoggedIn() {
        $("#loggedInUser").text(`Welcome, ${localStorage.getItem("username")}!`);
        $("#loggedInUser").show();
        $("#linkHome").show();
        $("#linkListAds").show();
        $("#linkCreateAd").show();
        $("#linkLogout").show();
        $("#linkLogin").hide();
        $("#linkRegister").hide();
    }

    // Shows only the correct links for an anonymous user
    function userLoggedOut() {
        $("#linkHome").show();
        $("#linkLogin").show();
        $("#linkRegister").show();
        $("#linkListAds").hide();
        $("#linkCreateAd").hide();
        $("#linkLogout").hide();
        $("#loggedInUser").hide();
        $("#loggedInUser").text("");
    }

    function navigateTo() {
        showView($(this).attr("data-target"));
    }

    // Saves username/id/authtoken to local storage
    function saveSession(data) {
        localStorage.setItem('username', data.username);
        localStorage.setItem('id', data._id);
        localStorage.setItem('authtoken', data._kmd.authtoken);
        userLoggedIn();
    }

    // Logs in the user
    async function login() {
        let form = $('#formLogin');
        let username = form.find('input[name="username"]').val();
        let password = form.find('input[name="passwd"]').val();

        try {
            let response = await requester.post('user', 'login', 'basic', {
                username,
                password
            });
            saveSession(response);
            showView('viewAds');
            showInfo('Successfully logged in!');
        } catch (e) {
            handleError(e);
        }
    }

    // Register a user
    async function register() {
        let form = $('#formRegister');
        let username = form.find('input[name="username"]').val();
        let password = form.find('input[name="passwd"]').val();

        try {
            let response = await requester.post('user', '', 'basic', {
                username,
                password
            });
            saveSession(response);
            showView('viewAds');
            showInfo('Successfully registered!');
        } catch (e) {
            handleError(e);
        }
    }

    // Logout a user
    async function logout() {
        try {
            await requester.post('user', '_logout', 'kinvey', {
                authtoken: localStorage.getItem('authtoken')
            });
            localStorage.clear(); // Clears all session storage on logout
            userLoggedOut();
            showView('viewHome');
            showInfo('Logout successful!')
        } catch (e) {
            handleError(e);
        }
    }

    // Load all ads
    async function loadAds() {
        let ads = await requester.get("appdata", "adverts");
        ads.forEach(a => {
            if (a._acl.creator == localStorage.getItem("id")) {
                a.isAuthor = true;
            }
        });
        let context = {
            ads
        };
        let template = templates.catalog;
        let html = template(context);
        $("#content").html(html);
        $("#content *").attr('style', 'display: block !important');
        $("#content").find(".edit").click(openEditAd);
        $("#content").find(".delete").click(deleteAd);
    }

    // Create an add
    async function createAd() {
        let form = $("#formCreateAd");
        let title = form.find('input[name="title"]').val();
        let description = form.find('textarea[name="description"]').val();
        let price = form.find('input[name="price"]').val();
        let imageUrl = form.find('input[name="imageUrl"]').val();
        let author = localStorage.getItem("username");
        if (title == "" || price == "") {
            showError("Every advertisment must have title and price!");
            return;
        }
        try {
            await requester.post("appdata", "adverts", "", {
                title,
                description,
                price,
                imageUrl,
                author
            });
            showView('viewAds');
            showInfo('Successfully created advertisment!');
            $("#formCreateAd").reset();
        } catch (e) {
            handleError(e);
        }
    }

    // Delete an add
    async function deleteAd() {
        let id = $(this).parent().attr("data-id");
        await requester.remove("appdata", `adverts/${id}`, "");
    }

    // Edit an add
    async function editAd(id, publisher) {
        let title = form.find('input[name="title"]').val();
        let description = form.find('textarea[name="description"]').val();
        let price = form.find('input[name="price"]').val();
        let imageUrl = form.find('input[name="imageUrl"]').val();
        let author = localStorage.getItem("username");
        if (title == "" || price == "") {
            showError("Every advertisment must have title and price!");
            return;
        }
        try {
            await requester.update("appdata", `adverts/${id}`, "", {
                title,
                description,
                price,
                imageUrl,
                author
            });
            showView('viewAds');
            showInfo('Successfully created advertisment!');
            $("#formCreateAd").reset();
        } catch (e) {
            handleError(e);
        }
    }

    // Open edit add view
    async function openEditAd() {
        let id = $(this).parent().attr("data-id");
        let ad = await requester.get("appdata", `adverts/${id}`, "kinvey");
        showView("viewEditAd");
        $('#formEditAd input[name=title]').val(ad.title);
        $('#formEditAd textarea[name=description]').val(ad.description);
        $('#formEditAd input[name=price]').val(ad.price);
        $('#formEditAd input[name=imageUrl]').val(ad.imageUrl);
        $("#buttonEditAd").on("click", function () {
            editAd(id, localStorage.getItem("username"));
        });
    }
}
