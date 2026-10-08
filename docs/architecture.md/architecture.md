# Architecture: Happymart — South Asian Grocery E-Commerce Platform

**Version:** 1.0 (draft) | Related: `prd.md`, `design.md`

---

## 1. Stack

| Layer | Choice | Purpose |
|---|---|---|
| Frontend | Next.js (App Router) + TypeScript | Storefront and admin UI |
| Styling / UI | Tailwind CSS, shadcn/ui (Radix) | Tokens, dark mode, accessible primitives |
| Client state | Redux Toolkit | UI state, checkout draft, auth session, theme, locale |
| Server state | RTK Query | All API data, caching, invalidation, optimistic updates |
| Routing | Next.js App Router | Nested routes, layouts, server & client transitions |
| Forms | React Hook Form + Zod | Shared validation schemas front and back |
| Backend | Node.js 20 + Express + TypeScript | REST API |
| Database | PostgreSQL 16 + Prisma | Data, full-text search, migrations |
| Cache / jobs | Redis + BullMQ | Caching, rate limits, background jobs |
| Payments | Razorpay behind a provider interface | Orders, verification, webhooks, refunds |
| Tooling | pnpm workspaces, ESLint, Prettier, Husky, commitlint, Vitest, Playwright, Storybook | Quality and workflow |

Helpful libraries: embla-carousel, framer-motion (light use), lucide-react, sonner, next-intl / i18next, @tanstack/react-table, recharts, react-dropzone, @dnd-kit, tiptap, date-fns, sharp, pino, helmet, express-rate-limit, jose or jsonwebtoken, argon2.

## 2. System overview

```
 Customers (phone / desktop)           Store staff
        |                                  |
  [ Storefront ]                     [ Admin dashboard ]
        \                                 /
         +--------- HTTPS / REST --------+
                       |
              [ Cloudflare CDN + WAF ]
                       |
               [ Express API (Node) ]
   auth | catalogue | search | cart | checkout | orders | payments | delivery | admin
         |                |                 |
   [ PostgreSQL ]    [ Redis ]      [ BullMQ workers ]
                                      |     |      |
                                   Email   SMS   Images / imports
   External: Razorpay | image storage + CDN | SMS | Email | GA4 | Sentry
```

## 3. Monorepo layout

```
grocery-platform/
  apps/
    web/      storefront (Next.js)
    admin/    admin dashboard (separate subdomain)
    api/      Express API, Prisma schema, workers
  packages/
    ui/       shared components + design tokens
    shared/   zod schemas, types, constants
    config/   eslint, tsconfig, tailwind preset
  docs/       prd.md, architecture.md, design.md, ADRs, API docs
  .github/    workflows, PR template, CODEOWNERS
  docker-compose.yml
```

### Storefront structure (`apps/web`)

```
app/        Next.js App Router (layouts, pages, error/loading states, route handlers)
features/   auth, catalogue, search, product, cart, checkout, orders, account, content, delivery
            (each: components, slice, api, hooks, schemas)
components/ Header, Footer, ImageWithFallback, UI primitives...
services/   api.ts (RTK Query base), analytics.ts
i18n/       en and zh-HK dictionaries / namespaces
lib/ hooks/ styles/ types/
```

### API structure (`apps/api/src`)

```
config/ middleware/ prisma/ jobs/ utils/
modules/  auth, users, addresses, catalogue, search, cart, checkout, orders,
          payments, delivery, coupons, loyalty, reviews, wishlist, content,
          notifications, admin, reports, uploads, settings
```

Module pattern: `routes -> controller -> service -> repository -> Prisma`. Controllers parse and respond only; services hold business rules; zod validates every request.

## 4. Rendering and SEO decision (Decided: Next.js)

Next.js App Router is confirmed as the storefront framework for optimal organic search, performance, and developer experience:

1. **Next.js App Router Storefront (Confirmed).** Server Components (RSC) and Incremental Static Regeneration (ISR) / Server-Side Rendering (SSR) for home, category, brand and product pages. High organic search ranking and fast Core Web Vitals (LCP < 2.5s).
2. **Interactive UI & Client State.** Client components (`'use client'`) are used for interactive surfaces like the cart drawer, checkout flow, filter sheets, instant search suggestions, and quantity steppers with Redux Toolkit / RTK Query.
3. **Admin Dashboard.** Admin can be hosted as a Next.js route group / sub-app or dedicated SPA.

## 5. Frontend state

Principles:
- **Server data lives in RTK Query**, never copied into slices.
- **Client-only state lives in slices.**
- **URL is state** for filters, sort, page, search query.
- **Cart is server side** for guests (cart token cookie) and users; Redux holds only UI state for the cart.
- Forms use React Hook Form; only checkout choices that must survive navigation go in Redux.

Store (storefront):

| Part | Contains | Persisted |
|---|---|---|
| `api` | RTK Query cache | No |
| `auth` | accessToken (memory), user, status, bootstrapped | No (refresh cookie restores) |
| `cart` | drawer open, pending item ids, last added id | No |
| `checkout` | step, addressId, deliveryType, slotId, notes, guest contact, coupon, idempotency key | sessionStorage |
| `search` | recent searches, suggest open | localStorage (recent) |
| `filters` | draft filters for the mobile sheet | No |
| `ui` | menus, modals, announcement dismissed, cookie consent | localStorage (some) |
| `theme` | light / dark / system | localStorage |
| `locale` | en / zh-HK | localStorage + URL |

Admin store: `api`, `auth` (with permissions), `ui` (sidebar), `theme`, `tablePrefs`, `import`.

RTK Query conventions:
- One base `api` with `fetchBaseQuery` plus a reauth wrapper: on 401, call `/auth/refresh` once, retry, else log out.
- Endpoints injected per feature (`api.injectEndpoints`).
- Tag types: Me, Address, Cart, Product, ProductList, Category, Brand, Banner, Order, OrderList, Wishlist, Review, Delivery, Content, Coupon.
- Mutations invalidate matching tags; cart quantity changes use optimistic `updateQueryData` with rollback.
- `keepUnusedDataFor` 60 s default; category tree 1 h; banners 10 min; active order polled every 30 s.
- Persist only small prefs through a listener middleware (no redux-persist).

## 6. Authentication and authorisation

- Access token: JWT, 15 min, in memory, sent as Bearer.
- Refresh token: opaque, 30 days, httpOnly + Secure + SameSite=Lax cookie, stored hashed, rotated on use with reuse detection.
- OTP: 6 digits, 5 min, hashed, 5 attempts, rate limited per target.
- Passwords: argon2id.
- Social login: Google and Apple ID-token verification on the server.
- Admin: separate `staff_users` table and token audience; RBAC with permission strings (`orders.update`); optional TOTP.
- Frontend hides UI via `PermissionGate`; the backend always enforces.

## 7. Data model (summary)

Conventions: UUID keys; money as integer cents (HKD); `created_at`/`updated_at`; soft delete on products, categories, brands, users; bilingual columns `name_en`/`name_zh`.

| Domain | Tables |
|---|---|
| Identity | users, otp_codes, refresh_tokens, social_accounts, addresses, staff_users, roles, permissions, role_permissions, audit_logs |
| Catalogue | categories, brands, products, product_variants, product_images, product_relations, collections, collection_products, inventory_movements, stock_batches (S) |
| Commerce | carts, cart_items, orders, order_items (price and name snapshots), order_status_history, payments, refunds, invoices |
| Delivery | delivery_zones, delivery_slot_templates, delivery_slots, riders, deliveries, holidays |
| Engagement and content | coupons, coupon_redemptions, banners, announcements, cms_pages, faqs, blog_posts (S), reviews (S), wishlists, stock_alerts, loyalty_ledger (S), referrals (S), notifications, newsletter_subscribers, contact_messages, search_logs, settings |

Key relations: users 1-* orders; orders 1-* order_items; products 1-* product_variants; categories self-referencing (max 3 levels); orders *-1 delivery_slots; orders 1-* payments 1-* refunds.

Indexes: all foreign keys; `products(category_id, status)`; GIN on `search_vector`; trigram on product names; unique `delivery_slots(date, start_time, delivery_type)`; unique `payments.provider_payment_id`; unique `orders.idempotency_key`.

### Order placement (single transaction)

1. Lock variant rows (`FOR UPDATE`) and verify stock for every line.
2. Lock the slot row; require `booked_count < capacity`; increment.
3. Validate and record coupon redemption.
4. Create order, order_items (with snapshots), status history (pending_payment).
5. Reserve stock via an inventory movement; release if unpaid after 15 minutes (job).
6. Create the provider order and return client payload.

### Search

`search_vector` (weighted tsvector for English) plus `pg_trgm` for typo tolerance and Chinese names; suggestions via trigram prefix match, cached 30 s in Redis; synonym map (atta/flour, dal/lentils). Move to Meilisearch or Typesense if scale demands.

## 8. API conventions

- Base `/api/v1`, REST, JSON. Admin under `/api/v1/admin/*`.
- Envelope: `{ success, data, meta }` and `{ success:false, error:{ code, message, fields, requestId } }`.
- Errors: 400 VALIDATION_ERROR, 401 UNAUTHENTICATED/TOKEN_EXPIRED, 403 FORBIDDEN, 404 NOT_FOUND, 409 CONFLICT/OUT_OF_STOCK/SLOT_FULL, 422 BUSINESS_RULE, 429 RATE_LIMITED, 500 INTERNAL_ERROR.
- Pagination `page`, `pageSize` (max 100); sort and filter params mirror the storefront URL (`brand`, `country`, `minPrice`, `maxPrice`, `veg`, `halal`, `inStock`, `offer`, `sort`).
- `Accept-Language` selects `en` or `zh-HK`.
- `Idempotency-Key` required on order creation and payment verification.
- OpenAPI generated from zod schemas, served at `/api/docs` on staging.

Main endpoint groups:

| Group | Examples |
|---|---|
| Auth | `POST /auth/signup`, `/auth/otp/request`, `/auth/otp/verify`, `/auth/login`, `/auth/refresh`, `/auth/logout` |
| Account | `GET/PATCH /me`, `/me/addresses`, `/me/orders`, `/me/wishlist` |
| Catalogue | `GET /categories/tree`, `/products`, `/products/facets`, `/products/:slug`, `/brands`, `/collections`, `/banners`, `/search/suggest` |
| Cart and checkout | `GET /cart`, `PUT /cart/items`, `POST /cart/coupon`, `POST /cart/merge`, `GET /delivery/check`, `/delivery/slots`, `POST /checkout/quote`, `POST /orders` |
| Payments | `POST /payments/razorpay/verify`, `POST /payments/razorpay/webhook` |
| Admin | products, categories, brands, inventory, orders (status, items, assign-rider, notes, picking-list), refunds, delivery, customers, banners, coupons, pages, reports, staff, roles, audit-logs, settings |

## 9. Payments

**Open item:** Razorpay's public docs list India, Malaysia, Singapore and the US as supported regions, not Hong Kong; HKD works for Indian merchants through the international payments feature (needs approval; INR settlement); PayMe, AlipayHK and WeChat Pay HK are not covered. Confirm eligibility before the payments phase.

Design: a `PaymentProvider` interface (`createOrder`, `verifyPayment`, `handleWebhook`, `refund`) with Razorpay as the first adapter, selected by `PAYMENT_PROVIDER`.

Flow:
1. `POST /orders` creates the order (pending_payment) and a Razorpay order (amount in cents, currency HKD).
2. Frontend lazy-loads Razorpay Checkout and opens it with the returned order id.
3. On success the browser calls `/payments/razorpay/verify`; the server checks HMAC SHA256 of `order_id|payment_id` with the key secret (timing-safe compare).
4. Webhooks (`payment.captured`, `payment.failed`, `refund.processed`) are the source of truth; verify signature on the raw body; updates are idempotent.
5. Amount or currency mismatch flags the order for manual review.

Edge cases: modal closed (resume payment), paid-but-browser-closed (webhook completes), duplicate events (unique `provider_payment_id`), expired reservation (auto-refund and notify). Secrets live only in server env.

## 10. Order and payment states

Order: `pending_payment -> placed -> picking -> packing -> ready_for_delivery -> out_for_delivery -> delivered`, with `delivery_failed`, `cancelled` (until picking), `refunded`, `partially_refunded`.

Payment: `created -> authorized/captured | failed | expired -> refunded/partially_refunded`.

## 11. Background jobs (BullMQ)

| Job | Trigger | Purpose |
|---|---|---|
| send-email, send-sms | event | Notifications with retries and log |
| generate-delivery-slots | nightly | Slots 14 days ahead, skip holidays |
| release-expired-orders | every 5 min | Cancel unpaid orders after 15 min; free stock and slot |
| process-images | upload | Resize to 200/400/800/1200, WebP and AVIF |
| process-csv-import | upload | Validate and import in batches of 500 |
| stock-alert-notify | stock increase | Back-in-stock notifications |
| generate-sitemaps, product-feed | nightly | SEO sitemaps and merchant feed |
| refresh-analytics-views | every 10 min | Dashboard summaries |
| payment-reconciliation | nightly | Detect mismatches |

## 12. Security

HTTPS and HSTS; helmet and strict CSP (allow Razorpay, analytics, image CDN); CORS limited to storefront and admin origins; zod validation on body, query and params with unknown keys rejected; Prisma parameterised queries only; sanitise rich text (DOMPurify); uploads via signed URLs with type and size checks and re-encoding; login and OTP rate limits; secrets from a secret manager; Dependabot and `npm audit` in CI; no secrets, tokens or OTPs in logs; audit log on admin writes; daily backups with restore drills; OWASP ZAP scan before launch.

Privacy (PDPO): purpose statement, access/correction/deletion, marketing opt-in, cookie consent, data export and account deletion.

## 13. Performance

- Next.js route-level code splitting, streaming Server Components, and dynamic imports (`next/dynamic`) for Razorpay, charts, and rich text editor; minimal initial client bundle.
- Images: `next/image` with AVIF/WebP, responsive srcset, lazy loading, blur placeholders, and CDN caching.
- Redis caching for category tree, banners, facets, suggestions; ETag/Cache-Control on public GETs and Next.js ISR tag-based cache invalidation.
- Indexes and `EXPLAIN` review; avoid N+1; keyset pagination for large admin tables.
- Third-party scripts deferred using `next/script` until idle or interaction.
- Budgets enforced by Lighthouse CI: mobile Performance 85+, SEO 95+.

## 14. Environments and deployment

| Environment | Purpose | Deploy trigger |
|---|---|---|
| Local | Docker Compose (Postgres, Redis, mail catcher), seed data | manual |
| Dev | Integration | merge to `develop` |
| Staging | QA/UAT, Razorpay test mode, noindex + basic auth | `release/*` branch |
| Production | Live, Razorpay live | tag `vX.Y.Z` with manual approval |

Hosting recommendation: AWS ap-east-1 (Hong Kong) or nearby, Docker containers, managed PostgreSQL with PITR, Cloudflare for CDN/DNS/WAF, object storage plus CDN for images. Migrations run as a separate reviewed step before app deploy and must be backwards compatible (add, backfill, remove later). Keep the last five image tags for rollback.

Monitoring: Sentry (web, admin, API), uptime checks on home, API health and checkout, pino JSON logs with request ids, web-vitals to GA4, DB metrics, daily payment reconciliation.

## 15. Engineering workflow

- Branches: `main` (production), `develop` (integration), `feature/*`, `fix/*`, `chore/*`, `release/x.y.z`, `hotfix/*`. Name with issue id, e.g. `feature/GRC-101-product-card`.
- Conventional Commits: `type(scope): summary` with types feat, fix, perf, refactor, style, test, docs, build, ci, chore, revert.
- PRs: squash merge into `develop`, at least one approval (two for `main`), CI green (lint, typecheck, tests, build, Lighthouse), screenshots in light and dark, mobile and desktop.
- Husky + lint-staged + commitlint run on commit; CI on every PR.
- Semantic versioning, tags on `main`, hotfix branches from `main` merged back into `develop`.
- Definition of Done: acceptance criteria met; mobile and desktop, light and dark, en and zh-HK; loading, empty and error states; tests added; accessibility checked; API docs and migrations included; reviewed and merged.

## 16. Testing

| Level | Tools | Scope |
|---|---|---|
| Unit | Vitest | Utils, reducers, selectors, pricing and coupon logic |
| Component | React Testing Library, Storybook | Cards, steppers, forms, states |
| API | Vitest/Jest, Supertest, test DB | Auth, order transaction, webhooks |
| E2E | Playwright (mobile and desktop, both themes) | Guest checkout, signup/login, cart merge, payment failure and retry, admin fulfilment |
| Performance/SEO | Lighthouse CI | Budgets per template |
| Accessibility | axe-core plus manual pass | WCAG AA |
| Next.js / Core Web Vitals | Lighthouse CI | LCP < 2.5s, INP < 200ms, CLS < 0.1 |

## 17. Decisions to close in Phase 0

| ID | Decision | Owner | Status |
|---|---|---|---|
| D3 | Payment gateway eligibility and fallback | Lead + client | Open |
| D4 | Storefront rendering framework | Lead | Decided: Next.js (App Router) |
| D6 | Image hosting and CDN (Cloudinary vs S3 + CloudFront) | Lead | Open |
| D7 | SMS provider for OTP | Lead + client | Open |
| D8 | Delivery operations model | Client | Open |
| D9 | Brand name, domain, design approval | Client | Brand name confirmed: Happymart |