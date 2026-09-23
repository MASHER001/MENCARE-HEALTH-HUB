/* =========================================================
   MENCARE HEALTH CARD
   frontend/js/health-card.js
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    console.log("MenCare health-card.js loaded");


    /* =====================================================
       ELEMENTS
    ===================================================== */

    const healthCard =
        document.getElementById("healthCard");

    const saveButton =
        document.getElementById("saveHealthBtn");

    const currentYear =
        document.getElementById("currentYear");


    /* =====================================================
       SAFETY CHECK
    ===================================================== */

    if (!healthCard) {
        console.warn("Health card element was not found.");
        return;
    }


    /* =====================================================
       HEALTH DATA
    ===================================================== */

    const healthId =
        healthCard.dataset.healthId || "bph";

    const healthCategory =
        healthCard.dataset.category || "prostate";


    /* =====================================================
       CURRENT YEAR
    ===================================================== */

    if (currentYear) {
        currentYear.textContent =
            new Date().getFullYear();
    }


    /* =====================================================
       LOCAL STORAGE
    ===================================================== */

    const storageKey =
        "mencareSavedHealthTopics";


    function getSavedTopics() {

        try {

            return JSON.parse(
                localStorage.getItem(storageKey)
            ) || [];

        } catch (error) {

            console.error(
                "Unable to read saved health topics.",
                error
            );

            return [];

        }

    }


    function saveTopics(topics) {

        localStorage.setItem(
            storageKey,
            JSON.stringify(topics)
        );

    }


    /* =====================================================
       UPDATE SAVE BUTTON
    ===================================================== */

    function updateSaveButton(isSaved) {

        if (!saveButton) {
            return;
        }

        saveButton.classList.toggle(
            "saved",
            isSaved
        );

        saveButton.setAttribute(
            "aria-pressed",
            String(isSaved)
        );


        const icon =
            saveButton.querySelector(".save-icon");

        const text =
            saveButton.querySelector(".save-text");


        if (icon) {

            icon.textContent =
                isSaved ? "♥" : "♡";

        }


        if (text) {

            text.textContent =
                isSaved ? "Saved" : "Save";

        }


        saveButton.setAttribute(
            "aria-label",
            isSaved
                ? "Remove this health topic from saved topics"
                : "Save this health topic"
        );

    }


    /* =====================================================
       INITIAL SAVE STATE
    ===================================================== */

    let savedTopics =
        getSavedTopics();

    const initiallySaved =
        savedTopics.includes(healthId);

    updateSaveButton(initiallySaved);


    /* =====================================================
       SAVE / UNSAVE
    ===================================================== */

    if (saveButton) {

        saveButton.addEventListener(
            "click",
            () => {

                savedTopics =
                    getSavedTopics();


                const index =
                    savedTopics.indexOf(healthId);


                if (index === -1) {

                    savedTopics.push(
                        healthId
                    );

                    updateSaveButton(true);

                    console.log(
                        `Saved health topic: ${healthId}`
                    );

                } else {

                    savedTopics.splice(
                        index,
                        1
                    );

                    updateSaveButton(false);

                    console.log(
                        `Removed health topic: ${healthId}`
                    );

                }


                saveTopics(savedTopics);

            }
        );

    }


    /* =====================================================
       CARD CATEGORY CLASS
    ===================================================== */

    healthCard.classList.add(
        `health-${healthCategory}`
    );


    /* =====================================================
       LOG CURRENT HEALTH TOPIC
    ===================================================== */

    console.log(
        "Health topic:",
        healthId
    );

    console.log(
        "Health category:",
        healthCategory
    );


    /* =====================================================
       FUTURE API INTEGRATION
    =====================================================

       Later this demo data can be replaced with:

       GET
       /api/v1/conditions/{id}

       Example:

       fetch(
           `http://localhost:8000/api/v1/conditions/${healthId}`
       )

    ===================================================== */

});