// app.js — Watch logic + Background animation + Scroll arrow

// ---- Watch Options ----
const watchOptions = [
  { emoji: "🟠", name: "Ubuntu",      tagline: '"It just works. Usually."',                               action: "distro", page: "distros/ubuntu.html" },
  { emoji: "🌿", name: "Mint",        tagline: '"Windows users in denial."',                              action: "distro", page: "distros/mint.html" },
  { emoji: "🔵", name: "Fedora",      tagline: '"Bleeding edge, but not bleeding out."',                  action: "distro", page: "distros/fedora.html" },
  { emoji: "🚀", name: "Pop!_OS",     tagline: '"Tiling makes you productive. Apparently."',              action: "distro", page: "distros/popos.html" },
  { emoji: "⚡", name: "Arch",        tagline: '"You install everything manually. Including your ego."',  action: "distro", page: "distros/arch.html" },
  { emoji: "🧩", name: "System Quiz", tagline: '"Let the Omnitrix scan your requirements."',              action: "quiz",   page: null }
];

let currentIndex    = 0;
let currentRotation = 0;
const rotationStep  = 360 / watchOptions.length;
let isSlamming      = false;
let isActivated     = false;

const watchContainer = document.getElementById("watch-container");
const watchCore      = document.getElementById("watch-core");
const hologram       = document.getElementById("hologram");
const holoIcon       = document.getElementById("holo-icon");
const holoName       = document.getElementById("holo-name");
const hudTitle       = document.getElementById("hud-title");
const hudDesc        = document.getElementById("hud-desc");
const btnLeft        = document.getElementById("btn-left");
const btnRight       = document.getElementById("btn-right");
const btnSelect      = document.getElementById("btn-select");
const scrollArrow    = document.getElementById("scroll-arrow");

// ---- WATCH LOGIC ----
if (watchContainer && watchCore) {
  function activateOmnitrix() {
    if (!isActivated) { isActivated = true; watchCore.classList.add("is-active"); }
  }

  function cycleOmnitrix(direction) {
    if (isSlamming) return;
    activateOmnitrix();

    if (direction === "right") {
      currentIndex    = (currentIndex + 1) % watchOptions.length;
      currentRotation -= rotationStep;
    } else {
      currentIndex    = (currentIndex - 1 + watchOptions.length) % watchOptions.length;
      currentRotation += rotationStep;
    }

    const opt = watchOptions[currentIndex];
    watchCore.style.transform = `translateZ(60px) rotate(${currentRotation}deg)`;
    hologram.style.transform  = `rotate(${-currentRotation}deg)`;
    holoIcon.textContent      = opt.emoji;
    holoName.textContent      = opt.name;
    if (hudTitle) hudTitle.textContent = opt.name;
    if (hudDesc)  hudDesc.textContent  = opt.tagline;

    const isQuiz = opt.action === "quiz";
    holoName.style.color      = isQuiz ? "#ffcc00" : "";
    holoName.style.textShadow = isQuiz ? "0 0 10px #ffcc00" : "";
  }

  function engageSelection() {
    if (isSlamming) return;
    isSlamming = true;
    activateOmnitrix();
    const opt = watchOptions[currentIndex];
    watchCore.classList.add("is-slamming");

    setTimeout(() => {
      if (opt.action === "quiz") {
        watchCore.classList.remove("is-slamming");
        isSlamming = false;
        const panel = document.getElementById("bottom-panel");
        if (panel) panel.scrollIntoView({ behavior: "smooth" });
      } else {
        window.location.href = opt.page;
      }
    }, 300);
  }

  watchContainer.addEventListener("mouseenter", activateOmnitrix);
  if (btnLeft)   btnLeft.addEventListener("click",  () => cycleOmnitrix("left"));
  if (btnRight)  btnRight.addEventListener("click", () => cycleOmnitrix("right"));
  if (btnSelect) btnSelect.addEventListener("click", engageSelection);

  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft")  cycleOmnitrix("left");
    if (e.key === "ArrowRight") cycleOmnitrix("right");
    if ((e.key === "Enter" || e.key === " ") && document.activeElement.tagName !== "SELECT") {
      e.preventDefault();
      engageSelection();
    }
  });
}

// ---- SCROLL ARROW — hide on scroll ----
if (scrollArrow) {
  const bottomPanel = document.getElementById("bottom-panel");
  if (bottomPanel) {
    const arrowObs = new IntersectionObserver(
      ([entry]) => { scrollArrow.classList.toggle("hidden", entry.isIntersecting); },
      { threshold: 0.05 }
    );
    arrowObs.observe(bottomPanel);
  }
}

// ---- FADE-IN OBSERVER ----
const fadeObs = new IntersectionObserver((entries) => {
  entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("visible"); fadeObs.unobserve(e.target); } });
}, { threshold: 0.08 });
document.querySelectorAll(".fade-in").forEach((el) => fadeObs.observe(el));


// ========================================
// ANIMATED BACKGROUND — floating particles
// Creates a subtle, green-themed particle
// grid that drifts slowly on a canvas layer.
// ========================================
(function initBackground() {
  const canvas = document.getElementById("bg-canvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");

  let W, H;
  let particles = [];
  const COUNT = 60;

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  function createParticles() {
    particles = [];
    for (let i = 0; i < COUNT; i++) {
      particles.push({
        x:  Math.random() * W,
        y:  Math.random() * H,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        r:  Math.random() * 1.5 + 0.5,
        a:  Math.random() * 0.5 + 0.15
      });
    }
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);

    // Draw connections
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 150) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(57, 255, 20, ${0.06 * (1 - dist / 150)})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }

    // Draw particles
    for (const p of particles) {
      p.x += p.vx;
      p.y += p.vy;

      // Wrap edges
      if (p.x < -10) p.x = W + 10;
      if (p.x > W + 10) p.x = -10;
      if (p.y < -10) p.y = H + 10;
      if (p.y > H + 10) p.y = -10;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(57, 255, 20, ${p.a})`;
      ctx.fill();
    }

    requestAnimationFrame(draw);
  }

  window.addEventListener("resize", () => { resize(); createParticles(); });
  resize();
  createParticles();
  draw();
})();