// =============================================
//  GATEMASTER — script.js
//  gatemaster.lawrencepatel.me
// =============================================

/* ---------- LOADER ---------- */
window.addEventListener('load', () => {
    const loader = document.getElementById('gm-loader');
    setTimeout(() => {
        loader.style.opacity = '0';
        loader.style.pointerEvents = 'none';
        setTimeout(() => loader.style.display = 'none', 600);
    }, 1800);
});

/* ---------- NAVBAR SCROLL ---------- */
const nav = document.getElementById('gm-nav');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});

/* ---------- SCROLL REVEAL (Feature Cards) ---------- */
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add('visible');
                entry.target.style.transition = `opacity 0.55s ease, transform 0.55s ease`;
            }, i * 100);
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.gm-feature-card').forEach(card => {
    revealObserver.observe(card);
});

/* ---------- STAT COUNTER ANIMATION ---------- */
const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            statObserver.disconnect();
        }
    });
}, { threshold: 0.3 });

const statsSection = document.getElementById('gm-stats');
if (statsSection) statObserver.observe(statsSection);

function animateCounters() {
    document.querySelectorAll('[data-count]').forEach(el => {
        const target = parseInt(el.dataset.count);
        const suffix = el.dataset.suffix || '';
        const duration = 1600;
        const step = target / (duration / 16);
        let current = 0;

        const update = () => {
            current = Math.min(current + step, target);
            el.textContent = Math.floor(current) + suffix;
            if (current < target) requestAnimationFrame(update);
        };
        requestAnimationFrame(update);
    });
}
