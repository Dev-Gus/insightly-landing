import './style.css'

const toggleBtn = document.getElementById("menu-toggle");
const mobileMenu = document.getElementById("mobile-menu");
const mobileMenuList = mobileMenu?.querySelector("ul");

if (toggleBtn && mobileMenu && mobileMenuList) {
  const openMenu = () => {
    mobileMenu.classList.remove("max-h-0");
    mobileMenu.classList.add("max-h-96");

    mobileMenuList.classList.remove("opacity-0", "-translate-y-2");
    mobileMenuList.classList.add("opacity-100", "translate-y-0");

    toggleBtn.setAttribute("aria-expanded", "true");
  };

  const closeMenu = () => {
    mobileMenu.classList.remove("max-h-96");
    mobileMenu.classList.add("max-h-0");

    mobileMenuList.classList.remove("opacity-100", "translate-y-0");
    mobileMenuList.classList.add("opacity-0", "-translate-y-2");

    toggleBtn.setAttribute("aria-expanded", "false");
  };

  toggleBtn.addEventListener("click", () => {
    const isCurrentlyClosed = mobileMenu.classList.contains("max-h-0");

    if (isCurrentlyClosed) {
      openMenu();
    } else {
      closeMenu();
    }
  });

  // Auto-close mobile menu when a nav link is clicked
  const mobileLinks = mobileMenuList.querySelectorAll("a[href^=\"#\"]");

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

if (leadForm) {
  leadForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const submitBtn = leadForm.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn.textContent;

    try {
      // Show loading state
      submitBtn.disabled = true;
      submitBtn.textContent = "Sending...";

      const formData = new FormData(leadForm);

      const response = await fetch(leadForm.action, {
        method: "POST",
        body: formData,
        headers: {
          "Accept": "application/json"
        }
      });

      if (response.ok) {
        // Success
        submitBtn.textContent = "✓ Dashboard link sent to your email!";
        submitBtn.classList.add("bg-green-600", "hover:bg-green-700");
        submitBtn.classList.remove("bg-indigo-600", "hover:bg-indigo-700");
        
        // Reset form
        leadForm.reset();
        
        // Reset button after 3 seconds
        setTimeout(() => {
          submitBtn.disabled = false;
          submitBtn.textContent = originalBtnText;
          submitBtn.classList.remove("bg-green-600", "hover:bg-green-700");
          submitBtn.classList.add("bg-indigo-600", "hover:bg-indigo-700");
        }, 3000);
      } else {
        throw new Error("Form submission failed");
      }
    } catch (error) {
      console.error("Error:", error);
      submitBtn.textContent = "Error. Please try again.";
      submitBtn.classList.add("bg-red-600", "hover:bg-red-700");
      submitBtn.classList.remove("bg-indigo-600", "hover:bg-indigo-700");
      
      // Reset button after 3 seconds
      setTimeout(() => {
        submitBtn.textContent = originalBtnText;
        submitBtn.classList.remove("bg-red-600", "hover:bg-red-700");
        submitBtn.classList.add("bg-indigo-600", "hover:bg-indigo-700");
        submitBtn.disabled = false;
      }, 3000);
    }
  });
}