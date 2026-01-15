document.addEventListener('DOMContentLoaded', () => {
    // State Management
    const state = {
        isLoggedIn: false,
        activeSection: 'dashboard-home',
        passcode: localStorage.getItem('seisuvai_admin_passcode') || '',
        enquiries: [], // Unified enquiries list
        reviews: []
    };

    // Elements
    const loginGate = document.getElementById('loginGate');
    const adminDashboard = document.getElementById('adminDashboard');
    const loginForm = document.getElementById('loginForm');
    const loginError = document.getElementById('loginError');
    const navItems = document.querySelectorAll('.nav-item');
    const sections = document.querySelectorAll('.content-section');
    const pageTitle = document.getElementById('pageTitle');
    const sidebar = document.getElementById('sidebar');
    const sidebarToggle = document.getElementById('sidebarToggle');
    const logoutBtn = document.getElementById('logoutBtn');
    const currentDateEl = document.getElementById('currentDate');

    // Set Date
    const setDate = () => {
        const now = new Date();
        const options = { weekday: 'long', month: 'short', day: 'numeric' };
        currentDateEl.innerText = now.toLocaleDateString('en-US', options);
    };
    setDate();

    // --- API Configuration ---
    const API_BASE_URL = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
        ? window.location.origin
        : 'https://seisuvai-api.onrender.com';

    // Init Logic
    const init = async () => {
        if (state.passcode) {
            const isValid = await verifyPasscode(state.passcode);
            if (isValid) {
                showDashboard();
            } else {
                localStorage.removeItem('seisuvai_admin_passcode');
                state.passcode = '';
                showLogin();
            }
        } else {
            showLogin();
        }
    };

    const showLogin = () => {
        loginGate.style.display = 'flex';
        adminDashboard.style.display = 'none';
        state.isLoggedIn = false;
    };

    const showDashboard = () => {
        loginGate.style.display = 'none';
        adminDashboard.style.display = 'flex';
        state.isLoggedIn = true;
        initDashboard();
    };

    // Login Logic
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const codeInput = document.getElementById('passcode');
        const code = codeInput.value;

        loginError.style.display = 'none';
        const button = loginForm.querySelector('button');
        const originalText = button.innerText;
        button.innerText = 'Verifying...';
        button.disabled = true;

        try {
            const response = await fetch(`${API_BASE_URL}/api/admin/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ passcode: code })
            });

            const result = await response.json();

            if (result.success) {
                state.passcode = code;
                localStorage.setItem('seisuvai_admin_passcode', code);
                showDashboard();
            } else {
                loginGate.classList.add('shake');
                loginError.style.display = 'block';
                loginError.innerText = result.message || 'Invalid passcode';
                setTimeout(() => loginGate.classList.remove('shake'), 500);
            }
        } catch (err) {
            loginError.style.display = 'block';
            loginError.innerText = 'Connection error. Check backend.';
        } finally {
            button.innerText = originalText;
            button.disabled = false;
        }
    });

    async function verifyPasscode(code) {
        try {
            const response = await fetch(`${API_BASE_URL}/api/admin/verify`, {
                headers: { 'x-admin-passcode': code }
            });
            return response.ok;
        } catch (err) {
            return false;
        }
    }

    // Navigation
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            const target = item.getAttribute('data-target');
            switchSection(target);

            if (window.innerWidth <= 1024) {
                sidebar.classList.remove('active');
            }
        });
    });

    function switchSection(targetId) {
        navItems.forEach(i => i.classList.remove('active'));
        const activeNav = document.querySelector(`[data-target="${targetId}"]`);
        if (activeNav) activeNav.classList.add('active');

        sections.forEach(s => s.classList.remove('active'));
        const activeSec = document.getElementById(targetId);
        if (activeSec) activeSec.classList.add('active');

        state.activeSection = targetId;

        const names = {
            'dashboard-home': 'Dashboard',
            'bookings-section': 'Event Bookings',
            'reviews-section': 'Customer Reviews',
            'custom-menu-section': 'Custom Menu Requests',
            'live-stalls-section': 'Live Stall Enquiries'
        };
        pageTitle.innerText = names[targetId] || 'Admin Panel';

        if (targetId === 'bookings-section') loadBookings();
        if (targetId === 'reviews-section') loadReviews();
        if (targetId === 'custom-menu-section') loadCustomRequests();
        if (targetId === 'live-stalls-section') loadLiveStalls();
    }

    // Sidebar Mobile Toggle
    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', () => {
            sidebar.classList.toggle('active');
        });
    }

    // Logout
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            localStorage.removeItem('seisuvai_admin_passcode');
            location.reload();
        });
    }

    // Dashboard Initialization
    function initDashboard() {
        fetchEnquiries();
        fetchData(`${API_BASE_URL}/api/reviews`, 'reviews');
    }

    async function fetchEnquiries() {
        try {
            const response = await fetch(`${API_BASE_URL}/api/enquiries`, {
                headers: { 'x-admin-passcode': state.passcode }
            });
            const result = await response.json();
            if (result.success) {
                state.enquiries = result.data;
                renderRecentTable(state.enquiries.slice(0, 5));
                updateStats();
                // Refresh active section if needed
                if (state.activeSection === 'bookings-section') loadBookings();
                if (state.activeSection === 'custom-menu-section') loadCustomRequests();
                if (state.activeSection === 'live-stalls-section') loadLiveStalls();
            }
        } catch (err) {
            console.error('Error fetching enquiries:', err);
        }
    }

    async function fetchData(url, stateKey) {
        try {
            const response = await fetch(url, {
                headers: { 'x-admin-passcode': state.passcode }
            });
            const result = await response.json();
            if (result.success) {
                state[stateKey] = result.data;
                updateStats();
                return result.data;
            }
        } catch (err) {
            console.error(`Error fetching ${stateKey}:`, err);
        }
        return null;
    }

    function updateStats() {
        const stats = {
            'total': state.enquiries.length,
            'pending': state.enquiries.filter(e => e.status === 'pending').length,
            'reviews': state.reviews.filter(r => r.status === 'pending').length,
            'today': state.enquiries.filter(e => new Date(e.createdAt).toDateString() === new Date().toDateString()).length
        };

        const valEls = document.querySelectorAll('.stat-value');
        if (valEls.length >= 4) {
            valEls[0].innerText = stats.total;
            valEls[1].innerText = stats.pending;
            valEls[2].innerText = stats.reviews;
            valEls[3].innerText = stats.today;
        }
    }

    // Rendering Functions
    function renderRecentTable(data) {
        const tbody = document.getElementById('recentBookingsTable');
        if (!tbody) return;

        if (!data || data.length === 0) {
            tbody.innerHTML = '<tr><td colspan="5" style="text-align:center">No recent enquiries</td></tr>';
            return;
        }

        tbody.innerHTML = data.map(e => `
            <tr>
                <td>${new Date(e.createdAt).toLocaleDateString()}</td>
                <td>${e.name}</td>
                <td style="text-transform: capitalize">${(e.enquiryType || '').replace('_', ' ')}</td>
                <td>${e.paxCount || 'N/A'}</td>
                <td><span class="badge ${e.status === 'pending' ? 'badge-warning' : 'badge-success'}">
                    ${e.status}
                </span></td>
            </tr>
        `).join('');
    }

    const getLoadingTemplate = () => '<div class="loading-skeleton" style="grid-column: 1/-1; padding: 2rem; text-align: center; background: white; border-radius: 12px;">Loading data...</div>';

    async function loadBookings() {
        const grid = document.getElementById('bookingsGrid');
        if (!grid) return;

        const data = state.enquiries.filter(e => e.enquiryType === 'booking');
        if (data.length === 0) {
            grid.innerHTML = '<div style="grid-column: 1/-1; text-align: center; padding: 3rem;">No booking enquiries found.</div>';
            return;
        }

        grid.innerHTML = data.map(e => `
            <div class="data-card">
                <div class="card-top">
                    <span class="card-title">${e.name}</span>
                    <span class="card-date">${new Date(e.createdAt).toLocaleDateString()}</span>
                </div>
                <div class="card-details">
                    <div class="detail-item"><i class="fas fa-users"></i> ${e.paxCount || 'N/A'} Pax</div>
                    <div class="detail-item"><i class="fas fa-phone"></i> ${e.phone}</div>
                </div>
                <p class="card-msg">"${e.message || 'No message'}"</p>
                <div class="card-actions">
                    <button class="btn btn-outline" onclick="viewDetail('enquiry', '${e._id}')">Details</button>
                    <a href="https://wa.me/${e.phone.startsWith('91') ? e.phone : '91' + e.phone}" target="_blank" class="btn btn-whatsapp"><i class="fab fa-whatsapp"></i> WhatsApp</a>
                    <button class="btn btn-primary" onclick="updateEnquiryStatus('${e._id}', 'completed')">Close</button>
                </div>
            </div>
        `).join('');
    }

    async function loadReviews() {
        const list = document.getElementById('reviewsList');
        if (!list) return;
        list.innerHTML = getLoadingTemplate();

        const data = await fetchData(`${API_BASE_URL}/api/reviews`, 'reviews');
        if (!data || data.length === 0) {
            list.innerHTML = '<div style="text-align: center; padding: 3rem;">No reviews found.</div>';
            return;
        }

        list.innerHTML = data.map(r => `
            <div class="review-mgmt-card" id="review-${r._id}" style="${r.status === 'approved' ? 'border-left: 4px solid var(--success-soft)' : ''}">
                <div class="review-content-box">
                    <div class="review-author">${r.name} ${r.status === 'approved' ? '<span class="badge badge-success">Approved</span>' : ''}</div>
                    <div class="star-rating">${'★'.repeat(r.rating || 5)}${'☆'.repeat(5 - (r.rating || 5))}</div>
                    <div class="review-text">${r.comment || r.message}</div>
                    <div class="card-date" style="margin-top: 0.5rem;">${new Date(r.createdAt).toLocaleDateString()}</div>
                </div>
                <div class="review-actions">
                    <button class="btn btn-outline" onclick="deleteReview('${r._id}')">Delete</button>
                    ${r.status === 'pending' ? `<button class="btn btn-primary" onclick="approveReview('${r._id}')">Approve</button>` : ''}
                </div>
            </div>
        `).join('');
    }

    async function loadCustomRequests() {
        const grid = document.getElementById('customRequestsGrid');
        if (!grid) return;

        const data = state.enquiries.filter(e => e.enquiryType === 'custom_menu');
        if (data.length === 0) {
            grid.innerHTML = '<div style="grid-column: 1/-1; text-align: center; padding: 3rem;">No custom menu requests found.</div>';
            return;
        }

        grid.innerHTML = data.map(e => `
            <div class="data-card">
                <div class="card-top">
                    <span class="card-title">${e.name}</span>
                    <span class="badge badge-danger">Custom Menu</span>
                </div>
                <div class="card-details">
                    <div class="detail-item"><i class="fas fa-users"></i> ${e.paxCount} Pax</div>
                    <div class="detail-item"><i class="fas fa-phone"></i> ${e.phone}</div>
                </div>
                <div class="card-tags">
                    ${(e.selectedItems || []).map(d => `<span class="tag">${d}</span>`).join('')}
                </div>
                <div class="card-actions">
                    <button class="btn btn-outline" onclick="viewDetail('enquiry', '${e._id}')">Details</button>
                    <a href="https://wa.me/${e.phone.startsWith('91') ? e.phone : '91' + e.phone}" target="_blank" class="btn btn-whatsapp"><i class="fab fa-whatsapp"></i> WhatsApp</a>
                    <button class="btn btn-outline" onclick="updateEnquiryStatus('${e._id}', 'completed')">Handled</button>
                </div>
            </div>
        `).join('');
    }

    async function loadLiveStalls() {
        const grid = document.getElementById('stallsGrid');
        if (!grid) return;

        const data = state.enquiries.filter(e => e.enquiryType === 'live_stall');
        if (data.length === 0) {
            grid.innerHTML = '<div style="grid-column: 1/-1; text-align: center; padding: 3rem;">No live stall enquiries found.</div>';
            return;
        }

        grid.innerHTML = data.map(e => `
            <div class="data-card">
                <div class="card-top">
                    <span class="card-title">${e.name}</span>
                    <span class="card-date">${new Date(e.createdAt).toLocaleDateString()}</span>
                </div>
                <div class="card-details">
                    <div class="detail-item"><i class="fas fa-users"></i> ${e.paxCount} Pax</div>
                    <div class="detail-item"><i class="fas fa-phone"></i> ${e.phone}</div>
                </div>
                <div class="card-tags" style="margin-top: 0.5rem">
                    ${(e.selectedItems || []).map(st => `<span class="tag" style="background:rgba(212, 175, 55, 0.1); color: #8a6d10;">${st}</span>`).join('')}
                </div>
                <div class="card-actions">
                    <button class="btn btn-outline" onclick="viewDetail('enquiry', '${e._id}')">Details</button>
                    <a href="https://wa.me/${e.phone.startsWith('91') ? e.phone : '91' + e.phone}" target="_blank" class="btn btn-whatsapp"><i class="fab fa-whatsapp"></i> Contact</a>
                    <button class="btn btn-outline" onclick="updateEnquiryStatus('${e._id}', 'completed')">Close</button>
                </div>
            </div>
        `).join('');
    }

    // Global Action Handlers
    window.updateEnquiryStatus = async (id, status) => {
        try {
            const response = await fetch(`${API_BASE_URL}/api/enquiries/${id}/status`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'x-admin-passcode': state.passcode
                },
                body: JSON.stringify({ status })
            });
            if (response.ok) {
                fetchEnquiries();
            }
        } catch (err) {
            alert('Update failed');
        }
    };

    window.approveReview = async (id) => {
        try {
            const response = await fetch(`${API_BASE_URL}/api/reviews/${id}/approve`, {
                method: 'PUT',
                headers: { 'x-admin-passcode': state.passcode }
            });
            if (response.ok) {
                fetchData(`${API_BASE_URL}/api/reviews`, 'reviews');
            }
        } catch (err) {
            alert('Approval failed');
        }
    };

    window.deleteReview = async (id) => {
        if (!confirm('Are you sure you want to delete this review?')) return;
        try {
            const response = await fetch(`${API_BASE_URL}/api/reviews/${id}`, {
                method: 'DELETE',
                headers: { 'x-admin-passcode': state.passcode }
            });
            if (response.ok) {
                fetchData(`${API_BASE_URL}/api/reviews`, 'reviews');
            }
        } catch (err) {
            alert('Delete failed');
        }
    };

    window.viewDetail = (type, id) => {
        const modal = document.getElementById('detailsModal');
        const content = document.getElementById('modalContent');
        const item = state.enquiries.find(e => e._id === id);

        if (item) {
            content.innerHTML = `
                <div style="display: grid; gap: 1rem;">
                    <div><strong>Customer:</strong> ${item.name}</div>
                    <div><strong>Phone:</strong> ${item.phone}</div>
                    <div><strong>Email:</strong> ${item.email || 'N/A'}</div>
                    <div><strong>Type:</strong> ${item.enquiryType.replace('_', ' ').toUpperCase()}</div>
                    <div><strong>Pax:</strong> ${item.paxCount || 'N/A'}</div>
                    <div><strong>Selected Items:</strong> ${item.selectedItems.join(', ') || 'None'}</div>
                    <div><strong>Status:</strong> <span class="badge ${item.status === 'pending' ? 'badge-warning' : 'badge-success'}">${item.status}</span></div>
                    <div><strong>Message/Details:</strong><br><p style="margin-top:0.5rem; background:#f9f9f9; padding: 1rem; border-radius: 8px;">${item.message || 'No additional details'}</p></div>
                </div>
            `;
            modal.style.display = 'flex';
        }
    };

    // Close Modals
    document.querySelectorAll('.modal-close, #modalCloseBtn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.modal-overlay').forEach(m => m.style.display = 'none');
        });
    });

    // Run Init
    init();
});
