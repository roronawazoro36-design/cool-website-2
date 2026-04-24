const processCards = document.querySelectorAll(".process-card");
const menuToggle = document.querySelector(".menu-toggle");
const siteHeader = document.querySelector(".site-header");
const mobileNavLinks = document.querySelectorAll(".site-nav a, .header-menu .outline-button");

processCards.forEach((card) => {
  card.addEventListener("toggle", () => {
    if (!card.open) {
      return;
    }

    processCards.forEach((other) => {
      if (other !== card) {
        other.removeAttribute("open");
      }
    });
  });
});

menuToggle?.addEventListener("click", () => {
  const isOpen = siteHeader?.classList.toggle("menu-open");
  menuToggle.classList.toggle("is-open", Boolean(isOpen));
  menuToggle.setAttribute("aria-expanded", String(Boolean(isOpen)));
});

mobileNavLinks.forEach((link) => {
  link.addEventListener("click", () => {
    if (!siteHeader?.classList.contains("menu-open")) {
      return;
    }

    siteHeader.classList.remove("menu-open");
    menuToggle?.classList.remove("is-open");
    menuToggle?.setAttribute("aria-expanded", "false");
  });
});

const testimonialCards = Array.from(document.querySelectorAll(".testimonial-panel .testimonial-card"));
const testimonialDots = Array.from(document.querySelectorAll(".testimonial-panel .dot"));
const testimonialPrev = document.querySelector('.testimonial-arrow[data-direction="prev"]');
const testimonialNext = document.querySelector('.testimonial-arrow[data-direction="next"]');

let activeTestimonial = 1;

function renderTestimonials() {
  const total = testimonialCards.length;

  testimonialCards.forEach((card, index) => {
    card.classList.remove("is-active", "is-side");

    if (index === activeTestimonial) {
      card.classList.add("is-active");
      return;
    }

    const prevIndex = (activeTestimonial - 1 + total) % total;
    const nextIndex = (activeTestimonial + 1) % total;

    if (index === prevIndex || index === nextIndex) {
      card.classList.add("is-side");
    }
  });

  testimonialDots.forEach((dot, index) => {
    dot.classList.toggle("active", index === activeTestimonial);
  });
}

testimonialPrev?.addEventListener("click", () => {
  activeTestimonial = (activeTestimonial - 1 + testimonialCards.length) % testimonialCards.length;
  renderTestimonials();
});

testimonialNext?.addEventListener("click", () => {
  activeTestimonial = (activeTestimonial + 1) % testimonialCards.length;
  renderTestimonials();
});

testimonialDots.forEach((dot) => {
  dot.addEventListener("click", () => {
    activeTestimonial = Number(dot.dataset.index);
    renderTestimonials();
  });
});

renderTestimonials();
