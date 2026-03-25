document.addEventListener('DOMContentLoaded', () => {
    // --- Configuration ---
    // --- Configuration ---
    let API_BASE_URL = 'https://seisuvai-api.onrender.com';

    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        // If served from the backend (port 5000), use origin
        if (window.location.port === '5000') {
            API_BASE_URL = window.location.origin;
        } else {
            // If served from Live Server or file://, assume backend is at 5000
            API_BASE_URL = 'http://localhost:5000';
        }
    } else if (window.location.protocol === 'file:') {
        // Handle direct file opening
        API_BASE_URL = 'http://localhost:5000';
    }

    // --- State ---
    const state = {
        passcode: localStorage.getItem('seisuvai_admin_passcode') || null,
        enquiries: [],
        reviews: [],
        activeTab: 'overview'
    };

    // --- Elements ---
    const loginGate = document.getElementById('loginGate');
    const dashboard = document.getElementById('dashboard');
    const loginForm = document.getElementById('loginForm');
    const loginError = document.getElementById('loginError');
    const detailsModal = document.getElementById('detailsModal');
    const modalContent = document.getElementById('modalContent');
    const closeModalBtn = document.getElementById('closeModal');

    // --- Initialization ---
    function init() {
        setDate();
        // Setup Modal Close
        if (closeModalBtn) {
            closeModalBtn.addEventListener('click', () => {
                if (detailsModal) detailsModal.style.display = 'none';
            });
        }

        if (state.passcode) {
            verifySession();
        } else {
            showLogin();
        }
    }

    function setDate() {
        const dateEl = document.getElementById('currentDate');
        if (dateEl) {
            dateEl.innerText = new Date().toLocaleDateString('en-US', {
                weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
            });
        }
    }

    // --- Global Event Delegation (Updated) ---
    document.addEventListener('click', async (e) => {
        const btn = e.target.closest('[data-action]');
        if (!btn) return;

        const action = btn.dataset.action;
        const id = btn.dataset.id;

        console.log(`Action triggered: ${action} on ID: ${id}`);

        if (action === 'view-details') handleViewDetails(id);
        if (action === 'reply-whatsapp') handleWhatsApp(id);
        if (action === 'toggle-contacted') handleToggleContacted(id, btn);
        if (action === 'approve-review') handleReviewAction(id, 'approve', btn);
        if (action === 'delete-review') handleReviewAction(id, 'delete', btn);
    });

    // Status Change listener (dropdown)
    document.addEventListener('change', async (e) => {
        if (e.target.classList.contains('status-select')) {
            const id = e.target.dataset.id;
            const newStatus = e.target.value;
            handleStatusChange(id, newStatus, e.target);
        }
    });

    // --- Action Handlers --- 

    async function handleToggleContacted(id, btn) {
        btn.disabled = true;
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';

        try {
            const res = await fetch(`${API_BASE_URL}/api/enquiries/${id}/contacted`, {
                method: 'PUT',
                headers: { 'x-admin-passcode': state.passcode }
            });

            if (res.ok) {
                await fetchEnquiries(); // Refresh UI
            } else {
                alert('Failed to update contacted status');
            }
        } catch (err) {
            console.error(err);
            alert('Network Error');
        } finally {
            btn.disabled = false;
        }
    }

    async function handleStatusChange(id, newStatus, select) {
        select.disabled = true;
        try {
            // Validate and send update
            const res = await fetch(`${API_BASE_URL}/api/enquiries/${id}/status`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'x-admin-passcode': state.passcode
                },
                body: JSON.stringify({ status: newStatus })
            });

            if (res.ok) {
                await fetchEnquiries();
                // Show toast or highlight
            } else {
                alert('Failed to update status');
                // Revert selection?
                await fetchEnquiries();
            }
        } catch (err) {
            console.error(err);
            alert('Network Error');
        } finally {
            select.disabled = false;
        }
    }

    // ... (Keep existing view details and whatsapp handlers, but update renderEnquiryCard below) ...

    function renderEnquiryCard(e) {
        const isContacted = e.contacted === true;
        const statusOptions = ['pending', 'confirmed', 'negotiation', 'closed'];

        return `
            <div class="enquiry-card" style="border-left: 5px solid ${getStatusColor(e.status)}">
                <div class="enquiry-header">
                    <div>
                        <h3 style="color: var(--maroon-dark); margin-bottom: 0.2rem;">${e.name}</h3>
                        <span class="badge badge-type">${formatType(e.enquiryType)}</span>
                        <select class="status-select" data-id="${e._id}" style="padding: 2px 8px; border-radius: 4px; border: 1px solid #ccc; margin-left: 10px;">
                            ${statusOptions.map(opt => `
                                <option value="${opt}" ${e.status === opt ? 'selected' : ''}>
                                    ${opt.charAt(0).toUpperCase() + opt.slice(1)}
                                </option>
                            `).join('')}
                        </select>
                    </div>
                    <button class="btn-action btn-status" data-action="view-details" data-id="${e._id}" style="width: auto; padding: 5px 10px; font-size: 0.8rem;">
                        <i class="fas fa-eye"></i> Requirements
                    </button>
                </div>
                
                <div class="enquiry-details">
                    <p><i class="fas fa-phone"></i> ${e.phone}</p>
                    <p><i class="fas fa-calendar"></i> ${new Date(e.createdAt).toLocaleDateString()}</p>
                    <p><i class="fas fa-users"></i> ${e.paxCount || 'N/A'} Pax</p>
                </div>

                <div class="enquiry-actions" style="margin-top: 1rem; display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
                    <!-- 1. WhatsApp -->
                    <button class="btn-action btn-whatsapp" data-action="reply-whatsapp" data-id="${e._id}">
                        <i class="fab fa-whatsapp"></i> WhatsApp
                    </button>
                    
                    <!-- 2. Contacted Toggle -->
                    <button class="btn-action" data-action="toggle-contacted" data-id="${e._id}" 
                        style="background: ${isContacted ? '#4CAF50' : '#f0f0f0'}; color: ${isContacted ? 'white' : '#333'};">
                        <i class="fas ${isContacted ? 'fa-check-circle' : 'fa-times-circle'}"></i> 
                        ${isContacted ? 'Contacted' : 'Not Contacted'}
                    </button>
                </div>
            </div>
        `;
    }

    function getStatusColor(status) {
        switch (status) {
            case 'confirmed': return '#4CAF50'; // Green
            case 'negotiation': return '#2196F3'; // Blue
            case 'closed': return '#9E9E9E'; // Grey
            default: return '#FFC107'; // Amber (Pending)
        }
    }

    function renderReviews() {
        const list = document.getElementById('reviewsList');
        if (!list) return;

        if (state.reviews.length === 0) {
            list.innerHTML = '<p style="text-align:center; grid-column: 1/-1;">No reviews found.</p>';
            return;
        }

        list.innerHTML = state.reviews.map(r => `
            <div class="stat-card" style="border-left-color: ${r.status === 'approved' ? 'green' : 'orange'}">
                <div style="display: flex; justify-content: space-between;">
                    <strong>${r.name}</strong>
                    <span style="color: gold;">${'★'.repeat(r.rating || 5)}</span>
                </div>
                <p style="margin: 1rem 0; color: #555;">"${r.comment || r.message}"</p>
                <div style="display: flex; gap: 1rem;">
                    ${r.status === 'pending' ? `
                        <button class="btn-action btn-status" style="background: #e8f5e9; color: green;" data-action="approve-review" data-id="${r._id}">
                            Approve
                        </button>
                    ` : ''}
                    <button class="btn-action btn-status" style="background: #ffebee; color: red;" data-action="delete-review" data-id="${r._id}">
                        Delete
                    </button>
                </div>
            </div>
        `).join('');
    }

    // --- Helpers ---
    function formatType(type) {
        return type ? type.replace('_', ' ').toUpperCase() : 'UNKNOWN';
    }

    function formatPhone(phone) {
        if (!phone) return '';
        const p = phone.replace(/\D/g, ''); // strip non-digits
        return p.startsWith('91') ? p : '91' + p;
    }

    // --- Tab Navigation ---
    const navItems = document.querySelectorAll('.nav-item[data-tab]');
    const sections = document.querySelectorAll('.section');
    const pageTitle = document.getElementById('pageTitle');
    const sidebar = document.getElementById('sidebar');
    const sidebarToggle = document.getElementById('sidebarToggle');

    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', () => {
            if (sidebar) sidebar.classList.toggle('active');
        });
    }

    navItems.forEach(item => {
        item.addEventListener('click', () => {
            const tab = item.dataset.tab;

            // Switch UI
            document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
            item.classList.add('active');

            sections.forEach(s => s.classList.remove('active'));
            const activeSection = document.getElementById(tab);
            if (activeSection) activeSection.classList.add('active');

            // Update Header
            if (pageTitle) pageTitle.innerText = item.innerText.trim();

            // Mobile close sidebar
            if (window.innerWidth <= 1024 && sidebar) {
                sidebar.classList.remove('active');
            }
        });
    });

    // --- Authentication Logic (Restored) ---
    async function verifySession() {
        try {
            const res = await fetch(`${API_BASE_URL}/api/admin/verify`, {
                headers: { 'x-admin-passcode': state.passcode }
            });
            if (res.ok) {
                showDashboard();
            } else {
                logout();
            }
        } catch (err) {
            console.error('Auth Check Failed', err);
            // On network error with stored passcode, we might want to let them see cached view or retry
            // For now, fail safe.
            loginError.innerText = 'Network connection failed. Backend offline?';
            loginError.style.display = 'block';
            showLogin();
        }
    }

    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const code = document.getElementById('passcode').value;
            const btn = loginForm.querySelector('button');

            btn.innerText = 'Verifying...';
            btn.disabled = true;
            loginError.style.display = 'none';

            try {
                const res = await fetch(`${API_BASE_URL}/api/admin/login`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ passcode: code })
                });
                const data = await res.json();

                if (data.success) {
                    state.passcode = code;
                    localStorage.setItem('seisuvai_admin_passcode', code);
                    showDashboard();
                } else {
                    loginError.innerText = data.message || 'Invalid Passcode';
                    loginError.style.display = 'block';
                }
            } catch (err) {
                loginError.innerText = 'Connection Error: Is server running?';
                loginError.style.display = 'block';
            } finally {
                btn.innerText = 'Unlock Dashboard';
                btn.disabled = false;
            }
        });
    }

    function showLogin() {
        if (loginGate) loginGate.style.display = 'flex';
        if (dashboard) dashboard.style.display = 'none';
    }

    function showDashboard() {
        if (loginGate) loginGate.style.display = 'none';
        if (dashboard) dashboard.style.display = 'flex';
        loadData();
    }

    function logout() {
        state.passcode = null;
        localStorage.removeItem('seisuvai_admin_passcode');
        showLogin();
    }

    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) logoutBtn.addEventListener('click', logout);

    // --- Data Loading ---
    async function loadData() {
        await Promise.all([fetchEnquiries(), fetchReviews()]);
        renderDashboard();
    }

    async function fetchEnquiries() {
        try {
            const res = await fetch(`${API_BASE_URL}/api/enquiries`, {
                headers: { 'x-admin-passcode': state.passcode }
            });
            const json = await res.json();
            if (json.success) {
                state.enquiries = json.data;
                renderEnquiries();
            }
        } catch (err) {
            console.error('Failed to load enquiries', err);
        }
    }

    async function fetchReviews() {
        try {
            const res = await fetch(`${API_BASE_URL}/api/reviews`, {
                headers: { 'x-admin-passcode': state.passcode }
            });
            const json = await res.json();
            if (json.success) {
                state.reviews = json.data;
                renderReviews();
            }
        } catch (err) {
            console.error('Failed to load reviews', err);
        }
    }

    // Start
    init();
});
