document.addEventListener("DOMContentLoaded", () => {
  const track = document.getElementById("carouselTrack");
  const slides = track.querySelectorAll(".carousel-slide");
  const dotsContainer = document.getElementById("carouselDots");
  const wrapper = document.querySelector(".carousel-wrapper");

  let index = 0;
  const total = slides.length;

  slides.forEach((_, i) => {
    const dot = document.createElement("span");
    dot.addEventListener("click", () => goToSlide(i));
    dotsContainer.appendChild(dot);
  });

  const dots = dotsContainer.querySelectorAll("span");

  function updateCarousel() {
    track.style.transform = `translateX(-${index * 100}%)`;

    dots.forEach((dot, i) => {
      dot.classList.toggle("active", i === index);
    });
  }

  function goToSlide(i) {
    index = i;
    updateCarousel();
  }

  function nextSlide() {
    index = (index + 1) % total;
    updateCarousel();
  }

  function prevSlide() {
    index = (index - 1 + total) % total;
    updateCarousel();
  }

  document.getElementById("nextBtn").onclick = nextSlide;
  document.getElementById("prevBtn").onclick = prevSlide;

  updateCarousel();

  let auto = setInterval(nextSlide, 6000);

  wrapper.addEventListener("mouseenter", () => clearInterval(auto));
  wrapper.addEventListener("mouseleave", () => {
    auto = setInterval(nextSlide, 6000);
  });
});
