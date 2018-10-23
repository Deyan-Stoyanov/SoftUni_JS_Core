function validate() {
    $("#company").on("change", function () {
        if ($("#company").is(":checked")) {
            $("#companyInfo").css("display", "inline");
        } else {
            $("#companyInfo").css("display", "none");
        }
    });

    $("#submit").on("click", function (ev) {
        let username = $("#username").val();
        let password = $("#password").val();
        let repeatPassword = $("#confirm-password").val();
        let email = $("#email").val();

        let isUsernameValid = /^[a-zA-Z0-9]{3,20}$/g.test(username);
        let isPasswordValid = /^[a-zA-Z0-9_]{5,15}$/g.test(password);
        let isRepeatPasswordValid = /^[a-zA-Z0-9_]{5,15}$/g.test(repeatPassword) && repeatPassword === password;
        let isEmailValid = /^.*@(.*\..*)+$/g.test(email);
        let isCompanyNumberValid = true;

        if ($("#company").is(":checked")) {
            let n = $("#companyNumber").val();
            if (n < 1000 || n > 9999) {
                isCompanyNumberValid = false;
            }
        }

        debugger;
        if (!isUsernameValid) {
            $("#username").css("border-color", "red");
            ev.preventDefault();
        } else {
            $("#username").css("border", "none");
        }
        if (!isEmailValid) {
            $("#email").css("border-color", "red");
            ev.preventDefault();
        } else {
            $("#email").css("border", "none");
        }
        if (!isPasswordValid) {
            $("#password").css("border-color", "red");
            ev.preventDefault();
        } else {
            $("#password").css("border", "none");
        }
        if (!isRepeatPasswordValid) {
            $("#confirm-password").css("border-color", "red");
            ev.preventDefault();
        } else {
            $("#confirm-password").css("border", "none");
        }
        if (!isCompanyNumberValid) {
            $("#companyNumber").css("border-color", "red");
            ev.preventDefault();
        } else {
            $("#companyNumber").css("border", "none");
        }
        if(isUsernameValid && isEmailValid && isPasswordValid && isRepeatPasswordValid && isCompanyNumberValid){
            $("#valid").css("display", "block");
            ev.preventDefault();
        } else {
            $("#valid").css("display", "none");
        }
    });
}
