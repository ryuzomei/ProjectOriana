document.addEventListener("DOMContentLoaded", () => {
  // Automatically update the copyright year.
  document.querySelectorAll(".current-year").forEach((item) => {
    item.textContent = new Date().getFullYear();
  });

  // Dark/light mode. The selected theme is remembered in this browser.
  const themeButtons = document.querySelectorAll(".theme-toggle");
  const savedTheme = localStorage.getItem("oriana-portfolio-theme");
  if (savedTheme === "dark") document.body.classList.add("dark-theme");

  function updateThemeButtons() {
    const isDark = document.body.classList.contains("dark-theme");
    themeButtons.forEach((button) => {
      button.textContent = isDark ? "☾" : "☼";
      button.setAttribute("aria-label", isDark ? "Switch to light theme" : "Switch to dark theme");
      button.title = isDark ? "Switch to light theme" : "Switch to dark theme";
    });
  }
  updateThemeButtons();
  themeButtons.forEach((button) => {
    button.addEventListener("click", () => {
      document.body.classList.toggle("dark-theme");
      localStorage.setItem("oriana-portfolio-theme", document.body.classList.contains("dark-theme") ? "dark" : "light");
      updateThemeButtons();
    });
  });

  // Mobile navigation menu.
  const menuButton = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".nav-links");
  if (menuButton && nav) {
    menuButton.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("open");
      menuButton.setAttribute("aria-expanded", String(isOpen));
      menuButton.textContent = isOpen ? "×" : "☰";
    });
    nav.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => {
      nav.classList.remove("open");
      menuButton.setAttribute("aria-expanded", "false");
      menuButton.textContent = "☰";
    }));
  }

  // Friendly welcome interaction on the home page.
  const welcomeButton = document.getElementById("welcomeBtn");
  if (welcomeButton) {
    welcomeButton.addEventListener("click", () => {
      alert("Welcome to Oriana's portfolio! Thanks for stopping by. ✨");
    });
  }

  // Read more / show-hide information on the About page.
  const readMoreButton = document.getElementById("readMoreBtn");
  const moreAbout = document.getElementById("moreAbout");
  if (readMoreButton && moreAbout) {
    readMoreButton.addEventListener("click", () => {
      const isShown = moreAbout.classList.toggle("show");
      readMoreButton.setAttribute("aria-expanded", String(isShown));
      readMoreButton.textContent = isShown ? "Show Less −" : "Read More About My Goals +";
    });
  }

  // Back-to-top button appears after scrolling.
  const backToTop = document.getElementById("backToTop");
  if (backToTop) {
    const updateBackToTop = () => backToTop.classList.toggle("visible", window.scrollY > 350);
    window.addEventListener("scroll", updateBackToTop, { passive: true });
    updateBackToTop();
    backToTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
  }

  // Contact form prepares a message in the visitor's email app; no server is needed.
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const name = document.getElementById("senderName").value.trim();
      const email = document.getElementById("senderEmail").value.trim();
      const message = document.getElementById("message").value.trim();
      const subject = encodeURIComponent("Portfolio message from " + name);
      const body = encodeURIComponent("Name: " + name + "\\nEmail: " + email + "\\n\\nMessage:\\n" + message);
      const status = document.getElementById("formStatus");
      status.textContent = "Opening your email app. If it does not open, email me directly at rogerjroriana2007@gmail.com.";
      window.location.href = "mailto:rogerjroriana2007@gmail.com?subject=" + subject + "&body=" + body;
    });
  }
});
