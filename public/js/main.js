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

    // Menu Filtering Logic
    const filterButtons = document.querySelectorAll('.filter-btn');
    const menuCards = document.querySelectorAll('.menu-card');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            menuCards.forEach(card => {
                if (filterValue === 'all') {
                    card.classList.remove('hide');
                    if (!card.classList.contains('active')) {
                        card.classList.add('active');
                    }
                } else {
                    const category = card.getAttribute('data-category');
                    if (category === filterValue) {
                        card.classList.remove('hide');
                        card.classList.add('active');
                    } else {
                        card.classList.add('hide');
                    }
                }
            });
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
            submitBtn.innerText = 'Sending...';
            submitBtn.disabled = true;

            // Real API call
            fetch('http://localhost:5000/api/bookings', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
                .then(response => response.json())
                .then(result => {
                    if (result.success) {
                        formStatus.innerText = 'Thank you! Your inquiry has been sent successfully. We will be in touch soon.';
                        formStatus.classList.add('success');
                        bookingForm.reset();
                    } else {
                        formStatus.innerText = result.message || 'Something went wrong. Please try again.';
                        formStatus.classList.add('error');
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                    formStatus.innerText = 'Unable to connect to the server. (Make sure backend is running)';
                    formStatus.classList.add('error');
                })
                .finally(() => {
                    submitBtn.innerText = originalText;
                    submitBtn.disabled = false;

                    // Clear message after 5 seconds
                    setTimeout(() => {
                        formStatus.className = 'form-status';
                        formStatus.innerText = '';
                    }, 5000);
                });
        });
    }

    // Refresh reveal animations on window resize (optional but helpful)
    window.addEventListener('resize', () => {
        // Any resize specific logic if needed
    });

    // Structured Menu Data for Professional Sheet View
    const cateringMenus = {
        'Tiffin Menu - Veg: Menu 1': {
            mainTitle: 'Tiffin Menu - Veg',
            subtitle: 'Menu 1: Economy Selection',
            sections: [
                { title: '🍬 Sweet', items: ['Pineapple Kesari'] },
                { title: '🍽️ Breakfast Items', items: ['Idli', 'Medu Vada', 'Poori', 'Ven Pongal (White Pongal)'] },
                { title: '🍛 Accompaniments', items: ['Sambar', 'Vada Curry', 'Coconut Chutney', 'Spicy Chutney'] },
                { title: '☕ Beverage', items: ['Coffee'] },
                { title: '🎁 Extras', items: ['Drinking Water Bottle', 'Banana Leaf', 'Paper roll', 'Service boys'] }
            ]
        },
        'Tiffin Menu - Veg: Menu 2': {
            mainTitle: 'Tiffin Menu - Veg',
            subtitle: 'Menu 2: Standard Selection',
            sections: [
                { title: '🍬 Sweet', items: ['Carrot Halwa'] },
                { title: '🍽️ Breakfast Items', items: ['Malli Idli', 'Poori', 'Medu Vada', 'Ven Pongal (White Pongal)'] },
                { title: '🍛 Curries & Accompaniments', items: ['Vada Curry / Urulai Masala', 'Sambar', 'Coconut Chutney', 'Spicy Chutney'] },
                { title: '☕ Beverage', items: ['Coffee'] },
                { title: '🎁 Extras', items: ['Drinking Water Bottle', 'Banana Leaf', 'Paper roll', 'Service boys'] }
            ]
        },
        'Tiffin Menu - Veg: Menu 3': {
            mainTitle: 'Tiffin Menu - Veg',
            subtitle: 'Menu 3: Deluxe Selection',
            sections: [
                { title: '🍬 Sweet', items: ['Kasi Halwa', 'Semiya Kesari'] },
                { title: '🍽️ Breakfast Items', items: ['Plate Idli / Elaneer Idli', 'Chole Poori', 'Rava Dosa / Masala Dosa', 'Ghee Pongal', 'Medu Vada / Masala Vada'] },
                { title: '🍛 Curries & Accompaniments', items: ['Channa Masala', 'Sambar', 'Coconut Chutney', 'Mint Chutney', 'Spicy Chutney'] },
                { title: '☕ Beverage', items: ['Coffee / Tea'] },
                { title: '🎁 Extras', items: ['Drinking Water Bottle', 'Banana Leaf', 'Paper roll', 'Service boys'] }
            ]
        },
        'Lunch Menu - Veg: Menu 1': {
            mainTitle: 'Lunch Menu - Veg',
            subtitle: 'Menu 1: Economy Selection',
            sections: [
                { title: '🍬 Sweet', items: ['Payasam'] },
                { title: '🍚 Rice', items: ['Plain White Rice'] },
                { title: '🥣 Gravies', items: ['Sambar', 'Vathal Kuzhambu', 'Rasam', 'Buttermilk'] },
                { title: '🥗 Sides', items: ['Varuval', 'Poriyal', 'Vada', 'Pickle', 'Appalam'] },
                { title: '🥤 Beverage', items: ['Drinking Water Bottle'] },
                { title: '🎁 Extras', items: ['Banana Leaf', 'Paper Roll', 'Service Boys'] }
            ]
        },
        'Lunch Menu - Veg: Menu 2': {
            mainTitle: 'Lunch Menu - Veg',
            subtitle: 'Menu 2: Standard Selection',
            sections: [
                { title: '🍬 Sweet', items: ['Frini Payasam', 'Gulab Jamun'] },
                { title: '🍚 Rice', items: ['Plain White Rice'] },
                { title: '🥣 Gravies', items: ['Sambar', 'Vathal Kuzhambu', 'Tomato Rasam', 'Buttermilk'] },
                { title: '🥗 Sides', items: ['Kootu / Varuval', 'Poriyal / Avial', 'Vada', 'Pickle', 'Appalam'] },
                { title: '🥤 Beverage', items: ['Drinking Water Bottle'] },
                { title: '🎁 Extras', items: ['Banana Leaf', 'Paper Roll', 'Service Boys'] }
            ]
        },
        'Lunch Menu - Veg: Menu 3': {
            mainTitle: 'Lunch Menu - Veg',
            subtitle: 'Menu 3: Deluxe Selection',
            sections: [
                { title: '🍬 Sweets', items: ['Ghee Mysore Pak', 'Special Payasam'] },
                { title: '🥘 Starter', items: ['Masala Vada / Keerai Vada'] },
                { title: '🍚 Rice', items: ['Vegetable Pulao / Vegetable Kuska', 'Plain White Rice'] },
                { title: '🥗 Accompaniment', items: ['Onion Raitha'] },
                { title: '🥣 Gravies', items: ['Vegetable Sambar', 'Vathal Kuzhambu', 'Paruppu Rasam', 'Buttermilk'] },
                { title: '🌱 Vegetables & Sides', items: ['Kootu', 'Varuval', 'Poriyal', 'Pickle', 'Appalam'] },
                { title: '🍨 Desserts', items: ['Ice Cream'] },
                { title: '🥤 Beverage', items: ['Drinking Water Bottle'] },
                { title: '🎁 Extras', items: ['Banana Leaf', 'Paper Roll', 'Service Boys'] }
            ]
        }
    };

    // Menu Modal Logic
    const menuModal = document.getElementById('menuModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalSubtitle = document.getElementById('modalSubtitle');
    const modalBody = document.getElementById('modalBody');
    const modalPrice = document.getElementById('modalPrice');
    const closeBtn = document.querySelector('.modal-close');

    if (menuModal && modalBody) {
        document.querySelectorAll('.view-menu-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const card = btn.closest('.menu-card');
                const title = card.querySelector('h3').innerText;
                const price = card.querySelector('.package-price').innerText;
                const menuData = cateringMenus[title];

                if (menuData) {
                    modalTitle.innerText = menuData.mainTitle || title;
                    modalSubtitle.innerText = menuData.subtitle;
                    modalPrice.innerText = price;

                    let bodyHtml = '';
                    menuData.sections.forEach(sec => {
                        const iconHtml = sec.icon ? `<i class="fas ${sec.icon}"></i> ` : '';
                        bodyHtml += `
                            <div class="menu-sheet-section">
                                <h4>${iconHtml}${sec.title}</h4>
                                <div class="menu-sheet-grid">
                                    ${sec.items.map(item => `<div class="menu-sheet-item">${item}</div>`).join('')}
                                </div>
                            </div>
                        `;
                    });
                    modalBody.innerHTML = bodyHtml;
                } else {
                    // Fallback to simple list if data not found
                    const fullMenu = card.querySelector('.hidden-full-menu ul').innerHTML;
                    modalTitle.innerText = title;
                    modalSubtitle.innerText = 'Catering Selection';
                    modalPrice.innerText = price;
                    modalBody.innerHTML = `
                        <div class="menu-sheet-section">
                            <h4><i class="fas fa-list"></i> Menu Items</h4>
                            <div class="menu-sheet-grid">
                                ${Array.from(card.querySelectorAll('.hidden-full-menu li')).map(li => `<div class="menu-sheet-item">${li.innerText}</div>`).join('')}
                            </div>
                        </div>
                    `;
                }

                menuModal.classList.add('active');
                document.body.style.overflow = 'hidden';
            });
        });

        const closeModal = () => {
            menuModal.classList.remove('active');
            document.body.style.overflow = '';
        };

        if (closeBtn) {
            closeBtn.addEventListener('click', closeModal);
        }

        window.addEventListener('click', (e) => {
            if (e.target === menuModal) closeModal();
        });

        // Expose to global scope for the Get Quote button in modal
        window.closeModal = closeModal;

        // Auto-select package when clicking "Get Quote" on a menu card
        document.querySelectorAll('.menu-card .btn-primary').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const card = btn.closest('.menu-card');
                const title = card.querySelector('h3').innerText;

                // Map card titles to package select values
                const packageMap = {
                    'Tiffin Menu - Veg: Menu 1': 'tiffin_veg_1',
                    'Tiffin Menu - Veg: Menu 2': 'tiffin_veg_2',
                    'Tiffin Menu - Veg: Menu 3': 'tiffin_veg_3',
                    'Lunch Menu - Veg: Menu 1': 'lunch_veg_1',
                    'Lunch Menu - Veg: Menu 2': 'lunch_veg_2',
                    'Lunch Menu - Veg: Menu 3': 'lunch_veg_3'
                };

                const val = packageMap[title];
                if (val && packageSelect) {
                    packageSelect.value = val;
                    updateQuotation(); // Trigger the live calculation
                }
            });
        });
    }

    // Live Quotation Logic
    const guestsInput = document.getElementById('guests');
    const packageSelect = document.getElementById('package');
    const quotationBox = document.getElementById('quotationBox');
    const quoteRange = document.getElementById('quoteRange');

    const updateQuotation = () => {
        const guests = parseInt(guestsInput.value) || 0;
        const selectedOption = packageSelect.options[packageSelect.selectedIndex];

        if (guests > 0 && selectedOption.value !== 'none') {
            const min = parseInt(selectedOption.getAttribute('data-min'));
            const max = parseInt(selectedOption.getAttribute('data-max'));

            const totalMin = guests * min;
            const totalMax = guests * max;

            quoteRange.innerText = `₹${totalMin.toLocaleString()} - ₹${totalMax.toLocaleString()}`;
            quotationBox.style.display = 'block';
        } else {
            quotationBox.style.display = 'none';
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
        try {
            const res = await fetch('http://localhost:5000/api/reviews');
            const data = await res.json();
            if (data.success) {
                renderReviews(data.data);
            }
        } catch (err) {
            console.error('Error fetching reviews:', err);
            reviewsGrid.innerHTML = '<p style="text-align: center; color: red;">Failed to load reviews.</p>';
        }
    };

    const renderReviews = (reviews) => {
        if (reviews.length === 0) {
            reviewsGrid.innerHTML = '<p style="text-align: center; grid-column: 1/-1;">No reviews yet. Be the first to share your experience!</p>';
            return;
        }

        reviewsGrid.innerHTML = reviews.map(review => `
            <div class="review-card" data-reveal>
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
            </div>
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
                    reviewStatus.innerHTML = `<p style="color: red;">${result.message || 'Error submitting review'}</p>`;
                }
            } catch (err) {
                reviewStatus.innerHTML = '<p style="color: red;">Server error. Please try again later.</p>';
            }
        };
    }

    // Initial load
    fetchReviews();
});
