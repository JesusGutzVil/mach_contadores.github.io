// Cargar componentes al iniciar
document.addEventListener("DOMContentLoaded", () => {
  cargarHeader();
  cargarFooter();
});

// Cargar header
function cargarHeader() {
  fetch("components/header.html")
    .then((response) => response.text())
    .then((html) => {
      document.body.insertAdjacentHTML("afterbegin", html);
      marcarLinkActivo();
      activarScrollHeader();
    })
    .catch((error) => console.error("Error header:", error));
}

// Cargar footer
function cargarFooter() {
  fetch("components/footer.html")
    .then((response) => response.text())
    .then((html) => {
      document.body.insertAdjacentHTML("beforeend", html);
    })
    .catch((error) => console.error("Error footer:", error));
}

// Marcar link activo correctamente
function marcarLinkActivo() {
  const links = document.querySelectorAll(".nav-link");
  let paginaActual = window.location.pathname.split("/").pop();

  if (paginaActual === "") {
    paginaActual = "index.html";
  }

  links.forEach((link) => {
    const href = link.getAttribute("href");

    if (!href) return;

    const linkPagina = href.split("/").pop();

    if (linkPagina === paginaActual) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
}

// Scroll header
function activarScrollHeader() {
  const header = document.querySelector(".header");

  if (!header) return;

  window.addEventListener("scroll", () => {
    header.classList.toggle("scrolled", window.scrollY > 50);
  });
}

// Ajustar el body según la altura real del header
function ajustarEspacioHeader() {
  const header = document.querySelector(".header");
  if (!header) return;

  const alturaHeader = header.offsetHeight;
  document.body.style.paddingTop = `${alturaHeader}px`;
}

// Ejecutar cuando el DOM esté listo
document.addEventListener("DOMContentLoaded", () => {
  ajustarEspacioHeader();
});

// Recalcular en resize (por responsive)
window.addEventListener("resize", () => {
  ajustarEspacioHeader();
});
