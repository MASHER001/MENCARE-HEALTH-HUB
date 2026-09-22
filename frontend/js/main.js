/* =========================================================
   MENCARE HEALTH HUB
   MAIN JAVASCRIPT
   Shared functionality for public + admin pages
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    console.log("MenCare main.js loaded");


    /* =====================================================
       PUBLIC MOBILE NAVIGATION
       Used by the public website
    ===================================================== */

    const menuToggle =
        document.getElementById("menuToggle");

    const mobileNav =
        document.getElementById("mobileNav");


    if (menuToggle && mobileNav) {

        menuToggle.addEventListener("click", () => {

            const isOpen =
                mobileNav.classList.toggle("open");

            menuToggle.setAttribute(
                "aria-expanded",
                String(isOpen)
            );

        });


        const mobileLinks =
            mobileNav.querySelectorAll("a");


        mobileLinks.forEach(link => {

            link.addEventListener("click", () => {

                mobileNav.classList.remove("open");

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

            });

        });

    }


    /* =====================================================
       PUBLIC HEADER SCROLL
       Only runs if a public header exists
    ===================================================== */

    const publicHeader =
        document.querySelector(".site-header");


    if (publicHeader) {

        window.addEventListener("scroll", () => {

            if (window.scrollY > 20) {

                publicHeader.classList.add(
                    "scrolled"
                );

            } else {

                publicHeader.classList.remove(
                    "scrolled"
                );

            }

        });

    }


    /* =====================================================
       CURRENT YEAR
       Works anywhere a #currentYear exists
    ===================================================== */

    const currentYear =
        document.getElementById("currentYear");


    if (currentYear) {

        currentYear.textContent =
            new Date().getFullYear();

    }


    /* =====================================================
       GENERIC CLOSE BUTTONS
       Only elements explicitly using data-close-target
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
       Generic public-page behaviour
    ===================================================== */

    document.addEventListener(
        "keydown",
        event => {

            if (event.key !== "Escape") {
                return;
            }


            /* Close public mobile navigation */

            if (
                mobileNav &&
                mobileNav.classList.contains("open")
            ) {

                mobileNav.classList.remove("open");

                if (menuToggle) {

                    menuToggle.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                }

            }

        }
    );

});
```
