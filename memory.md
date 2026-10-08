# Happymart — Project Memory & Architectural Ledger

**Last Updated:** Current Session  
**Project Name:** Happymart (Online Supermarket for South Asian Groceries in Hong Kong)  
**Scope:** Phase 1 Web Application (Customer Storefront + Admin Operations Dashboard)

---

## 1. Project Overview & Decisions

- **Domain & Market:** Single-vendor online supermarket selling 4,000+ imported South Asian grocery items (India, Pakistan, Bangladesh, Nepal, Sri Lanka, UAE/Middle East) with territory-wide Hong Kong delivery.
- **Localisation:** Bilingual across English (`en`) and Traditional Chinese (`zh-hk`). Currency: `HKD` (integer cents in backend / formatted as `HK$XX.XX`).
- **Storefront Architecture Decision (D4 Closed):** Next.js App Router confirmed for hybrid rendering (Server Components for SEO and catalog listings, Client Components for interactive drawers and checkout steppers).
- **Brand Confirmation:** Brand name is officially **Happymart**.

---

## 2. Shared Types Rule (Critical)

> [!IMPORTANT]
> **Shareable Type Definitions Rule:**  
> All domain models, entity interfaces, and cross-boundary types that can be shared across the storefront (`apps/web`), future admin (`apps/admin`), backend (`apps/api`), or shared packages MUST be defined and exported from `@workspace/typescript-config` under:  
> `packages/typescript-config/src/types/index.ts` (accessible via `@workspace/typescript-config/types`).
>
> Applications should import from `@workspace/typescript-config/types` instead of declaring duplicate local interfaces.

### Exported Shared Types Inventory:
1. **Identity & Auth:** `User`, `StaffUser`, `UserRole`, `AuthStatus`
2. **Catalogue:** `Category`, `Brand`, `Product`, `ProductVariant`, `ProductBadge`
3. **Cart & Commerce:** `CartItem`, `Cart`, `ApiResponse<T>`, `ApiError`
4. **Checkout & Logistics:** `DeliveryType`, `DeliverySlot`, `HongKongAddress`, `GuestContact`, `PaymentStatus`, `CheckoutDraft`
5. **Preferences:** `ThemeMode`, `LanguageLocale`

---

## 3. Design System & Theming Tokens

- **Listing Inspiration:** DMart (dense, image-first catalog grid with prominent pricing and stepper buttons).
- **Color Palette:**
  - **Primary:** Deep Green (`#1F6F54` light / `#3DB88B` dark)
  - **Accent:** Saffron (`#E8A33D` light / `#F0B45A` dark)
  - **Surfaces:** Light (`#FFFFFF`, `#F4F6F5`), Dark (`#0F1512`, `#18211D`)
- **Semantic Badges:** Veg (green dot), Non-veg (red dot), Halal, New Arrival, Discount %, Low Stock, Out of Stock.
- **Typography:** Poppins / Plus Jakarta Sans + Noto Sans HK (headings); Inter + Noto Sans HK (body & tabular numbers).
- **Dark Mode Strategy:** Tailwind `darkMode: ['class']` with Next.js `next-themes` and neutral product photo tiles.

---

## 4. State Management Architecture (Redux Toolkit & RTK Query)

- **Server State:** Managed strictly by RTK Query in `apps/web/services/api.ts`. Never duplicated into Redux slices.
  - Base query handles credentials (cookies) and token attachment.
  - Automatically handles 401 reauth / token refresh via `/auth/refresh`.
  - 15 cache tag types: `'Me'`, `'Address'`, `'Cart'`, `'Product'`, `'ProductList'`, `'Category'`, `'Brand'`, `'Banner'`, `'Order'`, `'OrderList'`, `'Wishlist'`, `'Review'`, `'Delivery'`, `'Content'`, `'Coupon'`.
- **Client State:**
  - `authSlice`: Memory-only JWT `accessToken`, user profile, auth status.
  - `cartSlice`: UI drawer open/close, pending item IDs, animated item ID.
  - `checkoutSlice`: Active step, address, delivery slot, guest contact (synced to `sessionStorage`).
  - `searchSlice`: Recent search history (max 8, synced to `localStorage`), suggestions open flag.
  - `filtersSlice`: Transient draft filters for mobile bottom sheet.
  - `uiSlice`: Mobile menu, auth modals, announcement banner dismissals, cookie consent.
  - `themeSlice`: Light, dark, system mode (synced to `localStorage`).
  - `localeSlice`: `en`, `zh-HK` preference (synced to `localStorage` + URL route prefix).
- **App Router Integration:** Wrapped in `StoreProvider` client component with per-request `makeStore()` and `useRef`.

---

## 5. Implementation History & Verification Log

- [x] Updated [PRD.md](file:///d:/CODING/NavigoTech%20Innovation/Happymart/docs/products/PRD.md) with confirmed brand name **Happymart**.
- [x] Updated [architecture.md](file:///d:/CODING/NavigoTech%20Innovation/Happymart/docs/architecture.md/architecture.md) adopting **Next.js (App Router)**.
- [x] Authored [design.md](file:///d:/CODING/NavigoTech%20Innovation/Happymart/docs/products/design.md) with full design system specifications.
- [x] Authored [redux.md](file:///d:/CODING/NavigoTech%20Innovation/Happymart/docs/architecture.md/redux.md) documenting the RTK & RTK Query architecture.
- [x] Installed `@reduxjs/toolkit` and `react-redux` in `apps/web`.
- [x] Implemented all Redux slices, base API with reauth, listeners, store, and typed hooks.
- [x] Implemented `@workspace/typescript-config/types` with central domain types and wired path aliases.
- [x] Verified zero TypeScript errors (`tsc --noEmit`), zero ESLint errors, and successful Next.js production build (`next build`).
- [x] Configured [packages/ui/src/styles/globals.css](file:///d:/CODING/NavigoTech%20Innovation/Happymart/packages/ui/src/styles/globals.css) with Happymart design system tokens (Deep green `#1F6F54`, Saffron `#E8A33D`, semantic badges, 8px inputs, 12px cards).
- [x] Implemented core UI primitives in `@workspace/ui`: `Badge` (with `veg`, `non-veg`, `halal`, `offer`, `lowStock`, `outOfStock` variants & dot indicator), `Card`, `Input`, `Skeleton`, and `Button`.
- [x] Authored [resuable-components.md](file:///d:/CODING/NavigoTech%20Innovation/Happymart/docs/architecture.md/resuable-components.md) specifying Foundation (§9.1), Commerce (§9.2), Admin (§9.3), and Component Rules (§9.4).
- [x] Implemented modular reusable commerce components in `apps/web/components`:
  - `PriceBlock`: Tabular numbers, automated discount %, HKD formatting.
  - `QuantityStepper`: Ergonomic stepper with bound limits and delete action.
  - `AddToCartButton`: Default button with animated transition into stepper and out-of-stock fallback.
  - `ProductCard` & `ProductCardSkeleton`: 1:1 image frame, dietary badges, 2-line clamped title, and wishlist trigger.
  - `EmptyState`: Contextual empty views with icons and actions.
  - `AnnouncementBar`: Dismissible banner connected to Redux `uiSlice`.
  - `ThemeToggle`: Sun/moon toggle wired to `next-themes` and `themeSlice`.
- [x] Updated Storefront Home page assembling sections entirely with reusable components.
- [x] Verified zero TypeScript errors (`tsc --noEmit`), zero ESLint errors, and successful Next.js production build (`next build`).
- [x] Expanded `@workspace/typescript-config/types` with complete supermarket models: `Country`, `Subcategory`, `Banner`, `Collection`, `Order`, `Product` (with `originCountry`, `badges`, `variants`, `packSize`).
- [x] Created and structured `@workspace/mock-data` package with authentic South Asian datasets across India, Pakistan, Bangladesh, Nepal, Sri Lanka, and UAE:
  - `categories.ts` (12 supermarket aisles + subcategories)
  - `brands.ts` (India Gate, Daawat, Aashirvaad, Shan, MDH, Haldiram's, Amul, Britannia, Pran, Wai Wai, Dilmah, Bateel)
  - `countries.ts` (6 countries with flags, descriptions, and SKU counts)
  - `products.ts`, `popular-products.ts`, `new-arrivals.ts`, `recommendations.ts`
  - `banners.ts`, `collections.ts`, `orders.ts` (for quick reordering), `home-page.ts` (trust badges).
- [x] Architected and delivered production-grade 15-section supermarket homepage in [apps/web/app/page.tsx](file:///d:/CODING/NavigoTech%20Innovation/Happymart/apps/web/app/page.tsx):
  1. Announcement Bar (32-40px, HK$500 free shipping, dismissible)
  2. Sticky Supermarket Header (Logo, dominant search bar, language switcher, theme toggle, wishlist, account, cart counter)
  3. Image-Supported Mega Menu (12 aisles, subcategories, featured brands)
  4. 70/30 Hero Section (Main festive campaign + 2 side campaign cards)
  5. Trust Strip (Authentic imports, secure HK payments, territory-wide delivery, WhatsApp support)
  6. Shop By Country (6 origin countries cards with flags)
  7. Shop By Category (Image-first dense aisle grid)
  8. Reorder Section ("Buy Again" 1-click reorder from last delivered order)
  9. Popular Products (12 top staples horizontal rail with arrows and snap)
  10. Shop By Brand (Heritage brand logo cards)
  11. Festival Collections (Seasonal curations: Ramadan, Pakistan, Indian Pantry, Chai Corner)
  12. New Arrivals (Latest imported products rail)
  13. Recommended For You (Chef & family choice product rail)
  14. WhatsApp Support + Newsletter Signup (Direct WhatsApp chat link + promo email subscription)
  15. Comprehensive Supermarket Footer (Aisles, countries, policies, payment badges, bilingual HKD selector)
  - Mobile Overlays: MobileBottomNav (5 thumb actions), MobileDrawer, and CartDrawer with free shipping progress bar.
- [x] Verified zero TypeScript errors (`tsc --noEmit`), zero ESLint errors, and successful Next.js Turbopack production build (`next build`).
- [x] Integrated brand logo asset `Happymartlogo.png` (`/images/brand/Happymartlogo.png`) across Header ([header.tsx](file:///d:/CODING/NavigoTech%20Innovation/Happymart/apps/web/components/layout/header.tsx)), Mobile Drawer ([mobile-drawer.tsx](file:///d:/CODING/NavigoTech%20Innovation/Happymart/apps/web/components/layout/mobile-drawer.tsx)), and Footer ([footer.tsx](file:///d:/CODING/NavigoTech%20Innovation/Happymart/apps/web/components/layout/footer.tsx)) using `next/image`.
- [x] Installed `swiper` in `apps/web` and built reusable, production-grade `HeroCarousel` ([hero-carousel.tsx](file:///d:/CODING/NavigoTech%20Innovation/Happymart/apps/web/components/commerce/hero-carousel.tsx)) featuring full-width/full-height layout, cross-fade effect, autoplay with pause-on-hover, custom arrow controls, and slide counter. Integrated into [hero-section.tsx](file:///d:/CODING/NavigoTech%20Innovation/Happymart/apps/web/components/home/hero-section.tsx) and documented in [resuable-components.md](file:///d:/CODING/NavigoTech%20Innovation/Happymart/docs/architecture.md/resuable-components.md).
- [x] Generated authentic South Asian supermarket campaign poster backgrounds for all 4 campaigns (`ramadan-campaign-bg.jpg`, `diwali-campaign-bg.jpg`, `pakistan-campaign-bg.jpg`, `staples-campaign-bg.jpg`), saved in `apps/web/public/images/banners/`, wired in `@workspace/mock-data`, and rendered with dual readability gradients and zoom micro-interactions in `HeroCarousel`.
- [x] Updated [country-section.tsx](file:///d:/CODING/NavigoTech%20Innovation/Happymart/apps/web/components/home/country-section.tsx) with square-shaped (`aspect-square`) landmark/produce imagery for all 6 origin countries (India, Pakistan, Bangladesh, Nepal, Sri Lanka, UAE) with floating flag pills, SKU count badges, and smooth hover zoom interactions.
