/* =============================================
   SEISUVAI CATERING — Main JavaScript
   ============================================= */
document.addEventListener('DOMContentLoaded', () => {

    // --- Mobile Nav ---
    const menuOpen   = document.getElementById('menuOpen');
    const menuClose  = document.getElementById('menuClose');
    const mobileSidebar = document.getElementById('mobileSidebar');
    const navOverlay = document.getElementById('navOverlay');
    const sidebarLinks = document.querySelectorAll('.sidebar-links a');

    const openMenu  = () => { mobileSidebar.classList.add('active'); navOverlay.classList.add('active'); document.body.style.overflow = 'hidden'; };
    const closeMenu = () => { mobileSidebar.classList.remove('active'); navOverlay.classList.remove('active'); document.body.style.overflow = ''; };

    if (menuOpen)   menuOpen.addEventListener('click', openMenu);
    if (menuClose)  menuClose.addEventListener('click', closeMenu);
    if (navOverlay) navOverlay.addEventListener('click', closeMenu);
    sidebarLinks.forEach(l => l.addEventListener('click', closeMenu));

    // --- Header Scroll Effect ---
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        header.classList.toggle('scrolled', window.scrollY > 60);
    }, { passive: true });

    // --- Reveal Animations ---
    const revealEls = document.querySelectorAll('[data-reveal]');
    const revealObs = new IntersectionObserver((entries) => {
        entries.forEach(e => {
            if (e.isIntersecting) { e.target.classList.add('active'); revealObs.unobserve(e.target); }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(el => revealObs.observe(el));

    // --- Smooth Scrolling ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const offset = target.getBoundingClientRect().top + window.pageYOffset - 88;
                window.scrollTo({ top: offset, behavior: 'smooth' });
            }
        });
    });

    // --- FAQ Accordion ---
    document.querySelectorAll('.faq-question').forEach(btn => {
        btn.addEventListener('click', () => {
            const item = btn.closest('.faq-item');
            const isOpen = item.classList.contains('open');
            document.querySelectorAll('.faq-item.open').forEach(i => i.classList.remove('open'));
            if (!isOpen) item.classList.add('open');
            btn.setAttribute('aria-expanded', !isOpen);
        });
    });

    // --- API Base ---
    const API_BASE_URL = (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')
        ? window.location.origin
        : 'https://seisuvai-api.onrender.com';

    // --- Success Modal ---
    const successModal = document.getElementById('successModal');
    const modalCloseBtn = document.getElementById('modalCloseBtn');
    const showModal = () => { if (successModal) successModal.classList.add('active'); };
    const hideModal = () => { if (successModal) successModal.classList.remove('active'); };
    if (modalCloseBtn) modalCloseBtn.addEventListener('click', hideModal);
    if (successModal)  successModal.addEventListener('click', (e) => { if (e.target === successModal) hideModal(); });

    // --- Build WhatsApp Message ---
    const buildWhatsAppMsg = (data) => {
        return `Hello Seisuvai Catering! I have a catering inquiry:\n- Name: ${data.name}\n- Phone: ${data.phone}\n- Event: ${data.eventType || data.avail_event || 'N/A'}\n- Guests: ${data.guests || data.avail_guests || 'N/A'}\n- Date: ${data.eventDate || data.avail_date || 'N/A'}\n- Budget: ${data.budget || data.avail_budget || 'N/A'}\n${data.message ? `- Details: ${data.message}` : ''}`;
    };

    // --- Main Booking Form ---
    const bookingForm = document.getElementById('bookingForm');
    if (bookingForm) {
        bookingForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const btn = bookingForm.querySelector('button[type="submit"]');
            const original = btn.innerHTML;
            btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            btn.disabled = true;

            const raw = Object.fromEntries(new FormData(bookingForm));
            const payload = {
                name: raw.name, phone: raw.phone, email: raw.email,
                enquiryType: 'booking', paxCount: raw.guests,
                message: `Event: ${raw.eventType}, Date: ${raw.eventDate}, Budget: ${raw.budget}. ${raw.message || ''}`
            };

            try {
                const res = await fetch(`${API_BASE_URL}/api/enquiries`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                });
                if (!res.ok) throw new Error(`Server ${res.status}`);
                const result = await res.json();
                if (result.success) {
                    bookingForm.reset();
                    showModal();
                    setTimeout(() => {
                        const waLink = `https://wa.me/919788313225?text=${encodeURIComponent(buildWhatsAppMsg(raw))}`;
                        window.open(waLink, '_blank');
                    }, 1500);
                } else throw new Error(result.message || 'Failed');
            } catch (err) {
                console.warn('API unavailable, falling back to WhatsApp:', err);
                // Fallback: open WhatsApp directly if API is down
                const waLink = `https://wa.me/919788313225?text=${encodeURIComponent(buildWhatsAppMsg(raw))}`;
                window.open(waLink, '_blank');
                showModal();
                bookingForm.reset();
            } finally {
                btn.innerHTML = original;
                btn.disabled = false;
            }
        });
    }

    // --- Availability Form ---
    const availabilityForm = document.getElementById('availabilityForm');
    if (availabilityForm) {
        availabilityForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const btn = availabilityForm.querySelector('button[type="submit"]');
            const original = btn.innerHTML;
            btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Checking...';
            btn.disabled = true;

            const raw = Object.fromEntries(new FormData(availabilityForm));
            const payload = {
                name: raw['avail-name'], phone: raw['avail-phone'],
                enquiryType: 'availability',
                message: `Availability check — Event: ${raw['avail-event']}, Date: ${raw['avail-date']}, Guests: ${raw['avail-guests']}, Budget: ${raw['avail-budget']}`
            };

            try {
                const res = await fetch(`${API_BASE_URL}/api/enquiries`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                });
                if (!res.ok) throw new Error(`Server ${res.status}`);
                const result = await res.json();
                if (result.success || true) {
                    availabilityForm.reset();
                    showModal();
                    const mappedData = {
                        name: raw['avail-name'], phone: raw['avail-phone'],
                        avail_event: raw['avail-event'], avail_date: raw['avail-date'],
                        avail_guests: raw['avail-guests'], avail_budget: raw['avail-budget']
                    };
                    setTimeout(() => {
                        const waLink = `https://wa.me/919788313225?text=${encodeURIComponent(buildWhatsAppMsg(mappedData))}`;
                        window.open(waLink, '_blank');
                    }, 1500);
                }
            } catch (err) {
                console.warn('API unavailable:', err);
                const mappedData = {
                    name: raw['avail-name'], phone: raw['avail-phone'],
                    avail_event: raw['avail-event'], avail_date: raw['avail-date'],
                    avail_guests: raw['avail-guests'], avail_budget: raw['avail-budget']
                };
                const waLink = `https://wa.me/919788313225?text=${encodeURIComponent(buildWhatsAppMsg(mappedData))}`;
                window.open(waLink, '_blank');
                showModal();
                availabilityForm.reset();
            } finally {
                btn.innerHTML = original;
                btn.disabled = false;
            }
        });
    }

    // --- Active Nav Highlighting ---
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.desktop-nav a[href^="#"]');
    const highlightNav = () => {
        let current = '';
        sections.forEach(sec => {
            if (window.scrollY >= sec.offsetTop - 130) current = sec.getAttribute('id');
        });
        navLinks.forEach(a => {
            a.classList.toggle('active', a.getAttribute('href') === `#${current}`);
        });
    };
    window.addEventListener('scroll', highlightNav, { passive: true });
    highlightNav();

    // --- Set minimum event date (today) ---
    const dateInputs = document.querySelectorAll('input[type="date"]');
    const today = new Date().toISOString().split('T')[0];
    dateInputs.forEach(d => { d.min = today; });

});
