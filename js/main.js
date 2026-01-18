/* =====================================================
   Sunrise Solutions – Main UI Script
   Author: Production-ready
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

  /* =====================================================
     ACTIVE NAV LINK (ALL PAGES)
  ===================================================== */
  const navLinks = document.querySelectorAll("nav a");
  const currentPage =
    window.location.pathname.split("/").pop() || "index.html";

  navLinks.forEach(link => {
    if (link.getAttribute("href") === currentPage) {
      link.classList.add("active");
    }
  });

  /* =====================================================
     HEADER SHADOW ON SCROLL
  ===================================================== */
  const header = document.querySelector(".header");

  if (header) {
    window.addEventListener("scroll", () => {
      header.style.boxShadow =
        window.scrollY > 10
          ? "0 4px 14px rgba(0,0,0,0.35)"
          : "none";
    });
  }

  /* =====================================================
     HERO SLIDER (INDEX PAGE)
  ===================================================== */
  const slides = document.querySelectorAll(".slide");
  const nextBtn = document.querySelector(".slider-btn.next");
  const prevBtn = document.querySelector(".slider-btn.prev");

  if (slides.length > 0) {
    let currentIndex = 0;

    function showSlide(index) {
      slides.forEach(slide => slide.classList.remove("active"));
      slides[index].classList.add("active");
    }

    function nextSlide() {
      currentIndex = (currentIndex + 1) % slides.length;
      showSlide(currentIndex);
    }

    function prevSlide() {
      currentIndex = (currentIndex - 1 + slides.length) % slides.length;
      showSlide(currentIndex);
    }

    nextBtn?.addEventListener("click", nextSlide);
    prevBtn?.addEventListener("click", prevSlide);

    setInterval(nextSlide, 5000);
  }

  /* =====================================================
     CANDIDATE LOGIN (HOMEPAGE)
  ===================================================== */
  const loginForm = document.getElementById("loginForm");

  if (loginForm) {
    loginForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const nameInput = document.getElementById("fullName");
      const mobileInput = document.getElementById("mobileNumber");

      const name = nameInput.value.trim();
      const mobile = mobileInput.value.trim();

      /* ✅ NAME VALIDATION: letters + spaces only */
      if (!/^[A-Za-z ]{2,}$/.test(name)) {
        alert("Name should contain only letters and spaces.");
        return;
      }

      /* ✅ MOBILE VALIDATION: exactly 10 digits */
      if (!/^[0-9]{10}$/.test(mobile)) {
        alert("Please enter a valid 10-digit mobile number.");
        return;
      }

      /* ✅ STORE CANDIDATE DATA (TEMP) */
      const candidateData = {
        name: name,
        mobile: mobile,
        loginTime: new Date().toLocaleString()
      };

      localStorage.setItem(
        "sunrise_candidate",
        JSON.stringify(candidateData)
      );

      /* ✅ REDIRECT TO DASHBOARD */
      window.location.href = "candidate-dashboard.html";
    });
  }

  /* =====================================================
     CONTACT FORM VALIDATION (CONTACT PAGE)
  ===================================================== */
  const contactForm = document.querySelector("form:not(#loginForm)");

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      let valid = true;
      const fields = contactForm.querySelectorAll(
        "input[required], textarea[required]"
      );

      fields.forEach(field => {
        if (!field.value.trim()) {
          field.style.borderColor = "#ef4444";
          valid = false;
        } else {
          field.style.borderColor = "#c7cbe3";
        }
      });

      if (!valid) {
        e.preventDefault();
        alert("Please fill all required fields.");
      }
    });
  }

});
