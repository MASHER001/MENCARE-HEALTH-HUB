/* =========================================================
   MENCARE HEALTH HUB
   ADMIN DASHBOARD JAVASCRIPT
========================================================= */


document.addEventListener(
    "DOMContentLoaded",
    () => {


        /* =================================================
           ELEMENTS
        ================================================== */

        const adminMenuToggle =
            document.getElementById(
                "adminMenuToggle"
            );


        const adminSidebar =
            document.getElementById(
                "adminSidebar"
            );


        const logoutButton =
            document.getElementById(
                "logoutButton"
            );


        const currentDate =
            document.getElementById(
                "currentDate"
            );


        /* =================================================
           DISPLAY CURRENT DATE
        ================================================== */

        if (currentDate) {

            const today =
                new Date();


            const dateText =
                today.toLocaleDateString(
                    "en-KE",
                    {
                        weekday: "long",
                        day: "numeric",
                        month: "long",
                        year: "numeric"
                    }
                );


            currentDate.textContent =
                dateText;

        }


        /* =================================================
           MOBILE SIDEBAR
        ================================================== */

        if (
            adminMenuToggle &&
            adminSidebar
        ) {

            adminMenuToggle.addEventListener(
                "click",
                () => {

                    const isOpen =
                        adminSidebar.classList.toggle(
                            "open"
                        );


                    adminMenuToggle.setAttribute(
                        "aria-expanded",
                        isOpen
                    );

                }
            );

        }


        /* =================================================
           CLOSE MOBILE SIDEBAR
        ================================================== */

        if (adminSidebar) {

            const sidebarLinks =
                adminSidebar.querySelectorAll(
                    ".admin-nav-link"
                );


            sidebarLinks.forEach(
                link => {

                    link.addEventListener(
                        "click",
                        () => {

                            if (
                                window.innerWidth <= 900
                            ) {

                                adminSidebar.classList.remove(
                                    "open"
                                );


                                if (
                                    adminMenuToggle
                                ) {

                                    adminMenuToggle.setAttribute(
                                        "aria-expanded",
                                        "false"
                                    );

                                }

                            }

                        }
                    );

                }
            );

        }


        /* =================================================
           LOGOUT
        ================================================== */

        if (logoutButton) {

            logoutButton.addEventListener(
                "click",
                () => {

                    const confirmed =
                        window.confirm(
                            "Are you sure you want to log out?"
                        );


                    if (!confirmed) {
                        return;
                    }


                    /*
                     * Temporary frontend logout.
                     *
                     * Later this will be replaced by
                     * the FastAPI authentication flow.
                     */

                    localStorage.removeItem(
                        "mencare_admin_token"
                    );


                    sessionStorage.removeItem(
                        "mencare_admin_session"
                    );


                    window.location.href =
                        "admin-login.html";

                }
            );

        }


        /* =================================================
           CURRENT FRONTEND STATISTICS
           
           These values are temporary.
           They will later come from FastAPI/Supabase.
        ================================================== */

        const dashboardStats = {

            categories: 3,

            conditions: 7,

            symptoms: 6,

            facilities: 0,

            healthFacts: 0,

            myths: 0

        };


        updateStatistics(
            dashboardStats
        );


        /* =================================================
           UPDATE STATISTICS
        ================================================== */

        function updateStatistics(
            stats
        ) {

            const elements = {

                categories:
                    document.getElementById(
                        "totalCategories"
                    ),

                conditions:
                    document.getElementById(
                        "totalConditions"
                    ),

                symptoms:
                    document.getElementById(
                        "totalSymptoms"
                    ),

                facilities:
                    document.getElementById(
                        "totalFacilities"
                    ),

                healthFacts:
                    document.getElementById(
                        "totalHealthFacts"
                    ),

                myths:
                    document.getElementById(
                        "totalMyths"
                    )

            };


            if (elements.categories) {

                elements.categories.textContent =
                    stats.categories;

            }


            if (elements.conditions) {

                elements.conditions.textContent =
                    stats.conditions;

            }


            if (elements.symptoms) {

                elements.symptoms.textContent =
                    stats.symptoms;

            }


            if (elements.facilities) {

                elements.facilities.textContent =
                    stats.facilities;

            }


            if (elements.healthFacts) {

                elements.healthFacts.textContent =
                    stats.healthFacts;

            }


            if (elements.myths) {

                elements.myths.textContent =
                    stats.myths;

            }

        }

    }
);