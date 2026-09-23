/* =========================================================
   MENCARE HEALTH HUB
   MAIN JAVASCRIPT
   Shared functionality for public + admin pages
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    console.log("MenCare main.js loaded");


    /* =====================================================
       MOBILE NAVIGATION
       Works on public pages
    ===================================================== */

    const menuToggle =
        document.getElementById("menuToggle");

    const mobileNav =
        document.getElementById("mobileNav");


    if (menuToggle && mobileNav) {

        menuToggle.addEventListener("click", () => {

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

        });


        /* Close mobile menu after clicking a link */

        const mobileLinks =
            mobileNav.querySelectorAll("a");


        mobileLinks.forEach(link => {

            link.addEventListener("click", () => {

                mobileNav.classList.remove("open");

                menuToggle.classList.remove("active");

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

                menuToggle.setAttribute(
                    "aria-label",
                    "Open navigation menu"
                );

            });

        });

    }


    /* =====================================================
       HEADER SCROLL EFFECT
       Supports both:
       .site-header
       #siteHeader
    ===================================================== */

    const publicHeader =
        document.querySelector(".site-header");

    const siteHeader =
        document.getElementById("siteHeader");


    const header =
        publicHeader || siteHeader;


    if (header) {

        const updateHeader = () => {

            if (window.scrollY > 20) {

                header.classList.add("scrolled");

            } else {

                header.classList.remove("scrolled");

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
       Supports links using [data-nav]
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
            href
                .split("/")
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
       GENERIC CLOSE BUTTONS
       Elements can use:

       data-close-target="elementId"
    ===================================================== */

    const closeButtons =
        document.querySelectorAll(
            "[data-close-target]"
        );


    closeButtons.forEach(button => {

        button.addEventListener("click", () => {

            const targetId =
                button.dataset.closeTarget;


            const target =
                document.getElementById(targetId);


            if (target) {

                target.classList.remove("open");

                target.classList.remove("show");

            }

        });

    });


    /* =====================================================
       ESCAPE KEY
       Close mobile navigation
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

                mobileNav.classList.remove("open");


                if (menuToggle) {

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

            }

        }
    );

});