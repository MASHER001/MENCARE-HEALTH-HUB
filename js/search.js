/* =========================================================
   MENCARE HEALTH HUB
   SEARCH PAGE
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const searchForm =
        document.getElementById("searchForm");

    const searchInput =
        document.getElementById("searchInput");

    const clearSearch =
        document.getElementById("clearSearch");

    const searchResults =
        document.getElementById("searchResults");

    const loadingState =
        document.getElementById("loadingState");

    const emptyState =
        document.getElementById("emptyState");

    const initialState =
        document.getElementById("initialState");

    const resultsHeader =
        document.getElementById("resultsHeader");

    const resultsTitle =
        document.getElementById("resultsTitle");

    const resultsCount =
        document.getElementById("resultsCount");

    const resultFilters =
        document.getElementById("resultFilters");

    const resultFilterButtons =
        document.querySelectorAll(".result-filter");

    const suggestionButtons =
        document.querySelectorAll(".suggestion-link");


    /* =====================================================
       SAMPLE SEARCH DATA
       Replace this later with API data
    ===================================================== */

    const searchData = [

        /* ---------------- CONDITIONS ---------------- */

        {
            id: "bph",
            title: "Benign Prostatic Hyperplasia",
            category: "condition",
            categoryLabel: "Condition",
            description:
                "A non-cancerous enlargement of the prostate that may affect urination.",
            keywords:
                "bph benign prostatic hyperplasia prostate enlarged prostate urination",
            link: "condition-details.html?condition=bph",
            icon: "P"
        },

        {
            id: "prostatitis",
            title: "Prostatitis",
            category: "condition",
            categoryLabel: "Condition",
            description:
                "Inflammation of the prostate that can be associated with urinary or pelvic symptoms.",
            keywords:
                "prostatitis prostate inflammation pelvic urinary",
            link: "condition-details.html?condition=prostatitis",
            icon: "P"
        },

        {
            id: "uti",
            title: "Urinary Tract Infection",
            category: "condition",
            categoryLabel: "Condition",
            description:
                "An infection affecting parts of the urinary tract, which may cause urinary discomfort.",
            keywords:
                "uti urinary tract infection bladder urine urination infection",
            link: "condition-details.html?condition=uti",
            icon: "U"
        },

        {
            id: "urethritis",
            title: "Urethritis",
            category: "condition",
            categoryLabel: "Condition",
            description:
                "Inflammation of the urethra that may be associated with pain, irritation, or discharge.",
            keywords:
                "urethritis urethra discharge pain urination",
            link: "condition-details.html?condition=urethritis",
            icon: "U"
        },

        {
            id: "chlamydia",
            title: "Chlamydia",
            category: "condition",
            categoryLabel: "Condition",
            description:
                "A sexually transmitted infection that can sometimes cause few or no noticeable symptoms.",
            keywords:
                "chlamydia sti std sexually transmitted infection sexual health",
            link: "condition-details.html?condition=chlamydia",
            icon: "S"
        },

        {
            id: "gonorrhea",
            title: "Gonorrhea",
            category: "condition",
            categoryLabel: "Condition",
            description:
                "A sexually transmitted infection that can affect the genital and urinary systems.",
            keywords:
                "gonorrhea sti std sexually transmitted infection sexual health",
            link: "condition-details.html?condition=gonorrhea",
            icon: "S"
        },

        {
            id: "genital-herpes",
            title: "Genital Herpes",
            category: "condition",
            categoryLabel: "Condition",
            description:
                "A sexually transmitted infection caused by herpes simplex viruses.",
            keywords:
                "genital herpes herpes hsv sti std sexual health",
            link: "condition-details.html?condition=genital-herpes",
            icon: "S"
        },


        /* ---------------- SYMPTOMS ---------------- */

        {
            id: "painful-urination",
            title: "Painful Urination",
            category: "symptom",
            categoryLabel: "Symptom",
            description:
                "Pain, burning, or discomfort while passing urine can have several possible causes.",
            keywords:
                "painful urination burning urine dysuria pee pain",
            link: "symptoms.html#painful-urination",
            icon: "S"
        },

        {
            id: "frequent-urination",
            title: "Frequent Urination",
            category: "symptom",
            categoryLabel: "Symptom",
            description:
                "Needing to urinate more often than usual may occur with several urinary or other conditions.",
            keywords:
                "frequent urination urinating often urine bladder",
            link: "symptoms.html#frequent-urination",
            icon: "S"
        },

        {
            id: "difficulty-urinating",
            title: "Difficulty Urinating",
            category: "symptom",
            categoryLabel: "Symptom",
            description:
                "Difficulty starting or maintaining urine flow can be associated with different conditions.",
            keywords:
                "difficulty urinating urine flow urinary prostate",
            link: "symptoms.html#difficulty-urinating",
            icon: "S"
        },

        {
            id: "weak-urine-stream",
            title: "Weak Urine Stream",
            category: "symptom",
            categoryLabel: "Symptom",
            description:
                "A weaker-than-usual urine stream may be associated with urinary or prostate-related problems.",
            keywords:
                "weak urine stream slow flow prostate urination",
            link: "symptoms.html#weak-urine-stream",
            icon: "S"
        },

        {
            id: "genital-discomfort",
            title: "Genital Discomfort",
            category: "symptom",
            categoryLabel: "Symptom",
            description:
                "Discomfort in the genital area can have different causes and may require professional evaluation.",
            keywords:
                "genital discomfort pain sexual health reproductive",
            link: "symptoms.html#genital-discomfort",
            icon: "S"
        },

        {
            id: "unusual-discharge",
            title: "Unusual Discharge",
            category: "symptom",
            categoryLabel: "Symptom",
            description:
                "Unusual genital discharge can occur with some infections and other health conditions.",
            keywords:
                "discharge genital discharge penis sti infection urethritis",
            link: "symptoms.html#unusual-discharge",
            icon: "S"
        },


        /* ---------------- HEALTHCARE ---------------- */

        {
            id: "urology",
            title: "Urology Services",
            category: "facility",
            categoryLabel: "Healthcare",
            description:
                "Explore healthcare facilities that provide urology-related services and professional evaluation.",
            keywords:
                "urology urologist prostate urinary healthcare hospital clinic",
            link: "healthcare.html?service=urology",
            icon: "H"
        },

        {
            id: "sti-care",
            title: "STI Testing and Care",
            category: "facility",
            categoryLabel: "Healthcare",
            description:
                "Find facilities that may provide sexually transmitted infection testing and healthcare services.",
            keywords:
                "sti testing sexual health clinic hospital testing",
            link: "healthcare.html?service=sti",
            icon: "H"
        },

        {
            id: "general-medical",
            title: "General Medical Services",
            category: "facility",
            categoryLabel: "Healthcare",
            description:
                "Find healthcare facilities offering general medical services.",
            keywords:
                "general medical clinic hospital doctor healthcare facility",
            link: "healthcare.html?service=general",
            icon: "H"
        },


        /* ---------------- HEALTH FACTS ---------------- */

        {
            id: "sti-symptoms",
            title: "STIs May Have Few Symptoms",
            category: "fact",
            categoryLabel: "Health Fact",
            description:
                "Some sexually transmitted infections may cause few or no noticeable symptoms.",
            keywords:
                "sti symptoms no symptoms chlamydia gonorrhea fact",
            link: "health-facts.html#sti-symptoms",
            icon: "F"
        },

        {
            id: "bph-not-cancer",
            title: "BPH Is Not Prostate Cancer",
            category: "fact",
            categoryLabel: "Health Fact",
            description:
                "Benign prostatic hyperplasia is a non-cancerous enlargement of the prostate.",
            keywords:
                "bph prostate cancer benign enlarged prostate fact",
            link: "health-facts.html#bph-not-cancer",
            icon: "F"
        },


        /* ---------------- MYTH VS FACT ---------------- */

        {
            id: "bph-cancer-myth",
            title: "BPH Is the Same as Prostate Cancer",
            category: "myth",
            categoryLabel: "Myth vs Fact",
            description:
                "BPH and prostate cancer are different health conditions and should not be treated as the same.",
            keywords:
                "bph prostate cancer myth fact prostate",
            link: "myth-fact.html#bph-cancer",
            icon: "M"
        },

        {
            id: "sti-visible-myth",
            title: "Every STI Has Obvious Symptoms",
            category: "myth",
            categoryLabel: "Myth vs Fact",
            description:
                "Some STIs may cause few or no noticeable symptoms, so professional testing can be important.",
            keywords:
                "sti symptoms visible myth testing sexual health",
            link: "myth-fact.html#sti-symptoms",
            icon: "M"
        }

    ];


    /* =====================================================
       STATE
    ===================================================== */

    let activeFilter = "all";
    let currentResults = [];


    /* =====================================================
       SEARCH FUNCTION
    ===================================================== */

    function performSearch(query) {

        const searchTerm =
            query.toLowerCase().trim();

        if (!searchTerm) {

            resetSearch();

            return;
        }


        /* Show loading state */

        initialState.hidden = true;
        emptyState.hidden = true;
        searchResults.innerHTML = "";

        loadingState.hidden = false;

        resultsHeader.hidden = true;
        resultFilters.hidden = true;


        /*
         * Small delay to make the loading state visible.
         * When connected to FastAPI, this can be replaced
         * by the actual fetch request.
         */

        setTimeout(() => {

            const results =
                searchData.filter(item => {

                    const searchableText =
                        `${item.title}
                         ${item.description}
                         ${item.keywords}
                         ${item.categoryLabel}`
                        .toLowerCase();

                    return searchableText.includes(searchTerm);
                });


            currentResults = results;

            loadingState.hidden = true;

            displayResults(results, searchTerm);

        }, 450);
    }


    /* =====================================================
       DISPLAY RESULTS
    ===================================================== */

    function displayResults(results, searchTerm) {

        resultsHeader.hidden = false;
        resultFilters.hidden = false;

        resultsTitle.textContent =
            `Results for "${searchTerm}"`;

        resultsCount.textContent =
            `${results.length} ${
                results.length === 1
                    ? "result"
                    : "results"
            }`;


        if (results.length === 0) {

            searchResults.innerHTML = "";

            emptyState.hidden = false;

            return;
        }


        emptyState.hidden = true;

        renderFilteredResults();

    }


    /* =====================================================
       RENDER FILTERED RESULTS
    ===================================================== */

    function renderFilteredResults() {

        let resultsToShow = currentResults;


        if (activeFilter !== "all") {

            resultsToShow =
                currentResults.filter(
                    item =>
                        item.category === activeFilter
                );

        }


        searchResults.innerHTML = "";


        if (resultsToShow.length === 0) {

            searchResults.innerHTML = `
                <div class="search-state empty-state"
                     style="grid-column: 1 / -1; display: block;">

                    <div class="state-icon">
                        ⌕
                    </div>

                    <h3>
                        No results in this category
                    </h3>

                    <p>
                        Try selecting another result category
                        or searching for a different term.
                    </p>

                </div>
            `;

            return;
        }


        resultsToShow.forEach(result => {

            const card =
                createResultCard(result);

            searchResults.appendChild(card);

        });

    }


    /* =====================================================
       CREATE RESULT CARD
    ===================================================== */

    function createResultCard(result) {

        const article =
            document.createElement("article");

        article.className =
            "search-result-card";


        article.innerHTML = `

            <div class="result-card-top">

                <span class="result-category ${result.category}">
                    ${result.categoryLabel}
                </span>

                <div class="result-icon ${result.category}">
                    ${result.icon}
                </div>

            </div>


            <h3>
                ${result.title}
            </h3>


            <p>
                ${result.description}
            </p>


            <a
                href="${result.link}"
                class="result-link"
            >
                Learn More
                <span aria-hidden="true">→</span>
            </a>

        `;


        return article;
    }


    /* =====================================================
       FILTER RESULTS
    ===================================================== */

    resultFilterButtons.forEach(button => {

        button.addEventListener("click", () => {

            resultFilterButtons.forEach(btn => {
                btn.classList.remove("active");
            });

            button.classList.add("active");

            activeFilter =
                button.dataset.filter;

            renderFilteredResults();

        });

    });


    /* =====================================================
       SEARCH FORM SUBMIT
    ===================================================== */

    if (searchForm) {

        searchForm.addEventListener(
            "submit",
            event => {

                event.preventDefault();

                performSearch(
                    searchInput.value
                );

            }
        );

    }


    /* =====================================================
       SEARCH INPUT
    ===================================================== */

    if (searchInput) {

        searchInput.addEventListener(
            "input",
            () => {

                clearSearch.hidden =
                    searchInput.value.trim() === "";

            }
        );

    }


    /* =====================================================
       CLEAR SEARCH
    ===================================================== */

    if (clearSearch) {

        clearSearch.addEventListener(
            "click",
            () => {

                searchInput.value = "";

                clearSearch.hidden = true;

                resetSearch();

                searchInput.focus();

            }
        );

    }


    /* =====================================================
       SEARCH SUGGESTIONS
    ===================================================== */

    suggestionButtons.forEach(button => {

        button.addEventListener(
            "click",
            () => {

                const searchValue =
                    button.dataset.search;

                searchInput.value =
                    searchValue;

                clearSearch.hidden = false;

                performSearch(searchValue);

                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });

            }
        );

    });


    /* =====================================================
       RESET SEARCH
    ===================================================== */

    function resetSearch() {

        currentResults = [];

        activeFilter = "all";

        resultFilterButtons.forEach(
            button => {

                button.classList.remove("active");

                if (
                    button.dataset.filter === "all"
                ) {
                    button.classList.add("active");
                }

            }
        );


        searchResults.innerHTML = "";

        loadingState.hidden = true;

        resultsHeader.hidden = true;

        resultFilters.hidden = true;

        emptyState.hidden = true;

        initialState.hidden = false;

    }

});