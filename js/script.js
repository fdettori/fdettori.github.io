(() => {
  const menuButton = document.querySelector(".menu-toggle");
  const navigation = document.querySelector(".primary-nav");

  if (!menuButton || !navigation) {
    return;
  }

  const closeMenu = ({ returnFocus = false } = {}) => {
    menuButton.setAttribute("aria-expanded", "false");
    document.body.classList.remove("menu-open");

    if (returnFocus) {
      menuButton.focus();
    }
  };

  menuButton.addEventListener("click", () => {
    const shouldOpen = menuButton.getAttribute("aria-expanded") !== "true";
    menuButton.setAttribute("aria-expanded", String(shouldOpen));
    document.body.classList.toggle("menu-open", shouldOpen);
  });

  navigation.addEventListener("click", (event) => {
    if (event.target.closest("a")) {
      closeMenu();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && document.body.classList.contains("menu-open")) {
      closeMenu({ returnFocus: true });
    }
  });

  document.addEventListener("click", (event) => {
    if (
      document.body.classList.contains("menu-open") &&
      !event.target.closest(".site-header")
    ) {
      closeMenu();
    }
  });

  const mobileNavigation = window.matchMedia("(width <= 720px)");
  mobileNavigation.addEventListener("change", (event) => {
    if (!event.matches) {
      closeMenu();
    }
  });
})();
