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
