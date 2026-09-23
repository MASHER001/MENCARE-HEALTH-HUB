/* =========================================================
   MENCARE HEALTH HUB
   ADMIN CATEGORY MANAGEMENT
   admin-categories.js

   Handles:
   - Sidebar
   - Date
   - Add category
   - Edit category
   - View category
   - Delete category
   - Search
   - Clear search
   - Modals
   - Form validation
   - Dynamic statistics
   - Logout
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       ELEMENTS
    ===================================================== */

    const adminSidebar = document.getElementById("adminSidebar");
    const adminMenuToggle = document.getElementById("adminMenuToggle");
    const logoutBtn = document.getElementById("logoutBtn");
    const adminDate = document.getElementById("adminDate");

    const addCategoryBtn = document.getElementById("addCategoryBtn");

    const categoryModal = document.getElementById("categoryModal");
    const categoryModalTitle =
        document.getElementById("categoryModalTitle");

    const closeCategoryModal =
        document.getElementById("closeCategoryModal");

    const cancelCategoryBtn =
        document.getElementById("cancelCategoryBtn");

    const categoryForm =
        document.getElementById("categoryForm");

    const categoryId =
        document.getElementById("categoryId");

    const categoryName =
        document.getElementById("categoryName");

    const categorySlug =
        document.getElementById("categorySlug");

    const categoryDescription =
        document.getElementById("categoryDescription");

    const saveCategoryBtn =
        document.getElementById("saveCategoryBtn");


    const viewCategoryModal =
        document.getElementById("viewCategoryModal");

    const closeViewModal =
        document.getElementById("closeViewModal");

    const closeViewCategoryBtn =
        document.getElementById("closeViewCategoryBtn");

    const viewCategoryIcon =
        document.getElementById("viewCategoryIcon");

    const viewCategoryTitle =
        document.getElementById("viewCategoryTitle");

    const viewCategoryDescription =
        document.getElementById("viewCategoryDescription");

    const viewCategorySlug =
        document.getElementById("viewCategorySlug");

    const viewCategoryConditions =
        document.getElementById("viewCategoryConditions");

    const viewCategoryCreated =
        document.getElementById("viewCategoryCreated");

    const viewCategoryUpdated =
        document.getElementById("viewCategoryUpdated");


    const categorySearch =
        document.getElementById("categorySearch");

    const clearSearchBtn =
        document.getElementById("clearSearchBtn");

    const categoryTableBody =
        document.getElementById("categoryTableBody");

    const emptySearchState =
        document.getElementById("emptySearchState");

    const showingCategories =
        document.getElementById("showingCategories");


    const totalCategories =
        document.getElementById("totalCategories");

    const prostateCount =
        document.getElementById("prostateCount");

    const urinaryCount =
        document.getElementById("urinaryCount");

    const stiCount =
        document.getElementById("stiCount");


    /* =====================================================
       CURRENT EDIT STATE
    ===================================================== */

    let editingCategoryId = null;


    /* =====================================================
       DATE
    ===================================================== */

    function updateDate() {

        if (!adminDate) return;

        const now = new Date();

        adminDate.textContent =
            now.toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "short",
                year: "numeric"
            });
    }

    updateDate();


    /* =====================================================
       SIDEBAR
    ===================================================== */

    if (adminMenuToggle && adminSidebar) {

        adminMenuToggle.addEventListener("click", () => {

            const isOpen =
                adminSidebar.classList.toggle("open");

            adminMenuToggle.setAttribute(
                "aria-expanded",
                String(isOpen)
            );

        });

    }


    /* =====================================================
       CLOSE SIDEBAR WHEN NAV LINK IS CLICKED
    ===================================================== */

    if (adminSidebar) {

        const sidebarLinks =
            adminSidebar.querySelectorAll("a");

        sidebarLinks.forEach(link => {

            link.addEventListener("click", () => {

                if (
                    window.innerWidth <= 900 &&
                    adminSidebar.classList.contains("open")
                ) {

                    adminSidebar.classList.remove("open");

                    if (adminMenuToggle) {
                        adminMenuToggle.setAttribute(
                            "aria-expanded",
                            "false"
                        );
                    }

                }

            });

        });

    }


    /* =====================================================
       LOGOUT
    ===================================================== */

    if (logoutBtn) {

        logoutBtn.addEventListener("click", () => {

            const confirmed = confirm(
                "Are you sure you want to logout?"
            );

            if (!confirmed) return;

            localStorage.removeItem("adminToken");
            localStorage.removeItem("adminUser");
            localStorage.removeItem("adminLoggedIn");

            sessionStorage.removeItem("adminToken");
            sessionStorage.removeItem("adminUser");
            sessionStorage.removeItem("adminLoggedIn");

            window.location.href = "admin-login.html";

        });

    }


    /* =====================================================
       MODAL HELPERS
    ===================================================== */

    function openModal(modal) {

        if (!modal) return;

        modal.classList.add("show");

        document.body.classList.add("modal-open");

    }


    function closeModal(modal) {

        if (!modal) return;

        modal.classList.remove("show");

        document.body.classList.remove("modal-open");

    }


    /* =====================================================
       RESET CATEGORY FORM
    ===================================================== */

    function resetCategoryForm() {

        if (!categoryForm) return;

        categoryForm.reset();

        if (categoryId) {
            categoryId.value = "";
        }

        editingCategoryId = null;

        if (categoryModalTitle) {
            categoryModalTitle.textContent =
                "Add Category";
        }

        if (saveCategoryBtn) {
            saveCategoryBtn.textContent =
                "Save Category";
        }

    }


    /* =====================================================
       ADD CATEGORY BUTTON
    ===================================================== */

    if (addCategoryBtn) {

        addCategoryBtn.addEventListener("click", () => {

            resetCategoryForm();

            openModal(categoryModal);

            if (categoryName) {
                setTimeout(() => {
                    categoryName.focus();
                }, 100);
            }

        });

    }


    /* =====================================================
       CLOSE ADD / EDIT MODAL
    ===================================================== */

    if (closeCategoryModal) {

        closeCategoryModal.addEventListener("click", () => {

            closeModal(categoryModal);

        });

    }


    if (cancelCategoryBtn) {

        cancelCategoryBtn.addEventListener("click", () => {

            closeModal(categoryModal);

        });

    }


    /* =====================================================
       AUTO-GENERATE SLUG
    ===================================================== */

    if (categoryName && categorySlug) {

        categoryName.addEventListener("input", () => {

            if (editingCategoryId) return;

            const slug = categoryName.value
                .toLowerCase()
                .trim()
                .replace(/&/g, "and")
                .replace(/[^a-z0-9\s-]/g, "")
                .replace(/\s+/g, "-")
                .replace(/-+/g, "-");

            categorySlug.value = slug;

        });

    }


    /* =====================================================
       SLUG VALIDATION
    ===================================================== */

    function isValidSlug(slug) {

        return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug);

    }


    /* =====================================================
       DATE FORMAT
    ===================================================== */

    function getCurrentDate() {

        const now = new Date();

        return now.toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric"
        });

    }


    /* =====================================================
       DETERMINE CATEGORY TYPE
    ===================================================== */

    function getCategoryType(name) {

        const value = name.toLowerCase();

        if (value.includes("prostate")) {
            return "prostate";
        }

        if (value.includes("urinary")) {
            return "urinary";
        }

        if (
            value.includes("sti") ||
            value.includes("sexual")
        ) {
            return "sti";
        }

        return "prostate";

    }


    /* =====================================================
       GET CONDITION COUNT
    ===================================================== */

    function getConditionCount(categoryName) {

        const value = categoryName.toLowerCase();

        if (value.includes("prostate")) {
            return 2;
        }

        if (value.includes("urinary")) {
            return 2;
        }

        if (
            value.includes("sti") ||
            value.includes("sexual")
        ) {
            return 3;
        }

        return 0;

    }


    /* =====================================================
       CHECK DUPLICATE CATEGORY
    ===================================================== */

    function categoryExists(name, slug, currentId = null) {

        const rows =
            categoryTableBody.querySelectorAll(
                ".category-row"
            );

        return Array.from(rows).some(row => {

            if (
                currentId &&
                row.dataset.id === currentId
            ) {
                return false;
            }

            const existingName =
                row.dataset.name.toLowerCase();

            const existingSlug =
                row.dataset.slug.toLowerCase();

            return (
                existingName === name.toLowerCase() ||
                existingSlug === slug.toLowerCase()
            );

        });

    }


    /* =====================================================
       CREATE CATEGORY ROW
    ===================================================== */

    function createCategoryRow(category) {

        const row =
            document.createElement("tr");

        row.className = "category-row";

        row.dataset.id = category.id;
        row.dataset.name = category.name;
        row.dataset.slug = category.slug;
        row.dataset.description =
            category.description;
        row.dataset.conditions =
            category.conditions;


        row.innerHTML = `
            <td>
                <span class="table-primary">
                    ${escapeHTML(category.name)}
                </span>

                <span class="table-secondary">
                    ${escapeHTML(category.subtitle)}
                </span>
            </td>

            <td>
                <span class="table-secondary">
                    ${escapeHTML(category.slug)}
                </span>
            </td>

            <td>
                <div class="table-description">
                    ${escapeHTML(category.description)}
                </div>
            </td>

            <td>
                <span class="category-badge ${category.type}">
                    ${category.conditions} Conditions
                </span>
            </td>

            <td>
                ${category.created}
            </td>

            <td>
                ${category.updated}
            </td>

            <td>
                <span class="status-badge active">
                    Active
                </span>
            </td>

            <td>
                <div class="table-actions">

                    <button
                        type="button"
                        class="table-action view view-category-btn"
                        title="View category"
                        aria-label="View ${escapeHTML(category.name)}"
                    >
                        ◉
                    </button>

                    <button
                        type="button"
                        class="table-action edit edit-category-btn"
                        title="Edit category"
                        aria-label="Edit ${escapeHTML(category.name)}"
                    >
                        ✎
                    </button>

                    <button
                        type="button"
                        class="table-action delete delete-category-btn"
                        title="Delete category"
                        aria-label="Delete ${escapeHTML(category.name)}"
                    >
                        ×
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

        return String(value)
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");

    }


    /* =====================================================
       FORM SUBMISSION
    ===================================================== */

    if (categoryForm) {

        categoryForm.addEventListener("submit", event => {

            event.preventDefault();


            const name =
                categoryName.value.trim();

            const slug =
                categorySlug.value.trim().toLowerCase();

            const description =
                categoryDescription.value.trim();


            /* VALIDATION */

            if (!name) {

                alert("Please enter a category name.");

                categoryName.focus();

                return;
            }


            if (!slug) {

                alert("Please enter a category slug.");

                categorySlug.focus();

                return;
            }


            if (!isValidSlug(slug)) {

                alert(
                    "Slug must contain only lowercase letters, numbers and hyphens."
                );

                categorySlug.focus();

                return;
            }


            if (!description) {

                alert(
                    "Please enter a category description."
                );

                categoryDescription.focus();

                return;
            }


            /* DUPLICATE CHECK */

            if (
                categoryExists(
                    name,
                    slug,
                    editingCategoryId
                )
            ) {

                alert(
                    "A category with this name or slug already exists."
                );

                return;
            }


            /* EDIT EXISTING */

            if (editingCategoryId) {

                const row =
                    categoryTableBody.querySelector(
                        `.category-row[data-id="${editingCategoryId}"]`
                    );

                if (!row) return;


                const now = getCurrentDate();

                const type =
                    getCategoryType(name);

                const conditions =
                    Number(row.dataset.conditions) || 0;


                row.dataset.name = name;
                row.dataset.slug = slug;
                row.dataset.description = description;


                const cells = row.children;


                cells[0].querySelector(
                    ".table-primary"
                ).textContent = name;


                cells[1].querySelector(
                    ".table-secondary"
                ).textContent = slug;


                cells[2].querySelector(
                    ".table-description"
                ).textContent = description;


                const badge =
                    cells[3].querySelector(
                        ".category-badge"
                    );

                badge.className =
                    `category-badge ${type}`;

                badge.textContent =
                    `${conditions} Conditions`;


                cells[5].textContent = now;


                closeModal(categoryModal);

                resetCategoryForm();

                updateStatistics();

                alert("Category updated successfully.");

                return;
            }


            /* ADD NEW CATEGORY */

            const id =
                String(Date.now());

            const now =
                getCurrentDate();

            const type =
                getCategoryType(name);

            const conditions =
                getConditionCount(name);


            const category = {

                id: id,

                name: name,

                slug: slug,

                description: description,

                conditions: conditions,

                type: type,

                subtitle:
                    "Health information category",

                created: now,

                updated: now

            };


            const row =
                createCategoryRow(category);


            categoryTableBody.appendChild(row);


            closeModal(categoryModal);

            resetCategoryForm();

            updateStatistics();

            filterCategories();


            alert("Category added successfully.");

        });

    }


    /* =====================================================
       EDIT CATEGORY
    ===================================================== */

    function editCategory(row) {

        editingCategoryId =
            row.dataset.id;


        categoryId.value =
            row.dataset.id;


        categoryName.value =
            row.dataset.name;


        categorySlug.value =
            row.dataset.slug;


        categoryDescription.value =
            row.dataset.description;


        categoryModalTitle.textContent =
            "Edit Category";


        saveCategoryBtn.textContent =
            "Update Category";


        openModal(categoryModal);


        setTimeout(() => {

            categoryName.focus();

        }, 100);

    }


    /* =====================================================
       VIEW CATEGORY
    ===================================================== */

    function viewCategory(row) {

        const name =
            row.dataset.name;

        const slug =
            row.dataset.slug;

        const description =
            row.dataset.description;

        const conditions =
            row.dataset.conditions;


        const cells = row.children;


        const created =
            cells[4]?.textContent.trim() || "—";

        const updated =
            cells[5]?.textContent.trim() || "—";


        const type =
            getCategoryType(name);


        if (viewCategoryTitle) {
            viewCategoryTitle.textContent = name;
        }

        if (viewCategoryDescription) {
            viewCategoryDescription.textContent =
                description;
        }

        if (viewCategorySlug) {
            viewCategorySlug.textContent =
                slug;
        }

        if (viewCategoryConditions) {
            viewCategoryConditions.textContent =
                `${conditions} Conditions`;
        }

        if (viewCategoryCreated) {
            viewCategoryCreated.textContent =
                created;
        }

        if (viewCategoryUpdated) {
            viewCategoryUpdated.textContent =
                updated;
        }


        if (viewCategoryIcon) {

            if (type === "sti") {

                viewCategoryIcon.textContent = "+";

            } else if (type === "urinary") {

                viewCategoryIcon.textContent = "◌";

            } else {

                viewCategoryIcon.textContent = "◈";

            }

        }


        openModal(viewCategoryModal);

    }


    /* =====================================================
       DELETE CATEGORY
    ===================================================== */

    function deleteCategory(row) {

        const name =
            row.dataset.name;

        const conditions =
            Number(row.dataset.conditions) || 0;


        if (conditions > 0) {

            const confirmed =
                confirm(
                    `${name} currently contains ${conditions} condition(s).\n\nAre you sure you want to delete this category?`
                );

            if (!confirmed) return;

        } else {

            const confirmed =
                confirm(
                    `Are you sure you want to delete "${name}"?`
                );

            if (!confirmed) return;

        }


        row.remove();


        updateStatistics();

        filterCategories();


        alert(
            `"${name}" has been deleted.`
        );

    }


    /* =====================================================
       ACTION BUTTON HANDLER
       EVENT DELEGATION
    ===================================================== */

    if (categoryTableBody) {

        categoryTableBody.addEventListener(
            "click",
            event => {

                const button =
                    event.target.closest(
                        ".table-action"
                    );

                if (!button) return;


                const row =
                    button.closest(
                        ".category-row"
                    );

                if (!row) return;


                if (
                    button.classList.contains(
                        "view-category-btn"
                    )
                ) {

                    viewCategory(row);

                }


                else if (
                    button.classList.contains(
                        "edit-category-btn"
                    )
                ) {

                    editCategory(row);

                }


                else if (
                    button.classList.contains(
                        "delete-category-btn"
                    )
                ) {

                    deleteCategory(row);

                }

            }
        );

    }


    /* =====================================================
       CLOSE VIEW MODAL
    ===================================================== */

    if (closeViewModal) {

        closeViewModal.addEventListener(
            "click",
            () => {

                closeModal(viewCategoryModal);

            }
        );

    }


    if (closeViewCategoryBtn) {

        closeViewCategoryBtn.addEventListener(
            "click",
            () => {

                closeModal(viewCategoryModal);

            }
        );

    }


    /* =====================================================
       CLICK OUTSIDE MODAL
    ===================================================== */

    [categoryModal, viewCategoryModal]
        .forEach(modal => {

            if (!modal) return;

            modal.addEventListener(
                "click",
                event => {

                    if (
                        event.target === modal
                    ) {

                        closeModal(modal);

                    }

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


            if (
                categoryModal &&
                categoryModal.classList.contains("show")
            ) {

                closeModal(categoryModal);

            }


            if (
                viewCategoryModal &&
                viewCategoryModal.classList.contains("show")
            ) {

                closeModal(viewCategoryModal);

            }


            if (
                adminSidebar &&
                adminSidebar.classList.contains("open")
            ) {

                adminSidebar.classList.remove("open");

                if (adminMenuToggle) {

                    adminMenuToggle.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                }

            }

        }
    );


    /* =====================================================
       SEARCH
    ===================================================== */

    function filterCategories() {

        if (!categoryTableBody) return;


        const searchTerm =
            categorySearch
                ? categorySearch.value
                    .toLowerCase()
                    .trim()
                : "";


        const rows =
            categoryTableBody.querySelectorAll(
                ".category-row"
            );


        let visibleCount = 0;


        rows.forEach(row => {

            const name =
                row.dataset.name
                    .toLowerCase();

            const slug =
                row.dataset.slug
                    .toLowerCase();

            const description =
                row.dataset.description
                    .toLowerCase();


            const matches =
                !searchTerm ||
                name.includes(searchTerm) ||
                slug.includes(searchTerm) ||
                description.includes(searchTerm);


            if (matches) {

                row.style.display = "";

                visibleCount++;

            } else {

                row.style.display = "none";

            }

        });


        if (showingCategories) {

            showingCategories.textContent =
                visibleCount;

        }


        if (emptySearchState) {

            if (visibleCount === 0) {

                emptySearchState.style.display =
                    "block";

            } else {

                emptySearchState.style.display =
                    "none";

            }

        }

    }


    if (categorySearch) {

        categorySearch.addEventListener(
            "input",
            filterCategories
        );

    }


    /* =====================================================
       CLEAR SEARCH
    ===================================================== */

    if (clearSearchBtn) {

        clearSearchBtn.addEventListener(
            "click",
            () => {

                if (categorySearch) {

                    categorySearch.value = "";

                    categorySearch.focus();

                }

                filterCategories();

            }
        );

    }


    /* =====================================================
       UPDATE STATISTICS
    ===================================================== */

    function updateStatistics() {

        if (!categoryTableBody) return;


        const rows =
            categoryTableBody.querySelectorAll(
                ".category-row"
            );


        let prostate = 0;
        let urinary = 0;
        let sti = 0;


        rows.forEach(row => {

            const type =
                getCategoryType(
                    row.dataset.name
                );

            const conditions =
                Number(
                    row.dataset.conditions
                ) || 0;


            if (type === "prostate") {

                prostate += conditions;

            }

            else if (type === "urinary") {

                urinary += conditions;

            }

            else if (type === "sti") {

                sti += conditions;

            }

        });


        if (totalCategories) {

            totalCategories.textContent =
                rows.length;

        }


        if (prostateCount) {

            prostateCount.textContent =
                prostate;

        }


        if (urinaryCount) {

            urinaryCount.textContent =
                urinary;

        }


        if (stiCount) {

            stiCount.textContent =
                sti;

        }

    }


    /* =====================================================
       INITIALIZE
    ===================================================== */

    updateStatistics();

    filterCategories();


    console.log(
        "MenCare Category Management loaded successfully."
    );

});