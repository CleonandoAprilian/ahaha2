document.addEventListener("DOMContentLoaded", () => {
  // Set current year in footer
  document.getElementById("current-year").textContent = new Date().getFullYear();

  // Mobile menu toggle
  const navbarToggle = document.getElementById("navbar-toggle");
  const navbarMenu = document.getElementById("navbar-menu");

  navbarToggle.addEventListener("click", () => {
    navbarMenu.classList.toggle("active");

    // Change icon based on menu state
    const icon = navbarToggle.querySelector("i");
    if (navbarMenu.classList.contains("active")) {
      icon.classList.remove("fa-bars");
      icon.classList.add("fa-times");
    } else {
      icon.classList.remove("fa-times");
      icon.classList.add("fa-bars");
    }
  });

  // Close mobile menu when clicking on a nav link
  const navLinks = document.querySelectorAll(".nav-link");
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      navbarMenu.classList.remove("active");
      const icon = navbarToggle.querySelector("i");
      icon.classList.remove("fa-times");
      icon.classList.add("fa-bars");
    });
  });

  const scrollContainer = document.querySelector(".location-cards");
  const scrollLeftBtn = document.getElementById("scroll-left");
  const scrollRightBtn = document.getElementById("scroll-right");

  scrollLeftBtn.addEventListener("click", () => {
    scrollContainer.scrollBy({ left: -300, behavior: "smooth" });
  });

  scrollRightBtn.addEventListener("click", () => {
    scrollContainer.scrollBy({ left: 300, behavior: "smooth" });
  });

  // Testimonial slider
  const testimonialSlider = document.getElementById("testimonial-slider");
  const testimonialCards = testimonialSlider.querySelectorAll(".testimonial-card");
  const dots = document.querySelectorAll(".dot");
  let currentSlide = 0;

  // Hide all slides except the first one
  testimonialCards.forEach((card, index) => {
    if (index !== 0) {
      card.style.display = "none";
    }
  });

  // Function to show a specific slide
  function showSlide(n) {
    // Hide all slides
    testimonialCards.forEach((card) => {
      card.style.display = "none";
    });

    // Remove active class from all dots
    dots.forEach((dot) => {
      dot.classList.remove("active");
    });

    // Show the selected slide and activate the corresponding dot
    testimonialCards[n].style.display = "block";
    dots[n].classList.add("active");
    currentSlide = n;
  }

  // Add click event to dots
  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      showSlide(index);
    });
  });

  // Auto slide change
  setInterval(() => {
    currentSlide = (currentSlide + 1) % testimonialCards.length;
    showSlide(currentSlide);
  }, 5000);

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        const navbarHeight = document.querySelector(".navbar").offsetHeight;
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      }
    });
  });

  // Navbar background change on scroll
  window.addEventListener("scroll", () => {
    const navbar = document.querySelector(".navbar");
    if (window.scrollY > 50) {
      navbar.style.backgroundColor = "rgba(255, 255, 255, 0.95)";
      navbar.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.1)";
    } else {
      navbar.style.backgroundColor = "rgba(255, 255, 255, 0.95)";
      navbar.style.boxShadow = "none";
    }
  });

  // Reveal animations on scroll
  const revealElements = document.querySelectorAll(".benefit-card, .feature-card, .menu-card, .location-card, .package-card");

  function revealOnScroll() {
    revealElements.forEach((element) => {
      const elementTop = element.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;

      if (elementTop < windowHeight - 100) {
        element.style.opacity = "1";
        element.style.transform = "translateY(0)";
      }
    });
  }

  // Set initial state for reveal elements
  revealElements.forEach((element) => {
    element.style.opacity = "0";
    element.style.transform = "translateY(20px)";
    element.style.transition = "opacity 0.6s ease, transform 0.6s ease";
  });

  // Call revealOnScroll on page load and scroll
  window.addEventListener("load", revealOnScroll);
  window.addEventListener("scroll", revealOnScroll);
});
