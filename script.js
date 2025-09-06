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

  // Apply theme as soon as the page loads
  applyTheme();

  // --- 2. DESKTOP SIDEBAR HOVER EFFECT ---
  const sidebar = document.querySelector(".sidebar");
  sidebar.addEventListener("mouseenter", () =>
    body.classList.add("sidebar-expanded")
  );
  sidebar.addEventListener("mouseleave", () =>
    body.classList.remove("sidebar-expanded")
  );

  // --- 3. MOBILE MENU TOGGLE ---
  const mobileMenuToggle = document.getElementById("mobileMenuToggle");
  if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener("click", () => {
      sidebar.classList.toggle("is-open");
    });
  }

  // Close mobile menu when a link is clicked
  document.querySelectorAll(".sidebar-menu a").forEach((link) => {
    link.addEventListener("click", () => {
      sidebar.classList.remove("is-open");
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
});
