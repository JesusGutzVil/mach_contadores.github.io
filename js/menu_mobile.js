// Inicializa el menú móvil cuando el header ya existe
document.addEventListener("DOMContentLoaded", () => {
  setTimeout(initMobileMenu, 0);
});

function initMobileMenu() {
  const btn = document.getElementById("menu-btn");
  const menu = document.getElementById("mobile-menu");
  const header = document.querySelector(".site-header");
  const navLinks = document.querySelectorAll(".header-nav a, .mobile-menu a");

  if (!btn || !menu || !header || navLinks.length === 0) return;

  // Abre y cierra el menú móvil
  btn.addEventListener("click", () => {
    const open = menu.classList.toggle("open");
    menu.setAttribute("aria-hidden", open ? "false" : "true");
    btn.setAttribute("aria-expanded", open ? "true" : "false");
    document.body.classList.toggle("menu-open", open);
  });

  // Aplica estilo al header al hacer scroll
  window.addEventListener("scroll", () => {
    header.classList.toggle("scrolled", window.scrollY > 10);
  });

  // Marca enlace activo y cierra menú al navegar
  const currentPage = window.location.pathname.split("/").pop();

  navLinks.forEach((link) => {
    const linkPage = link.getAttribute("href");

    if (linkPage === currentPage) {
      link.classList.add("active-link");
    }

    link.addEventListener("click", () => {
      if (menu.classList.contains("open")) {
        menu.classList.remove("open");
        menu.setAttribute("aria-hidden", "true");
        btn.setAttribute("aria-expanded", "false");
        document.body.classList.remove("menu-open");
      }
    });
  });
}
