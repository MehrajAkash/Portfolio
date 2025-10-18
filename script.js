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

// live clock end


// Skill section
const xValues = ["C++", "Python", "JavaScript", "Java", "SQL", "API"];
const yValues = [95, 50, 80, 60, 90, 30];
const barColors = ["red", "yellow", "blue", "blueviolet", "aqua", "teal"];

const ctx = document.getElementById('myChart');

new Chart(ctx, {
    type: "bar",
    data: {
        labels: xValues,
        datasets: [{
            backgroundColor: barColors,
            data: yValues
        }]
    },
    options: {
        plugins: {
            legend: { display: false },
            title: {
                display: true,
                text: "Skill in percentage",
                font: { size: 16 }
            }
        }
    }
});
// skill section end


// ===== Array-Based Image Slider =====
const certificates = [
    { img: "./images/Nasa Space apps.jpg", caption: "NASA Space Apps Challenge 2024" },
    { img: "./images/problemsolvingbasic.jpg", caption: "Problem Solving (Basic) - HackerRank" },
    { img: "./images/flutter.jpg", caption: "Flutter Development - Google" },
    { img: "./images/sqlbasic.jpg", caption: "SQL (Basic) - HackerRank" }
];

let index = 0;
const imgElement = document.getElementById("certificateImg");
const captionElement = document.getElementById("caption");

function showCertificate(i) {
    if (i < 0) index = certificates.length - 1;
    else if (i >= certificates.length) index = 0;
    else index = i;

    // Smooth fade effect
    imgElement.classList.add("fade-out");
    setTimeout(() => {
        imgElement.src = certificates[index].img;
        captionElement.textContent = certificates[index].caption;
        imgElement.classList.remove("fade-out");
        imgElement.classList.add("fade-in");
    }, 400);
}

// Manual navigation
function prev() { showCertificate(index - 1); }
function next() { showCertificate(index + 1); }

// Auto-slide every 3 seconds
setInterval(() => {
    next();
}, 2500);

showCertificate(index);

// image slider end



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

/// contact form end
