# PRD: Happymart — South Asian Grocery E-Commerce Platform (Hong Kong)

**Version:** 1.0 (draft) | **Status:** For team review | **Scope:** Phase 1, web application

Related docs: `architecture.md` (how it is built), `design.md` (how it looks and behaves).

---

## 1. Summary

**Happymart** is a single-vendor online supermarket selling 4,000+ imported South Asian grocery products (India, Pakistan, Bangladesh, Nepal, Sri Lanka, Middle East/UAE) with delivery across Hong Kong. It serves South Asian residents first, plus Hong Kong locals and international shoppers who like these products.

**One-line pitch:** the range of a specialist store with the shopping experience of a modern quick-commerce app.

## 2. Problem and opportunity

- Imported South Asian groceries in Hong Kong are mostly sold in physical shops or on small websites with outdated UI, weak search and poor product discovery.
- Large platforms (foodpanda, HKTVmall) serve mainstream demand and do not specialise in these products.
- Gap: nobody combines a large South Asian range, modern design, fast delivery and English plus Traditional Chinese.

### Competitors

| Platform | Strength | Weakness | Our edge |
|---|---|---|---|
| foodpanda | Fast delivery, big user base | Little South Asian import range | Dedicated range |
| HKTVmall | Huge inventory, trusted | Complex UX, ethnic groceries hard to find | Simpler, focused discovery |
| Maharaja Mart | Strong Indian import range | Traditional UX, limited features | Modern UX, five-region range |
| Hong Kong Bazaar | Niche audience | Outdated interface | Clean, fast browsing |
| Spice Store HK | Relevant products | Basic experience, small range | Rich visuals, search, reorder |

## 3. Goals and non-goals

### Goals
1. Establish Happymart as the preferred online store for South Asian groceries in Hong Kong.
2. Fast, mobile-first shopping with large product images and clear categories.
3. Make 4,000+ products easy to find (search, filters, brands, categories).
4. Let the client run daily operations from an admin dashboard without developers.
5. Build an API and shared schemas that a mobile app can reuse in Phase 2.

### Non-goals (Phase 1)
- Mobile apps (hybrid in Phase 2, native later).
- AI assistant, voice search, family accounts, smart reordering (Future).
- Multi-vendor marketplace features.
- Rider mobile app and warehouse management beyond basic inventory.

## 4. Users

| Persona | Needs | Pain points |
|---|---|---|
| South Asian families | Familiar brands, imported ingredients, reliable home delivery | Few local sources, many shops to visit, poor online stores |
| Young professionals and students | Quick ordering, easy reorder, mobile-friendly | No time to shop, hard to find specific imports |
| Food enthusiasts and locals | Authentic ingredients, discovery, recipes | Don't know what exists or which brands are authentic |
| Store staff (admin) | Manage catalogue, orders, delivery, marketing | Manual work, no visibility |

Admin roles: Super Admin, Manager, Catalogue Editor, Order Operator, Delivery Coordinator, Support, Marketing.

## 5. Success metrics

| Metric | Target (6 months after launch, to be validated with client) |
|---|---|
| Monthly orders and revenue | Set with client; track growth monthly |
| Mobile conversion rate | Track; improve each quarter |
| Repeat order rate (30/60 day) | Track; reorder feature drives it |
| Cart abandonment | Track; optimise checkout |
| On-time delivery rate | 95%+ |
| Core Web Vitals (mobile) | LCP < 2.5 s, INP < 200 ms, CLS < 0.1 |
| Zero-result searches | Under 5% of searches |
| Organic search traffic | Growing month on month |

## 6. Scope: functional requirements

Priority: **M** must have (launch), **S** should have (soon after), **F** future.

### 6.1 Customer storefront

| ID | Requirement | Pri |
|---|---|---|
| FR-AUTH-1 | Sign up with email or HK mobile; OTP verification; consent checkboxes | M |
| FR-AUTH-2 | Login with password or OTP; Google/Apple login | M / S |
| FR-AUTH-3 | Password reset, logout all devices, delete account and export data (PDPO) | M |
| FR-ADDR-1 | Address book with HK fields: Region, District, Zone, Building, Tower, Floor, Unit, notes, default | M |
| FR-NAV-1 | Announcement bar with CTA; header with search, language, theme, wishlist, account, cart | M |
| FR-NAV-2 | Mega menu: categories with sub-category dropdowns, thumbnails, featured brands | M |
| FR-HOME-1 | Home: hero banners (clickable, scheduled), category tiles, brand strip, Popular, New Arrivals, collections, reorder strip | M |
| FR-HOME-2 | Personalised recommendations | S |
| FR-CAT-1 | Listing pages by category, sub-category, brand and collection using one shared layout | M |
| FR-CAT-2 | Filters: brand, country, price, veg/non-veg, halal, offers, in stock, pack size; sorting | M |
| FR-SRCH-1 | Search with suggestions (products, categories, brands), typo tolerance, English and Chinese | M |
| FR-PDP-1 | Product page: gallery, price/MRP/discount, pack-size variants, stock, delivery checker, details tabs (description, ingredients, nutrition, storage, origin, expiry) | M |
| FR-PDP-2 | Related products and bundles; reviews and ratings | M / S |
| FR-CART-1 | Cart: add, update, remove, save for later, coupon, free-delivery progress; server cart for guests and users; merge on login | M |
| FR-CHK-1 | Checkout: address, delivery type and slot, notes, payment, review; guest checkout with OTP | M |
| FR-DLV-1 | Delivery types: Instant and Same day (selected areas), Scheduled (all HK); options shown only if valid for the address | M |
| FR-PAY-1 | Online payment through the configured gateway (Razorpay chosen, see open questions) | M |
| FR-ORD-1 | Order confirmation, history, detail, live tracking (Placed, Picking, Packing, Rider assigned, Out for delivery, Delivered) | M |
| FR-ORD-2 | Reorder, cancel (until picking), invoice PDF, refund request | M |
| FR-WISH-1 | Wishlist and back-in-stock alerts | S |
| FR-OFFER-1 | Coupons, loyalty points, referral | S |
| FR-SUP-1 | Help centre/FAQ, contact form, WhatsApp button, policy pages (terms, privacy, refunds, shipping, cookies) | M |
| FR-NOTIF-1 | Email and SMS for OTP, order events, refunds | M |
| FR-PREF-1 | Language (English, Traditional Chinese), light/dark/system theme, cookie consent | M |
| FR-FUT-1 | AI shopping assistant, voice search, family accounts, smart reordering | F |

### 6.2 Admin dashboard

| ID | Requirement | Pri |
|---|---|---|
| FR-ADM-1 | Dashboard: KPIs, sales chart, orders by status, alerts, top products | M |
| FR-ADM-2 | Product management: list/filter/bulk actions, bilingual form, variants, images, SEO fields, CSV import/export | M |
| FR-ADM-3 | Category tree (3 levels, drag reorder) and brands | M |
| FR-ADM-4 | Inventory: stock levels, adjustments with reasons, low-stock alerts, movement ledger | M |
| FR-ADM-5 | Orders: filters, status workflow, picking list, substitutions, rider assignment, notes, print slips | M |
| FR-ADM-6 | Payments and refunds (full/partial), reconciliation export | M |
| FR-ADM-7 | Delivery: zones by district, slot templates and capacity, fees, cut-offs, riders, holidays | M |
| FR-ADM-8 | Customers: search, order history, notes, block | M |
| FR-ADM-9 | Marketing/content: banners, announcement bar, collections, coupons, CMS pages, FAQs | M |
| FR-ADM-10 | Reports with export (sales, products, customers, delivery, searches) | M |
| FR-ADM-11 | Staff, role permission matrix, audit log | M |
| FR-ADM-12 | Settings: store info, notifications, SEO defaults, maintenance mode | M |
| FR-ADM-13 | Reviews moderation and contact inbox | S |

## 7. Key user stories and acceptance criteria

1. **Browse and add**
   *As a shopper, I want to filter products and add them quickly so I can build my basket fast.*
   - Given a listing page, when I apply a filter, the URL updates and the grid refreshes with skeletons, no full reload.
   - When I tap Add, the button becomes a quantity stepper and the cart count updates immediately.
   - Out-of-stock products show Notify me instead of Add.
2. **Checkout with valid delivery**
   *As a shopper, I only want to see delivery options that work for my address.*
   - Given my district, checkout shows only enabled delivery types and available slots with fees.
   - If a slot fills while I check out, it is disabled and I keep my form data.
3. **Pay safely**
   - The server computes all totals; the browser never sets the price.
   - A payment confirmed by webhook completes the order even if the browser closed.
   - Retrying after failure never creates a duplicate order (idempotency key).
4. **Reorder**
   - From the home page or order detail, one tap adds available items from a past order; unavailable items are listed.
5. **Track**
   - Order page shows a timeline with timestamps and refreshes within 30 seconds of a status change.
6. **Admin fulfilment**
   - An operator filters orders by slot, opens the picking list, marks items picked or short, packs, assigns a rider and sets Out for delivery; customer is notified at each customer-visible step.
7. **Admin bulk import**
   - Uploading a CSV runs a dry run, shows errors per row, and only valid rows import after confirmation.

## 8. Localisation requirements

- Languages: English and Traditional Chinese (URL prefix `/en`, `/zh-hk`); product and category content stored in both, falling back to English.
- Currency HKD; dates in Asia/Hong_Kong.
- Address structure as in FR-ADDR-1.
- Payment methods requested by client: Stripe, Apple Pay, PayMe, AlipayHK, WeChat Pay HK. Gateway chosen by the team: Razorpay (see section 12).
- One warehouse at launch: Instant and Same day limited to selected districts; Scheduled everywhere possible.

## 9. Non-functional requirements

| Area | Requirement |
|---|---|
| Performance | Mobile LCP < 2.5 s, INP < 200 ms, CLS < 0.1; API read p95 < 300 ms |
| Availability | 99.5%+ monthly; daily backups; tested restore |
| Security | HTTPS, hashed passwords, JWT with refresh rotation, RBAC, rate limits, input validation, audit log, no card data stored |
| Privacy | Hong Kong PDPO: purpose statement, access/correction/deletion, marketing opt-in, cookie consent |
| Accessibility | WCAG 2.1 AA, keyboard support, contrast in both themes |
| SEO | Server-rendered or prerendered public pages, structured data, sitemaps, hreflang |
| Compatibility | Latest two versions of Chrome, Safari, Edge, Firefox; iOS Safari and Android Chrome; widths 360 to 1536 px |
| Scalability | Stateless API, Redis cache, CDN for assets; can add warehouses and a mobile app without redesign |
| Maintainability | TypeScript strict, shared zod schemas, tests, CI, documented API |

## 10. Release plan

| Phase | Weeks | Outcome |
|---|---|---|
| 0 Discovery and decisions | 1-2 | Scope signed off, decisions closed |
| 1 UX/UI design | 1-5 | Approved Figma, light and dark |
| 2 Foundation | 3-6 | Monorepo, CI/CD, auth, DB, theme, i18n |
| 3 Catalogue and admin core | 5-9 | Admin manages the catalogue; CSV import |
| 4 Storefront core | 7-13 | Browse, search, PDP, cart |
| 5 Checkout, payments, orders | 11-15 | Paid test order end to end |
| 6 Operations and marketing | 15-17 | Fulfilment, refunds, coupons, banners, CMS, reports |
| 7 Polish | 17-19 | Chinese content, SEO, performance, accessibility |
| 8 QA and UAT | 19-21 | No S1/S2 bugs, client sign-off |
| 9 Launch and hypercare | 21-22+ | Live |

Assumes a team of about five; a solo developer should plan roughly 36 to 44 weeks. Phase 2 (mobile app) follows launch.

## 11. Dependencies and assumptions

- Client supplies brand assets, product data (CSV) and photos (first 500 by week 8, all by week 18), legal pages, delivery model and domain access.
- Launch can go live with the best-selling 1,000 to 1,500 complete products and publish the rest in batches.
- Delivery by in-house riders or a partner is decided by the client by week 6.

## 12. Risks and open questions

| # | Item | Action |
|---|---|---|
| 1 | **Razorpay eligibility for a Hong Kong merchant.** Razorpay's docs list India, Malaysia, Singapore and the US as available regions; HKD acceptance exists for Indian merchants through its international payments feature (approval needed, INR settlement). Local wallets (PayMe, AlipayHK, WeChat Pay HK) are not covered. | Confirm with Razorpay in writing in Phase 0; keep a payment-provider abstraction and a backup provider |
| 2 | SEO risk with a client-rendered React SPA | Decide Next.js storefront vs prerendering before foundation (see `architecture.md`) |
| 3 | Product data and photo quality for 4,000+ items | CSV template in week 1, validation import tool, start data work early |
| 4 | Delivery operations undefined | Client workshop by week 6; configurable zones and slots |
| 5 | Stock accuracy | Inventory ledger, substitution flow, picking checks |
| 6 | Scope creep | Change control; Future items frozen |
| 7 | Imported food labelling rules | Client confirms; configurable product fields |

Open questions for the client: delivery areas and cut-offs, riders or partner, minimum order and fee rules, brand assets and logo (brand name confirmed: Happymart), which Should-have features launch day one, legal wording for policies.