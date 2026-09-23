/**
 * =========================================================
 * MENCARE HEALTH HUB
 * Facility Card JavaScript
 * =========================================================
 */

document.addEventListener("DOMContentLoaded", () => {

    console.log("MenCare facility-card.js loaded");


    /* =====================================================
       FACILITY DATA
       Demo data for the frontend.
       Later this will come from FastAPI.
    ===================================================== */

    const facilityData = {

        name: "Nyeri County Referral Hospital",

        type: "HEALTHCARE FACILITY",

        description:
            "A healthcare facility providing general medical services and specialist care for patients in the surrounding community.",

        location:
            "Nyeri, Nyeri County, Kenya",

        address:
            "Nyeri, Kenya",

        phone:
            "+254 000 000 000",

        email:
            "info@example.com",

        services: [
            "General Medical Services",
            "Urology Services",
            "STI Testing & Care",
            "Sexual & Reproductive Health"
        ],

        hours: [
            {
                day: "Monday – Friday",
                time: "8:00 AM – 5:00 PM"
            },
            {
                day: "Saturday",
                time: "9:00 AM – 1:00 PM"
            },
            {
                day: "Sunday",
                time: "Closed"
            }
        ],

        directions:
            "https://www.google.com/maps/search/?api=1&query=Nyeri+County+Referral+Hospital"

    };


    /* =====================================================
       ELEMENTS
    ===================================================== */

    const facilityName =
        document.getElementById("facilityName");

    const facilityType =
        document.getElementById("facilityType");

    const facilityDescription =
        document.getElementById("facilityDescription");

    const facilityLocation =
        document.getElementById("facilityLocation");

    const breadcrumbFacility =
        document.getElementById("breadcrumbFacility");

    const facilityPhone =
        document.getElementById("facilityPhone");

    const facilityEmail =
        document.getElementById("facilityEmail");

    const facilityAddress =
        document.getElementById("facilityAddress");

    const facilityServices =
        document.getElementById("facilityServices");

    const facilityHours =
        document.getElementById("facilityHours");

    const saveFacilityBtn =
        document.getElementById("saveFacilityBtn");

    const directionsBtn =
        document.getElementById("directionsBtn");

    const currentYear =
        document.getElementById("currentYear");


    /* =====================================================
       LOAD FACILITY DATA
    ===================================================== */

    function loadFacilityData() {

        if (facilityName) {
            facilityName.textContent =
                facilityData.name;
        }

        if (facilityType) {
            facilityType.textContent =
                facilityData.type;
        }

        if (facilityDescription) {
            facilityDescription.textContent =
                facilityData.description;
        }

        if (facilityLocation) {
            facilityLocation.textContent =
                facilityData.location;
        }

        if (breadcrumbFacility) {
            breadcrumbFacility.textContent =
                facilityData.name;
        }

        if (facilityPhone) {

            facilityPhone.textContent =
                facilityData.phone;

            facilityPhone.href =
                `tel:${facilityData.phone}`;
        }

        if (facilityEmail) {

            facilityEmail.textContent =
                facilityData.email;

            facilityEmail.href =
                `mailto:${facilityData.email}`;
        }

        if (facilityAddress) {
            facilityAddress.textContent =
                facilityData.address;
        }

        loadServices();
        loadHours();

        if (directionsBtn) {
            directionsBtn.href =
                facilityData.directions;
        }
    }


    /* =====================================================
       LOAD SERVICES
    ===================================================== */

    function loadServices() {

        if (!facilityServices) {
            return;
        }

        facilityServices.innerHTML = "";

        facilityData.services.forEach(service => {

            const tag =
                document.createElement("span");

            tag.className =
                "service-tag";

            tag.textContent =
                service;

            facilityServices.appendChild(tag);

        });

    }


    /* =====================================================
       LOAD OPENING HOURS
    ===================================================== */

    function loadHours() {

        if (!facilityHours) {
            return;
        }

        facilityHours.innerHTML = "";

        facilityData.hours.forEach(item => {

            const row =
                document.createElement("div");

            row.className =
                "hours-row";

            row.innerHTML = `
                <span>${item.day}</span>
                <strong>${item.time}</strong>
            `;

            facilityHours.appendChild(row);

        });

    }


    /* =====================================================
       SAVE FACILITY
    ===================================================== */

    function getSavedFacilities() {

        try {

            return JSON.parse(
                localStorage.getItem(
                    "mencareSavedFacilities"
                )
            ) || [];

        } catch (error) {

            console.error(
                "Unable to read saved facilities:",
                error
            );

            return [];

        }

    }


    function saveFacility() {

        const savedFacilities =
            getSavedFacilities();

        const facilityName =
            facilityData.name;

        const facilityExists =
            savedFacilities.includes(
                facilityName
            );


        if (facilityExists) {

            const updatedFacilities =
                savedFacilities.filter(
                    name => name !== facilityName
                );

            localStorage.setItem(
                "mencareSavedFacilities",
                JSON.stringify(
                    updatedFacilities
                )
            );

            setSavedState(false);

        } else {

            savedFacilities.push(
                facilityName
            );

            localStorage.setItem(
                "mencareSavedFacilities",
                JSON.stringify(
                    savedFacilities
                )
            );

            setSavedState(true);

        }

    }


    function setSavedState(saved) {

        if (!saveFacilityBtn) {
            return;
        }

        if (saved) {

            saveFacilityBtn.classList.add(
                "saved"
            );

            saveFacilityBtn.querySelector(
                ".save-icon"
            ).textContent = "♥";

            saveFacilityBtn.querySelector(
                ".save-text"
            ).textContent =
                "Facility Saved";

            saveFacilityBtn.setAttribute(
                "aria-pressed",
                "true"
            );

        } else {

            saveFacilityBtn.classList.remove(
                "saved"
            );

            saveFacilityBtn.querySelector(
                ".save-icon"
            ).textContent = "♡";

            saveFacilityBtn.querySelector(
                ".save-text"
            ).textContent =
                "Save Facility";

            saveFacilityBtn.setAttribute(
                "aria-pressed",
                "false"
            );

        }

    }


    function checkSavedState() {

        const savedFacilities =
            getSavedFacilities();

        const saved =
            savedFacilities.includes(
                facilityData.name
            );

        setSavedState(saved);

    }


    /* =====================================================
       SAVE BUTTON EVENT
    ===================================================== */

    if (saveFacilityBtn) {

        saveFacilityBtn.addEventListener(
            "click",
            saveFacility
        );

    }


    /* =====================================================
       YEAR
    ===================================================== */

    if (currentYear) {

        currentYear.textContent =
            new Date().getFullYear();

    }


    /* =====================================================
       INITIALIZE
    ===================================================== */

    loadFacilityData();

    checkSavedState();


    console.log(
        "Facility card initialized successfully."
    );

});