# Design System and Theme: Happymart

**Version:** 1.0 (draft) | **Scope:** Customer Storefront & Admin Dashboard | Related: `PRD.md`, `architecture.md`

---

## 5. Design System and Theme

**Goal:** Modern, trustworthy, friendly, and easy to use on both desktop and mobile phones. Polished but clean and simple.  
**Priorities:** Product visibility, fast navigation, clear categories, large product images, minimal learning curve, and layouts engineered to convert visitors into buyers.  
**Layout inspiration for listings:** DMart (dense, image-first grid with prominent pricing and immediate Add-to-Cart stepper buttons).

---

### 5.1 Design principles

| Principle                 | What it means in practice                                                                                                                  |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| **Product first**         | Large, clean product images; price and Add button always visible; zero visual clutter around products.                                     |
| **One-glance navigation** | Maximum two taps/clicks to reach any category; sticky header with live search; desktop mega menu; mobile bottom sheet.                     |
| **Familiar patterns**     | Standard e-commerce conventions (slide-out cart drawer, filter sheet, faceted sorting) to eliminate learning curve.                        |
| **Mobile first**          | Designed at 360 px width first; ergonomic thumb-reachable touch targets; sticky Add to Cart and checkout action bars.                      |
| **Trust**                 | Transparent delivery estimates, secure payment guarantee badges, authentic product photos, visible policies, honest stock and expiry info. |
| **Inclusive**             | Built for multicultural Hong Kong shoppers; high legibility for both Traditional Chinese and English; WCAG 2.1 AA compliant contrast.      |
| **Performance is design** | Instant skeleton loaders, lazy-loaded next/image with blur placeholders, zero layout shifts (CLS < 0.1).                                   |

---

### 5.2 Colour tokens (light and dark)

Colours are defined once as CSS variables (shadcn / Tailwind convention) and referenced across components via semantic utilities (`bg-primary`, `text-foreground`, `border-border`). Raw hex values are never hard-coded into UI components.

| Token                      | Light (Hex / HSL)        | Dark (Hex / HSL) | Used for                                             |
| -------------------------- | ------------------------ | ---------------- | ---------------------------------------------------- |
| `--background`             | `#FFFFFF`                | `#0F1512`        | Page background                                      |
| `--foreground`             | `#1A1A1A`                | `#F2F5F3`        | Main body & heading text                             |
| `--card`                   | `#FFFFFF`                | `#18211D`        | Cards, product tiles, popovers                       |
| `--card-foreground`        | `#1A1A1A`                | `#F2F5F3`        | Text on cards                                        |
| `--muted`                  | `#F4F6F5`                | `#1F2A25`        | Section backgrounds, skeleton pulses, chip fills     |
| `--muted-foreground`       | `#5F6B66`                | `#9AA8A1`        | Secondary text, subtitles, unit prices               |
| `--primary`                | `#1F6F54` _(Deep Green)_ | `#3DB88B`        | Primary buttons, active states, key brand highlights |
| `--primary-foreground`     | `#FFFFFF`                | `#0B1410`        | Text/icons on primary buttons                        |
| `--accent`                 | `#E8A33D` _(Saffron)_    | `#F0B45A`        | Promotional offers, special deals, banner accents    |
| `--accent-foreground`      | `#FFFFFF`                | `#1A1A1A`        | Text on accent elements                              |
| `--destructive`            | `#C0392B`                | `#E5645A`        | Error states, delete/remove item actions             |
| `--destructive-foreground` | `#FFFFFF`                | `#FFFFFF`        | Text on destructive buttons                          |
| `--success`                | `#2E9E5B`                | `#4CC983`        | In-stock indicators, order delivered badges          |
| `--warning`                | `#D98E04`                | `#F2B23A`        | Low stock alerts, slot cut-off warnings              |
| `--border`                 | `#E3E8E5`                | `#2A3731`        | Card dividers, input borders, structural rules       |
| `--input`                  | `#E3E8E5`                | `#2A3731`        | Form inputs, checkboxes, toggles                     |
| `--ring`                   | `#1F6F54`                | `#3DB88B`        | Keyboard focus outline indicators                    |

#### Semantic Badges & Indicators

- **Dietary:**
  - **Vegetarian:** Green badge with green dot icon.
  - **Non-Vegetarian:** Brown/Red badge with red dot icon.
  - **Halal:** Certified green badge / icon.
- **Commercial:**
  - **New Arrival:** Soft green chip (`#E8F5E9` bg / `#1F6F54` text).
  - **Special Offer / Discount %:** Saffron accent badge (`#E8A33D`).
- **Inventory:**
  - **In Stock:** Subtle green tag (`#2E9E5B`).
  - **Low Stock (< 5 left):** Amber tag (`#D98E04`) with exact quantity counter.
  - **Out of Stock:** Neutral grey tag (`#9AA8A1`) with "Notify Me" action.

---

### 5.3 Typography

| Use                       | Font Family                                        | Size (Mobile / Desktop) | Line Height | Weight                       |
| ------------------------- | -------------------------------------------------- | ----------------------- | ----------- | ---------------------------- |
| **Headings (H1 - H3)**    | Poppins / Plus Jakarta Sans + Noto Sans HK         | 24–28 px / 32–40 px     | 1.2 – 1.3   | 600 to 700 (SemiBold / Bold) |
| **Subheadings (H4 - H6)** | Poppins / Plus Jakarta Sans + Noto Sans HK         | 18–20 px / 20–24 px     | 1.3 – 1.4   | 600 (SemiBold)               |
| **Body Text**             | Inter + Noto Sans HK                               | 14–16 px / 16 px        | 1.5         | 400 (Regular)                |
| **Prices**                | Inter (tabular figures `font-mono`/`tabular-nums`) | 16 px / 18 px (Bold)    | 1.2         | 600 to 700                   |
| **Captions & Micro-copy** | Inter + Noto Sans HK                               | 12 px / 12–13 px        | 1.4         | 500 (Medium)                 |

**Typography Implementation Rules:**

- Font loading via Next.js Google Fonts (`next/font/google`) with `font-display: swap`.
- Subset fonts to `latin` and `chinese-traditional` for minimal download weight.
- Preload primary weights (Regular 400 and Bold 700).
- Strict limit of 2 font families and maximum 4 font weights across the bundle.

---

### 5.4 Spacing, shape, and elevation

- **Spacing scale:** 4 px base increment (Tailwind scale).
  - Page gutters: `16 px` (mobile), `24 px` (tablet), `32 px` (desktop).
  - Max container width: `1280 px` (`max-w-8xl` centered).
- **Corner Radii:**
  - `rounded-md` (`8 px`): Form inputs, buttons, search bars, dropdown menus.
  - `rounded-xl` (`12 px`): Product cards, category tiles, promo banners, modal dialogs.
  - `rounded-full` (`9999 px`): Badges, pill filters, quantity stepper circles, avatar icons.
- **Elevation & Shadows:**
  - **Light mode:** Soft, diffused elevation (`shadow-sm` on cards, `shadow-md` on sticky header and sticky bottom bar).
  - **Dark mode:** Disable ambient shadows; use subtle 1px border outlines (`border border-border`) on cards and surfaces instead.
- **Grids:**
  - **Product listing grid:** 2 columns (mobile `<640px`), 3 columns (tablet `640–1023px`), 4 to 5 columns (desktop `1024px+`).
  - **Category navigation tiles:** 3 columns (mobile), 4 columns (tablet), 6 to 8 columns (desktop).

---

### 5.5 Breakpoints

| Name     | Screen Width      | Layout & UX Adaptation                                                                                            |
| -------- | ----------------- | ----------------------------------------------------------------------------------------------------------------- |
| **base** | `0px – 639px`     | Mobile phone: 2-column product grid; bottom navigation bar; slide-up filter sheet; sticky Add-to-Cart bar on PDP. |
| **sm**   | `640px – 767px`   | Large phone / mini-tablet: 2 to 3 product columns; compact hero carousel.                                         |
| **md**   | `768px – 1023px`  | Tablet: 3 product columns; slide-over cart drawer from right; expandable search bar.                              |
| **lg**   | `1024px – 1279px` | Desktop: Header with mega menu navigation; persistent left sidebar for catalogue filters; 4-column product grid.  |
| **xl**   | `1280px+`         | Wide Desktop: Max-width 1280 px container; 5-column product grid; full 16:6 hero banner showcase.                 |

---

### 5.6 Dark and light mode implementation

- **Strategy:** Tailwind CSS `darkMode: ['class']`. The `.dark` class placed on `<html>` switches CSS variable sets.
- **Supported Modes:** Light, Dark, and System (auto-detect OS preference). Default is System.
- **Persistence:** Selected theme stored in `localStorage` under key `happymart-theme` and managed via Next.js `ThemeProvider` (`next-themes`).
- **Zero FOUC (Flash of Unstyled Content):** Blocking inline script or `next-themes` script injected in `<head>` ensures the correct class applies prior to React hydration.
- **Component Styling Rule:** Use semantic tokens exclusively (`bg-background text-foreground border-border`). Avoid explicit `dark:...` color overrides except for image contrasts.
- **Product Photography Surface:** Product images sit on a dedicated neutral surface (`bg-white` in light mode; slightly lifted surface `bg-card` with 4% brightness in dark mode) ensuring white-background vendor photos look natural in dark mode.
- **Controls:** Sun/Moon toggle icon in desktop header and inside the mobile navigation/account menu.

```typescript
// tailwind.config.ts (excerpt)
import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./features/**/*.{ts,tsx}",
    "../../packages/ui/src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        border: "hsl(var(--border))",
        ring: "hsl(var(--ring))",
      },
      borderRadius: {
        lg: "12px",
        md: "8px",
        sm: "6px",
      },
    },
  },
};
export default config;
```

---

### 5.7 Imagery and content rules

- **Product Photography:**
  - Square 1:1 aspect ratio, minimum `1000 x 1000 px`.
  - Light, clean neutral background; product centered with minimum 10% outer padding margin.
  - Automatically served as optimized AVIF/WebP through `next/image` in sizes: 200, 400, 800, 1200 px.
- **Category & Brand Tiles:**
  - 1:1 square format with consistent styling, legible labels, and subtle border hover states.
- **Hero Banners:**
  - Desktop: `16:6` aspect ratio (e.g., 1920 x 720 px).
  - Mobile: `4:5` vertical aspect ratio (e.g., 800 x 1000 px) with separate mobile art-direction graphic to avoid unreadable tiny text.
- **Accessibility & Alt Text:**
  - Meaningful `alt` attribute required for all catalog images (generated as `"[Product Name] - [Brand] - [Pack Size]"` with admin override capability).
  - Never convey dietary or stock state by color alone — always accompany with text or iconography.

---

### 5.8 Motion and micro-interactions

- **Timing & Easing:**
  - Standard transition duration: `150 ms – 250 ms` with `cubic-bezier(0.16, 1, 0.3, 1)` (ease-out).
  - Strict compliance with `@media (prefers-reduced-motion: reduce)`: disable transforms and fade smoothly instead.
- **Loading States:**
  - Skeletons matching exact product card geometry; circular pulse for category avatars; spinning indicator restricted to active button submissions.
- **Add to Cart Interaction:**
  1. Default state: Clean green **Add** button (`+ Add`).
  2. On click: Instantly transforms into a quantity stepper (`- [count] +`).
  3. Header cart icon performs a single subtle spring bounce animation (`scale(1.15) -> scale(1)`).
  4. Non-intrusive toast notification on desktop; immediate badge counter update on mobile bottom bar.
- **Cart Drawer & Overlays:**
  - Desktop: Slides smoothly from the right viewport edge (380 px width).
  - Mobile: Slides upwards as an ergonomic bottom sheet.

---

### 5.9 Accessibility checklist (WCAG 2.1 AA)

- **Contrast:** Minimum 4.5:1 ratio for normal text and 3:1 for large text and interactive components across both light and dark themes.
- **Keyboard Navigation:**
  - Full keyboard focusability for all interactive elements with high-visibility focus ring (`ring-2 ring-primary ring-offset-2`).
  - Prepend hidden skip-to-content link (`Skip to main content`).
- **Semantic Structure:**
  - Single `<h1>` per page.
  - Valid HTML5 landmarks: `<header>`, `<nav>`, `<main>`, `<aside>`, `<footer>`.
- **Form Controls:**
  - Visible associated `<label>` for every input.
  - Validation errors linked via `aria-describedby` and marked with `aria-invalid="true"`.
- **Touch Ergonomics:**
  - Minimum touch target size of `44 x 44 px` for all mobile buttons, tabs, steppers, and links.
- **Modals & Overlays:**
  - Focus trapping and `Esc` key dismissals handled natively via Radix UI primitives.
- **Bilingual Accessibility:**
  - Proper `<html lang="en">` or `<html lang="zh-HK">` specified on the document root for correct screen reader pronunciation.

---

### 5.10 Localisation (i18n) rules

- **Supported Locales:**
  - `en` (English)
  - `zh-hk` (Traditional Chinese - Hong Kong)
- **Routing:**
  - Localized URL routes: `/en/...` and `/zh-hk/...` for SEO indexing and social sharing.
- **UI Strings:**
  - All static storefront strings grouped in modular JSON namespaces: `common`, `nav`, `home`, `product`, `cart`, `checkout`, `account`, `admin`. Hardcoded strings are disallowed in components.
- **Dynamic Catalog Content:**
  - Product titles, descriptions, categories, and attributes stored bilingually (`name_en`, `name_zh`, `desc_en`, `desc_zh`).
  - Graceful fallback: If Chinese description is missing, display English content seamlessly without error.
- **Formatting Standards:**
  - Currency: Formatted strictly via `Intl.NumberFormat('zh-HK' | 'en-HK', { style: 'currency', currency: 'HKD' })` (e.g. `HK$48.50`).
  - Dates: Localized using `date-fns` with `enUS` and `zhHK` locales.
- **Layout Flexibility:**
  - UI components and navigation bars designed with elastic spacing to accommodate longer Traditional Chinese character blocks and multi-line English strings without breaking containers.
