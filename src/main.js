import './style.css'

const toggleBtn = document.getElementById("menu-toggle");
const mobileMenu = document.getElementById("mobile-menu");
const mobileMenuList = mobileMenu.querySelector("ul");

toggleBtn.addEventListener("click", () => {
    const isOpen = mobileMenu.classList.contains("max-h-0");

    if (isOpen) {
        mobileMenu.classList.remove("max-h-0");
        mobileMenu.classList.add("max-h-96");

        mobileMenuList.classList.remove("opacity-0", "-translate-y-2");
        mobileMenuList.classList.add("opacity-100", "translate-y-0");
    } else {
        mobileMenu.classList.remove("max-h-96");
        mobileMenu.classList.add("max-h-0");

        mobileMenuList.classList.remove("opacity-100", "translate-y-0");
        mobileMenuList.classList.add("opacity-0", "-translate-y-2");
    }

    toggleBtn.setAttribute("aria-expanded", isOpen);
})