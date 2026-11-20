// IMPORTANT: Replace this with your WhatsApp number including country code.
// Example: "8801XXXXXXXXX" (digits only; do not include +, spaces, or dashes).
const WHATSAPP_NUMBER = "8801XXXXXXXXX";
const WHATSAPP_MESSAGE = "Hello Estiak World! I would like to know more about VIP access.";

document.querySelectorAll("[data-whatsapp]").forEach((link) => {
  const configured = /^\d{8,15}$/.test(WHATSAPP_NUMBER) && !WHATSAPP_NUMBER.includes("X");
  if (configured) {
    link.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
  } else {
    link.href = "https://wa.me/";
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.addEventListener("click", () => {
      alert("Please add your WhatsApp number in script.js first.");
    });
  }
});

const now = new Date();
document.getElementById("today").textContent = now.toLocaleDateString(undefined, {
  weekday: "short", month: "short", day: "numeric", year: "numeric"
});
document.getElementById("year").textContent = now.getFullYear();

// Lightweight falling-snow effect. Respects reduced-motion preferences.
(() => {
  const canvas = document.getElementById("snow");
  const ctx = canvas.getContext("2d");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduceMotion) return;

  let width = 0, height = 0, flakes = [];
  const count = Math.min(95, Math.floor(window.innerWidth / 9));

  function resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = width + "px";
    canvas.style.height = height + "px";
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    flakes = Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 2.4 + 1,
      speed: Math.random() * 1.1 + 0.35,
      drift: (Math.random() - 0.5) * 0.6,
      opacity: Math.random() * 0.55 + 0.2
    }));
  }

  function draw() {
    ctx.clearRect(0, 0, width, height);
    for (const flake of flakes) {
      ctx.beginPath();
      ctx.arc(flake.x, flake.y, flake.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(207, 231, 255, ${flake.opacity})`;
      ctx.fill();
      flake.y += flake.speed;
      flake.x += flake.drift;
      if (flake.y > height + 5) { flake.y = -5; flake.x = Math.random() * width; }
      if (flake.x > width + 5) flake.x = -5;
      if (flake.x < -5) flake.x = width + 5;
    }
    requestAnimationFrame(draw);
  }
  window.addEventListener("resize", resize, { passive: true });
  resize();
  draw();
})();
