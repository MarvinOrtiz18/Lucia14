/* ============ GLOBOS FLOTANTES ============ */
const balloonColors = ['#FFD60A', '#0046AD', '#1E88E5', '#FFE94A', '#ffffff'];
const balloonsContainer = document.getElementById('balloons-container');

function crearGlobo() {
    const balloon = document.createElement('div');
    balloon.classList.add('balloon');

    const color = balloonColors[Math.floor(Math.random() * balloonColors.length)];
    balloon.style.background = `radial-gradient(circle at 30% 30%, ${color}, ${color}dd)`;

    const size = 40 + Math.random() * 30;
    balloon.style.width = size + 'px';
    balloon.style.height = (size * 1.3) + 'px';

    balloon.style.left = Math.random() * 100 + 'vw';

    const duration = 8 + Math.random() * 7;
    balloon.style.animationDuration = duration + 's';

    const drift = (Math.random() - 0.5) * 200;
    balloon.style.setProperty('--drift', drift + 'px');

    balloonsContainer.appendChild(balloon);

    setTimeout(() => balloon.remove(), duration * 1000);
}

// Generar globos periódicamente
setInterval(crearGlobo, 800);
// Globos iniciales
for (let i = 0; i < 8; i++) {
    setTimeout(crearGlobo, i * 300);
}

/* ============ CONFETTI ============ */
const canvas = document.getElementById('confetti-canvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

const confettiPieces = [];
const confettiColors = ['#FFD60A', '#0046AD', '#1E88E5', '#FFE94A', '#ffffff'];

class Confetti {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height - canvas.height;
        this.size = Math.random() * 8 + 4;
        this.speedY = Math.random() * 3 + 2;
        this.speedX = (Math.random() - 0.5) * 2;
        this.color = confettiColors[Math.floor(Math.random() * confettiColors.length)];
        this.rotation = Math.random() * 360;
        this.rotationSpeed = (Math.random() - 0.5) * 10;
    }

    update() {
        this.y += this.speedY;
        this.x += this.speedX;
        this.rotation += this.rotationSpeed;

        if (this.y > canvas.height) {
            this.y = -20;
            this.x = Math.random() * canvas.width;
        }
    }

    draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate((this.rotation * Math.PI) / 180);
        ctx.fillStyle = this.color;
        ctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size / 2);
        ctx.restore();
    }
}

// Crear confetti inicial
for (let i = 0; i < 80; i++) {
    confettiPieces.push(new Confetti());
}

function animateConfetti() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    confettiPieces.forEach(c => {
        c.update();
        c.draw();
    });
    requestAnimationFrame(animateConfetti);
}
animateConfetti();

// Ráfaga extra de confetti al hacer click en el título
document.querySelector('.hero-title').addEventListener('click', () => {
    for (let i = 0; i < 50; i++) {
        confettiPieces.push(new Confetti());
    }
    // Limpiar confetti extra después de un rato
    setTimeout(() => {
        confettiPieces.splice(80);
    }, 5000);
});

/* ============ CARRUSEL ============ */
const track = document.getElementById('carruselTrack');
const slides = track.querySelectorAll('.slide');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const dotsContainer = document.getElementById('carruselDots');
let currentIndex = 0;
let autoPlayInterval;

// Crear dots
slides.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.classList.add('dot');
    if (i === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goToSlide(i));
    dotsContainer.appendChild(dot);
});

const dots = dotsContainer.querySelectorAll('.dot');

function updateCarousel() {
    track.style.transform = `translateX(-${currentIndex * 100}%)`;
    dots.forEach((d, i) => d.classList.toggle('active', i === currentIndex));
}

function goToSlide(index) {
    currentIndex = index;
    updateCarousel();
    resetAutoPlay();
}

function nextSlide() {
    currentIndex = (currentIndex + 1) % slides.length;
    updateCarousel();
}

function prevSlide() {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    updateCarousel();
}

nextBtn.addEventListener('click', () => {
    nextSlide();
    resetAutoPlay();
});

prevBtn.addEventListener('click', () => {
    prevSlide();
    resetAutoPlay();
});

// Autoplay
function startAutoPlay() {
    autoPlayInterval = setInterval(nextSlide, 5000);
}

function resetAutoPlay() {
    clearInterval(autoPlayInterval);
    startAutoPlay();
}

startAutoPlay();

// Soporte táctil (swipe) para móviles
let touchStartX = 0;
let touchEndX = 0;

track.addEventListener('touchstart', e => {
    touchStartX = e.changedTouches[0].screenX;
}, { passive: true });

track.addEventListener('touchend', e => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
}, { passive: true });

function handleSwipe() {
    const diff = touchStartX - touchEndX;
    if (Math.abs(diff) > 50) {
        if (diff > 0) {
            nextSlide();
        } else {
            prevSlide();
        }
        resetAutoPlay();
    }
}

// Teclas de flecha
document.addEventListener('keydown', e => {
    if (e.key === 'ArrowRight') { nextSlide(); resetAutoPlay(); }
    if (e.key === 'ArrowLeft') { prevSlide(); resetAutoPlay(); }
});

/* ============ ANIMACIÓN AL HACER SCROLL ============ */
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.mensaje-card, .deseo-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    observer.observe(el);
});

console.log('🏍️ ¡Feliz cumpleaños! Sitio cargado correctamente.');