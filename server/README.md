# ⚙️ Seisuvai Catering — Backend API Server

> Node.js Express 5 server providing RESTful endpoints, MongoDB persistence, health probes, and CORS security.

---

## 📌 Architecture & Features

- **Express 5 Framework**: High-performance REST middleware architecture.
- **MongoDB & Mongoose 9**: Schema-validated data models for bookings, inquiries, reviews, and custom menu submissions.
- **Production SPA Fallback**: Serves `seisuvai-react/dist` static assets with client-side SPA routing fallback.
- **Dynamic CORS Policy**: Handles local development origins as well as production `FRONTEND_URL` and `ALLOWED_ORIGINS` environment parameters.
- **Health Monitoring Endpoint**: Dedicated `/api/health` probe endpoint positioned prior to SPA routing fallback.

---

## 📡 API Endpoints Summary

| Route | Method | Description |
|:---|:---|:---|
| `/api/health` | `GET` | System health check (`{ status: "API is running" }`) |
| `/api/enquiries` | `POST` / `GET` | Customer catering inquiry submission and admin lookup |
| `/api/bookings` | `POST` / `GET` | Event date reservation requests |
| `/api/custom-menu` | `POST` / `GET` | Custom menu builder payload storage |
| `/api/live-stalls` | `POST` / `GET` | Live counter stall requests |
| `/api/reviews` | `POST` / `GET` | Customer reviews & rating collection |

---

## 📁 Directory Layout

```
server/
├── config/
│   └── db.js                 # Mongoose connection setup
├── models/
│   ├── Booking.js            # Booking data schema
│   ├── Enquiry.js            # Standard inquiry schema
│   ├── CustomMenuRequest.js  # Custom menu builder payload schema
│   ├── LiveStallEnquiry.js   # Live counter request schema
│   └── Review.js             # Customer review schema
├── routes/
│   ├── adminRoutes.js        # Admin authorization & data routes
│   ├── bookingRoutes.js      # Booking handlers
│   ├── customMenuRoutes.js   # Custom menu handlers
│   ├── enquiryRoutes.js      # Customer enquiry handlers
│   ├── liveStallRoutes.js    # Live stall enquiry handlers
│   └── reviewRoutes.js       # Customer review handlers
└── index.js                  # Server entry point & CORS configuration
```

---

## ⚙️ Setup & Execution

```bash
# Install dependencies
npm install

# Run backend in watch mode
npm run dev

# Run in production mode
npm start
```
