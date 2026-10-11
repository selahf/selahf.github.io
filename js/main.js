/* 
   MAIN JAVASCRIPT FILE

   Purpose: Contain interactive behavior for the portfolio.

   Planned functionality includes:
   - Mobile navigation
   - Interactive navigation behavior
   - Accessibility-related interactions
   - Other small enhancements

   Presentation and styling should be contained within CSS files
   whenever possible.
*/

/*
    NAVIGATION PANEL

    Purpose:
    Open and close the right-hand navigation panel.

    Supports:
    - Toggle button
    - Backdrop click to close
    - Escape key to close
    - Returning keyboard focus to the toggle
*/

const navToggle = document.querySelector("#nav-toggle");
const navPanel = document.querySelector("#site-navigation");
const navBackdrop = document.querySelector("#nav-backdrop");
const navToggleIcon = document.querySelector(".nav-toggle-icon");

function openNavigation() {
    navPanel.classList.add("is-open");
    navBackdrop.hidden = false;

    navToggle.setAttribute("aria-expanded", "true");
    navToggle.setAttribute("aria-label", "Close navigation");

    navPanel.setAttribute("aria-hidden", "false");
    navPanel.inert = false;

    navToggleIcon.textContent = "›";
}

function closeNavigation(returnFocus = false) {
    navPanel.classList.remove("is-open");

    navToggle.setAttribute("aria-expanded", "false");
    navToggle.setAttribute("aria-label", "Open navigation");

    navPanel.setAttribute("aria-hidden", "true");
    navPanel.inert = true;

    navToggleIcon.textContent = "‹";

    // wait until the slide-out finishes before hiding the backdrop
    window.setTimeout(() => {
        if (!navPanel.classList.contains("is-open")) {
            navBackdrop.hidden = true;
        }
    }, 250);

    if (returnFocus) {
        navToggle.focus();
    }
}

navToggle.addEventListener("click", () => {
    const isOpen = navToggle.getAttribute("aria-expanded") === "true";

    if (isOpen) {
        closeNavigation();
    } else {
        openNavigation();
    }
});

// clicking outside the panel closes it
navBackdrop.addEventListener("click", () => {
    closeNavigation(true);
});

// escape closes the panel and returns focus to the toggle
document.addEventListener("keydown", (event) => {
    if (
        event.key === "Escape" &&
        navToggle.getAttribute("aria-expanded") === "true"
    ) {
        closeNavigation(true);
    }
});

// selecting a page closes the panel before navigation
navPanel.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
        closeNavigation();
    });
});
