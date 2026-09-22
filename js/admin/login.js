document.addEventListener("DOMContentLoaded", () => {

    console.log("MenCare admin-login.js loaded");


    /* =================================
       ELEMENTS
    ================================== */

    const loginForm =
        document.getElementById("adminLoginForm");

    const emailInput =
        document.getElementById("adminEmail");

    const passwordInput =
        document.getElementById("adminPassword");

    const rememberInput =
        document.getElementById("rememberAdmin");

    const passwordToggle =
        document.getElementById("passwordToggle");

    const submitButton =
        document.getElementById("loginSubmitBtn");

    const buttonText =
        document.getElementById("loginButtonText");

    const spinner =
        document.getElementById("loginSpinner");

    const loginAlert =
        document.getElementById("loginAlert");

    const loginAlertMessage =
        document.getElementById("loginAlertMessage");

    const emailError =
        document.getElementById("emailError");

    const passwordError =
        document.getElementById("passwordError");

    const forgotPassword =
        document.getElementById("forgotPassword");


    /* =================================
       DEMO ADMIN
       
       TEMPORARY FRONTEND TESTING ONLY
    ================================== */

    const DEMO_EMAIL =
        "admin@mencare.org";

    const DEMO_PASSWORD =
        "admin123";


    /* =================================
       SHOW ALERT
    ================================== */

    function showAlert(message) {

        if (!loginAlert) {
            return;
        }

        loginAlertMessage.textContent =
            message;

        loginAlert.hidden = false;

        loginAlert.classList.add(
            "show"
        );

    }


    /* =================================
       HIDE ALERT
    ================================== */

    function hideAlert() {

        if (!loginAlert) {
            return;
        }

        loginAlert.hidden = true;

        loginAlert.classList.remove(
            "show"
        );

    }


    /* =================================
       CLEAR ERRORS
    ================================== */

    function clearErrors() {

        emailError.textContent = "";
        passwordError.textContent = "";

        emailInput.classList.remove(
            "input-error"
        );

        passwordInput.classList.remove(
            "input-error"
        );

    }


    /* =================================
       EMAIL VALIDATION
    ================================== */

    function isValidEmail(email) {

        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/
            .test(email);

    }


    /* =================================
       FORM VALIDATION
    ================================== */

    function validateForm() {

        clearErrors();

        let valid = true;


        const email =
            emailInput.value.trim();

        const password =
            passwordInput.value;


        /* Email */

        if (!email) {

            emailError.textContent =
                "Email address is required.";

            emailInput.classList.add(
                "input-error"
            );

            valid = false;

        } else if (!isValidEmail(email)) {

            emailError.textContent =
                "Enter a valid email address.";

            emailInput.classList.add(
                "input-error"
            );

            valid = false;
        }


        /* Password */

        if (!password) {

            passwordError.textContent =
                "Password is required.";

            passwordInput.classList.add(
                "input-error"
            );

            valid = false;

        } else if (password.length < 6) {

            passwordError.textContent =
                "Password must contain at least 6 characters.";

            passwordInput.classList.add(
                "input-error"
            );

            valid = false;
        }


        return valid;

    }


    /* =================================
       PASSWORD TOGGLE
    ================================== */

    if (passwordToggle) {

        passwordToggle.addEventListener(
            "click",
            () => {

                const showing =
                    passwordInput.type === "text";


                if (showing) {

                    passwordInput.type =
                        "password";

                    passwordToggle.textContent =
                        "Show";

                    passwordToggle.setAttribute(
                        "aria-label",
                        "Show password"
                    );

                    passwordToggle.setAttribute(
                        "aria-pressed",
                        "false"
                    );

                } else {

                    passwordInput.type =
                        "text";

                    passwordToggle.textContent =
                        "Hide";

                    passwordToggle.setAttribute(
                        "aria-label",
                        "Hide password"
                    );

                    passwordToggle.setAttribute(
                        "aria-pressed",
                        "true"
                    );

                }

            }
        );

    }


    /* =================================
       DEMO LOGIN
    ================================== */

    function demoLogin(email, password) {

        return (
            email === DEMO_EMAIL &&
            password === DEMO_PASSWORD
        );

    }


    /* =================================
       LOGIN SUBMIT
    ================================== */

    if (loginForm) {

        loginForm.addEventListener(
            "submit",
            async (event) => {

                event.preventDefault();

                hideAlert();


                /* Validate */

                if (!validateForm()) {
                    return;
                }


                const email =
                    emailInput.value.trim();

                const password =
                    passwordInput.value;


                /* Loading state */

                submitButton.disabled = true;

                buttonText.textContent =
                    "Signing in...";

                spinner.classList.add(
                    "active"
                );


                /*
                 * Small delay to simulate
                 * authentication request.
                 */

                await new Promise(
                    resolve =>
                        setTimeout(
                            resolve,
                            700
                        )
                );


                /* Demo authentication */

                if (
                    demoLogin(
                        email,
                        password
                    )
                ) {

                    const adminSession = {
                        email: email,
                        role: "admin",
                        loggedIn: true,
                        loginTime:
                            new Date().toISOString()
                    };


                    const storage =
                        rememberInput.checked
                            ? localStorage
                            : sessionStorage;


                    storage.setItem(
                        "mencareAdminSession",
                        JSON.stringify(
                            adminSession
                        )
                    );


                    buttonText.textContent =
                        "Success!";


                    spinner.classList.remove(
                        "active"
                    );


                    /*
                     * Redirect to dashboard
                     */

                    setTimeout(() => {

                        window.location.href =
                            "dashboard.html";

                    }, 350);


                } else {

                    submitButton.disabled =
                        false;

                    buttonText.textContent =
                        "Sign In";

                    spinner.classList.remove(
                        "active"
                    );


                    showAlert(
                        "The email or password you entered is incorrect."
                    );


                    passwordInput.focus();

                }

            }
        );

    }


    /* =================================
       FORGOT PASSWORD
    ================================== */

    if (forgotPassword) {

        forgotPassword.addEventListener(
            "click",
            (event) => {

                event.preventDefault();

                showAlert(
                    "Password recovery will be available when the backend authentication system is connected."
                );

            }
        );

    }


    /* =================================
       REMOVE ERRORS WHILE TYPING
    ================================== */

    if (emailInput) {

        emailInput.addEventListener(
            "input",
            () => {

                emailInput.classList.remove(
                    "input-error"
                );

                emailError.textContent = "";

                hideAlert();

            }
        );

    }


    if (passwordInput) {

        passwordInput.addEventListener(
            "input",
            () => {

                passwordInput.classList.remove(
                    "input-error"
                );

                passwordError.textContent = "";

                hideAlert();

            }
        );

    }


    console.log(
        "Admin login initialized successfully."
    );

});