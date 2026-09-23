/**
 * =========================================================
 * MENCARE HEALTH HUB
 * Health Fact Card JavaScript
 * =========================================================
 */

document.addEventListener("DOMContentLoaded", () => {

    console.log("MenCare fact-card.js loaded");


    /* =====================================================
       DEMO FACT DATA
       Later this can come from FastAPI:
       GET /api/v1/health-facts/{id}
    ===================================================== */

    const factData = {

        id: "sti-no-symptoms",

        title:
            "Some sexually transmitted infections may cause few or no noticeable symptoms.",

        description:
            "A person can have an infection without experiencing obvious symptoms. This is one reason why professional testing and appropriate healthcare are important when there may have been exposure.",

        category:
            "Sexual Health",

        topic:
            "STIs",

        explanation:
            "Some health conditions, including some sexually transmitted infections, may occur without obvious symptoms. Someone may therefore not know that they have an infection.",

        keyPoint:
            "The absence of noticeable symptoms does not always mean that an infection or health condition is absent.",

        source:
            "Reputable public health information"

    };


    /* =====================================================
       ELEMENTS
    ===================================================== */

    const factTitle =
        document.getElementById("factTitle");

    const factDescription =
        document.getElementById("factDescription");

    const factCategory =
        document.getElementById("factCategory");

    const factTopic =
        document.getElementById("factTopic");

    const factExplanation =
        document.getElementById("factExplanation");

    const factKeyPoint =
        document.getElementById("factKeyPoint");

    const factSource =
        document.getElementById("factSource");

    const factBreadcrumb =
        document.getElementById("factBreadcrumb");

    const saveFactBtn =
        document.getElementById("saveFactBtn");

    const currentYear =
        document.getElementById("currentYear");


    /* =====================================================
       LOAD FACT
    ===================================================== */

    function loadFact() {

        if (factTitle) {
            factTitle.textContent =
                factData.title;
        }

        if (factDescription) {
            factDescription.textContent =
                factData.description;
        }

        if (factCategory) {
            factCategory.textContent =
                factData.category;
        }

        if (factTopic) {
            factTopic.textContent =
                factData.topic;
        }

        if (factExplanation) {
            factExplanation.textContent =
                factData.explanation;
        }

        if (factKeyPoint) {
            factKeyPoint.textContent =
                factData.keyPoint;
        }

        if (factSource) {
            factSource.textContent =
                factData.source;
        }

        if (factBreadcrumb) {
            factBreadcrumb.textContent =
                "Health Fact";
        }

    }


    /* =====================================================
       SAVED FACTS
    ===================================================== */

    function getSavedFacts() {

        try {

            return JSON.parse(
                localStorage.getItem(
                    "mencareSavedFacts"
                )
            ) || [];

        } catch (error) {

            console.error(
                "Unable to read saved facts:",
                error
            );

            return [];

        }

    }


    function saveFact() {

        const savedFacts =
            getSavedFacts();

        const alreadySaved =
            savedFacts.includes(
                factData.id
            );


        if (alreadySaved) {

            const updatedFacts =
                savedFacts.filter(
                    id => id !== factData.id
                );

            localStorage.setItem(
                "mencareSavedFacts",
                JSON.stringify(updatedFacts)
            );

            setSavedState(false);

        } else {

            savedFacts.push(
                factData.id
            );

            localStorage.setItem(
                "mencareSavedFacts",
                JSON.stringify(savedFacts)
            );

            setSavedState(true);

        }

    }


    function setSavedState(saved) {

        if (!saveFactBtn) {
            return;
        }

        const icon =
            saveFactBtn.querySelector(
                ".save-icon"
            );

        const text =
            saveFactBtn.querySelector(
                ".save-text"
            );


        if (saved) {

            saveFactBtn.classList.add(
                "saved"
            );

            saveFactBtn.setAttribute(
                "aria-pressed",
                "true"
            );

            if (icon) {
                icon.textContent = "♥";
            }

            if (text) {
                text.textContent =
                    "Fact Saved";
            }

        } else {

            saveFactBtn.classList.remove(
                "saved"
            );

            saveFactBtn.setAttribute(
                "aria-pressed",
                "false"
            );

            if (icon) {
                icon.textContent = "♡";
            }

            if (text) {
                text.textContent =
                    "Save Fact";
            }

        }

    }


    function checkSavedState() {

        const savedFacts =
            getSavedFacts();

        const saved =
            savedFacts.includes(
                factData.id
            );

        setSavedState(saved);

    }


    /* =====================================================
       BUTTON
    ===================================================== */

    if (saveFactBtn) {

        saveFactBtn.addEventListener(
            "click",
            saveFact
        );

    }


    /* =====================================================
       FOOTER YEAR
    ===================================================== */

    if (currentYear) {

        currentYear.textContent =
            new Date().getFullYear();

    }


    /* =====================================================
       INITIALIZE
    ===================================================== */

    loadFact();

    checkSavedState();


    console.log(
        "Health fact card initialized successfully."
    );

});