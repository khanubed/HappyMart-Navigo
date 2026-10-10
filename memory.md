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
2. **Catalogue:** `ParentCategory`, `Category`, `Subcategory`, `Brand` (with `nameEn`, `nameZh`, `descriptionEn`, `descriptionZh`, `isActive`, `sortOrder`), `Country`, `Product` (with `nutrition`, `allergens`, `usageInstructions`, `reviews`), `ProductVariant`, `ProductNutrition`, `ProductReviewItem`, `ProductBadge`, `Banner`, `Collection`
3. **Cart & Commerce:** `CartItem`, `Cart`, `ApiResponse<T>`, `ApiError`
4. **Checkout & Logistics:** `DeliveryType`, `DeliverySlot`, `HongKongAddress`, `GuestContact`, `PaymentStatus`, `CheckoutDraft`, `Order`
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
- [x] Implemented reusable `SectionHeader` component ([section-header.tsx](file:///d:/CODING/NavigoTech%20Innovation/Happymart/apps/web/components/common/section-header.tsx)) featuring semantic eyebrow label, customizable headline with serif/italic accent typography, explanatory subtitle, and optional right-aligned "View All" link. Refactored homepage sections (`category-grid.tsx`, `country-section.tsx`, `brand-carousel.tsx`, `festival-collections.tsx`, `product-rail.tsx`, `browse-carousel.tsx`, `reorder-section.tsx`) to eliminate duplicate header markup.
- [x] Re-architected catalog hierarchy to support simplified two-level department and subcategory structure:
  - Created `packages/mock-data/src/parent-categories.ts` declaring 7 flagship supermarket departments: Food & Beverages, Wellness Store, Personal & Beauty Care, Baby Care, Home Care, Ayurvedic Products, and Sports Store.
  - Added localized subcategories with authentic photography and mapped products accordingly.
  - Upgraded `MegaMenu` ([mega-menu.tsx](file:///d:/CODING/NavigoTech%20Innovation/Happymart/apps/web/components/layout/mega-menu.tsx)) with dynamic multi-column flyout displaying subcategory cards with item counts and featured heritage brand cards with icon logos.
- [x] Implemented production-grade **Category-Wise Product Listing Page** system inspired by Bazaar5 & DMart density:
  - Built comprehensive catalog component suite under `apps/web/components/catalog/`:
    - `CategoryBreadcrumbs`: Semantic breadcrumb trail supporting bilingual labels.
    - `CategoryHeading`: Clean page heading with total SKU count badge and localized descriptions.
    - `SubcategoryRail`: Horizontally scrollable subcategory chips with active state indicators and count badges.
    - `ProductListingToolbar`: View mode toggles (grid vs. list), sort selector (Recommended, Price low-high, Price high-low, Popularity, Rating), active filter chips with 1-click removal, and mobile filter triggers.
    - `ProductFilterSidebar`: Sticky faceted sidebar with dynamic facet counting for price range, discount tiers, brands with search, countries of origin, dietary preferences (Vegetarian, Halal), pack sizes, and in-stock toggles.
    - `ProductFilterDrawer`: Mobile bottom sheet filter drawer with instant count feedback and reset actions.
    - `ProductGrid`: Dense 2-column (mobile) to 4-column (desktop) responsive grid with integrated `AddToCartButton`, stepper controls, dietary indicators, and empty state fallbacks.
    - `ProductListingView`: Client orchestrator managing bidirectionally synchronized URL query parameters (`priceMin`, `priceMax`, `discount`, `brands`, `countries`, `dietary`, `sort`, `sub`, `inStock`).
  - Implemented dynamic routes:
    - `/categories` (Master category directory)
    - `/categories/[categorySlug]` (Aisle product listing)
    - `/categories/[categorySlug]/[subcategorySlug]` (Subcategory filtered listing)
    - `/departments/[departmentSlug]` (Department-level product listing)
    - `/search` (Global catalog search with query-driven filtering)
- [x] Built reusable `CategorySeoContent` component ([category-seo-content.tsx](file:///d:/CODING/NavigoTech%20Innovation/Happymart/apps/web/components/catalog/category-seo-content.tsx)) placed below product listings, providing contextual buying guides, South Asian ingredient sourcing notes, and expandable bilingual FAQ accordions.
- [x] Architected and implemented complete **Browse Brands Directory** (`/brands`) & **Brand Detail Pages** (`/brands/[slug]`):
  - Created reusable brand components under `apps/web/components/brands/`:
    - `BrandCard` ([brand-card.tsx](file:///d:/CODING/NavigoTech%20Innovation/Happymart/apps/web/components/brands/brand-card.tsx)): Dense 155–165px directory card with 100–110px logo container, fallback monogram avatar, brand title, and verified product count badge.
    - `BrandSearch` ([brand-search.tsx](file:///d:/CODING/NavigoTech%20Innovation/Happymart/apps/web/components/brands/brand-search.tsx)): Debounced brand search input with clear button (`X`), accessible label (`sr-only`), and instant client filtering.
    - `BrandAlphabetFilter` ([brand-alphabet-filter.tsx](file:///d:/CODING/NavigoTech%20Innovation/Happymart/apps/web/components/brands/brand-alphabet-filter.tsx)): Horizontal tabs (`Popular`, `A–Z`, `0–9`) synced with URL query param `?letter=...`, mobile scrollable, and disabled states for letters with zero brands.
    - `BrandDirectoryView` ([brand-directory-view.tsx](file:///d:/CODING/NavigoTech%20Innovation/Happymart/apps/web/components/brands/brand-directory-view.tsx)): Client orchestrator managing search, letter tabs, curated Popular Brands grid (8 columns), grouped A–Z directory, and empty states.
    - `BrandSeoSection` ([brand-seo-section.tsx](file:///d:/CODING/NavigoTech%20Innovation/Happymart/apps/web/components/brands/brand-seo-section.tsx)): Brand authenticity guarantees and brand FAQ accordion.
    - `BrandHeader` ([brand-header.tsx](file:///d:/CODING/NavigoTech%20Innovation/Happymart/apps/web/components/brands/brand-header.tsx)): Brand landing banner with logo, verified origin country badge, product count badge, authenticity guarantee, and localized brand backstory.
  - Server routes:
    - `apps/web/app/brands/page.tsx`: Server component with SEO metadata, BreadcrumbList & CollectionPage JSON-LD, Suspense fallback.
    - `apps/web/app/brands/[brandSlug]/page.tsx`: Brand landing page with `ProductListingView`, BrandHeader, and standard 404 (`notFound()`) for unknown slugs.
- [x] Expanded shared mock dataset in `packages/mock-data/src/brands.ts` from 20 to **45 authentic brands** across India, Pakistan, Bangladesh, Nepal, Sri Lanka, and UAE covering A–Z and 0–9 with selector query functions (`getAllBrands`, `getFeaturedBrands`, `getBrandBySlug`, `searchBrands`, `getBrandsByInitial`, `getAvailableBrandInitials`, `getBrandLogo`).
- [x] Architected and delivered complete **Product Detail Page** system (`/products/[slug]`):
  - Created modular product components under `apps/web/components/product/`:
    - `ProductGallery` ([product-gallery.tsx](file:///d:/CODING/NavigoTech%20Innovation/Happymart/apps/web/components/product/product-gallery.tsx)): 50–55% desktop gallery with Next.js image optimization, zoom toggle, thumbnails rail, prev/next buttons, and pinned dietary/offer badges.
    - `ProductVariantSelector` ([product-variant-selector.tsx](file:///d:/CODING/NavigoTech%20Innovation/Happymart/apps/web/components/product/product-variant-selector.tsx)): Interactive pack-size pill buttons displaying variant price, availability state, and selected indicator.
    - `ProductPurchasePanel` ([product-purchase-panel.tsx](file:///d:/CODING/NavigoTech%20Innovation/Happymart/apps/web/components/product/product-purchase-panel.tsx)): Brand link, single `H1`, ratings & reviews counter, selling price with MRP strikethrough, discount %, unit price (`HK$XX / kg`), stock status, quantity stepper with `AddToCartButton`, HK delivery info box (free shipping over HK$500, next-day window), and social share/wishlist triggers.
    - `ProductInformation` ([product-information.tsx](file:///d:/CODING/NavigoTech%20Innovation/Happymart/apps/web/components/product/product-information.tsx)): Comprehensive tabbed panel covering About Product, 2-column Specifications table, Ingredients & Nutrition Facts table, Cooking & Storage Guidelines, and Customer Reviews with star breakdowns.
    - `ProductFaq` ([product-faq.tsx](file:///d:/CODING/NavigoTech%20Innovation/Happymart/apps/web/components/product/product-faq.tsx)): Contextual product FAQs with accessible accordion toggles addressing origin verification, HK humid storage, delivery times, and 7-day damage replacement.
    - `RelatedProducts` ([related-products.tsx](file:///d:/CODING/NavigoTech%20Innovation/Happymart/apps/web/components/product/related-products.tsx)): Recommendations for "More from this Brand" and "Similar Products in Category" reusing `ProductCard`.
    - `MobileStickyPurchaseBar` ([mobile-sticky-purchase-bar.tsx](file:///d:/CODING/NavigoTech%20Innovation/Happymart/apps/web/components/product/mobile-sticky-purchase-bar.tsx)): Scroll-triggered bottom bar on mobile featuring thumbnail, active price, and Add to Cart button.
    - `ProductDetailView` ([product-detail-view.tsx](file:///d:/CODING/NavigoTech%20Innovation/Happymart/apps/web/components/product/product-detail-view.tsx)): Client orchestrator managing active variant state.
  - Server route:
    - `apps/web/app/products/[productSlug]/page.tsx`: Full server component with `generateMetadata`, JSON-LD `Product`, `Offer`, and `BreadcrumbList` schemas, and 404 (`notFound()`) for nonexistent slugs.
- [x] Fixed and unified product card routing across the application ([product-card.tsx](file:///d:/CODING/NavigoTech%20Innovation/Happymart/apps/web/components/commerce/product-card.tsx) and [reorder-section.tsx](file:///d:/CODING/NavigoTech%20Innovation/Happymart/apps/web/components/home/reorder-section.tsx)), routing image and title clicks to `/products/${product.slug || product.id}`.
- [x] Generated Next.js App Router dynamic XML Sitemap ([apps/web/app/sitemap.ts](file:///d:/CODING/NavigoTech%20Innovation/Happymart/apps/web/app/sitemap.ts)) indexing all departments, categories, `/brands`, 45 individual brand pages, and all product detail pages.
- [x] Verified zero TypeScript errors (`tsc --noEmit`), zero ESLint errors, and successful Next.js production build (`next build`) generating all static and dynamic routes.
- [x] **Catalog Dataset Reorganization & Relational Alignment (Approved & Executed)**:
  - Reorganized `packages/mock-data/src/categories.ts` into a strict 2-level hierarchy: 8 Parent Departments (Level 1) + 34 Child Aisles (Level 2).
  - Ensured 100% unique category image URLs (42/42 unique assets: 12 local files strictly 1-to-1 + 30 high-res web assets).
  - Populated products in `packages/mock-data/src/products.ts` covering 100% of all 34 subcategories (71 total products).
  - Ensured 100% unique product image URLs (71/71 unique images, zero duplicates).
  - Synchronized `packages/mock-data/src/brands.ts`: pruned all 0-product orphaned brands (51 active brands, all with authentic products, valid logos, and exact declared `productCount` match).
  - Automated CI test suite `scratch/validate-catalog.cjs` passed with 0 errors and 0 warnings.
  - Verified full TypeScript compilation (`npm run typecheck`) across all monorepo workspaces with 0 errors.
  - Replaced dead/blocked Amazon CDN links (`m.media-amazon.com` 404s) with 100% verified live 200 OK assets across all products & categories.
  - Added robust `onError` fallback handling in `ProductCard` to gracefully display monogram badges upon network drop.
  - Verified and fixed category data flow across `/categories`, `/categories/[categorySlug]`, and `/categories/[categorySlug]/[subcategorySlug]`:
    - Updated `getProductsByCategory` and `getProductsBySubcategory` to resolve slugs to category IDs dynamically (eliminating previous 0-product bug on subcategory slug queries).
    - Updated `filterCatalog` in `catalog-filter.ts` to match subcategories by both slug and ID.
    - Updated all navigation links in `categories/page.tsx` and `subcategory-rail.tsx` to route cleanly into `/categories/${dept.slug}` and `/categories/${dept.slug}/${sub.slug}`.


