// transitions.js — Green flash page transition for all Omnitrix pages
// Include this script on every page, BEFORE closing </body>

(function () {
  // Inject the overlay div if it doesn't exist
  let overlay = document.getElementById("page-transition");
  if (!overlay) {
    overlay = document.createElement("div");
    overlay.id = "page-transition";
    document.body.appendChild(overlay);
  }

  // ---- Flash IN on page load ----
  // This gives the "arriving through the green flash" feel
  window.addEventListener("DOMContentLoaded", () => {
    overlay.classList.add("flash-in");
    overlay.addEventListener(
      "animationend",
      () => {
        overlay.classList.remove("flash-in");
        overlay.style.opacity = "0";
      },
      { once: true }
    );
  });

  // ---- Flash OUT then navigate on link click ----
  document.addEventListener("click", (e) => {
    const link = e.target.closest("a[href]");
    if (!link) return;

    const href = link.getAttribute("href");

    // Ignore: external links, anchors, mailto, or links openining new tabs
    if (
      !href ||
      href.startsWith("#") ||
      href.startsWith("http") ||
      href.startsWith("mailto") ||
      link.target === "_blank"
    ) {
      return;
    }

    // Prevent the immediate navigation
    e.preventDefault();

    // Trigger flash-out animation
    overlay.classList.remove("flash-in");
    overlay.classList.add("flash-out");

    // Wait for the brightest point of flash-out, then navigate
    setTimeout(() => {
      window.location.href = href;
    }, 250); // navigate while screen is at peak green
  });
})();
