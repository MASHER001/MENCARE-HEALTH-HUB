document.addEventListener("DOMContentLoaded", () => {

    console.log("MenCare health-facts.js loaded");


    /* =========================
       ELEMENTS
    ========================== */

    const searchInput =
        document.getElementById("factSearch");

    const clearSearchBtn =
        document.getElementById("clearFactSearch");

    const filterButtons =
        document.querySelectorAll(".fact-filter-btn");

    const factCards =
        document.querySelectorAll(".health-fact-card");

    const emptyState =
        document.getElementById("factsEmptyState");

    const resetButton =
        document.getElementById("resetFactsBtn");

    const factCount =
        document.getElementById("factCount");

    const saveButtons =
        document.querySelectorAll(".save-fact-btn");


    let activeFilter = "all";


    /* =========================
       CURRENT YEAR
    ========================== */

    const currentYear =
        document.getElementById("currentYear");

    if (currentYear) {
        currentYear.textContent =
            new Date().getFullYear();
    }


    /* =========================
       LOCAL STORAGE
    ========================== */

    const STORAGE_KEY =
        "mencareSavedFacts";


    function getSavedFacts() {

        try {

            return JSON.parse(
                localStorage.getItem(STORAGE_KEY)
            ) || [];

        } catch (error) {

            console.error(
                "Could not read saved facts:",
                error
            );

            return [];
        }
    }


    function saveFacts(facts) {

        localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(facts)
        );
    }


    /* =========================
       UPDATE SAVE BUTTONS
    ========================== */

    function updateSaveButtons() {

        const savedFacts =
            getSavedFacts();

        saveButtons.forEach(button => {

            const factId =
                button.dataset.factId;

            const isSaved =
                savedFacts.includes(factId);

            button.classList.toggle(
                "saved",
                isSaved
            );

            button.setAttribute(
                "aria-pressed",
                String(isSaved)
            );

            button.textContent =
                isSaved ? "♥" : "♡";

            button.setAttribute(
                "aria-label",
                isSaved
                    ? "Remove saved health fact"
                    : "Save this health fact"
            );

        });
    }


    /* =========================
       SAVE FACT
    ========================== */

    saveButtons.forEach(button => {

        button.addEventListener("click", () => {

            const factId =
                button.dataset.factId;

            if (!factId) {
                return;
            }

            let savedFacts =
                getSavedFacts();

            const alreadySaved =
                savedFacts.includes(factId);


            if (alreadySaved) {

                savedFacts =
                    savedFacts.filter(
                        id => id !== factId
                    );

            } else {

                savedFacts.push(factId);
            }


            saveFacts(savedFacts);

            updateSaveButtons();


            /* Small visual feedback */
            button.classList.remove("save-feedback");

            void button.offsetWidth;

            button.classList.add("save-feedback");

        });

    });


    /* =========================
       FILTER FACTS
    ========================== */

    function filterFacts() {

        const searchTerm =
            searchInput
                ? searchInput.value
                    .toLowerCase()
                    .trim()
                : "";


        let visibleCount = 0;


        factCards.forEach(card => {

            const category =
                card.dataset.category || "";

            const searchableText =
                card.dataset.search
                    ? card.dataset.search.toLowerCase()
                    : card.textContent.toLowerCase();


            const matchesSearch =
                searchableText.includes(searchTerm);


            const matchesCategory =
                activeFilter === "all" ||
                category === activeFilter;


            const shouldShow =
                matchesSearch &&
                matchesCategory;


            card.hidden = !shouldShow;


            if (shouldShow) {
                visibleCount++;
            }

        });


        /* Update count */
        if (factCount) {

            factCount.textContent =
                `Showing ${visibleCount} ${
                    visibleCount === 1
                        ? "fact"
                        : "facts"
                }`;

        }


        /* Empty state */

        if (emptyState) {

            emptyState.hidden =
                visibleCount !== 0;

        }


        /* Clear button */

        if (clearSearchBtn && searchInput) {

            clearSearchBtn.hidden =
                searchInput.value.trim() === "";

        }

    }


    /* =========================
       SEARCH
    ========================== */

    if (searchInput) {

        searchInput.addEventListener(
            "input",
            filterFacts
        );

    }


    /* =========================
       CLEAR SEARCH
    ========================== */

    if (clearSearchBtn) {

        clearSearchBtn.addEventListener(
            "click",
            () => {

                if (searchInput) {
                    searchInput.value = "";
                    searchInput.focus();
                }

                filterFacts();

            }
        );

    }


    /* =========================
       CATEGORY FILTER
    ========================== */

    filterButtons.forEach(button => {

        button.addEventListener(
            "click",
            () => {

                filterButtons.forEach(btn => {

                    btn.classList.remove(
                        "active"
                    );

                });


                button.classList.add(
                    "active"
                );


                activeFilter =
                    button.dataset.filter ||
                    "all";


                filterFacts();

            }
        );

    });


    /* =========================
       RESET
    ========================== */

    if (resetButton) {

        resetButton.addEventListener(
            "click",
            () => {

                activeFilter = "all";


                filterButtons.forEach(
                    button => {

                        button.classList.toggle(
                            "active",
                            button.dataset.filter === "all"
                        );

                    }
                );


                if (searchInput) {
                    searchInput.value = "";
                }


                filterFacts();

            }
        );

    }


    /* =========================
       INITIALIZE
    ========================== */

    updateSaveButtons();

    filterFacts();


    console.log(
        "Health Facts page initialized successfully."
    );

});