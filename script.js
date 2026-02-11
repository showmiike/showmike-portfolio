const yearEl = document.getElementById("year");
yearEl.textContent = new Date().getFullYear();

function demoAlert(e){
  e.preventDefault();
  alert("This is a demo link. Later we’ll add real Live/Code links. 😊");
}

const copyBtn = document.getElementById("copyBtn");
copyBtn.addEventListener("click", () => {
  const email = "yourname@email.com"; // change this
  navigator.clipboard.writeText(email);
  copyBtn.textContent = "Copied ✅";
  setTimeout(() => (copyBtn.textContent = "Copy Email"), 1500);
});

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
