const slides = document.querySelectorAll(".carousel-slide");
const dots = document.querySelectorAll(".dot");
const carousel = document.querySelector(".image-carousel");

let index = 0;
let autoplayInterval = null;
const AUTOPLAY_TIME = 4000;

/* ACTUALIZAR ESTADO */
function updateCarousel() {
  slides.forEach((slide, i) => {
    slide.classList.toggle("active", i === index);
  });

  dots.forEach((dot, i) => {
    dot.classList.toggle("active", i === index);
  });
}

/* SIGUIENTE */
function nextSlide() {
  index = (index + 1) % slides.length;
  updateCarousel();
}

/* AUTOPLAY */
function startAutoplay() {
  stopAutoplay();
  autoplayInterval = setInterval(nextSlide, AUTOPLAY_TIME);
}

function stopAutoplay() {
  if (autoplayInterval) {
    clearInterval(autoplayInterval);
    autoplayInterval = null;
  }
}

/* DOTS */
dots.forEach((dot, i) => {
  dot.addEventListener("click", () => {
    index = i;
    updateCarousel();
    startAutoplay();
  });
});

/* PAUSA EN HOVER */
carousel.addEventListener("mouseenter", stopAutoplay);
carousel.addEventListener("mouseleave", startAutoplay);

/* INICIO */
updateCarousel();
startAutoplay();
