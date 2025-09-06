document.addEventListener("DOMContentLoaded", () => {
  // --- 1. THEME SWITCHER ---
  const themeToggle = document.querySelector(".theme-toggle");
  const body = document.body;

  // Apply saved theme on page load
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "light") {
    body.classList.add("light-mode");
  }

  themeToggle.addEventListener("click", () => {
    body.classList.toggle("light-mode");
    // Save the user's preference
    if (body.classList.contains("light-mode")) {
      localStorage.setItem("theme", "light");
    } else {
      localStorage.removeItem("theme");
    }
  });

  // --- 2. SIDEBAR CONTENT PUSH ---
  const sidebar = document.querySelector(".sidebar");
  sidebar.addEventListener("mouseenter", () =>
    body.classList.add("sidebar-expanded")
  );
  sidebar.addEventListener("mouseleave", () =>
    body.classList.remove("sidebar-expanded")
  );

  // --- 3. ANIMATED PROJECT FILTERING ---
  const filterButtons = document.querySelectorAll(".filter-btn");
  const projects = document.querySelectorAll(".card-container .card");

  filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      // Set active class on button
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

  // Note: The smooth scroll is now handled by the CSS `html { scroll-behavior: smooth; }`
  // which is simpler for this use case.
});
