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

    // --- Form Handling (Simplified for Redesign) ---
    const bookingForm = document.getElementById('bookingForm');
    if (bookingForm) {
        bookingForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = new FormData(bookingForm);
            const data = Object.fromEntries(formData);

            // Format WhatsApp Message
            const message = `Hello Seisuvai Catering! I'd like to inquire about:
- Name: ${data.name}
- Event: ${data.eventType}
- Guests: ${data.guests}
- Date: ${data.eventDate}
- Details: ${data.message}`;

            const waLink = `https://wa.me/919788313225?text=${encodeURIComponent(message)}`;
            window.open(waLink, '_blank');

            alert('Enquiry sent! Opening WhatsApp for quick chat.');
            bookingForm.reset();
        });
    }
});
