document.addEventListener("DOMContentLoaded", () => {
  loadComponent("header", "components/header.html");
  loadComponent("footer", "components/footer.html");
});

function loadComponent(targetId, file) {
  const container = document.getElementById(targetId);
  if (!container) return;

  fetch(file)
    .then((r) => {
      if (!r.ok) throw new Error("No se pudo cargar " + file); // valida respuesta
      return r.text();
    })
    .then((html) => (container.innerHTML = html))
    .catch((err) => console.error(err)); // muestra error real
}


