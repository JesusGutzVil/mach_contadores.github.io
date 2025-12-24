document.addEventListener("DOMContentLoaded", () => {
  const checkHeaderLoaded = setInterval(() => {
    const btn = document.getElementById("menu-btn");
    const menu = document.getElementById("mobile-menu");
    const header = document.querySelector(".site-header");
    const navLinks = document.querySelectorAll(".header-nav a, .mobile-menu a");

    if (btn && menu && header && navLinks.length > 0) {
      clearInterval(checkHeaderLoaded);

      /* ===== Toggle menú móvil ===== */
      btn.addEventListener("click", () => {
        const open = menu.classList.toggle("open");
        menu.setAttribute("aria-hidden", open ? "false" : "true");
        btn.setAttribute("aria-expanded", open ? "true" : "false");
        document.body.classList.toggle("menu-open", open);
      });

      /* ===== Animación del header al hacer scroll ===== */
      window.addEventListener("scroll", () => {
        if (window.scrollY > 10) {
          header.classList.add("scrolled");
        } else {
          header.classList.remove("scrolled");
        }
      });

      /* ===== Subrayado inteligente ===== */
      const currentPage = window.location.pathname.split("/").pop();

      navLinks.forEach((link) => {
        const linkPage = link.getAttribute("href");

        if (linkPage === currentPage) {
          link.classList.add("active-link");
        }

        // Si es un enlace dentro del menú móvil, cerrar el menú al hacer clic
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
  }, 40);
});
