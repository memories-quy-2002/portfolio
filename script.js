const root = document.documentElement;
const modeToggle = document.getElementById("modeToggle");
const modeLabel = modeToggle?.querySelector(".mode-label");
const navLinks = Array.from(document.querySelectorAll(".nav a"));
const sections = Array.from(document.querySelectorAll("main section"));
const filterButtons = Array.from(document.querySelectorAll(".filter"));
const projects = Array.from(document.querySelectorAll(".project"));

const storedTheme = localStorage.getItem("theme");
if (storedTheme === "dark") {
  root.setAttribute("data-theme", "dark");
  if (modeLabel) modeLabel.textContent = "Light";
}

modeToggle?.addEventListener("click", () => {
  const isDark = root.getAttribute("data-theme") === "dark";
  if (isDark) {
    root.removeAttribute("data-theme");
    localStorage.setItem("theme", "light");
    if (modeLabel) modeLabel.textContent = "Dark";
  } else {
    root.setAttribute("data-theme", "dark");
    localStorage.setItem("theme", "dark");
    if (modeLabel) modeLabel.textContent = "Light";
  }
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  { threshold: 0.18 }
);

[...document.querySelectorAll(".section, .project, .pill, .timeline-item, .skills-row")].forEach((el) =>
  observer.observe(el)
);

const activateLink = () => {
  const position = window.scrollY + 200;
  const current = sections.find(
    (section) => position >= section.offsetTop && position < section.offsetTop + section.offsetHeight
  );

  if (!current) return;
  navLinks.forEach((link) => link.classList.remove("active"));
  const active = navLinks.find((link) => link.getAttribute("href") === `#${current.id}`);
  if (active) active.classList.add("active");
};

window.addEventListener("scroll", activateLink);
window.addEventListener("load", activateLink);

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;
    filterButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");

    projects.forEach((project) => {
      const type = project.dataset.type;
      const isVisible = filter === "all" || filter === type;
      project.style.display = isVisible ? "grid" : "none";
    });
  });
});

const contactForm = document.querySelector(".contact-form");
contactForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  alert("Thanks for reaching out! I will reply shortly.");
  contactForm.reset();
});

