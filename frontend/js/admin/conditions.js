/* =========================================================
   MENCARE ADMIN CONDITIONS
   frontend/js/admin-conditions.js
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    console.log("MenCare admin-conditions.js loaded");


    /* =====================================================
       ELEMENTS
    ===================================================== */

    const sidebar =
        document.getElementById("adminSidebar");

    const menuToggle =
        document.getElementById("adminMenuToggle");

    const logoutBtn =
        document.getElementById("logoutBtn");

    const addConditionBtn =
        document.getElementById("addConditionBtn");

    const conditionModal =
        document.getElementById("conditionModal");

    const viewConditionModal =
        document.getElementById("viewConditionModal");

    const closeConditionModal =
        document.getElementById("closeConditionModal");

    const closeViewConditionModal =
        document.getElementById("closeViewConditionModal");

    const cancelConditionBtn =
        document.getElementById("cancelConditionBtn");

    const closeViewConditionBtn =
        document.getElementById("closeViewConditionBtn");

    const conditionForm =
        document.getElementById("conditionForm");

    const tableBody =
        document.getElementById("conditionTableBody");

    const searchInput =
        document.getElementById("conditionSearch");

    const categoryFilter =
        document.getElementById("conditionCategoryFilter");

    const clearSearchBtn =
        document.getElementById("clearConditionSearch");

    const resetFiltersBtn =
        document.getElementById("resetConditionFilters");

    const emptyState =
        document.getElementById("emptyConditionState");


    /* =====================================================
       DATE
    ===================================================== */

    const adminDate =
        document.getElementById("adminDate");

    const adminFooterYear =
        document.getElementById("adminFooterYear");


    const today =
        new Date();


    if (adminDate) {

        adminDate.textContent =
            today.toLocaleDateString(
                "en-KE",
                {
                    weekday: "long",
                    day: "numeric",
                    month: "long",
                    year: "numeric"
                }
            );

    }


    if (adminFooterYear) {

        adminFooterYear.textContent =
            today.getFullYear();

    }


    /* =====================================================
       MOBILE SIDEBAR
    ===================================================== */

    if (menuToggle && sidebar) {

        menuToggle.addEventListener(
            "click",
            () => {

                const isOpen =
                    sidebar.classList.toggle("open");

                menuToggle.setAttribute(
                    "aria-expanded",
                    String(isOpen)
                );

            }
        );

    }


    /* =====================================================
       LOGOUT
    ===================================================== */

    if (logoutBtn) {

        logoutBtn.addEventListener(
            "click",
            () => {

                const confirmed =
                    window.confirm(
                        "Are you sure you want to logout?"
                    );

                if (!confirmed) {
                    return;
                }


                localStorage.removeItem(
                    "mencareAdminToken"
                );

                sessionStorage.removeItem(
                    "mencareAdminToken"
                );


                window.location.href =
                    "admin-login.html";

            }
        );

    }


    /* =====================================================
       MODAL HELPERS
    ===================================================== */

    function openModal(modal) {

        if (!modal) {
            return;
        }

        modal.classList.add("show");

        modal.setAttribute(
            "aria-hidden",
            "false"
        );

        document.body.classList.add(
            "modal-open"
        );

    }


    function closeModal(modal) {

        if (!modal) {
            return;
        }

        modal.classList.remove("show");

        modal.setAttribute(
            "aria-hidden",
            "true"
        );

        if (
            !document.querySelector(
                ".admin-modal.show"
            )
        ) {

            document.body.classList.remove(
                "modal-open"
            );

        }

    }


    /* =====================================================
       ADD CONDITION
    ===================================================== */

    if (addConditionBtn) {

        addConditionBtn.addEventListener(
            "click",
            () => {

                resetForm();

                document.getElementById(
                    "conditionModalTitle"
                ).textContent =
                    "Add Condition";

                document.getElementById(
                    "saveConditionBtn"
                ).textContent =
                    "Save Condition";

                openModal(
                    conditionModal
                );

            }
        );

    }


    /* =====================================================
       CLOSE MODALS
    ===================================================== */

    if (closeConditionModal) {

        closeConditionModal.addEventListener(
            "click",
            () => {
                closeModal(conditionModal);
            }
        );

    }


    if (cancelConditionBtn) {

        cancelConditionBtn.addEventListener(
            "click",
            () => {
                closeModal(conditionModal);
            }
        );

    }


    if (closeViewConditionModal) {

        closeViewConditionModal.addEventListener(
            "click",
            () => {
                closeModal(viewConditionModal);
            }
        );

    }


    if (closeViewConditionBtn) {

        closeViewConditionBtn.addEventListener(
            "click",
            () => {
                closeModal(viewConditionModal);
            }
        );

    }


    /* =====================================================
       RESET FORM
    ===================================================== */

    function resetForm() {

        if (!conditionForm) {
            return;
        }

        conditionForm.reset();

        document.getElementById(
            "conditionId"
        ).value = "";

    }


    /* =====================================================
       CATEGORY NAME
    ===================================================== */

    function getCategoryName(category) {

        const categories = {

            prostate:
                "Prostate Health",

            urinary:
                "Urinary Health",

            sti:
                "Sexual Health"

        };

        return categories[category] ||
            "Uncategorized";

    }


    /* =====================================================
       CATEGORY CLASS
    ===================================================== */

    function getCategoryClass(category) {

        if (
            category === "prostate" ||
            category === "urinary" ||
            category === "sti"
        ) {

            return category;

        }

        return "";

    }


    /* =====================================================
       DATE FORMAT
    ===================================================== */

    function formatDate(date = new Date()) {

        return date.toLocaleDateString(
            "en-KE",
            {
                day: "2-digit",
                month: "short",
                year: "numeric"
            }
        );

    }


    /* =====================================================
       ESCAPE HTML
    ===================================================== */

    function escapeHTML(value) {

        return String(value || "")
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");

    }


    /* =====================================================
       CREATE TABLE ROW
    ===================================================== */

    function createConditionRow(data) {

        const row =
            document.createElement("tr");

        row.className =
            "condition-row";

        row.dataset.id =
            data.id;

        row.dataset.name =
            data.name;

        row.dataset.shortName =
            data.shortName || "";

        row.dataset.category =
            data.category;

        row.dataset.description =
            data.description || "";

        row.dataset.symptoms =
            data.symptoms || "";

        row.dataset.riskFactors =
            data.riskFactors || "";

        row.dataset.prevention =
            data.prevention || "";

        row.dataset.diagnosis =
            data.diagnosis || "";

        row.dataset.treatment =
            data.treatment || "";

        row.dataset.complications =
            data.complications || "";

        row.dataset.seekHelp =
            data.seekHelp || "";

        row.dataset.status =
            data.status || "draft";


        const categoryClass =
            getCategoryClass(
                data.category
            );


        const statusClass =
            data.status === "published"
                ? "published"
                : "draft";


        const statusText =
            data.status === "published"
                ? "Published"
                : "Draft";


        const symptoms =
            data.symptoms
                ? data.symptoms
                    .split(",")
                    .filter(Boolean)
                    .length
                : 0;


        row.innerHTML = `

            <td>

                <div class="condition-name-cell">

                    <div class="condition-mini-icon ${categoryClass}">
                        ${data.category === "sti"
                            ? "S"
                            : data.category === "urinary"
                                ? "U"
                                : "P"}
                    </div>

                    <div>

                        <strong>
                            ${escapeHTML(data.name)}
                        </strong>

                        <span>
                            ${escapeHTML(
                                data.shortName || ""
                            )}
                        </span>

                    </div>

                </div>

            </td>


            <td>

                <span class="category-badge ${categoryClass}">
                    ${escapeHTML(
                        getCategoryName(
                            data.category
                        )
                    )}
                </span>

            </td>


            <td>
                ${symptoms}
            </td>


            <td>

                <span class="status-badge ${statusClass}">
                    ${statusText}
                </span>

            </td>


            <td>
                ${escapeHTML(
                    data.updatedAt ||
                    formatDate()
                )}
            </td>


            <td>

                <div class="table-actions">

                    <button
                        type="button"
                        class="table-action view-condition-btn"
                    >
                        View
                    </button>

                    <button
                        type="button"
                        class="table-action edit-condition-btn"
                    >
                        Edit
                    </button>

                    <button
                        type="button"
                        class="table-action danger delete-condition-btn"
                    >
                        Delete
                    </button>

                </div>

            </td>

        `;


        return row;

    }


    /* =====================================================
       FORM SUBMIT
    ===================================================== */

    if (conditionForm) {

        conditionForm.addEventListener(
            "submit",
            event => {

                event.preventDefault();


                const id =
                    document.getElementById(
                        "conditionId"
                    ).value.trim();


                const name =
                    document.getElementById(
                        "conditionName"
                    ).value.trim();


                const shortName =
                    document.getElementById(
                        "conditionShortName"
                    ).value.trim();


                const category =
                    document.getElementById(
                        "conditionCategory"
                    ).value;


                const status =
                    document.getElementById(
                        "conditionStatus"
                    ).value;


                const description =
                    document.getElementById(
                        "conditionDescription"
                    ).value.trim();


                const symptoms =
                    document.getElementById(
                        "conditionSymptoms"
                    ).value.trim();


                const riskFactors =
                    document.getElementById(
                        "conditionRiskFactors"
                    ).value.trim();


                const prevention =
                    document.getElementById(
                        "conditionPrevention"
                    ).value.trim();


                const diagnosis =
                    document.getElementById(
                        "conditionDiagnosis"
                    ).value.trim();


                const treatment =
                    document.getElementById(
                        "conditionTreatment"
                    ).value.trim();


                const complications =
                    document.getElementById(
                        "conditionComplications"
                    ).value.trim();


                const seekHelp =
                    document.getElementById(
                        "conditionSeekHelp"
                    ).value.trim();


                /* Validation */

                if (!name) {

                    alert(
                        "Please enter the condition name."
                    );

                    return;

                }


                if (!category) {

                    alert(
                        "Please select a category."
                    );

                    return;

                }


                if (!description) {

                    alert(
                        "Please enter a short description."
                    );

                    return;

                }


                const conditionData = {

                    id:
                        id ||
                        name
                            .toLowerCase()
                            .replace(
                                /[^a-z0-9]+/g,
                                "-"
                            )
                            .replace(
                                /^-|-$/g,
                                ""
                            ),

                    name,

                    shortName,

                    category,

                    status,

                    description,

                    symptoms,

                    riskFactors,

                    prevention,

                    diagnosis,

                    treatment,

                    complications,

                    seekHelp,

                    updatedAt:
                        formatDate()

                };


                /* =========================================
                   EDIT EXISTING
                ========================================= */

                if (id) {

                    const existingRow =
                        Array.from(
                            tableBody.querySelectorAll(
                                ".condition-row"
                            )
                        ).find(
                            row =>
                                row.dataset.id === id
                        );


                    if (existingRow) {

                        const newRow =
                            createConditionRow(
                                conditionData
                            );

                        existingRow.replaceWith(
                            newRow
                        );

                    }

                }


                /* =========================================
                   ADD NEW
                ========================================= */

                else {

                    const newRow =
                        createConditionRow(
                            conditionData
                        );

                    tableBody.appendChild(
                        newRow
                    );

                }


                closeModal(
                    conditionModal
                );

                updateStatistics();

                filterConditions();

                alert(
                    id
                        ? "Condition updated successfully."
                        : "Condition added successfully."
                );

            }
        );

    }


    /* =====================================================
       READ ROW DATA
    ===================================================== */

    function getConditionData(row) {

        return {

            id:
                row.dataset.id,

            name:
                row.dataset.name,

            shortName:
                row.dataset.shortName,

            category:
                row.dataset.category,

            description:
                row.dataset.description,

            symptoms:
                row.dataset.symptoms,

            riskFactors:
                row.dataset.riskFactors,

            prevention:
                row.dataset.prevention,

            diagnosis:
                row.dataset.diagnosis,

            treatment:
                row.dataset.treatment,

            complications:
                row.dataset.complications,

            seekHelp:
                row.dataset.seekHelp,

            status:
                row.dataset.status

        };

    }


    /* =====================================================
       VIEW / EDIT / DELETE
    ===================================================== */

    if (tableBody) {

        tableBody.addEventListener(
            "click",
            event => {

                const viewButton =
                    event.target.closest(
                        ".view-condition-btn"
                    );

                const editButton =
                    event.target.closest(
                        ".edit-condition-btn"
                    );

                const deleteButton =
                    event.target.closest(
                        ".delete-condition-btn"
                    );


                const row =
                    event.target.closest(
                        ".condition-row"
                    );


                if (!row) {
                    return;
                }


                const data =
                    getConditionData(row);


                /* =========================================
                   VIEW
                ========================================= */

                if (viewButton) {

                    document.getElementById(
                        "viewConditionTitle"
                    ).textContent =
                        data.name;


                    const categoryElement =
                        document.getElementById(
                            "viewConditionCategory"
                        );


                    categoryElement.textContent =
                        getCategoryName(
                            data.category
                        );


                    categoryElement.className =
                        `category-badge ${
                            getCategoryClass(
                                data.category
                            )
                        }`;


                    const statusElement =
                        document.getElementById(
                            "viewConditionStatus"
                        );


                    statusElement.textContent =
                        data.status === "published"
                            ? "Published"
                            : "Draft";


                    statusElement.className =
                        `status-badge ${
                            data.status === "published"
                                ? "published"
                                : "draft"
                        }`;


                    document.getElementById(
                        "viewConditionDescription"
                    ).textContent =
                        data.description || "—";


                    document.getElementById(
                        "viewConditionSymptoms"
                    ).textContent =
                        data.symptoms || "—";


                    document.getElementById(
                        "viewConditionRiskFactors"
                    ).textContent =
                        data.riskFactors || "—";


                    document.getElementById(
                        "viewConditionPrevention"
                    ).textContent =
                        data.prevention || "—";


                    document.getElementById(
                        "viewConditionDiagnosis"
                    ).textContent =
                        data.diagnosis || "—";


                    document.getElementById(
                        "viewConditionTreatment"
                    ).textContent =
                        data.treatment || "—";


                    document.getElementById(
                        "viewConditionComplications"
                    ).textContent =
                        data.complications || "—";


                    document.getElementById(
                        "viewConditionSeekHelp"
                    ).textContent =
                        data.seekHelp || "—";


                    const editViewedButton =
                        document.getElementById(
                            "editViewedConditionBtn"
                        );


                    editViewedButton.dataset.id =
                        data.id;


                    openModal(
                        viewConditionModal
                    );

                }


                /* =========================================
                   EDIT
                ========================================= */

                if (editButton) {

                    document.getElementById(
                        "conditionModalTitle"
                    ).textContent =
                        "Edit Condition";


                    document.getElementById(
                        "saveConditionBtn"
                    ).textContent =
                        "Update Condition";


                    document.getElementById(
                        "conditionId"
                    ).value =
                        data.id;


                    document.getElementById(
                        "conditionName"
                    ).value =
                        data.name;


                    document.getElementById(
                        "conditionShortName"
                    ).value =
                        data.shortName;


                    document.getElementById(
                        "conditionCategory"
                    ).value =
                        data.category;


                    document.getElementById(
                        "conditionStatus"
                    ).value =
                        data.status;


                    document.getElementById(
                        "conditionDescription"
                    ).value =
                        data.description;


                    document.getElementById(
                        "conditionSymptoms"
                    ).value =
                        data.symptoms;


                    document.getElementById(
                        "conditionRiskFactors"
                    ).value =
                        data.riskFactors;


                    document.getElementById(
                        "conditionPrevention"
                    ).value =
                        data.prevention;


                    document.getElementById(
                        "conditionDiagnosis"
                    ).value =
                        data.diagnosis;


                    document.getElementById(
                        "conditionTreatment"
                    ).value =
                        data.treatment;


                    document.getElementById(
                        "conditionComplications"
                    ).value =
                        data.complications;


                    document.getElementById(
                        "conditionSeekHelp"
                    ).value =
                        data.seekHelp;


                    openModal(
                        conditionModal
                    );

                }


                /* =========================================
                   DELETE
                ========================================= */

                if (deleteButton) {

                    const confirmed =
                        window.confirm(
                            `Delete "${data.name}"?`
                        );


                    if (!confirmed) {
                        return;
                    }


                    row.remove();

                    updateStatistics();

                    filterConditions();

                    alert(
                        "Condition deleted successfully."
                    );

                }

            }
        );

    }


    /* =====================================================
       EDIT FROM VIEW MODAL
    ===================================================== */

    const editViewedConditionBtn =
        document.getElementById(
            "editViewedConditionBtn"
        );


    if (editViewedConditionBtn) {

        editViewedConditionBtn.addEventListener(
            "click",
            () => {

                const id =
                    editViewedConditionBtn.dataset.id;


                const row =
                    Array.from(
                        tableBody.querySelectorAll(
                            ".condition-row"
                        )
                    ).find(
                        item =>
                            item.dataset.id === id
                    );


                if (!row) {
                    return;
                }


                closeModal(
                    viewConditionModal
                );


                const data =
                    getConditionData(row);


                document.getElementById(
                    "conditionModalTitle"
                ).textContent =
                    "Edit Condition";


                document.getElementById(
                    "saveConditionBtn"
                ).textContent =
                    "Update Condition";


                document.getElementById(
                    "conditionId"
                ).value =
                    data.id;


                document.getElementById(
                    "conditionName"
                ).value =
                    data.name;


                document.getElementById(
                    "conditionShortName"
                ).value =
                    data.shortName;


                document.getElementById(
                    "conditionCategory"
                ).value =
                    data.category;


                document.getElementById(
                    "conditionStatus"
                ).value =
                    data.status;


                document.getElementById(
                    "conditionDescription"
                ).value =
                    data.description;


                document.getElementById(
                    "conditionSymptoms"
                ).value =
                    data.symptoms;


                document.getElementById(
                    "conditionRiskFactors"
                ).value =
                    data.riskFactors;


                document.getElementById(
                    "conditionPrevention"
                ).value =
                    data.prevention;


                document.getElementById(
                    "conditionDiagnosis"
                ).value =
                    data.diagnosis;


                document.getElementById(
                    "conditionTreatment"
                ).value =
                    data.treatment;


                document.getElementById(
                    "conditionComplications"
                ).value =
                    data.complications;


                document.getElementById(
                    "conditionSeekHelp"
                ).value =
                    data.seekHelp;


                openModal(
                    conditionModal
                );

            }
        );

    }


    /* =====================================================
       SEARCH + FILTER
    ===================================================== */

    function filterConditions() {

        if (!tableBody) {
            return;
        }


        const searchTerm =
            searchInput
                ? searchInput.value
                    .toLowerCase()
                    .trim()
                : "";


        const selectedCategory =
            categoryFilter
                ? categoryFilter.value
                : "all";


        const rows =
            tableBody.querySelectorAll(
                ".condition-row"
            );


        let visibleCount = 0;


        rows.forEach(row => {

            const name =
                row.dataset.name
                    .toLowerCase();


            const shortName =
                row.dataset.shortName
                    .toLowerCase();


            const category =
                row.dataset.category;


            const matchesSearch =
                name.includes(searchTerm) ||
                shortName.includes(searchTerm);


            const matchesCategory =
                selectedCategory === "all" ||
                category === selectedCategory;


            const visible =
                matchesSearch &&
                matchesCategory;


            row.style.display =
                visible ? "" : "none";


            if (visible) {
                visibleCount++;
            }

        });


        if (emptyState) {

            emptyState.hidden =
                visibleCount !== 0;

        }


        const showing =
            document.getElementById(
                "showingConditions"
            );


        if (showing) {

            showing.textContent =
                visibleCount;

        }

    }


    if (searchInput) {

        searchInput.addEventListener(
            "input",
            filterConditions
        );

    }


    if (categoryFilter) {

        categoryFilter.addEventListener(
            "change",
            filterConditions
        );

    }


    /* =====================================================
       CLEAR FILTERS
    ===================================================== */

    function clearFilters() {

        if (searchInput) {
            searchInput.value = "";
        }


        if (categoryFilter) {
            categoryFilter.value = "all";
        }


        filterConditions();

    }


    if (clearSearchBtn) {

        clearSearchBtn.addEventListener(
            "click",
            clearFilters
        );

    }


    if (resetFiltersBtn) {

        resetFiltersBtn.addEventListener(
            "click",
            clearFilters
        );

    }


    /* =====================================================
       STATISTICS
    ===================================================== */

    function updateStatistics() {

        const rows =
            tableBody
                ? tableBody.querySelectorAll(
                    ".condition-row"
                )
                : [];


        let prostate = 0;
        let urinary = 0;
        let sti = 0;


        rows.forEach(row => {

            const category =
                row.dataset.category;


            if (category === "prostate") {
                prostate++;
            }

            if (category === "urinary") {
                urinary++;
            }

            if (category === "sti") {
                sti++;
            }

        });


        document.getElementById(
            "totalConditions"
        ).textContent =
            rows.length;


        document.getElementById(
            "prostateConditions"
        ).textContent =
            prostate;


        document.getElementById(
            "urinaryConditions"
        ).textContent =
            urinary;


        document.getElementById(
            "stiConditions"
        ).textContent =
            sti;

    }


    /* =====================================================
       CLICK OUTSIDE MODALS
    ===================================================== */

    document.querySelectorAll(
        ".admin-modal-overlay"
    ).forEach(overlay => {

        overlay.addEventListener(
            "click",
            () => {

                const modal =
                    overlay.closest(
                        ".admin-modal"
                    );

                closeModal(modal);

            }
        );

    });


    /* =====================================================
       ESCAPE KEY
    ===================================================== */

    document.addEventListener(
        "keydown",
        event => {

            if (event.key !== "Escape") {
                return;
            }


            closeModal(
                conditionModal
            );

            closeModal(
                viewConditionModal
            );


            if (
                sidebar &&
                sidebar.classList.contains("open")
            ) {

                sidebar.classList.remove(
                    "open"
                );

                if (menuToggle) {

                    menuToggle.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                }

            }

        }
    );


    /* =====================================================
       INITIALIZE
    ===================================================== */

    updateStatistics();

    filterConditions();


    console.log(
        "Condition management initialized successfully."
    );

});