/* =========================================================
   MENCARE HEALTH HUB
   HEALTH TOPICS PAGE
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const searchInput =
        document.getElementById("topicSearch");

    const filterButtons =
        document.querySelectorAll(".filter-btn");

    const categorySections =
        document.querySelectorAll(".topic-category");

    const noResults =
        document.getElementById("noResults");


    let activeFilter = "all";


    /* =====================================================
       FILTER TOPICS
    ===================================================== */

    function filterTopics() {

        const searchTerm =
            searchInput.value
                .toLowerCase()
                .trim();

        let visibleCards = 0;


        categorySections.forEach(section => {

            const cards =
                section.querySelectorAll(".condition-card");

            let visibleInSection = 0;


            cards.forEach(card => {

                const cardName =
                    card.dataset.name.toLowerCase();

                const cardCategory =
                    card.dataset.category;


                const matchesSearch =
                    cardName.includes(searchTerm);


                const matchesCategory =
                    activeFilter === "all" ||
                    cardCategory === activeFilter;


                if (
                    matchesSearch &&
                    matchesCategory
                ) {

                    card.style.display = "flex";

                    visibleInSection++;

                    visibleCards++;

                } else {

                    card.style.display = "none";

                }

            });


            /*
             * Hide the category if none of
             * its condition cards are visible.
             */

            if (visibleInSection === 0) {

                section.style.display = "none";

            } else {

                section.style.display = "block";

            }

        });


        /*
         * Display the no-results message
         * when nothing matches.
         */

        if (visibleCards === 0) {

            noResults.classList.add("show");

        } else {

            noResults.classList.remove("show");

        }

    }


    /* =====================================================
       SEARCH
    ===================================================== */

    if (searchInput) {

        searchInput.addEventListener(
            "input",
            filterTopics
        );

    }


    /* =====================================================
       CATEGORY FILTERS
    ===================================================== */

    filterButtons.forEach(button => {

        button.addEventListener("click", () => {


            /* Remove active state */

            filterButtons.forEach(btn => {

                btn.classList.remove("active");

            });


            /* Add active state */

            button.classList.add("active");


            /* Update selected category */

            activeFilter =
                button.dataset.filter;


            /* Run filter */

            filterTopics();

        });

    });

});