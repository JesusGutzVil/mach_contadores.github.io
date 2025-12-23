// Aplica fade-in al volver a la página
window.addEventListener("pageshow", () => {
  document.body.classList.add("fade-in");
});

document.addEventListener("DOMContentLoaded", () => {
  // Transición suave entre páginas internas
  document.querySelectorAll("a").forEach((link) => {
    const url = link.getAttribute("href");
    if (!url) return;

    const isInternal =
      !url.startsWith("http") &&
      !url.startsWith("mailto:") &&
      !url.startsWith("tel:") &&
      !url.startsWith("#");

    if (isInternal) {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        document.body.classList.remove("fade-in");
        document.body.style.opacity = "0";

        setTimeout(() => {
          window.location.href = url;
        }, 300);
      });
    }
  });

  // Toggle "Ver más / Ver menos" en tarjetas del equipo
  const cards = document.querySelectorAll(".mach-team-section .mach-card");

  cards.forEach((card, idx) => {
    const text = card.querySelector(".mach-text");
    if (!text) return;

    let btn = card.querySelector(".mach-toggle");
    if (!btn) {
      btn = document.createElement("button");
      btn.type = "button";
      btn.className = "mach-toggle";
      btn.textContent = "Ver más";
      text.insertAdjacentElement("afterend", btn);
    }

    const pid = text.id || `mach-text-${idx}`;
    text.id = pid;
    btn.setAttribute("aria-controls", pid);
    btn.setAttribute("aria-expanded", "false");

    text.style.maxHeight = "0px";

    btn.addEventListener("click", () => {
      const expanded = btn.getAttribute("aria-expanded") === "true";

      if (expanded) {
        text.style.maxHeight = "0px";
        btn.setAttribute("aria-expanded", "false");
        btn.textContent = "Ver más";
      } else {
        text.style.maxHeight = text.scrollHeight + "px";
        btn.setAttribute("aria-expanded", "true");
        btn.textContent = "Ver menos";

        setTimeout(() => {
          if (btn.getAttribute("aria-expanded") === "true") {
            text.style.maxHeight = text.scrollHeight + "px";
          }
        }, 50);
      }
    });

    // Ajusta altura si cambia el tamaño de la ventana
    window.addEventListener("resize", () => {
      if (btn.getAttribute("aria-expanded") === "true") {
        text.style.maxHeight = text.scrollHeight + "px";
      }
    });
  });
});
