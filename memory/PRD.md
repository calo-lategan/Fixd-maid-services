# Fixd Maid Services — Landing Website

## Problem Statement
Build a professional cleaning services landing website for "Fixd Maid Services" in Dubai with WhatsApp CTA, contact form, services grid, pricing, testimonials, Google Map embed, and mobile-first design.

## Architecture
- **Frontend**: React single-page landing page with Tailwind CSS, Outfit/Manrope fonts, Lucide React icons
- **Backend**: FastAPI with MongoDB — handles contact form submissions
- **Deployment**: Kubernetes container (preview at spotless-dubai.preview.emergentagent.com)

## Core Requirements (Static)
1. Hero section with headline, WhatsApp CTA, rating badge, and hero image
2. Trust section (4 checkmarks on blue banner)
3. Services section (5 cards: Home, Deep, Move-in/out, Office, Sofa & Carpet)
4. How It Works section (4 steps with large background numbers)
5. Before/After section (2 comparison pairs)
6. Pricing section (AED 45/hr Standard + Custom Deep Clean)
7. Testimonials (3 real Google reviews, 4.7★ 274 reviews)
8. Contact form (Name + Phone + Service + Message → POST /api/contact)
9. Google Map embed (Dubai Sports City)
10. Footer with social links (Instagram, Facebook, HiDubai)
11. Mobile sticky WhatsApp bar

## What's Been Implemented (May 2026)
- ✅ Full landing page with all 10 sections
- ✅ Sticky glass header with mobile hamburger menu
- ✅ WhatsApp buttons throughout (wa.me/9718003493)
- ✅ Click-to-call buttons (tel:+9718003493)
- ✅ Contact form with validation + success state + backend storage
- ✅ Google Maps embed showing Dubai Sports City
- ✅ Mobile sticky bottom CTA bar (WhatsApp + Call)
- ✅ Backend POST /api/contact endpoint with MongoDB storage
- ✅ All data-testid attributes on interactive elements
- ✅ 100% test pass rate (backend + frontend)

## Key Details
- WhatsApp: https://wa.me/9718003493
- Phone: tel:+9718003493
- Address: Stadium Point Building, Office 512, Dubai Sports City, Dubai
- Social: instagram.com/fixduae, facebook.com/fixduae
- Starting price: AED 45/hour

## Prioritized Backlog
### P0 (Critical for MVP) — DONE
- All sections, CTAs, contact form

### P1 (Enhancement)
- Replace before/after stock images with real client photos
- Add WhatsApp phone number update (confirm correct number with client)
- Add booking calendar / time slot selection

### P2 (Future)
- Admin dashboard to view contact form submissions
- Live chat widget integration
- SEO meta tags and structured data (LocalBusiness schema)
- Add Arabic language toggle for UAE market
