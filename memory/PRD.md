# Fixd Maid Services — Landing Website

## Problem Statement
Professional cleaning services landing website for Fixd Maid Services Dubai with admin panel.

## Architecture
- **Frontend**: React SPA — Tailwind CSS, Outfit/Manrope fonts, Lucide React, React Router
- **Backend**: FastAPI + MongoDB — contact form, admin auth (JWT), settings API, email via Resend, Google Calendar OAuth
- **Deployment**: https://spotless-dubai.preview.emergentagent.com

## What's Been Implemented (May 2026)
### Landing Page
- ✅ Sticky glass header with live phone/WhatsApp from settings API
- ✅ Hero section with real Fixd team photo (mopping cleaner)
- ✅ Trust bar (4 checkmarks on blue banner)
- ✅ Services section (5 real company photos — Home, Deep, Move-in/out, Office, Sofa)
- ✅ How It Works (4 steps)
- ✅ Photo Gallery (8 real Fixd company photos, 4-column grid)
- ✅ Facebook Reel video embed
- ✅ Pricing section (AED 35/hr without materials, AED 45/hr with materials + "Book 3hrs get 1 free" promo)
- ✅ Google Reviews widget (Google-branded, 4.7★, 274 reviews, rating bars)
- ✅ Booking form (Name, Phone, Service, Date, Time picker + quick slots)
- ✅ Google Calendar add-event link after booking
- ✅ WhatsApp pre-filled booking message
- ✅ Google Maps embed (Dubai Sports City)
- ✅ Footer with logo, social links, address
- ✅ Mobile sticky WhatsApp/Call bar

### Admin Panel (/admin)
- ✅ JWT-authenticated admin login (password: Fixd@Admin2024)
- ✅ Bookings tab — view all contact form submissions, mark status, reply on WhatsApp
- ✅ Settings tab — update phone, WhatsApp, notification email, hours, address (live on website)
- ✅ Change admin password from settings tab
- ✅ Calendar tab — Google Calendar OAuth setup wizard (3-step guide)
- ✅ Email notifications via Resend on every booking

## Key Details
- WhatsApp: https://wa.me/971509244492
- Phone: 050 924 4492
- Resend API key: set in .env
- NOTIFICATION_EMAIL: needs to be set in admin settings panel
- Admin default password: Fixd@Admin2024 (change via Settings tab)

## P0 — DONE
## P1 — Remaining
- Set NOTIFICATION_EMAIL via admin settings to activate email alerts
- Google Calendar: provide GOOGLE_CLIENT_ID + GOOGLE_CLIENT_SECRET to connect
- Add real before/after client photos if available

## P2 — Future
- Arabic language toggle for UAE market
- SEO meta tags + LocalBusiness schema
- Live chat integration
