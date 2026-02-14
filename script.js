const yearEl = document.getElementById("year");
yearEl.textContent = new Date().getFullYear();

function demoAlert(e){
  e.preventDefault();
  alert("This is a demo link. Later we’ll add real Live/Code links. 😊");
}

const copyBtn = document.getElementById("copyBtn");

if (copyBtn) {
  copyBtn.addEventListener("click", () => {
    const email = "yourname@email.com";
    navigator.clipboard.writeText(email);
    copyBtn.textContent = "Copied ✅";
    setTimeout(() => (copyBtn.textContent = "Copy Email"), 1500);
  });
}

// Scroll reveal for sections
const revealEls = document.querySelectorAll(".section, .hero, .card, .t-content");

revealEls.forEach(el => el.classList.add("reveal"));

const io = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  },
  { threshold: 0.12 }
);

revealEls.forEach(el => io.observe(el));

// ===== Particle Background (Canvas) =====
(function () {
  const canvas = document.getElementById("particles");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  let w, h, dpr;

  const settings = {
    particleCount: 90,       // বেশি/কম করে দেখতে পারো
    maxSpeed: 0.5,           // motion speed
    linkDistance: 140,       // line connect distance
    particleSize: 2.2,       // dot size
  };

  const particles = [];
  const mouse = { x: null, y: null };

  function resize() {
    dpr = Math.max(1, window.devicePixelRatio || 1);
    w = Math.floor(window.innerWidth);
    h = Math.floor(window.innerHeight);

    canvas.width = Math.floor(w * dpr);
    canvas.height = Math.floor(h * dpr);
    canvas.style.width = w + "px";
    canvas.style.height = h + "px";

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function rand(min, max) {
    return Math.random() * (max - min) + min;
  }

  function createParticles() {
    particles.length = 0;
    const count = Math.min(settings.particleCount, Math.floor((w * h) / 12000));
    for (let i = 0; i < count; i++) {
      particles.push({
        x: rand(0, w),
        y: rand(0, h),
        vx: rand(-settings.maxSpeed, settings.maxSpeed),
        vy: rand(-settings.maxSpeed, settings.maxSpeed),
        r: rand(1.2, settings.particleSize),
      });
    }
  }

  function update() {
    for (const p of particles) {
      p.x += p.vx;
      p.y += p.vy;

      // bounce edges
      if (p.x <= 0 || p.x >= w) p.vx *= -1;
      if (p.y <= 0 || p.y >= h) p.vy *= -1;
    }
  }

  function draw() {
    ctx.clearRect(0, 0, w, h);

    // particles
    for (const p of particles) {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(0, 198, 255, 0.85)"; // Blue particles
      ctx.fill();
    }

    // links
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const a = particles[i];
        const b = particles[j];
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < settings.linkDistance) {
          const alpha = 1 - dist / settings.linkDistance;
          ctx.strokeStyle = `rgba(0, 198, 255, ${alpha * 0.35})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }
    }

    // mouse glow (subtle)
    if (mouse.x !== null && mouse.y !== null) {
      const g = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 160);
      g.addColorStop(0, "rgba(0, 198, 255, 0.18)");
      g.addColorStop(1, "rgba(0, 198, 255, 0)");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, w, h);
    }
  }

  function loop() {
    update();
    draw();
    requestAnimationFrame(loop);
  }

  window.addEventListener("resize", () => {
    resize();
    createParticles();
  });

  window.addEventListener("mousemove", (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  window.addEventListener("mouseleave", () => {
    mouse.x = null;
    mouse.y = null;
  });

  // init
  resize();
  createParticles();
  loop();
})();

function openOutline(){
  const modal = document.getElementById("outlineModal");
  if(modal) modal.style.display = "flex";
}

function closeOutline(){
  const modal = document.getElementById("outlineModal");
  if(modal) modal.style.display = "none";
}
