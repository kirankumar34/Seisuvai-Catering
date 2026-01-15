document.addEventListener('DOMContentLoaded', () => {
    // --- Navigation Elements ---
    const menuOpen = document.getElementById('menuOpen');
    const menuClose = document.getElementById('menuClose');
    const mobileSidebar = document.getElementById('mobileSidebar');
    const navOverlay = document.getElementById('navOverlay');
    const sidebarLinks = document.querySelectorAll('.sidebar-links a');

    // --- Mobile Menu Functions ---
    const openMenu = () => {
        mobileSidebar.classList.add('active');
        navOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    };

    const closeMenu = () => {
        mobileSidebar.classList.remove('active');
        navOverlay.classList.remove('active');
        document.body.style.overflow = '';
    };

    if (menuOpen) menuOpen.addEventListener('click', openMenu);
    if (menuClose) menuClose.addEventListener('click', closeMenu);
    if (navOverlay) navOverlay.addEventListener('click', closeMenu);

    sidebarLinks.forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    // --- Header Scroll Effect ---
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.padding = '0.5rem 0';
            header.style.backgroundColor = 'rgba(62, 6, 14, 0.95)';
            header.style.backdropFilter = 'blur(10px)';
        } else {
            header.style.padding = '0';
            header.style.backgroundColor = 'var(--maroon-dark)';
            header.style.backdropFilter = 'none';
        }
    });

    // --- Intersection Observer for Reveal Animations ---
    const revealElements = document.querySelectorAll('[data-reveal]');
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    revealElements.forEach(el => observer.observe(el));

    // --- Smooth Scrolling for Anchor Links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;

            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- API Configuration ---
    const API_BASE_URL = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
        ? window.location.origin
        : 'https://seisuvai-api.onrender.com';

    // --- Form Handling ---
    const bookingForm = document.getElementById('bookingForm');
    if (bookingForm) {
        bookingForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const submitBtn = bookingForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.innerText;

            submitBtn.innerText = 'Sending...';
            submitBtn.disabled = true;

            const formData = new FormData(bookingForm);
            const rawData = Object.fromEntries(formData);

            // Map to Enquiry Model
            const data = {
                name: rawData.name,
                phone: rawData.phone,
                email: rawData.email,
                enquiryType: 'booking',
                paxCount: rawData.guests,
                message: `Event: ${rawData.eventType}, Date: ${rawData.eventDate}. ${rawData.message}`
            };

            try {
                // 1. Send to Backend API
                const response = await fetch(`${API_BASE_URL}/api/enquiries`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data)
                });

                const result = await response.json();

                if (result.success) {
                    // 2. Open WhatsApp for quick chat
                    const whatsappMsg = `Hello Seisuvai Catering! I've just submitted a booking inquiry:
- Name: ${data.name}
- Event: ${rawData.eventType}
- Guests: ${data.paxCount}
- Date: ${rawData.eventDate}
- Details: ${rawData.message}`;

                    const waLink = `https://wa.me/919788313225?text=${encodeURIComponent(whatsappMsg)}`;
                    window.open(waLink, '_blank');

                    alert('Enquiry sent successfully! Our team will contact you soon.');
                    bookingForm.reset();
                } else {
                    alert('Submission failed: ' + (result.message || 'Unknown error'));
                }
            } catch (err) {
                console.error('Submission Error:', err);
                alert('Connection error. Please try again later.');
            } finally {
                submitBtn.innerText = originalBtnText;
                submitBtn.disabled = false;
            }
        });
    }
});
