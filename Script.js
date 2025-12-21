// script.js (ES6+)

// Smooth scroll is already handled by CSS (scroll-behavior: smooth)
// Here we enhance: nav link active state + scroll reveal + mobile menu

const navLinks = document.querySelectorAll(".nav-link");
const sections = [...document.querySelectorAll("section[id]")];
const nav = document.querySelector(".nav");
const navToggle = document.querySelector(".nav-toggle");

// year in footer
document.getElementById("year").textContent = new Date().getFullYear();

// MOBILE NAV TOGGLE
navToggle.addEventListener("click", () => {
  nav.classList.toggle("open");
});

// Close nav when clicking a link (on mobile)
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
  });
});

// ACTIVE LINK ON SCROLL
let isHovering = false;

navLinks.forEach(link => {
  link.addEventListener('mouseenter', () => {
    isHovering = true;
  });
  link.addEventListener('mouseleave', () => {
    isHovering = false;
    // Restore active state after hover ends
    setTimeout(() => {
      if (!isHovering) {
        setActiveLink();
      }
    }, 50);
  });
});


const setActiveLink = () => {
  const scrollY = window.pageYOffset;

  sections.forEach((section) => {
    const top = section.offsetTop - 120;
    const height = section.offsetHeight;
    const id = section.getAttribute("id");

    if (scrollY >= top && scrollY < top + height) {
      navLinks.forEach((link) => {
        link.classList.remove("active");
      });
      const current = document.querySelector(`.nav-link[href="#${id}"]`);
      if (current) {
        current.classList.add("active");
      }
    }
  });
};

window.addEventListener("scroll", setActiveLink);
window.addEventListener("load", setActiveLink);

// SCROLL REVEAL ANIMATIONS
const revealEls = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.18,
  }
);

revealEls.forEach((el) => revealObserver.observe(el));
