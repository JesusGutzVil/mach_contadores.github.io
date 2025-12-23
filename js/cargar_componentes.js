document.addEventListener("DOMContentLoaded", () => {
  loadComponent("header", "components/header.html");
  loadComponent("footer", "components/footer.html");
});

function loadComponent(targetId, file) {
  const container = document.getElementById(targetId);
  if (!container) return;

  fetch(file)
    .then((r) => r.text())
    .then((html) => (container.innerHTML = html))
    .catch((err) => console.error("Error cargando ", file, err));
}
