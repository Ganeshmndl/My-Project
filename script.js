document.addEventListener("DOMContentLoaded", () => {
  // --- 1. THEME SWITCHER LOGIC ---
  const themeToggles = document.querySelectorAll(".theme-toggle");
  const body = document.body;

  function applyTheme() {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "light") {
      body.classList.add("light-mode");
    } else {
      body.classList.remove("light-mode");
    }
  }

  themeToggles.forEach((btn) => {
    btn.addEventListener("click", () => {
      body.classList.toggle("light-mode");
      if (body.classList.contains("light-mode")) {
        localStorage.setItem("theme", "light");
      } else {
        localStorage.removeItem("theme");
      }
    });
  });

  applyTheme(); // Apply theme on initial load

  // --- 2. DESKTOP SIDEBAR HOVER EFFECT ---
  const sidebar = document.querySelector(".sidebar");
  sidebar.addEventListener("mouseenter", () =>
    body.classList.add("sidebar-expanded")
  );
  sidebar.addEventListener("mouseleave", () =>
    body.classList.remove("sidebar-expanded")
  );

  // --- 3. MOBILE MENU TOGGLE AND NAVIGATION ---
  // --- 3. MOBILE MENU TOGGLE ---
  const mobileMenuToggle = document.getElementById("mobileMenuToggle");
  const menuOverlay = document.querySelector(".menu-overlay");

  function openMenu() {
    sidebar.classList.add("is-open");
    body.classList.add("menu-is-open");
  }

  function closeMenu() {
    sidebar.classList.remove("is-open");
    body.classList.remove("menu-is-open");
  }

  if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener("click", () => {
      // If menu is already open, close it. Otherwise, open it.
      if (sidebar.classList.contains("is-open")) {
        closeMenu();
      } else {
        openMenu();
      }
    });
  }

  // Close menu when the overlay is clicked
  if (menuOverlay) {
    menuOverlay.addEventListener("click", closeMenu);
  }

  // Close menu when a navigation link is clicked
  document.querySelectorAll(".sidebar-menu a").forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      const targetSection = document.querySelector(targetId);
      if (targetSection) {
        targetSection.scrollIntoView({ behavior: "smooth" });
      }
      closeMenu(); // Use the closeMenu function
    });
  });

  // --- 4. PROJECT FILTERING ---
  const filterButtons = document.querySelectorAll(".filter-btn");
  const projects = document.querySelectorAll(".card-container .card");

  if (filterButtons.length > 0) {
    filterButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        filterButtons.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        const category = btn.getAttribute("data-category");
        projects.forEach((proj) => {
          const matchesCategory =
            category === "all" || proj.classList.contains(category);
          if (matchesCategory) {
            proj.classList.remove("hidden");
          } else {
            proj.classList.add("hidden");
          }
        });
      });
    });
  }

  // --- 5. BACK TO TOP BUTTON ---
  const backToTopButton = document.querySelector(".back-to-top");
  if (backToTopButton) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 300) {
        backToTopButton.classList.add("visible");
      } else {
        backToTopButton.classList.remove("visible");
      }
    });
  }
});
