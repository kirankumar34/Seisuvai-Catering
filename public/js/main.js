document.addEventListener('DOMContentLoaded', () => {
    const header = document.getElementById('header');
    const revealElements = document.querySelectorAll('[data-reveal]');

    // Header scroll background effect
    const handleScroll = () => {
        if (!header) return;
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check on load

    // Mobile Menu Toggle
    const mobileBtn = document.getElementById('mobileMenuBtn');
    const navMenu = document.getElementById('navMenu');

    if (mobileBtn && navMenu) {
        mobileBtn.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            mobileBtn.classList.toggle('active');
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navMenu.contains(e.target) && !mobileBtn.contains(e.target) && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                mobileBtn.classList.remove('active');
            }
        });

        // Close menu when clicking a link
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                mobileBtn.classList.remove('active');
            });
        });
    }

    // Intersection Observer for scroll-reveal animations
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Once it's revealed, we don't need to observe it anymore
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    revealElements.forEach(el => {
        observer.observe(el);
    });

    // Make observer available for dynamically added elements
    window.revealObserver = observer;

    // --- Dynamic Featured Menus for Home Page ---
    const featuredMenusContainer = document.getElementById('featuredMenus');
    if (featuredMenusContainer && typeof highlightedMenus !== 'undefined') {
        featuredMenusContainer.innerHTML = highlightedMenus.map(menu => {
            const packageId = packageMap[menu.menuId] || '';
            const menuHash = menu.menuId.replace(/\s+/g, '-').toLowerCase();

            return `
                <div class="menu-card" data-reveal>
                    <div class="menu-card-img">
                        <img src="images/${menu.menuId.toLowerCase().includes('tiffin') ? 'menu-1-south-indian.png' :
                    menu.menuId.toLowerCase().includes('lunch') ? 'menu-2.png' : 'dinner-5.png'}"
                             alt="${menu.title}">
                        <div class="card-label ${menu.tag.includes('Chosen') || menu.tag.includes('Premium') ? 'featured' : ''}">${menu.tag}</div>
                    </div>
                    <div class="menu-content">
                        <h3>${menu.title}</h3>
                        <p style="margin-bottom: 1rem; color: var(--text-gray);">${menu.description}</p>
                        <p class="package-price">Starting from ₹${menu.startingPrice} / pax</p>
                        <div class="menu-footer">
                            <button class="btn btn-outline view-menu-btn" data-menu-id="${menu.menuId}">View Menu</button>
                            <a href="#contact" class="btn btn-primary" onclick="window.setPackage('${packageId}')">Get Quote</a>
                        </div>
                    </div>
                </div>
            `;
        }).join('');

        // Re-observe for animation since we replaced innerHTML
        if (window.revealObserver) {
            featuredMenusContainer.querySelectorAll('[data-reveal]').forEach(el => {
                window.revealObserver.observe(el);
            });
        }
    }

    // --- Glassmorphic Modal Logic ---
    const injectModal = () => {
        if (document.getElementById('glassMenuModal')) return;

        const modalHtml = `
            <div class="glass-modal-overlay" id="glassMenuModal">
                <div class="glass-modal-container">
                    <div class="modal-close-btn" id="closeGlassModal">
                        <i class="fas fa-times"></i>
                    </div>

                    <div class="glass-modal-header">
                        <h2 id="glassModalTitle">Premium Catering Menu</h2>
                        <p id="glassModalSubtitle">Carefully curated for memorable occasions</p>
                    </div>

                    <div class="modal-hero-showcase">
                        <img id="glassModalHero" src="images/menu-1-south-indian.png" alt="Featured Menu">
                    </div>

                    <div class="glass-menu-panel" id="glassModalBody">
                        <!-- Dynamic sections will be injected here -->
                    </div>

                    <div class="glass-modal-footer">
                        <div class="modal-price-display" id="glassModalPrice">₹000 – ₹000 per plate</div>
                        <p class="modal-price-note">Final price depends on menu customization & pax count</p>
                        <div class="modal-actions">
                            <a href="#contact" class="btn-glass-primary" id="modalReserveBtn">Check Availability</a>
                            <a href="#" target="_blank" class="btn-glass-outline" id="modalWhatsappBtn" style="display: flex; align-items: center; justify-content: center; gap: 8px; text-decoration: none;">
                                <i class="fab fa-whatsapp"></i> WhatsApp Enquiry
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', modalHtml);

        const modal = document.getElementById('glassMenuModal');
        const closeBtn = document.getElementById('closeGlassModal');

        closeBtn.onclick = () => window.closeGlassModal();
        modal.onclick = (e) => {
            if (e.target === modal) window.closeGlassModal();
        };
    };

    window.openMenuModal = (menuId) => {
        injectModal();
        const menuData = cateringMenus[menuId];
        if (!menuData) return;

        const modal = document.getElementById('glassMenuModal');
        const titleEl = document.getElementById('glassModalTitle');
        const subtitleEl = document.getElementById('glassModalSubtitle');
        const bodyEl = document.getElementById('glassModalBody');
        const priceEl = document.getElementById('glassModalPrice');
        const heroEl = document.getElementById('glassModalHero');

        titleEl.innerText = menuData.mainTitle;
        subtitleEl.innerText = menuData.subtitle;
        priceEl.innerText = `${menuData.price} per plate`;

        // Set hero image from data or fallback
        if (menuData.image) {
            heroEl.src = menuData.image;
        } else {
            // Fallback logic if image not present (legacy support)
            let heroImg = 'menu-1-south-indian.png';
            if (menuId.toLowerCase().includes('lunch')) heroImg = 'menu-2.png';
            if (menuId.toLowerCase().includes('dinner')) heroImg = 'dinner-5.png';
            heroEl.src = `images/${heroImg}`;
        }

        // Populate sections
        bodyEl.innerHTML = menuData.sections.map(section => `
            <div class="glass-menu-section">
                <h4>${section.title}</h4>
                <div class="glass-menu-items">
                    ${section.items.map(item => `<div class="glass-menu-item">${item}</div>`).join('')}
                </div>
            </div>
        `).join('');

        // Update WhatsApp link
        const whatsappBtn = document.getElementById('modalWhatsappBtn');
        if (whatsappBtn) {
            const encodeMenu = encodeURIComponent(menuData.mainTitle);
            whatsappBtn.href = `https://wa.me/919788313225?text=I'm interested in the ${encodeMenu} package.`;
        }

        const reserveBtn = document.getElementById('modalReserveBtn');
        if (reserveBtn) {
            reserveBtn.onclick = (e) => {
                const path = window.location.pathname;
                const isHomePage = path === '/' || path.endsWith('index.html') || path === '' || !path.includes('.html');

                if (isHomePage) {
                    e.preventDefault();
                    window.closeGlassModal();
                    if (typeof window.setPackage === 'function') {
                        window.setPackage(packageMap[menuId]);
                    }

                    const contactSection = document.getElementById('contact');
                    if (contactSection) {
                        window.scrollTo({
                            top: contactSection.offsetTop - 80,
                            behavior: 'smooth'
                        });
                    }
                } else {
                    // If on menu page, navigate to index #contact
                    sessionStorage.setItem('selectedPackage', menuId);
                    window.location.href = 'index.html#contact';
                }
            };
        }

        modal.style.display = 'flex';
        // Force reflow
        modal.offsetHeight;
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';

        // Blur background content
        const mainContent = document.querySelectorAll('header, main, section, footer');
        mainContent.forEach(el => {
            if (el.id !== 'glassMenuModal') el.style.filter = 'blur(5px)';
        });
    };

    window.closeGlassModal = () => {
        const modal = document.getElementById('glassMenuModal');
        if (!modal) return;

        modal.classList.remove('active');
        setTimeout(() => {
            modal.style.display = 'none';
            document.body.style.overflow = '';

            // Remove blur
            const mainContent = document.querySelectorAll('header, main, section, footer');
            mainContent.forEach(el => el.style.filter = '');
        }, 400);
    };

    // Attach listener to all "View Sample Menu" buttons (including home page)
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('view-menu-btn')) {
            const menuId = e.target.getAttribute('data-menu-id');
            if (menuId) window.openMenuModal(menuId);
        }
    });

    // Special trigger for index.html featured buttons
    const bindSampleButtons = () => {
        document.querySelectorAll('.view-menu-btn').forEach(btn => {
            btn.onclick = (e) => {
                e.preventDefault();
                const menuId = btn.getAttribute('data-menu-id');
                window.openMenuModal(menuId);
            };
        });
    };
    bindSampleButtons();

    // Smooth scroll for navigation links with offset for sticky header
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });


    // Booking form submission with validation
    const bookingForm = document.getElementById('bookingForm');
    const formStatus = document.getElementById('formStatus');

    if (bookingForm) {
        const showError = (id, msg) => {
            const errorElement = document.getElementById(id);
            if (errorElement) {
                errorElement.innerText = msg;
                errorElement.classList.add('show');
            }
        };

        const clearErrors = () => {
            document.querySelectorAll('.error-msg').forEach(el => {
                el.classList.remove('show');
                el.innerText = '';
            });
            formStatus.className = 'form-status';
            formStatus.innerText = '';
        };

        const validateEmail = (email) => {
            return String(email)
                .toLowerCase()
                .match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
        };

        const validatePhone = (phone) => {
            return String(phone).match(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/);
        };

        bookingForm.addEventListener('submit', (e) => {
            e.preventDefault();
            clearErrors();

            const formData = new FormData(bookingForm);
            const data = Object.fromEntries(formData.entries());
            let isValid = true;

            // Name validation
            if (data.name.trim().length < 2) {
                showError('nameError', 'Please enter your full name');
                isValid = false;
            }

            // Phone validation
            if (!validatePhone(data.phone)) {
                showError('phoneError', 'Please enter a valid phone number');
                isValid = false;
            }

            // Email validation
            if (!validateEmail(data.email)) {
                showError('emailError', 'Please enter a valid email address');
                isValid = false;
            }

            // Date validation
            if (!data.eventDate) {
                showError('dateError', 'Please select an event date');
                isValid = false;
            } else {
                const selectedDate = new Date(data.eventDate);
                const today = new Date();
                today.setHours(0, 0, 0, 0);
                if (selectedDate < today) {
                    showError('dateError', 'Date cannot be in the past');
                    isValid = false;
                }
            }

            // Guests validation
            if (!data.guests || data.guests <= 0) {
                showError('guestsError', 'Please enter a valid number of guests');
                isValid = false;
            }

            // Venue validation
            if (data.venue.trim().length < 3) {
                showError('venueError', 'Please enter a valid venue or address');
                isValid = false;
            }

            // Message validation
            if (data.message.trim().length < 5) {
                showError('messageError', 'Please provide a bit more detail');
                isValid = false;
            }

            if (!isValid) return;

            const submitBtn = document.getElementById('submitBtn');
            const originalText = submitBtn.innerText;
            submitBtn.innerText = 'Redirecting...';
            submitBtn.disabled = true;

            // Get Package Name properly
            let packageName = "No Package Selected";
            const packageSelect = document.getElementById('package');
            if (packageSelect && packageSelect.value !== 'none') {
                packageName = packageSelect.options[packageSelect.selectedIndex].text.split('(')[0].trim();
            }

            // 1. WhatsApp Integration
            const message = `*New Catering Inquiry*
            
Name: ${data.name}
Phone: ${data.phone}
Email: ${data.email}
Date: ${data.eventDate}
Guests: ${data.guests}
Venue: ${data.venue}
Package: ${packageName}

*Message:*
${data.message}`;

            const whatsappUrl = `https://wa.me/919788313225?text=${encodeURIComponent(message)}`;

            // 2. Email Integration (using EmailJS)
            // Note: In a real scenario, you need to configure EmailJS
            const emailTemplateParams = {
                to_name: "Seisuvai Catering",
                from_name: data.name,
                from_email: data.email,
                phone: data.phone,
                event_date: data.eventDate,
                guests: data.guests,
                venue: data.venue,
                package: packageName,
                message: data.message
            };

            // Assuming EmailJS is configured (If keys were provided). 
            /*
            if (typeof emailjs !== 'undefined') {
                emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', emailTemplateParams)
                    .then(function(response) {
                       console.log('SUCCESS!', response.status, response.text);
                    }, function(error) {
                       console.log('FAILED...', error);
                    });
            }
            */

            // Open WhatsApp
            window.open(whatsappUrl, '_blank');

            // Success UI
            formStatus.innerText = 'Thank you! We have opened WhatsApp to send your inquiry.';
            formStatus.classList.add('success');
            bookingForm.reset();

            submitBtn.innerText = originalText;
            submitBtn.disabled = false;

            // Clear message after 5 seconds
            setTimeout(() => {
                formStatus.className = 'form-status';
                formStatus.innerText = '';
            }, 5000);
        });
    }

    // Refresh reveal animations on window resize (optional but helpful)
    window.addEventListener('resize', () => {
        // Any resize specific logic if needed
    });

    // Live Quotation Logic
    const guestsInput = document.getElementById('guests');
    const packageSelect = document.getElementById('package');
    const quotationBox = document.getElementById('quotationBox');
    const quoteRange = document.getElementById('quoteRange');

    // Global utility to set package from any page/element
    window.setPackage = (packageId) => {
        if (!packageSelect) return;

        packageSelect.value = packageId;

        // Trigger the live calculation
        if (typeof updateQuotation === 'function') {
            updateQuotation();
        }

        // Smooth scroll to booking form if we're on the same page
        const contactSection = document.getElementById('contact');
        if (contactSection) {
            window.scrollTo({
                top: contactSection.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    };

    // Check for session-based package selection (from menu.html)
    const selectedPackageName = sessionStorage.getItem('selectedPackage');
    if (selectedPackageName && packageSelect) {
        // Find the package ID from packageMap (available globally via menu-data.js)
        if (typeof packageMap !== 'undefined') {
            const packageId = packageMap[selectedPackageName];
            if (packageId) {
                setTimeout(() => {
                    packageSelect.value = packageId;
                    updateQuotation();
                    sessionStorage.removeItem('selectedPackage');

                    // Scroll to form
                    const contactSection = document.getElementById('contact');
                    if (contactSection) {
                        window.scrollTo({
                            top: contactSection.offsetTop - 100,
                            behavior: 'smooth'
                        });
                    }
                }, 500); // Small delay to ensure form is fully ready
            }
        }
    }

    const updateQuotation = () => {
        if (!guestsInput || !packageSelect || !quotationBox) return;

        const guests = parseInt(guestsInput.value) || 0;
        const selectedOption = packageSelect.options[packageSelect.selectedIndex];

        if (guests > 0 && selectedOption && selectedOption.value !== 'none') {
            const min = parseInt(selectedOption.getAttribute('data-min'));
            const max = parseInt(selectedOption.getAttribute('data-max'));

            const totalMin = guests * min;
            const totalMax = guests * max;

            quotationBox.classList.add('active');
            quoteRange.innerText = `₹${totalMin.toLocaleString()} - ₹${totalMax.toLocaleString()} `;
        } else {
            quotationBox.classList.remove('active');
        }
    };

    if (guestsInput && packageSelect) {
        guestsInput.addEventListener('input', updateQuotation);
        packageSelect.addEventListener('change', updateQuotation);
    }

    // --- Reviews Functionality ---
    const reviewsGrid = document.getElementById('reviewsGrid');
    const reviewModal = document.getElementById('reviewModal');
    const openReviewBtn = document.getElementById('openReviewBtn');
    const closeReviewModal = document.getElementById('closeReviewModal');
    const reviewForm = document.getElementById('reviewForm');
    const starRatingInput = document.getElementById('starRatingInput');
    const ratingValue = document.getElementById('ratingValue');
    const reviewStatus = document.getElementById('reviewStatus');

    // Fetch and display reviews
    const fetchReviews = async () => {
        if (!reviewsGrid) return;
        try {
            const res = await fetch('http://localhost:5000/api/reviews');
            const data = await res.json();
            if (data.success) {
                renderReviews(data.data);
            }
        } catch (err) {
            console.error('Error fetching reviews:', err);
            if (reviewsGrid) {
                reviewsGrid.innerHTML = '<p style="text-align: center; color: var(--text-gray);">Live reviews are currently unavailable.</p>';
            }
        }
    };

    const renderReviews = (reviews) => {
        if (reviews.length === 0) {
            reviewsGrid.innerHTML = '<p style="text-align: center; grid-column: 1/-1;">No reviews yet. Be the first to share your experience!</p>';
            return;
        }

        reviewsGrid.innerHTML = reviews.map(review => `
        < div class="review-card" data - reveal >
                <div class="review-stars">
                    ${Array(5).fill(0).map((_, i) => `<i class="${i < review.rating ? 'fas' : 'far'} fa-star"></i>`).join('')}
                </div>
                <p class="review-text">"${review.comment}"</p>
                <div class="review-author">
                    <div class="author-info">
                        <h4>${review.name}</h4>
                        <span>${review.eventType || 'Customer'}</span>
                    </div>
                    <div class="review-date">${new Date(review.createdAt).toLocaleDateString()}</div>
                </div>
            </div >
        `).join('');

        // Observe new elements for reveal animation
        if (window.revealObserver) {
            reviewsGrid.querySelectorAll('[data-reveal]').forEach(el => {
                window.revealObserver.observe(el);
            });
        }
    };

    // Modal behavior
    if (openReviewBtn) {
        openReviewBtn.onclick = () => {
            reviewModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        };
    }

    if (closeReviewModal) {
        closeReviewModal.onclick = () => {
            reviewModal.classList.remove('active');
            document.body.style.overflow = '';
        };
    }

    window.addEventListener('click', (e) => {
        if (e.target === reviewModal) {
            reviewModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // Interactive Stars
    if (starRatingInput) {
        const stars = starRatingInput.querySelectorAll('.star');
        stars.forEach(star => {
            star.onclick = () => {
                const val = star.getAttribute('data-value');
                ratingValue.value = val;
                stars.forEach(s => {
                    if (s.getAttribute('data-value') <= val) {
                        s.classList.replace('far', 'fas');
                    } else {
                        s.classList.replace('fas', 'far');
                    }
                });
            };
        });
    }

    // Submit Review
    if (reviewForm) {
        reviewForm.onsubmit = async (e) => {
            e.preventDefault();
            const formData = new FormData(reviewForm);
            const data = Object.fromEntries(formData.entries());
            data.rating = parseInt(data.rating);

            try {
                const res = await fetch('http://localhost:5000/api/reviews', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data)
                });
                const result = await res.json();

                if (result.success) {
                    reviewStatus.innerHTML = '<p style="color: green;">Thank you! Your review has been posted.</p>';
                    reviewForm.reset();
                    // Reset stars to 5
                    starRatingInput.querySelectorAll('.star').forEach(s => s.classList.replace('far', 'fas'));
                    ratingValue.value = 5;

                    setTimeout(() => {
                        reviewModal.classList.remove('active');
                        document.body.style.overflow = '';
                        reviewStatus.innerHTML = '';
                        fetchReviews(); // Refresh list
                    }, 2000);
                } else {
                    reviewStatus.innerHTML = `< p style = "color: red;" > ${result.message || 'Error submitting review'}</p > `;
                }
            } catch (err) {
                reviewStatus.innerHTML = '<p style="color: red;">Server error. Please try again later.</p>';
            }
        };
    }

    // Initial load
    if (typeof fetchReviews === 'function') {
        fetchReviews();
    }
});
