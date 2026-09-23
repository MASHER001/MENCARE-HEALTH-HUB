/* =========================================================
   MENCARE MAIN JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    console.log("MenCare main.js loaded");


    /* =====================================================
       MOBILE NAVIGATION
    ===================================================== */

    const menuToggle =
        document.getElementById("menuToggle");

    const mobileNav =
        document.getElementById("mobileNav");


    if (menuToggle && mobileNav) {

        menuToggle.addEventListener(
            "click",
            () => {

                const isOpen =
                    mobileNav.classList.toggle("open");

                menuToggle.classList.toggle(
                    "active",
                    isOpen
                );

                menuToggle.setAttribute(
                    "aria-expanded",
                    String(isOpen)
                );

                menuToggle.setAttribute(
                    "aria-label",
                    isOpen
                        ? "Close navigation menu"
                        : "Open navigation menu"
                );

            }
        );


        /* Close mobile menu after clicking a link */

        const mobileLinks =
            mobileNav.querySelectorAll("a");

        mobileLinks.forEach(link => {

            link.addEventListener(
                "click",
                () => {

                    mobileNav.classList.remove(
                        "open"
                    );

                    menuToggle.classList.remove(
                        "active"
                    );

                    menuToggle.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                    menuToggle.setAttribute(
                        "aria-label",
                        "Open navigation menu"
                    );

                }
            );

        });

    }


    /* =====================================================
       HEADER SCROLL EFFECT
    ===================================================== */

    const siteHeader =
        document.getElementById("siteHeader");


    if (siteHeader) {

        const updateHeader =
            () => {

                if (window.scrollY > 20) {

                    siteHeader.classList.add(
                        "scrolled"
                    );

                } else {

                    siteHeader.classList.remove(
                        "scrolled"
                    );

                }

            };


        window.addEventListener(
            "scroll",
            updateHeader,
            { passive: true }
        );

        updateHeader();

    }


    /* =====================================================
       ACTIVE NAVIGATION
    ===================================================== */

    const currentPage =
        window.location.pathname
            .split("/")
            .pop()
            .toLowerCase();


    const navLinks =
        document.querySelectorAll(
            "[data-nav]"
        );


    navLinks.forEach(link => {

        const href =
            link.getAttribute("href");

        if (!href) {
            return;
        }


        const targetPage =
            href.split("/")
                .pop()
                .split("?")[0]
                .toLowerCase();


        if (
            targetPage &&
            targetPage === currentPage
        ) {

            link.classList.add("active");

        }

    });


    /* =====================================================
       CURRENT YEAR
    ===================================================== */

    const currentYear =
        document.getElementById("currentYear");


    if (currentYear) {

        currentYear.textContent =
            new Date().getFullYear();

    }


    /* =====================================================
       ESCAPE KEY
    ===================================================== */

    document.addEventListener(
        "keydown",
        event => {

            if (event.key !== "Escape") {
                return;
            }


            if (
                mobileNav &&
                mobileNav.classList.contains("open")
            ) {

                mobileNav.classList.remove(
                    "open"
                );

                if (menuToggle) {

                    menuToggle.classList.remove(
                        "active"
                    );

                    menuToggle.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                }

            }

        }
    );

});