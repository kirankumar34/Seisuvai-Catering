/* =============================================
   SEISUVAI CATERING — Enhancements JS
   Lazy loading, counters, micro-interactions
   ============================================= */
document.addEventListener('DOMContentLoaded', () => {

    // --- Lazy Load Images ---
    if ('IntersectionObserver' in window) {
        const lazyImgs = document.querySelectorAll('img[loading="lazy"]');
        const imgObserver = new IntersectionObserver((entries) => {
            entries.forEach(e => {
                if (e.isIntersecting) {
                    const img = e.target;
                    if (img.dataset.src) { img.src = img.dataset.src; }
                    img.classList.add('loaded');
                    imgObserver.unobserve(img);
                }
            });
        }, { rootMargin: '200px' });
        lazyImgs.forEach(img => imgObserver.observe(img));
    }

    // --- Animated Counter (for stats sections) ---
    const animateNumber = (el, target, suffix = '') => {
        let start = 0;
        const duration = 1800;
        const step = (timestamp) => {
            if (!start) start = timestamp;
            const progress = Math.min((timestamp - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            el.textContent = Math.floor(eased * target) + suffix;
            if (progress < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
    };

    // --- Hero stat counters ---
    const heroStats = document.querySelectorAll('.hero-stat strong');
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                const el = e.target;
                const text = el.textContent;
                const num = parseInt(text.replace(/[^\d]/g, ''));
                const suffix = text.includes('+') ? '+' : (text.includes('%') ? '%' : '');
                if (text.includes('₹')) {
                    // for pricing like ₹250, skip animate
                } else if (!isNaN(num)) {
                    animateNumber(el, num, suffix);
                }
                statsObserver.unobserve(el);
            }
        });
    }, { threshold: 0.5 });
    heroStats.forEach(el => statsObserver.observe(el));

    // --- Pulse animation on floating buttons ---
    const addPulse = (el) => {
        el.classList.add('pulse');
        setTimeout(() => el.classList.remove('pulse'), 600);
    };
    const waFloat = document.getElementById('whatsapp-float-btn');
    const callFloat = document.getElementById('call-float-btn');
    if (waFloat) {
        setInterval(() => addPulse(waFloat), 5000);
    }

    // --- Gallery lightbox effect (simple zoom) ---
    document.querySelectorAll('.gallery-item').forEach(item => {
        item.addEventListener('click', () => {
            const img = item.querySelector('img');
            if (!img) return;
            const overlay = document.createElement('div');
            overlay.style.cssText = `
                position:fixed;inset:0;background:rgba(0,0,0,0.92);
                z-index:9999;display:flex;align-items:center;justify-content:center;
                cursor:zoom-out;padding:1rem;
            `;
            const image = document.createElement('img');
            image.src = img.src;
            image.alt = img.alt;
            image.style.cssText = 'max-width:90vw;max-height:90vh;border-radius:12px;object-fit:contain;';
            overlay.appendChild(image);
            overlay.addEventListener('click', () => overlay.remove());
            document.body.appendChild(overlay);
        });
    });

    // --- Pricing card hover glow ---
    document.querySelectorAll('.pricing-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;
            card.style.background = card.classList.contains('pricing-card-featured')
                ? `radial-gradient(circle at ${x}% ${y}%, rgba(197,160,40,0.15), transparent 50%), linear-gradient(160deg, var(--maroon), var(--maroon-dark))`
                : `radial-gradient(circle at ${x}% ${y}%, rgba(197,160,40,0.05), transparent 60%), #fff`;
        });
        card.addEventListener('mouseleave', () => {
            card.style.background = '';
        });
    });

    // --- Scroll-to-top shown after scrolling ---
    const scrollThreshold = 400;
    let scrollTopBtn = null;
    window.addEventListener('scroll', () => {
        if (window.scrollY > scrollThreshold && !scrollTopBtn) {
            scrollTopBtn = document.createElement('button');
            scrollTopBtn.innerHTML = '<i class="fas fa-chevron-up"></i>';
            scrollTopBtn.id = 'scrollTopBtn';
            scrollTopBtn.setAttribute('aria-label', 'Scroll to top');
            scrollTopBtn.style.cssText = `
                position:fixed;bottom:1.5rem;left:1.5rem;
                width:44px;height:44px;border-radius:50%;border:none;
                background:rgba(62,6,14,0.85);color:var(--primary, #C5A028);
                font-size:1rem;cursor:pointer;z-index:900;
                box-shadow:0 4px 15px rgba(0,0,0,0.25);
                display:flex;align-items:center;justify-content:center;
                transition:opacity 0.3s;backdrop-filter:blur(8px);
            `;
            scrollTopBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
            document.body.appendChild(scrollTopBtn);
        } else if (window.scrollY <= scrollThreshold && scrollTopBtn) {
            scrollTopBtn.remove();
            scrollTopBtn = null;
        }
    }, { passive: true });

    // --- Add CSS pulse keyframe dynamically ---
    const pulseStyle = document.createElement('style');
    pulseStyle.textContent = `
        @keyframes pulse-ring {
            0% { box-shadow: 0 0 0 0 rgba(37,211,102,0.5); }
            70% { box-shadow: 0 0 0 14px rgba(37,211,102,0); }
            100% { box-shadow: 0 0 0 0 rgba(37,211,102,0); }
        }
        .pulse { animation: pulse-ring 0.6s ease-out; }
        img { transition: opacity 0.4s ease; }
        img.loaded { opacity: 1; }
    `;
    document.head.appendChild(pulseStyle);

});
