"use strict";

/* ========================================
   ELEMENTS
======================================== */

const navbar =
    document.getElementById("navbar");

const hamburger =
    document.getElementById("hamburger");

const navMenu =
    document.getElementById("navMenu");

const navLinks =
    document.querySelectorAll(".nav-link");

const sections =
    document.querySelectorAll("section[id]");

const contactForm =
    document.getElementById("contactForm");

const toast =
    document.getElementById("toast");


/* ========================================
   NAVBAR SCROLL
======================================== */

function updateNavbar() {

    if (window.scrollY > 30) {

        navbar.classList.add("scrolled");

    } else {

        navbar.classList.remove("scrolled");

    }

}


/* ========================================
   MOBILE MENU
======================================== */

function openMenu() {

    navMenu.classList.add("active");

    hamburger.classList.add("active");

    hamburger.setAttribute(
        "aria-expanded",
        "true"
    );

    document.body.classList.add(
        "menu-open"
    );

}


function closeMenu() {

    navMenu.classList.remove("active");

    hamburger.classList.remove("active");

    hamburger.setAttribute(
        "aria-expanded",
        "false"
    );

    document.body.classList.remove(
        "menu-open"
    );

}


hamburger.addEventListener(
    "click",
    () => {

        if (
            navMenu.classList.contains(
                "active"
            )
        ) {

            closeMenu();

        } else {

            openMenu();

        }

    }
);


/* ========================================
   NAV LINK
======================================== */

navLinks.forEach(
    link => {

        link.addEventListener(
            "click",
            () => {

                closeMenu();

            }
        );

    }
);


/* ========================================
   ACTIVE NAV ON SCROLL
======================================== */

function updateActiveNav() {

    let current =
        "home";

    const scrollPosition =
        window.scrollY + 180;


    sections.forEach(
        section => {

            const top =
                section.offsetTop;

            const bottom =
                top +
                section.offsetHeight;


            if (
                scrollPosition >= top &&
                scrollPosition < bottom
            ) {

                current =
                    section.id;

            }

        }
    );


    navLinks.forEach(
        link => {

            link.classList.remove(
                "active"
            );


            if (
                link.getAttribute(
                    "href"
                ) ===
                `#${current}`
            ) {

                link.classList.add(
                    "active"
                );

            }

        }
    );

}


/* ========================================
   SCROLL EVENT
======================================== */

window.addEventListener(
    "scroll",
    () => {

        updateNavbar();

        updateActiveNav();

    },
    {
        passive: true
    }
);


/* ========================================
   SMOOTH SCROLL
======================================== */

document.querySelectorAll(
    'a[href^="#"]'
).forEach(
    link => {

        link.addEventListener(
            "click",
            event => {

                const targetId =
                    link.getAttribute(
                        "href"
                    );

                if (
                    !targetId ||
                    targetId === "#"
                ) {

                    return;

                }

                const target =
                    document.querySelector(
                        targetId
                    );

                if (!target) {

                    return;

                }

                event.preventDefault();

                target.scrollIntoView({
                    behavior:
                        "smooth",
                    block:
                        "start"
                });

            }
        );

    }
);


/* ========================================
   ESC CLOSE MENU
======================================== */

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Escape"
        ) {

            closeMenu();

        }

    }
);


/* ========================================
   CLOSE MENU OUTSIDE
======================================== */

document.addEventListener(
    "click",
    event => {

        if (
            !navMenu.contains(event.target) &&
            !hamburger.contains(event.target) &&
            navMenu.classList.contains("active")
        ) {

            closeMenu();

        }

    }
);


/* ========================================
   CONTACT FORM
======================================== */

if (contactForm) {

    contactForm.addEventListener(
        "submit",
        event => {

            event.preventDefault();

            const button =
                contactForm.querySelector(
                    "button"
                );

            const originalText =
                button.innerHTML;


            button.innerHTML =
                '<i class="fa-solid fa-spinner fa-spin"></i> Mengirim...';

            button.disabled =
                true;


            setTimeout(
                () => {

                    contactForm.reset();

                    button.innerHTML =
                        originalText;

                    button.disabled =
                        false;


                    if (toast) {

                        toast.classList.add(
                            "show"
                        );


                        setTimeout(
                            () => {

                                toast.classList.remove(
                                    "show"
                                );

                            },
                            3000
                        );

                    }

                },
                700
            );

        }
    );

}


/* ========================================
   INITIAL
======================================== */

updateNavbar();

updateActiveNav();


/* ========================================
   RESIZE
======================================== */

window.addEventListener(
    "resize",
    () => {

        if (
            window.innerWidth > 700
        ) {

            closeMenu();

        }

    }
);