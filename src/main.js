import "./style.css";

const toggleBtn = document.getElementById("menu-toggle");
const mobileMenu = document.getElementById("mobile-menu");
const mobileMenuList = mobileMenu?.querySelector("ul");

if (toggleBtn && mobileMenu && mobileMenuList) {
  let isMenuOpen = false;

  const openMenu = () => {
    isMenuOpen = true;

    mobileMenu.classList.remove("max-h-0");
    mobileMenu.classList.add("max-h-96");

    mobileMenuList.classList.remove("opacity-0", "-translate-y-2");
    mobileMenuList.classList.add("opacity-100", "translate-y-0");

    toggleBtn.setAttribute("aria-expanded", "true");
    toggleBtn.setAttribute("aria-label", "Close menu");
  };

  const closeMenu = () => {
    isMenuOpen = false;
    mobileMenu.classList.remove("max-h-96");
    mobileMenu.classList.add("max-h-0");

    mobileMenuList.classList.remove("opacity-100", "translate-y-0");
    mobileMenuList.classList.add("opacity-0", "-translate-y-2");

    toggleBtn.setAttribute("aria-expanded", "false");
    toggleBtn.setAttribute("aria-label", "Open menu");
  };

  toggleBtn.addEventListener("click", () => {
    if (isMenuOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  // Auto-close mobile menu when a nav link is clicked
  const mobileLinks = mobileMenuList.querySelectorAll('a[href^="#"]');

  mobileLinks.forEach((link) => {
    link.addEventListener("click", () => {
      // Only close if menu is open (max-h-96)
      if (mobileMenu.classList.contains("max-h-96")) {
        closeMenu();
      }
    });
  });
}

// Form handling with Formspree
const leadForm = document.getElementById("lead-form");
const confirmationCard = document.getElementById("confirmation-card");
const leadHeading = document.getElementById("lead-form-heading");
const formError = document.getElementById("form-error");

if (leadForm) {
  function handleSuccess() {
    leadForm.classList.remove("opacity-100");
    leadForm.classList.add("opacity-0");

    setTimeout(() => {
      leadForm.classList.add("hidden");
      leadHeading.textContent = "Dashboard link sent to your email!";

      confirmationCard.classList.remove("hidden");

      setTimeout(() => {
        confirmationCard.classList.remove("opacity-0");
        confirmationCard.classList.add("opacity-100");
      }, 10);
    }, 300);
  }

  leadForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const nameError = document.getElementById("name-error");
    const emailError = document.getElementById("email-error");

    const submitBtn = leadForm.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn.textContent;

    let isValid = true;

    nameInput.setAttribute("aria-invalid", "false");
    emailInput.setAttribute("aria-invalid", "false");
    nameError.classList.add("hidden");
    emailError.classList.add("hidden");

    if (!nameInput.value.trim()) {
      nameInput.setAttribute("aria-invalid", "true");
      nameError.classList.remove("hidden");
      isValid = false;
    }

    if (!emailInput.value.trim() || !emailInput.checkValidity()) {
      emailInput.setAttribute("aria-invalid", "true");
      emailError.classList.remove("hidden");
      isValid = false;
    }

    if (!isValid) return;

    formError.classList.add("hidden");
    formError.classList.remove("opacity-100");
    formError.classList.add("opacity-0");

    try {
      submitBtn.disabled = true;
      submitBtn.textContent = "Sending...";

      const formData = new FormData(leadForm);

      const response = await fetch(leadForm.action, {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Form submission failed");
      }

      leadForm.reset();
      handleSuccess();
    } catch (error) {
      console.error("Error:", error);

      formError.classList.remove("hidden");

      setTimeout(() => {
        formError.classList.remove("opacity-0");
        formError.classList.add("opacity-100");
      }, 10);

      submitBtn.disabled = false;
      submitBtn.textContent = originalBtnText;
    }
  });
}

// Copyright year
const yearEl = document.querySelector(".copyright-year");

if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}
