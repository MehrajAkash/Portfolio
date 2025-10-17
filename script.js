// Dark/Light Mode
const toggleBtn = document.getElementById("mode-toggle");
toggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    toggleBtn.textContent = document.body.classList.contains("dark") ? "🌙" : "☀️";
});

// Fade-in Animation
const faders = document.querySelectorAll(".fade-in");
const appearOnScroll = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.2 });
faders.forEach(fader => appearOnScroll.observe(fader));

// Live Clock
function updateClock() {
    const clock = document.getElementById("clock");
    const now = new Date();
    clock.textContent = now.toLocaleTimeString();
}
setInterval(updateClock, 1000);
updateClock();

// Contact Form - Send to backend API
const form = document.getElementById("contactForm");
const responseMsg = document.getElementById("form-response");

form.addEventListener("submit", async function (e) {
    e.preventDefault();
    const formData = {
        name: form.name.value,
        email: form.email.value,
        message: form.message.value
    };
    try {
        const res = await fetch("http://localhost:3000/api/contact", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData)
        });
        const data = await res.json();
        if (res.ok) {
            responseMsg.textContent = "✅ Message sent successfully!";
            responseMsg.style.color = "green";
            form.reset();
        } else {
            responseMsg.textContent = "❌ " + data.error;
            responseMsg.style.color = "red";
        }
    } catch (err) {
        responseMsg.textContent = "❌ Network error!";
        responseMsg.style.color = "red";
    }
});
