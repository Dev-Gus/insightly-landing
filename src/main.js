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