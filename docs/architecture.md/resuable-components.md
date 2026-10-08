# 9. Reusable Components

**Platform:** Happymart Storefront & Admin  
**Design System:** shadcn/ui + Tailwind CSS  
**Related Docs:** `design.md`, `architecture.md`, `PRD.md`

Build once in `packages/ui` (generic primitives) or `apps/*/src/components` (app-specific domain components), document in Storybook, and reuse everywhere. A page should be assembled from these components, not styled from scratch.  
**Golden Rule:** If a UI pattern appears twice, it becomes a reusable component.

---

## 9.1 Foundation components (shadcn/ui based, in `packages/ui`)

| Component | Purpose and variants | Used in |
|---|---|---|
| **Button** | `primary`, `secondary`, `outline`, `ghost`, `destructive`, `link`; sizes `xs`/`sm`/`default`/`lg`/`icon`; loading indicator | Everywhere |
| **Input**, **Textarea**, **Select**, **Combobox** | Form controls with error states; Combobox for searchable lists | All forms, checkout, filters, admin |
| **Checkbox**, **RadioGroup**, **Switch**, **Slider** | Filters, toggles, price range selector | Filters, settings, admin |
| **Form** *(RHF wrapper)* | `FormField`, `FormLabel`, `FormMessage` with accessibility wiring | All forms |
| **Dialog**, **Sheet**, **Drawer**, **Popover**, **Tooltip** | Overlays; Sheet = side/bottom panel (cart, filters, mobile menu) | Cart drawer, filter sheets, modals |
| **Tabs**, **Accordion** | Content switching and FAQ disclosure | PDP details, help centre, admin tabs |
| **Badge** | Offer %, New, Veg, Non-veg, Halal, Low stock, status chips | Cards, listings, orders |
| **Card** | Container with header/body/footer (12px rounded-xl) | Product grids, dashboard, panels |
| **Table** | Base table styling (TanStack Table renders into it) | Admin data tables |
| **Skeleton** | Loading placeholders matching exact component geometry | All listings, details, cards |
| **Toast** *(sonner)* | Success, error, info notifications with action CTA | Global notifications |
| **Breadcrumb**, **Pagination** | Breadcrumb trail and pagination navigation | Category listings, search, admin |
| **DropdownMenu**, **NavigationMenu** | Menus and mega menu foundation | Header, account menu, admin |
| **Avatar**, **Separator**, **ScrollArea**, **Progress** | Small layout & utility primitives | Navigation, cart progress, profile |
| **Calendar**, **DatePicker**, **DateRangePicker** | Delivery slots and analytics reporting | Checkout slot picker, admin reports |
| **AlertDialog** | Accessible confirmation for destructive actions | Delete address, cancel order, admin |

---

## 9.2 Commerce components (storefront in `apps/web/components`)

| Component | Props and behaviour | Used in |
|---|---|---|
| **ProductCard** | `product`, `defaultVariant`, `onAdd`; shows 1:1 image, dietary & offer badges, 2-line title, pack size, price, MRP, discount %, Add/stepper, wishlist; twin skeleton | Grids, carousels, search, cart upsells |
| **ProductGrid** / **ProductRow** | Responsive 2–5 column grid or horizontal snap carousel with arrows | Listing pages, home sections |
| **PriceBlock** | `price`, `mrp`, `currency`; auto computes discount %; tabular figures | ProductCard, PDP, Cart |
| **QuantityStepper** | `value`, `min`, `max`, `onChange`, `size`; disabled at stock limit | ProductCard, PDP, Cart drawer |
| **AddToCartButton** | Manages default "+ Add", loading spinner, quantity stepper swap, and "Out of stock / Notify me" | ProductCard, PDP |
| **VariantSelector** | Pack-size chips with price difference indicator | PDP, quick view |
| **ImageGallery** | Zoom, touch swipe, thumbnail rail, lightbox | PDP |
| **CategoryTile** / **BrandLogo** | Image tile with bilingual label; consistent 1:1 aspect ratio | Home category strip, listing headers |
| **MegaMenu** | Category bar with multi-column panel, thumbnails, and featured brands | Desktop sticky header |
| **SearchBox** + **SuggestPanel** | Debounced search input, grouped suggestions (categories, brands, products), recent searches, keyboard nav | Header, mobile search overlay |
| **FilterGroup**, **PriceRange**, **ActiveFilters**, **SortSelect** | Filtering UI sharing one configuration object; syncs with URL query parameters | Category listing, search results |
| **CartDrawer**, **CartLineItem**, **OrderSummary** | Slide-out cart drawer, quantity stepper, free delivery progress bar, and breakdown | Cart drawer, checkout review |
| **CouponInput** | Voucher code submission with instant validation feedback and discount calculation | Cart drawer, checkout |
| **AddressForm**, **AddressCard**, **AddressSelector** | Hong Kong address structure (Region, District, Building, Floor, Unit) with district selectors | Checkout address step, account book |
| **SlotPicker**, **DeliveryOptions** | Delivery type toggle (Instant, Same Day, Scheduled), date tabs, time slot chips with capacity status | Checkout delivery step |
| **OrderTimeline**, **StatusBadge** | Visual order fulfillment progress (Placed -> Picking -> Packing -> Out for delivery -> Delivered) | Order tracking, history |
| **OtpInput** | 6-digit input boxes with auto-focus, paste handling, and resend countdown timer | Auth modal, guest checkout OTP |
| **HeroCarousel** | Full-width Swiper.js campaign slider (`banners`, `autoplayDelay`, `fullWidth`) with cross-fade, touch gestures, pause-on-hover, bilingual titles, offer chips, floating counter, and accessible arrow controls | Homepage hero, campaign hubs |
| **AnnouncementBar**, **TrustStrip** | Global dismissible announcement banner and 4-card supermarket confidence strip | Layout, home |
| **RatingStars**, **ReviewCard** | Star ratings display and customer review cards | PDP, review section |
| **EmptyState**, **ErrorState**, **PageHeader**, **SectionHeader** | Consistent empty catalog states, error boundaries, and section headers | All storefront pages |
| **SeoHead** | Next.js Metadata API & JSON-LD: title, description, canonical, hreflang, OG tags | All public pages |
| **ThemeToggle**, **LanguageSwitch** | Light/dark mode toggle button and English / Traditional Chinese switcher | Header, footer, mobile drawer |
| **LazyImage** | `next/image` wrapper with responsive sizes, blur placeholder, and fallback handling | All catalog images |

---

## 9.3 Admin components (`apps/admin/components`)

| Component | Behaviour | Used in |
|---|---|---|
| **DataTable** | TanStack Table: server pagination, sorting, column visibility, row selection, saved preferences | All admin resource listings |
| **FilterBar** | Text search, dropdown filters, date range; synchronised with URL | Resource lists |
| **StatCard**, **ChartCard** | KPI metric card with percentage delta; recharts wrapper with skeleton state | Dashboard, reports |
| **ImageUploader** | Drag-and-drop, multi-image reordering, upload progress, delete, alt text input | Product editor, banner manager |
| **RichTextEditor** | TipTap WYSIWYG editor with formatting toolbar and bilingual EN/ZH tabs | Product description, CMS pages |
| **BilingualField** | Paired English and Traditional Chinese inputs with tabs and copy button | All catalog and content forms |
| **VariantTable** | Inline editable table for pack-size variants, SKUs, prices, and inventory | Product form |
| **StatusStepper** | Order status workflow with operator action buttons | Order detail & fulfillment |
| **PermissionGate** | Conditionally hides or disables UI if user lacks specific RBAC permission | Navigation sidebar, sensitive buttons |
| **ConfirmDialog** | Destructive action confirmation dialog with explicit confirmation check | Delete product, refund order |
| **PageShell** | Page title, breadcrumb navigation, header actions slot, and sticky save bar | All admin views |
| **CsvImportWizard** | Upload step, column mapping, dry-run validation, row error preview, and batch import | Product bulk import |

---

## 9.4 Component rules

1. **One component per file:** File name must match the component name in PascalCase (e.g. `ProductCard.tsx`).
2. **Strict TypeScript typing:** All props typed via dedicated TypeScript interfaces without using `any`. Shareable domain types imported from `@workspace/typescript-config/types`.
3. **Presentational vs Container separation:** Presentational components receive pure props; container/page components handle RTK Query data fetching and dispatch.
4. **Resilient UI states:** Every component must gracefully handle `loading`, `empty`, and `error` states.
5. **Universal Accessibility (WCAG 2.1 AA):** All components must support full keyboard navigation (`Tab`, `Enter`, `Escape`), high-contrast focus rings, and screen-reader semantics in both Light and Dark mode.
6. **Class-Variance-Authority (CVA):** Use `cva` for managing variants and sizes instead of arbitrary template literals or inline conditionals.
7. **Testing & Documentation:** Every shared component should be accompanied by a Storybook story and render test.
