
window.addEventListener("pageshow", () => {
  document.body.classList.add("fade-in");
});

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("a").forEach((link) => {
    const url = link.getAttribute("href");

    if (!url) return;

    // Enlaces internos sin #
    const isInternal =
      !url.startsWith("http") &&
      !url.startsWith("mailto:") &&
      !url.startsWith("tel:") &&
      !url.startsWith("#");

    if (isInternal) {
      link.addEventListener("click", (e) => {
        e.preventDefault();

        // Fade-out antes de cambiar de página
        document.body.classList.remove("fade-in");
        document.body.style.opacity = "0";

        setTimeout(() => {
          window.location.href = url;
        }, 300);
      });
    }
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const cards = document.querySelectorAll('.mach-card');

  cards.forEach((card, idx) => {
    const p = card.querySelector('.mach-text');
    const btn = card.querySelector('.mach-toggle');
    if (!p || !btn) return;

    // Accesibilidad
    const pid = `mach-text-${idx}`;
    p.id = pid;
    btn.setAttribute('aria-controls', pid);

    // Estado inicial: colapsado
    p.style.maxHeight = '0px';
    p.classList.add('is-collapsed');
    btn.setAttribute('aria-expanded', 'false');
    btn.textContent = 'Ver más';

    // Alternar
    btn.addEventListener('click', () => {
      const expanded = btn.getAttribute('aria-expanded') === 'true';

      if (expanded) {
        // Colapsar
        p.style.maxHeight = '0px';
        p.classList.add('is-collapsed');
        btn.setAttribute('aria-expanded', 'false');
        btn.textContent = 'Ver más';
      } else {
        // Expandir (usar scrollHeight para altura exacta)
        p.style.maxHeight = p.scrollHeight + 'px';
        p.classList.remove('is-collapsed');
        btn.setAttribute('aria-expanded', 'true');
        btn.textContent = 'Ver menos';

        // Si el contenido cambia (fonts/images), ajustar después
        setTimeout(() => {
          p.style.maxHeight = p.scrollHeight + 'px';
        }, 50);
      }
    });

    // Ajustar altura si la ventana cambia de tamaño (evita cortes)
    window.addEventListener('resize', () => {
      if (btn.getAttribute('aria-expanded') === 'true') {
        p.style.maxHeight = p.scrollHeight + 'px';
      }
    });
  });
});


document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".mach-team-section .mach-card");

  cards.forEach((card, idx) => {
    const p = card.querySelector(".mach-text");
    if (!p) return;

    // Botón: reutiliza si existe, si no lo crea
    let btn = card.querySelector(".mach-toggle");
    if (!btn) {
      btn = document.createElement("button");
      btn.type = "button";
      btn.className = "mach-toggle";
      btn.textContent = "Ver más";
      p.insertAdjacentElement("afterend", btn);
    }

    // Accesibilidad
    const pid = p.id || `mach-text-${idx}`;
    p.id = pid;
    btn.setAttribute("aria-controls", pid);
    btn.setAttribute("aria-expanded", "false");

    // Estado inicial (colapsado)
    p.style.maxHeight = "0px";

    // Alternar individual
    btn.addEventListener("click", () => {
      const expanded = btn.getAttribute("aria-expanded") === "true";
      if (expanded) {
        // Colapsar
        p.style.maxHeight = "0px";
        btn.setAttribute("aria-expanded", "false");
        btn.textContent = "Ver más";
      } else {
        // Expandir a su altura natural
        p.style.maxHeight = p.scrollHeight + "px";
        btn.setAttribute("aria-expanded", "true");
        btn.textContent = "Ver menos";

        // Ajuste fino tras el reflow (por si cambia la altura)
        setTimeout(() => {
          if (btn.getAttribute("aria-expanded") === "true") {
            p.style.maxHeight = p.scrollHeight + "px";
          }
        }, 50);
      }
    });

    // Mantener altura correcta si la ventana cambia de tamaño
    window.addEventListener("resize", () => {
      if (btn.getAttribute("aria-expanded") === "true") {
        p.style.maxHeight = p.scrollHeight + "px";
      }
    });
  });
});
