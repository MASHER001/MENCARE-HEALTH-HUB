/* =========================================================
   MENCARE HEALTH HUB
   Condition Card JavaScript
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    console.log("MenCare condition-card.js loaded");


    /* =====================================================
       CONDITION CARD
    ====================================================== */

    const conditionCard =
        document.querySelector(".condition-card");


    if (!conditionCard) {
        console.warn(
            "Condition card was not found."
        );

        return;
    }


    /* =====================================================
       SAVE CONDITION
    ====================================================== */

    const saveButton =
        document.getElementById(
            "saveConditionBtn"
        );


    if (saveButton) {

        saveButton.addEventListener(
            "click",
            () => {

                const isSaved =
                    saveButton.classList.contains(
                        "saved"
                    );


                if (isSaved) {

                    saveButton.classList.remove(
                        "saved"
                    );

                    saveButton.setAttribute(
                        "aria-pressed",
                        "false"
                    );

                    saveButton.querySelector(
                        ".save-icon"
                    ).textContent = "♡";

                    saveButton.querySelector(
                        ".save-text"
                    ).textContent = "Save";

                } else {

                    saveButton.classList.add(
                        "saved"
                    );

                    saveButton.setAttribute(
                        "aria-pressed",
                        "true"
                    );

                    saveButton.querySelector(
                        ".save-icon"
                    ).textContent = "♥";

                    saveButton.querySelector(
                        ".save-text"
                    ).textContent = "Saved";

                }

            }
        );

    }


    /* =====================================================
       SCROLL REVEAL
    ====================================================== */

    const revealElements =
        document.querySelectorAll(
            ".reveal-on-scroll"
        );


    if (
        "IntersectionObserver"
        in window
    ) {

        const observer =
            new IntersectionObserver(
                (entries, observer) => {

                    entries.forEach(entry => {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target.classList.add(
                                "is-visible"
                            );

                            observer.unobserve(
                                entry.target
                            );

                        }

                    });

                },
                {
                    threshold: 0.15
                }
            );


        revealElements.forEach(element => {
            observer.observe(element);
        });

    } else {

        revealElements.forEach(element => {
            element.classList.add(
                "is-visible"
            );
        });

    }


    /* =====================================================
       CONDITION DATA
    ====================================================== */

    const conditionId =
        conditionCard.dataset.conditionId;

    const category =
        conditionCard.dataset.category;


    console.log(
        "Condition:",
        conditionId
    );

    console.log(
        "Category:",
        category
    );

});