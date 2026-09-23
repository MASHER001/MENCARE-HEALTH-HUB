/**
 * =========================================================
 * MENCARE HEALTH HUB
 * Footer JavaScript
 * =========================================================
 */

document.addEventListener("DOMContentLoaded", () => {

    console.log("MenCare footer.js loaded");


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
       FOOTER INTERNAL LINK HANDLING
    ===================================================== */

    const footer =
        document.getElementById("siteFooter");

    if (!footer) {
        return;
    }


    const footerLinks =
        footer.querySelectorAll("a");

    footerLinks.forEach(link => {

        link.addEventListener("click", () => {

            console.log(
                `Footer navigation: ${link.textContent.trim()}`
            );

        });

    });


    console.log(
        "MenCare footer initialized successfully."
    );

});