/* =========================================================
   MENCARE HEALTH HUB
   ADMIN FACILITIES
   frontend/js/admin-facilities.js
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    console.log("MenCare admin-facilities.js loaded");


    /* =====================================================
       ELEMENTS
    ===================================================== */

    const sidebar =
        document.getElementById("adminSidebar");

    const menuToggle =
        document.getElementById("adminMenuToggle");

    const logoutBtn =
        document.getElementById("logoutBtn");

    const addFacilityBtn =
        document.getElementById("addFacilityBtn");

    const facilityModal =
        document.getElementById("facilityModal");

    const viewFacilityModal =
        document.getElementById("viewFacilityModal");

    const facilityForm =
        document.getElementById("facilityForm");

    const tableBody =
        document.getElementById("facilityTableBody");

    const searchInput =
        document.getElementById("facilitySearch");

    const countyFilter =
        document.getElementById("facilityCountyFilter");

    const serviceFilter =
        document.getElementById("facilityServiceFilter");

    const clearFiltersBtn =
        document.getElementById("clearFacilityFilters");

    const resetFiltersBtn =
        document.getElementById("resetFacilityFilters");

    const emptyState =
        document.getElementById("emptyFacilityState");


    /* =====================================================
       DATE
    ===================================================== */

    const now =
        new Date();


    const adminDate =
        document.getElementById("adminDate");

    const footerYear =
        document.getElementById("adminFooterYear");


    if (adminDate) {

        adminDate.textContent =
            now.toLocaleDateString(
                "en-KE",
                {
                    weekday: "long",
                    day: "numeric",
                    month: "long",
                    year: "numeric"
                }
            );

    }


    if (footerYear) {

        footerYear.textContent =
            now.getFullYear();

    }


    /* =====================================================
       MOBILE SIDEBAR
    ===================================================== */

    if (menuToggle && sidebar) {

        menuToggle.addEventListener(
            "click",
            () => {

                const open =
                    sidebar.classList.toggle(
                        "open"
                    );

                menuToggle.setAttribute(
                    "aria-expanded",
                    String(open)
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

                if (
                    !window.confirm(
                        "Are you sure you want to logout?"
                    )
                ) {
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
       MODAL FUNCTIONS
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
       RESET FORM
    ===================================================== */

    function resetForm() {

        if (!facilityForm) {
            return;
        }


        facilityForm.reset();


        document.getElementById(
            "facilityId"
        ).value = "";

    }


    /* =====================================================
       ADD FACILITY
    ===================================================== */

    if (addFacilityBtn) {

        addFacilityBtn.addEventListener(
            "click",
            () => {

                resetForm();


                document.getElementById(
                    "facilityModalTitle"
                ).textContent =
                    "Add Facility";


                document.getElementById(
                    "saveFacilityBtn"
                ).textContent =
                    "Save Facility";


                openModal(
                    facilityModal
                );

            }
        );

    }


    /* =====================================================
       CLOSE BUTTONS
    ===================================================== */

    const closeFacilityModal =
        document.getElementById(
            "closeFacilityModal"
        );

    const cancelFacilityBtn =
        document.getElementById(
            "cancelFacilityBtn"
        );

    const closeViewFacilityModal =
        document.getElementById(
            "closeViewFacilityModal"
        );

    const closeViewFacilityBtn =
        document.getElementById(
            "closeViewFacilityBtn"
        );


    if (closeFacilityModal) {

        closeFacilityModal.addEventListener(
            "click",
            () => {
                closeModal(facilityModal);
            }
        );

    }


    if (cancelFacilityBtn) {

        cancelFacilityBtn.addEventListener(
            "click",
            () => {
                closeModal(facilityModal);
            }
        );

    }


    if (closeViewFacilityModal) {

        closeViewFacilityModal.addEventListener(
            "click",
            () => {
                closeModal(viewFacilityModal);
            }
        );

    }


    if (closeViewFacilityBtn) {

        closeViewFacilityBtn.addEventListener(
            "click",
            () => {
                closeModal(viewFacilityModal);
            }
        );

    }


    /* =====================================================
       GET SELECTED SERVICES
    ===================================================== */

    function getSelectedServices() {

        return Array.from(
            document.querySelectorAll(
                'input[name="facilityServices"]:checked'
            )
        ).map(
            checkbox =>
                checkbox.value
        );

    }


    /* =====================================================
       SET SELECTED SERVICES
    ===================================================== */

    function setSelectedServices(
        services = []
    ) {

        document
            .querySelectorAll(
                'input[name="facilityServices"]'
            )
            .forEach(
                checkbox => {

                    checkbox.checked =
                        services.includes(
                            checkbox.value
                        );

                }
            );

    }


    /* =====================================================
       FORMAT SERVICES
    ===================================================== */

    function formatServices(
        services
    ) {

        const names = {

            general:
                "General Medical Services",

            urology:
                "Urology Services",

            sti:
                "STI Testing & Care",

            sexual:
                "Sexual & Reproductive Health"

        };


        return services
            .map(
                service =>
                    names[service] ||
                    service
            )
            .join(", ");

    }


    /* =====================================================
       FORM SUBMIT
    ===================================================== */

    if (facilityForm) {

        facilityForm.addEventListener(
            "submit",
            event => {

                event.preventDefault();


                const id =
                    document.getElementById(
                        "facilityId"
                    ).value.trim();


                const name =
                    document.getElementById(
                        "facilityName"
                    ).value.trim();


                const type =
                    document.getElementById(
                        "facilityType"
                    ).value;


                const county =
                    document.getElementById(
                        "facilityCounty"
                    ).value.trim();


                const town =
                    document.getElementById(
                        "facilityTown"
                    ).value.trim();


                const address =
                    document.getElementById(
                        "facilityAddress"
                    ).value.trim();


                const description =
                    document.getElementById(
                        "facilityDescription"
                    ).value.trim();


                const phone =
                    document.getElementById(
                        "facilityPhone"
                    ).value.trim();


                const email =
                    document.getElementById(
                        "facilityEmail"
                    ).value.trim();


                const website =
                    document.getElementById(
                        "facilityWebsite"
                    ).value.trim();


                const hours =
                    document.getElementById(
                        "facilityHours"
                    ).value.trim();


                const directions =
                    document.getElementById(
                        "facilityDirections"
                    ).value.trim();


                const status =
                    document.getElementById(
                        "facilityStatus"
                    ).value;


                const services =
                    getSelectedServices();


                /* Validation */

                if (!name) {

                    alert(
                        "Please enter the facility name."
                    );

                    return;

                }


                if (!type) {

                    alert(
                        "Please select the facility type."
                    );

                    return;

                }


                if (!county) {

                    alert(
                        "Please enter the county."
                    );

                    return;

                }


                if (!town) {

                    alert(
                        "Please enter the town or city."
                    );

                    return;

                }


                if (!description) {

                    alert(
                        "Please enter a facility description."
                    );

                    return;

                }


                if (services.length === 0) {

                    alert(
                        "Please select at least one healthcare service."
                    );

                    return;

                }


                const facilityData = {

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

                    type,

                    county:
                        county.toLowerCase(),

                    town,

                    address,

                    description,

                    services,

                    phone,

                    email,

                    website,

                    hours,

                    directions,

                    status

                };


                /* =========================================
                   EDIT
                ========================================= */

                if (id) {

                    const existingRow =
                        Array.from(
                            tableBody.querySelectorAll(
                                ".facility-row"
                            )
                        ).find(
                            row =>
                                row.dataset.id === id
                        );


                    if (existingRow) {

                        existingRow.replaceWith(
                            createFacilityRow(
                                facilityData
                            )
                        );

                    }

                }


                /* =========================================
                   ADD
                ========================================= */

                else {

                    tableBody.appendChild(
                        createFacilityRow(
                            facilityData
                        )
                    );

                }


                closeModal(
                    facilityModal
                );


                updateStatistics();

                filterFacilities();


                alert(
                    id
                        ? "Facility updated successfully."
                        : "Facility added successfully."
                );

            }
        );

    }


    /* =====================================================
       CREATE TABLE ROW
    ===================================================== */

    function createFacilityRow(data) {

        const row =
            document.createElement("tr");


        row.className =
            "facility-row";


        row.dataset.id =
            data.id;

        row.dataset.name =
            data.name;

        row.dataset.county =
            data.county;

        row.dataset.town =
            data.town;

        row.dataset.type =
            data.type;

        row.dataset.services =
            data.services.join(",");

        row.dataset.description =
            data.description;

        row.dataset.address =
            data.address;

        row.dataset.phone =
            data.phone;

        row.dataset.email =
            data.email;

        row.dataset.website =
            data.website;

        row.dataset.hours =
            data.hours;

        row.dataset.directions =
            data.directions;

        row.dataset.status =
            data.status;


        const serviceCount =
            data.services.length;


        const statusText =
            data.status === "active"
                ? "Active"
                : data.status === "draft"
                    ? "Draft"
                    : "Inactive";


        const statusClass =
            data.status === "active"
                ? "published"
                : "draft";


        row.innerHTML = `

            <td>

                <div class="condition-name-cell">

                    <div class="condition-mini-icon urinary">
                        H
                    </div>

                    <div>

                        <strong>
                            ${escapeHTML(
                                data.name
                            )}
                        </strong>

                        <span>
                            ${escapeHTML(
                                data.type
                            )}
                        </span>

                    </div>

                </div>

            </td>


            <td>

                ${escapeHTML(
                    data.town
                )},

                ${escapeHTML(
                    data.county
                )}

            </td>


            <td>

                <span class="category-badge urinary">

                    ${serviceCount}

                    ${serviceCount === 1
                        ? "Service"
                        : "Services"}

                </span>

            </td>


            <td>

                ${escapeHTML(
                    data.phone || "—"
                )}

            </td>


            <td>

                <span class="status-badge ${statusClass}">
                    ${statusText}
                </span>

            </td>


            <td>

                <div class="table-actions">

                    <button
                        type="button"
                        class="table-action view-facility-btn"
                    >
                        View
                    </button>

                    <button
                        type="button"
                        class="table-action edit-facility-btn"
                    >
                        Edit
                    </button>

                    <button
                        type="button"
                        class="table-action danger delete-facility-btn"
                    >
                        Delete
                    </button>

                </div>

            </td>

        `;


        return row;

    }


    /* =====================================================
       ESCAPE HTML
    ===================================================== */

    function escapeHTML(value) {

        return String(
            value || ""
        )
            .replace(
                /&/g,
                "&amp;"
            )
            .replace(
                /</g,
                "&lt;"
            )
            .replace(
                />/g,
                "&gt;"
            )
            .replace(
                /"/g,
                "&quot;"
            )
            .replace(
                /'/g,
                "&#039;"
            );

    }


    /* =====================================================
       READ FACILITY DATA
    ===================================================== */

    function getFacilityData(row) {

        return {

            id:
                row.dataset.id,

            name:
                row.dataset.name,

            county:
                row.dataset.county,

            town:
                row.dataset.town,

            type:
                row.dataset.type,

            services:
                row.dataset.services
                    ? row.dataset.services
                        .split(",")
                    : [],

            description:
                row.dataset.description,

            address:
                row.dataset.address,

            phone:
                row.dataset.phone,

            email:
                row.dataset.email,

            website:
                row.dataset.website,

            hours:
                row.dataset.hours,

            directions:
                row.dataset.directions,

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

                const row =
                    event.target.closest(
                        ".facility-row"
                    );


                if (!row) {
                    return;
                }


                const data =
                    getFacilityData(row);


                /* =========================================
                   VIEW
                ========================================= */

                if (
                    event.target.closest(
                        ".view-facility-btn"
                    )
                ) {

                    showFacility(
                        data
                    );

                    return;

                }


                /* =========================================
                   EDIT
                ========================================= */

                if (
                    event.target.closest(
                        ".edit-facility-btn"
                    )
                ) {

                    editFacility(
                        data
                    );

                    return;

                }


                /* =========================================
                   DELETE
                ========================================= */

                if (
                    event.target.closest(
                        ".delete-facility-btn"
                    )
                ) {

                    if (
                        !window.confirm(
                            `Delete "${data.name}"?`
                        )
                    ) {
                        return;
                    }


                    row.remove();

                    updateStatistics();

                    filterFacilities();


                    alert(
                        "Facility deleted successfully."
                    );

                }

            }
        );

    }


    /* =====================================================
       VIEW FACILITY
    ===================================================== */

    function showFacility(data) {

        document.getElementById(
            "viewFacilityTitle"
        ).textContent =
            data.name;


        document.getElementById(
            "viewFacilityType"
        ).textContent =
            data.type;


        document.getElementById(
            "viewFacilityStatus"
        ).textContent =
            data.status === "active"
                ? "Active"
                : data.status === "draft"
                    ? "Draft"
                    : "Inactive";


        document.getElementById(
            "viewFacilityDescription"
        ).textContent =
            data.description || "—";


        document.getElementById(
            "viewFacilityLocation"
        ).textContent =
            data.address ||
            `${data.town}, ${data.county}`;


        document.getElementById(
            "viewFacilityServices"
        ).textContent =
            formatServices(
                data.services
            ) || "—";


        document.getElementById(
            "viewFacilityContact"
        ).textContent =
            [
                data.phone,
                data.email
            ]
                .filter(Boolean)
                .join(" • ") ||
            "—";


        document.getElementById(
            "viewFacilityHours"
        ).textContent =
            data.hours ||
            "—";


        document.getElementById(
            "viewFacilityWebsite"
        ).textContent =
            data.website ||
            "—";


        const editButton =
            document.getElementById(
                "editViewedFacilityBtn"
            );


        editButton.dataset.id =
            data.id;


        openModal(
            viewFacilityModal
        );

    }


    /* =====================================================
       EDIT FACILITY
    ===================================================== */

    function editFacility(data) {

        document.getElementById(
            "facilityModalTitle"
        ).textContent =
            "Edit Facility";


        document.getElementById(
            "saveFacilityBtn"
        ).textContent =
            "Update Facility";


        document.getElementById(
            "facilityId"
        ).value =
            data.id;


        document.getElementById(
            "facilityName"
        ).value =
            data.name;


        document.getElementById(
            "facilityType"
        ).value =
            data.type;


        document.getElementById(
            "facilityCounty"
        ).value =
            data.county;


        document.getElementById(
            "facilityTown"
        ).value =
            data.town;


        document.getElementById(
            "facilityAddress"
        ).value =
            data.address;


        document.getElementById(
            "facilityDescription"
        ).value =
            data.description;


        document.getElementById(
            "facilityPhone"
        ).value =
            data.phone;


        document.getElementById(
            "facilityEmail"
        ).value =
            data.email;


        document.getElementById(
            "facilityWebsite"
        ).value =
            data.website;


        document.getElementById(
            "facilityHours"
        ).value =
            data.hours;


        document.getElementById(
            "facilityDirections"
        ).value =
            data.directions;


        document.getElementById(
            "facilityStatus"
        ).value =
            data.status;


        setSelectedServices(
            data.services
        );


        openModal(
            facilityModal
        );

    }


    /* =====================================================
       EDIT FROM VIEW
    ===================================================== */

    const editViewedFacilityBtn =
        document.getElementById(
            "editViewedFacilityBtn"
        );


    if (editViewedFacilityBtn) {

        editViewedFacilityBtn.addEventListener(
            "click",
            () => {

                const id =
                    editViewedFacilityBtn.dataset.id;


                const row =
                    Array.from(
                        tableBody.querySelectorAll(
                            ".facility-row"
                        )
                    ).find(
                        item =>
                            item.dataset.id === id
                    );


                if (!row) {
                    return;
                }


                closeModal(
                    viewFacilityModal
                );


                editFacility(
                    getFacilityData(row)
                );

            }
        );

    }


    /* =====================================================
       SEARCH / FILTER
    ===================================================== */

    function filterFacilities() {

        if (!tableBody) {
            return;
        }


        const search =
            searchInput
                ? searchInput.value
                    .toLowerCase()
                    .trim()
                : "";


        const county =
            countyFilter
                ? countyFilter.value
                : "all";


        const service =
            serviceFilter
                ? serviceFilter.value
                : "all";


        const rows =
            tableBody.querySelectorAll(
                ".facility-row"
            );


        let visible =
            0;


        rows.forEach(row => {

            const name =
                row.dataset.name
                    .toLowerCase();


            const town =
                row.dataset.town
                    .toLowerCase();


            const rowCounty =
                row.dataset.county
                    .toLowerCase();


            const services =
                row.dataset.services
                    .toLowerCase()
                    .split(",");


            const matchesSearch =
                name.includes(search) ||
                town.includes(search) ||
                rowCounty.includes(search);


            const matchesCounty =
                county === "all" ||
                rowCounty === county;


            const matchesService =
                service === "all" ||
                services.includes(service);


            const show =
                matchesSearch &&
                matchesCounty &&
                matchesService;


            row.style.display =
                show ? "" : "none";


            if (show) {
                visible++;
            }

        });


        if (emptyState) {

            emptyState.hidden =
                visible !== 0;

        }


        const showing =
            document.getElementById(
                "showingFacilities"
            );


        if (showing) {

            showing.textContent =
                visible;

        }

    }


    if (searchInput) {

        searchInput.addEventListener(
            "input",
            filterFacilities
        );

    }


    if (countyFilter) {

        countyFilter.addEventListener(
            "change",
            filterFacilities
        );

    }


    if (serviceFilter) {

        serviceFilter.addEventListener(
            "change",
            filterFacilities
        );

    }


    /* =====================================================
       CLEAR FILTERS
    ===================================================== */

    function clearFilters() {

        if (searchInput) {
            searchInput.value = "";
        }


        if (countyFilter) {
            countyFilter.value = "all";
        }


        if (serviceFilter) {
            serviceFilter.value = "all";
        }


        filterFacilities();

    }


    if (clearFiltersBtn) {

        clearFiltersBtn.addEventListener(
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
                    ".facility-row"
                )
                : [];


        let urology =
            0;

        let sti =
            0;

        let general =
            0;


        rows.forEach(row => {

            const services =
                row.dataset.services
                    ? row.dataset.services
                        .split(",")
                    : [];


            if (
                services.includes(
                    "urology"
                )
            ) {
                urology++;
            }


            if (
                services.includes(
                    "sti"
                )
            ) {
                sti++;
            }


            if (
                services.includes(
                    "general"
                )
            ) {
                general++;
            }

        });


        document.getElementById(
            "totalFacilities"
        ).textContent =
            rows.length;


        document.getElementById(
            "urologyFacilities"
        ).textContent =
            urology;


        document.getElementById(
            "stiFacilities"
        ).textContent =
            sti;


        document.getElementById(
            "generalFacilities"
        ).textContent =
            general;

    }


    /* =====================================================
       CLOSE WHEN CLICKING OVERLAY
    ===================================================== */

    document
        .querySelectorAll(
            ".admin-modal-overlay"
        )
        .forEach(
            overlay => {

                overlay.addEventListener(
                    "click",
                    () => {

                        closeModal(
                            overlay.closest(
                                ".admin-modal"
                            )
                        );

                    }
                );

            }
        );


    /* =====================================================
       ESCAPE KEY
    ===================================================== */

    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key !== "Escape"
            ) {
                return;
            }


            closeModal(
                facilityModal
            );

            closeModal(
                viewFacilityModal
            );


            if (
                sidebar &&
                sidebar.classList.contains(
                    "open"
                )
            ) {

                sidebar.classList.remove(
                    "open"
                );

                menuToggle?.setAttribute(
                    "aria-expanded",
                    "false"
                );

            }

        }
    );


    /* =====================================================
       INITIALIZE
    ===================================================== */

    updateStatistics();

    filterFacilities();


    console.log(
        "Facility management initialized successfully."
    );

});